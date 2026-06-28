import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../database/entities/transaction.entity';
import { QueueGateway } from '../queue/gateway/queue.gateway';
import * as crypto from 'crypto';

export interface MidtransSnapResponse {
  token: string;
  redirect_url: string;
}

@Injectable()
export class PaymentsService {
  private serverKey: string;
  private isProduction: boolean;

  constructor(
    @InjectRepository(Transaction) private txnRepo: Repository<Transaction>,
    private config: ConfigService,
    private queueGateway: QueueGateway,
  ) {
    this.serverKey = this.config.get<string>('MIDTRANS_SERVER_KEY') ?? '';
    this.isProduction = this.config.get<string>('MIDTRANS_IS_PRODUCTION') === 'true';
  }

  private get baseUrl(): string {
    return this.isProduction ? 'https://app.midtrans.com' : 'https://app.sandbox.midtrans.com';
  }

  private get apiUrl(): string {
    return this.isProduction ? 'https://api.midtrans.com' : 'https://api.sandbox.midtrans.com';
  }

  async createSnapToken(transactionId: string): Promise<MidtransSnapResponse> {
    if (!this.serverKey) {
      throw new BadRequestException('Payment gateway not configured');
    }

    const txn = await this.txnRepo.findOne({ where: { id: transactionId } });
    if (!txn) throw new NotFoundException('Transaction not found');
    if (txn.paid) throw new BadRequestException('Transaction already paid');

    const orderId = `OMDC-${txn.id.slice(0, 8)}-${Date.now()}`;

    const payload = {
      transaction_details: {
        order_id: orderId,
        gross_amount: txn.amount ?? 0,
      },
      customer_details: {
        first_name: txn.patientName,
      },
      item_details: [
        {
          id: txn.serviceId ?? 'service',
          name: txn.serviceName ?? 'Dental Service',
          price: txn.amount ?? 0,
          quantity: 1,
        },
      ],
      callbacks: {
        finish: `${this.config.get<string>('FRONTEND_URL') ?? 'http://localhost:3000'}/payment/finish`,
      },
    };

    const auth = Buffer.from(`${this.serverKey}:`).toString('base64');

    const response = await fetch(`${this.apiUrl}/snap/v1/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new BadRequestException(`Midtrans error: ${error}`);
    }

    const data = (await response.json()) as MidtransSnapResponse;

    await this.txnRepo.update(transactionId, { paymentReference: orderId });

    return data;
  }

  async handleWebhook(body: any): Promise<{ status: string }> {
    if (!this.serverKey) {
      throw new BadRequestException('Payment gateway not configured');
    }

    const { order_id, status_code, gross_amount, signature_key, transaction_status, fraud_status } = body;

    const expectedSignature = crypto
      .createHash('sha512')
      .update(`${order_id}${status_code}${gross_amount}${this.serverKey}`)
      .digest('hex');

    if (signature_key !== expectedSignature) {
      throw new BadRequestException('Invalid webhook signature');
    }

    const txn = await this.txnRepo.findOne({ where: { paymentReference: order_id } });
    if (!txn) return { status: 'transaction_not_found' };

    const isSettlement =
      transaction_status === 'settlement' || (transaction_status === 'capture' && fraud_status === 'accept');

    if (isSettlement && !txn.paid) {
      txn.paid = true;
      txn.status = 'paid';
      txn.paidAt = new Date();
      txn.paymentMethod = body.payment_type ?? 'midtrans';
      await this.txnRepo.save(txn);

      if (txn.patientId) {
        this.queueGateway.notifyPatient(txn.patientId, {
          type: 'system',
          title: 'Pembayaran Berhasil',
          body: `Pembayaran untuk ${txn.serviceName ?? 'layanan'} telah dikonfirmasi`,
        });
      }

      return { status: 'payment_confirmed' };
    }

    if (transaction_status === 'cancel' || transaction_status === 'deny' || transaction_status === 'expire') {
      txn.status = 'cancelled';
      await this.txnRepo.save(txn);
      return { status: 'payment_cancelled' };
    }

    return { status: 'pending' };
  }

  async getPaymentStatus(transactionId: string) {
    const txn = await this.txnRepo.findOne({ where: { id: transactionId } });
    if (!txn) throw new NotFoundException('Transaction not found');

    return {
      transactionId: txn.id,
      paid: txn.paid,
      status: txn.status,
      paymentMethod: txn.paymentMethod,
      paymentReference: txn.paymentReference,
      amount: txn.amount,
      paidAt: txn.paidAt,
    };
  }

  async manualPayment(transactionId: string, method: string, reference?: string) {
    const txn = await this.txnRepo.findOne({ where: { id: transactionId } });
    if (!txn) throw new NotFoundException('Transaction not found');
    if (txn.paid) throw new BadRequestException('Transaction already paid');

    txn.paid = true;
    txn.status = 'paid';
    txn.paidAt = new Date();
    txn.paymentMethod = method;
    if (reference) txn.paymentReference = reference;

    await this.txnRepo.save(txn);

    if (txn.patientId) {
      this.queueGateway.notifyPatient(txn.patientId, {
        type: 'system',
        title: 'Pembayaran Berhasil',
        body: `Pembayaran ${method} untuk ${txn.serviceName ?? 'layanan'} telah dikonfirmasi`,
      });
    }

    return txn;
  }
}

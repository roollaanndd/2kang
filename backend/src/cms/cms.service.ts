import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CmsContent } from './entities/cms-content.entity';
import { Promotion } from './entities/promotion.entity';

@Injectable()
export class CmsService {
  constructor(
    @InjectRepository(CmsContent) private contentRepo: Repository<CmsContent>,
    @InjectRepository(Promotion) private promoRepo: Repository<Promotion>,
  ) {}

  // --- Generic CMS content ---

  async getSection(section: string, language?: string, branchId?: string): Promise<CmsContent[]> {
    const qb = this.contentRepo
      .createQueryBuilder('c')
      .where('c.section = :section', { section })
      .andWhere('c.isActive = true')
      .orderBy('c.sortOrder', 'ASC');

    if (language) qb.andWhere('c.language = :language', { language });
    if (branchId) qb.andWhere('(c.branchId = :branchId OR c.branchId IS NULL)', { branchId });

    return qb.getMany();
  }

  async upsertContent(section: string, key: string, value: any, meta?: { language?: string; branchId?: string; updatedBy?: string }): Promise<CmsContent> {
    let content = await this.contentRepo.findOne({
      where: { section, key, language: (meta?.language ?? 'id') as any, branchId: meta?.branchId ?? undefined },
    });

    if (content) {
      content.value = value;
      if (meta?.updatedBy) content.updatedBy = meta.updatedBy;
      return this.contentRepo.save(content);
    }

    content = this.contentRepo.create({
      section,
      key,
      value,
      language: (meta?.language ?? 'id') as any,
      branchId: meta?.branchId,
      updatedBy: meta?.updatedBy,
    });
    return this.contentRepo.save(content);
  }

  async deleteContent(id: string): Promise<void> {
    const content = await this.contentRepo.findOne({ where: { id } });
    if (!content) throw new NotFoundException('Content not found');
    await this.contentRepo.update(id, { isActive: false });
  }

  // --- Kiosk Settings ---

  async getKioskSettings(branchId?: string) {
    const settings = await this.getSection('kiosk-settings', undefined, branchId);
    const result: Record<string, any> = {};
    for (const s of settings) {
      result[s.key] = s.value;
    }
    return result;
  }

  async updateKioskSetting(key: string, value: any, branchId?: string, updatedBy?: string) {
    return this.upsertContent('kiosk-settings', key, value, { branchId, updatedBy });
  }

  // --- Promotions ---

  async getPromotions(branchId?: string): Promise<Promotion[]> {
    const qb = this.promoRepo
      .createQueryBuilder('p')
      .where('p.isActive = true')
      .orderBy('p.sortOrder', 'ASC');

    if (branchId) qb.andWhere('(p.branchId = :branchId OR p.branchId IS NULL)', { branchId });

    return qb.getMany();
  }

  async createPromotion(data: Partial<Promotion>): Promise<Promotion> {
    const promo = this.promoRepo.create(data);
    return this.promoRepo.save(promo);
  }

  async updatePromotion(id: string, data: Partial<Promotion>): Promise<Promotion> {
    const promo = await this.promoRepo.findOne({ where: { id } });
    if (!promo) throw new NotFoundException('Promotion not found');
    await this.promoRepo.update(id, data);
    return this.promoRepo.findOne({ where: { id } }) as Promise<Promotion>;
  }

  async deletePromotion(id: string): Promise<void> {
    await this.promoRepo.update(id, { isActive: false });
  }
}

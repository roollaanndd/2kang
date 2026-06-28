import { Module, Global } from '@nestjs/common';
import { OmdcCodeService } from './omdc-code.service';

@Global()
@Module({
  providers: [OmdcCodeService],
  exports: [OmdcCodeService],
})
export class OmdcCodeModule {}

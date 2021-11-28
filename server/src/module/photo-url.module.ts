import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoUrlController } from '../web/rest/photo-url.controller';
import { PhotoUrlRepository } from '../repository/photo-url.repository';
import { PhotoUrlService } from '../service/photo-url.service';

@Module({
    imports: [TypeOrmModule.forFeature([PhotoUrlRepository])],
    controllers: [PhotoUrlController],
    providers: [PhotoUrlService],
    exports: [PhotoUrlService],
})
export class PhotoUrlModule {}

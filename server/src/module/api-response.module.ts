import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseController } from '../web/rest/api-response.controller';
import { ApiResponseRepository } from '../repository/api-response.repository';
import { ApiResponseService } from '../service/api-response.service';

@Module({
    imports: [TypeOrmModule.forFeature([ApiResponseRepository])],
    controllers: [ApiResponseController],
    providers: [ApiResponseService],
    exports: [ApiResponseService],
})
export class ApiResponseModule {}

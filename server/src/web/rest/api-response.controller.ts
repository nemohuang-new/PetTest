import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post as PostMethod,
    Put,
    UseGuards,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiOAuth2Auth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ApiResponseDTO } from '../../service/dto/api-response.dto';
import { ApiResponseService } from '../../service/api-response.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/api-responses')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiOAuth2Auth()
@ApiUseTags('api-responses')
export class ApiResponseController {
    logger = new Logger('ApiResponseController');

    constructor(private readonly apiResponseService: ApiResponseService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ApiResponseDTO,
    })
    async getAll(@Req() req: Request): Promise<ApiResponseDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.apiResponseService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: ApiResponseDTO,
    })
    async getOne(@Param('id') id: number): Promise<ApiResponseDTO> {
        return await this.apiResponseService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create apiResponse' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ApiResponseDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() apiResponseDTO: ApiResponseDTO): Promise<ApiResponseDTO> {
        const created = await this.apiResponseService.save(apiResponseDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ApiResponse', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update apiResponse' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ApiResponseDTO,
    })
    async put(@Req() req: Request, @Body() apiResponseDTO: ApiResponseDTO): Promise<ApiResponseDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ApiResponse', apiResponseDTO.id);
        return await this.apiResponseService.update(apiResponseDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update apiResponse with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ApiResponseDTO,
    })
    async putId(@Req() req: Request, @Body() apiResponseDTO: ApiResponseDTO): Promise<ApiResponseDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ApiResponse', apiResponseDTO.id);
        return await this.apiResponseService.update(apiResponseDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete apiResponse' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'ApiResponse', id);
        return await this.apiResponseService.deleteById(id);
    }
}

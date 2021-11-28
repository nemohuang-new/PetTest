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
import { PhotoUrlDTO } from '../../service/dto/photo-url.dto';
import { PhotoUrlService } from '../../service/photo-url.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/photo-urls')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiOAuth2Auth()
@ApiUseTags('photo-urls')
export class PhotoUrlController {
    logger = new Logger('PhotoUrlController');

    constructor(private readonly photoUrlService: PhotoUrlService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: PhotoUrlDTO,
    })
    async getAll(@Req() req: Request): Promise<PhotoUrlDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.photoUrlService.findAndCount({
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
        type: PhotoUrlDTO,
    })
    async getOne(@Param('id') id: number): Promise<PhotoUrlDTO> {
        return await this.photoUrlService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create photoUrl' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: PhotoUrlDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() photoUrlDTO: PhotoUrlDTO): Promise<PhotoUrlDTO> {
        const created = await this.photoUrlService.save(photoUrlDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'PhotoUrl', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update photoUrl' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: PhotoUrlDTO,
    })
    async put(@Req() req: Request, @Body() photoUrlDTO: PhotoUrlDTO): Promise<PhotoUrlDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'PhotoUrl', photoUrlDTO.id);
        return await this.photoUrlService.update(photoUrlDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update photoUrl with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: PhotoUrlDTO,
    })
    async putId(@Req() req: Request, @Body() photoUrlDTO: PhotoUrlDTO): Promise<PhotoUrlDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'PhotoUrl', photoUrlDTO.id);
        return await this.photoUrlService.update(photoUrlDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete photoUrl' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'PhotoUrl', id);
        return await this.photoUrlService.deleteById(id);
    }
}

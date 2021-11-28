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
import { PetInventoryDTO } from '../../service/dto/pet-inventory.dto';
import { PetInventoryService } from '../../service/pet-inventory.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/pet-inventories')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiOAuth2Auth()
@ApiUseTags('pet-inventories')
export class PetInventoryController {
    logger = new Logger('PetInventoryController');

    constructor(private readonly petInventoryService: PetInventoryService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: PetInventoryDTO,
    })
    async getAll(@Req() req: Request): Promise<PetInventoryDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.petInventoryService.findAndCount({
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
        type: PetInventoryDTO,
    })
    async getOne(@Param('id') id: number): Promise<PetInventoryDTO> {
        return await this.petInventoryService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create petInventory' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: PetInventoryDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() petInventoryDTO: PetInventoryDTO): Promise<PetInventoryDTO> {
        const created = await this.petInventoryService.save(petInventoryDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'PetInventory', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update petInventory' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: PetInventoryDTO,
    })
    async put(@Req() req: Request, @Body() petInventoryDTO: PetInventoryDTO): Promise<PetInventoryDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'PetInventory', petInventoryDTO.id);
        return await this.petInventoryService.update(petInventoryDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update petInventory with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: PetInventoryDTO,
    })
    async putId(@Req() req: Request, @Body() petInventoryDTO: PetInventoryDTO): Promise<PetInventoryDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'PetInventory', petInventoryDTO.id);
        return await this.petInventoryService.update(petInventoryDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete petInventory' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'PetInventory', id);
        return await this.petInventoryService.deleteById(id);
    }
}

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
import { OrderDTO } from '../../service/dto/order.dto';
import { OrderService } from '../../service/order.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('store')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiOAuth2Auth()
@ApiUseTags('store')
export class StoreController {
    logger = new Logger('OrderController');

    constructor(private readonly orderService: OrderService) {}

    @Get('/inventory')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: OrderDTO,
    })
    async getAll(@Req() req: Request): Promise<OrderDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.orderService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/order/:orderId')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: OrderDTO,
    })
    async getOne(@Param('orderId') id: number): Promise<OrderDTO> {
        return await this.orderService.findById(id);
    }

    @PostMethod('/order')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create order' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: OrderDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() orderDTO: OrderDTO): Promise<OrderDTO> {
        const created = await this.orderService.save(orderDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Order', created.id);
        return created;
    }

    @Put('/order')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update order' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: OrderDTO,
    })
    async put(@Req() req: Request, @Body() orderDTO: OrderDTO): Promise<OrderDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Order', orderDTO.id);
        return await this.orderService.update(orderDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update order with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: OrderDTO,
    })
    async putId(@Req() req: Request, @Body() orderDTO: OrderDTO): Promise<OrderDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Order', orderDTO.id);
        return await this.orderService.update(orderDTO, req.user?.login);
    }

    @Delete('/order:orderId')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete order' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('orderId') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Order', id);
        return await this.orderService.deleteById(id);
    }
}

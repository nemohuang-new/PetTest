/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

/**
 * A OrderDTO object.
 */
export class OrderDTO extends BaseDTO {
    @ApiModelProperty({ description: 'petId field', required: false })
    petId: number;

    @ApiModelProperty({ description: 'quantity field', required: false })
    quantity: number;

    @ApiModelProperty({ description: 'shipDate field', required: false })
    shipDate: any;

    @ApiModelProperty({ description: 'status field', required: false })
    status: string;

    @ApiModelProperty({ description: 'complete field', required: false })
    complete: boolean;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

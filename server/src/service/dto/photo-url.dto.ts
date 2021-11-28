/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

/**
 * A PhotoUrlDTO object.
 */
export class PhotoUrlDTO extends BaseDTO {
    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    @ApiModelProperty({ description: 'value field', required: false })
    value: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

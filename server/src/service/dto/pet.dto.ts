/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { PetInventoryDTO } from './pet-inventory.dto';
import { CategoryDTO } from './category.dto';
import { TagDTO } from './tag.dto';

/**
 * A PetDTO object.
 */
export class PetDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'name field' })
    name: string;

    @ApiModelProperty({ description: 'photoUrls field', required: false })
    photoUrls: string;

    @ApiModelProperty({ description: 'status field', required: false })
    status: string;

    @ApiModelProperty({ description: 'additionalMetadata field', required: false })
    additionalMetadata: string;

    @ApiModelProperty({ description: 'file field', required: false })
    file: string;

    @ApiModelProperty({ type: PetInventoryDTO, description: 'inventory relationship' })
    inventory: PetInventoryDTO;

    @ApiModelProperty({ type: CategoryDTO, description: 'category relationship' })
    category: CategoryDTO;

    @ApiModelProperty({ type: TagDTO, isArray: true, description: 'tags relationship' })
    tags: TagDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

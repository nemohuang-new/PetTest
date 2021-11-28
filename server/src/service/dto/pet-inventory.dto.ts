/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { PetDTO } from './pet.dto';

/**
 * A PetInventoryDTO object.
 */
export class PetInventoryDTO extends BaseDTO {
    @ApiModelProperty({ description: 'quantity field', required: false })
    quantity: number;

    @ApiModelProperty({ type: PetDTO, description: 'petId relationship' })
    petId: PetDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

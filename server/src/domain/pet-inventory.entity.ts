/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Pet } from './pet.entity';

/**
 * A PetInventory.
 */
@Entity('pet_inventory')
export class PetInventory extends BaseEntity {
    @Column({ type: 'integer', name: 'quantity', nullable: true })
    quantity: number;

    @OneToOne(type => Pet)
    petId: Pet;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

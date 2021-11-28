/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Pet } from './pet.entity';

/**
 * A Category.
 */
@Entity('category')
export class Category extends BaseEntity {
    @Column({ name: 'name' })
    name: string;

    @OneToMany(
        type => Pet,
        other => other.category,
    )
    pets: Pet[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Pet } from './pet.entity';

/**
 * A Tag.
 */
@Entity('tag')
export class Tag extends BaseEntity {
    @Column({ name: 'name', nullable: true })
    name: string;

    @ManyToMany(type => Pet)
    @JoinTable({
        name: 'rel_tag__pets',
        joinColumn: { name: 'tag_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'pets_id', referencedColumnName: 'id' },
    })
    pets: Pet[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

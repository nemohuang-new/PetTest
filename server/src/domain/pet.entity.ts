/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { PetInventory } from './pet-inventory.entity';
import { Category } from './category.entity';
import { Tag } from './tag.entity';

/**
 * A Pet.
 */
@Entity('pet')
export class Pet extends BaseEntity {
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'photo_urls', nullable: true })
    photoUrls: string;

    @Column({ name: 'status', nullable: true })
    status: string;

    @Column({ name: 'additional_metadata', nullable: true })
    additionalMetadata: string;

    @Column({ name: 'file', nullable: true })
    file: string;

    @OneToOne(type => PetInventory)
    @JoinColumn()
    inventory: PetInventory;

    @ManyToOne(type => Category)
    category: Category;

    @ManyToMany(type => Tag)
    tags: Tag[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

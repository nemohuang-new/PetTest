/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A PhotoUrl.
 */
@Entity('photo_url')
export class PhotoUrl extends BaseEntity {
    @Column({ name: 'name', nullable: true })
    name: string;

    @Column({ name: 'value', nullable: true })
    value: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

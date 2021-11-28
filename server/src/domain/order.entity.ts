/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Order.
 */
@Entity('jhi_order')
export class Order extends BaseEntity {
    @Column({ type: 'integer', name: 'pet_id', nullable: true })
    petId: number;

    @Column({ type: 'integer', name: 'quantity', nullable: true })
    quantity: number;

    @Column({ type: 'date', name: 'ship_date', nullable: true })
    shipDate: any;

    @Column({ name: 'status', nullable: true })
    status: string;

    @Column({ type: 'boolean', name: 'complete', nullable: true })
    complete: boolean;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

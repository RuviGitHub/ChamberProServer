import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
  } from 'typeorm';
  import { Client } from './client.entity';
  import { Case } from './case.entity';
import { Transaction } from './transaction.entity';
  
  @Entity('appointments')
  export class Appointment {
    @PrimaryGeneratedColumn('increment')
    appointment_id: number;
  
    @ManyToOne(() => Client)
    @JoinColumn({ name: 'client_id' })
    @Column({ type: 'int' })
    client_id: number;
  
    @Column({ type: 'varchar', length: 12, nullable: false })
    client_nic: string;
  
    @Column({ type: 'varchar', length: 60, nullable: false })
    client_name: string;
  
    @Column({ type: 'varchar', length: 13, nullable: false })
    phone_number: string;
  
    @Column({ type: 'varchar', length: 3, nullable: false })
    country_code: string;
  
    @Column({ type: 'timestamp', nullable: false })
    time: Date;
  
    @Column({ type: 'varchar', length: 60, nullable: false })
    title: string;
  
    @ManyToOne(() => Case)
    @JoinColumn({ name: 'case_id' })
    @Column({ type: 'int' })
    case_id: number;

    @OneToMany(() => Transaction, (transaction) => transaction.transaction_id)
    transactions: Transaction[];
  
    @Column({ type: 'varchar', length: 60 })
    case_no: string;
  
    @Column({ type: 'int', nullable: true })
    assign_lawyer_id: number;
  
    @Column({ type: 'varchar', nullable: true })
    doc_url: string;
  
    @Column({ type: 'boolean', default: true })
    is_reminder_on: boolean;
  
    @Column({ type: 'text', nullable: true })
    note: string;
  
    @Column({ type: 'date', nullable: false })
    date: Date;
  
    @Column({ type: 'int', default: 1 })
    status: number; // Case status: 1 for active, 2 for de-active
    
    @CreateDateColumn({ type: 'timestamp' }) // Automatically sets the current timestamp on insert
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' }) // Automatically updates the timestamp on update
    updated_at: Date;
  
    @Column({ type: 'boolean', default: true })
    is_active: boolean;
  }
  
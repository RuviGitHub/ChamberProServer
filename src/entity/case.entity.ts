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
import { Police } from './police.entity';
import { Appointment } from './appointment.entity';
import { Transaction } from './transaction.entity';
import { Chamber } from './chamber.entity';

@Entity('cse')
export class Case {
  @PrimaryGeneratedColumn('increment')
  case_id: number;

  @Column({ type: 'varchar', length: 60 })
  case_title: string;

  @Column({ type: 'text' })
  case_description: string;

  @Column({ type: 'int', default: 1 })
  case_type: number; // Case type: 1 for criminal, 2 for civil, 3 for special, 4 for administrative

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  @Column({ type: 'int' })
  client_id: number;

  @Column({ type: 'int' })
  police_id: number;

  @OneToMany(() => Appointment, (appointment) => appointment.client_id)
  appointments: Appointment[];

  @OneToMany(() => Transaction, (transaction) => transaction.transaction_id)
  transactions: Transaction[];

  @Column({ type: 'varchar', length: 120 })
  client_name: string;

  @Column({ type: 'varchar', length: 12 })
  client_nic: string;

  @Column({ type: 'varchar', length: 20 })
  case_no: string;

  @Column({ type: 'varchar', length: 20 })
  case_file_no: string;

  @Column({ type: 'int', default: 1 })
  court_category: number; // Court category: 1 for primary, 2 for high court, 3 for district, 4 for magistrate, 5 for appeal

  @Column({ type: 'varchar', length: 20 })
  court_no: string;

  @Column({ type: 'varchar', length: 120 })
  case_proxy_lawyer: string;

  @Column({ type: 'varchar', length: 120 })
  case_assign_lawyer: string;

  @Column({ type: 'varchar', length: 120 })
  case_counselor_lawyer: string;

  @Column({ type: 'date' })
  case_next_hearing_date: Date;

  @Column({ type: 'date' })
  case_previous_hearing_date: Date;

  @Column({ type: 'text', nullable: true })
  case_description_for_next_hearing: string;

  @Column({ type: 'text', nullable: true })
  case_document_urls: string;

  @Column({ type: 'int'})
  chamber_id: number;

  @Column({ type: 'boolean', default: true })
  is_reminder_on: boolean;

  @Column({ type: 'int', default: 1 })
  status: number; // Case status: 1 for active, 2 for de-active

  @CreateDateColumn({ type: 'timestamp' }) // Automatically sets the current timestamp on insert
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' }) // Automatically updates the timestamp on update
  updated_at: Date;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}

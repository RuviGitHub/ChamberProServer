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
import { Case } from './case.entity';
import { Chamber } from './chamber.entity';
import { Transaction } from './transaction.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('increment')
  task_id: number;

  @Column({ type: 'varchar', length: 60, nullable: false })
  task_name: string;

  @Column({ type: 'int', default: 1 }) // 1: high, 2: low
  task_priority: number;

  @Column({ type: 'int' })
  task_assigner_id: number;

  @Column({ type: 'varchar' })
  case_no: string;

  @ManyToOne(() => Case)
  @JoinColumn({ name: 'case_id' })
  @Column({ type: 'int' })
  case_id: number;

  @Column({ type: 'text' })
  task_description: string;

  @Column({ type: 'boolean', default: true })
  is_share_client_details_with_assigner: boolean;

  @Column({ type: 'boolean', default: true })
  is_share_case_details_with_assigner: boolean;

  @Column({ type: 'date' })
  task_due_date: Date;

  @Column({ type: 'varchar', length: 120 })
  task_task_title: string;

  @Column({ type: 'text' })
  task_task_description: string;

  @Column({ type: 'boolean', default: true })
  is_reminder_on: boolean;

  @OneToMany(() => Transaction, (transaction) => transaction.transaction_id)
  transactions: Transaction[];

  @Column({ type: 'int', default: 1 })
  status: number; // 1: active, 2: de-active

  @ManyToOne(() => Chamber, (chamber) => chamber.tasks)
  @JoinColumn({ name: 'chamber_id' })
  @Column({ type: 'int' })
  chamber_id: number;

  @CreateDateColumn({ type: 'timestamp' }) // Automatically sets the current timestamp on insert
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' }) // Automatically updates the timestamp on update
  updated_at: Date;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}

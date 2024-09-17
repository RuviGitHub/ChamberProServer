import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Double,
  } from 'typeorm';
import { Chamber } from './chamber.entity';
import { Case } from './case.entity';
import { Task } from './task.entity';
import { Appointment } from './appointment.entity';
  
  @Entity('transaction')
  export class Transaction {
    @PrimaryGeneratedColumn('increment') 
    transaction_id: number;
  
    @Column({ type: 'double' })
    transaction_amount: Double;

    @Column({ type: 'int', default: 1 })
    payment_method: number; // 1: cash, 2: card 3: cheque 4:other

    @Column({ type: 'int', default: 1 })
    transaction_type: number; // 1: income, 2: expense

    @Column({ type: 'int', default: 1 })
    transaction_category: number; // 1: case, 2: task 3:appointment

    @Column({ type: 'datetime'})
    date: Date; // 1: case, 2: task 3:appointment

    @Column({ type: 'text' })
    source: string; 
  
    @Column({ type: 'int', default: 1 })
    status: number; // 1: active, 2: de-active
  
    @ManyToOne(() => Chamber, (chamber) => chamber.transactions)
    @JoinColumn({ name: 'chamber_id' })
    @Column({ type: 'int' })
    chamber_id: number;

    @ManyToOne(() => Case)
    @JoinColumn({ name: 'case_id' })
    @Column({ type: 'int', nullable: true })
    case_id: number;

    @ManyToOne(() => Task)
    @JoinColumn({ name: 'task_id' })
    @Column({ type: 'int' , nullable: true })
    task_id: number;

    @ManyToOne(() => Appointment)
    @JoinColumn({ name: 'appointment_id' })
    @Column({ type: 'int', nullable: true })
    appointment_id: number;
  
    @Column({ type: 'text' }) 
    description: string; 

    @CreateDateColumn({ type: 'timestamp' })  // Automatically sets the current timestamp on insert
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })  // Automatically updates the timestamp on update
    updated_at: Date;
  
    @Column({ type: 'boolean', default: true })
    is_active: boolean;
  }
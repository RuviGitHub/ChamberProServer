import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Client } from './client.entity';
  import { User } from './user.entity';
  import { Task } from './task.entity';
  import { Package } from './package.entity';
  import { Transaction } from './transaction.entity';
  
  @Entity('chamber')
  export class Chamber {
    @PrimaryGeneratedColumn('increment')
    chamber_id: number;
  
    @Column({ type: 'varchar', length: 60 })
    chamber_name: string;

    @Column({ type: 'varchar', length: 60 })
    complex_name: string;
  
    @ManyToOne(() => Package)
    @JoinColumn({ name: 'package_id' })
    package: Package;
  
    @Column({ type: 'date', nullable: false })
    chamber_subscription_start_date: Date;
  
    @Column({ type: 'date', nullable: false })
    chamber_subscription_end_date: Date;
  
    @Column({ type: 'int', default: 1 })
    status: number; // 1: active, 2: de-active
  
    @OneToMany(() => User, (user) => user.chamber_id)
    users: User[];
  
    @OneToMany(() => Transaction, (transaction) => transaction.chamber_id)
    transactions: Transaction[];
  
    @OneToMany(() => Client, (client) => client.chamber_id)
    clients: Client[];
  
    @OneToMany(() => Task, (task) => task.chamber_id)
    tasks: Task[];
  
    @CreateDateColumn({ type: 'timestamp' }) // Automatically sets the current timestamp on insert
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' }) // Automatically updates the timestamp on update
    updated_at: Date;
  
    @Column({ type: 'boolean', default: true })
    is_active: boolean;
  }
  
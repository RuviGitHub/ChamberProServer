import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('complex')
  export class Complex {
    @PrimaryGeneratedColumn('increment')
    complex_id: number;
  
    @Column('varchar')
    complex_name: string;
  
    @Column('varchar')
    complex_phone: string;
  
    @Column('varchar')
    complex_city: string;
  
    @Column({ type: 'int', default: 1 })
    status: number; // 1: active, 2: de-active
  
    @CreateDateColumn({ type: 'timestamp' }) // Automatically sets the current timestamp on insert
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' }) // Automatically updates the timestamp on update
    updated_at: Date;
  
    @Column({ type: 'boolean', default: true })
    is_active: boolean;
  }
  
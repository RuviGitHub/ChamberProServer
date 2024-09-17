import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
import { Case } from './case.entity';
  
  @Entity('police')
  export class Police {
    @PrimaryGeneratedColumn('increment')
    police_id: number;
  
    @Column('varchar')
    police_name: string;
  
    @Column('varchar')
    police_phone: string;
  
    @Column('varchar')
    police_city: string;
  
    @OneToMany(() => Case, (cs) => cs.case_id)
    cases: Case[];
  
    @Column({ type: 'int', default: 1 })
    status: number; // 1: active, 2: de-active
  
    @CreateDateColumn({ type: 'timestamp' }) // Automatically sets the current timestamp on insert
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' }) // Automatically updates the timestamp on update
    updated_at: Date;
  
    @Column({ type: 'boolean', default: true })
    is_active: boolean;
  }
  
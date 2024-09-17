import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Chamber } from './chamber.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  user_id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 15, nullable: false, unique: true })
  phone_number: string;

  @Column({ type: 'varchar', length: 2, nullable: false })
  country_code: string;

  @Column({ type: 'varchar', length: 120, nullable: false })
  full_name: string;

  @Column({ type: 'varchar', length: 12, nullable: true, unique: true })
  nic: string;

  @Column({ type: 'text', nullable: true })
  current_address: string;

  @Column({ type: 'text', nullable: true })
  permanent_address: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
  latest_otp: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  token: string;

  @Column({ type: 'boolean', default: false })
  is_chamber_owner: boolean;

  @Column({ type: 'boolean', default: false })
  is_otp_verified: boolean;

  @Column({ type: 'boolean', default: true })
  is_first_login: boolean;

  @Column({ type: 'int', default: 1 })
  status: number; // Status: 1 for active, 2 for de-active

  @Column({ type: 'int', nullable: false })
  role_id: number;

  @ManyToOne(() => Chamber, (chamber) => chamber.users)
  @JoinColumn({ name: 'chamber_id' })
  @Column({ type: 'int', nullable: true })
  chamber_id: number;

  @CreateDateColumn({ type: 'timestamp' }) // Automatically sets the current timestamp on insert
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' }) // Automatically updates the timestamp on update
  updated_at: Date;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  Double,
  OneToMany,
} from 'typeorm';
import { Chamber } from './chamber.entity';

@Entity('package')
export class Package {
  @PrimaryGeneratedColumn('increment')
  package_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  package_name: string;

  @Column({ type: 'double', nullable: false })
  monthly_subscription: Double;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'json', nullable: true })
  features: {
    feature_name: string;
    feature_description?: string;
  }[];

  @Column({ type: 'int', nullable: false })
  case_count: number;

  @Column({ type: 'int', nullable: false })
  client_count: number;

  @Column({ type: 'int', nullable: false })
  storage: number;

  @OneToMany(() => Chamber, (chamber) => chamber.chamber_id)
  chambers: Chamber[];

  @Column({ type: 'int', default: 1 })
  status: number; // 1: active, 2: de-active

  @CreateDateColumn({ type: 'timestamp' }) // Automatically sets the current timestamp on insert
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' }) // Automatically updates the timestamp on update
  updated_at: Date;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  is_active: boolean;
}

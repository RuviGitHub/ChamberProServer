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
import { Appointment } from './appointment.entity';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn('increment')
  client_id: number;

  @Column({ type: 'varchar', length: 80 })
  client_name: string;

  @Column({ type: 'varchar', length: 255 })
  client_name_initial: string;

  @Column({ type: 'varchar', length: 255 })
  client_surname: string;

  @Column({ type: 'text' })
  client_address_line_1: string;

  @Column({ type: 'text', nullable: true })
  client_address_line_2: string;

  @Column({ type: 'int', width: 8 })
  client_postal_code: number;

  @Column({ type: 'varchar', length: 255 })
  client_city: string;

  @Column({ type: 'int' })
  client_district_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  client_nationality_id: string;

  @Column({ type: 'text', nullable: true })
  client_description: string;

  @Column({ type: 'varchar', length: 15 })
  client_land_number: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  client_phone_number: string;

  @Column({ type: 'varchar', length: 15 })
  client_country_code: string;

  @Column({ type: 'varchar', length: 12, nullable: true })
  client_nic: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  client_email: string;

  @Column({ type: 'date' })
  client_dob: Date;

  @Column({ type: 'int' }) // 1: male, 2: female
  client_gender: number;

  @Column({ type: 'text', nullable: true })
  client_occupation: string;

  @OneToMany(() => Case, (cse) => cse.case_id)
  cases: Case[];

  @Column({ type: 'int', default: 1 })
  status: number; // 1: active, 2: de-active

  @ManyToOne(() => Chamber, (chamber) => chamber.clients)
  @JoinColumn({ name: 'chamber_id' })
  @Column({ type: 'int' })
  chamber_id: number;

  @OneToMany(() => Appointment, (appointment) => appointment.client_id)
  appointments: Appointment[];

  @CreateDateColumn({ type: 'timestamp' }) // Automatically sets the current timestamp on insert
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' }) // Automatically updates the timestamp on update
  updated_at: Date;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}

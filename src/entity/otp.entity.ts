import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('otp')
export class Otp {
  @PrimaryColumn()
  phoneNumber: string;

  @Column()
  otp: string;

  @Column()
  referenceKey: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}

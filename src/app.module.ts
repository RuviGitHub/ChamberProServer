import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ResponseService } from './utils/response.service';
import { SeederService } from './seeders/seeder.service';
import { OtpService } from './utils/otp.service';
import { MailService } from './utils/mail.service';
import { UserModule } from './modules/user/user.module';
import { ChamberModule } from './modules/chamber/chamber.module';
import { CaseModule } from './modules/case/case.module';
import { ClientModule } from './modules/client/client.module';
import { PackageModule } from './modules/package/package.module';
import { PoliceModule } from './modules/police/police.module';
import { TaskModule } from './modules/task/task.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { User } from './entity/user.entity';
import { Chamber } from './entity/chamber.entity';
import { Case } from './entity/case.entity';
import { Client } from './entity/client.entity';
import { Package } from './entity/package.entity';
import { Police } from './entity/police.entity';
import { Task } from './entity/task.entity';
import { Transaction } from './entity/transaction.entity';
import { JwtModule } from './auth/jwt.module';
import { Appointment } from './entity/appointment.entity';
import { AppointmentModule } from './modules/appointment/appointment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'chamber-pro-db.c7i4yoos46dy.ap-south-1.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'chamber1234',
      database: 'chamber-pro-db',
      entities: [
        User,
        Chamber,
        Case,
        Client,
        Package,
        Police,
        Task,
        Transaction,
        Appointment
      ],
      synchronize: true,
    }),
    JwtModule,
    UserModule,
    ChamberModule,
    CaseModule,
    ClientModule,
    PackageModule,
    PoliceModule,
    TaskModule,
    TransactionModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [ResponseService, SeederService, OtpService, MailService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seederService: SeederService) {}

  async onModuleInit() {
    const isEmpty = await this.seederService.isDatabaseEmpty();
    if (isEmpty) {
      console.log('Database is empty. Running seed...');
      await this.seederService.run();
      console.log('Seeding completed!');
    }
  }
}

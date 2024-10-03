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
import { SmsModule } from './modules/sms/sms.module';
import { OtpModule } from './modules/otp/otp.module';
import { Otp } from './entity/otp.entity';
import { Complex } from './entity/complex.entity';
import { ComplexService } from './modules/complex/complex.service';
import { ComplexModule } from './modules/complex/complex.module';
import { ComplexController } from './modules/complex/complex.controller';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'chamber_pro',
      entities: [
        User,
        Chamber,
        Case,
        Client,
        Package,
        Police,
        Task,
        Transaction,
        Appointment,
        Otp,
        Complex
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
    SmsModule,
    OtpModule,
    ComplexModule,
  ],
  controllers: [AppController, ComplexController],
  providers: [ResponseService, SeederService, OtpService, MailService, ComplexService],
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

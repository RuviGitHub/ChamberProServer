import { Module } from '@nestjs/common';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from 'src/entity/package.entity';
import { ResponseService } from 'src/utils/response.service';

@Module({
  imports: [TypeOrmModule.forFeature([Package])],
  controllers: [PackageController],
  providers: [PackageService, ResponseService],
  exports: [TypeOrmModule]
})
export class PackageModule {}

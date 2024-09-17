import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from 'src/entity/package.entity';
import { Police } from 'src/entity/police.entity';
import { Repository } from 'typeorm';
import { packageList } from './data/package.seed';
import { policeList } from './data/police.seed';


@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Package)
    private readonly platformPackageRepository: Repository<Package>,
    @InjectRepository(Police)
    private readonly platformPoliceRepository: Repository<Police>,
  ) {}

  async isDatabaseEmpty(): Promise<boolean> {
    const packageCount = await this.platformPackageRepository.count();
    const policeCount = await this.platformPoliceRepository.count();
    return packageCount === 0 && policeCount === 0;
  }

  async run() {
    await this.platformPackageRepository.save(packageList);
    await this.platformPoliceRepository.save(policeList);
  }
}

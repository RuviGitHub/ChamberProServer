import { Case } from 'src/entity/case.entity';

export class PaginatedCaseDTO {
  page: number;
  perPage: number;
  total: number;
  cases: Case[];
}

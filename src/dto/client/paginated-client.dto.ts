import { Client } from 'src/entity/client.entity';

export class PaginatedClientDTO {
  page: number;
  perPage: number;
  total: number;
  clients: Client[];
}

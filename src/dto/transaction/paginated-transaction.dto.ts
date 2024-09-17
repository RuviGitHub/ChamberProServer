import { Transaction } from "src/entity/transaction.entity";

export class PaginatedTransactionDTO {
  page: number;
  perPage: number;
  total: number;
  transactions: Transaction[];
}

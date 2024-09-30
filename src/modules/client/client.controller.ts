import { Body, Controller, Get, ParseIntPipe, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { ResponseService } from 'src/utils/response.service';
import { CreateClientDTO } from 'src/dto/client/create-client.dto';
import { PaginatedClientDTO } from '../../dto/client/paginated-client.dto';
import { PaginationQueryDTO } from '../../dto/client/paginated-query.dto';
import { StatusChangeDTO } from 'src/dto/common/status-change.dto';
import { UpdateClientDTO } from 'src/dto/client/update-client.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('client')
export class ClientController {
  constructor(
    private readonly service: ClientService,
    private readonly response: ResponseService,
  ) {}

  @Post('create-client')
  async registerClient(@Body() dto: CreateClientDTO, @Res() res) {
    const client = await this.service.registerClient(dto);
    return this.response.sendSuccessResponse(res, 'Client registered.', client);
  }


  @Get()
  async viewClient(@Query('id', ParseIntPipe) id: number, @Res() res) {
    const client = await this.service.viewClient(id);
    return this.response.sendSuccessResponse(res, 'Clients retrieved.', client);
  }

  @Get('verify_nic')
  async verifyNIC(@Query('chamber_id', ParseIntPipe) chamber_id: number,@Query('nic') nic: string, @Res() res,) {
    const client = await this.service.verifyNIC(chamber_id, nic);
    console.log(client)
    return this.response.sendSuccessResponse(res, 'Clients verified.', client);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all-paginated')
  async getAllClients(
    @Query() query: PaginationQueryDTO,
    @Res() res: any,
    @Req() req: any,
  ) {
    const { chamber_id } = req.user;
    const result: PaginatedClientDTO = await this.service.getClientsPaginated(
      query,
      chamber_id,
    );
    return this.response.sendSuccessResponse(res, 'Clients retrieved.', result);
  }

  @Post('status-change')
  async changeStatus(@Body() dto: StatusChangeDTO, @Res() res) {
    const client = await this.service.changeStatus(dto);
    return this.response.sendSuccessResponse(res,'Clients status changed.',client);
  }

  @Post('update-client')
  async updateClient(@Body() dto: UpdateClientDTO,@Res() res,) {
    const updatedClient = await this.service.updateClient(dto);
    return this.response.sendSuccessResponse(res, 'Client updated successfully.', updatedClient);
  }
}

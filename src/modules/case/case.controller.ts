import { Body, Controller, Get, ParseIntPipe, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ResponseService } from 'src/utils/response.service';
import { StatusChangeDTO } from 'src/dto/common/status-change.dto';
import { CreateCaseDTO } from 'src/dto/case/create-case.dto';
import { UpdateCaseDTO } from 'src/dto/case/update-case.dto';
import { PaginationCaseQueryDTO } from 'src/dto/case/paginated-query.dto';
import { PaginatedCaseDTO } from 'src/dto/case/paginated-case.dto';
import { CaseService } from './case.service';



@Controller('case')
export class CaseController {
  constructor(
    private readonly service: CaseService,
    private readonly response: ResponseService,
  ) {}

  @Post('create-case')
  async registerCase(@Body() dto: CreateCaseDTO, @Res() res) {
    const Case = await this.service.registerCase(dto);
    return this.response.sendSuccessResponse(res, 'Case registered.', Case);
  }


  @Get()
  async viewCase(@Query('id', ParseIntPipe) id: number, @Res() res) {
    const Case = await this.service.viewCase(id);
    return this.response.sendSuccessResponse(res, 'Cases retrieved.', Case);
  }

  @Get('all-paginated')
  async getAllCases(@Query() query: PaginationCaseQueryDTO, @Res() res) {
    const result: PaginatedCaseDTO =
      await this.service.getCasesPaginated(query);
    return this.response.sendSuccessResponse(res, 'Cases retrieved.', result);
  }

  @Post('status-change')
  async changeStatus(@Body() dto: StatusChangeDTO, @Res() res) {
    const Case = await this.service.changeStatus(dto);
    return this.response.sendSuccessResponse(res,'Cases status changed.',Case);
  }

  @Post('update-Case')
  async updateCase(@Body() dto: UpdateCaseDTO,@Res() res,) {
    const updatedCase = await this.service.updateCase(dto);
    return this.response.sendSuccessResponse(res, 'Case updated successfully.', updatedCase);
  }
}

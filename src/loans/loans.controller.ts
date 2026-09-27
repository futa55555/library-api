import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './entities/loan.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  @ApiOperation({
    summary: '貸出を登録する',
    description: '登録済みの利用者、蔵書を指定して、貸出を新規登録する',
  })
  @ApiResponse({ status: 201, description: '登録成功' })
  @ApiResponse({ status: 404, description: '利用者または蔵書が存在しない' })
  @ApiResponse({ status: 409, description: '貸出がすでに登録されている' })
  create(@Body() createLoanDto: CreateLoanDto) {
    const loan = this.loansService.create(createLoanDto);
    return this.toResponse(loan);
  }

  @Get()
  @ApiOperation({
    summary: '貸出の一覧を取得する',
    description: '登録済みの貸出の一覧を取得する',
  })
  @ApiResponse({ status: 200, description: '取得成功' })
  findAll() {
    return this.loansService.findAll().map((loan) => this.toResponse(loan));
  }

  @Get(':id')
  @ApiOperation({
    summary: '指定の貸出を取得する',
    description: '指定したIDの貸出を取得する',
  })
  @ApiResponse({ status: 200, description: '取得成功' })
  @ApiResponse({
    status: 404,
    description: '指定したIDの貸出は登録されていない',
  })
  findById(@Param('id') id: string) {
    const loan = this.loansService.findById(+id);
    return this.toResponse(loan);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: '貸出を削除する',
    description: '指定したIDの貸出を削除する',
  })
  @ApiResponse({ status: 204, description: '削除成功' })
  @ApiResponse({
    status: 404,
    description: '指定したIDの貸出は登録されていない',
  })
  delete(@Param('id') id: string) {
    return this.loansService.delete(+id);
  }

  private toResponse(loan: Loan) {
    return {
      id: loan.id,
      user: loan.user,
      bookCopy: loan.bookCopy,
    };
  }
}

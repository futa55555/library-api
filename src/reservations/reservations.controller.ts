import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @ApiOperation({
    summary: '予約を登録する',
    description: '登録済みの利用者、本を指定して、予約を新規登録する',
  })
  @ApiResponse({ status: 201, description: '登録成功' })
  @ApiResponse({ status: 404, description: '利用者または本が存在しない' })
  @ApiResponse({ status: 409, description: '予約がすでに登録されている' })
  create(@Body() createReservationDto: CreateReservationDto) {
    const reservation = this.reservationsService.create(createReservationDto);
    return this.toResponse(reservation);
  }

  @Get()
  @ApiOperation({
    summary: '予約の一覧を取得する',
    description: '登録済みの予約の一覧を取得する',
  })
  @ApiResponse({ status: 200, description: '取得成功' })
  findAll() {
    return this.reservationsService
      .findAll()
      .map((reservation) => this.toResponse(reservation));
  }

  @Get(':id')
  @ApiOperation({
    summary: '指定の予約を取得する',
    description: '指定したIDの予約を取得する',
  })
  @ApiResponse({ status: 200, description: '取得成功' })
  @ApiResponse({
    status: 404,
    description: '指定したIDの予約は登録されていない',
  })
  findById(@Param('id') id: string) {
    const reservation = this.reservationsService.findById(+id);
    return this.toResponse(reservation);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: '予約を削除する',
    description: '指定したIDの予約を削除する',
  })
  @ApiResponse({ status: 204, description: '削除成功' })
  @ApiResponse({
    status: 404,
    description: '指定したIDの予約は登録されていない',
  })
  delete(@Param('id') id: string) {
    return this.reservationsService.delete(+id);
  }

  private toResponse(reservation: Reservation) {
    return {
      id: reservation.id,
      user: reservation.user,
      book: reservation.book,
    };
  }
}

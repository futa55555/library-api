import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Post()
  @ApiOperation({
    summary: '出版社を登録する',
    description: '出版社を新規登録する',
  })
  @ApiResponse({ status: 201, description: '登録成功' })
  @ApiResponse({ status: 409, description: '出版社がすでに登録されている' })
  @ApiResponse({ status: 422, description: '入力値が不正' })
  create(@Body() createPublisherDto: CreatePublisherDto) {
    const publisher = this.publishersService.create(createPublisherDto);
    return {
      id: publisher.id,
      name: publisher.name,
    };
  }

  @Get()
  @ApiOperation({
    summary: '出版社の一覧を取得する',
    description: '登録済みの出版社の一覧を取得する',
  })
  @ApiResponse({ status: 200, description: '取得成功' })
  findAll() {
    return this.publishersService.findAll().map((publisher) => ({
      id: publisher.id,
      name: publisher.name,
    }));
  }

  @Get(':id')
  @ApiOperation({
    summary: '指定の出版社を取得する',
    description: '指定したIDの出版社を取得する',
  })
  @ApiResponse({ status: 200, description: '取得成功' })
  @ApiResponse({
    status: 404,
    description: '指定したIDの出版社は登録されていない',
  })
  findById(@Param('id') id: string) {
    const publisher = this.publishersService.findById(+id);
    return {
      id: publisher.id,
      name: publisher.name,
    };
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: '出版社を削除する',
    description: '指定したIDの出版社を削除する',
  })
  @ApiResponse({ status: 204, description: '削除成功' })
  @ApiResponse({
    status: 404,
    description: '指定したIDの出版社は登録されていない',
  })
  remove(@Param('id') id: string) {
    return this.publishersService.remove(+id);
  }
}

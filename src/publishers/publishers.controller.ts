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

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Post()
  create(@Body() createPublisherDto: CreatePublisherDto) {
    return this.publishersService.create(createPublisherDto);
  }

  @Get()
  findAll() {
    return this.publishersService.findAll().map((publisher) => ({
      id: publisher.id,
      name: publisher.name,
    }));
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    const publisher = this.publishersService.findById(+id);
    return {
      id: publisher.id,
      name: publisher.name,
    };
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.publishersService.remove(+id);
  }
}

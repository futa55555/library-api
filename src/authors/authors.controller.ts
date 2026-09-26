import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.authorsService.findAll().map((author) => ({
      id: author.id,
      name: author.name,
    }));
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    const author = this.authorsService.findById(+id);
    return {
      id: author.id,
      name: author.name,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}

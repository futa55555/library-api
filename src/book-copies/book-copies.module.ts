import { Module } from '@nestjs/common';
import { BookCopiesService } from './book-copies.service';
import { BookCopiesController } from './book-copies.controller';

@Module({
  controllers: [BookCopiesController],
  providers: [BookCopiesService],
})
export class BookCopiesModule {}

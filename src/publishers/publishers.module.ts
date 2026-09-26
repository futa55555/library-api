import { Module } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { PublishersController } from './publishers.controller';
import { PublishersRepository } from './publishers.repository';

@Module({
  controllers: [PublishersController],
  providers: [PublishersService, PublishersRepository],
})
export class PublishersModule {}

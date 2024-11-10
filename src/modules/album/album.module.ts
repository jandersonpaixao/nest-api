import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DatabaseModule } from '../typeorm-database/database.module';
import albumProvider from './album.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [AlbumController],
  providers: [AlbumService, albumProvider],
})
export class AlbumModule {}

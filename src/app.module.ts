import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './modules/album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './modules/typeorm-database/datasource.config';

@Module({
  imports: [AlbumModule, TypeOrmModule.forRoot(dataSourceOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

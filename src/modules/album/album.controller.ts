import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get('rank/:rank')
  findOne(@Param('rank') rank: number) {
    return this.albumService.findOne(+rank);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Patch('rank/:rank')
  update(
    @Param('rank', ParseIntPipe) rank: number,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(rank, updateAlbumDto);
  }

  @Delete('rank/:rank')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('rank', ParseIntPipe) rank: number) {
    return this.albumService.remove(rank);
  }
}

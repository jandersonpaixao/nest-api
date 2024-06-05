import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

@Injectable()
export class AlbumService {
  private readonly filePath = path.join(__dirname, './album.json');
  RANK_LIMIT = 500;

  private readAlbumsFromFile(): Album[] {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, '[]');
    }
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data);
  }

  private writeAlbumsToFile(albums: Album[]): void {
    fs.writeFileSync(
      this.filePath,
      JSON.stringify(
        albums.sort((a, b) => a.rank - b.rank),
        null,
        2,
      ),
    );
  }

  create(createAlbumDto: CreateAlbumDto) {
    const albums = this.readAlbumsFromFile();

    const existingRank = albums.find(
      (album) => album.rank === createAlbumDto.rank,
    );
    if (existingRank) {
      albums.forEach((album) => {
        if (album.rank >= createAlbumDto.rank) album.rank++;
        this.remove(this.RANK_LIMIT + 1);
      });
    }
    albums.push(createAlbumDto);
    this.writeAlbumsToFile(albums);
  }

  findAll() {
    return this.readAlbumsFromFile();
  }

  findOne(rank: number) {
    const albums = this.readAlbumsFromFile();
    return albums.find((album) => album.rank === rank);
  }

  update(rank: number, updateAlbumDto: UpdateAlbumDto) {
    const albums = this.readAlbumsFromFile();
    const index = albums.findIndex((album) => album.rank == rank);
    if (index == -1) {
      return { updated: false };
    }
    albums[index] = { ...albums[index], ...updateAlbumDto };
    this.writeAlbumsToFile(albums);
    return { updated: true, album: albums[index] };
  }

  remove(rank: number) {
    const albums = this.readAlbumsFromFile();
    const index = albums.findIndex((album) => album.rank === rank);
    console.log('index aqui: ', index);
    if (index == -1) {
      return { delete: false };
    }
    const deletedAlbum = albums.splice(index, 1);
    albums.forEach((album) => {
      if (album.rank > rank) album.rank--;
    });
    console.log('albums aqui', albums);
    this.writeAlbumsToFile(albums);
    return { delete: true, album: deletedAlbum, a: albums };
  }
}

//entender o que é uma img docker
//rodar minha aplicação no docker
//docker file
//docker compose
//Require statement not part of import statement.eslint
//ordenar no momento de ler e escrever
//arrumar a importação do modulo fs

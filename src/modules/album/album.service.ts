import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = [
    {
      rank: 1,
      album: 'The Dark Side of the Moon',
      artist: 'Pink Floyd',
      description: 'Um dos álbuns mais aclamados de todos os tempos.',
    },
    {
      rank: 2,
      album: 'The Wall',
      artist: 'Pink Floyd',
      description:
        'The Wall is the eleventh studio album by the English rock band Pink Floyd, released on 30 November 1979.',
    },
    {
      rank: 3,
      album: 'Atom heart mother',
      artist: 'Pink Floyd',
      description:
        'Atom Heart Mother is the fifth studio album by the English rock band Pink Floyd.',
    },
    {
      rank: 4,
      album: 'Meddle',
      artist: 'Pink Floyd',
      description:
        'Meddle is the sixth studio album by the English rock band Pink Floyd.',
    },
    {
      rank: 5,
      album: 'Obscured By Clouds',
      artist: 'Pink Floyd',
      description:
        'Obscured by Clouds is the seventh studio album by the English progressive rock band Pink Floyd.',
    },
  ];
  RANK_LIMIT = 500;

  create(createAlbumDto: CreateAlbumDto) {
    const existingRank = this.albums.find(
      (album) => album.rank === createAlbumDto.rank,
    );
    if (existingRank) {
      this.albums.forEach((album) => {
        if (album.rank >= createAlbumDto.rank) album.rank++;
        this.remove(this.RANK_LIMIT + 1);
      });
    }
    this.albums.push(createAlbumDto);
  }

  findAll() {
    return this.albums;
  }

  findOne(rank: number) {
    return this.albums.find((album) => album.rank === rank);
  }

  update(rank: number, updateAlbumDto: UpdateAlbumDto) {
    const index = this.albums.findIndex((album) => album.rank == rank);
    if (index == -1) {
      return { updated: false };
    }
    this.albums[index] = { ...this.albums[index], ...updateAlbumDto };
    return { updated: true, album: this.albums[index] };
  }

  remove(rank: number) {
    const index = this.albums.findIndex((album) => album.rank === rank);
    if (index == -1) {
      return { delete: false };
    }
    const deletedAlbum = this.albums.splice(index, 1);
    this.albums.forEach((album) => {
      if (album.rank > rank) album.rank--;
    });
    console.log('albums aqui', this.albums);
    return { delete: true, album: deletedAlbum };
  }
}

//persistir os dados no file
//escrever e atualizar
// file sistem é async ou sync
//usando async tem usar o .them()
//usar json, bom pra lidar com array de objetos

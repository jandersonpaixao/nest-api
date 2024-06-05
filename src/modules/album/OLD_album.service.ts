import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './content.json');
const data = fs.readFileSync(filePath, 'utf-8');
console.log('data aqui: ', data);
console.log('filePath aqui', filePath);

const post = {
  albums: [],
  create({ id, content }) {
    let currentData;
    try {
      currentData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      console.log('currentData aqui: ', currentData);
    } catch (err) {
      currentData = [];
    }
    const newData = { id, content };
    currentData.push(newData);

    fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2), (err) => {
      if (err) throw err;
      console.log('Data saved');
    });
  },
  read() {
    try {
      post.albums = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (err) {
      post.albums = [];
    }
    return post.albums;
  },
};

const number = Math.random() * 20;

post.create({
  id: Date.now(),
  content: `number ${number}`,
});

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
//mudar o require
//criar service old

import { DataSource } from 'typeorm';
import { Album } from './entities/album.entity';

export default {
  provide: 'ALBUM_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Album),
  inject: ['DATA_SOURCE'],
};

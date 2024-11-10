import { DataSource } from 'typeorm';
import { dataSourceOptions } from './datasource.config';

export default {
  provide: 'DATA_SOURCE',
  useFactory: async () => {
    const dataSource = new DataSource(dataSourceOptions);

    return dataSource.initialize();
  },
};

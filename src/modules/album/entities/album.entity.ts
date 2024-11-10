import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rank: number;

  @Column()
  album: string;

  @Column()
  artist: string;

  @Column()
  description: string;
}

import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
export class CreateAlbumDto {
  @IsNumber()
  @Min(1)
  @Max(500)
  rank: number;

  @IsString()
  album: string;

  @IsString()
  artist: string;

  @IsOptional()
  @IsString()
  description: string;
}

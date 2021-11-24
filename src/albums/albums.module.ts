import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AlbumRepository} from "./album.repository";

@Module({
  imports: [
      TypeOrmModule.forFeature([AlbumRepository])
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService]
})
export class AlbumsModule {}

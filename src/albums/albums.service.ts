import {Injectable, NotFoundException} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {CreateAlbumDto} from "./dto/create-album.dto";
import {AlbumRepository} from "./album.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Album} from "./album.entity";

@Injectable()
export class AlbumsService {
    constructor(
        @InjectRepository(AlbumRepository)
        private albumRepository: AlbumRepository
    ) {}

    async getAlbumById(id: number): Promise<Album>{
        const album = this.albumRepository.findOne(id);

        if(!album){
            throw new NotFoundException('Album not found');
        }

        return album;
    }
    /*private albums: Album[] = [];

    getAllAlbums(): Album[]{
        return this.albums
    }

    createAlbum(createAlbumDto: CreateAlbumDto):Album{
        const {name, cover_image} = createAlbumDto;

        const album: Album = {
            id: uuidv4(),
            name,
            cover_image,
            status: AlbumStatus.ACTIVE
        }

        this.albums.push(album);
        return album;
    }

    getAlbumById(id:string): Album{
        return this.albums.find(album => album.id == id);
    }

    deleteAlbum(id:string): void{
        this.albums = this.albums.filter(album => album.id !== id);
    }

    updateAlbum(id:string, status:AlbumStatus): Album {
        const album = this.getAlbumById(id);
        album.status = status;
        return album;
    }*/
}

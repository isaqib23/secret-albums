import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {AlbumsService} from "./albums.service";
import {CreateAlbumDto} from "./dto/create-album.dto";

@Controller('albums')
export class AlbumsController {
    constructor(private albumsService: AlbumsService) {
    }

    /*@Get("/all")
    getAllAlbums(): Album[]{
        return this.albumsService.getAllAlbums();
    }

    @Post("create")
    createAlbum(@Body() createAlbumDto: CreateAlbumDto): Album{
        return this.albumsService.createAlbum(createAlbumDto);
    }

    @Get(':id')
    getAlbumById(@Param('id') id:string): Album{
        return this.albumsService.getAlbumById(id);
    }

    @Delete(':id')
    deleteAlbum(@Param('id') id:string){
        this.albumsService.deleteAlbum(id);
    }

    @Patch(':id/status')
    updateAlbum(
        @Param('id') id: string,
        @Body('status') status: AlbumStatus
    ): Album {
        return this.albumsService.updateAlbum(id,status);
    }*/
}

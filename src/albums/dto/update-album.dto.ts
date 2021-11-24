import {AlbumStatus} from "../album-status.enum";

export class UpdateAlbumDto {
    id: string;
    status: AlbumStatus;
}
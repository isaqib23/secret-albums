import {BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn} from "typeorm";
import {AlbumStatus} from "./album-status.enum.js";

@Entity()
export class Album extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    uuid: string;

    @Column()
    name: string;

    @Column()
    cover_image: string;

    @Column()
    status: AlbumStatus
}
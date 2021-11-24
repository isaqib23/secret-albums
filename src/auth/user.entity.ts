import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from "typeorm";
const bcrypt = require('bcrypt');

export enum UserStatus {
    ACTIVE = "active",
    PENDGIN = "pending",
    DISABLED = "disabled"
}

@Entity()
@Unique(["email"])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    uuid: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    dob: string;

    @Column()
    photo: string;

    @Column()
    salt: string;

    @Column({
        type: "enum",
        enum: UserStatus,
        default: UserStatus.PENDGIN
    })
    status: UserStatus;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    async validatePassword(password: string): Promise<boolean>{
        const hash = bcrypt.hashSync(password,this.salt);

        return hash === this.password;
    }
}
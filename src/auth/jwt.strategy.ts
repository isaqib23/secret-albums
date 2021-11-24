import {PassportStrategy} from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UserRepository} from "./user.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {JwtTokenInterface} from "./jwt-token.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "secretAlbum007"
        });
    }

    async validate(payload: JwtTokenInterface): Promise<User>{
        const { uuid } = payload;
        const user = this.userRepository.findOne({ uuid });

        if(!user){
            throw new UnauthorizedException("Invalid Credentials");
        }

        return user;
    }
}
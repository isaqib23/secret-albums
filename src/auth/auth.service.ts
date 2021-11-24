import {ConflictException, Injectable} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {SignupDto} from "./dto/signup";
import {LoginDto} from "./dto/login.dto";
import {User, UserStatus} from "./user.entity";
import {JwtService} from "@nestjs/jwt";
import {JwtTokenInterface} from "./jwt-token.interface";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signup(signupDto: SignupDto):Promise<User>{
        return this.userRepository.signup(signupDto);
    }

    async login(loginDto: LoginDto):Promise<any> {
        const user = await await this.userRepository.userLogin(loginDto);
        if(!user) {
            throw new ConflictException("Invalid Credentials")
        }

        const payload: JwtTokenInterface = { "uuid": user.uuid };
        const accessToken = await this.jwtService.sign(payload);
        
        return {"_token": accessToken, "user": user};
    }

    async updateUserStatus(uuid){
        let user = await this.userRepository.findOne({ uuid });
        user.status = UserStatus.ACTIVE;
        await this.userRepository.save(user);
    }
}

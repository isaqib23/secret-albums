import {EntityRepository, Repository} from "typeorm";
import {User} from "./user.entity";
import {SignupDto} from "./dto/signup";
import {ConflictException, InternalServerErrorException} from "@nestjs/common";
import {LoginDto} from "./dto/login.dto";
import {throws} from "assert";
const bcrypt = require('bcrypt');

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signup(signupDto: SignupDto): Promise<User>{
        const { name, email, password, dob, photo} = signupDto;

        // generate unique password salt
        const saltRounds = 10;

        const user = new User();
        user.name = name;
        user.email = email;
        user.salt = await bcrypt.genSaltSync(saltRounds);
        user.password = await this.hashedPassword(password, user.salt);
        user.photo = photo;
        user.dob = dob;

        try {
            await user.save();
            return user;
        }catch (error) {
            if(error.code == "ER_DUP_ENTRY") throw new ConflictException("Email already exists!");
            else throw new InternalServerErrorException();
        }
    }

    async userLogin(loginDto: LoginDto):Promise<User>{
        const { email, password } = loginDto;
        const user = await this.findOne({ email });

        if(user && await user.validatePassword(password)){
            return user;
        }

        return null;
    }

    private async hashedPassword(password: string, salt: string):Promise<string>{
        return bcrypt.hashSync(password,salt);
    }
}
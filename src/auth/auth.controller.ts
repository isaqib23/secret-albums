import {
    BadRequestException,
    Body,
    ConflictException,
    Controller,
    Get, Inject, Param,
    Post,
    Req, UploadedFile,
    UseGuards,
    UseInterceptors,
    ValidationPipe
} from '@nestjs/common';
import {SignupDto} from "./dto/signup";
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import {AuthGuard} from "@nestjs/passport";
import {FileInterceptor} from "@nestjs/platform-express";
import { saveImagetoStorage } from "../config/multer.config";
import {mailHelper} from "../utils/nodemail.helper";
import {redisGet, redisSet} from "../utils/redis.helper";
import { v4 as uuidv4 } from 'uuid';
import {sendConfirmationEmail} from "../utils/confirmation.email";
import path from "path";

const fs = require("fs");
const Handlebars = require("handlebars");

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('/register')
    @UseInterceptors(FileInterceptor('photo',saveImagetoStorage))
    async signup(
        @Body(ValidationPipe) signupDto: SignupDto,
        @UploadedFile() file: Express.Multer.File
    ):Promise<{ message: string; status: boolean }>{
        // validate User Photo
        this.validateUserPhoto(file);
        signupDto.photo = file.filename;

        const user = await this.authService.signup(signupDto);

        const confirmationToken = uuidv4();
        await redisSet("email_confirmation", confirmationToken, 86400);
        await sendConfirmationEmail(user, confirmationToken);

        return {"status": true, "message": "User Signup successfully"};
    }

    @Post("/login")
    async login(@Body(ValidationPipe) loginDto: LoginDto):Promise<any>{
        return this.authService.login(loginDto);
    }

    @Get("/test")
    @UseGuards(AuthGuard())
    test(@Req() req){
        console.log(req.user.name);
    }

    @Get("/confirm_email/:uuid/:id")
    async confirmEmail(
        @Param("id") token: string,
        @Param("uuid") uuid: string,
    ){
        // if OTP == Sent OTP
        let sentOTP = await redisGet("email_confirmation");
        console.log(sentOTP);
        if (sentOTP === null) {
            return {"message": "Confirmation link is expired!"};
        }
        if (sentOTP !== token) {
            return {"message": "Invalid Confirmation!"};
        }

        // update user status
        await this.authService.updateUserStatus(uuid);
        return {"message": "Your account is confirmed, You can login now!"};
    }

    private validateUserPhoto(file: any):any{
        const validFileTypes = ["image/png","image/jpeg","image/jpg"];
        if(file === undefined || file.filename == ""){
            throw new BadRequestException('User Photo is required');
        }

        if(!validFileTypes.includes(file.mimetype)){
            throw new BadRequestException('Invalid User Photo, Please upload only images');
        }

        return true;
    }
}

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import typeOrmConfig from "./config/typeorm.config";
import {ConfigModule} from "@nestjs/config";
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
      ServeStaticModule.forRoot({
          rootPath: __dirname+'/templates'
      }),
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot(typeOrmConfig),
      UsersModule,
      AlbumsModule,
      AuthModule
  ]
})
export class AppModule {}

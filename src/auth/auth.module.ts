import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema ,Auth} from './Schema/userAuth';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports:[MongooseModule.forFeature([{name:Auth.name,schema:userSchema}]) ,
  JwtModule.register({
    secret:"H@rsh123",
    signOptions:{
      expiresIn:"1h"
    }
  }),PassportModule.register({defaultStrategy:'local'})],
  controllers: [AuthController ],
  providers: [AuthService ,LocalStrategy],
})
export class AuthModule {}

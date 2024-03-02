import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema ,Auth} from './Schema/userAuth';

@Module({
  imports:[MongooseModule.forFeature([{name:Auth.name,schema:userSchema}])],
  controllers: [AuthController ],
  providers: [AuthService],
})
export class AuthModule {}

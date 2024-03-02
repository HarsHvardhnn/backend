import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDocument ,Auth } from './Schema/userAuth';
import { Model } from 'mongoose';
@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private AuthModel:Model<AuthDocument>){

  }
  create(createAuthDto: CreateAuthDto):Promise<Auth> {
    console.log(createAuthDto);
   const user=  new this.AuthModel;
   user.Name= createAuthDto.Name;
   user.Email = createAuthDto.Email;
   user.Password = createAuthDto.Password;
    return user.save();
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(Email:string) :Promise<Auth> {
    const user = this.AuthModel.findOne({Email:Email})
    return user;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

import { Injectable, UseFilters } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDocument ,Auth } from './Schema/userAuth';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private AuthModel:Model<AuthDocument> ,private JwtService :JwtService){

  };


  create(createAuthDto: CreateAuthDto):Promise<Auth> {
    console.log(createAuthDto);
   const user=  new this.AuthModel;
   user.Name= createAuthDto.Name;
   user.Username= createAuthDto.Username;
   user.Email = createAuthDto.Email;
   user.Password = createAuthDto.Password;
    return user.save();
  }
  
  async login(Username: string, Password: string): Promise<any> {

    try {
      const user = await this.AuthModel.findOne({ Username:Username }).exec();
      if(!user){
        return 'user not found' ;
      }
      if(user.Password == Password){
        const {Password , ...userr} = user;
       
        return this.JwtService.sign(userr);
      }
    } catch (error) {
      console.error('Error finding user:', error);
      return 'Error finding user';
    }
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

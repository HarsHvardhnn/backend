import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Body() requestBody:{Username:string ,Password :string}){
    const {Username , Password} = requestBody;
    const user=  this.authService.login(Username , Password);
    console.log(user);
    if(!user){
      return 'invalid user';
    }
    return user;
  }
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':Username')
  findOne(@Param('Username') Username: string) {
    return this.authService.findOne(Username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}

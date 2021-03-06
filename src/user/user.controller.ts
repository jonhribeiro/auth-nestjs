import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/:id')
  async show(@Param('id', ValidacaoParametrosPipe) id: number): Promise<User> {
    return await this.userService.show(id)
  }

  @Get()
  async index(): Promise<User[]> {
    return await this.userService.index()
  }

  @Put('/:id')
  async update(@Body() updateUserDto: UpdateUserDto, @Param('id', ValidacaoParametrosPipe) id: number): Promise<User> {
    return await this.userService.updates(id, updateUserDto)
  }

  @Delete('/:id')
  async destroy(@Param('id', ValidacaoParametrosPipe) id: number): Promise<void> {
    this.userService.destroy(id)
  }
}

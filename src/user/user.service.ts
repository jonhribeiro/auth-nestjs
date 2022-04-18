import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly usuario: Repository<User>) {} 

  async create(createUserDto: CreateUserDto): Promise<User> {  
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    const createdUser = await this.usuario.save( data ); 
    
    return {
      ...createdUser,
      password: undefined,
    };
  }

  async show(id: number): Promise<User> {
    const user = await this.usuario.findOne(id)
    
    if (!user) {
      throw new NotFoundException(`Usuario com id ${id} não encontrado`)
    }
    return {
      ...user,
      password: undefined,
    };
  }

  findByEmail(email: string) {
    return this.usuario.findOne({email}); 
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly usuario: Repository<User>) {} 

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto
    const userEncontrado = await this.usuario.findOne({email})

    if (userEncontrado) {
      throw new BadRequestException(`Usuario com E-mail ${email} já consta no nosso sistema`)
    }
    
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    }

    const createdUser = await this.usuario.save( data ); 
    
    return {
      ...createdUser,
      password: undefined,
    };
  }

  async show(id: number): Promise<User> {
    const userEncontrado = await this.usuario.findOne(id)
    
    if (!userEncontrado) {
      throw new NotFoundException(`Usuario com id ${id} não encontrado`)
    }
    return {
      ...userEncontrado,
      password: undefined,
    };
  }

  findByEmail(email: string) {
    return this.usuario.findOne({email}); 
  }

  async index(): Promise<User[]> {
    return await this.usuario.find()
  }

  async updates(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userEncontrado = await this.usuario.findOne(id)
    
    if (!userEncontrado) {
      throw new NotFoundException(`Usuario com id ${id} não encontrado`)
    }
    const editOne = Object.assign(userEncontrado, updateUserDto)
    return await this.usuario.save(editOne)
  }

  async destroy(id: number): Promise<any> {
    return await this.usuario.delete(id)
  }
}

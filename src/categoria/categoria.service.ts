import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(@InjectRepository(Categoria) private readonly categoria: Repository<Categoria>) {} 

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return await this.categoria.save(createCategoriaDto);
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoria.find();
  }

  async findOne(id: number): Promise<Categoria> {
    const categoriaEncontrada = await this.categoria.findOne(id);
    if (!categoriaEncontrada) {
      throw new NotFoundException(`Categoria com id ${id} não encontrado`)
    }
    return categoriaEncontrada;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoriaEncontrada = await this.categoria.findOne(id);
    if (!categoriaEncontrada) {
      throw new NotFoundException(`Categoria com id ${id} não encontrado`)
    }
    
    const editOne = Object.assign(categoriaEncontrada, updateCategoriaDto)
    return await this.categoria.save(editOne)
  }

  async remove(id: number): Promise<any> {
    return await this.categoria.delete(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  async create(@Body() createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return await this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  async findAll(): Promise<Categoria[]> {
    return await this.categoriaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Categoria> {
    return await this.categoriaService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    return await this.categoriaService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  async remove(@Param('id', ValidacaoParametrosPipe) id: number): Promise<void> {
    this.categoriaService.remove(id);
  }
}

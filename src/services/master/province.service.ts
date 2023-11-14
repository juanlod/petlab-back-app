import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Province } from 'src/database/schemas/master/province';
import { Like, Not, Repository } from 'typeorm';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
  ) {}

  async create(province: Province): Promise<Province> {
    // Con TypeORM, se usa save que puede manejar la creación y actualización.
    // Se asume que la entidad Province tiene una estrategia de incremento automático para el ID.
    return await this.provinceRepository.save(province);
  }

  async findAll(): Promise<Province[]> {
    return await this.provinceRepository.find();
  }

  async findOne(id: number): Promise<Province> {
    return await this.provinceRepository.findOneBy({ id });
  }

  async update(id: number, province: Province): Promise<void> {
    await this.provinceRepository.update(id, province);
  }

  async remove(id: number): Promise<void> {
    await this.provinceRepository.delete(id);
  }

  async findAllPaging(
    filter = '',
    page = 1,
    pageSize = 10,
  ): Promise<{
    data: Province[];
    pagina_actual: number;
    total_paginas: number;
    total_resultados: number;
  }> {
    const [results, total] = await this.provinceRepository.findAndCount({
      where: { nom: filter ? Like(`%${filter}%`) : Not(Like("''")) }, // o cualquier otra columna para filtrar
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return {
      data: results,
      pagina_actual: page,
      total_paginas: Math.ceil(total / pageSize),
      total_resultados: total,
    };
  }
}

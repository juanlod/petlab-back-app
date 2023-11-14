import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Locality } from 'src/database/schemas/master/locality';
import { Like, Repository } from 'typeorm';

@Injectable()
export class LocalityService {
  constructor(
    @InjectRepository(Locality)
    private localityRepository: Repository<Locality>,
  ) {}

  async create(locality: Locality): Promise<Locality> {
    // En TypeORM, save puede crear una nueva entidad si no tiene ID o actualizar una existente si tiene ID
    return await this.localityRepository.save(locality);
  }

  findAll(): Promise<Locality[]> {
    return this.localityRepository.find();
  }

  findOne(id: number): Promise<Locality> {
    return this.localityRepository.findOne({ where: { id: id } });
  }

  async update(id: number, locality: Partial<Locality>): Promise<void> {
    // En TypeORM, el método update es utilizado para actualizar una entidad existente
    await this.localityRepository.update(id, locality);
  }

  async remove(id: number): Promise<void> {
    await this.localityRepository.delete(id);
  }

  async findAllPaging(filter?: string, page = 1, pageSize = 10): Promise<any> {
    // TypeORM soporta skip y take para paginación
    const [results, total] = await this.localityRepository.findAndCount({
      where: filter ? { nom: Like(`%${filter}%`) } : {},
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

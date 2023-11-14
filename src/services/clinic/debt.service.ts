import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Debt } from 'src/database/schemas/clinic/debts';

@Injectable()
export class DebtService {
  constructor(
    @InjectRepository(Debt)
    private debtRepository: Repository<Debt>,
  ) {}

  async create(debt: Debt): Promise<Debt> {
    // En TypeORM, el método save ya se encarga de generar un nuevo id si es necesario
    return this.debtRepository.save(debt);
  }

  findAll(): Promise<Debt[]> {
    return this.debtRepository.find();
  }

  findAllByClientId(clientId: number): Promise<Debt[]> {
    return this.debtRepository.find({ where: { clientId: clientId } });
  }

  async findOne(id: number): Promise<Debt | undefined> {
    return this.debtRepository.findOne({ where: { id: id } });
  }

  async update(id: number, debt: Partial<Debt>): Promise<Debt> {
    await this.debtRepository.update(id, debt);
    return this.debtRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.debtRepository.delete(id);
  }

  async findAllPaging(filter?: string, page = 1, pageSize = 10): Promise<any> {
    // TypeORM maneja el filtrado de una manera diferente a Mongoose. No hay regex.
    const [results, total] = await this.debtRepository.findAndCount({
      where: filter ? { ticketNumber: filter } : {}, // Example filter, adjust as needed
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

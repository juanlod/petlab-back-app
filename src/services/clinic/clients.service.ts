import { Injectable, Logger } from '@nestjs/common';
import { PetService } from './pets.service';
import { DebtService } from './debt.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Client } from 'src/database/schemas/clinic/client';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);

  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    private petService: PetService,
    private debtService: DebtService,
  ) {}

  async findByIdentif(identif: string): Promise<boolean> {
    const result = await this.clientRepository.findOne({
      where: { Identif: identif },
    });
    return !!result;
  }

  async findByEmail(email: string): Promise<boolean> {
    const result = await this.clientRepository.findOne({
      where: { email: email },
    });
    return !!result;
  }

  async create(client: Client): Promise<Client> {
    client.password = await bcrypt.hash('12345678', 10);

    // Guardar nuevo cliente y retornar la instancia guardada
    return this.clientRepository.save(client);
  }

  findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async findAllPaging(filter?: string, page = 1, pageSize = 10): Promise<any> {
    const skip = (page - 1) * pageSize;
    const queryBuilder = this.clientRepository.createQueryBuilder('client');

    if (filter) {
      queryBuilder.where('client.name LIKE :filter', { filter: `%${filter}%` });
    }

    const [results, total] = await queryBuilder
      .skip(skip)
      .take(pageSize)
      .getManyAndCount();

    return {
      data: results,
      pagina_actual: page,
      total_paginas: Math.ceil(total / pageSize),
      total_resultados: total,
    };
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { id: id },
    });
    if (client) {
      client.mascotas = await this.petService.findAllByClientId(client.idc);
      client.debts = await this.debtService.findAllByClientId(client.idc);
    }
    return client;
  }

  async findOneByIdc(idc: number): Promise<Client> {
    return this.clientRepository.findOne({ where: { idc: idc } });
  }

  async update(id: string, clientData: Partial<Client>): Promise<void> {
    await this.clientRepository.update(id, clientData);
  }

  async remove(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }
}

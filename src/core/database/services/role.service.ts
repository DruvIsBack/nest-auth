import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {RoleEntity} from "../entities/role.entity";

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
    ) {}

    async create(name: string, description: string): Promise<RoleEntity> {
        const role = new RoleEntity();
        role.name = name;
        role.description = description;
        return this.roleRepository.save(role);
    }

    async findByName(name: string): Promise<RoleEntity | undefined> {
        return this.roleRepository.findOneBy({ name });
    }
    async findById(id: number): Promise<RoleEntity | undefined> {
        return this.roleRepository.findOneBy({ id });
    }
}
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { UserEntity } from './user.entity';
import {Expose, Exclude} from "@nestjs/class-transformer";

@Entity({
    name: 'roles'
})
export class RoleEntity {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column({ unique: true })
    @Expose()
    name: string;

    @Column()
    @Expose()
    description: string;

    @ManyToMany(() => UserEntity, user => user.roles)
    @JoinTable()
    @Exclude()
    users: UserEntity[];
}

import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm';
import {Exclude, Expose} from '@nestjs/class-transformer';

@Entity({
    name: 'users'
})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column()
    @Expose()
    username: string;

    @Column()
    @Expose()
    email: string;

    @Column()
    @Exclude()
    password: string;
}

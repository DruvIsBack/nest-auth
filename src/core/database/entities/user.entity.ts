import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, JoinTable, ManyToMany} from 'typeorm';
import {classToPlain, Exclude, Expose} from '@nestjs/class-transformer';
import {RoleEntity} from "./role.entity";

@Entity({
    name: 'users'
})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column({ unique: true })
    @Expose()
    username: string;

    @Column({ unique: true })
    @Expose()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @ManyToMany(() => RoleEntity, role => role.users)
    @JoinTable()
    roles: RoleEntity[];

    toJSON() {
        return classToPlain(this);
    }
}

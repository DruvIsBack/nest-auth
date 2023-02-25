import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "../dtos/create-user.dto";
import {UserEntity} from "../entities/user.entity";
import {ValidationException} from "../../../common/exceptions/validation.exception";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {hash as bcrypt_hash, compare as bcrypt_compare} from 'bcryptjs';
import {SaltsEnums} from "../../../common/constants/salts.enums";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {}

    async insert(userDetails: CreateUserDto): Promise<Record<string, any>> {
        const userEntity: UserEntity = UserEntity.create();
        userEntity.email = userDetails.email;
        userEntity.username = userDetails.username;
        userEntity.password = await bcrypt_hash(userDetails.password, SaltsEnums.BCRYPT_SALT_LENGTH);
        await userEntity.save();
        return userEntity.toJSON();
    }

    async save(userEntity: UserEntity): Promise<UserEntity>{
        return userEntity.save();
    }

    async validateUser(email_or_username: string, password: string): Promise<Record<string, any>>{
        const userEntity = await this.findByUsernameOrEmail(email_or_username, email_or_username);

        if (userEntity && (await bcrypt_compare(password, userEntity.password))) {
            return userEntity.toJSON();
        }

        return null;
    }

    findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<UserEntity|null> {
        return this.usersRepository.findOneBy({ id });
    }

    findOneById(id: number): Promise<UserEntity|null> {
        return this.usersRepository.findOneBy({ id });
    }

    findByUsername(username: string): Promise<UserEntity|null> {
        return this.usersRepository.findOneBy({ username });
    }
    findByEmail(email: string): Promise<UserEntity|null> {
        return this.usersRepository.findOneBy({ email });
    }

    findByUsernameOrEmail(username: string, email: string): Promise<UserEntity> {
        return this.usersRepository.findOneBy([
            { username },
            { email }
        ]);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
    /**
     * @param userData CreateUserDto
     * @throws ValidationException
     */
    createUser = async (userData: CreateUserDto): Promise<UserEntity> => {
        const validationErrors = await userData.validate();
        if(!validationErrors.length){
            return await UserEntity.save({
                email: userData.email,
                username: userData.username,
                password: userData.password,
            });
        }
        throw new ValidationException(validationErrors);
    };
}
import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "../dtos/create-user.dto";
import {UserEntity} from "../entities/user.entity";
import {ValidationException} from "../../../common/exceptions/validation.exception";

@Injectable()
export class UserService {
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
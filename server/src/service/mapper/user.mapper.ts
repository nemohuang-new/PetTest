import { User } from '../../domain/user.entity';
import { UserDTO } from '../dto/user.dto';

/**
 * An User mapper object.
 */
export class UserMapper {
    static fromDTOtoEntity(userDTO: UserDTO): User {
        if (!userDTO) {
            return;
        }
        const user = new User();
        const fields = Object.getOwnPropertyNames(userDTO);
        fields.forEach(field => {
            user[field] = userDTO[field];
        });
        return user;
    }

    static fromDTOstoEntitys(userDTOs: UserDTO[]): User[] {
        if (!userDTOs) {
            return;
        }
        let users: User[] = new Array();
        userDTOs.forEach(userDto =>{
            users.push(this.fromDTOtoEntity(userDto));
        })
        return users;
    }

    static fromEntityToDTO(user: User): UserDTO {
        if (!user) {
            return;
        }
        const userDTO = new UserDTO();

        const fields = Object.getOwnPropertyNames(user);

        fields.forEach(field => {
            userDTO[field] = user[field];
        });

        return userDTO;
    }

    static fromEntitysToDTOs(users: User[]): UserDTO[] {
        if (!users) {
            return;
        }

        const userDTOs = new Array();
        users.forEach(user =>{
            userDTOs.push(this.fromEntityToDTO(user))
        })
        return userDTOs;
    }
}

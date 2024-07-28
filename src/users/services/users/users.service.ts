import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/users/dtos/create.user.dto';
import { CreateUserProfileDto } from 'src/users/dtos/create.user.profile.dto';
import { UpdateUserDto } from 'src/users/dtos/update.user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>, @InjectRepository(Profile) private profileRepository: Repository<Profile>) { }

    fetchUsers() {
        return this.userRepository.find({ relations: ['profile'] })
    }

    createUser(user: CreateUserDto) {
        return this.userRepository.save(user)
    }

    updateUser(id: number, user: UpdateUserDto) {
        return this.userRepository.update({ id }, { ...user })
    }

    deleteUser(id: number) {
        return this.userRepository.delete({ id })
    }

    async createUserProfile(id: number, createUserProfileDto: CreateUserProfileDto) {
        //find user
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new HttpException(
                'User not found. Cannot create profile',
                HttpStatus.BAD_REQUEST
            )
        }

        const newProfile = this.profileRepository.create(createUserProfileDto)
        const savedProfile = await this.profileRepository.save(newProfile)
        user.profile = savedProfile

        return this.userRepository.save(user)
    }
}

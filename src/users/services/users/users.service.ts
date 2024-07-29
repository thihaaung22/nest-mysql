import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERRORS } from 'src/constants/errors';
import { Post } from 'src/entities/post.entity';
import { Profile } from 'src/entities/profile.entity';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/users/dtos/create.user.dto';
import { CreateUserPostDto } from 'src/users/dtos/create.user.post.dto';
import { CreateUserProfileDto } from 'src/users/dtos/create.user.profile.dto';
import { UpdateUserDto } from 'src/users/dtos/update.user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        @InjectRepository(Post) private postRepository: Repository<Post>
    ) { }

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
        const user = await this.findUserById(id);

        //if profile already exists
        if (user.profile !== null) {
            throw new HttpException(ERRORS.USER_PROFILE_EXISTS.message, ERRORS.USER_PROFILE_EXISTS.status_code)
        }

        const newProfile = this.profileRepository.create({ user_id: user.id, ...createUserProfileDto })
        const savedProfile = await this.profileRepository.save(newProfile)
        user.profile = savedProfile

        return this.userRepository.save(user)
    }

    async createUserPost(id: number, createUserPostDto: CreateUserPostDto) {
        const user = await this.findUserById(id);

        const newPost = this.postRepository.create({ user_id: user.id, ...createUserPostDto })
        return await this.postRepository.save(newPost)
    }

    async findUserById(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new HttpException(
                ERRORS.USER_NOT_FOUND.message, ERRORS.USER_NOT_FOUND.status_code
            )
        }
        return user
    }
}

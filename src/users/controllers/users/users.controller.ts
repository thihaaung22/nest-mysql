import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create.user.dto';
import { CreateUserProfileDto } from 'src/users/dtos/create.user.profile.dto';
import { UpdateUserDto } from 'src/users/dtos/update.user.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { Transactional } from 'typeorm-transactional';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Get()
    getUsers() {
        return this.userService.fetchUsers();
    }

    @Post()
    @Transactional()
    async createUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.createUser(createUserDto)
        return user;
    }

    @Put(":id")
    @Transactional()
    updateUserById(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto)
    }

    @Delete(":id")
    @Transactional()
    deleteUserById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id)
    }

    @Post(":id/profiles")
    createUserProfile(
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserProfileDto: CreateUserProfileDto) {
        return this.userService.createUserProfile(id, createUserProfileDto)
    }
}


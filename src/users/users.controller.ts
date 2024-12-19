import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    /*endpoint из ТЗ - возвращает количество пользователей с флагом problem со значением true
    и меняет его на false*/
    @Get()
    getCountProblems()
    {
        return this.usersService.getCountProblems();
    }

    //endpoint для заполнения БД пользователями
    @Get('/start')
    startCreateDB()
    {
        return this.usersService.startCreateDB();
    }

    //endpoint для очистки БД
    @Get('/clear')
    clearDB()
    {
        return this.usersService.clearDB();
    }
}

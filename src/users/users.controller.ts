import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    getCountProblems()
    {
        return this.usersService.getCountProblems();
    }

    @Get('/start')
    startCreateDB()
    {
        return this.usersService.startCreateDB();
    }

    @Get('/clear')
    clearDB()
    {
        return this.usersService.clearDB();
    }
}

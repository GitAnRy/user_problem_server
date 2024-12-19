import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.model';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {

    constructor (
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async getCountProblems() {
        const updateResult: UpdateResult = await this.userRepository.createQueryBuilder()
        .update(User, {problem: false})
        .where('problem = :problem', {problem: true})
        .returning(['id'])
        .execute();

        if(updateResult) {
            return updateResult.raw.length;
        }
    }

    async startCreateDB() {

        const miliss: number = (new Date).getTime();

        const namesArray: string[] = [];
        const lastNamesArray: string[] = [];
        const age: number[] = [];
        const gendersArray: string[] = [];
        const problemsArray: boolean[] = [];

        await this.generateNames(namesArray, lastNamesArray, age, gendersArray, problemsArray);

        

        for (let i: number = 0; i < 10000; i++)
        {
            this.savePart(namesArray, lastNamesArray, age, gendersArray, problemsArray);
            const c: number = (new Date).getTime();
            console.log('time - ' + (c - miliss))
        }

        const c: number = (new Date).getTime();
        return c - miliss;
    }

    async generateNames(namesArray: string[], lastNArray: string[], ageArray: number[], genderArray: string[], problemArray: boolean[]) {

        const names = require('../data-user').names;
        const last_names = require('../data-user').last_names;
        const gender: string[] = ['Male', 'Female'];
        
        for (let i: number = 0; i < 100; i++)
            {
                namesArray.push(names[Math.floor(Math.random() * names.length)]);
                lastNArray.push(last_names[Math.floor(Math.random() * last_names.length)]);
                ageArray.push(Math.floor(Math.random() * 42) + 18);
                genderArray.push(gender[Math.floor(Math.random() * 2)]);
                problemArray.push(Math.floor(Math.random() * 2) === 0);
            }

    }

    async savePart(namesArray: string[], lastNArray: string[], ageArray: number[], genderArray: string[], problemArray: boolean[]) {

        const poprNames = Math.floor(Math.random() * 100);
        const poprLastNames = Math.floor(Math.random() * 100);
        const poprAge = Math.floor(Math.random() * 100);
        const poprGender = Math.floor(Math.random() * 100);
        const poprProblem = Math.floor(Math.random() * 100);
        
        const list: User[] = [];
        

        for (let i: number = 0; i < 100; i++)
            {
                const user: User = new User();
                user.name = namesArray[(poprNames + i >= 100)? poprNames + i - 100: poprNames + i];
                user.last_name = lastNArray[(poprLastNames + i >= 100)? poprLastNames + i - 100: poprLastNames + i];
                user.age = ageArray[(poprAge + i >= 100)? poprAge + i - 100: poprAge + i];
                user.gender = genderArray[(poprGender + i >= 100)? poprGender + i - 100: poprGender + i]
                user.problem = problemArray[(poprProblem + i >= 100)? poprProblem + i - 100: poprProblem + i];
                list.push(user);
            }

        this.userRepository.save(list);
    }

    async clearDB() {

        const miliss: number = (new Date).getTime();

        const deleteResult: DeleteResult = await this.userRepository.createQueryBuilder()
        .delete()
        .where('problem = :problem', {problem: false})
        .execute();

        const c: number = (new Date).getTime();
        return c - miliss;
    }
}

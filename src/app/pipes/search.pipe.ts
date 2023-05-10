import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/user';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(users: User[], args?: string ): User[] | null {
        if (!users) return null;
        if (!args) return users;
        

        return users.filter((user: User) => {
            return user.email.includes(args) || user.nickName.includes(args);
        });
    }

}
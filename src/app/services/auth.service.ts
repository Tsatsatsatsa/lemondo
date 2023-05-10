import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

import { User } from '../model/user';

@Injectable()

export class AuthService {

    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    private usersKey = 'users';
    private users: User[] = JSON.parse(localStorage.getItem(this.usersKey)!) || [];

    constructor() {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }


    public login(email: string, password: string): void {
        const user = this.users.find((user: User) => user.email.toLowerCase() === email.toLowerCase() && user.password === password);

        if (!user) {
            throw new Error('Username or password is incorrect')
        }
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
    }


    public register(user: User): { type: string, message?: string, controlName?: string } {
        if (this.users.find(el => el.email === user.email)) {
            return { type: "error", controlName: 'email' }
        }
        if (this.users.find(el => el.nickName === user.nickName)) {
            return { type: "error", controlName: 'nickName' }
        }
        user.id = this.users.length ? Math.max(...this.users.map(x => x.id)) + 1 : 1;
        this.users.push(user);
        localStorage.setItem(this.usersKey, JSON.stringify(this.users));
        return { type: "success" }
    }


    public logout(): void {
        localStorage.removeItem('user');
        this.userSubject.next(null);
    }



    public getAll(): User[] {
        return this.users;
    }

    public updateUser(params: any, id: number): { type: string, message?: string, controlName?: string } {
        if (this.users.find(el => (el.email === params.email && el.id !== id))) {
            return { type: "error", controlName: 'email' }
        }
        if (this.users.find(el => el.nickName === params.nickName && el.id !== id)) {
            return { type: "error", controlName: 'nickName' }
        }
        let currentUser;
        this.users.forEach((user, i) => {
            if (user.id === id) {
                currentUser = {
                    ...user,
                    ...params
                }
                this.users[i] = currentUser
            }
        })

        localStorage.setItem(this.usersKey, JSON.stringify(this.users))
        if (currentUser) {
            localStorage.setItem('user', JSON.stringify(currentUser));
            this.userSubject.next(currentUser);
        }
        return { type: "success", message: 'Your profile has been updated' }
    }

    public deleteUser(id: number): void {
        this.users = this.users.filter(x => x.id !== id);
        localStorage.setItem(this.usersKey, JSON.stringify(this.users));
    }


}
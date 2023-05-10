import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";



@Component({ templateUrl: 'users.component.html' })

export class UsersComponent implements OnInit {
    public users: any = [];
    public searchText: string = '';

    constructor(private authService: AuthService) { }


    ngOnInit(): void {
        this.getAll()
    }


    getAll() {
        this.users = this.authService.getAll()
    }


}
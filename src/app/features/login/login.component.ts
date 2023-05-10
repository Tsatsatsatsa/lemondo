import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";


import { AuthService } from "src/app/services/auth.service";

@Component({ templateUrl: 'login.component.html' })

export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public error: any;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) { }


    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }


    public login(): void {
        const { email, password } = this.loginForm.value;
        try {
            this.authService.login(email, password);
            this.router.navigate(['./users'])
        } catch (err: any) {
            this.error = err
        }
    }

}
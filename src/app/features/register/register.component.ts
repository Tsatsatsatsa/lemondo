import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "src/app/services/auth.service";

@Component({ templateUrl: 'register.component.html' })

export class RegisterComponent implements OnInit {
    public registrationForm: FormGroup;
    public error: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) { }


    ngOnInit(): void {
        this.registrationForm = this.formBuilder.group({
            email: ['', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
            mobileNumber: ['', Validators.pattern(/^(\+?995)?(\d{9})$/)],
            password: ['', Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{8,})$/)],
            confirmPassword: [''],
            nickName: [''],
            webSite: [''],
            acceptTerms: [false]
        }, { validator: this.ConfirmedValidator('password', 'confirmPassword') });

    }


    get regForm() { return this.registrationForm.controls; }

    private ConfirmedValidator(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if ((matchingControl.errors && !matchingControl.errors['ConfirmedValidator'])) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ confirmedValidator: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }

    public signUp() {
        const { confirmPassword, acceptTerms, ...result } = this.registrationForm.value;
        const register = this.authService.register(result);
        if (register.type == 'error' && register.controlName) {
            this.registrationForm.controls[register.controlName].setErrors({ invalid: true });
        }
        if (register.type == 'success') {
            this.router.navigate(['./login'])
        }
    }
}
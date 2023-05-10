import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/model/user";
import { AuthService } from "src/app/services/auth.service";


@Component({ templateUrl: 'profile.component.html' })

export class ProfileComponent implements OnInit {
    private user: User | any;
    public profileForm: FormGroup;
    public successMessage: any;
    public showPassword: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
    ) { }


    ngOnInit(): void {
        this.user = this.authService.userValue;
        this.profileForm = this.formBuilder.group({
            email: [this.user.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
            mobileNumber: [this.user.mobileNumber, Validators.pattern(/^(\+?995)?(\d{9})$/)],
            password: [this.user.password, Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{8,})$/)],
            confirmPassword: [''],
            nickName: [this.user.nickName],
            webSite: [this.user.webSite],
        }, { validator: this.ConfirmedValidator('password', 'confirmPassword') });

    }

    get profForm() { return this.profileForm.controls; }


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

    public updateUser() {
        const { confirmPassword, ...result } = this.profileForm.value
        const updated = this.authService.updateUser(result, this.user.id);
        if (updated.type == 'error' && updated.controlName) {
            this.profileForm.controls[updated.controlName].setErrors({ invalid: true });
        }
        if (updated.type == 'success') {
            this.successMessage = updated.message;
            this.profileForm.get('confirmPassword')?.reset();
            setTimeout(() => {
                this.successMessage = ''
            }, 1500)
        }
    }

    public deleteUser() {
        this.authService.deleteUser(this.user.id);
        this.authService.logout();
        this.router.navigate(['./login']);
    }
}
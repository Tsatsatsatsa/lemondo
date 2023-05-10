import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Injectable()
export class GuestGuard {
    constructor(
        private authService: AuthService
    ) { }

    canActivate(): boolean {
        const user = this.authService.userValue;
        if (!user) {
            return true;
        }
        return false;
    }
}
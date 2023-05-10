import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Injectable()
export class AuthGuard{
    constructor(
        private router: Router,
        private authService: AuthService
       
    ) { }

    canActivate(): boolean {
        const user = this.authService.userValue;
        if (user) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
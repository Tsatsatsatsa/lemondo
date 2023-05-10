import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { UsersComponent } from './features/users/users.component';
import { ProfileComponent } from './features/profile/profile.component';
import { AuthGuard } from './helpers/auth.guard';
import { GuestGuard } from './helpers/guest.guard';



const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users',
    },
    {
        path: 'login',
        canActivate: [GuestGuard],
        component: LoginComponent
    },
    {
        path: 'register',
        canActivate: [GuestGuard],
        component: RegisterComponent
    },

    {
        path: 'users',
        canActivate: [AuthGuard],
        component: UsersComponent,

    },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }

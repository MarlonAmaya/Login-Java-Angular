import { Routes } from '@angular/router';
import { Login } from './component/login/login';
import { Vc } from './component/vc/vc';
import { Register } from './component/register/register';

export const routes: Routes = [
    {path: '', component: Login},
    {path: 'vc', component: Vc},
    {path: 'register', component: Register}
];

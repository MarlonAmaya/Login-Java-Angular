import { Routes } from '@angular/router';
import { Login } from './component/login/login';
import { Vc } from './component/vc/vc';

export const routes: Routes = [
    {path: '', component: Login},
    {path: 'vc', component: Vc}
];

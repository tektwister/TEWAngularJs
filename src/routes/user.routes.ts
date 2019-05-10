import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/Components/login/login.component';


export const USER_ROUTE: Routes = [
    { path: 'login', component: LoginComponent }      
];
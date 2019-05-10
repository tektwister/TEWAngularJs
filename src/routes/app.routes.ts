import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from 'src/app/Components/landing/landing.component';
import { LoginComponent } from 'src/app/Components/login/login.component';
import { ChangepasswordComponent } from 'src/app/Components/changepassword/changepassword.component';
import { ParticipantsComponent } from 'src/app/Components/participants/participants.component';
import { AdminParticipantsComponent } from 'src/app/Components/admin-participants/admin-participants.component';
import { AdminUploadComponent } from 'src/app/Components/admin-upload/admin-upload.component';
import { ViewFilesComponent } from 'src/app/Components/view-files/view-files.component';
import { SpeakersComponent } from 'src/app/Components/speakers/speakers.component';

const APP_ROUTES: Routes = [
    //{path:'user', component: LandingComponent ,children:USER_ROUTE}
    {path:'', component: LandingComponent},
    {path:'login', component: LoginComponent},
    {path:'changePassword', component: ChangepasswordComponent},
    {path:'participants', component: ParticipantsComponent},
    {path:'adminParticipants', component: AdminParticipantsComponent},
    {path: 'adminUpload' , component: AdminUploadComponent},
    {path: 'viewFile' , component: ViewFilesComponent},
    {path: 'speakers', component: SpeakersComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
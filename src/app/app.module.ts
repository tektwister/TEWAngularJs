import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { AppComponent } from './app.component';
import { LandingComponent } from './Components/landing/landing.component';

import { routing } from '../routes/app.routes';
import { LoginComponent } from './Components/login/login.component';
import { ChangepasswordComponent } from './Components/changepassword/changepassword.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AuthService } from './Services/auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParticipantsComponent } from './Components/participants/participants.component';
import { AdminParticipantsComponent } from './Components/admin-participants/admin-participants.component';
import { AdminUploadComponent } from './Components/admin-upload/admin-upload.component';
import { ParticipantsService } from './Services/participants/participants.service';
import { ViewFilesComponent } from './Components/view-files/view-files.component';
import { SpeakersComponent } from './Components/speakers/speakers.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    ChangepasswordComponent,
    NavbarComponent,
    ParticipantsComponent,
    AdminParticipantsComponent,
    AdminUploadComponent,
    ViewFilesComponent,
    SpeakersComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    JwtHelper,
    AuthService,
    ParticipantsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

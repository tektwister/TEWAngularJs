import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Response } from 'selenium-webdriver/http';
import { ParticipantsService } from 'src/app/Services/participants/participants.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  
  constructor(public auth: AuthService, private router: Router, private formBuilder: FormBuilder, private toastr: ToastrManager,private partService: ParticipantsService) { }
  passwordForm: FormGroup;
  Button: any;
  submitted = false;
  ngOnInit() {
    this.createForm();
  }
  get f() { return this.passwordForm.controls; }
  //Create Form is Used to Initalize the Values the Form
  createForm() {
    this.Button = "Change"
    this.submitted = false;
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required],
    });
  }
  //The action performed After the Button is Pressed
  onSubmit(values: any) {

    this.submitted = true;
    this.Button = "Changing......."
    if (this.passwordForm.valid) {
      const email_id = JSON.parse(localStorage.getItem('user')).email_id;
      const password = this.passwordForm.value.oldPassword;
      const newPassword = this.passwordForm.value.newPassword;
      const confirmNewPassword = this.passwordForm.value.confirmNewPassword;
      if(newPassword === confirmNewPassword){
        this.partService.updateParticipant(email_id,password,newPassword).subscribe((response:any)=>{
          if(response.success){
            this.toastr.infoToastr(response.message);
            this.router.navigate(['']);
          }
          else {
            this.toastr.warningToastr(response.message);
            this.Button = "Change"
          }
        })
      }
      else {
        this.toastr.warningToastr("New passwords does'nt match","Error")
      }
     
    } else {
      this.toastr.infoToastr("Check the form", 'Alert!', { position: 'bottom-right' });
      this.Button = "Change";
    }
  }
}

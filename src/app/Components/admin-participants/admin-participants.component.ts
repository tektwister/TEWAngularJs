import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Response } from 'selenium-webdriver/http';
import { ParticipantsService } from 'src/app/Services/participants/participants.service';

@Component({
  selector: 'app-admin-participants',
  templateUrl: './admin-participants.component.html',
  styleUrls: ['./admin-participants.component.css']
})
export class AdminParticipantsComponent implements OnInit {
  
  constructor(public authService: AuthService, private router: Router, private formBuilder: FormBuilder, private toastr: ToastrManager,private partService: ParticipantsService) { }
  participantsForm: FormGroup;
  Button: any;
  submitted = false;
  participants: Array<any>;
  ngOnInit() {
    this.createForm();
    this.getParticipants();
  }
  get f() { return this.participantsForm.controls; }
  //Create Form is Used to Initalize the Values the Form


  createForm() {
    this.Button = "Create"
    this.submitted = false;
    this.participantsForm = this.formBuilder.group({
      email_id: ['', Validators.required],
      name: ['', Validators.required]
    });
  }
  //The action performed After the Button is Pressed
  onSubmit(values: any) {
    this.submitted = true;
    this.Button = "Sending Mail......."
    if (this.participantsForm.valid) {
      const email_id = this.participantsForm.value.email_id;
      const userProfileName = this.participantsForm.value.name;
      this.partService.createParticipant(email_id, userProfileName,"admin").subscribe((response: any) => {
        if (response.success) {
          this.toastr.successToastr(response.message, 'Success', { position: 'bottom-right' });
          this.createForm();
          this.Button = "create";
          this.getParticipants();
        }
        else {
          this.createForm();
          this.Button = "create";
          this.getParticipants();
        }
      });
    } else {
      this.toastr.infoToastr("Check the form", 'Alert!', { position: 'bottom-right' });
      this.Button = "create";
    }
  }

  getParticipants() {
    this.partService.getAllParticipants("admin").subscribe((response:any) => {
      this.participants = response;
    });
  }

  deleteParticipant(id: String){
    this.partService.deleteParticipant(id).subscribe((response:any)=>{
      this.toastr.warningToastr(response.msg,"Delete");
      this.getParticipants();
    });
  }

}

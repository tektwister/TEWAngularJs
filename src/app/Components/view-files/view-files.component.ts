import { Component, OnInit } from '@angular/core';
import { ParticipantsService } from 'src/app/Services/participants/participants.service';

@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.css']
})
export class ViewFilesComponent implements OnInit {

  files:Array<any>;
  clicked:Boolean;
  speakers:Array<any>;
  constructor(private partService: ParticipantsService) { 
    this.clicked = false;
    this.getSpeakers();
  }

  ngOnInit() {
  }

  getFiles(id:String) {
    this.clicked = true;
    this.partService.getFile(id).subscribe((response: any) => {
      this.files = response;
    });
  }

  getSpeakers(){
    this.partService.getAllParticipants("admin").subscribe((response:any)=>{
      this.speakers = response;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ParticipantsService } from 'src/app/Services/participants/participants.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-admin-upload',
  templateUrl: './admin-upload.component.html',
  styleUrls: ['./admin-upload.component.css']
})
export class AdminUploadComponent implements OnInit {

  constructor(private partService: ParticipantsService, private toastr: ToastrManager) { }

  ngOnInit() {
    this.getFiles();
  }  

  files: Array<any>;

  processFile(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      formData.append('_id', JSON.parse(localStorage.getItem('user')).id);
      this.partService.uploadFile(formData).subscribe((response: any) => {
        if (response.error) {
          this.toastr.warningToastr(response.msg);
        }
        else {
          this.toastr.successToastr(response.msg);
          this.getFiles();
        }
      })
    }

  }

  getFiles() {
    this.partService.getFile(JSON.parse(localStorage.getItem('user')).id).subscribe((response: any) => {
      this.files = response;
    });
  }

  deleteFile(id:String){
    this.partService.deleteFile(id).subscribe((response:any)=>{
      if(response.success){
        this.toastr.successToastr(response.msg);
        this.getFiles();
      }
      else {
        this.toastr.warningToastr(response.msg);
      }
    })
  }

}

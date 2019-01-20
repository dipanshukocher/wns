import { Component, EventEmitter, Input, OnInit, ViewChild, OnChanges, Output, ElementRef, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { EnvironmentService } from '../../../shared-services/environment.service';
import { ApiService } from '../../../shared-services/api.service';

@Component({
  selector: 'raadmin-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit, OnChanges {
  @Input() valid: boolean;
  @Input() uploadStatus: string;
  @ViewChild('fileInput') myInputFileVar: ElementRef;
  @Input() clearInput: boolean;
  @Output() public FileData: EventEmitter<any> = new EventEmitter();
  @Output() public uploadFile: EventEmitter<any> = new EventEmitter();
  fileUploader = '';
  accept = '.doc,.docx,.xm,.xls,.xlsx,.pdf,application/msword';
  public errorMsg: string;
  ELEMENT_DATA: UploadFileElement[] = [];
  displayedColumns: string[] = ['name', 'size', 'status'];
  dataSource = this.ELEMENT_DATA;
  uploadProgress = 0;
  constructor( private env: EnvironmentService, private http: HttpClient, private apiService: ApiService, public snackBar: MatSnackBar) {
    if (this.valid) {
      console.log(this.valid);
    }
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    let status = '';
    if (this.uploadStatus === 'SUCCESS') {
      status = 'Uploaded';
      this.uploadProgress = 100;
    } else if ( this.uploadStatus === 'FAILURE') {
      status = 'Error While Uploading';
    }
    const emptyFileObj = changes['clearInput'];
    if (emptyFileObj) {
      if (emptyFileObj.currentValue || emptyFileObj.previousValue) {
        // console.log(emptyFileObj.currentValue);
        this.clearFilemenu();
      }
    }
    if (this.dataSource.length > 0) {
      this.dataSource[0].status = status;
    }
  }

  clearFilemenu() {
    this.myInputFileVar.nativeElement.value = '';
    this.dataSource = [];
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {

      const file: File = fileList[0];
      const fileSize = this.bytesToSize(file.size);
      // this.dataSource.push({ name: file.name, size: fileSize, status: 'Ready' });
      this.ELEMENT_DATA = [
        {
          name: file.name,
          size: fileSize,
          status: 'Ready'
        }
      ];
      // console.log(this.ELEMENT_DATA);
      this.dataSource = this.ELEMENT_DATA;
      const formData: FormData = new FormData();
      formData.append('file', file);
      this.FileData.emit(formData);
    }
  }

  bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return '0 Byte';
    }
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  }

}

export interface UploadFileElement {
  name: string;
  size: any;
  status: string;
}

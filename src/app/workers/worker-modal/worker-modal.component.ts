import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Worker } from '../worker.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-worker-modal',
  templateUrl: './worker-modal.component.html',
  styleUrls: ['./worker-modal.component.scss']
})
export class WorkerModalComponent implements OnInit {

  public isCreated: boolean;
  public workerControl: FormGroup;

  constructor(
    private auth: AuthService,
    public dialogRef: MatDialogRef<WorkerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Worker) {}

  ngOnInit(): void {
    if (this.auth.role$.getValue() !== 'admin') {
      this.close();
    }

    if (!this.data) {
      this.data = new Worker();
      this.isCreated = true;
    }

    this.workerControl = new FormGroup({
      firstName: new FormControl(this.data ? this.data.firstName : '', [Validators.required]),
      lastName: new FormControl(this.data ? this.data.lastName : '', [Validators.required]),
      middleName: new FormControl(this.data ? this.data.middleName : '', [Validators.required]),
      phone: new FormControl(this.data ? this.data.phone : '', [Validators.required]),
      email: new FormControl(this.data ? this.data.email : '', [Validators.required, Validators.email]),
      date: new FormControl(this.data && this.data.date ? new Date(this.data.date) : '', [Validators.required])
    });
  }

  close(): void {
    this.data = {...this.data, ...this.workerControl.value};
    this.data.date = Date.parse(this.data.date + '');
    this.dialogRef.close(this.data);
  }

  onKeyDown(evt) {
    evt.prevenDefault();
  }

}

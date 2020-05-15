import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkerModalComponent } from '../worker-modal/worker-modal.component';
import { WorkersService } from '../workers.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Worker } from '../worker.model';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-workers-page',
  templateUrl: './workers-page.component.html',
  styleUrls: ['./workers-page.component.scss']
})
export class WorkersPageComponent implements OnInit {

  public workers$: Observable<Worker[]>;
  public displayedColumns: string[] = ['firstName', 'phone', 'email', 'date'];
  public role: string;

  constructor(
    public dialog: MatDialog,
    public workersService: WorkersService,
    public db: AngularFirestore,
    private auth: AuthService
  ) { }

  getWorkers(): void {
    this.workers$ = this.workersService.get();
  }

  add(worker: Worker): void {
    this.workersService.add(worker);
  }

  update(worker: Worker): void {
    this.workersService.update(worker);
  }

  remove(worker: Worker): void {
    this.workersService.remove(worker);
  }

  ngOnInit(): void {
    this.checkRole();
    this.getWorkers();
  }

  openDialog(worker?: Worker): void {
    const dialogRef = this.dialog.open(WorkerModalComponent, {
      width: '800px',
      data: worker ? {...worker} : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        worker ? this.update(result) : this.add(result);
      }
    });
  }

  checkRole() {
    this.role = this.auth.role$.getValue();
    if (this.role === 'admin') {
      this.displayedColumns.push('actions');
    }
  }

}

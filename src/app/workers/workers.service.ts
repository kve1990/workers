import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Worker } from './worker.model';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  private readonly URL = 'workers';
  public readonly workers$: BehaviorSubject<Worker|any>;

  constructor(public db: AngularFirestore) {
    this.workers$ = new BehaviorSubject([]);
  }

  public get(): Observable<Worker[]> {
    return this.db.collection(this.URL).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const [data, id] = [a.payload.doc.data() as Worker, a.payload.doc.id];
        this.workers$.next({ id, ...data });
        return this.workers$.getValue();
      }))
    );
  }

  public add(worker: Worker): void {
    this.db.collection(this.URL).add({...worker});
  }

  public update(worker: Worker): void {
    const itemDoc = this.db.doc(`${this.URL}/${worker.id}`);
    itemDoc.update({...worker});
  }

  public remove(worker: Worker): void {
    const itemDoc = this.db.doc(`${this.URL}/${worker.id}`);
    itemDoc.delete();
  }

}

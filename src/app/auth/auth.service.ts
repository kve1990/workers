import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, debounceTime } from 'rxjs/operators';
import { IUser } from './user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public role$: BehaviorSubject<string>;

  constructor(public db: AngularFirestore, public router: Router) {
    this.role$ = new BehaviorSubject(null);
  }

  getUser(login: string, pass: string): Observable<boolean> {
    return this.db.doc(`users/${login}`).valueChanges().pipe(
      debounceTime(300),
      map(res => {
        if (res && res['pass'] === pass) {
          this.role$.next(res['pass']);
          return true;
        } else {
          this.logout();
          return false;
        }
      })
    );
  }

  logout() {
    this.role$.next(null);
    this.router.navigate(['login']);
  }
}

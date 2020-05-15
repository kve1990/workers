import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  public login: string;
  public pass: string;
  public isErrorLoogin: boolean;
  private subscribtions = [];

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.subscribtions.push(this.auth.role$.subscribe(role => {
      if (role) {
        this.router.navigate(['workers']);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscribtions.forEach(subr => subr.unsubscribe());
  }

  submit(): void {
    if (this.login && this.pass) {
      this.subscribtions.push(this.auth.getUser(this.login, this.pass).subscribe(res => {
        this.isErrorLoogin = !res;
      }));
    }
  }

}

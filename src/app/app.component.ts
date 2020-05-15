import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public title = 'Сотрудники';
  public isRoleExist: boolean;
  private subscribtions = [];

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.subscribtions.push(
      this.auth.role$.subscribe(role => this.isRoleExist = !!role)
    );
  }

  ngOnDestroy() {
    this.subscribtions.forEach(subr => subr.unsubscribe());
  }

  logout() {
    this.auth.logout();
  }
}

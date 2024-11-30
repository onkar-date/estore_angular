import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { User } from './shared/interface/User.interface';
import { AppState } from './store/app.state';
import { autoLogin } from './store/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'estore_angular';

  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user: User = JSON.parse(userData);
      this.store.dispatch(autoLogin({ user }));
    }
  }
}

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NotifyService } from 'ngx-notify';
import { Subscription, fromEvent } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService, UtilsService, ScreenService } from '../../shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() menuItems;
  @Input() settings;
  @ViewChild('header') header;

  onScroll: Subscription;
  isSticky = false;
  isSearching = false;
  visibleUserMenu = false;
  visibleCollapsedMenu = false;
  visibleMobileMenu = false;
  visibleCart = false;
  visibleNotifications = false;
  visibleLoginModal = false;
  visibleSignupModal = false;

  user: any = null;

  constructor(
    private screen: ScreenService,
    private notify: NotifyService,
    private auth: AuthService,
    private utils: UtilsService,
    private jwtHelper: JwtHelperService,
  ) {}

  get isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  ngOnInit() {
    setTimeout(() => this.scrollHandler(), 0);

    this.onScroll = fromEvent(window, 'scroll')
      .subscribe(this.scrollHandler.bind(this));

    this.user = this.auth.user;
  }

  showUserMenu(ref) {
    this.visibleUserMenu = true;
    this.utils.addClickOutsideEvent(ref, () => (this.visibleUserMenu = false));
  }

  showCart(ref) {
    this.visibleCart = true;
    this.utils.addClickOutsideEvent(ref, () => (this.visibleCart = false));
  }

  showCollapsedMenu(ref) {
    this.visibleCollapsedMenu = true;
    this.utils.addClickOutsideEvent(
      ref,
      () => (this.visibleCollapsedMenu = false),
    );
  }

  showLoginModal() {
    this.visibleLoginModal = true;
    this.visibleSignupModal = false;
  }

  showSignupModal() {
    this.visibleLoginModal = false;
    this.visibleSignupModal = true;
  }

  login({ formValues, valid }) {
    this.screen.block = true;
    if (valid) {
      this.auth.login({ ...formValues })
        .subscribe((res: any) => {
          const { body: { user, token }, status } = res;

          /*
          const dateInTime = new Date().setMinutes(2);

          const decodedToken = this.jwtHelper.decodeToken(token);
          console.log(decodedToken.exp);
          decodedToken.exp = dateInTime;
          console.log(decodedToken.exp);


          const encodedToken = btoa(JSON.stringify(decodedToken));
          console.log(this.jwtHelper.getTokenExpirationDate(encodedToken));
          */
          if (status === 200) {
            this.auth.saveToken(token);
            this.auth.saveUser(user);
            if (!!user) {
              this.user = user;
            }
            this.visibleLoginModal = false;
            this.notify.info(`Hi ${user.username}`, `Welcome aboard!`, { timeout: 3000 });
          }
      },
      this.onLoginError.bind(this),
      this.onLoginDone.bind(this)
      );
    } else {
      this.screen.block = false;
      this.notify.error('Error', 'Please fill all required fields', { timeout: 3000 });
    }
  }

  signup({ formValues, valid }) {
    const { password, passwordConfirm, firstname, lastname } = formValues;
    this.screen.block = true;
    if (valid) {
      this.auth.signup({ ...formValues,
          password1: password,
          password2: passwordConfirm,
          first_name: firstname,
          last_name: lastname,
        })
        .subscribe((res: any) => {
          const { body: { user, token }, status } = res;
          if (status === 201) {
            this.auth.saveToken(token);
            this.auth.saveUser(user);
            if (!!user) {
              this.user = user;
            }
            this.visibleSignupModal = false;
            this.notify.info(`Hi ${user.username}`, `Welcome aboard!`, { timeout: 3000 });
          }
      },
      this.onLoginError.bind(this),
      this.onLoginDone.bind(this)
      );
    } else {
      this.screen.block = false;
      this.notify.error('Error', 'Please fill all required fields', { timeout: 3000 });
    }
  }

  logout() {
    this.auth.logout();
  }

  private onLoginError(err) {
    const errors = this.utils.parseBodyErros(err._body);
    if (errors && errors.length > 0) {
      errors.forEach(error => this.notify.error('Error', error, { timeout: 3000 }));
    } else {
      const message = errors && errors.length > 0 ? errors : err.statusText;
      this.notify.error('Error', message, { timeout: 3000 });
    }
    this.screen.block = false;
  }

  private onLoginDone() {
    this.screen.block = false;
  }

  private scrollHandler() {
    const header = this.header.nativeElement;
    const { scrollY } = window;

    if (scrollY >= header.offsetHeight) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }
}

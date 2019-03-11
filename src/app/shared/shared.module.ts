import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NotifyModule } from 'ngx-notify';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { TooltipDirective } from './directives';
import { TOKEN_STORAGE_KEY } from './constants';

import {
  ConfigService,
  HttpService,
  ScreenService,
  APIService,
  UtilsService,
  BackendService,
  AuthService,
  MailService
} from './services';

export function HTTPConfig(http: Http) {
  return new HttpService(http);
}

export function APIConfig(http: Http) {
  return new APIService(http);
}

export function AppConfig(http: HttpService) {
  return () => new Promise((resolve, reject) => {
    http.getData('/config/api.json')
      .subscribe( (response: any) => {
        ConfigService.apiHost = response.url;
        resolve(true);
      });
  });
}

export function tokenGetter() {
  return sessionStorage.getItem(TOKEN_STORAGE_KEY);
}

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    NotifyModule.forRoot({
      options: {
        position: ['right', 'top'],
        offset: [20, 20],
        lastOnBottom: true,
        zIndex: 999991,
        minWidth: 400,
        maxWidth: 300
      },
      notify: {
          progress: true
      }
    })
  ],
  declarations: [],
  providers: [
    TooltipDirective
  ]
})
export class SharedModule {

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ScreenService,
        UtilsService,
        BackendService,
        AuthService,
        JwtHelperService,
        MailService,
        {
          provide: HttpService,
          useFactory: HTTPConfig,
          deps: [ Http ]
        },
        {
          provide: APIService,
          useFactory: APIConfig,
          deps: [ Http ]
        },
        {
          provide: APP_INITIALIZER,
          useFactory: AppConfig,
          deps: [ HttpService ],
          multi: true
        }
      ]
    };
  }
}

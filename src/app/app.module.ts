import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material-module';
import { AppRoutingModule } from './app-routing.module';
import { KeycloakService } from './services/keycloak/keycloak.service';
import { HttpTokenInterceptor } from './services/interceptor/http-token.interceptor';
import { CodeInputModule } from 'angular-code-input';
import { APP_BASE_HREF } from '@angular/common';

export function KcFactory(kcService: KeycloakService){
  return () => kcService.init();
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CodeInputModule,
    MaterialModule,
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: KcFactory,
      multi: true
    },
    {
      provide: APP_BASE_HREF,
      useValue: './'
    }
  ],
  exports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CodeInputModule,
    MaterialModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }

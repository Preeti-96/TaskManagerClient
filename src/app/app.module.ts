import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TaskViewComponent} from './pages/task-view/task-view.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NewListComponent} from './pages/new-list/new-list.component';
import {NewTaskComponent} from './pages/new-task/new-task.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {WebReqInterceptor} from './authentication/web-req.interceptor';
import { SignUpPageComponent } from './pages/signup-page/signup-page.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {TooltipModule} from 'ng2-tooltip-directive';


@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewListComponent,
    NewTaskComponent,
    LoginPageComponent,
    SignUpPageComponent,
    EditListComponent,
    EditTaskComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TooltipModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

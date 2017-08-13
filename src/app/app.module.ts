import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { ErrorComponent } from './shared/error.component';
import { ErrorService } from './shared/error.service';

/* Feature Modules */
import { ProductModule } from './product/product.module';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'error', component: ErrorComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
    ProductModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    ErrorComponent
  ],
  providers: [ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BookDetailComponent} from './components/book-detail/book-detail.component';
import {BookListComponent} from './components/book-list/book-list.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}), // add necessary states
    EffectsModule.forRoot([]),
    ReactiveFormsModule,

    LoadingBarRouterModule,

    // add necessary effects
  ],
  declarations: [
    AppComponent,
    BookListComponent,
    BookDetailComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}


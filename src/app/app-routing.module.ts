import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookDetailComponent} from './components/book-detail/book-detail.component';
import {BookListComponent} from './components/book-list/book-list.component';
import {BookResolverService} from './services/book-resolver.service';

const routes: Routes = [
  {path: '', redirectTo: '/books', pathMatch: 'full'},
  {
    path: 'book/:isbn',
    component: BookDetailComponent,
    resolve: {data: BookResolverService},
  },
  {path: 'book', component: BookDetailComponent},
  {path: 'books', component: BookListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

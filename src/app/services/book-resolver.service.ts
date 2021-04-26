import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {EMPTY, forkJoin, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Book} from '../interfaces/book.interface';
import {BooksService} from './books.service';

@Injectable({
  providedIn: 'root',
})
export class BookResolverService {

  constructor(private readonly bookService: BooksService, private readonly http: HttpClient) {
  }

  public resolve(route: ActivatedRouteSnapshot):
    Observable<{ book: Book }> {
    if (route.paramMap.has('isbn')) {
      const isbn = route.paramMap.get('isbn');
      const bibKeys = `ISBN:${isbn}`;
      return forkJoin([
        this.bookService.getSingle(isbn),
        this.http.get(`https://openlibrary.org/api/books?bibkeys=${bibKeys}&jscmd=details&format=json`).pipe(map((res) =>
          res[bibKeys] !== undefined ? res[bibKeys].details : {},
        )).pipe(catchError(() => of({}))),
      ]).pipe(
        map(([book, bookDetails]) => {
          book.description = bookDetails.description;
          book.notes = bookDetails.notes;
          return {book};
        }),
        catchError(() => EMPTY),
      );
    }
  }
}

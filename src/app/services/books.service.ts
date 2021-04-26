import {Injectable} from '@angular/core';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {Observable, of} from 'rxjs';
import {delay, finalize, tap} from 'rxjs/operators';
import {books} from '../../assets/books';
import {Book} from '../interfaces/book.interface';

const DELAY = 3000;

@Injectable({providedIn: 'root'})
export class BooksService {

  private loader = this.loadingBar.useRef();

  constructor(private readonly loadingBar: LoadingBarService) {
  }

  /**
   * Read
   *
   * @param params
   */
  getAll(params: { language: string; country: string } = null): Observable<Array<Book>> {
    return of(books)
      .pipe(tap(() => this.loader.start()), delay(DELAY), finalize(() => this.loader.stop()));
  }

  /**
   * Read
   *
   * @param isbn
   */
  getSingle(isbn: string): Observable<Book> {
    return of(books.find((book: Book) => book.isbn === isbn))
      .pipe(tap(() => this.loader.start()), delay(DELAY), finalize(() => this.loader.stop()));
  }

  /**
   * Create
   *
   * @param newBook
   */
  postSingle(newBook: Book): Observable<boolean> {

    books.unshift(newBook);

    return of(true)
      .pipe(tap(() => this.loader.start()), delay(DELAY), finalize(() => this.loader.stop()));
  }

  /**
   * Update
   *
   * @param isbn
   * @param newBook
   */
  putSingle(isbn: string, newBook: Book): Observable<boolean> {

    const index = books.map((book) => book.isbn).indexOf(isbn);

    if (index !== -1) {
      books[index] = {...books[index], ...newBook};
    }

    return of(index !== -1).pipe(tap(() => this.loader.start()), delay(DELAY), finalize(() => this.loader.stop()));
  }

  /**
   * Delete
   *
   * @param isbn
   */
  deleteSingle(isbn: string): Observable<boolean> {

    const index = books.map((book) => book.isbn).indexOf(isbn);

    if (index !== -1) {
      books.splice(index, 1);
    }

    return of(index !== -1).pipe(tap(() => this.loader.start()), delay(DELAY), finalize(() => this.loader.stop()));
  }
}

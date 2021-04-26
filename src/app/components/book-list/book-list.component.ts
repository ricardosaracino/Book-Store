import {Component, OnInit} from '@angular/core';
import {Book} from '../../interfaces/book.interface';
import {BooksService} from '../../services/books.service';
// import { Store } from '@ngrx/store';
// import { AppState } from '../../store';
// import * as fromStore from '../../store';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {

  public books: Array<Book> = [];
  public origBooks: Array<Book> = [];

  constructor(
    private readonly bookService: BooksService,
  ) {
  }

  ngOnInit() {
    this.bookService.getAll()
      .subscribe((books) => this.books = this.origBooks = books);
  }

  onFilter(filterVal) {
    this.books = this.origBooks.filter((book) =>
      book.title.toLowerCase().includes(filterVal.toLowerCase()) ||
      book.author.toLowerCase().includes(filterVal.toLowerCase()) ||
      book.language.toLowerCase().includes(filterVal.toLowerCase()) ||
      book.country.toLowerCase().includes(filterVal.toLowerCase()),
    );
  }
}

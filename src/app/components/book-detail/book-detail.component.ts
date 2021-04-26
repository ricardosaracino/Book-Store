import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {Book} from '../../interfaces/book.interface';
import {BooksService} from '../../services/books.service';
// import { Store } from '@ngrx/store';
// import { AppState } from '../../store';

const NO_SPECIAL_REGEXP = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/;

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {

  bookForm: FormGroup;

  // denotes create vs update
  book: Book = null;

  sending = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly bookService: BooksService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {
    this.bookForm = formBuilder.group({
      isbn: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      title: ['', [Validators.required, Validators.pattern(NO_SPECIAL_REGEXP)]],
      author: ['', [Validators.required, Validators.pattern(NO_SPECIAL_REGEXP)]],
      language: ['', [Validators.required, Validators.pattern(NO_SPECIAL_REGEXP)]],
      year: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      country: ['', [Validators.required, Validators.pattern(NO_SPECIAL_REGEXP)]],
    });
  }

  ngOnInit() {

    this.activatedRoute.data.subscribe((params: { data: { book: Book; bookDetails: { description: string } } }) => {

      if (params.data !== undefined) {

        this.book = params.data.book;

        this.bookForm.get('isbn').setValue(this.book.isbn);
        this.bookForm.get('title').setValue(this.book.title);
        this.bookForm.get('author').setValue(this.book.author);
        this.bookForm.get('language').setValue(this.book.language);
        this.bookForm.get('year').setValue(this.book.year);
        this.bookForm.get('country').setValue(this.book.country);
      }
    });
  }

  onSubmit() {

    this.bookForm.markAllAsTouched();

    if (this.bookForm.valid) {

      let save;

      if (this.book === null) {
        save = this.bookService.postSingle(this.bookForm.value);
      } else {
        save = this.bookService.putSingle(this.book.isbn, this.bookForm.value);
      }

      this.sending = true;
      save
        .pipe(finalize(() => this.sending = false))
        .subscribe(() => this.router.navigate([`/books`]));
    }
  }

  onDelete() {
    this.sending = true;
    this.bookService.deleteSingle(this.book.isbn)
      .pipe(finalize(() => this.sending = false))
      .subscribe(() => this.router.navigate([`/books`]));
  }
}

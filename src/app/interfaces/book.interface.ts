export interface Book {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
  isbn: string;
  description?: string; /* from openlibrary */
  notes?: string; /* from openlibrary */
}

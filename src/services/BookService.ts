import booksApi from "../api/booksApi";
import { Book } from "../models/Book";

export class BookService {
  async getBooksByGenre(genreId: string): Promise<Book[]> {
    const books = await booksApi.fetchBooksByGenre(genreId);
    return books;
  }

  async getBookDetails(bookId: string): Promise<Book | null> {
    try {
      const books = await booksApi.fetchBooksByGenre("all");
      return books.find((book) => book.id === bookId) || null;
    } catch (error) {
      console.error("Error fetching book details:", error);
      return null;
    }
  }

  getRelatedBooks(_book: Book): Book[] {
    return [];
  }
}

export default new BookService();

import apiClient from "../api/apiClient";
import { Book } from "../models/Book";
import { Genre } from "../models/Genre";

export const bookService = {
  async fetchBooksByGenre(genreListName: string): Promise<Book[]> {
    try {
      const response = await apiClient.get<{ results: any }>(
        `/lists/current/${genreListName}.json`,
      );

      let books: any[] = [];

      if (response.results.books) {
        books = response.results.books;
      } else if (Array.isArray(response.results)) {
        response.results.forEach((item: any) => {
          if (item.books && Array.isArray(item.books)) {
            books = [...books, ...item.books];
          } else {
            books.push(item);
          }
        });
      }

      console.log(
        `Encontrados ${books.length} livros para o gênero ${genreListName}`,
      );

      return books.map((book: any) => Book.fromApiData(book));
    } catch (error) {
      console.error(`Erro ao buscar livros do gênero ${genreListName}:`, error);
      return [];
    }
  },

  async searchBooks(term: string, genre?: Genre): Promise<Book[]> {
    if (genre) {
      const books = await this.fetchBooksByGenre(genre.name);
      return books.filter(
        (book) =>
          book.title.toLowerCase().includes(term.toLowerCase()) ||
          book.author.toLowerCase().includes(term.toLowerCase()),
      );
    }

    return [];
  },
};

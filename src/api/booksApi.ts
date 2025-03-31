import axios, { AxiosInstance } from "axios";
import { Genre } from "../models/Genre";
import { Book } from "../models/Book";

const API_KEY = import.meta.env.VITE_NYT_API_KEY || "YOUR_NYT_API_KEY";

class BooksApi {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://api.nytimes.com/svc/books/v3",
      params: {
        "api-key": API_KEY,
      },
    });
  }

  async fetchGenres(): Promise<Genre[]> {
    try {
      const response = await this.client.get("/lists/names.json");
      return response.data.results.map((genre: Genre) =>
        Genre.fromApiData(genre),
      );
    } catch (error) {
      console.error("Erro ao buscar gêneros:", error);
      throw error;
    }
  }

  async fetchBooksByGenre(genreListName: string): Promise<Book[]> {
    try {
      const response = await this.client.get(
        `/lists/current/${genreListName}.json`,
      );

      if (!response.data || !response.data.results) {
        console.error("Formato de resposta inválido:", response.data);
        throw new Error("Formato de resposta inválido da API");
      }

      let books: Book[] = [];

      if (response.data.results.books) {
        books = response.data.results.books;
      } else if (Array.isArray(response.data.results)) {
        response.data.results.forEach((item: any) => {
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

      return books.map((book: Book) => Book.fromApiData(book));
    } catch (error: any) {
      console.error(
        `Erro ao buscar livros do gênero ${genreListName}:`,
        error.message,
      );
      if (error.response) {
        console.error("Detalhes da resposta:", {
          status: error.response.status,
          data: error.response.data,
        });
      }
      throw new Error(
        `Falha ao carregar livros do gênero ${genreListName}: ${error.message}`,
      );
    }
  }
}

export default new BooksApi();

import apiClient from "../api/apiClient";
import { Genre } from "../models/Genre";

export const genreService = {
  async fetchGenres(): Promise<Genre[]> {
    try {
      const response = await apiClient.get<{ results: any[] }>(
        "/lists/names.json",
      );
      return response.results.map((genre: any) => Genre.fromApiData(genre));
    } catch (error) {
      console.error("Erro ao buscar gêneros:", error);
      return [];
    }
  },

  async searchGenres(term: string): Promise<Genre[]> {
    const genres = await this.fetchGenres();
    return genres.filter((genre) =>
      genre.name.toLowerCase().includes(term.toLowerCase()),
    );
  },
};

import type { Movie } from "../types";

export const MOCK_COMING_SOON: Movie[] = [
  {
    id: 29,
    slug: "princess-mononoke",
    title: "The Cartographer's Wife",
    kind: "film",
    runtimeMinutes: 134,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/cMYCDADoLKLbB83g4WnJegaZimC.jpg",
    backdropUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    releaseDate: "2026-10-02",
    isComingSoon: true,
    fromPrice: 16,
    ageRating: { code: "12+", minAge: 12, description: "12+" },
    genres: [{ id: 1, slug: "drama", name: "Drama" }],
    formats: [],
  },
  {
    id: 30,
    slug: "avatar-3",
    title: "Avatar: Fire and Ash",
    kind: "film",
    runtimeMinutes: 160,
    posterUrl: "",
    backdropUrl:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
    releaseDate: "2026-12-18",
    isComingSoon: true,
    fromPrice: 18,
    ageRating: { code: "12+", minAge: 12, description: "12+" },
    genres: [{ id: 2, slug: "sci-fi", name: "Sci-Fi" }],
    formats: [],
  },
];

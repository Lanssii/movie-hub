import type { HeroMovie } from "../types";

export const HERO_MOVIES: HeroMovie[] = [
  {
    id: 1,
    title: "THE ODYSSEY",
    category: "PREMIERE · WEEK OF 15 SEPT",
    ageRating: "12+",
    duration: "134 Min",
    formats: ["MAX", "PANORAMA"],
    description:
      "A king spends ten years finding his way home from a war he already won, while monsters, gods, and his own restlessness make sure the return takes longer than the fighting did. By the time land comes back into view, the man arriving is not quite the one who left.",
    backdropUrl: "/images/trailer1.png",
  },
  {
    id: 2,
    title: "SPIDER-MAN: ACROSS THE SPIDER-VERSE",
    category: "NOW SHOWING",
    ageRating: "PG",
    duration: "140 Min",
    formats: ["STANDARD", "ATMOS"],
    description:
      "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    backdropUrl:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1920&auto=format&fit=crop",
  },
];

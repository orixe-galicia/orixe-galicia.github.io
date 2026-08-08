import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const challengeStep = z.object({
  type: z.enum([
    "observation",
    "search",
    "history",
    "photo",
    "qr",
    "coordinates",
    "puzzle",
    "question",
    "final",
  ]),
  title: z.string().optional(),
  prompt: z.string(),
  instructions: z.string().optional(),
  answer: z.string().optional(),
  options: z.array(z.string()).optional(),
  hint: z.string().optional(),
});

const missionSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  municipality: z.string(),
  province: z.string(),
  coordinates: z.object({ lat: z.number(), lng: z.number() }),
  category: z.string(),
  ageRecommended: z.string(),
  duration: z.string(),
  distance: z.string().optional(),
  difficulty: z.string(),
  accessibility: z.string().optional(),
  image: z.string(),
  gallery: z.array(z.string()).default([]),
  descriptionShort: z.string(),
  descriptionLong: z.string(),
  story: z.object({
    title: z.string(),
    introduction: z.string(),
    historicalContext: z.string(),
    mystery: z.string(),
  }),
  mission: z.object({
    objective: z.string(),
    location: z.string(),
    instructions: z.array(z.string()),
  }),
  materials: z.array(z.string()).default([]),
  challenge: z.object({
    title: z.string(),
    introduction: z.string(),
    steps: z.array(challengeStep),
    successCondition: z.string(),
  }),
  clues: z.array(z.string()).default([]),
  solution: z.object({ explanation: z.string() }),
  badge: z.object({
    name: z.string(),
    description: z.string(),
    image: z.string().optional(),
  }),
  googleMaps: z.string().optional(),
  recommendations: z.array(z.string()).default([]),
  warnings: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

const missions = defineCollection({
  loader: glob({
    pattern: "**/*.{yaml,yml}",
    base: "./src/content/missions",
  }),
  schema: missionSchema.describe("OrixeMissionNarrativeSchema"),
});

export const collections = {
  missions,
};
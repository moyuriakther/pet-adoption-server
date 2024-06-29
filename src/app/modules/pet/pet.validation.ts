import { z } from "zod";

const PetSpecies = z.enum(["cat", "dog"]);
const PetSize = z.enum(["small", "medium", "large"]);
const Gender = z.enum(["male", "female"]);

const createPetValidation = z.object({
  body: z.object({
    name: z.string(),
    species: PetSpecies,
    gender: Gender,
    breed: z.string(),
    photos: z.array(z.string()).nonempty(),
    age: z.number().int().nonnegative().default(0),
    size: PetSize.default("small"),
    location: z.string(),
    description: z.string(),
    medicalHistory: z.string(),
    adoptionRequirements: z.string(),
    temperament: z.string(),
  }),
});

export const petValidation = { createPetValidation };

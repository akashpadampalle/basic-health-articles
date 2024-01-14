import { z } from "zod";

export const createArticleSchema = z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1),
    user: z.string().min(1).max(20).optional()
})

export interface Article {
    id: string,
    title: string,
    content: string,
    user: string
}
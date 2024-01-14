import { NextRequest, NextResponse } from "next/server";
import { createArticleSchema } from "./schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
    try {

        const articles = await prisma.article.findMany();
        return NextResponse.json(articles);

    } catch (error) {
        console.log(error);
        NextResponse.json({ error: "internal server error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validation = createArticleSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: "invalid data provided" }, { status: 400 });
        }

        const existringArticle = await prisma.article.findUnique({
            where: { title: body.title }
        });

        if (existringArticle) {
            return NextResponse.json({ error: "article already exists in database with same title" }, { status: 409 });
        }

        const article = await prisma.article.create({
            data: {
                title: body.title,
                content: body.content,
                user: body.user
            }
        });

        return NextResponse.json(article, { status: 201 });

    } catch (error) {
        console.log(error);
        NextResponse.json({ error: "internal server error" }, { status: 500 });
    }

}
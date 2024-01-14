import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const article = await prisma.article.findUnique({
            where: {id: params.id}
        });

        if (!article) {
            return NextResponse.json({error: "not found"}, {status: 404})
        }

        return NextResponse.json(article);

    } catch (error) {
        console.log(error);
        NextResponse.json({ error: 'internal server error' }, { status: 500 });
    }
}
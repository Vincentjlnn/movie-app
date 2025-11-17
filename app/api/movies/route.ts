import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const movies = await prisma.movie.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data film" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Judul film diperlukan" },
        { status: 400 }
      );
    }

    const newMovie = await prisma.movie.create({
      data: {
        title: title,
      },
    });

    return NextResponse.json(newMovie, { status: 201 }); 
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal membuat film baru" },
      { status: 500 }
    );
  }
}
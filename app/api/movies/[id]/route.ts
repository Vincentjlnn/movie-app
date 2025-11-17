import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id); 
    const movie = await prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      return NextResponse.json({ error: "Film tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data film" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    await prisma.movie.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Film berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menghapus film" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const body = await request.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ error: "Judul baru diperlukan" }, { status: 400 });
    }

    const updatedMovie = await prisma.movie.update({
      where: { id },
      data: { title },
    });

    return NextResponse.json(updatedMovie);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal memperbarui film" },
      { status: 500 }
    );
  }
}
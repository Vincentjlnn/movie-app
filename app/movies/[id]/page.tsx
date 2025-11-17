"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Movie {
  id: number;
  title: string;
  createdAt: string;
}

type MovieDetailProps = {
  params: {
    id: string; 
  };
};

export default function MovieDetail({ params }: MovieDetailProps) {
  const router = useRouter();
  const { id } = params;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        const res = await fetch(`/api/movies/${id}`);
        
        if (!res.ok) {
          throw new Error("Film tidak ditemukan");
        }

        const data = await res.json();
        setMovie(data); 
      } catch (error) {
        console.error(error);
        setMovie(null); 
      } finally {
        setIsLoading(false); 
      }
    };

    fetchMovie();
  }, [id]); 

  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mt-5">
        <div className="card p-4 text-center">
          <h3>Film tidak ditemukan</h3>
          <button className="btn btn-secondary mt-3" onClick={() => router.back()}>
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h3>Detail Film</h3>
        <p className="mt-3 fs-4">Judul: {movie.title}</p>
        <p className="text-muted small">
          ID Database: {movie.id} | Dibuat: {new Date(movie.createdAt).toLocaleDateString()}
        </p>
        <button className="btn btn-secondary mt-3" onClick={() => router.back()}>
          Back
        </button>
      </div>
    </div>
  );
}
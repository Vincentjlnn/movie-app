"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type EditMovieProps = {
  params: {
    id: string; 
  };
};

export default function EditMoviePage({ params }: EditMovieProps) {
  const router = useRouter();
  const { id } = params;

  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`/api/movies/${id}`);
        if (!res.ok) throw new Error("Film tidak ditemukan");
        const movie = await res.json();
        setTitle(movie.title); 
      } catch (err) {
        setError("Gagal memuat data film.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (title.trim() === "") {
      setError("Judul tidak boleh kosong.");
      return;
    }

    try {
      const res = await fetch(`/api/movies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title }), 
      });

      if (!res.ok) throw new Error("Gagal menyimpan perubahan");

      router.push('/movies');
      router.refresh(); 

    } catch (err) {
      setError("Gagal menyimpan perubahan.");
    }
  };

  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <p>Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2>Edit Film</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Judul Film</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>

          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              Simpan Perubahan
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => router.back()} 
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
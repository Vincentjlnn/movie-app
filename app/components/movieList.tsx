"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; 
import { useRouter } from "next/navigation";

interface Movie {
  id: number;
  title: string;
  createdAt: string;
}

export default function Movielist() {
  const [text, setText] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();

  const fetchMovies = async () => {
    try {
      const res = await fetch('/api/movies');
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();
      setMovies(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const addMovie = async () => {
    if (text.trim() === "") return;
    try {
      const res = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: text }),
      });
      if (!res.ok) throw new Error("Gagal menambah film");
      setText("");
      fetchMovies(); 
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus film ini?")) return;
    try {
      const res = await fetch(`/api/movies/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Gagal menghapus film");
      fetchMovies(); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="card-title">Tambah Film Favorit</h2>
          <div className="d-flex gap-2 mt-3">
            <input
              className="form-control"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Masukkan judul film"
            />
            <button className="btn btn-primary" onClick={addMovie}>
              Add
            </button>
          </div>
        </div>
      </div>

      <h2>Daftar Film</h2>
      <ul className="list-group">
        {movies.length === 0 && (
          <li className="list-group-item text-center text-muted">
            Memuat data atau belum ada film...
          </li>
        )}
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span className="fs-5">{movie.title}</span>
            <div className="d-flex gap-2">
              <Link href={`/movies/${movie.id}`} className="btn btn-info btn-sm">
                Detail
              </Link>
              
              <Link href={`/movies/${movie.id}/edit`} className="btn btn-warning btn-sm">
                Edit
              </Link>

              <button 
                className="btn btn-danger btn-sm" 
                onClick={() => deleteMovie(movie.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
import Link from "next/link";

interface GhibliMovie {
  id: string;
  title: string;
  description: string;
  release_date: string;
  image: string; 
  director: string;
}

async function getGhibliFilms() {
  const url = "https://ghibliapi.vercel.app/films";

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Gagal mengambil data dari Ghibli API");
    }
    const data = await res.json();
    return data as GhibliMovie[];
  } catch (error) {
    console.error(error);
    return []; 
  }
}

export default async function ExplorePage() {
  const movies = await getGhibliFilms();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Explore Studio Ghibli Films</h1>
        <Link href="/movies" className="btn btn-secondary">
          Kembali ke Daftar Saya
        </Link>
      </div>

      {movies.length === 0 && (
        <div className="alert alert-warning" role="alert">
          Tidak dapat mengambil data film Ghibli saat ini.
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {movies.map((movie) => (
          <div key={movie.id} className="col">
            <div className="card h-100 shadow-sm">
              <img
                src={movie.image} 
                className="card-img-top"
                alt={movie.title}
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title} ({movie.release_date})</h5>
                <h6 className="card-subtitle mb-2 text-muted">Sutradara: {movie.director}</h6>
                <p className="card-text small">
                  {movie.description.substring(0, 150)}...
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
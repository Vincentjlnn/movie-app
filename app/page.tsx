// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="bg-dark text-light p-5 mb-4">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Selamat Datang di Vinflix</h1>
          <p className="col-md-8 fs-4">
            Pusat pengelola daftar dan menjelajahi film baru yang populer.
          </p>
          
          <Link href="/movies" className="btn btn-primary btn-lg me-2">
            Buka Daftar Saya
          </Link>
          <Link href="/explore" className="btn btn-outline-light btn-lg">
            Jelajahi Film
          </Link>
        </div>
      </div>

      <div className="container">
        <div className="row">
          
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h3 className="card-title">🎬 Daftar Film Saya</h3>
                <p className="card-text flex-grow-1">
                  Kelola daftar film favorit pribadi Anda. Tambah, edit dan hapus
                  film yang Anda buat dari database SQLite.
                </p>
                <Link href="/movies" className="btn btn-success mt-auto">
                  Kelola Daftar
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h3 className="card-title">🍿 Jelajahi Film Populer</h3>
                <p className="card-text flex-grow-1">
                  Temukan film-film populer dari Studio Ghibli. Lihat poster,
                  sutradara, dan sinopsis langsung dari API eksternal.
                </p>
                <Link href="/explore" className="btn btn-info mt-auto">
                  Mulai Menjelajah
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <footer className="container text-center text-muted mt-5 pb-4">
        <hr />
        <p>&copy; 2025 Vinfix. Dibuat oleh Vincent Julian.</p>
      </footer>
    </>
  );
}
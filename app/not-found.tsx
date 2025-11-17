import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          
          <div className="card shadow-lg p-4">
            <div className="card-body">
              
              <h1 className="display-1 fw-bold text-danger">404</h1>
              
              <h2 className="card-title mb-3">Halaman Tidak Ditemukan</h2>
              
              <p className="card-text text-muted">
                Maaf, halaman yang Anda cari tidak ada atau mungkin telah dipindahkan.
              </p>
              
              <Link href="/" className="btn btn-primary mt-3">
                Kembali ke Home
              </Link>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
import React from 'react';

const Verifikasi: React.FC = () => {
    const handleVerifikasi = () => {
        alert('Verifikasi berhasil!');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Halaman Verifikasi</h1>
            <p>Silakan klik tombol di bawah untuk verifikasi</p>
            <button onClick={handleVerifikasi}>Verifikasi</button>
        </div>
    );
};

export default Verifikasi;
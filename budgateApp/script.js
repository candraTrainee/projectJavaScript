let totalAnggaran = document.getElementById('total-anggaran');
let jumlahPengeluaran = document.getElementById('jumlah-pengeluaran');
const cekJumlahBtn = document.getElementById('cek-jumlah');
const tombolSetAnggaran = document.getElementById('tombol-set-anggaran');
const judulProduk = document.getElementById('judul-produk');
const errorJudulProduk = document.getElementById('error-judul-produk');
const errorAnggaran = document.getElementById('error-anggaran');
const jumlahAnggaran = document.getElementById('jumlah-anggaran');
const nilaiPengeluaran = document.getElementById('nilai-pengeluaran');
const jumlahSisa = document.getElementById('jumlah-sisa');
const daftar = document.getElementById('daftar');
let jumlahTotalAnggaran = 0;

// Mengupdate anggaran total ketika nilai input berubah
totalAnggaran.addEventListener('change', () => {
    jumlahTotalAnggaran = totalAnggaran.value;
    if (jumlahTotalAnggaran === '' || jumlahTotalAnggaran < 0) {
        errorAnggaran.classList.remove('sembunyi');
    } else {
        errorAnggaran.classList.add('sembunyi');
        jumlahAnggaran.innerHTML = jumlahTotalAnggaran;  // Menampilkan anggaran total
        jumlahSisa.innerHTML = jumlahTotalAnggaran - nilaiPengeluaran.innerHTML;  // Menampilkan sisa
        totalAnggaran.value = '';  // Mengosongkan input setelah menyimpan anggaran
    }
});

// Fungsi untuk menonaktifkan atau mengaktifkan tombol edit
const nonaktifkanBtn = (bool) => {
    let tombolEdit = document.getElementsByName('edit');
    Array.from(tombolEdit).forEach((elemen) => {
        elemen.disabled = bool;
    });
};

// Mengubah elemen pengeluaran ketika tombol edit atau hapus diklik
const ubahElemen = (elemen, edit = false) => {
    let divInduk = elemen.parentElement;
    let saldoSaatIni = parseInt(jumlahSisa.innerText, 10);
    let pengeluaranSaatIni = parseInt(nilaiPengeluaran.innerText, 10);
    let jumlahInduk = parseInt(divInduk.querySelector('.jumlah').innerText, 10);

    if (edit) {
        let teksInduk = divInduk.querySelector('.produk').innerText;
        judulProduk.value = teksInduk;
        jumlahPengeluaran.value = jumlahInduk;
        nonaktifkanBtn(true);
    }
    jumlahSisa.innerText = saldoSaatIni + jumlahInduk;
    nilaiPengeluaran.innerText = pengeluaranSaatIni - jumlahInduk;
    divInduk.remove();
};

// Membuat daftar pengeluaran
const buatDaftar = (namaProduk, jumlahPengeluaran) => {
    let kontenSubList = document.createElement('div');
    kontenSubList.classList.add('konten-sublist', 'flex-space');
    daftar.appendChild(kontenSubList);
    kontenSubList.innerHTML = `<p class="produk">${namaProduk}</p>
                                <p class="jumlah">${jumlahPengeluaran}</p>`;
    
    let tombolEdit = document.createElement('button');
    tombolEdit.classList.add("ri-quill-pen-ai-line", "edit");
    tombolEdit.style.fontSize = '24px';
    tombolEdit.addEventListener('click', () => {
        ubahElemen(tombolEdit, true);
    });

    let tombolHapus = document.createElement('button');
    tombolHapus.classList.add("ri-delete-bin-4-fill", "hapus");
    tombolHapus.style.fontSize = '24px';
    tombolHapus.addEventListener('click', () => {
        ubahElemen(tombolHapus);
    });

    kontenSubList.appendChild(tombolEdit);
    kontenSubList.appendChild(tombolHapus);
};

// Memeriksa pengeluaran yang dimasukkan dan memperbarui sisa anggaran
cekJumlahBtn.addEventListener('click', () => {
    if (!jumlahPengeluaran.value || !judulProduk.value) {
        errorJudulProduk.classList.remove('sembunyi');
        return false;
    }
    nonaktifkanBtn(false);

    let pengeluaran = parseInt(jumlahPengeluaran.value, 10);
    let totalPengeluaran = parseInt(nilaiPengeluaran.innerText, 10) + pengeluaran;
    nilaiPengeluaran.innerText = totalPengeluaran;
    const saldoTotal = jumlahTotalAnggaran - totalPengeluaran;
    jumlahSisa.innerText = saldoTotal;

    buatDaftar(judulProduk.value, jumlahPengeluaran.value);

    // Mengosongkan field setelah menambahkan pengeluaran
    judulProduk.value = '';
    jumlahPengeluaran.value = '';
});

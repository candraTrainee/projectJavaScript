let waktuTersisa = document.querySelector('.time-left');
let wadahKuis = document.getElementById('container');
let tombolBerikutnya = document.getElementById('next-button');
let jumlahPertanyaan = document.querySelector('.number-of-question');
let wadahTampilan = document.getElementById('display-container');
let wadahSkor = document.querySelector('.score-container');
let mulaiUlang = document.getElementById('restart');
let skorPengguna = document.getElementById('user-score');
let layarMulai = document.querySelector('.start-screen');
let tombolMulai = document.getElementById('start-button');

let hitungPertanyaan;
let hitungSkor = 0;
let hitung = 11;
let hitungMundur;

// Aturan pertanyaan
const arrayKuis = [
    {
        Id: '0',
        pertanyaan: 'Apa kepanjangan dari HTML?',
        opsi: ['Hypertext Markup Language', 'Hyperlink Text Mode Language', 'High-Tech Machine Language', 'Hypertext Management Language'],
        jawabanBenar: 'Hypertext Markup Language',
    },
    {
        Id: '1',
        pertanyaan: 'Sistem operasi apa yang dikembangkan oleh Microsoft?',
        opsi: ['MacOS', 'Windows', 'Linux', 'Android'],
        jawabanBenar: 'Windows',
    },
    {
        Id: '2',
        pertanyaan: 'Apa nama bahasa pemrograman yang paling umum digunakan untuk pengembangan aplikasi web?',
        opsi: ['Java', 'Python', 'JavaScript', 'C++'],
        jawabanBenar: 'JavaScript',
    }
];

mulaiUlang.addEventListener('click', () => {
    inisialisasi();
    wadahTampilan.classList.remove('hide');
    wadahSkor.classList.add('hide');
});

tombolBerikutnya.addEventListener('click', () => {
    hitungPertanyaan += 1;
    if (hitungPertanyaan == arrayKuis.length) {
        wadahTampilan.classList.add('hide');
        wadahSkor.classList.remove('hide');
        skorPengguna.innerHTML = `Skor Anda adalah ${hitungSkor} dari ${arrayKuis.length} pertanyaan`;

        tampilkanKuis(hitungPertanyaan);
        hitung = 11;
        clearInterval(hitungMundur);
        tampilkanTimer();
    } else {
        tampilkanKuis(hitungPertanyaan);
    }
});

function periksaJawaban(jawabanPengguna) {
    let solusiPengguna = jawabanPengguna.innerText; // Ambil teks yang dipilih oleh pengguna
    let soal = document.getElementsByClassName('container-mid')[hitungPertanyaan]; // Ambil soal yang sesuai

    // Dapatkan semua opsi dari soal ini
    let opsi = document.querySelectorAll('.option-div');

    // Cek apakah jawaban pengguna benar
    if (solusiPengguna == arrayKuis[hitungPertanyaan].jawabanBenar) {
        jawabanPengguna.classList.add('correct'); // Tandai jawaban benar
        hitungSkor++; // Tambah skor jika benar
    } else {
        jawabanPengguna.classList.add('incorrect'); // Tandai jawaban salah

        // Tandai jawaban yang benar pada semua opsi
        opsi.forEach((elemen) => {
            if (elemen.innerHTML == arrayKuis[hitungPertanyaan].jawabanBenar) { // Bandingkan dengan jawaban yang benar
                elemen.classList.add('correct'); // Tandai jawaban benar
            };
        });
    }

    // Menonaktifkan tombol setelah memilih jawaban
    clearInterval(hitungMundur);
    opsi.forEach((elemen) => {
        elemen.disabled = true; // Menonaktifkan pilihan yang sudah dipilih
    });
};

const tampilkanTimer = () => {
    hitungMundur = setInterval(() => {
        hitung--;
        waktuTersisa.innerHTML = `${hitung}`;
        if (hitung == 0) {
            clearInterval(hitungMundur);
            tampilkanBerikutnya();
        }
    }, 1000);
};

const tampilkanKuis = (hitungPertanyaan) => {
    let kartuKuis = document.querySelectorAll('.container-mid');
    kartuKuis.forEach((kartu) => {
        kartu.classList.add('hide');
    });

    // Menampilkan soal yang sesuai
    kartuKuis[hitungPertanyaan].classList.remove('hide');
    jumlahPertanyaan.innerHTML = (hitungPertanyaan + 1) + ' dari ' + arrayKuis.length + ' pertanyaan';

    // Mengaktifkan tombol pilihan yang baru
    let opsi = kartuKuis[hitungPertanyaan].querySelectorAll('.option-div');
    opsi.forEach((option) => {
        option.disabled = false; // Mengaktifkan kembali tombol pilihan
        option.classList.remove('correct', 'incorrect'); // Menghapus tanda warna yang sudah ada
    });
};

function buatKuis() {
    arrayKuis.sort(() => Math.random() - 0.5); // Acak pertanyaan
    for (let i of arrayKuis) {
        i.opsi.sort(() => Math.random() - 0.5); // Acak opsi pertanyaan
        let div = document.createElement('div');
        div.classList.add('container-mid', 'hide');

        // Menambahkan soal (pertanyaan) ke dalam div
        let divPertanyaan = document.createElement('p');
        divPertanyaan.classList.add('question');
        divPertanyaan.innerHTML = i.pertanyaan; // Menampilkan soal
        div.appendChild(divPertanyaan); // Menambahkan soal ke dalam div

        // Membuat tombol pilihan dan menambahkannya ke div
        i.opsi.forEach((opsi, index) => {
            let tombol = document.createElement('button');
            tombol.classList.add('option-div');
            tombol.innerHTML = opsi;
            tombol.setAttribute('onclick', 'periksaJawaban(this)');
            div.appendChild(tombol); // Menambahkan pilihan ke dalam div
        });

        wadahKuis.appendChild(div); // Menambahkan div ke dalam wadahKuis
    };
};

function inisialisasi() {
    wadahKuis.innerHTML = '';
    hitungPertanyaan = 0;
    hitungSkor = 0;
    hitung = 11;
    clearInterval(hitungMundur); // Hentikan timer jika ada
    tampilkanTimer(); // Mulai timer untuk soal pertama
    buatKuis(); // Membuat soal baru
    tampilkanKuis(hitungPertanyaan); // Tampilkan soal pertama
};

tombolMulai.addEventListener('click', () => {
    layarMulai.classList.add('hide');
    wadahTampilan.classList.remove('hide');
    inisialisasi();
});

window.onload = () => {
    layarMulai.classList.remove('hide');
    wadahTampilan.classList.add('hide');
};

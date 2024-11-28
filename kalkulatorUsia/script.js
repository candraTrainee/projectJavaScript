const mounts = [31,28,31,30,31,30,31,31,30,31,30,31];
const tahun = document.getElementById('tahun');
const bulan = document.getElementById('bulan');
const hari = document.getElementById('hari');



function btnCalculator(){
	let today = new Date();
	let inputData = new Date(document.getElementById('data-input').value);

	let detailKelahiran = {
		date:inputData.getDate(),
		month:inputData.getMonth() + 1,
		year:inputData.getFullYear()
	}
	let currentTahun = today.getFullYear();
	let currentBulan = today.getMonth() + 1;
	let currentHari = today.getDate();

	leapChecker(currentTahun);
	if(
		detailKelahiran.year > currentTahun ||
		(detailKelahiran.month > currentBulan && 
		detailKelahiran.year == currentTahun) ||
		(detailKelahiran.date > currentHari && detailKelahiran.month == currentBulan && detailKelahiran.year == currentTahun)
	){
		alert('Anda belum Lahir')
		return;
	}

	let brithTahun = currentTahun - detailKelahiran.year;
	let brithBulan, brithHari;

	// Menghitung selisih bulan
	if (currentBulan >= detailKelahiran.month) {
			brithBulan = currentBulan - detailKelahiran.month;
	} else {
			brithTahun--;
			brithBulan = 12 + currentBulan - detailKelahiran.month;
	}

	// Menghitung selisih tanggal
	if (currentHari >= detailKelahiran.date) {
			brithHari = currentHari - detailKelahiran.date;
	} else {
			brithBulan--;
			let days = mounts[currentBulan - 2];
			brithHari = days + currentHari - detailKelahiran.date;
			if (brithBulan < 0) {
					brithBulan = 11;
					brithTahun--;
			}
	}
	tahun.innerHTML = brithTahun;
	bulan.innerHTML = brithBulan;
	hari.innerHTML = brithHari;
}

function leapChecker(year){
	if(year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)){
		mounts[1] = 29;
	} else{
		mounts[1] = 28;
	}
};
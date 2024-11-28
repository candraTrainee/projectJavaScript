const mounts = [31,28,31,30,31,30,31,31,30,31,30,31];
const tahun = document.getElementById('tahun');
const bulan = document.getElementById('bulan');
const hari = document.getElementById('hari');



function btnCalculator(){
	let today = new Date();
	let inputData = new Date(document.getElementById('data-input').value);

	let brithDetail = {
		date:inputData.getDate(),
		month:inputData.getMonth() + 1,
		year:inputData.getFullYear()
	}
	let currentYear = today.getFullYear();
	let currentMonth = today.getMonth() + 1;
	let currentDate = today.getDate();

	leapChecker(currentYear);
	if(
		brithDetail.year > currentYear ||
		(brithDetail.month > currentMonth && 
		brithDetail.year == currentYear) ||
		(brithDetail.date > currentDate && brithDetail.month == currentMonth && brithDetail.year == currentYear)
	){
		alert('Anda belum Lahir')
		return;
	}

	let brithYear = currentYear - brithDetail.year;
	let brithMounth, brithDate;

	// Menghitung selisih bulan
	if (currentMonth >= brithDetail.month) {
			brithMounth = currentMonth - brithDetail.month;
	} else {
			brithYear--;
			brithMounth = 12 + currentMonth - brithDetail.month;
	}

	// Menghitung selisih tanggal
	if (currentDate >= brithDetail.date) {
			brithDate = currentDate - brithDetail.date;
	} else {
			brithMounth--;
			let days = mounts[currentMonth - 2];
			brithDate = days + currentDate - brithDetail.date;
			if (brithMounth < 0) {
					brithMounth = 11;
					brithYear--;
			}
	}
	tahun.innerHTML = brithYear;
	bulan.innerHTML = brithMounth;
	hari.innerHTML = brithDate;
}

function leapChecker(year){
	if(year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)){
		mounts[1] = 29;
	} else{
		mounts[1] = 28;
	}
};
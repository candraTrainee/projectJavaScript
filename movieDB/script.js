const searchBtn = document.querySelector('.search-button');
searchBtn.addEventListener('click', function() {
	const inputKeyword = document.querySelector('.input-keyword');
	fetch('http://www.omdbapi.com/?apikey=c2246f4&s=' + inputKeyword.value)
		.then(response => response.json())
		.then(response => {
			const movies = response.Search;
			let cards = '';
			movies.forEach (m => cards += showCard(m));
			const movieContainer = document.querySelector('.movie-container');
			movieContainer.innerHTML = cards;

			// ketika tombol detail di-kilik
			const modalDetailButton = document.querySelectorAll('.modal-detail-button');
			modalDetailButton.forEach(btn => {
				btn.addEventListener('click', function(){
					const imdbid = this.dataset.imdbid;
					fetch('http://www.omdbapi.com/?apikey=c2246f4&i=' + imdbid)
						.then(response => response.json())
						.then(m => {
							const movieDetail = showDetail(m);
							const modalBody = document.querySelector('.modal-body');
							modalBody.innerHTML = movieDetail;
						});
				});
			});
		});
});
function showCard(m){
	return `<div class="col-md-4 my-5">
					<div class="card">
						<img src="${m.Poster}" alt="card-img-top">
					<div class="card-body">
						<div class="card-title">${m.Title}</div>
						<div class="card-subtitle mb-2 text-muted">${m.Year}</div>
						<a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Go Details</a>
					</div>
					</div>
				</div>
				`;
};
function showDetail(m){
	return `<div class="container-fluid">
					<div class="row">
						<div class="col-md-3">
							<img src="${m.Poster}" alt="" class="img-fluid">
						</div>
						<div class="col-md">
							<ul class="list-group">
								<li class="list-group-item"><h4>${m.Title} ${m.Year}</h4></li>
								<li class="list-group-item"><strong>Directory : </strong> ${m.Director}</li>
								<li class="list-group-item"><strong>Actor : </strong> ${m.Actors}</li>
								<li class="list-group-item"><strong>Writer : </strong> ${m.Writer}</li>
								<li class="list-group-item"><strong>Plot : </strong> <br> ${m.Plot}</li>
							</ul>
						</div>
					</div>
				</div>`;
};
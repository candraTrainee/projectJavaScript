$('.search-button').on('click', function(){
	$.ajax({
		url: 'http://www.omdbapi.com/?apikey=yourKey&s=' + $('.input-keyword').val(),
		success: results => {
			const movies = results.Search;
			let card = '';
			movies.forEach(m => {
				card += showCard(m);
			});
			$('.movie-container').html(card);
	
			// ketika tombil detail di click
			$('.modal-detail-button').on('click', function(){
				$.ajax({
					url: 'http://www.omdbapi.com/?apikey=your key&i=' + $(this).data('imdbid'),
					success : m => {
						const movieDetail = showDetail(m);
						$('.modal-body').html(movieDetail);
					},
					error: (e) => {
						console.log(e.responseText);
					},
				});
			})
		},
		error: (e) => {
			console.log(e.responseText);
		}
	})
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
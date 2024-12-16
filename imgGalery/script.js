const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showBtn = document.getElementById('show-more-btn');
const accesKey = 'your API Key Unspalsh';

let keyWord = '';
let page = 1;
showBtn.style.display = 'none';

async function searchImg(){
	keyWord = searchBox.value;
	const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyWord}&client_id=${accesKey}&per_page=12`;

	const respons = await fetch(url);
	const data = await respons.json();
	const results = data.results;

	if(page === 1){
		searchResult.innerHTML = '';
	};
	results.map((results) => {
		const image = document.createElement('img');
		image.src = results.urls.small;
		const imageLink = document.createElement('a');
		imageLink.href = results.links.html;
		imageLink.target = '_blank';

		imageLink.appendChild(image);
		searchResult.appendChild(imageLink);
	});
	if (results.length > 0) {
		showBtn.style.display = 'block';
  	}
};
searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	page = 1;
	showBtn.style.display = 'none';
	searchImg();
});
showBtn.addEventListener('click', () => {
	page++;
	searchImg();
});
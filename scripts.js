var genre_films = ['best_films', 'Animation', 'Horror', 'Film-Noir', ];
var number_films = 7;
var url_api = 'http://127.0.0.1:8000/api/v1/titles/?genre='


function createAllCarrousel(){
	for (var category of genre_films){
		carrouselCategory(category);
	}
	bestFilm();
}

function carrouselCategory(genre){
	var balise_category = document.getElementById(genre);
	addFlecheGauche(balise_category);
	searchBestFilm(genre);
}

function searchBestFilm(genre,page=1,film_add=0, list_films=[]){
	var list_films = list_films;
	var page = page;
	var film_add = film_add;
	var balise = document.getElementById(genre);
	if (genre == 'best_films'){
		var url = 'http://127.0.0.1:8000/api/v1/titles/?genre=';
	} else {
		var url = 'http://127.0.0.1:8000/api/v1/titles/?genre=' + genre;
	}
	fetch(url + '&sort_by=-imdb_score&page=' + page.toString())
		.then(response => response.json())
		.then(films_list => {
			for (var i = 0; i < films_list.results.length; i++){
				if (film_add < number_films) {
					list_films.push(films_list.results[i.toString()]);
					addImgFilm(balise, films_list.results[i.toString()]);
					film_add += 1;
				}
			}
			page += 1;
			if (film_add < number_films){
				searchBestFilm(genre, page, film_add, list_films);
			}
			if (film_add == number_films){
				addFlecheDroite(balise);
			}
		})
		.catch(error => {
			console.log('Echec de la rêquete AJAX');
		})
	return list_films;
}

function bestFilm() {
	var balise = document.getElementById("img_best_film");
	fetch('http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score')
		.then(response => response.json())
		.then(films_list => {
			var best_film = films_list.results["0"];
			addImgFilm(balise, best_film);
			titleAndPlayBestFilm(best_film);
		})
		.catch(error => {
			console.log('Echec de la rêquete AJAX');
		})
}

function titleAndPlayBestFilm(film) {
	var balise = document.getElementById('tile_and_play_best_film');
	balise.innerHTML = '<h1 id="title_best_film">' + film.title + '</h3>' + 
					   ' <button id="play_best_film">Play</button>'
}
function addFlecheGauche(balise) {
	balise.innerHTML += '<img class="fleche" src=img/fleche_gauche.png onclick="">';
}

function addFlecheDroite(balise) {
	balise.innerHTML += '<img class="fleche" src=img/fleche_droite.png onclick="">';
}

function addImgFilm(balise, film) {
	balise.innerHTML += '<img class="img_film" src="' + film.image_url + '" onclick="modaleWindows(' + film.url.toString() + ')">';
}


/*function modaleWindow(url) {
	fetch(url)
	.then(response => response.json())
	.then(data =>{
		console.log(data);
	})
}*/
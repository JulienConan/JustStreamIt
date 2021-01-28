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
	addFlecheGauche(balise_category, genre);
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
					addImgFilm(balise, films_list.results[i.toString()], film_add, genre);
					film_add += 1;
				}
			}
			page += 1;
			if (film_add < number_films){
				searchBestFilm(genre, page, film_add, list_films);
			}
			if (film_add == number_films){
				addFlecheDroite(balise, genre);
				initVisibility(genre);
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
			addImgFilm(balise, best_film, 0, 'best_film');
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
function addFlecheGauche(balise, genre) {
	balise.innerHTML += '<img class="fleche" id="fleche_left_' + genre + '" src=img/fleche_gauche.png onclick="">';
}

function addFlecheDroite(balise, genre) {
	balise.innerHTML += '<img class="fleche" id="fleche_right_' + genre + '" src=img/fleche_droite.png onclick="defilementCarrousel ()">';
}

function addImgFilm(balise, film, number, genre) {
	if (genre == 'best_film') {
		balise.innerHTML += '<img class="img_film" id="' + genre + '" src="' + film.image_url + '" onclick="modalWindow(\'' + film.url + '\')"  style="display: block;">';
	} else {
		balise.innerHTML += '<img class="img_film" id="film_' + number + '_' + genre + '" src="' + film.image_url + '" onclick="modalWindow(\'' + film.url + '\')" style="display: none;">';
	}
}

function initVisibility (genre) {
		for (var i = 0; i < 4; i++) {
			var balise  = 'film_' + i + '_' + genre;
			document.getElementById(balise).style.display = "block";
		}
	}

function Visibility(balise) {

}

function modalWindow(url) {
	var modal = document.getElementById("myModal");
	var balise_data = document.getElementById("list_info_film");
	var balise_img = document.getElementById("img_film_modale");
	fetch(url)
		.then(response => response.json())
		.then(data => {

			balise_data.innerHTML = '<li class="infos_modal_film" id="title_modal_film"> Titre :' + data.title + '</li>' + 
							   '<li class="infos_modal_film" id="genres_modal_film"> Genre : '+ data.genres + '</li>' +
							   '<li class="infos_modal_film" id="date_published_modal_film"> Date de sortie :' + data.date_published + '</li>' +
							   '<li class="infos_modal_film" id="rated_modal_film"> Classement : ' + data.rated + '</li>' +
							   '<li class="infos_modal_film" id="imdb_score_modal_film"> Score IMDB' + data.imdb_score + '</li>' +
							   '<li class="infos_modal_film" id="directors_modal_film"> Réalisateurs : ' + data.directors + '</li>' +
							   '<li class="infos_modal_film" id="actors_modal_film"> Acteurs : '+ data.actors + '</li>' +
							   '<li class="infos_modal_film" id="duration_modal_film"> Durée : ' + data.duration + ' minutes</li>' +
							   '<li class="infos_modal_film" id="countries_modal_film"> Pays d\'origine : ' + data.countries + '</li>' +
							   '<li class="infos_modal_film" id="box_office_modal_film"> Résultat au box office : ' + data.genres + '</li>' +
							   '<li class="infos_modal_film" id="long_description_modal_film"> Résumé : ' + data.long_description + '</li>'

			balise_img.innerHTML = '<img id="img_film_modal" src="' + data.image_url + '">';
		})
		.catch(error => {
			console.log('Echec de la rêquete AJAX');
		})
	modal.style.display = "block";
}

//Close Modal Window
function closeModal() {
	var modal = document.getElementById("myModal");
	modal.style.display = "none";
};
var cpt_fleche = 0;

function defilementCarrousel () {
	cpt_fleche += 1;
	var balise = document.getElementById("fleche_right_best_films");
	notOnScreen();

	for (var i = cpt_fleche; i < cpt_fleche + 4; i++){
		if( i < number_films){
			var visibility = document.getElementById("film_" + i.toString() + "_best_films");
			visibility.style.display = "block";
		}
	}

}

function notOnScreen() {
	var balise = document.getElementsByClassName("img_film");
	console.log(balise);
	balise.style.display = "none";
}
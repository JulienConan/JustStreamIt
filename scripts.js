var number_films = 7;
var number_films_on_carrousel = 4;
var url_api = 'http://127.0.0.1:8000/api/v1/titles/?genre='


function bestFilm() {
	var balise = document.getElementById("img_best_film");
	fetch('http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score')
		.then(response => response.json())
		.then(films_list => {
			var best_film = films_list.results["0"];
			balise.innerHTML += '<img class="img_film img_best_film" src="' + best_film.image_url + '" onclick="modalWindow(\'' + best_film.url + '\')" >';
			var balise_title = document.getElementById('tile_and_play_best_film');
			balise_title.innerHTML = '<h1 id="title_best_film">' + best_film.title + '</h3>' + 
					   ' <button id="play_best_film">Play</button>';
		})
		.catch(error => {
			console.log(error);
		})
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
							   '<li class="infos_modal_film" id="imdb_score_modal_film"> Score Imdb : ' + data.imdb_score + '</li>' +
							   '<li class="infos_modal_film" id="directors_modal_film"> Réalisateurs : ' + data.directors + '</li>' +
							   '<li class="infos_modal_film" id="actors_modal_film"> Acteurs : '+ data.actors + '</li>' +
							   '<li class="infos_modal_film" id="duration_modal_film"> Durée : ' + data.duration + ' minutes</li>' +
							   '<li class="infos_modal_film" id="countries_modal_film"> Pays d\'origine : ' + data.countries + '</li>' +
							   '<li class="infos_modal_film" id="box_office_modal_film"> Résultat au box office : ' + data.genres + '</li>' +
							   '<li class="infos_modal_film" id="long_description_modal_film"> Résumé : ' + data.long_description + '</li>'

			balise_img.innerHTML = '<img id="img_film_modal" src="' + data.image_url + '">';
		})
		.catch(error => {
			console.log(error);
		})
	modal.style.display = "block";
}

//Close Modal Window
function closeModal() {
	var modal = document.getElementById("myModal");
	modal.style.display = "none";
};


class Carrousel {
	constructor(genre, index) {
		this.genre = genre;
		this.list_films = [];
		this.index = index;
		this.balise = document.getElementById(this.genre);
		this.compteur_first_film_on_screen = 0;
		this.createNextPreviousBalise("left");
		this.generateListFilms();


	}

	generateListFilms(page=1) {
		// Generate list of n = number_films films for a category
		var page = page;
		if (this.genre != 'best_films') {
			var url = url_api + this.genre;
		} else {
			var url = url_api;
		}
		fetch(url + '&sort_by=-imdb_score&page=' + page.toString())
			.then(response => response.json())
			.then(films_list => {
				for (var i = 0; i < films_list.results.length; i++){
					if (this.list_films.length < number_films) {
						this.list_films.push(films_list.results[i.toString()]);
					}
				}
				page += 1;
				if (this.list_films.length < number_films){
					this.generateListFilms(page);
				} 
				if (this.list_films.length == number_films){
					this.addFilmOnCarrousel();
					this.createNextPreviousBalise("right");
					this.cacheAllFilms();
					this.filmOnScreen();
				}

			})
			.catch(error => {
				console.log(error);
			})
	}

	createNextPreviousBalise(direction) {
		if (direction == "left") {
			this.balise.innerHTML += '<img class="fleche" id="fleche_left_' + this.genre + '" src=img/fleche_gauche.png onclick="mesCarrousels[' + this.index + '].deplacementCarrousel(\'left\')">';
		}
		if (direction == "right") {
			this.balise.innerHTML += '<img class="fleche" id="fleche_left_' + this.genre + '" src=img/fleche_droite.png onclick="mesCarrousels[' + this.index + '].deplacementCarrousel(\'right\')">';
		}
	}

	addFilmOnCarrousel() {
		// add a balise <img> for the film of the category
		for (var i = 0; i < this.list_films.length; i++) {
			this.balise.innerHTML += '<img class="img_film img_film_' + this.genre + '" id="film_' + i + '_' + this.genre + '" src="' + this.list_films[i.toString()].image_url + '" onclick="modalWindow(\'' + this.list_films[i.toString()].url + '\')" >';
		}
	}

	cacheAllFilms() {
		for ( var i = 0; i < number_films; i++) {
			document.getElementById("film_" + i.toString() + '_' + this.genre).style.display = "none";
		}
	}

	filmOnScreen() {
		for (var i = this.compteur_first_film_on_screen; i < (this.compteur_first_film_on_screen + (number_films_on_carrousel)); i++){
			document.getElementById("film_" + i.toString() + '_' + this.genre).style.display = "block";
		}
	}

	deplacementCarrousel (direction) {
		if (direction == "right") {
			if (this.compteur_first_film_on_screen < number_films - number_films_on_carrousel) {
				this.compteur_first_film_on_screen += 1;
				this.cacheAllFilms();
				this.filmOnScreen();
			} else {
			 console.log("Trop loin à droite !");
			}
		}

		if (direction == "left") {
			if (this.compteur_first_film_on_screen > 0) {
				this.compteur_first_film_on_screen -= 1;
				this.cacheAllFilms();
				this.filmOnScreen(); 
			} else {
				console.log("Trop loin vers la gauche !");
			}
		}
	}

}

var mesCarrousels = new Array();
var genre_films = ['best_films', 'Animation', 'Horror', 'Film-Noir'];

bestFilm();

for (var i in genre_films) {
	genre_films[i] = new Carrousel(genre_films[i], i);
	mesCarrousels.push(genre_films[i]);
}

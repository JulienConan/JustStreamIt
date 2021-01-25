var genre_films = ['Animation', 'Horror', 'Film-Noir', ];
var number_films = 7;
var films_per_page = 5;

function createAllCarrousel(){
	for (var cat of genre_films){
		categoryBestFilm(cat, number_films);
	}
}

function categoryBestFilm(genre){
	var page = 1;
	var balise_category = document.getElementById(genre);
	var film_add = 0;
	var number_max_page = Math.ceil(number_films/films_per_page) + 1;

	addFlecheGauche(balise_category);
	while (page < number_max_page){
		fetch('http://127.0.0.1:8000/api/v1/titles/?genre=' + genre + '&sort_by=-imdb_score&page=' + page.toString())
			.then(response => response.json())
			.then(films_list => {
				for (var i = 0; i < films_list.results.length; i++){
					if (film_add < number_films) {
						addImgFilm(balise_category, films_list.results[i.toString()]);
						film_add += 1;
					}
				}
				if (film_add == number_films){
					addFlecheDroite(balise_category);
				}						
			})
		page += 1;	
	}
}

function addFlecheGauche(balise) {
	balise.innerHTML += '<img class="fleche" src=img/fleche_gauche.png onclick="">';
}

function addFlecheDroite(balise) {
	balise.innerHTML += '<img class="fleche" src=img/fleche_droite.png onclick="">';
}

function addImgFilm(balise, film) {
	balise.innerHTML += '<img class="img_film" src="' + film.image_url + ' onclick="modaleWindows(' + film.url.toString() + '"">';
}


function modaleWindow(url) {

}
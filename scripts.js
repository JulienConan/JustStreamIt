var genre_films = ['Action', 'Horror', 'Film-Noir'];
var number_films = 2;

function createAllCarrousel(){
	for (var cat of genre_films){
		console.log(cat);
		categoryBestFilm(cat, number_films);
	}
}

function categoryBestFilm(genre){
	var page = 1;
	var balise_category = document.getElementById(genre);
	var film_add = 0;
	addFlecheGauche(balise_category);
	fetch('http://127.0.0.1:8000/api/v1/titles/?genre=' + genre + '&sort_by=-imdb_score&page=' + page.toString())
		.then(response => response.json())
		.then(films_list => {
			for (var i = 0; i < films_list.results.length; i++){
				if (film_add < number_films) {
					addImgFilm(balise_category, films_list.results[i.toString()]);
					film_add += 1;
				}
			}
			addFlecheDroite(balise_category);				
		})	
}

function addFlecheGauche(balise) {
	balise.innerHTML += '<img class="fleche" src=img/fleche_gauche.png onclick="">';
}

function addFlecheDroite(balise) {
	balise.innerHTML += '<img class="fleche" src=img/fleche_droite.png onclick="">';
}

function addImgFilm(balise, film) {
	console.log(film.url);
	balise.innerHTML += '<img class="img_film" src="' + film.image_url + ' onclick="modaleWindows(' + film.url.toString() + '"">';
}


function modaleWindow(url) {

}
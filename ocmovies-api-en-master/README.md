# OCMovies-API: Test API providing movie information

The OCMovies-API project is a REST API application to be executed locally in the context
of educational projects. It provides movies information from GET http endpoints.
The API provides endpoints to get detailed infomation about movies filtered by
various criteria such as genre, IMDB score or year. Endpoints allow to retrieve
info for individual movies or lists of movies.

## Installation

This locally-executable API can be installed and executed from [http://localhost:8000/api/v1/titles/](http://localhost:8000/api/v1/titles/) using the following steps. A requirement is to have pipenv already installed on your python installation. If pipenv is not already installed on your computer, refer to [this page](docs/pipenv/installation-en.md).

### Installation and execution with pipenv

1. Clone this repository using `$ git clone https://github.com/pythonmentor/ocmovies-api.git` (you can also download the code using [as a zip file](https://github.com/pythonmentor/ocmovies-api/archive/master.zip))
2. Move to the ocmovies-api root folder with `$ cd ocmovies-api-en`
3. Install project dependencies with `pipenv install` 
4. Create and populate project database with `pipenv run python manage.py create_db`
5. Run the server with `pipenv run python manage.py runserver`

When the server is running after step 5 of the procedure, the OCMovies API can
be requested from endpoints starting with the following base URL: [http://localhost:8000/api/v1/](http://localhost:8000/api/v1/titles/).

Steps 1-4 are only required for inigtial installation. For subsequent launches
of the API, you only have to execute steps 5 from the root folder of the project.

### Installation and execution without pipenv (using venv and pip)

1. Clone this repository using $ git clone `https://github.com/pythonmentor/ocmovies-api.git` (you can also download the code using [as a zip file](https://github.com/pythonmentor/ocmovies-api/archive/master.zip))
2. Move to the ocmovies-api root folder with `$ cd ocmovies-api-en`
3. Create a virtual environment for the project with `$ python -m venv env` on windows or `$ python3 -m venv env` on macos or linux.
4. Activate the virtual environment with `$ env\Scripts\activate` on windows or `$ source env/bin/activate` on macos or linux.
5. Install project dependencies with `$ pip install -r requirements.txt`
6. Create and populate project database with `$ python manage.py create_db`
7. Run the server with `$ python manage.py runserver`

When the server is running after step 7 of the procedure, the OCMovies API can be requested from endpoints starting with the following base URL: http://localhost:8000/api/v1/titles/.

Steps 1-6 are only required for initial installation. For subsequent launches of the API, you only have to execute steps 4 and 7 from the root folder of the project.

## Usage and detailed endpoint documentation

One you have launched the server, the can read the documentation through the
browserable documentation interface of the API by visiting [http://localhost:8000/api/v1/titles/](http://localhost:8000/api/v1/titles/). The current API only provides
the following endpoints. All these endpoints are read-only and exclusively 
support HTTP requests using the **GET method**:

- Search and filter movies: [http://localhost:8000/api/v1/titles/](http://localhost:8000/api/v1/titles/). The filters available are:

   - `year=<year>`, `min_year=<year>` or `max_year=<year>` to get movies movies 
   filterd by year. The first does an exact match of the year.
   - `imdb_score_min=<score>` and `imdb_score_max<score>` to get movies with only 
   given imdb score.
   - `title=<title>` or `title_contains=<string>` to get movies corresponding
   to the searched string. The first performs an exact match while the second
   searches titles containing the search term. The search 
   is independant of character case.
   - `director=<director-name>` or `director_contains=<string>` to get movies
   whose directors correspond to the searched string. The first performs an exact match 
   with director name while the second searches director names containing the 
   search term. The search is independant of character case.
   - `writer=<name>` or `writer_contains=<string>` to get movies
   whose writers contain to the searched string. The first performs an exact match 
   with writer name while the second searches writer names containing the 
   search term. The search is independant of character case.
   - `actor=<name>` or `actor_contains=<string>` to get movies
   whose actors correspond to the searched string. The first performs an exact match 
   with actor name while the second searches actor names containing the 
   search term. The search is independant of character case.
   - `genre=<name>` or `genre_contains=<string>` to get movies
   whose genres correspond to the searched string. The first performs an exact match 
   with genre name while the second searches genre names containing the 
   search term. The search is independant of character case.
   - `country=<name>` or `country_contains=<string>` to get movies
   whose countries correspond to the searched string. The first performs an exact match 
   with country name while the second searches country names containing the 
   search term. The search is independant of character case.
   - `lang=<name>` or `lang_contains=<string>` to get movies
   whose languages corresponds to the searched string. The first performs an exact match 
   with language name while the second searches language names containing the 
   search term. The search is independant of character case.
   - `company=<name>` or `company_contains=<string>` to get movies
   whose company corresponds to the searched string. The first performs an exact match 
   with company name while the second searches company names containing the 
   search term. The search is independant of character case.
   - `rating=<name>` or `rating_contains=<string>` to get movies
   whose rating corresponds to the searched string. The first performs an exact match 
   with company name while the second searches company names containing the 
   search term. The search is independant of character case.
   - `sort_by=<field>` to get movies sorted by a particular order. For example,
   use `sort_by=title` to order the movies alphabetically by title and 
   `sort_by=-title` to order the movies in the reversed direction. You can also
   sort by multiple criteria by separating the criteria using commas as in `sort_by=-year,title` that filters the movie with the most recent ones first.
   Then, within a same year, movies are filtered alphabetically according to
   their title.

- Request detailed info about a movie: [http://localhost:8000/api/v1/titles/499549](http://localhost:8000/api/v1/titles/499549) where 499549 is the `id` of the 
movie "Avatar".
- Search the available genres: [http://localhost:8000/api/v1/genres/](http://localhost:8000/api/v1/genres/). The filters available are:
   - `name_contains=<search string>` to filter only the genres containing the
   searched string.
   - `movie_title_contains=<search string>` to find the genres associated with
   a particular movie searched by title.

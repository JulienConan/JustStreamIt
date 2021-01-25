function myFunction(){
     fetch("http://localhost:8000/api/v1/titles/?genre=Action")
     .then((response) => {response.json()
        .then((data_list) => {
            for(var i = 0; i < data_list.length; i++){
                image_best_movies.push(data_list[i]['image_url']);
                data_list_best_movies.push(data_list[i]);
                console.log(data_list_best_movies);
            }
            });
     })
     .catch((error) => {
        console.log(error);
     });
}
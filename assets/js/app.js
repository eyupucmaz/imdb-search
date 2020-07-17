// ! SEARCH BAR
const searchText = document.querySelector(".search_text");

// ! API CONFIGURATION
const apiKey = "872dab8b";

var dataAPI = `https://www.omdbapi.com/?apikey=${apiKey}&`;

searchText.addEventListener("keydown", (event) => {
	if (event.keyCode === 13) {
		searchMovie();
	}
});

// ! REQUEST API

async function searchMovie() {
	const request = await fetch(`${dataAPI}s=${searchText.value}`);
	const data = await request.json();
	// console.log(data);

	let movies = data.Search.map((movie) => {
		return {
			title: movie.Title,
			description: `Year:${movie.Year}/Type:${movie.Type}`,
			imdbID: movie.imdbID,
			poster:
				movie.Poster == "N/A" ? "/assets/images/default.png" : movie.Poster,
			isFavourite: false,
		};
	});

	console.log(movies);
	prepareMovies(movies);
	// Poster: "https://m.media-amazon.com/images/M/MV5BMTE0YWFmOTMtYTU2ZS00ZTIxLWE3OTEtYTNiYzBkZjViZThiXkEyXkFqcGdeQXVyODMzMzQ4OTI@._V1_SX300.jpg"
	// Title: "Captain Marvel"
	// Type: "movie"
	// Year: "2019"
	// imdbID: "tt4154664"
}

// ! To PREPARE THE MOVIES
function prepareMovies(movies) {
	document.querySelector("#movies").innerHTML = "";
	movies.forEach((movie) => {
		let movieCard = document.createElement("movie-card");

		movieCard.setAttribute("title", movie.title);
		movieCard.setAttribute("poster", movie.poster);
		movieCard.innerHTML = movie.description;
		movieCard.setAttribute("isFavourite", movie.isFavourite);
		movieCard.setAttribute("imdbID", movie.imdbID);
		document.querySelector("#movies").append(movieCard);
	});
}

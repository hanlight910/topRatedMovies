
const API_KEY = 'api_key=d10da4d2028adac7280b7a67a3576f75';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/movie/top_rated?language=en-US&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main');
const form = document.getElementById('form');
const searchInput = document.getElementById('search');

getTopRatedMovies(API_URL);

function getTopRatedMovies(ur) {
    fetch(ur)
        .then(response => response.json())
        .then(data => {
            showMovies(data.results);
        })
        .catch(error => {
            console.error('fetch 오류:', error);
        });
}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview, id } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
                    <img src="${poster_path ? IMG_URL + poster_path : 'http://via.placeholder.com/1080x1580'}" alt="${title}">
                    <div class="movie-info">
                        <h3>${title}</h3>
                        <span class="${getColor(vote_average)}">${vote_average}</span>
                    </div>
                    <div class="overview">
                        <h3>Overview</h3>
                        ${overview}
                        <br>
                        <button class="know-more" id="${id}">Know More</button>
                    </div>
                `;
        main.appendChild(movieEl);

      
        movieEl.addEventListener('click', () => {
            alert(`에러: ${id}`);
        });
    });
}

function getColor(vote_average) {
    if (vote_average >= 8) {
        return 'green';
    } else if (vote_average >= 7) {
        return 'orange';
    } else {
        return 'red';
    }
}
   

form.addEventListener('submit', (x) => {
    x.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {

        const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
        showMovies(filteredMovies);
    } else {
        showMovies(movies);
    }
});

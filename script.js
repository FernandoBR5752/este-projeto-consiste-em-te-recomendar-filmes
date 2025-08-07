// Banco de dados de filmes reduzido
const moviesDatabase = [
    {
        title: "Toy Story",
        genres: ["animacao", "aventura", "comedia"],
        ageRating: "livre",
        year: 1995,
        description: "Um cowboy de brinquedo chamado Woody tem sua vida virada de cabeça para baixo quando um novo boneco espacial chamado Buzz Lightyear se torna o novo brinquedo favorito de seu dono.",
        poster: "https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_FMjpg_UX1000_.jpg"
    },
    {
        title: "O Rei Leão",
        genres: ["animacao", "aventura", "drama"],
        ageRating: "livre",
        year: 1994,
        description: "Um filhote de leão chamado Simba sofre com a perda do pai e precisa aprender a assumir seu lugar como rei da selva.",
        poster: "https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_.jpg"
    },
    {
        title: "Jurassic Park",
        genres: ["aventura", "ficcao", "acao"],
        ageRating: "dez",
        year: 1993,
        description: "Um parque temático com dinossauros clonados se transforma em um pesadelo quando as criaturas pré-históricas escapam de seus recintos.",
        poster: "https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_.jpg"
    },
    {
        title: "O Senhor dos Anéis: A Sociedade do Anel",
        genres: ["fantasia", "aventura", "acao"],
        ageRating: "doze",
        year: 2001,
        description: "Um hobbit recebe a tarefa de destruir um poderoso anel que pode escravizar a Terra-média se cair nas mãos do Senhor do Escuro.",
        poster: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg"
    },
    {
        title: "O Poderoso Chefão",
        genres: ["drama", "crime"],
        ageRating: "dezesseis",
        year: 1972,
        description: "O patriarca de uma família mafiosa passa o controle de seu império clandestino para seu filho relutante.",
        poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"
    },
    {
        title: "Clube da Luta",
        genres: ["drama"],
        ageRating: "dezoito",
        year: 1999,
        description: "Um homem desiludido forma um clube de luta secreto como terapia alternativa, mas as coisas saem do controle.",
        poster: "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg"
    }
];

const ageRatings = {
    "livre": 0,
    "dez": 10,
    "doze": 12,
    "quatorze": 14,
    "dezesseis": 16,
    "dezoito": 18
};

function isAgeAppropriate(movie, userAge) {
    const minAge = ageRatings[movie.ageRating];
    return userAge >= minAge;
}

function matchesGenre(movie, selectedGenre) {
    return movie.genres.includes(selectedGenre);
}

function recommendMovies(userAge, selectedGenre) {
    return moviesDatabase.filter(movie => 
        isAgeAppropriate(movie, userAge) && matchesGenre(movie, selectedGenre)
    );
}

function renderRecommendations(movies) {
    const container = document.getElementById('recommendations-container');
    container.innerHTML = '';
    
    if (movies.length === 0) {
        container.innerHTML = '<p>Não encontramos recomendações com base nas suas preferências. Tente alterar o gênero selecionado.</p>';
        return;
    }
    
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        
        const poster = movie.poster ? 
            `<img src="${movie.poster}" alt="${movie.title}" class="movie-poster">` : 
            '<div class="movie-poster" style="background-color: #eee; display: flex; align-items: center; justify-content: center;">Sem imagem</div>';
        
        const ageRatingClass = movie.ageRating;
        const ageRatingText = {
            "livre": "Livre",
            "dez": "10+",
            "doze": "12+",
            "quatorze": "14+",
            "dezesseis": "16+",
            "dezoito": "18+"
        }[movie.ageRating];
        
        const genreTags = movie.genres.map(genre => 
            `<span class="genre-tag">${formatGenreName(genre)}</span>`
        ).join('');
        
        movieCard.innerHTML = `
            ${poster}
            <div class="movie-info">
                <h3 class="movie-title">${movie.title} <span class="age-rating ${ageRatingClass}">${ageRatingText}</span></h3>
                <div class="movie-meta">${movie.year}</div>
                <div class="genre-tags">${genreTags}</div>
                <p class="movie-description">${movie.description}</p>
            </div>
        `;
        
        container.appendChild(movieCard);
    });
}

function formatGenreName(genre) {
    const genreNames = {
        "acao": "Ação",
        "aventura": "Aventura",
        "comedia": "Comédia",
        "drama": "Drama",
        "ficcao": "Ficção Científica",
        "terror": "Terror",
        "romance": "Romance",
        "animacao": "Animação",
        "fantasia": "Fantasia",
        "documentario": "Documentário",
        "crime": "Crime"
    };
    return genreNames[genre] || genre;
}

document.getElementById('preferences-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const age = parseInt(document.getElementById('age').value);
    const genre = document.getElementById('genre').value;
    
    const recommendedMovies = recommendMovies(age, genre);
    
    recommendedMovies.sort((a, b) => b.year - a.year);
    
    renderRecommendations(recommendedMovies);
    
    document.getElementById('form-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
});

document.getElementById('back-button').addEventListener('click', function() {
    document.getElementById('results-section').classList.add('hidden');
    document.getElementById('form-section').classList.remove('hidden');
    window.scrollTo(0, 0);
});

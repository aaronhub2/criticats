// Función fetchMovieFromID
const apiKey = 'c260b3e8954b170aed328ca4288bd341';

async function fetchMovieFromID(ID, type) {
    let url;

    // Construye la URL de la API
    if (type === 0) {
        url = `https://api.themoviedb.org/3/movie/${ID}?api_key=${apiKey}&language=es`;
    } else {
        url = `https://api.themoviedb.org/3/tv/${ID}?api_key=${apiKey}&language=es`;
    }

    try {
        // Realiza la solicitud a la API de TMDB
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();

        // Verifica la estructura de los datos
        if (type === 0 && (!data.poster_path || !data.title)) {
            throw new Error('Invalid movie data structure');
        } else if (type === 1 && (!data.poster_path || !data.name)) {
            throw new Error('Invalid TV show data structure');
        }

        // Aquí tienes la información de la película
        return {
            datos: data
        };
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return null;
    }
}

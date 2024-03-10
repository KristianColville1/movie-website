<?php
include("env.php");
$apiKey = $KRISTIANS_API_KEY;
$baseUrl = "https://api.themoviedb.org/3";

$genresUrl = "{$baseUrl}/genre/movie/list?api_key={$apiKey}&language=en-US";
$genresResponse = file_get_contents($genresUrl);
$genresData = json_decode($genresResponse, true);
$genreMapping = [];
foreach ($genresData['genres'] as $genre) {
    $genreMapping[$genre['id']] = $genre['name'];
}

$moviesCount = 0;
$customMoviesArray = [];
$page = 1;
$maxMovies = 1250;

while ($moviesCount < $maxMovies) {
    $moviesUrl = "{$baseUrl}/movie/popular?api_key={$apiKey}&language=en-US&page={$page}";
    $response = file_get_contents($moviesUrl);
    if ($response === FALSE)
        break;

    $data = json_decode($response, true);
    foreach ($data['results'] as $movie) {
        $videosUrl = "{$baseUrl}/movie/{$movie['id']}/videos?api_key={$apiKey}&language=en-US";
        $videosResponse = file_get_contents($videosUrl);
        if ($videosResponse === FALSE)
            continue;
        $videosData = json_decode($videosResponse, true);
        $trailerKey = null;

        foreach ($videosData['results'] as $video) {
            if ($video['site'] === 'YouTube' && $video['type'] === 'Trailer') {
                $trailerKey = $video['key'];
                break;
            }
        }

        // only include movies with trailers and map genre IDs to names and no adult films - PG friendly :) 
        if (!$movie['adult'] && $trailerKey) {
            $genres = array_map(function ($id) use ($genreMapping) {
                return $genreMapping[$id] ?? 'Unknown';
            }, $movie['genre_ids']);

            $customMoviesArray[] = [
                'id' => $movie['id'],
                'title' => $movie['title'],
                'overview' => $movie['overview'],
                'release_date' => $movie['release_date'],
                'backdrop_path' => $movie['backdrop_path'],
                'rating' => $movie['vote_average'],
                'poster_path' => 'https://image.tmdb.org/t/p/w500' . $movie['poster_path'],
                'trailer' => "https://www.youtube.com/watch?v={$trailerKey}",
                'genres' => $genres,
            ];
            $moviesCount++;
            echo $moviesCount . PHP_EOL;
            if ($moviesCount >= $maxMovies)
                break 2;
        }
    }
    $page++;
}

$filePath = './src/assets/data/movies.json';
if (file_put_contents($filePath, json_encode($customMoviesArray, JSON_PRETTY_PRINT))) {
    echo "Movies data has been saved successfully!";
} else {
    echo "Failed to save movies data";
}

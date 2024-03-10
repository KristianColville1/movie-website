<?php

$moviesJson = file_get_contents('src/assets/data/movies.json');
$movies = json_decode($moviesJson, true);

$sortedMoviesByGenre = [];

foreach ($movies as $movie) {
    foreach ($movie['genres'] as $genre) {
        if (!isset($sortedMoviesByGenre[$genre])) {
            $sortedMoviesByGenre[$genre] = [];
        }
        $sortedMoviesByGenre[$genre][] = $movie;
    }
}

$genreDir = 'src/assets/data/genres';
if (!is_dir($genreDir)) {
    mkdir($genreDir, 0755, true);
}

foreach ($sortedMoviesByGenre as $genre => $movies) {
    $genreFileName = $genreDir . '/' . strtolower(str_replace(' ', '_', $genre)) . '.json';
    file_put_contents($genreFileName, json_encode($movies, JSON_PRETTY_PRINT));
    echo "Saved " . count($movies) . " movies to {$genreFileName}\n";
}

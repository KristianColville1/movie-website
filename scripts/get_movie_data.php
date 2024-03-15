<?php
include("env.php");
$apiKey = $KRISTIANS_API_KEY;
$baseUrl = "https://api.themoviedb.org/3";

$cinemas = ["Omniplex", "Lighthouse", "IMC Cinemas", "Cineworld", "Eye Cinema"];

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
$maxMovies = 1000;
$processedMovieIds = array();

while ($moviesCount < $maxMovies) {
    $moviesUrl = "{$baseUrl}/movie/popular?api_key={$apiKey}&language=en-US&page={$page}";
    $response = file_get_contents($moviesUrl);
    if ($response === FALSE)
        break;

    $data = json_decode($response, true);
    foreach ($data['results'] as $movie) {
        // Fetch videos
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

        // Fetch actors (cast)
        $creditsUrl = "{$baseUrl}/movie/{$movie['id']}/credits?api_key={$apiKey}&language=en-US";
        $creditsResponse = file_get_contents($creditsUrl);
        $creditsData = json_decode($creditsResponse, true);
        $actors = [];
        foreach ($creditsData['cast'] as $index => $cast) {
            if ($index < 7) { // Limit to top 7 actors
                // Fetch additional actor details
                $actorDetailsUrl = "{$baseUrl}/person/{$cast['id']}?api_key={$apiKey}&language=en-US";
                $actorDetailsResponse = file_get_contents($actorDetailsUrl);
                $actorDetails = json_decode($actorDetailsResponse, true);

                $actors[] = [
                    'name' => $cast['name'],
                    'biography' => isset($actorDetails['biography']) ? $actorDetails['biography'] : 'Biography not available',
                    'birthday' => isset($actorDetails['birthday']) ? $actorDetails['birthday'] : 'N/A',
                    'place_of_birth' => isset($actorDetails['place_of_birth']) ? $actorDetails['place_of_birth'] : 'N/A',
                    // Include images
                    'image_w45' => $cast['profile_path'] ? 'https://image.tmdb.org/t/p/w45' . $cast['profile_path'] : null,
                    'image_w185' => $cast['profile_path'] ? 'https://image.tmdb.org/t/p/w185' . $cast['profile_path'] : null,
                    'image_h632' => $cast['profile_path'] ? 'https://image.tmdb.org/t/p/h632' . $cast['profile_path'] : null,
                    'image_original' => $cast['profile_path'] ? 'https://image.tmdb.org/t/p/original' . $cast['profile_path'] : null,
                ];
            } else {
                break;
            }
        }


        // randomly assign cinemas to movies
        $assignedCinemas = array_rand(array_flip($cinemas), 2); // assign 2 random cinemas per film

        // only include movies with trailers and map genre IDs to names and no adult films - PG friendly :) 
        if (!$movie['adult'] && $trailerKey) {
            $genres = array_map(function ($id) use ($genreMapping) {
                return $genreMapping[$id] ?? 'Unknown';
            }, $movie['genre_ids']);

            // Assuming $processedMovieIds is an array that tracks all the movie IDs you've already processed.
            if (!in_array($movie['id'], $processedMovieIds)) {
                // If the movie's ID is not in the processedMovieIds array, add the movie to customMoviesArray
                $customMoviesArray[] = [
                    'id' => $movie['id'],
                    'slug' => strtolower(str_replace(' ', '-', $movie['title'])),
                    'title' => $movie['title'],
                    'overview' => $movie['overview'],
                    'release_date' => $movie['release_date'],
                    'backdrop_path' => $movie['backdrop_path'],
                    'rating' => $movie['vote_average'],
                    'poster_path' => 'https://image.tmdb.org/t/p/w500' . $movie['poster_path'],
                    'trailer' => "https://www.youtube.com/watch?v={$trailerKey}",
                    'genres' => $genres,
                    'actors' => $actors,
                    'cinemas' => $assignedCinemas,
                ];

                // Then add the movie's ID to the processedMovieIds array to track it
                $processedMovieIds[] = $movie['id'];
            }

            $moviesCount++;
            echo $moviesCount . PHP_EOL;
            if ($moviesCount >= $maxMovies)
                break 2;
        }
    }
    $page++;
}

$filePath = './public/assets/data/movies.json';
if (file_put_contents($filePath, json_encode($customMoviesArray, JSON_PRETTY_PRINT))) {
    echo "Movies data has been saved successfully!";
} else {
    echo "Failed to save movies data";
}

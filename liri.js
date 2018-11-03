require("dotenv").config();

var keys = require('./keys.js');
var request = require('request');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require('fs');

var user_input = process.argv[2];
var searchFor = process.argv[3];

switch(user_input) {
     case "spotify-this-song":
          spotifyIt();
          break;
     case "movie-this":
          movieIt();
          break;
     case "do-what-it-says":
          random();
          break;
}


function spotifyIt(){
    var defaultSong = "TheSign"
    if (searchFor !== undefined){
        defaultSong = searchFor
    }
    
    spotify.search({type: 'track', query: defaultSong, limit: 20}, function(err, data){
        if (err){
            console.log('Error: ' + err);
            return;
        }
         console.log("Artist Name: " +  data.tracks.items[0].artists[0].name);
         console.log("Song Name: " + data.tracks.items[0].name);
         console.log("Spotify preview: " + data.tracks.items[0].external_urls.spotify);
         console.log("Album Name: " + data.tracks.items[0].album.name);
         fs.appendFile('log.txt', "Artist: " + data.tracks.items[0].artists[0].name + "\n" + "Song Name: " + data.tracks.items[0].name + "\n" + "Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify + "\n" + "Album: " + data.tracks.items[0].album.name  + "\n" + "-------------------");
    })
}

function movieIt(){
    var defaultMovie = "Mr.Nobody"
    if(searchFor !== undefined){
        defaultMovie = searchFor;
    }
    request('http://www.omdbapi.com/?apikey=trilogy&t=' + defaultMovie + "&tomatoes=true&plot=short", function(error,response,body){
        if (!error && response.statusCode == 200) {
               var responses = JSON.parse(body);
               console.log("Title: " + responses.Title);
               console.log("Year: " + responses.Year);
               console.log("IMDB Rating: " + responses.imdbRating);
                console.log("Rotten Tomatoes Rating: " + responses.tomatoUserRating);
               console.log("Country: " + responses.Country);
               console.log("Language: " + responses.Language);
               console.log("Plot: " + responses.Plot);
               console.log("Actors: " + responses.Actors);
               fs.appendFile('log.txt', "Title: " + responses.Title + "\n" + "Year: " + responses.Year + "\n" + "IMDB Rating: " + responses.imdbRating + "\n" + "Country: " + responses.Country + "\n" + "Language: " + responses.Language + "\n" + "Plot: " + responses.Plot + "\n" + "Actors: " + responses.Actors + "\n" + "Rotten Tomatoes Rating: " + responses.tomatoUserRating + "\n" + "----------------------------");
          }
          else {
               console.log(error);
          }
    });
}


function random(){
    fs.readFile("random.txt", "utf8", function(error, data){
    
        var split = data.split(',');
        spotifyIt(split[1]);
        
    })
}
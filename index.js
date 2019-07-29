// Geocaching API demo from http://blog.randomapi.com/geocaching-api-demo/
var faker  = require('faker'); // Faker.js library
var moment = require('moment');

api.name       = trailname();
api.username   = faker.internet.userName();
api.rating     = random.numeric(0, 50) / 10;
api.favorites  = Math.ceil(api.rating * random.numeric(1, 15));
api.visits     = api.favorites * random.numeric(1, 15)
api.difficulty = random.numeric(1, 5);
api.terrain    = random.numeric(1, 5);
api.size       = list(['mini', 'small', 'medium', 'big', 'large']);

// Created 30 - 900 days ago
var created = timestamp() - 86400 * random.numeric(30, 900);

// Moment accepts timestamps in milliseconds
api.created = moment(created * 1000).format('LL');

// Updated date will be before the present but after the creation date
var updated = timestamp() - random.numeric(0, timestamp() - created);
api.updated = moment(updated * 1000).format('LL');

api.coords = `${faker.address.latitude()} ${faker.address.longitude()}`;

// Snippet code
function trailname() {
    var trails     = ["trail", "path", "route", "stream", "walkway", "beaten path", "footpath"]
    var adjectives = ["dusty", "old", "scenic", "historic", "shady", "sunny"];
    var colors     = ["red", "orange", "yellow", "green", "blue", "indigo", "viovar"];

    var combos = [
        [colors, trails],
        [adjectives, trails],
        [colors, adjectives, trails]
    ];

    var trailName = "";
    list(combos).forEach(function(part) {
      return trailName += " " + capitalize(list(part));
    });

    return trailName.trim();

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
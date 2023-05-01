const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyBJwNiZm6ys1iuoWM2vxg97LSX81izcAV0",
  authDomain: "pokemonapi-ea613.firebaseapp.com",
  databaseURL: "https://pokemonapi-ea613-default-rtdb.firebaseio.com",
  projectId: "pokemonapi-ea613",
  storageBucket: "pokemonapi-ea613.appspot.com",
  messagingSenderId: "1006811504793",
  appId: "1:1006811504793:web:ac6c29521376d36c795808",
  measurementId: "G-VY1S864KK4",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const psers = db.collection("users");
const pokemons = db.collection("pokemons");

module.exports = users;
module.exports = pokemons;

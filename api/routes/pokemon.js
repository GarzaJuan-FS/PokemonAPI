const express = require("express");
const router = express.Router();
const passport = require("passport");

const passportService = require("../services/passport");

const protectedRoute = passport.authenticate("jwt", { session: false });

const Pokemon = require("../models/pokemon");
const pokemon = require("../models/pokemon");

const getPokemon = async (req, res, next) => {
  let pokemon;
  try {
    pokemon = await Pokemon.findById(req.params.id);
    if (pokemon === null) {
      return res.status(404).json({ message: "Cannot find Pokémon" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.pokemon = pokemon; // pass the pokemon to the next middleware
  next();
};

//GET ALL POKEMON
router.get("/", protectedRoute, async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET POKEMON BY ID
router.get("/:id", protectedRoute, getPokemon, (req, res) => {
  res.json(res.pokemon);
});

//CREATE NEW POKEMON
router.post("/", protectedRoute, async (req, res) => {
  const newPokemon = new Pokemon({
    name: req.body.name,
    type: req.body.type,
    level: req.body.level,
  });
  try {
    const savedPokemon = await newPokemon.save();
    res.status(201).json(savedPokemon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//UPDATE POKEMON BY ID
router.patch("/:id", protectedRoute, getPokemon, async (req, res) => {
  if (req.body.name != null) {
    res.pokemon.name = req.body.name;
  }
  if (req.body.type != null) {
    res.pokemon.type = req.body.type;
  }
  if (req.body.level != null) {
    res.pokemon.level = req.body.level;
  }
  try {
    const updatedPokemon = await res.pokemon.save();
    res.json(updatedPokemon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DELETE POKEMON BY ID
router.delete("/:id", protectedRoute, getPokemon, async (req, res) => {
  try {
    await res.pokemon.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

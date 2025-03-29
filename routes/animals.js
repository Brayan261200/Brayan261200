const express = require('express');
const Animal = require('../models/animal');
const router = express.Router();

// Obtener todos los animales
router.get('/', async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo animal
router.post('/', async (req, res) => {
  const animal = new Animal({
    name: req.body.name,
    species: req.body.species,
    diet: req.body.diet,
  });

  try {
    const newAnimal = await animal.save();
    res.status(201).json(newAnimal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener un animal por ID
router.get('/:id', getAnimal, (req, res) => {
  res.json(res.animal);
});

// Actualizar un animal por ID
router.put('/:id', getAnimal, async (req, res) => {
  if (req.body.name != null) {
    res.animal.name = req.body.name;
  }
  if (req.body.species != null) {
    res.animal.species = req.body.species;
  }
  if (req.body.diet != null) {
    res.animal.diet = req.body.diet;
  }

  try {
    const updatedAnimal = await res.animal.save();
    res.json(updatedAnimal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un animal por ID
router.delete('/:id', getAnimal, async (req, res) => {
  try {
    await res.animal.remove();
    res.json({ message: 'Animal eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para obtener un animal por ID
async function getAnimal(req, res, next) {
  try {
    const animal = await Animal.findById(req.params.id);
    if (animal == null) {
      return res.status(404).json({ message: 'No se encuentra el animal' });
    }
    res.animal = animal;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;

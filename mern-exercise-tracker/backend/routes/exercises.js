const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    console.log('Received request to get exercise with ID:', req.params.id);
    Exercise.findById(req.params.id) // find  by id
      .then(exercise => res.json(exercise))  // return as json , else return error
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:id').delete((req, res) => {  // if its delete request then finds and deletes
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted.')) 
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/update/:id').post((req, res) => { //if route is update/ object id and is post, then we update it
    Exercise.findById(req.params.id) // find current exercise and update
      .then(exercise => {  
        exercise.username = req.body.username;  // sets new exercise variables to equal the new data
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
  
 exercise.save() // saves 
    .then(() => res.json('Exercise updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
      })
    .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router;
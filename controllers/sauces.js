const Thing = require('../Models/Thing');

exports.createThing = (req, res, next) =>{
    delete req.body.userId;
    const thing = new Thing({
    ...req.body
   });
    thing.save()
      .then(() => res.statuts(201).json({message: 'objet enregistré'}))
      .catch(error => res.status(401).json({error}));
   };

exports.modifyThing = (req, res, next) => {
    Thing.updateOne({userId: req.params.id}, {...req.body,userId: req.params.id})
    .then(() => res.status(200).json({messages: 'modifié'}))
    .catch(error => res.statuts(400).json({error}));
  };

exports.deleteThing = (req, res, next) => {
    Thing.findOne({userId: req.params.id})
    .then(() => res.status(200).json({message :'objet supprimé'}))
    .catch(error => res.status(400).json({error}));
  };

  exports.getAllThing = (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  };

  exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  };
const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
//-----------------route POST uniquement--------------------------------------------------
router.post('/', auth, multer, saucesCtrl.createThing);
  
//------------------------route PUT-----------------------------------------
router.put('/:id', auth, saucesCtrl.modifyThing);
  
//----------------------------route DELETE-----------------------------------
router.delete('/:id', auth, saucesCtrl.deleteThing);
  
//-------------------route GET-------------------------------------------------
router.get('/', auth, saucesCtrl.getAllThing);
router.get('/:id', auth, saucesCtrl.getOneThing);
  
module.exports = router;

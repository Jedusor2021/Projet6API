const express = require('express');//ok
const router = express.Router();//ok

const saucesCtrl = require('../controllers/Produits');//ok
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, saucesCtrl.createProduits);
router.put('/:id', auth, multer, saucesCtrl.modifyProduits);
router.delete('/:id', auth, saucesCtrl.deleteProduits);
router.get('/:id', auth, saucesCtrl.getOneProduits);
router.get('/', auth, saucesCtrl.getAllProduits);
router.post('/:id/like', auth, multer, saucesCtrl.addLike);

module.exports = router;
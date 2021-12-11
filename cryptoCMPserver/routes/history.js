const router = require('express').Router();
const historyController = require('../controllers/historyController');

router.get('/:userid/:limit/:pageNum', historyController.getAnalysisHistory);

// router.get('/:userid/:historyid', historyController.getAllDetailsOfHistoryId);

router.post('/', historyController.createHistory);

module.exports = router;

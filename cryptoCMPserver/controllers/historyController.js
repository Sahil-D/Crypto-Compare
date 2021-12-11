const catchAsync = require('../utils/catchAsync');
const historyService = require('../services/historyService');

const getAllDetailsOfHistoryId = catchAsync(async (req, res) => {
  const userid = req.params.userid;
  const historyid = req.params.historyid;
  const history = await historyService.getAllDetailsOfHistoryId(
    userid,
    historyid
  );
  return { status: 'success', data: history };
});

const getAnalysisHistory = catchAsync(async (req, res) => {
  const userid = req.params.userid;
  const limit = req.params.limit;
  const pageNum = req.params.pageNum;
  const historyList = await historyService.getAnalysisHistory(
    userid,
    limit,
    pageNum
  );
  return { status: 'success', data: historyList };
});

const createHistory = catchAsync(async (req, res) => {
  const {
    userid,
    coinsList,
    currPriceList,
    marketCapList,
    volume24hrsList,
    circulatingSupplyList,
  } = req.body;

  const newRecord = await historyService.createHistory(
    userid,
    coinsList,
    currPriceList,
    marketCapList,
    volume24hrsList,
    circulatingSupplyList
  );
  return { status: 'success', data: newRecord };
});

module.exports = {
  getAllDetailsOfHistoryId,
  getAnalysisHistory,
  createHistory,
};

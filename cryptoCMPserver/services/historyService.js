const httpStatus = require('http-status');
const { ErrorMessages } = require('../utils/ErrorMessages');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');
const History = require('../models/History');

async function getAllDetailsOfHistoryId(userid, historyid) {
  try {
    const history = await History.findById(historyid);

    if (history.userid !== userid) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        ErrorMessages.INVALID_CREDENTIALS
      );
    }

    return history;
  } catch (err) {
    throw new ApiError(httpStatus.NOT_FOUND, err);
  }
}

// async function getAnalysisHistory(userid) {
//   const user = await User.findById(userid);

//   if (!user) {
//     throw new ApiError(httpStatus.BAD_REQUEST, ErrorMessages.USER_NOT_FOUND);
//   }

//   const historyList = await History.find({ userid: userid }).sort({
//     createdAt: -1,
//   });
//   return historyList;
// }

async function getAnalysisHistory(userid, pagelimit, pagenumber) {
  const user = await User.findById(userid);

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, ErrorMessages.USER_NOT_FOUND);
  }

  const limit = parseInt(pagelimit, 10);
  const pageNum = parseInt(pagenumber, 10);

  const historyList = await History.find({ userid: userid })
    .limit(limit)
    .skip(pageNum * limit)
    .sort({
      createdAt: -1,
    })
    .exec();

  return historyList;
}

async function createHistory(
  userid,
  coinsList,
  currPriceList,
  marketCapList,
  volume24hrsList,
  circulatingSupplyList
) {
  const user = await User.findById(userid);
  if (!user) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      ErrorMessages.INVALID_CREDENTIALS
    );
  }

  try {
    const history = await new History({
      userid,
      coinsList,
      currPriceList,
      marketCapList,
      volume24hrsList,
      circulatingSupplyList,
    });

    await history.save();

    return history;
  } catch (err) {
    throw new ApiError(httpStatus.NOT_FOUND, err);
  }
}

module.exports = {
  getAllDetailsOfHistoryId,
  getAnalysisHistory,
  createHistory,
};

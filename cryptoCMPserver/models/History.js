const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    coinsList: {
      type: Array,
      default: [],
    },
    currPriceList: {
      type: Array,
      default: [],
    },
    marketCapList: {
      type: Array,
      default: [],
    },
    volume24hrsList: {
      type: Array,
      default: [],
    },
    circulatingSupplyList: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('History', HistorySchema);

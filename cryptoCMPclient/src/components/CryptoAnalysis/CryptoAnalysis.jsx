import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { Col, Row, Typography, Select } from 'antd';
import { useGetDetailedCoinDataQuery } from '../../services/cryptoAnalysisApi';
import { LineChart, PieChart, Loader, BarChart, PolarChart } from '..';
import { Axios } from '../../config';

const { Title } = Typography;
const { Option } = Select;

const CryptoAnalysis = () => {
  const location = useLocation();
  const selectedCoinsList = location.state.coinsList;

  const user = useSelector((state) => state.user.user);

  const time = ['1min', '1hr', '1day'];
  const [timePeriod, setTimePeriod] = useState('1min');
  const [selectedCoinForLineGraph, setSelectedCoinForLineGraph] = useState(
    selectedCoinsList[0]
  );

  const {
    data: coinsData,
    isFetching: fetchingCoinsData,
    isError: fetchingError,
  } = useGetDetailedCoinDataQuery(selectedCoinsList.toString());

  const [fetchedCoinsList, setFetchedCoinsList] = useState([]);

  useEffect(() => {
    if (!fetchingCoinsData && !fetchingError) {
      setFetchedCoinsList(Object.keys(coinsData.DISPLAY));
    }
  }, [coinsData, fetchingCoinsData, fetchingError]);

  const currPriceList = useMemo(() => {
    return fetchedCoinsList.map((k) => coinsData.RAW[k].USD.PRICE);
  }, [coinsData, fetchedCoinsList]);

  const marketCapList = useMemo(() => {
    return fetchedCoinsList.map((k) => coinsData.RAW[k].USD.MKTCAP);
  }, [coinsData, fetchedCoinsList]);

  const volume24hrsList = useMemo(() => {
    return fetchedCoinsList.map((k) => coinsData.RAW[k].USD.VOLUME24HOUR);
  }, [coinsData, fetchedCoinsList]);

  const circulatingSupplyList = useMemo(() => {
    return fetchedCoinsList.map((k) => coinsData.RAW[k].USD.CIRCULATINGSUPPLY);
  }, [coinsData, fetchedCoinsList]);

  useEffect(() => {
    // store to history
    async function saveToHistory() {
      try {
        await Axios.post('/history', {
          userid: user.id,
          coinsList: fetchedCoinsList,
          currPriceList,
          marketCapList,
          volume24hrsList,
          circulatingSupplyList,
        });
        console.log('saved data');
      } catch (e) {
        console.log(e);
      }
    }

    if (!fetchingCoinsData && !fetchingError && fetchedCoinsList.length) {
      saveToHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedCoinsList]);

  if (fetchingCoinsData) return <Loader />;

  if (fetchingError) return 'Error while fetching!!! Please Reload.';

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={1} className="coin-name">
          Analysis
        </Title>
        <p>USD PRICING</p>
      </Col>

      <Row className="two-part-rwo">
        <Col>
          <Select
            defaultValue={selectedCoinsList[0]}
            className="select-timeperiod"
            placeholder="Select Coin"
            onChange={(cn) => setSelectedCoinForLineGraph(cn)}
          >
            {selectedCoinsList.map((t) => (
              <Option key={t}>{t}</Option>
            ))}
          </Select>
        </Col>
        <Col>
          <Select
            defaultValue={time[0]}
            className="select-timeperiod"
            placeholder="Select Time Period"
            onChange={(tp) => setTimePeriod(tp)}
          >
            {time.map((t) => (
              <Option key={t}>{t}</Option>
            ))}
          </Select>
        </Col>
      </Row>

      <LineChart
        currentPrice={coinsData.DISPLAY[selectedCoinForLineGraph].USD.PRICE}
        coinName={selectedCoinForLineGraph}
        timePeriod={timePeriod}
      />

      <br></br>
      <br></br>

      <Row className="two-part-rwo">
        <Col>
          <BarChart
            title="Current Price"
            coinsList={fetchedCoinsList}
            valueList={currPriceList}
          />
        </Col>
        <Col>
          <PolarChart
            title="Circulated Supply"
            coinsList={fetchedCoinsList}
            valueList={circulatingSupplyList}
          />
        </Col>
      </Row>

      <br></br>
      <br></br>

      <Row className="two-part-rwo">
        <Col>
          <PieChart
            title="Market Capital"
            coinsList={fetchedCoinsList}
            valueList={marketCapList}
          />
        </Col>
        <Col>
          <PieChart
            title="24 Hours Volume"
            coinsList={fetchedCoinsList}
            valueList={volume24hrsList}
          />
        </Col>
      </Row>
    </Col>
  );
};

export default CryptoAnalysis;

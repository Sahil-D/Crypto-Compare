import { useState } from 'react';
import { useLocation } from 'react-router';
import { Col, Row, Typography } from 'antd';
import { PieChart, BarChart, PolarChart } from '..';

const { Title } = Typography;

const HistoryAnalysis = () => {
  const location = useLocation();
  const [selectedCoinsList] = useState(location.state.coinsList);
  const [currPriceList] = useState(location.state.currPriceList);
  const [marketCapList] = useState(location.state.marketCapList);
  const [volume24hrsList] = useState(location.state.volume24hrsList);
  const [circulatingSupplyList] = useState(
    location.state.circulatingSupplyList
  );

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={1} className="coin-name">
          Analysis History
        </Title>
        <p>USD PRICING</p>
      </Col>

      <br></br>
      <br></br>

      <Row className="two-part-rwo">
        <Col>
          <BarChart
            title="Price That Time"
            coinsList={selectedCoinsList}
            valueList={currPriceList}
          />
        </Col>
        <Col>
          <PolarChart
            title="Circulated Supply"
            coinsList={selectedCoinsList}
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
            coinsList={selectedCoinsList}
            valueList={marketCapList}
          />
        </Col>
        <Col>
          <PieChart
            title="24 Hours Volume"
            coinsList={selectedCoinsList}
            valueList={volume24hrsList}
          />
        </Col>
      </Row>
    </Col>
  );
};

export default HistoryAnalysis;

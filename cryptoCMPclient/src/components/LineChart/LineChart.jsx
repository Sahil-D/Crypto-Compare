import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

import { Loader } from '..';
import {
  useGetCoinMinutePriceQuery,
  useGetCoinHourPriceQuery,
  useGetCoinDayPriceQuery,
} from '../../services/cryptoAnalysisApi';

const { Title } = Typography;

const LineChart = ({ currentPrice, coinName, timePeriod }) => {
  const coinPrice = [];
  const coinTimeStamp = [];

  const requiredQueryFunction =
    timePeriod === '1min'
      ? useGetCoinMinutePriceQuery
      : timePeriod === '1hr'
      ? useGetCoinHourPriceQuery
      : useGetCoinDayPriceQuery;

  const { data: coinHistory, isFetching: fetchingLineChart } =
    requiredQueryFunction(coinName);

  if (fetchingLineChart) return <Loader />;

  const datalen = coinHistory?.Data?.Data?.length;

  for (let i = 0; i < datalen; i += 1) {
    coinPrice.push(coinHistory?.Data?.Data[i].close);

    // -1 for inverted time now to past
    let division_factor = -1 * 60;
    if (timePeriod === '1hr') division_factor *= 60;
    if (timePeriod === '1day') division_factor *= 60 * 24;

    coinTimeStamp.push(
      (new Date(coinHistory?.Data?.Data[i].time).getTime() -
        new Date(coinHistory?.Data?.Data[datalen - 1].time).getTime()) /
        division_factor
    );
  }

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: 'black',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      x: [
        {
          title: {
            display: true,
            text: 'Days',
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={4} className="current-price">
            Current {coinName} Price : {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;

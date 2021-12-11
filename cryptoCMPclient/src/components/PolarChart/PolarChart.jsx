import { PolarArea } from 'react-chartjs-2';
import { Row, Typography } from 'antd';

const { Title } = Typography;

const PolarChart = ({ title, coinsList, valueList }) => {
  const data = {
    labels: coinsList,
    datasets: [
      {
        label: 'value',
        data: valueList,
        backgroundColor: coinsList.map((cn, i) => {
          let a = (59 * i) % 255;
          let b = (173 * i) % 255;
          let c = (201 * i) % 255;
          return 'rgb(' + a + ',' + b + ',' + c + ',0.8)';
        }),
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <Row className="other-chart-header">
        <Title level={2} className="chart-title">
          {title}
        </Title>
      </Row>
      <PolarArea data={data} />
    </>
  );
};

export default PolarChart;

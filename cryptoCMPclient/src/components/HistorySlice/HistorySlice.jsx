import { Typography, Card } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

function getShortMonth(month) {
  return [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ][month];
}

function getFormattedDateTime(givenDate) {
  const dateObj = new Date(givenDate);
  const date = dateObj.getDate();
  const month = getShortMonth(dateObj.getMonth());
  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const year = dateObj.getFullYear();
  let mer = 'AM';

  if (hours === 0) {
    hours = 12;
  } else if (hours === 12) {
    mer = 'PM';
  } else if (hours > 12) {
    hours -= 12;
    mer = 'PM';
  }

  const hourStr = String(hours).padStart(2, '0');
  const minutesStr = String(minutes).padStart(2, '0');

  return `${date} ${month} ${year} - ${hourStr}:${minutesStr} ${mer}`;
}

const HistorySlice = ({ history }) => {
  return (
    <Link
      className="history-slice"
      to={{
        pathname: '/historyAnalysis',
        state: {
          coinsList: history.coinsList,
          currPriceList: history.currPriceList,
          marketCapList: history.marketCapList,
          volume24hrsList: history.volume24hrsList,
          circulatingSupplyList: history.circulatingSupplyList,
        },
      }}
    >
      <Card className="history-slice" hoverable>
        <Title level={4} className="heading">
          {getFormattedDateTime(history.createdAt)} :{' '}
          {history.coinsList.toString()}
        </Title>
      </Card>
    </Link>
  );
};

export default HistorySlice;

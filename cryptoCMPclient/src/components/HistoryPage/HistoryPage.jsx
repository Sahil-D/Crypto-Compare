import { Row, Typography } from 'antd';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import FlatList from 'flatlist-react';
import { HistorySlice } from '..';
import { Axios } from '../../config';

const { Title } = Typography;

const HistoryPage = () => {
  // Pagination concept applied here
  const PAGE_LIMIT = 4;
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [fetchingInitially, setFetchingInitially] = useState(true);
  const [historyList, setHistoryList] = useState([]);
  const [isFetchingError, setIsFetchingError] = useState(false);

  const user = useSelector((state) => state.user.user);

  const fetchHistory = useCallback(async () => {
    try {
      console.log('fetching page:', pageNum);
      const res = await Axios.get(
        `/history/${user.id}/${PAGE_LIMIT}/${pageNum}`
      );
      if (res.data.data.length) {
        setHistoryList([...historyList, ...res.data.data]);
        setPageNum(pageNum + 1);
      } else {
        setHasMore(false);
      }
      setFetchingInitially(false);
    } catch (e) {
      console.log(e);
      setHasMore(false);
      setIsFetchingError(true);
      setFetchingInitially(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyList, pageNum]);

  useEffect(() => {
    if (hasMore) fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);

  if (isFetchingError) return 'Error while fetching!!! Please Try Again.';

  return (
    <>
      <Title level={2} className="heading">
        History
      </Title>
      <Row className="history-content">
        {fetchingInitially ? (
          <div>Loading...</div>
        ) : (
          <FlatList
            list={historyList}
            renderItem={(history, index) => (
              <HistorySlice history={history} key={index.toString()} />
            )}
            renderWhenEmpty={() => (
              <div>No Analysis History yet. Do some analysis.</div>
            )}
            paginate={{
              hasMore: hasMore,
              loadMore: fetchHistory,
              loadingIndicator: (
                <div style={{ background: '#090' }}>Getting more items...</div>
              ),
              loadingIndicatorPosition: 'center',
            }}
          />
        )}
      </Row>
    </>
  );
};

export default HistoryPage;

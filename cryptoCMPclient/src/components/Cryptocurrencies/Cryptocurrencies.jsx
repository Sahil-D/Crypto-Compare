import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

const Cryptocurrencies = ({ simplified, cryptoList, handleCardClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    setFilteredList(
      cryptoList?.filter((cryp) => cryp.name.toLowerCase().includes(searchTerm))
    );
  }, [cryptoList, searchTerm]);

  if (!filteredList.length && simplified) {
    return (
      <div>No Selected cryptos for now. Please select from list below.</div>
    );
  }

  return (
    <>
      {/* input bar shown for all crypos only */}
      {!simplified ? (
        <div className="search-crypto">
          <Input
            placeholder="Search Crypto"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      ) : null}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {filteredList?.map((cryptoCur, index) => (
          <Col
            key={index.toString()}
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
          >
            <Card
              title={cryptoCur.symbol.replace(/[^0-9a-z]/gi, '')}
              extra={
                <img className="crypto-image" alt="" src={cryptoCur.iconUrl} />
              }
              onClick={() => handleCardClick(cryptoCur.name)}
              hoverable
            >
              <p>{cryptoCur.name}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {simplified && filteredList.length ? (
        <div className="search-crypto">
          <Link
            to={{
              pathname: '/analysis',
              state: {
                coinsList: filteredList.map((cr) => {
                  // cleanup
                  return cr.symbol.replace(/[^0-9a-z]/gi, '');
                }),
              },
            }}
          >
            <button className="analysis-button">Analyse</button>
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default Cryptocurrencies;

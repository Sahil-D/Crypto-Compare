import { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import { Cryptocurrencies, Loader } from '..';

const { Title } = Typography;

const Homepage = () => {
  // no of cryptos listed on homepage
  let count = 12;
  const { data: cryptoList, isFetching, isError } = useGetCryptosQuery(count);
  const [selectedCryptos, setSelectedCryptos] = useState([]);
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    setCryptos(cryptoList?.data?.coins || []);
  }, [cryptoList]);

  if (isFetching) return <Loader />;

  if (isError) return 'Error while fetching!!! Please Reload.';

  const handleCardClick = (cname) => {
    let foundInSelected = selectedCryptos.find((cr) => cr.name === cname);
    let foundInNormal = cryptos.find((cr) => cr.name === cname);

    if (foundInSelected) {
      setSelectedCryptos(selectedCryptos.filter((cr) => cr.name !== cname));
      setCryptos([...cryptos, foundInSelected]);
    } else {
      setCryptos(cryptos.filter((cr) => cr.name !== cname));
      setSelectedCryptos([...selectedCryptos, foundInNormal]);
    }
  };

  return (
    <>
      <Title level={2} className="heading">
        Selected Crypos
      </Title>
      <Cryptocurrencies
        simplified
        handleCardClick={handleCardClick}
        cryptoList={selectedCryptos}
      />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Cryptocurrencies List
        </Title>
      </div>
      <Cryptocurrencies
        handleCardClick={handleCardClick}
        cryptoList={cryptos}
      />
    </>
  );
};

export default Homepage;

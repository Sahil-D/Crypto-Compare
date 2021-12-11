import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { useSelector } from 'react-redux';

import {
  Navbar,
  Homepage,
  LoginPage,
  RegisterPage,
  Cryptocurrencies,
  CryptoAnalysis,
  HistoryPage,
  HistoryAnalysis,
} from './components';

const App = () => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return (
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route exact path="/register">
          <RegisterPage />
        </Route>
      </Switch>
    );
  }

  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>
              <Route exact path="/analysis">
                <CryptoAnalysis />
              </Route>
              <Route exact path="/history">
                <HistoryPage />
              </Route>
              <Route exact path="/historyAnalysis">
                <HistoryAnalysis />
              </Route>
              <Route path="/">
                <Homepage />
              </Route>
            </Switch>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: 'white', textAlign: 'center' }}
          >
            CryptoCMP <br />
            All Rights Reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;

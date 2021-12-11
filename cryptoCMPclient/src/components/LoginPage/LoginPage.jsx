import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card } from 'antd';
import cimage from '../../images/cryptocurrency.png';
import { login } from '../../services/user';
import { Axios } from '../../config';

const LoginPage = () => {
  const username = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  const [buttonsDisabled, setButtonsDisable] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setButtonsDisable(true);
      const res = await Axios.post('/user/login', {
        username: username.current.value,
        password: password.current.value,
      });

      const res_user = res.data.data;

      dispatch(
        login({ user: { username: res_user.username, id: res_user._id } })
      );
      setButtonsDisable(false);
    } catch (e) {
      console.log(e);
      setButtonsDisable(false);
      alert('Cannot Login !!!');
    }
  };

  return (
    <div className="login-page">
      <h1 className="login-heading">CryptoCMP</h1>

      <Card
        className="login-box"
        title="LOGIN"
        extra={<img alt="" className="login-image" src={cimage} />}
        style={{ background: '#0071bd', colorScheme: '#0071bd' }}
        hoverable
      >
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            className="login-input"
            placeholder="Username"
            ref={username}
            required
          />

          <input
            type="password"
            className="login-input"
            placeholder="Password"
            ref={password}
            required
            minLength={6}
          />
          <button className="login-button" disabled={buttonsDisabled}>
            Login
          </button>
        </form>
        <div className="switch-option">
          <Link
            to="/register"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'black',
            }}
          >
            <button className="login-button" disabled={buttonsDisabled}>
              Register for New Account
            </button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;

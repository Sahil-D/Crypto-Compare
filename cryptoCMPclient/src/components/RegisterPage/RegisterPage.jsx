import { useRef, useState } from 'react';
import { Card } from 'antd';
import { useDispatch } from 'react-redux';
import cimage from '../../images/cryptocurrency.png';
import { Link } from 'react-router-dom';
import { Axios } from '../../config';

import { register } from '../../services/user';

const RegisterPage = () => {
  const username = useRef(null);
  const password = useRef(null);

  const dispatch = useDispatch();

  const [buttonsDisabled, setButtonsDisable] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setButtonsDisable(true);
      const res = await Axios.post('/user/register', {
        username: username.current.value,
        password: password.current.value,
      });

      const res_user = res.data.data;

      dispatch(
        register({ user: { username: res_user.username, id: res_user._id } })
      );
      setButtonsDisable(false);
    } catch (e) {
      console.log(e);
      setButtonsDisable(false);
      alert('Cannot Register, Please Use any other username !!!');
    }
  };

  return (
    <div className="login-page">
      <h1 className="login-heading">CryptoCMP</h1>

      <Card
        className="login-box"
        title="REGISTER"
        extra={<img alt="" className="login-image" src={cimage} />}
        style={{ background: '#0071bd', colorScheme: '#0071bd' }}
        hoverable
      >
        <form className="login-form" onSubmit={handleRegister}>
          <input
            type="text"
            className="login-input"
            placeholder="Username"
            ref={username}
            minLength={6}
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
            Register
          </button>
        </form>
        <div className="switch-option">
          <Link
            to="/"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'black',
            }}
          >
            <button className="login-button" disabled={buttonsDisabled}>
              Login to Existing Account
            </button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;

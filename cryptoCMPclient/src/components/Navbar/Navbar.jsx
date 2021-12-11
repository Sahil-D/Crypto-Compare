import { useEffect, useState } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  FundOutlined,
  MenuOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import icon from '../../images/cryptocurrency.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/user';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);
    // for first time
    handleResize();

    // componentDidUnmount feature
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) setActiveMenu(false);
    else setActiveMenu(true);
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">CryptoCMP</Link>
        </Typography.Title>
      </div>

      <Button
        className="menu-control-container"
        onClick={() => setActiveMenu(!activeMenu)}
      >
        <MenuOutlined />
      </Button>

      {activeMenu && (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />} key="1">
            <Link to="/">DashBoard</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />} key="2">
            <Link to="/history">History</Link>
          </Menu.Item>
          <Menu.Item
            icon={<LogoutOutlined />}
            key="3"
            onClick={() => dispatch(logout())}
          >
            <Link to="/">Logout ({user.username})</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;

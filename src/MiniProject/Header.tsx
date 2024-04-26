// @ts-nocheck
import React from 'react'
import $ from "jquery";
import user from './img/user.jpg'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginState } from '../redux/reducers/userReducer';
import { useNavigate } from 'react-router-dom';


export default function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userRedux.userData)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
      {/* <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
      <h2 className="text-primary mb-0">
        <i className="fa fa-hashtag"></i>
      </h2>
    </a> */}
      {/* <div style={{ cursor: 'pointer' }} onClick={() => {
        $('.sidebar, .content').toggleClass("open");
      }} className="sidebar-toggler flex-shrink-0">
        <i className="fa fa-bars"></i>
      </div> */}
      {/* <form className="d-none d-md-flex ms-4">
      <input className="form-control border-0" type="search" placeholder="Search" />
    </form> */}
      <div className="navbar-nav align-items-center ms-auto">
        <div className="nav-item dropdown">
          <div style={{ cursor: 'pointer' }} onClick={handleClick} className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <img className="rounded-circle me-lg-2" src={user} alt="" style={{ width: 40, height: 40 }} />
            <span className="d-none d-lg-inline-flex">{userData.Name}</span>
          </div>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
            {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
            <MenuItem onClick={() => {
              handleClose()
              dispatch(setLoginState(false))
              navigate("/")
            }}>Logout</MenuItem>
          </Menu>

        </div>
      </div>
    </nav>
  )
}

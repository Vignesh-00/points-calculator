//@ts-nocheck
import React from 'react'
import user from './img/user.jpg'
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {

  const navigate = useNavigate();

  return (
    <div className="sidebar pe-4 pb-3">
      <nav className="navbar bg-light navbar-light">
        <div style={{ cursor: 'pointer' }} className="navbar-brand mx-4 mb-3">
          <h4 className="text-primary">
            {/* <i className="fa fa-hashtag me-2"></i> */}
            TN Agri Monitoring
          </h4>
        </div>
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <img className="rounded-circle" src={user} alt="" style={{ width: 40, height: 40 }} />
            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
          </div>
          <div className="ms-3">
            <h6 className="mb-0">Balaji</h6>
            <span>Admin</span>
          </div>
        </div>
        <div className="navbar-nav w-100">
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => navigate("/dashboard")}
            className="nav-item nav-link active"
          >
            <i className="fa fa-tachometer-alt me-2"></i>
            Dashboard
          </div>
        </div>
      </nav>
    </div>
  )
}

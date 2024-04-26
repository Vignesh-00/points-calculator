//@ts-nocheck
import React, { useState, useEffect } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { PrimaryColor } from './variables';


export default function Dashboard() {

  const navigate = useNavigate();

  return (

    <div className="position-relative bg-white d-flex p-0">

      {/* <Sidebar /> */}


      <div className="content open">
        <Header />

        <div className="container-fluid">
          <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
              <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  {/* <h3>Sign In</h3> */}
                </div>
                {
                  [
                    "Field 1",
                    "Field 2",
                    "Field 3",
                    "Field 4",
                  ].map(d => <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`Enter Your ${d}`} 
                    />
                    <label>{d}</label>
                  </div>)
                }

               

                <div className="d-flex align-items-center justify-content-between mb-4">
                </div>
                <button
                  style={{
                    display : 'flex'
                  }}
                  // onClick={handleClick}
                  // disabled={!(phoneNo && phoneNo?.match(/\d/g).length === 10)}
                  className="btn btn-primary text-center w-50 align-items-center justify-content-center m-auto"
                >
                  {/* {!isSendOTPClicked ? "Send OTP" : "Submit OTP"} */}
                  Submit
                </button>
                {/* <p className="text-center mb-0">Don't have an Account? <a href="">Sign Up</a></p> */}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>



  )
}

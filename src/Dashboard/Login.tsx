import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLoginState } from '../redux/reducers/userReducer'

export default function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [phoneNo, setPhoneNo] = useState<any>('')
    const [OTP, setOTP] = useState<any>('')
    const [isSendOTPClicked, setIsSendOtpClicked] = useState(false)

    const handleClick = (e: any) => {
        e.preventDefault()
        if (isSendOTPClicked) {
            if (OTP === "5555") {
                dispatch(setLoginState(true))
                navigate("/dashboard")
            }
            else {
                alert("Incorrect OTP...Please Try Again")
            }
        }
        else {
            if (phoneNo && phoneNo?.match(/\d/g).length === 10) {
                setIsSendOtpClicked(true)
            }
            else {
                alert("Enter Valid Phone Number")
            }
        }

    }

    return (
        <div className="container-fluid">
            <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                    <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h3>Sign In</h3>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Your Number"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                            />
                            <label>Phone Number</label>
                        </div>
                        {
                            isSendOTPClicked &&
                            <div className="form-floating mb-4">
                                <input
                                    value={OTP}
                                    onChange={(e) => setOTP(e.target.value)}
                                    type="password"
                                    className="form-control"
                                />
                                <label>OTP</label>
                            </div>
                        }

                        <div className="d-flex align-items-center justify-content-between mb-4">
                        </div>
                        <button
                            onClick={handleClick}
                            disabled={!(phoneNo && phoneNo?.match(/\d/g).length === 10)}
                            className="btn btn-primary py-3 w-100 mb-4"
                        >
                            {!isSendOTPClicked ? "Send OTP" : "Submit OTP"}
                        </button>
                        {/* <p className="text-center mb-0">Don't have an Account? <a href="">Sign Up</a></p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

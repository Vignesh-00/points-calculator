import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLoginState, setUserData } from '../redux/reducers/userReducer'
import { getSheetData } from './utils'

export default function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleClick = async (e: any) => {
        e.preventDefault()
        let usersList = await getSheetData("Users")

        let user = usersList.filter((u: any) => u.Email == email)
        if (user.length) {
            if (user[0].Password == password) {
                dispatch(setUserData(user[0]))
                navigate("/dashboard")
            }
            else{
                alert("Incorrect Password")
            }
        }
        else {
            alert("User not exists")
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
                                type="email"
                                className="form-control"
                                placeholder="Enter Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label>Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter Your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label>Password</label>
                        </div>


                        <div className="d-flex align-items-center justify-content-between mb-4">
                        </div>
                        <button
                            onClick={handleClick}
                            className="btn btn-primary py-3 w-100 mb-4"
                        >
                            Login
                        </button>
                        <p className="text-center mb-0">Don't have an Account? <a href="/register">Sign Up</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

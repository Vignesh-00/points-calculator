import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import { setLoginState } from '../redux/reducers/userReducer'

export default function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState<any>({})

    const formFields = [
        {
            placeholder: "Name of the Student",
            value: "StudentName"
        },
        {
            placeholder: "Father’s Name",
            value: "FatherName"
        },
        {
            placeholder: "Mother’s Name",
            value: "MotherName"
        },
        {
            placeholder: "Gender",
            value: "Gender",
            type: "select",
            options: [
                {
                    label: "Boy",
                    value: "Boy"
                },
                {
                    label: "Girl",
                    value: "Girl"
                },
            ]
        },
        {
            placeholder: "Email address",
            value: "Email",
            type: "email"
        },
        {
            placeholder: "Mobile number of Parent",
            value: "Phone"
        },
        {
            placeholder: "School Name and Address",
            value: "SchoolName"
        },
        {
            placeholder: "Age group ",
            value: "AgeGroup",
            type: "select",
            options: [{
                label: "7-10 Years",
                value: 1
            }, {
                label: "11-15 Years",
                value: 2
            }, {
                label: "16-18 Years",
                value: 3
            }]
        }

    ]

    const updateFormData = (e: any) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(formData)

        const requiredFields = formFields.map(f => f.value)
        const emptyRequiredFields = requiredFields.filter(
            (field) => !formData[field]
        );

        if (emptyRequiredFields.length > 0) {
            Swal.fire({
                title: "Missing Required Fields",
                text: `Please Enter - ${emptyRequiredFields.join(
                    ", "
                )}`,
                icon: "error",
            });
            return;
        }
    }

    return (
        <div className="container-fluid">
            <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-5">
                    <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                        <div className="d-flex text-center align-items-center justify-content-center mb-3">
                            <h3>SIGN UP</h3>
                        </div>
                        {
                            formFields.map((field, index) => (
                                field.type === "select" ?
                                    <div key={index} className="form-floating mb-3">
                                        <select
                                            onChange={updateFormData}
                                            defaultValue={''}
                                            className="form-control"
                                            name={field.value}
                                            value={formData[field.value]}
                                        >
                                            <option disabled value={''}>{`Select a ${field.value}`}</option>
                                            {
                                                field.options?.map(option => <option key={option.value} value={option.value}>{option.label}</option>)
                                            }
                                        </select>
                                        <label>{field.placeholder}</label>
                                    </div>
                                    :
                                    <div key={index} className="form-floating mb-3">
                                        <input
                                            style={{ borderRadius: 10 }}
                                            type={field.type || "text"}
                                            className="form-control"
                                            name={field.value}
                                            // placeholder={field.placeholder}
                                            value={formData[field.value]}
                                            onChange={updateFormData}
                                        />
                                        <label>{field.placeholder}</label>
                                    </div>
                            ))
                        }



                        <div className="d-flex align-items-center justify-content-between mb-4">
                        </div>
                        <button
                            onClick={handleSubmit}
                            // disabled={!(phoneNo && phoneNo?.match(/\d/g).length === 10)}
                            className="btn btn-primary py-3 w-100 mb-4"
                        >
                            {/* {!isSendOTPClicked ? "Send OTP" : "Submit OTP"} */}
                            Register
                        </button>
                        <p className="text-center mb-0">Already have an Account? <a href="/">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

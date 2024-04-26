/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";
//@ts-ignore
import upi from './img/upi.png'
import { getSheetData } from './utils';
import emailjs from 'emailjs-com'
import { Checkbox, FormControlLabel } from '@mui/material';

export default function Login() {

  const [formData, setFormData] = useState<any>({})
  const [resetForm, setResetForm] = useState<any>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [isRegistered, setIsRegistered] = useState<boolean>(false)
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<any>(null)
  const [selectedCourses, setSelectedCourses] = useState<Array<any>>([])
  const [courses, setCourses] = useState<Array<any>>([])

  async function getAllCourses() {
    let obj = await getSheetData("Courses")
    let refactedObj = obj.map((d: any) => {
      return {
        ...d,
        Price: parseInt(d.Price),
        Date: d.Date?.split(",").map((item: any) => item.trim())
      }
    })
    console.log(refactedObj)
    setCourses(refactedObj)
  }

  useEffect(() => {
    getAllCourses();
  }, []);

  const formFields = [
    {
      placeholder: "Name of the Student",
      value: "StudentName"
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
      placeholder: "Father’s Name",
      value: "FatherName"
    },
    {
      placeholder: "Mother’s Name",
      value: "MotherName"
    },

    {
      placeholder: "Email address",
      value: "Email",
      type: "email"
    },
    {
      placeholder: "Mobile Number of Parent",
      value: "Phone"
    },
    {
      placeholder: "School Name and Address",
      value: "SchoolName"
    },
    {
      placeholder: "Age Group ",
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
    if (name == "AgeGroup") {
      setSelectedCourses([])
      setSelectedAgeGroup(value)
    }
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const emailContent = `
  <h2>Your Course Details are Below</h2>
  ${selectedCourses.map(c => `<div>${c.Name} on ${c.SelectedDate}</div>`).join('')}
`;

  const sendEmail = async (data: any) => {

    emailjs
      .send('service_iuuh5xi', 'template_hbis557', {
        receiver: data.StudentName,
        message: `Your Payment of ${data.Amount} Rupees Received!`,
        html: emailContent,
        to_email: data.Email,
      }, 'rrvQRE3W_GUgIBoHK')
      .then(
        (result) => {
          setFormData({})
          setResetForm(resetForm + 1)
          setIsRegistered(false)
          setSelectedCourses([])
          setSelectedAgeGroup(null)
        },
        (error) => {
          console.log('FAILED...', error);
        },
      ).finally(() => setLoading(false))
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await sendEmail({
      ...formData,
      Amount: selectedCourses.reduce((total, course) => total + course.Price, 0)
    })

    console.log(formData)
    console.log(selectedCourses)
  }

  return (
    <div className="container-fluid">
      <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8">
          <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
            <div className="d-flex text-center align-items-center justify-content-center mb-3">
              <h3>Register</h3>
            </div>

            <div className="row flex">
              {
                formFields.map((field, index) => (
                  field.type === "select" ?
                    <div key={`${index}${resetForm}`} className="form-floating mb-3 col-6">
                      <select
                        disabled={isRegistered}
                        style={{ backgroundColor: isRegistered ? '#e9ecef' : 'white', appearance: 'auto' }}
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
                      <label style={{ marginLeft: 10, opacity: 1 }}>{field.placeholder}</label>
                    </div>
                    :
                    <div key={`${index}${resetForm}`} className="form-floating mb-3 col-6">
                      <input
                        disabled={isRegistered}
                        style={{ borderRadius: 10 }}
                        type={field.type || "text"}
                        className="form-control"
                        name={field.value}
                        // placeholder={field.placeholder}
                        value={formData[field.value]}
                        onChange={updateFormData}
                      />
                      <label style={{ marginLeft: 10, opacity: 1 }}>{field.placeholder}</label>
                    </div>
                ))
              }

            </div>

            {
              isRegistered && !!courses
                .filter(c => c.AgeGroupID == selectedAgeGroup)
                .filter(c => c.Duration == "1/2 Day").length &&
              <div>
                <h5>Half-a-Day Training Courses</h5>
                {
                  courses
                    .filter(c => c.AgeGroupID == selectedAgeGroup)
                    .filter(c => c.Duration == "1/2 Day")
                    .map(course => (
                      <div className='row mb-2' key={course.CourseID}>
                        <div className="col-6">
                          <FormControlLabel control={<Checkbox onChange={(e) => {
                            if (e.target.checked) {
                              let temp = selectedCourses
                              temp.push({
                                ...course,
                                SelectedDate: course?.Date[0] || ""
                              })
                              setSelectedCourses([...temp])
                            }
                            else {
                              let temp = selectedCourses.filter(d => d.CourseID !== course.CourseID)
                              setSelectedCourses([...temp])
                            }
                          }} />} label={`${course.Name} (₹ ${course.Price})`} />
                        </div>

                        {
                          !!selectedCourses.filter(c => c.CourseID == course.CourseID).length &&
                          <div className='row col-6'>
                            <label className='col-2' style={{ margin: 'auto', opacity: 1 }}>Date</label>
                            <select
                              style={{ backgroundColor: 'white', appearance: 'auto', width: '50%' }}
                              onChange={(e) => {
                                let temp = selectedCourses.map((d: any) => {
                                  if (d.CourseID == course.CourseID) {
                                    return {
                                      ...d,
                                      SelectedDate: e.target.value
                                    }
                                  }
                                  else return d
                                })
                                setSelectedCourses([...temp])
                              }}
                              className="form-control col-6"
                            >
                              {course.Date?.map((option: any) => <option key={option} value={option}>{option}</option>)}
                            </select>

                          </div>

                        }
                      </div>
                    ))
                }
              </div>
            }

            {
              isRegistered && !!courses
                .filter(c => c.AgeGroupID == selectedAgeGroup)
                .filter(c => c.Duration == "1 Day").length &&
              <div>
                <h5>Half-a-Day Training Courses</h5>
                {
                  courses
                    .filter(c => c.AgeGroupID == selectedAgeGroup)
                    .filter(c => c.Duration == "1 Day")
                    .map(course => (
                      <div className='row mb-2' key={course.CourseID}>
                        <div className="col-6">
                          <FormControlLabel control={<Checkbox onChange={(e) => {
                            if (e.target.checked) {
                              let temp = selectedCourses
                              temp.push({
                                ...course,
                                SelectedDate: course?.Date[0] || ""
                              })
                              setSelectedCourses([...temp])
                            }
                            else {
                              let temp = selectedCourses.filter(d => d.CourseID !== course.CourseID)
                              setSelectedCourses([...temp])
                            }
                          }} />} label={`${course.Name} (₹ ${course.Price})`} />
                        </div>

                        {
                          !!selectedCourses.filter(c => c.CourseID == course.CourseID).length &&
                          <div className='row col-6'>
                            <label className='col-2' style={{ margin: 'auto', opacity: 1 }}>Date</label>
                            <select
                              style={{ backgroundColor: 'white', appearance: 'auto', width: '50%' }}
                              onChange={(e) => {
                                let temp = selectedCourses.map((d: any) => {
                                  if (d.CourseID == course.CourseID) {
                                    return {
                                      ...d,
                                      SelectedDate: e.target.value
                                    }
                                  }
                                  else return d
                                })
                                setSelectedCourses([...temp])
                              }}
                              className="form-control col-6"
                            >
                              {course.Date?.map((option: any) => <option key={option} value={option}>{option}</option>)}
                            </select>

                          </div>

                        }
                      </div>
                    ))
                }
              </div>
            }


            {
              !isRegistered &&
              <button
                onClick={(e) => {
                  e.preventDefault()

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

                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
                    Swal.fire({
                      title: "Invalid Email",
                      text: `Please Enter Valid Email`,
                      icon: "error",
                    });
                    return;
                  }

                  if (!/^[6-9]\d{9}$/.test(formData.Phone)) {
                    Swal.fire({
                      title: "Invalid Phone Number",
                      text: `Please Enter Valid Phone Number`,
                      icon: "error",
                    });
                    return;
                  }


                  setIsRegistered(true)
                }}
                className="btn btn-primary py-3 w-100 mb-4"
              >
                Register
              </button>
            }



            {
              !!selectedCourses.length &&
              <div>
                <h4>
                  Total Cost - ₹ {selectedCourses.reduce((total, course) => total + course.Price, 0)}/-
                </h4>
                <div className="d-flex m-auto justify-content-center">
                  <img src={upi} alt="" style={{ width: 600, height: 800 }} />
                </div>
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary py-3 w-100 mb-4"
                  disabled={loading}
                >
                  {
                    loading ? "Submitting..." :
                      "Pay & Submit"
                  }

                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

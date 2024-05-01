/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";
//@ts-ignore
import upi from './img/upi.png'
import { animationStyle, getSheetData } from './utils';
import { Button, Checkbox, CircularProgress, FormControlLabel } from '@mui/material';
import './css/custom.scss'
import axios from 'axios';
import { Card } from 'react-bootstrap';
import Header from './Header';


export default function Dashboard() {

  const [formData, setFormData] = useState<any>({})
  const [resetForm, setResetForm] = useState<any>(0)
  const [uploadedImage, setUploadedImage] = useState<any>(null)
  const [paymentDetails, setPaymentDetails] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [imageLoading, setImageLoading] = useState<boolean>(false)
  const [errorMessages, setErrorMessages] = useState<any>('')
  const [isRegistered, setIsRegistered] = useState<boolean>(false)
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<any>(null)
  const [selectedCourses, setSelectedCourses] = useState<Array<any>>([])
  const [courses, setCourses] = useState<Array<any>>([])


  async function getAllCourses() {
    let obj = await getSheetData("Courses")
    let refactedObj = obj?.map((d: any) => {
      return {
        ...d,
        Price: parseInt(d.Price),
        Date: !!d.Date ? d.Date?.split(",").map((item: any) => item.trim()) : []
      }
    })
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
      value: "Phone",
      type: "number"
    },
    {
      placeholder: "School Name and Address",
      value: "SchoolName",
      length: 12
    },
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

  //   const emailContent = `
  //   <h2>Your Course Details are Below</h2>
  //   ${selectedCourses.map(c => `<div>${c.Name} on ${c.SelectedDate}</div>`).join('')}
  // `;

  //   const sendEmail = async (data: any) => {

  //     emailjs
  //       .send('service_iuuh5xi', 'template_hbis557', {
  //         receiver: data.StudentName,
  //         message: `Your Payment of ${data.Amount} Rupees Received!`,
  //         html: emailContent,
  //         to_email: data.Email,
  //       }, 'rrvQRE3W_GUgIBoHK')
  //       .then(
  //         (result) => {
  //           setFormData({})
  //           setResetForm(resetForm + 1)
  //           setIsRegistered(false)
  //           setSelectedCourses([])
  //           setSelectedAgeGroup(null)
  //         },
  //         (error) => {
  //           console.log('FAILED...', error);
  //         },
  //       ).finally(() => setLoading(false))
  //   };

  const base64Converter = (file: any) => new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let result = reader.result?.toString();
        result = result?.split("base64,").pop();
        resolve(result);
      };
      reader.onerror = error => {
        reject(error)
      }
    }
    else {
      resolve("")
    }
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    setLoading(true)

    if (!uploadedImage) {
      Swal.fire({
        title: "Payment Image Missing",
        text: `Please Upload Payment Image`,
        icon: "error",
      });
      setLoading(false)
      return;
    }

    const payload = {
      ...formData,
      Courses: selectedCourses,
      ...paymentDetails,
      PaymentImage: await base64Converter(uploadedImage)
    }

    axios.post('https://learnatpsit.in:5000/api/save', payload)
      // axios.post('http://localhost:5000/api/save', payload)
      .then((resp: any) => {
        // console.log(resp.data)
        setFormData({})
        setResetForm(resetForm + 1)
        setIsRegistered(false)
        setSelectedCourses([])
        setSelectedAgeGroup(null)
        setUploadedImage(null)
        Swal.fire({
          title: "Success",
          text: `Registered Successfully`,
          icon: "success",
        });
      }).catch((err) => {
        console.log(err)
      }).finally(() => setLoading(false))
  }

  const validateImage = async (file: any) => {
    setImageLoading(true)
    const payload = {
      PaymentImage: await base64Converter(file)
    }
    axios.post('https://learnatpsit.in:5000/api/test', payload)
      .then((resp) => {
        console.log(resp.data)
        setPaymentDetails(resp.data)
        setUploadedImage(file)

        const cleanAmountString = resp.data?.TransactionAmount?.replace(/[^\d.-]/g, '');

        if (!resp.data.Validation) {
          setErrorMessages('Please upload a clear and relevant screenshot of your payment details')
        }
        else if (!resp.data?.To?.includes("PROF HEAD DEPT OF PHYSICAL SCIENCES INFO")) {
          setErrorMessages('Payment Receiver is not Correct. Please Cross-Check.')
        }
        else if (cleanAmountString != formData.Amount) {
          setErrorMessages('Paid Amount is not Correct. Please Cross-Check.')
        }

      }).catch((err) => {
        console.log(err)
      }).finally(() => setImageLoading(false))
  }

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
          <div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8">
            <div className="bg-light rounded my-4 mx-3">
              <div style={{ flexDirection: 'column' }} className="d-flex text-center align-items-center justify-content-center mb-3">
                <h3>Tamil Nadu Agricultural University</h3>
                <h3>Agricultural Engineering College and Research Institute </h3>
                <h4>Physical Sciences and Information Technology</h4>
                <h4>Summer Camp 2024 </h4>
              </div>

              <div className="row flex">
                {
                  formFields.map((field, index) => (
                    field.type === "select" ?
                      <div key={`${index}${resetForm}`} className="form-floating mb-3 col-sm-8 col-lg-6 ">
                        <select
                          disabled={isRegistered}
                          style={{
                            backgroundColor: 'white',
                            appearance: 'auto', fontWeight: isRegistered ? 'bold' : 'normal',
                            opacity: 1,
                            color: '#2a2a2a'
                          }}
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
                        <label style={{ marginLeft: 10, padding: '0.5rem .75rem', opacity: 1 }}>{field.placeholder}</label>
                      </div>
                      :
                      <div key={`${index}${resetForm}`} className={`form-floating mb-3 col-sm-8 col-lg-${field?.length || 6}`}>
                        <input
                          disabled={isRegistered}
                          style={{
                            backgroundColor: 'white',
                            borderRadius: 10,
                            fontWeight: isRegistered ? 'bold' : 'normal',
                            color: '#2a2a2a'
                          }}
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
                isRegistered &&
                <div className="form-floating mb-3 col-sm-8 col-lg-6 ">
                  <select
                    disabled={isConfirmed}
                    style={{
                      backgroundColor: 'white',
                      appearance: 'auto',
                      fontWeight: isConfirmed ? 'bold' : 'normal',
                      opacity: 1,
                      color: '#2a2a2a'
                    }}
                    onChange={updateFormData}
                    defaultValue={''}
                    className="form-control"
                    name={"AgeGroup"}
                    value={formData?.AgeGroup || ''}
                  >
                    <option disabled value={''}>{`Select an Age Group`}</option>
                    {
                      [{
                        label: "7-10 Years",
                        value: 1
                      }, {
                        label: "11-15 Years",
                        value: 2
                      }, {
                        label: "16-18 Years",
                        value: 3
                      }]?.map(option => <option key={option.value} value={option.value}>{option.label}</option>)
                    }
                  </select>
                  <label style={{ padding: '0.5rem .75rem', opacity: 1 }}>Select an Age Group</label>
                </div>
              }

              {
                isRegistered && !!courses
                  .filter(c => c.AgeGroupID == selectedAgeGroup)
                  .filter(c => c.Duration == "1/2 Day").length &&
                <div
                  key={`${selectedAgeGroup}half`}
                  style={{
                    animation: animationStyle(),
                    color: '#2a2a2a',
                  }}
                >
                  <h5>Select the Sessions of Your Interest (Half-Day)</h5>
                  {
                    courses
                      .filter(c => c.AgeGroupID == selectedAgeGroup)
                      .filter(c => c.Duration == "1/2 Day")
                      .filter(c => {
                        if (isConfirmed)
                          return selectedCourses.some(sc => sc.CourseID === c.CourseID)
                        else return true
                      })
                      .map(course => (
                        <div className='row mb-2' key={course.CourseID}>
                          <div className="col-sm-8 col-lg-6">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  disabled={isConfirmed}
                                  onChange={(e) => {
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
                                  }}
                                />}
                              label={<div style={{ color: '#2a2a2a' }}>{`${course.Name} (₹ ${course.Price})`}</div>}
                            />
                          </div>

                          {
                            !!selectedCourses.filter(c => c.CourseID == course.CourseID).length &&
                            !!course?.Date?.length &&
                            <div className='row col-sm-8 col-lg-6'>
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
                <div
                  key={`${selectedAgeGroup}full`}
                  style={{
                    animation: animationStyle(),
                    color: '#2a2a2a',
                  }}
                >
                  <h5>Select the Sessions of Your Interest (Full-Day)</h5>
                  {
                    courses
                      .filter(c => {
                        if (isConfirmed)
                          return selectedCourses.some(sc => sc.CourseID === c.CourseID)
                        else return true
                      })
                      .filter(c => c.AgeGroupID == selectedAgeGroup)
                      .filter(c => c.Duration == "1 Day")
                      .filter(c => {
                        if (isConfirmed)
                          return selectedCourses.some(sc => sc.CourseID === c.CourseID)
                        else return true
                      })
                      .map(course => (
                        <div className='row mb-2' key={course.CourseID}>
                          <div className="col-sm-8 col-lg-6">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  disabled={isConfirmed}
                                  onChange={(e) => {
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
                                  }}
                                />}
                              label={<div style={{ color: '#2a2a2a' }}>{`${course.Name} (₹ ${course.Price})`}</div>}
                            />
                          </div>

                          {
                            !!selectedCourses.filter(c => c.CourseID == course.CourseID).length &&
                            !!course?.Date?.length &&
                            <div className='row col-sm-8 col-lg-6'>
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
                </div>
              }

              {
                isRegistered && !isConfirmed && !!selectedCourses.length &&
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setIsConfirmed(true)
                  }}
                  className="btn btn-primary py-3 w-100 mb-4"
                >
                  Confirm
                </button>
              }



              {
                isConfirmed && !!selectedCourses.length &&
                <div>
                  {
                    !uploadedImage &&
                    <div style={{ marginRight: '-50px' }} className="d-flex justify-content-center">
                      <img src={upi} alt="" style={{ width: 600, height: 800 }} />
                    </div>
                  }


                  <Card.Body>
                    {
                      uploadedImage &&
                      <div >
                        <img
                          src={URL.createObjectURL(uploadedImage)}
                          alt="payment"
                          width={'100%'}
                          style={{ maxHeight: '45rem' }}
                        />
                        {errorMessages && <div><label style={{ color: 'red' }}>{errorMessages}</label></div>}
                        {
                          errorMessages &&
                          <div>
                            <label style={{ color: 'green' }}>From : {paymentDetails.From}</label><br />
                            <label style={{ color: 'green' }}>To : {paymentDetails.To}</label><br />
                            <label style={{ color: 'green' }}>Amount Transferred : {paymentDetails.TransactionAmount}</label><br />
                            <label style={{ color: 'green' }}>Transferred On : {paymentDetails.TransactionTime}</label><br />
                          </div>
                        }
                      </div>
                    }

                    <div className='d-flex' style={{ justifyContent: 'center' }}>
                      <div className="p-5 justify-content-center" style={{ width: '100%' }}>
                        <input id='img-upload' type="file" style={{ display: 'none' }} accept="image/*"
                          onChange={(e) => {
                            e.target.files?.length && validateImage(e.target.files[0])
                          }} />


                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <Button
                            variant='contained'
                            disabled={loading || imageLoading}
                            onClick={(e) => {
                              e.preventDefault()
                              document.getElementById('img-upload')?.click()
                            }}
                          >
                            {
                              imageLoading && <CircularProgress style={{ marginRight: 10 }} />
                            }
                            {
                              imageLoading ? 'Validating ' : (uploadedImage ? 'Re-Upload ' : 'Upload ')
                            }
                            Payment Image
                          </Button>
                        </div>

                      </div>
                    </div>
                  </Card.Body>
                  {
                    uploadedImage &&
                    <button
                      onClick={handleSubmit}
                      className="btn btn-primary py-3 w-100 mb-4 d-flex "
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                      disabled={loading}
                    >
                      {
                        loading && <CircularProgress style={{ marginRight: 10 }} />
                      }
                      {
                        loading ? "Submitting...Please Hold" : "Submit"
                      }

                    </button>
                  }

                </div>
              }
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

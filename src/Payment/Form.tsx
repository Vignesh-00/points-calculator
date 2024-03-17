// @ts-nocheck
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { PrimaryColor, SERVER_IP } from "./variables";
import './css/style.css'
import useRazorpay, { RazorpayOptions } from "react-razorpay";

export default function Form() {

  const { handleSubmit, control } = useForm();
  const [loading, setLoading] = useState(false);
  const [Razorpay] = useRazorpay();

  const handlePayment = useCallback((data, order) => {
    // const order = await createOrder(params);

    const options: RazorpayOptions = {
      key: "rzp_test_N26FU7AVaYXlPL", // Enter the Key ID generated from the Dashboard
      amount: data.Amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: data.Name,
      description: data.Note,
      // image: "https://example.com/your_logo",
      order_id: order.id,
      handler: async function (response: any) {
        console.log(response)
        const savepayment = await fetch(`${SERVER_IP}savepayment`, {
          method: "POST",
          body: JSON.stringify({...data,...order,...response}),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(savepayment)
        setLoading(false)
        if(savepayment.status === 200){
          alert(`Email has been sent to ${data.Email}`)
        }
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: data.Name,
        email: data.Email,
        contact: data.PhoneNumber,
      },
      notes: {
        address: "Chennai",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response: any) {
      setLoading(false)
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp1.open();
  }, [Razorpay]);

  const onSubmit = async (data: any) => {
    setLoading(true)
    console.log(data)
    let modifiedData = {
      ...data,
      Amount: parseInt(data.Amount) * 100
    }
    const response = await fetch(`${SERVER_IP}order`, {
      method: "POST",
      body: JSON.stringify(modifiedData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);
    handlePayment(modifiedData, order)
  };


  return (

    <div className="position-relative bg-white d-flex p-0">


      {/* Content Start */}
      <div className="content" style={{ margin: 'auto' }}>
        <div style={{ display: 'flex' }}>
          <Grid container spacing={1} style={{ padding: '10px 30px 10px 30px' }}>
            <Grid container spacing={3} style={{ margin: '10px auto', borderRadius: '10px', border: `2px solid ${PrimaryColor}` }}>
              <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
                <Grid style={{ padding: 15 }} container direction="row">
                  <Grid item xs={12}>
                    <Typography style={{ backgroundColor: PrimaryColor, color: 'white', display: 'flex', justifyContent: 'center' }} variant="h6" gutterBottom>
                      {"Payment Form"}
                    </Typography>
                  </Grid>

                  <Grid container style={{ marginTop: 15 }} spacing={3} >


                    <Grid item xs={12} sm={6}>

                      <Controller
                        name="Name"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                          <TextField
                            label="Name"
                            fullWidth
                            variant={"outlined"}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        )}
                        rules={{ required: 'This field is required' }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="Date"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                          <TextField
                            // label="Date"
                            type="date"
                            fullWidth
                            variant={"outlined"}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        )}
                        rules={{ required: 'This field is required' }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="PhoneNumber"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                          <TextField
                            label="Phone Number"
                            variant={"outlined"}
                            value={value}
                            fullWidth
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        )}
                        rules={{ required: 'This field is required' }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="Email"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                          <TextField
                            label="Email"
                            variant={"outlined"}
                            value={value}
                            fullWidth
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        )}
                        rules={{ required: 'This field is required' }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="Amount"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                          <TextField
                            label="Amount"
                            variant={"outlined"}
                            value={value}
                            fullWidth
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        )}
                        rules={{ required: 'This field is required' }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="Note"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                          <TextField
                            label="Note"
                            variant={"outlined"}
                            value={value}
                            fullWidth
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        )}
                        rules={{ required: 'This field is required' }}
                      />
                    </Grid>


                  </Grid>

                </Grid>

                <Grid container style={{ margin: '10px 0 10px' }}>
                  <Grid
                    item
                    xs={12}
                    // sm={6}
                    style={{ textAlign: "center" }}
                  >
                    <Button
                      disabled={loading}
                      color="primary"
                      size="small"
                      variant="contained"
                      type="submit"
                    >
                      {loading && <CircularProgress size={20} style={{ marginRight: '10px' }} />}
                      {"Submit"}
                    </Button>
                  </Grid>
                  {/* <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ textAlign: "center" }}
                  >
                    <Button
                      color="secondary"
                      size="small"
                      variant="contained"
                    >
                      Back
                    </Button>
                  </Grid> */}

                </Grid>
              </form>

            </Grid>
          </Grid>

        </div>
      </div>
      {/* Content End */}
    </div >
  );
};

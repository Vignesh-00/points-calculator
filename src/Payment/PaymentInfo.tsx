// @ts-nocheck
import {
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios'

import { PrimaryColor, SERVER_IP } from "./variables";

interface DisplayProps {
  primary: string,
  secondary: any,
  icon: any
}

export const PaymentInfo = () => {

  const { id: paymentId } = useParams()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    Name: 'Vignesh',
    Date: '2024-01-15',
    PhoneNumber: '09087798654',
    Email: 'cloudofvignesh@gmail.com',
    Amount: 41000,
    Note: 'First Payment',
    id: 'order_NSMR7KLLEpY9Sm',
    entity: 'order',
    amount: 41000,
    amount_paid: 0,
    amount_due: 41000,
    currency: 'INR',
    receipt: 'First Payment',
    offer_id: null,
    status: 'created',
    attempts: 0,
    notes: [],
    created_at: 1706079929,
    razorpay_payment_id: 'pay_NSMRESBS63Qtiv',
    razorpay_order_id: 'order_NSMR7KLLEpY9Sm',
    razorpay_signature: '26b0d5c183fd496cfde3a8bc2b7c6de8c7f84f519a6208d9aeefd1e16b7a22d9'
  });

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${SERVER_IP}paymentinfo/${paymentId}`)
      .then((resp) => {
        console.log(resp.data)
        setData(resp.data)
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        setLoading(false)
      })
  }, [])

  function DisplayInfo({ primary, secondary, icon }: DisplayProps) {
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            {icon}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={primary} secondary={secondary} />
      </ListItem>
    )
  }

  return (

    <div className="position-relative bg-white d-flex p-0">
      {
        loading ? <CircularProgress /> :
          <div className="content">
            <div style={{ display: 'flex' }}>
              <Grid container spacing={1} style={{ padding: '10px 30px 10px 30px' }}>
                <Grid container spacing={3} style={{ margin: '10px auto', borderRadius: '10px', border: `2px solid ${PrimaryColor}` }}>

                  <Grid container direction="row">
                    <Grid item xs={12}>
                      <Typography style={{ backgroundColor: PrimaryColor, color: 'white', display: 'flex', justifyContent: 'center' }} variant="h6" gutterBottom>
                        {"Payment Info"}
                      </Typography>
                    </Grid>
                    <Grid container spacing={2} style={{ color: 'black' }}>
                      <Grid item xs={12} md={6}>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                          <DisplayInfo primary="Name" secondary={data?.Name} icon={<PersonIcon />} />
                          <DisplayInfo primary="Amount" secondary={data?.Amount ? `${parseInt(data.Amount)/100} ${data.currency}` : ""} icon={<PersonIcon />} />
                          <DisplayInfo primary="Date" secondary={data?.Date} icon={<PersonIcon />} />
                          <DisplayInfo primary="Order ID" secondary={data?.razorpay_order_id} icon={<PersonIcon />} />
                        </List>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                          <DisplayInfo primary="Phone No" secondary={data?.PhoneNumber} icon={<PersonIcon />} />
                          <DisplayInfo primary="Email" secondary={data?.Email} icon={<PersonIcon />} />
                          <DisplayInfo primary="Note" secondary={data?.Note} icon={<PersonIcon />} />
                          <DisplayInfo primary="Payment ID" secondary={data?.razorpay_payment_id} icon={<PersonIcon />} />
                        </List>
                      </Grid>

                    </Grid>
                  </Grid>

                </Grid>
              </Grid>

            </div>
          </div>
      }


    </div >
  );
};

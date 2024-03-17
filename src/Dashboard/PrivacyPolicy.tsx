import React from 'react'
import Sidebar from './Sidebar';
import Header from './Header';
import { PrimaryColor } from './variables';
import { Grid, Typography } from '@mui/material';

export default function PrivacyPolicy() {
  return (

    <div className="position-relative bg-white d-flex p-0">

      {/* <Sidebar /> */}

      {/* <div className="content"> */}
      {/* <Header /> */}
      <div>
        <Grid container spacing={1} style={{ padding: '10px' }}>
          <Grid container spacing={3} style={{ margin: 'auto', borderRadius: '10px', border: `2px solid ${PrimaryColor}` }}>
            <Grid item xs={12}>
              <Typography style={{ backgroundColor: PrimaryColor, color: 'white', display: 'flex' }} variant="h6" gutterBottom>
                {"Privacy Policy for TN Agriculture Monitoring App"}
              </Typography>
              <div style={{ color: 'black' }}>
                <div className='mb-2'>
                  Last updated: 29 Jan, 2024
                </div>

                <h4>Introduction: </h4>
                <div className='mb-2'>
                  Welcome to TN Agriculture Monitoring App, the agriculture monitoring app designed to help farmers and agriculture professionals manage their operations effectively. This Privacy Policy outlines our practices concerning the collection, use, and sharing of your information through the app.
                </div>
                <h4>Information Collection:</h4>
                <div className='mb-2'>
                  We collect information necessary to provide our services, which includes:
                  <br />
                  - Personal identifiers like name, email address, and contact details. <br />
                  - Farm data such as location, crop types, and size.<br />
                  - Equipment and resource information.<br />
                  - App usage data and device-specific information.<br />
                </div>
                <h4>Use of Information:</h4>

                <div className='mb-2'>
                  The information we collect is used to:
                  <br />
                  - Provide personalized agriculture monitoring services.<br />
                  - Offer customer support and respond to inquiries.<br />
                  - Improve app functionality and user experience.<br />
                  - Send updates and notifications related to the app.<br />
                </div>



                <h4>Data Sharing and Disclosure: </h4>
                <div className='mb-2'>

                  We may share your information with:
                  <br />
                  - Service providers that help us with operations.<br />
                  - Legal entities, if required by law or to protect our rights.<br />
                  - Potential buyers or successors in the event of a merger, acquisition, or asset sale.<br />

                </div>


                <h4>Data Storage and Security: </h4>
                <div className='mb-2'>
                  We are committed to protecting your information through:
                  <br />
                  - Secure servers and encryption technologies.<br />
                  - Regular reviews of our data collection, storage, and processing practices.<br />
                  - Restricting access to personal information to employees and contractors who need to know that information in order to process it for us and who are subject to strict contractual confidentiality obligations.<br />

                </div>

                <h4> User Rights:</h4>
                <div className='mb-2'>
                  You have the right to:
                  <br />
                  - Access and receive a copy of your personal information.<br />
                  - Request correction or deletion of your information.<br />
                  - Object to processing and request restriction of processing.<br />
                  - Withdraw consent at any time, without affecting the lawfulness of processing based on consent before its withdrawal.<br />

                </div>

                <h4> Changes to Privacy Policy:</h4>
                <div className='mb-2'>
                  We may update this policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

                </div>
                <div className='mb-2'>
                  Users need clear information about how your app handles their data. In your privacy policy,
                  describe how your app accesses,<br/> collects, uses, and shares data and how it limits
                  the use of data to the purposes disclosed.
                  <br />
                  <br />
                  <ul>
                    <li>Make sure your privacy policy is available via a valid active URL. It can't be a PDF or a doc link</li>
                    <li>Ensure that your policy is non-editable</li>
                    <li>Include links to your privacy policy on your app's store listing page in your app</li>
                    <li style={{textDecoration : 'underline', color : '#009CFF'}}>Add or update your privacy policy</li>
                  </ul>
                </div>

                <h4>Contact Us: </h4>
                <div className='mb-2'>
                  For any questions or concerns about this Privacy Policy, please contact <a href="mailto:agrimontn@gmail.com">agrimontn@gmail.com</a>.

                </div>


              </div>



            </Grid>
          </Grid>
        </Grid>


      </div>
      {/* </div> */}

    </div >
  );
}

// @ts-nocheck
import {
  Grid,
  TextField,
  Typography,
  Button,
  Badge
} from "@mui/material";
import { saveAs } from "file-saver";
import { Backdrop, Fade, Modal, Box } from '@mui/material';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import React, { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import Sidebar from "./Sidebar";
import Header from "./Header";
import { PrimaryColor } from "./variables";
import { Container, Row, Col } from 'react-bootstrap'
import Map from "./Map";

const imageExts = [".jpg", ".jpeg", ".png"]
const removeBadgeStyle = {
  cursor: 'pointer',
  position: 'absolute'
}


export const UpdateData = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
  const filteredState = state || {}

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(filteredState);

  const [imagePreview, setImagePreview] = useState<any>(null);
  const [showImagePreview, setShowImagePreview] = useState<Boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<any>>([]);
  const [removedFiles, setRemovedFiles] = useState<Array<any>>([]);
  // const [existingFiles, setExistingFiles] = useState<Array<any>>(JSON.parse(filteredState.SiteMapImageURL));
  const [existingFiles, setExistingFiles] = useState<Array<any>>([]);

  const { handleSubmit, control } = useForm();


  const updateData = async (data: any) => {
    let combinedData = {
      ...filteredState,
      ...data
    }
    console.log(combinedData)
  };

  function ImageViewer(props: any) {

    const downloadFile = () => {
      saveAs(
        props.src,
        props.fileName
      );
    }
    return (
      <Modal
        open={props.show}
        onClose={() => props.handleClose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.show}>
          <Box sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            maxWidth: '99%',
            maxHeight: '99vh'
          }}>
            <TransformWrapper
              initialScale={1}
            >
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <React.Fragment>
                  <div style={{ marginBottom: '10px', justifyContent: 'space-around' }}>
                    <Button style={{ marginRight: '20px' }} variant="contained" color="primary" onClick={() => zoomIn()}>Zoom In +</Button>
                    <Button style={{ marginRight: '20px' }} variant="contained" color="primary" onClick={() => zoomOut()}>Zoom Out -</Button>
                    <Button style={{ marginRight: '20px' }} variant="contained" color="primary" onClick={() => resetTransform()}>Reset</Button>
                    <Button style={{ marginRight: '20px' }} variant="contained" color="success" onClick={() => downloadFile()}>Download</Button>
                    <Button variant="contained" color="error" onClick={() => props.handleClose()}>Close</Button>
                  </div>
                  <TransformComponent>
                    <img style={{ height: '60vh' }} src={props.src} alt="preview" />
                    {/* <div>Example text</div> */}
                  </TransformComponent>
                </React.Fragment>
              )}
            </TransformWrapper>
          </Box>
        </Fade>
      </Modal >
    );
  }

  const handleFileRemoval = (data) => {
    console.log(data)
    if (data?.name) {
      let temp = removedFiles
      temp.push(data)
      setRemovedFiles(temp)

      temp = uploadedFiles.filter(d => d?.name !== data?.name)
      setUploadedFiles(temp)
      if (temp.length === 0) {
        document.getElementById("SiteMapImageURL").value = ''
      }
    }
    else {
      let temp = removedFiles
      temp.push(data)
      setRemovedFiles(temp)

      temp = existingFiles.filter(d => d.id !== data.id)
      setExistingFiles(temp)
      if (temp.length === 0) {
        document.getElementById("SiteMapImageURL").value = ''
      }
    }

  }

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  return (

    <div className="position-relative bg-white d-flex p-0">

      <Sidebar />

      {/* Content Start */}
      <div className="content">
        <Header />
        <div style={{ display: 'flex' }}>
          <Grid container spacing={1} style={{ padding: '10px 30px 10px 30px' }}>
            <Grid container spacing={3} style={{ margin: '10px auto', borderRadius: '10px', border: `2px solid ${PrimaryColor}` }}>
              <form style={{ width: '100%' }} onSubmit={handleSubmit(updateData)}>
                <Grid container direction="row">
                  <Grid item xs={12}>
                    <Typography style={{ backgroundColor: PrimaryColor, color: 'white', display: 'flex' }} variant="h6" gutterBottom>
                      <AccountCircleIcon style={{ margin: 'auto 5px' }} />
                      {"Farmer's Details"}
                      <Button
                        color="secondary"
                        size="small"
                        variant="contained"
                        style={{ marginLeft: 'auto' }}
                        onClick={(e) => navigate("/dashboard")}>
                        Back
                      </Button>
                    </Typography>
                  </Grid>
                  {/* <Map/> */}

                  <fieldset disabled style={{ margin: 'auto', paddingBottom: 20, paddingRight: 20 }}>
                    <Grid container spacing={3} >

                    

                      <Grid item xs={12} sm={6}>
                        <img
                          title="Click to Enlarge"
                          src={data.Photo1}
                          onClick={() => {
                            setShowImagePreview(true)
                            setImagePreview(data.Photo1)
                          }}
                          style={{
                            width: '100%',
                            height: '250px',
                            cursor: 'pointer',
                            display: 'flex',
                            margin: 'auto',
                            padding: 10
                          }}
                          alt="preview"
                          className="custom-image"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <img
                          title="Click to Enlarge"
                          src={data.Photo2}
                          onClick={() => {
                            setShowImagePreview(true)
                            setImagePreview(data.Photo2)
                          }}
                          style={{
                            width: '100%',
                            height: '250px',
                            cursor: 'pointer',
                            display: 'flex',
                            margin: 'auto',
                            padding: 10
                          }}
                          alt="preview"
                          className="custom-image"
                        />
                      </Grid>


                      <Grid item xs={12} sm={6}>

                        <Controller
                          name="FarmerName"
                          control={control}
                          defaultValue={data.FarmerName}
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                              label="Farmer Name"
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
                          defaultValue={data.Date}
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                              label="Date"
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
                          defaultValue={data.PhoneNumber}
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
                          name="District"
                          control={control}
                          defaultValue={data.District}
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                              label="District"
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
                          name="Village"
                          control={control}
                          defaultValue={data.Village}
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                              label="Village"
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
                          name="Gender"
                          control={control}
                          defaultValue={data.Gender}
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                              label="Gender"
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
                          name="Address"
                          control={control}
                          defaultValue={data.Address}
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                              label="Address"
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
                          name="Age"
                          control={control}
                          defaultValue={data.Age}
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                              label="Age"
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
                          name="SurveyFieldNumber"
                          control={control}
                          defaultValue={data.SurveyFieldNumber}
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                              label="SurveyFieldNumber"
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
                          name="FarmSize"
                          control={control}
                          defaultValue={data.FarmSize}
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                              label="FarmSize"
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
                          name="FarmType"
                          control={control}
                          defaultValue={data.FarmType}
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                              label="FarmType"
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
                          name="SoilType"
                          control={control}
                          defaultValue={data.SoilType}
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                              label="SoilType"
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
                          name="Block"
                          control={control}
                          defaultValue={data.Block}
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                              label="Block"
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
                          name="PinCode"
                          control={control}
                          defaultValue={data.PinCode}
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                              label="PinCode"
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
                  </fieldset>
                </Grid>

                <Grid style={{ padding: 10 }} item xs={12} sm={6}>
                  <Typography>Upload Images</Typography>
                  <input
                    type="file"
                    accept={imageExts}
                    id="SiteMapImageURL"
                    name="SiteMapImageURL"
                    multiple
                    onChange={async (e) => {
                      if (!!e.target.files?.length) {
                        let pendingFiles = []
                        let existingFiles = uploadedFiles.map(f => f.name)
                        var inp = document.getElementById('SiteMapImageURL');
                        for (var i = 0; i < inp.files.length; ++i) {
                          if (!existingFiles.includes(inp.files.item(i).name))
                            pendingFiles.push(inp.files.item(i))
                        }
                        if (pendingFiles.length === 0) {
                          window.alert("File(s) with same name already added")
                          e.stopPropagation();
                          return
                        }
                        setUploadedFiles([...uploadedFiles, ...pendingFiles])
                      }
                    }}
                  />
                </Grid>

                <Container style={{ padding: 10 }}>
                  <Row>
                    {
                      existingFiles.map((d, index) => {

                        if (imageExts.some(el => d?.data?.includes(el))) {
                          return <Col key={index} sm>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <Grid item xs={12}>
                                <img
                                  title="Click to Enlarge"
                                  src={d.data}
                                  onClick={() => {
                                    setShowImagePreview(true)
                                    setImagePreview(d.data)
                                  }}
                                  style={{ width: 'auto', height: '150px', cursor: 'pointer' }}
                                  alt="preview"
                                />
                                <Badge style={removeBadgeStyle} title="Remove" onClick={() => handleFileRemoval(d)} color="error" badgeContent="X">
                                </Badge>
                              </Grid>

                              <strong>File Name : {d.name}</strong>
                            </div>
                          </Col>
                        }
                      })
                    }

                  </Row>
                </Container>

                <Container style={{ padding: 10 }}>
                  <Row>

                    {
                      uploadedFiles?.map((d, index) => {

                        if (d?.type?.includes("image")) {
                          return <Col key={index} sm>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <Grid item xs={12}>
                                <img
                                  title="Click to Enlarge"
                                  src={URL.createObjectURL(d)}
                                  onClick={() => {
                                    setShowImagePreview(true)
                                    setImagePreview(URL.createObjectURL(d))
                                  }}
                                  style={{ width: 'auto', height: '150px', cursor: 'pointer' }}
                                  alt="preview"
                                />
                                <Badge style={removeBadgeStyle} title="Remove" onClick={() => handleFileRemoval(d)} color="error" badgeContent="X">
                                </Badge>
                              </Grid>
                              <strong>File Name : {d.name}</strong>
                            </div>
                          </Col>
                        }
                      })
                    }

                  </Row>
                </Container>

                {/* <Grid container style={{ margin: '10px 0 10px' }}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
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
                      {"Update Data"}
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ textAlign: "center" }}
                  >
                    <Button
                      color="secondary"
                      size="small"
                      variant="contained"
                      onClick={(e) => navigate("/dashboard", {
                        state: state
                      })}>
                      Back
                    </Button>
                  </Grid>

                </Grid> */}
              </form>

            </Grid>
          </Grid>

        </div>
      </div>
      {/* Content End */}
      <ImageViewer
        src={imagePreview}
        show={showImagePreview}
        handleClose={() => setShowImagePreview(false)}
        fileName="Farmer.jpg"
      />
    </div >
  );
};

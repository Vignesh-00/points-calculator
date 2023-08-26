//@ts-nocheck
import React, { useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { PrimaryColor } from './variables';

export default function Dashboard() {

  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedDocuments, setSelectedDocuments] = useState([])
  const [tableData, setTableData] = useState([
    {
      "FarmerName": "Babu",
      "Date": "Aug 18, 2021",
      "PhoneNumber": "9876348956",
      "District": "Trichy",
      "Village": "Village1",
      "FarmerID": 24,
      "Gender": "Male",
      "Address": "Address1",
      "Age": "26",
      "SurveyFieldNumber": "45/7",
      "FarmSize": "200",
      "FarmType": "Agri",
      "SoilType": "Good",
      "Block": "3",
      "PinCode": "600001",
      "Photo1": "https://cdn.pixabay.com/photo/2014/11/16/15/15/field-533541_1280.jpg",
      "Photo2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZEHumYRkIvGk2ddwZWIFxuBXpZxTaipZTr3vzxwZ1lIubctr1D0aq91TKtaKuDOXTJoY&usqp=CAU"
    },
    {
      "FarmerName": "Raja",
      "Date": "Jun 18, 2022",
      "PhoneNumber": "9876348056",
      "District": "Kovai",
      "Village": "Village2",
      "FarmerID": 25,
      "Gender": "Male",
      "Address": "Address1",
      "Age": "26",
      "SurveyFieldNumber": "45/7",
      "FarmSize": "200",
      "FarmType": "Agri",
      "SoilType": "Good",
      "Block": "3",
      "PinCode": "600001",
      "Photo1": "https://cdn.pixabay.com/photo/2014/11/16/15/15/field-533541_1280.jpg",
      "Photo2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZEHumYRkIvGk2ddwZWIFxuBXpZxTaipZTr3vzxwZ1lIubctr1D0aq91TKtaKuDOXTJoY&usqp=CAU"
    },
    {
      "FarmerName": "Mano",
      "Date": "Oct 14, 2023",
      "PhoneNumber": "9356487367",
      "District": "Karur",
      "Village": "Village3",
      "FarmerID": 26,
      "Gender": "Male",
      "Address": "Address1",
      "Age": "26",
      "SurveyFieldNumber": "45/7",
      "FarmSize": "200",
      "FarmType": "Agri",
      "SoilType": "Good",
      "Block": "3",
      "PinCode": "600001",
      "Photo1": "https://cdn.pixabay.com/photo/2014/11/16/15/15/field-533541_1280.jpg",
      "Photo2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZEHumYRkIvGk2ddwZWIFxuBXpZxTaipZTr3vzxwZ1lIubctr1D0aq91TKtaKuDOXTJoY&usqp=CAU"
    },
    {
      "FarmerName": "Mala",
      "Date": "Jan 01, 2004",
      "PhoneNumber": "9035826741",
      "District": "Chennai",
      "Village": "Village4",
      "FarmerID": 28,
      "Gender": "Female",
      "Address": "Address1",
      "Age": "26",
      "SurveyFieldNumber": "45/7",
      "FarmSize": "200",
      "FarmType": "Agri",
      "SoilType": "Good",
      "Block": "3",
      "PinCode": "600001",
      "Photo1": "https://cdn.pixabay.com/photo/2014/11/16/15/15/field-533541_1280.jpg",
      "Photo2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZEHumYRkIvGk2ddwZWIFxuBXpZxTaipZTr3vzxwZ1lIubctr1D0aq91TKtaKuDOXTJoY&usqp=CAU"
    }
  ])

  return (

    <div className="position-relative bg-white d-flex p-0">

      <Sidebar />


      {/* Content Start */}
      <div className="content">
        <Header />

        {/* Recent Sales Start */}
        <div className="container-fluid pt-4 px-4">
          <div className="bg-light text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Data</h6>
            </div>
            <div className="table-responsive">
              <DataGrid
                getRowId={(row) => row.FarmerID}
                rows={tableData}
                sx={{
                  width: 1,
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: PrimaryColor,
                    color: "#ffff",
                    minHeight: "30px !important"
                  },
                  '.MuiDataGrid-row.Mui-selected': {
                    backgroundColor: 'lightgray !important'
                  },
                  // disable cell selection style
                  '.MuiDataGrid-cell:focus': {
                    outline: 'none !important'
                  },
                  // pointer cursor on ALL rows
                  '& .MuiDataGrid-row:hover': {
                    cursor: 'pointer',
                    backgroundColor: 'lightgray'
                  },
                  '& .MuiDataGrid-cell:focus-within': {
                    outline: 'none !important'
                  },
                  '& .MuiDataGrid-columnHeader:focus': {
                    outline: 'none !important'
                  }
                }}
                columns={[
                  {
                    field: 'FarmerName',
                    headerName: 'Farmer Name',
                    width: 150,
                    flex: 1
                  },
                  {
                    field: 'Date',
                    headerName: 'Date',
                    width: 150
                  },
                  {
                    field: 'PhoneNumber',
                    headerName: 'Phone Number',
                    width: 150
                  },
                  {
                    field: 'District',
                    headerName: 'District',
                    width: 150
                  },
                  {
                    field: 'Village',
                    headerName: 'Village',
                    width: 150
                  },
                  {
                    field: 'Action',
                    headerName: 'Actions',
                    sortable: false,
                    filterable: false,
                    width: 150,
                    disableExport: true,
                    renderCell: (row) => {
                      return (
                        <div style={{ display: 'flex' }}>
                          <Button onClick={(e) => {
                            e.stopPropagation()
                            navigate("/viewdata", { state: row.row })
                          }} color='primary' variant='contained'>Details</Button>
                        </div>
                      )
                    }
                  },
                ]}
                pageSize={pageSize}
                onPageSizeChange={(size) => setPageSize(size)}
                page={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
                rowsPerPageOptions={[5, 10, 15]}
                // checkboxSelection
                // rowSelectionModel={selectedDocuments.map(task => task.FarmerID)}
                // onRowSelectionModelChange={(newSelection) => {
                //   if (newSelection.length) {
                //     let temp = tableData.filter(task => newSelection.includes(task.FarmerID))
                //     setSelectedDocuments(temp)
                //   }
                //   else {
                //     setSelectedDocuments([])
                //   }
                // }}
                disableRowSelectionOnClick
                initialState={{
                  pagination: {
                    paginationModel: { page: currentPage, pageSize: pageSize },
                  },
                }}
              />
            </div>
          </div>
        </div>

      </div>
      {/* Content End */}

    </div>



  )
}

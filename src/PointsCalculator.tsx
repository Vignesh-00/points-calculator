//@ts-nocheck
import {
    Grid,
    Table,
    TableCell,
    TableContainer,
    Typography,
    TableRow,
    TableHead,
    TableBody,
    Select,
    MenuItem,
    TextField,
    Button,
} from "@mui/material";
import { useState } from "react";
import { Countries, headerStyle, initialData, tableInputStyle, tabledropdownStyle } from "./variables";


export const PointsCalculator = () => {

    const [tableData, setTableData] = useState([
        { ...initialData, id: 0 },
    ]);

    const headerFields = [
        "Parameter",
        "Weights",
        "Preferred Country",
        "US Points",
        "India Points",
        "Actions"
    ]

    const [tableKey1, setTableKey1] = useState(0);

    const handleTableInput1 = async (e: any, index: any) => {
        let { name, value } = e.target;
        let data = tableData;
        data[index] = {
            ...data[index],
            [name]: value,
        }
        if (data[index]?.Weights && data[index]?.PreferredCountry) {
            if (data[index]?.PreferredCountry === "US") {
                data[index] = {
                    ...data[index],
                    IndiaPoints: 0,
                    USPoints: data[index]?.Weights,
                }
            }
            else if (data[index]?.PreferredCountry === "India") {
                data[index] = {
                    ...data[index],
                    USPoints: 0,
                    IndiaPoints: data[index]?.Weights,
                }
            }
        }
        setTableData([...data]);
    }

    const checkTableInputRow1 = (id: any) => {
        let data = tableData.filter((data) => data.id === id)[0];
        return (
            !!data?.Parameter &&
            !!data?.PreferredCountry &&
            !!data?.Weights
        );
    };

    return (
        <div style={{ marginTop: 80, display: 'flex' }}>
            <Grid container spacing={1} style={{ padding: '10px 30px 10px 30px' }}>
                <Grid
                    container
                    spacing={3}
                    style={{
                        margin: "10px auto",
                        borderRadius: "10px",
                        padding: 10,
                        width: '98%'
                    }}
                >
                    <Grid container>
                        <Grid item xs={12} style={{ display: 'flex' }}>
                            <Typography
                                variant="h4"
                                fontWeight={"bold"}
                            >
                                Points Calculator
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                style={{
                                    marginLeft: 10
                                }}
                                onClick={() => setTableData([
                                    { ...initialData, id: 0 }
                                ])}
                            >
                                Reset
                            </Button>
                        </Grid>
                        <Grid container spacing={3} style={{ margin: "auto" }}>
                            <Grid item container spacing={1} direction="row">
                                <TableContainer style={{ maxWidth: '98%', overflowX: 'auto', border: '2px solid gray', borderRadius: 4 }}>
                                    <Table
                                        aria-label="customized table"
                                        sx={{
                                            borderRadius: 8,
                                            width: "100%",
                                            fontWeight: "normal",
                                            "& .MuiTableCell-root": {
                                                border: "1px solid #ddd",
                                                textAlign: "center",
                                                padding: "0px",
                                            },
                                            "& .MuiTableCell-head": {
                                                padding: "5px 0",
                                            },
                                            "& .MuiTableCell-body": {
                                                textAlign: "center",
                                                color: "gray",
                                                fontWeight: "normal",
                                                padding: "5px 0",
                                            },
                                        }}
                                        key={tableKey1}
                                    >
                                        <TableHead>
                                            <TableRow color="primary">
                                                {headerFields.map(field =>
                                                    <TableCell style={headerStyle}>
                                                        {field}
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                tableData.map((data, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell style={{ width: 250 }}>
                                                            <TextField
                                                                variant="outlined"
                                                                value={tableData[index].Parameter}
                                                                name="Parameter"
                                                                sx={tableInputStyle}
                                                                onChange={(e) => handleTableInput1(e, index)}
                                                            />
                                                        </TableCell>
                                                        <TableCell style={{ width: 250 }}>
                                                            <TextField
                                                                type={'number'}
                                                                variant="outlined"
                                                                value={tableData[index].Weights}
                                                                name="Weights"
                                                                sx={tableInputStyle}
                                                                onChange={(e) => handleTableInput1(e, index)}
                                                            />
                                                        </TableCell>
                                                        <TableCell style={{ width: 250 }}>
                                                            <Select
                                                                variant="outlined"
                                                                sx={tabledropdownStyle}
                                                                value={tableData[index].PreferredCountry}
                                                                name="PreferredCountry"
                                                                onChange={(e) => handleTableInput1(e, index)}
                                                            >
                                                                {Countries.map((e) => (
                                                                    <MenuItem key={e} value={e}>{e}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </TableCell>
                                                        <TableCell style={{ width: 150 }}>
                                                            <TextField
                                                                variant="outlined"
                                                                value={tableData[index].USPoints}
                                                                name="USPoints"
                                                                disabled
                                                                sx={tableInputStyle}
                                                                onChange={(e) => handleTableInput1(e, index)}
                                                            />
                                                        </TableCell>
                                                        <TableCell style={{ width: 150 }}>
                                                            <TextField
                                                                variant="outlined"
                                                                value={tableData[index].IndiaPoints}
                                                                name="IndiaPoints"
                                                                disabled
                                                                sx={tableInputStyle}
                                                                onChange={(e) => handleTableInput1(e, index)}
                                                            />
                                                        </TableCell>
                                                        <TableCell style={{ width: 250 }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                                {tableData.length !== 0 && (
                                                                    <Button
                                                                        variant="contained"
                                                                        color="error"
                                                                        size="small"
                                                                        onClick={() => {
                                                                            setTableKey1(Math.random());
                                                                            if (tableData.length === 1) {
                                                                                let temp = {
                                                                                    ...initialData,
                                                                                    id: 0,
                                                                                };
                                                                                setTableData([temp]);
                                                                            } else {
                                                                                let temp = tableData;
                                                                                temp.splice(index, 1);
                                                                                setTableData([...temp]);
                                                                            }
                                                                        }}
                                                                    >Remove</Button>
                                                                )}

                                                                {index === tableData.length - 1 &&
                                                                    checkTableInputRow1(data.id) && (
                                                                        <Button
                                                                            variant="contained"
                                                                            color="success"
                                                                            size="small"
                                                                            onClick={() => {
                                                                                let temp = tableData;
                                                                                let newId =
                                                                                    tableData[
                                                                                        tableData.length - 1
                                                                                    ].id + 1;
                                                                                temp.push({
                                                                                    ...initialData,
                                                                                    id: newId,
                                                                                });
                                                                                setTableData([...temp]);
                                                                            }}
                                                                        >Add New </Button>
                                                                    )}
                                                            </div>

                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                            <TableRow>
                                                <TableCell colSpan={3} style={{ fontSize: 20, textAlign: 'right', paddingRight: 10, fontWeight: 'bold' }}>
                                                    Total
                                                </TableCell>
                                                <TableCell style={{ width: 250, fontWeight: 'bold', fontSize: 20 }} >
                                                    {tableData.map((x) => parseFloat(x.USPoints)).reduce((partialSum: number, a: number) => partialSum + a, 0)}
                                                </TableCell>
                                                <TableCell style={{ width: 250, fontWeight: 'bold', fontSize: 20 }}>
                                                    {tableData.map((x) => parseFloat(x.IndiaPoints)).reduce((partialSum: number, a: number) => partialSum + a, 0)}
                                                </TableCell>
                                                <TableCell>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>

            </Grid>
        </div >
    );
};

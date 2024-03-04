
import React, { useState } from "react";
import {
    Card,
    CardContent,
    Box,
    Typography,
    Select,
    MenuItem,
    Grid,
    FormControl,
    InputLabel,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";
import Lists from "./UpiData";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { AddData, fetchUPIData } from "../../../app/UpiSlice";

const UpiList = () => {
    const dispatch = useDispatch();

    const [filterOption, setFilterOption] = useState("Active");
    const [showAddUpi, setShowAddUpi] = useState(false);
    const [upiData, setUpiData] = useState({
        'name': '',
        'upiId': '',
        'upiHash': '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData()
        form.append('name', upiData.name)
        form.append('upiId', upiData.upiId)
        form.append('upiHash', upiData.upiHash)

        dispatch(AddData(form))
            .then(() => {
                console.log("UPI added successfully");
                dispatch(fetchUPIData());
            })
            .catch((error) => {
                console.error("Error adding UPI:", error);
            });

        handleCloseAddUpi();
    };

    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };

    const handleAddUpiData = () => {
        setShowAddUpi(true);
    };

    const handleCloseAddUpi = () => {
        setShowAddUpi(false);
        setUpiData({
            'name': '',
            'upiId': '',
            'upiHash': '',
        });
    };

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4} md={5} lg={6} xl={6}>
                            <Typography variant="h3">UPI Lists</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={8}
                            md={7}
                            lg={6}
                            xl={6}
                            container
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            <FormControl variant="outlined" sx={{ minWidth: "150px" }}>
                                <InputLabel htmlFor="status" sx={{ marginLeft: 1, marginTop: 1 }}
                                >Filter By Status</InputLabel>
                                <Select
                                    label="Filter By Status"
                                    variant="outlined"
                                    size="small"
                                    value={filterOption}
                                    onChange={handleFilterChange}
                                    sx={{ marginLeft: 1, marginTop: 1 }}

                                >
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddUpiData}
                                sx={{ marginLeft: 1, marginTop: 1 }}
                            >
                                <AddIcon />
                                <Typography sx={{ ml: 1 }}>Add UPI</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Lists filterOption={filterOption} />
                </CardContent>
            </Card>

            <Dialog open={showAddUpi} onClose={handleCloseAddUpi}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Add UPI</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    value={upiData.name}
                                    onChange={(e) => setUpiData({ ...upiData, name: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="UPI ID"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    value={upiData.upiId}
                                    onChange={(e) => setUpiData({ ...upiData, upiId: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="UPI Hash"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    value={upiData.upiHash}
                                    onChange={(e) => setUpiData({ ...upiData, upiHash: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button type="button" onClick={handleCloseAddUpi} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Add UPI
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default UpiList;

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
import Lists from "./Lists";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { AddData, fetchUpComingData } from "../../../app/UpComingSlice";

const NextWithdraw = () => {
    const dispatch = useDispatch();


    const [filterOption, setFilterOption] = useState("Active");
    const [showAddUpComingData, setShowAddUpComingData] = useState(false);
    const [UpComingData, setUpComingData] = useState({
        'title': '',
        'dateTime': '',
        'claimPrecentage': '',
        'receiptNo': '',
        'status': 0 ,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData()
        form.append('title', UpComingData.title)
        form.append('dateTime', UpComingData.dateTime)
        form.append('claimPrecentage', UpComingData.claimPrecentage)
        form.append('receiptNo', UpComingData.receiptNo)
        form.append('status', UpComingData.status)

        dispatch(AddData(form))
            .then(() => {
                console.log("Submitting form data:", UpComingData);
                dispatch(fetchUpComingData());
            })
            .catch((error) => {
                console.error("Error adding UpComingData:", error);
            });

        handleCloseAddUpComingData();
    };

    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };

    const handleAddUpComingData = () => {
        setShowAddUpComingData(true);
    };

    const handleCloseAddUpComingData = () => {
        setShowAddUpComingData(false);
        setUpComingData({
            'title': '',
            'dateTime': '',
            'claimPrecentage': '',
            'receiptNo': '',
            'status': '',
        });
    };

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4} md={5} lg={6} xl={6}>
                            <Typography variant="h3">UpComing Withdraw</Typography>
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
                                onClick={handleAddUpComingData}
                                sx={{ marginLeft: 1, marginTop: 1 }}
                            >
                                <AddIcon />
                                <Typography sx={{ ml: 1 }}> New UpComing</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Lists filterOption={filterOption} />
                </CardContent>
            </Card>

            <Dialog open={showAddUpComingData} onClose={handleCloseAddUpComingData}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>New UpComing</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    value={UpComingData.title}
                                    onChange={(e) => setUpComingData({ ...UpComingData, title: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Receipt No"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    value={UpComingData.receiptNo}
                                    onChange={(e) => setUpComingData({ ...UpComingData, receiptNo: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Claim Percentage"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    value={UpComingData.claimPrecentage}
                                    onChange={(e) => setUpComingData({ ...UpComingData, claimPrecentage: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="paymentDate"></InputLabel>
                                    <TextField
                                        label="Date Time"
                                        variant="outlined"
                                        type="dateTime-local"
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={UpComingData.dateTime}
                                        onChange={(e) => setUpComingData({ ...UpComingData, dateTime: e.target.value })}
                                        sx={{
                                            mb: 2,
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button type="button" onClick={handleCloseAddUpComingData} color="primary" variant="outlined">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" variant="outlined">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default NextWithdraw;

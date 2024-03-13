import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from 'react-redux';
import { AddData, fetchAddOnData } from "../../../app/AddOnSlice";
import { selectPlansData, fetchPlansData } from "../../../app/PlansSlice"

const AddOn = () => {
    const dispatch = useDispatch();
    const plansData = useSelector(selectPlansData);

    useEffect(() => {
        dispatch(fetchPlansData());
    }, [dispatch]);

    const [filterOption, setFilterOption] = useState("Active");
    const [showAddAddOnData, setShowAddAddOnData] = useState(false);
    const [AddOnData, setAddOnData] = useState({
        'title': '',
        'planId': '',
        'price': '',
        'percentage': '',
        'durationInDays': '',
        'status': 0,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData()
        form.append('title', AddOnData.title)
        form.append('planId', AddOnData.planId)
        form.append('price', AddOnData.price)
        form.append('percentage', AddOnData.percentage)
        form.append('durationInDays', AddOnData.durationInDays)
        form.append('status', AddOnData.status)

        dispatch(AddData(form))
            .then(() => {
                console.log("Submitting form data:", AddOnData);
                dispatch(fetchAddOnData());
            })
            .catch((error) => {
                console.error("Error adding AddOnData:", error);
            });

        handleCloseAddAddOnData();
    };

    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };

    const handleAddAddOnData = () => {
        setShowAddAddOnData(true);
    };

    const handleCloseAddAddOnData = () => {
        setShowAddAddOnData(false);
        setAddOnData({
            'title': '',
            'planId': '',
            'price': '',
            'percentage': '',
            'durationInDays': '',
            'status': '',
        });
    };

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4} md={5} lg={6} xl={6}>
                            <Typography variant="h3">AddOn Lists</Typography>
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
                                onClick={handleAddAddOnData}
                                sx={{ marginLeft: 1, marginTop: 1 }}
                            >
                                <AddIcon />
                                <Typography sx={{ ml: 1 }}> New AddOn</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Lists filterOption={filterOption} />
                </CardContent>
            </Card>

            <Dialog open={showAddAddOnData} onClose={handleCloseAddAddOnData}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>New AddOn</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    value={AddOnData.title}
                                    onChange={(e) => setAddOnData({ ...AddOnData, title: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="paymentDate">Plan Title</InputLabel>
                                    <Select
                                        label="Plan Title"
                                        labelId="planIdLabel"
                                        value={AddOnData.planId}
                                        required
                                        onChange={(e) => setAddOnData({ ...AddOnData, planId: e.target.value })}
                                    >
                                        {plansData.map((plan) => (
                                            <MenuItem key={plan.planId} value={plan.planId}>{plan.planTitle}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Price"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    value={AddOnData.price}
                                    required
                                    onChange={(e) => setAddOnData({ ...AddOnData, price: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Percentage"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    value={AddOnData.percentage}
                                    onChange={(e) => setAddOnData({ ...AddOnData, percentage: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Duration In Days"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    value={AddOnData.durationInDays}
                                    onChange={(e) => setAddOnData({ ...AddOnData, durationInDays: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button type="button" onClick={handleCloseAddAddOnData} color="primary" variant="outlined">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" variant="outlined">
                            New AddOn
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default AddOn;

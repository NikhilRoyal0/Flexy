import React, { useState } from "react";
import {
    Card,
    CardContent,
    Divider,
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    InputLabel,
    FormControl
} from "@mui/material";
import { baseTheme } from "../../assets/global/Theme-variable";

const NextWithdraw = () => {
    const [formData, setFormData] = useState({
        title: "",
        paymentDate: "",
        receiptNo: "",
        claimPercentage: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form Data:", formData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div>
            <Card
                variant="outlined"
                sx={{
                    p: 0,
                    borderRadius: baseTheme.shape.borderRadius,
                    padding: baseTheme.mixins.toolbar.padding,
                }}
            >
                <Box
                    sx={{
                        padding: "15px 30px",
                    }}
                    display="flex"
                    alignItems="center"
                >
                    <Box flexGrow={1}>
                        <Typography
                            sx={{
                                fontSize: "18px",
                                fontWeight: "500",
                            }}
                        >
                            Next Withdrawal
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent
                    sx={{
                        padding: "30px",
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="title"
                                    label="Title"
                                    name="title"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="paymentDate"></InputLabel>
                                    <TextField
                                        label="Payment Date"
                                        type="datetime-local"
                                        id="paymentDate"
                                        name="paymentDate"
                                        variant="outlined"
                                        onChange={handleInputChange}
                                        required
                                        sx={{
                                            mb: 2,
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="receiptNo"
                                    label="Receipt No"
                                    name="receiptNo"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="claimPercentage"
                                    label="Claim Percentage"
                                    name="claimPercentage"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <div>
                            <br />
                            <Button color="secondary" variant="contained" type="submit">
                                Submit
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default NextWithdraw;

import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { selectUserData } from "../../app/UserSlice";
import { useSelector } from "react-redux";


const PlansPage = () => {

  const userData = useSelector(selectUserData)

  return (
    <div style={{ position: "relative" }}>
      <Button
        sx={{
          position: "absolute",
          top: "5px",
          right: "30px",
          mt: "5px", 
          zIndex: 1,
        }}
        color="primary"
      >
        <AddIcon />
        <Typography sx={{ ml: 1 }}>Add Plan</Typography>
      </Button>

      <Card>
        <CardContent>
          <Grid container>
            {userData.map((Person, index) => (
              <Grid
                key={index}
                item
                xs={12}
                lg={4}
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  mt: "8px", 
                }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    p: 0,
                    width: "100%",
                  }}
                >
                  <img src={Person.img} alt="img" width="100%" />
                  <CardContent
                    sx={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "h4.fontSize",
                        fontWeight: "500",
                      }}
                    >
                      {Person.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        mt: 1,
                      }}
                    >
                      {Person.subtitle}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlansPage;

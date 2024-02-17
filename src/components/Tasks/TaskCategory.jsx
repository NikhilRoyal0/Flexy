import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";



const TaskCategory = () => {

  const CategoryData = [
    {
      id: 1,
      name: 'Daily Tasks',
      image: 'https://www.shutterstock.com/image-vector/daily-tasks-icon-line-style-260nw-1612895719.jpg'
    },
    {
      id: 2,
      name: 'Weekly Assignments',
      image: 'https://2.bp.blogspot.com/-F_UEDoLCdLg/UdJ0pq_YHhI/AAAAAAAAFuM/drgc4-yBqs4/s320/thumbtack_note_assignment.png'
    },
    {
      id: 3,
      name: 'Monthly Goals',
      image: 'https://3.bp.blogspot.com/-eOjYKxhj3nU/Wfd0A6DovYI/AAAAAAAAL4c/ql-WWQlqRj8rAFUher1I8XWRIke1OE7bACPcBGAYYCw/s1600/Monthly%2BGoals.png'
    },
    {
      id: 4,
      name: 'Project Deadlines',
      image: 'https://media.licdn.com/dms/image/C4E12AQFrKzzo7SJx8w/article-cover_image-shrink_600_2000/0/1525552289673?e=2147483647&v=beta&t=qEjOe2E9xvF-8TnhCZukSACwcnr-4A-yoUExRU5Ju1o'
    },
    {
      id: 5,
      name: 'Team Meetings',
      image: 'https://pitch-publish-user-assets.imgix.net/templates/posters/team-meeting-v2.jpg'
    }
  ];
  
  return (
    <Grid container>
      {CategoryData.map((Person, index) => (
        <Grid
          key={index}
          item
          xs={12}
          s={6}
          md={4}
          lg={3}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card
            variant="outlined"
            sx={{
              p: 0,
              width: "100%",
            }}
          >
            <img src={Person.image} alt="img" width="100%" />
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
                {Person.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskCategory;

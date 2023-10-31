import { Card, CardContent, Typography } from "@mui/material";
const InfoCard = (props) => {
    return (
      <Card style={{ width: '300px', margin: '20px' }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" component="p">
           {props.text}
          </Typography>
        </CardContent>
      </Card>
    );
  }
  
export default InfoCard
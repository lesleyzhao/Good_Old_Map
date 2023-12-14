import { Card, CardContent, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

const InfoCard = (props) => {
  const [isHidden, setHidden] = useState(false);
  
  const handleCancelClick = () => {
    setHidden(true);
  };

  return (
    !isHidden && (
      <Card style={{ width: '300px', height: '200px', margin: '20px' }}>
        <IconButton
          style={{ position: 'relative', top: '2px', left: '2px' }}
          onClick={handleCancelClick}
          aria-label="cancel"
        >
          <CloseIcon />
        </IconButton>
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" component="p">
            {props.text}
          </Typography>
        </CardContent>
      </Card>
    )
  );
}

export default InfoCard;

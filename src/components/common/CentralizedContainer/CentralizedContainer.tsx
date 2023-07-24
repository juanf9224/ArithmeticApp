import { Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LoanProLinear from "../Linear/LoanProLinear/LoanProLinear";
import { FC, PropsWithChildren } from "react";


const useStyles = makeStyles(() => ({
  '@global': {
    '@keyframes login': {
        '0%': {
            backgroundPosition: '28% 0%'
        },
        '50%':{
            backgroundPosition: '73% 100%'
        },
        '100%': {
            backgroundPosition: '28% 0%'
        }
    },
  },
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerBox: {
    border: '1px solid gray',
    borderRadius: 10,
    background: 'white',
    width: '40%',
    maxWidth: '500px',
  },
  containerBackground: {
    background: 'linear-gradient(330deg, #1fc4db, #000000)',
    backgroundSize: '400% 400%',
    animation: 'login 15s ease infinite',
    monzAnimation: 'login 15s ease infinite',
    webkitAnimation: 'login 15s ease infinite',
  }
}))
const CentralizedContainer: FC<PropsWithChildren> = ({ children }) => {
    const { container, containerBox, containerBackground } = useStyles();
    return (
    <Grid container className={`${container} ${containerBackground}`}>
      <Box className={containerBox}>
        <LoanProLinear radius />
        <Box style={{
          rowGap: 20,
          padding: 50
        }}>
            {children}
        </Box>            
        </Box>
        </Grid>
)};

export default CentralizedContainer;
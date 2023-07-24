import { lighten, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const LoanProButton = styled(Button)({
  background: 'rgba(31,196,219,1)',
  border: 0,
  color: 'white',
  height: 45,
  maxHeight: 50,
  boxShadow: 'box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
  '&: hover': {
    backgroundColor: lighten('rgba(31,196,219,1)', 0.3)
  },
  '&: disabled': {
    boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset',
    backgroundColor: 'gray',
    color: 'black',
    cursor: 'not-allowed',
    pointerEvents: 'all'
  },
});

export default LoanProButton;

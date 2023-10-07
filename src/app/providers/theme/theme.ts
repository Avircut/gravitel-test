import { createTheme, responsiveFontSizes } from '@mui/material';
import { deepPurple, orange } from '@mui/material/colors';

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: orange,
      secondary: deepPurple,
    },
    spacing: 4,
  }),
);

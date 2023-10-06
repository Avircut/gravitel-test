import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Suspense } from 'react';
import { Stack } from '@mui/material';

const App = () => {
  return (
    <Suspense fallback="">
      <Stack className="wrapper" direction="column">
        <Navbar />
        <Stack flexGrow={1} direction="column" className="content-page" component="main">
          <AppRouter />
        </Stack>
      </Stack>
    </Suspense>
  );
};
export default App;

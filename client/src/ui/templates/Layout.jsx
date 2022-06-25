import { Box, Container } from '@mui/material';
import React from 'react';
import { AppBar } from 'ui';

export const Layout = ({ routing, children }) => {
  return (
    <>
      <AppBar routing={routing} />
      <Container maxWidth={'xl'}>
        <Box mt={6}>{children}</Box>
      </Container>
    </>
  );
};

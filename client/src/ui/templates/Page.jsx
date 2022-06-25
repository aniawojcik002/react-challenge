import React from 'react';
import { Helmet } from 'react-helmet';
import { Box } from '@mui/material';

export const Page = ({ title = null, children }) => {
  return (
    <Box id={title.toLowerCase().split(' ').join('_')}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  );
};

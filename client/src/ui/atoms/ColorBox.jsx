import React from 'react';

import { Box } from '@mui/material';

export const ColorBox = ({ color }) => {
  return (
    <Box
      sx={{
        background: color,
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        marginRight: '10px',
      }}
    />
  );
};

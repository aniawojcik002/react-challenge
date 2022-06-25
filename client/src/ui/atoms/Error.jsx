import { Box, Typography } from '@mui/material';
import ErrorImage from 'assets/unknown_error.png';

export const Error = ({ error }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {error?.message?.includes('Network Error') ? (
        <Typography>Uruchom Server!</Typography>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <img
            alt=""
            src={ErrorImage}
            style={{
              height: '100%',
              weight: '100%',
              maxHeight: '248px',
              maxWidth: '248px',
            }}
          />
          <Typography sx={{ color: '#33333350' }}>
            Wystąpił nieoczekiwany błąd
          </Typography>
        </Box>
      )}
    </Box>
  );
};

import { Box, Typography } from '@mui/material';
import NoContentImage from 'assets/no_content.png';

export const NoContent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <img
        alt=""
        width={202}
        height={202}
        src={NoContentImage}
        loading="lazy"
      />
      <Typography
        textAlign={'center'}
        mb={2}
        sx={{
          color: '#33333350',
        }}
      >
        Brak danych do wyświetlenia
      </Typography>
    </Box>
  );
};

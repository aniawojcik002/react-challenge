import { Card as MuiCard, CardHeader } from '@mui/material';

export const Card = ({ title, subheader, children, ...props }) => {
  return (
    <MuiCard variant="outlined" {...props}>
      <CardHeader
        title={title}
        variant={'h3'}
        subheader={subheader}
        subheaderTypographyProps={{
          variant: 'subtitle1',
        }}
      />
      {children}
    </MuiCard>
  );
};

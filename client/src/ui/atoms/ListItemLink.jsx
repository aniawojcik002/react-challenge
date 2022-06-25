import { Link } from 'react-router-dom';
import React from 'react';
import { ListItemButton, ListItemText } from '@mui/material';

export const ListItemLink = (props) => {
  const { primary, to, onClick = (_, __) => {}, selectedPathname } = props;

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to],
  );

  return (
    <ListItemButton
      selected={selectedPathname === to}
      component={CustomLink}
      onClick={(event) => onClick(event, to)}
    >
      <ListItemText primary={primary} />
    </ListItemButton>
  );
};

import React from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Item } from '@components/item';

export function Shop() {
  const items = useSelector((state) => state.items);

  return (
    <Box
      component="ul"
      sx={{
        margin: 0,
        padding: 0,
      }}
    >
      {!_.isEmpty(items) ? (
        Object.keys(items).map((key) => (
          <Item item={items[key]} key={key} itemKey={key} />
        ))
      ) : (
        <Typography sx={{ margin: 3 }} variant="h4">
          No items available.
        </Typography>
      )}
    </Box>
  );
}

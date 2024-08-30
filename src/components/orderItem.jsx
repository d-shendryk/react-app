import React, { memo } from 'react';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { deleteFromOrder } from '@stores';
import { formatPrice } from '@utils/utils';

export const OrderItem = memo(function OrderItemComponent({
  itemKey,
  item,
  order,
}) {
  const dispatch = useDispatch();

  const { name, price, image } = item;
  const count = order[itemKey];
  const totalPrice = formatPrice(price * count);

  return (
    <Box
      key={itemKey}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      <Paper elevation={10} component={ListItem} sx={{ mb: 3 }}>
        <ListItemAvatar>
          <Avatar
            style={{
              height: 70,
              width: 70,
              marginRight: 20,
              marginTop: 5,
              marginBottom: 5,
            }}
            alt="Not available."
            src={image}
          />
        </ListItemAvatar>
        <ListItemText primary={`${count} kg ${name}`} secondary={totalPrice} />
        <Button onClick={() => dispatch(deleteFromOrder(itemKey))}>
          <CloseIcon sx={{ m: 0 }} />
        </Button>
      </Paper>
    </Box>
  );
});

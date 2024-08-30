import React from 'react';
import _ from 'lodash';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import { useDispatch, useSelector } from 'react-redux';
import { useThrottle } from '@uidotdev/usehooks';
import { Typography } from '@mui/material';
import { OrderItem } from '@components/orderItem';
import { useOrderTotal } from '@hooks/order';
import { setOrder } from '@stores';
import { formatPrice } from '@utils/utils';
import { submitOrder } from '@api/orders';

export function OrderPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const order = useSelector((state) => state.order);
  const _total = useOrderTotal();
  const total = useThrottle(_total, 500);

  const handleSubmit = () => {
    dispatch(submitOrder(order));
    dispatch(setOrder({}));
  };

  return (
    <Container>
      <List sx={{ width: '100%' }}>
        {!_.isEmpty(order) ? (
          Object.keys(order).map(
            (key) =>
              items[key] && (
                <OrderItem
                  item={items[key]}
                  order={order}
                  key={key}
                  itemKey={Number(key)}
                />
              ),
          )
        ) : (
          <Typography sx={{ mt: 3 }} variant="h4">
            No items in order.
          </Typography>
        )}
      </List>
      <h2>Total: {formatPrice(total)}</h2>
      <Button
        disabled={!total}
        onClick={handleSubmit}
        color="primary"
        variant="contained"
      >
        Submit order
      </Button>
    </Container>
  );
}

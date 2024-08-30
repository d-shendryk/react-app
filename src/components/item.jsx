import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { formatPrice, checkAvailable } from '@utils/utils';
import { addToOrder } from '@stores';

function ShopItem({
  itemKey,
  item: { name, price: _price, description, image, status },
}) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: { quantity: 1 },
  });

  const isAvailable = checkAvailable(status);
  const price = formatPrice(_price);

  const onSubmit = ({ quantity }) => {
    dispatch(addToOrder({ itemKey, quantity: parseInt(quantity) }));
  };

  return (
    <Paper elevation={3} style={{ margin: 32, padding: 12 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item>
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 200, md: 350 },
                maxWidth: { xs: 300, md: 500 },
              }}
              alt={`[${itemKey}] ${name} ${price} ${status}`}
              src={image}
            />
          </Grid>
          <Grid item container direction="column" xs spacing={2}>
            <Grid item>
              <h3>
                {name}
                <span> {price}</span>
              </h3>
            </Grid>
            <Grid item>
              <p>{description}</p>
            </Grid>
            <Grid
              item
              sx={{
                gap: 5,
                justifyContent: 'end',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <TextField
                inputProps={{ type: 'number', min: 1, max: 99 }}
                sx={{ width: 70 }}
                fullWidth
                placeholder="Quantity"
                variant="outlined"
                required
                {...register('quantity')}
              />
              <Button
                type="submit"
                disabled={!isAvailable}
                color="primary"
                variant="contained"
              >
                {isAvailable ? 'Add to order' : 'Out of stock'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export const Item = memo(ShopItem);

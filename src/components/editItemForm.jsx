import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { deleteItem, updateItem } from '~/api/items';
import { itemSchema } from '../stores/slices/items/itemsSlice';

export function EditItemForm({ item, itemId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.items);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: item,
    resolver: yupResolver(itemSchema),
  });
  const selectValue = watch('status');

  const _onSubmit = (item) => {
    const data = {};
    data[itemId] = item;
    dispatch(updateItem(data));
    navigate('/inventory');
  };

  const onSubmit = (item) => {
    const reader = new FileReader();

    reader.onloadend = (event) => {
      item.image = event.target.result;
      _onSubmit(item);
    };
    if (item.image[0] instanceof File) {
      item.image = item.image[0];
      reader.readAsDataURL(item.image);
    } else _onSubmit(item);
  };

  const onDelete = () => {
    const { [itemId]: _, ...newItems } = items;
    dispatch(deleteItem(newItems));
    navigate('/inventory');
  };
  return item ? (
    <Box sx={{ margin: 4 }}>
      <Paper elevation={10} component={Container} maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ padding: 2 }}
          >
            <Grid item xs={8}>
              <TextField
                fullWidth
                placeholder="Name"
                variant="outlined"
                required
                {...register('name')}
                error={errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                inputProps={{ type: 'number', min: 0 }}
                fullWidth
                placeholder="Price, cents"
                variant="outlined"
                required
                {...register('price')}
                error={errors.price}
                helperText={errors.price ? 'Invalid price' : ''}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                type="file"
                placeholder="Image"
                variant="outlined"
                {...register('image')}
              />
            </Grid>
            <Grid item xs={4}>
              <Select
                fullWidth
                placeholder="Status"
                value={selectValue}
                {...register('status')}
              >
                <MenuItem value="available">In stock</MenuItem>
                <MenuItem value="unavailable">Out of stock</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                placeholder="Description"
                variant="outlined"
                {...register('description')}
                error={errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
            <Grid item sx={{ display: 'flex', gap: 3 }}>
              <Button color="primary" variant="contained" type="submit">
                Save
              </Button>
              <Button color="secondary" variant="contained" onClick={onDelete}>
                Delete Item
              </Button>
              <Button
                color="warning"
                variant="contained"
                component={Link}
                to="/inventory"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  ) : (
    navigate('/inventory')
  );
}

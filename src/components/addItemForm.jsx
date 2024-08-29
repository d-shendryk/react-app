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
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { addItem } from '~/api/items';
import { itemSchema } from '../stores/slices/items/itemsSlice';

export function AddItemForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(itemSchema),
  });

  const onSubmit = (item) => {
    item.image = item.image[0];
    const reader = new FileReader();

    reader.onloadend = (event) => {
      item.image = event.target.result;
      dispatch(addItem(item));
      navigate('/inventory');
    };

    if (item.image) {
      reader.readAsDataURL(item.image);
    } else {
      dispatch(addItem(item));
      navigate('/inventory');
    }
  };

  return (
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
                {...register('status')}
                defaultValue="available"
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
  );
}

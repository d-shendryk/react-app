import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatPrice } from '@utils/utils';
import { QuickSearchToolbar } from '@components/searchToolbar';
import { deleteItem } from '@api/items';

export function InventoryPage() {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renderNameCell = ({ value, id }) => {
    return <Link to={`/inventory/${id}`}>{value}</Link>;
  };

  const renderActionsCell = ({ id }) => {
    const onDelete = () => {
      const { [id]: _, ...newItems } = items;
      dispatch(deleteItem(newItems));
    };
    const onEdit = () => {
      navigate(`/inventory/${id}`);
    };

    return (
      <Box
        sx={{
          gap: 1,
          justifyContent: 'start',
          display: 'flex',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <EditIcon onClick={onEdit} sx={{ cursor: 'pointer' }} />
        <DeleteIcon onClick={onDelete} sx={{ cursor: 'pointer' }} />
      </Box>
    );
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 2, renderCell: renderNameCell },
    { field: 'price', headerName: 'Price', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 4 },
    { field: 'status', headerName: 'Status', flex: 2 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: renderActionsCell,
    },
  ];

  const rows = useMemo(() => {
    return Object.keys(items).map((key) => {
      return { ...items[key], id: key, price: formatPrice(items[key].price) };
    });
  }, [items]);

  return (
    <Container>
      <Box
        sx={{
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Box>
          <h2>Inventory</h2>
        </Box>
        <Link to="/inventory/add">Add item</Link>
      </Box>
      <DataGrid
        sx={{ minHeight: 200 }}
        disableRowSelectionOnClick
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[2, 5, 10, 20]}
        slots={{
          toolbar: QuickSearchToolbar,
        }}
        localeText={{ noRowsLabel: 'No items' }}
      />
    </Container>
  );
}

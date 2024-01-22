import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useDeleteItem } from '../../hooks/useDeleteItem';

const style = {
    margin: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex', 
    justifyContent: "center", 
    alignItems: "center", 
  };


export const EnhancedTableToolbar = (props) => {
    const { numSelected, selectedId, setSelected } = props;

    const [open, setOpen] = React.useState(false);
    const { deleteItem } = useDeleteItem();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const delSubmit = (e) => {
        e.preventDefault()
        deleteItem( selectedId );
        setSelected([]);

    };

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            
          </Typography>
        )}
  
        {numSelected > 1 ? (
            <>
                <Tooltip title="Delete">
                    <IconButton onClick={ delSubmit }>
                    <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </>
        ) : numSelected == 1 ? (
            <>
              <Tooltip title="Delete">
                <IconButton onClick={ delSubmit }>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            <Tooltip title="Edit">
                <IconButton onClick={ handleOpen }>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            </>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
        
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <TextField sx={{ m: 1 }} id="descModal" label="Description" variant="outlined" type="string" required/>
                <TextField sx={{ m: 1 }} id="descAmount" label="Amount" variant="outlined"  type="number" required/>
                <Button sx={{ m: 1}} variant="contained" >Update</Button>
            </Box>
        </Modal>
      </Toolbar>
    );
    
  }
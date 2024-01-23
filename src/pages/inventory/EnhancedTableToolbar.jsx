import { useState } from "react";
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
import { useEditItem } from '../../hooks/useEditItem';

const style = {
    margin: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex', 
    justifyContent: "center", 
    alignItems: "center", 
  };


export const EnhancedTableToolbar = (props) => {
    const { numSelected, selected, setSelected } = props;

    const [open, setOpen] = useState(false);
    const [delOpen, setDelOpen] = useState(false);
    const { deleteItem } = useDeleteItem();
    const { editItem } = useEditItem();

    const [description, setDescription] = useState("");
    const [itemAmount, setItemAmount] = useState(0);
 
    const handleOpen = () => {
      selected.map(row => {
        setDescription(row.description);
        setItemAmount(row.itemAmount);
      })
      setOpen(true);
    }

    const handleClose = () => {
      setDescription("");
      setItemAmount(0);
      setOpen(false);
    }

    const handleDelOpen = () => {
      setDelOpen(true);
    }

    const handleDelClose = () => {
      setDelOpen(false);
    }

    const delSubmit = (e) => {
        e.preventDefault()
        deleteItem( selected );
        setSelected([]);
        setDelOpen(false);

    };

    const editSubmit = (e) => {
      e.preventDefault()
      editItem( selected, description, itemAmount );
      setSelected([]);
      setOpen(false);
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
                    <IconButton onClick={ handleDelOpen }>
                    <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </>
        ) : numSelected == 1 ? (
            <>
              <Tooltip title="Delete">
                <IconButton onClick={ handleDelOpen }>
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
          <form onSubmit={editSubmit}>
              <Box sx={style}>                
                <TextField sx={{ m: 1 }} id="descModal" label="Description" value={description}  variant="outlined" type="string"  onChange={(e) => setDescription(e.target.value)} required/>
                <TextField sx={{ m: 1 }} id="descAmount" label="Amount" value={itemAmount} variant="outlined" type="number" onChange={(e) => setItemAmount(e.target.value)} required/>
                <Button sx={{ m: 1}} variant="contained" type="submit" >Update</Button>
              </Box>
          </form>
        </Modal>
        <Modal
        open={delOpen}
        onClose={handleDelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                ARE YOU SURE?! <br />
            </Typography>
            <Button id="modal-description" sx={{ m: 1, backgroundColor: "#F40B27",}} variant="contained" onClick={delSubmit} >YES</Button>
            </Box>
        </Modal>
      </Toolbar>
    );
    
  }
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAddItem } from '../../hooks/useAddItem';
import { useGetItems } from '../../hooks/useGetItems';
import { useAuth } from "../../hooks/useAuth";
//import { useGetUserInfo } from "../../hooks/useGetUserInfo";

import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { EnhancedTable } from "./EnhancedTable";

export const Inventory = () => {
    const { addItem } = useAddItem();
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [itemAmount, setItemAmount] = useState(0);

    const userAuth = useAuth();
    const { items } = useGetItems();

    const onSubmit = (e) => {
        e.preventDefault()
        addItem({description, itemAmount});

        setDescription("");
        setItemAmount("");
    };

    const signUserOut = async () => {
        try {
          await signOut(auth);
          localStorage.clear()
          navigate("/");
        } catch (err) {
          console.error(err);
        }
    };

    return (
    <>
        <div>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h2" component="div">
                 Inventory
            </Typography>

           <Box sx={{  margin: "auto", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <TextField sx={{ m: 1 }} id="description" label="Description" variant="outlined" value={description} type="string" onChange={(e) => setDescription(e.target.value)} required/>
                <TextField sx={{ m: 1 }} id="amount" label="Amount" variant="outlined" value={itemAmount} type="number" onChange={(e) => setItemAmount(e.target.value)} required/>
                <Button  sx={{ m: 1}} variant="contained" onClick={onSubmit}>Add</Button>
            </Box>
            <EnhancedTable rows={items} />
        </div>     
        <div>
                <Typography sx={{ mt: 4, mb: 2 }} variant="body1" component="div">Signed in as: {userAuth.user.email} </Typography>
                <Button onClick={signUserOut} variant="contained" >Sign Out</Button>
        </div>
    </>
    )

};
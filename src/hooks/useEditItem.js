import { updateDoc, doc } from 'firebase/firestore';
import { db } from "../config/firebase-config";


export const useEditItem = () => {
    
    const editItem = async ( rows, newDescription, newItemAmount ) => {
        {rows.map(row => {
            const docRef = doc(db, "inventory", row.id)
            updateDoc(docRef, 
                {       
                    description: newDescription,
                    itemAmount: newItemAmount,
                });
        })    
        }
   };

   return {editItem}
}
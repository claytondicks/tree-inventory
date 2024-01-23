import { deleteDoc, doc } from 'firebase/firestore';
import { db } from "../config/firebase-config";


export const useDeleteItem = () => {
    
    const deleteItem = async ( rows ) => {
        {rows.map(row => {
            const docRef = doc(db, "inventory", row.id)
            deleteDoc(docRef);
        })    
        }
   };

   return {deleteItem}
}
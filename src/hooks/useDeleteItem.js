import { deleteDoc, doc } from 'firebase/firestore';
import { db } from "../config/firebase-config";


export const useDeleteItem = () => {
    
    const deleteItem = async ( ids ) => {
        {ids.map(id => {
            const docRef = doc(db, "inventory", id)
            deleteDoc(docRef);

        })
    
        }
        

    };

    return {deleteItem}
}
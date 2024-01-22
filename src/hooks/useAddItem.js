import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from "../config/firebase-config";

import { useGetUserInfo } from "./useGetUserInfo";


export const useAddItem = ( ) => {
    const transactionCollectionRef = collection(db, "inventory");
    const { userID } = useGetUserInfo();

    const addItem = async ({description, itemAmount}) => {
        await addDoc(transactionCollectionRef, {
            userID,
            description,
            itemAmount,
            createdAt: serverTimestamp()
        });

    };
    return {addItem}
}
import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetItems = ( ) => {
  const [items, setItems] = useState([]);

  const itemCollectionRef = collection(db, "inventory");
  const { userID } = useGetUserInfo();

  const getitems = async () => {
    let unsubscribe;
    try {
      const queryitems = query(
        itemCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      unsubscribe = onSnapshot(queryitems, (snapshot) => {
        let docs = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });

        });

        setItems(docs);

      });
    } catch (err) {
      console.error(err);
    }

    return () => unsubscribe();
  };

  useEffect(() => {
    getitems();
  }, []);

  return { items };
};
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState, useEffect } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyD7Op4fY41OMM6DAnYRpxK2xvQJZDqzwuM",
    authDomain: "scheduler2-7478d.firebaseapp.com",
    databaseURL: "https://scheduler2-7478d-default-rtdb.firebaseio.com",
    projectId: "scheduler2-7478d",
    storageBucket: "scheduler2-7478d.appspot.com",
    messagingSenderId: "29722972984",
    appId: "1:29722972984:web:41c8aa77303396623c67cd"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const dbRef = ref(database, path);
        return onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            setData(transform ? transform(val) : val);
            setLoading(false);
            setError(null);
        }, (error) => {
            setData(null);
            setLoading(false);
            setError(error);
        });
    }, [path, transform]);

    return [data, loading, error];
};

export const setData = (path, value) => (
    set(ref(database, path), value)
);
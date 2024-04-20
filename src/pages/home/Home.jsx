import styles from './Home.module.css';
import { toast } from 'react-toastify';
import Navbar from '../../components/navbar/Navbar';
import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { getFirestore, doc, deleteDoc, orderBy } from 'firebase/firestore';




export default function Home() {
    const { userId } = useSelector(s => s.state);

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        const coll = collection(db, import.meta.env.VITE_FIREBASE_NOTES_COLLECTION_NAME);
        const q = query(coll,
                        where(import.meta.env.VITE_FIREBASE_NOTES_COLLECTION_USER_ID_FIELD, '==', userId));

        const unsubscribe = onSnapshot(q, (snapshot) => {
          let newData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          newData = newData.sort((a, b) => b.timestamp - a.timestamp);

          setNotes(newData);
        });
    
        return () => unsubscribe();
    }, []);

    const handleDeleteButton = (id) => {
        const db = getFirestore();
        const documentRef = doc(db, 'notes', id);
        deleteDoc(documentRef)
            .then(res => {
                toast('Document successfully deleted!');
            })
            .catch(error => {
                toast('Error deleting document:', error);
            })
    };

    function ConvertToDate({timestamp}) {
        if (timestamp) {
            const date = timestamp.toDate();

            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
            const year = String(date.getFullYear()).slice(2); //

            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            const formattedDate = `${day}:${month}:${year}, ${hours}:${minutes}`;

            return <>{formattedDate}</>;
        }

        return null;
    }

    return (
        <div className={`${styles.main_container}`}>
            <Navbar />

            <div className={`${styles.container}`}>
                {notes.map(note => 
                    <div key={note.id} className={`${styles.card}`}>
                        <MdDelete onClick={() => handleDeleteButton(note.id)} className={`${styles.trash_icon}`} />
                        <h3 className={`${styles.title}`}>{note.title}</h3>
                        <p className={`${styles.description}`}>
                            {note.description}
                        </p>
                        <p className={`${styles.date}`}>
                            {<ConvertToDate timestamp={note.timestamp} />}
                        </p>
                        
                    </div>
                )}
            </div>

        </div>
    );
}
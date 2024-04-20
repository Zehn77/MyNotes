import { useRef, useState } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import NodeInput from '../NoteInput/NoteInput';
import { MdCancel } from "react-icons/md";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addNote } from '../../firebase/services';

export default function Navbar() {

    const dialogRef = useRef();

    const [title, setTitle] = useState('');
    const [description, setDesctiptioin] = useState('');
    const { userId } = useSelector(s => s.state);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        addNote(title, description, userId)
          .then(() => {
            toast('You have successfully added the note!');
          })
          .catch(e => {
            toast("Error adding document: ", e + '!');
          })

          setTitle('');
          setDesctiptioin('');
        dialogRef.current.close();
    }   

    return (
        <div className={`${styles.container}`}>
            <Link to='/' className={`${styles.a}`}>My Notes</Link>
            <dialog ref={dialogRef}>

                <h3>Add a New Note</h3>
                <MdCancel onClick={() => { dialogRef.current.close() }} className={`${styles.icon}`} />
                <form className={`${styles.form}`} onSubmit={handleOnSubmit}>
                    <NodeInput text={title} setText={setTitle} title='Enter the title' />
                    <NodeInput text={description} setText={setDesctiptioin} title='Enter the description' />
                    <div>
                        <button>Save</button>
                    </div>
                </form>
            </dialog>
            <div>
                <Link onClick={() => {
                    dialogRef.current.showModal();
                }} className={`${styles.a}`}>Add</Link>
                <Link to='/profile' className={`${styles.a}`}>Profile</Link>
            </div>
        </div>
    );
}

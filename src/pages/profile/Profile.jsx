import styles from './Profile.module.css';
import { signOut, deleteAccount } from '../../firebase/services';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Navbar from '../../components/navbar/Navbar';
import { useEffect } from 'react';

export default function Profile() {

    const { fullname, email } = useSelector(s => s.state);

    useEffect(() => {

    }, []);

    const handleSignOutButton = () => {
        signOut()
            .then(() => {
                toast("Successfully signed out!");
            }).catch((error) => {
                ('Problem in signed out!');
            });
    };

    const handleDeleteAccountButton = () => {
        deleteAccount()
            .then(() => {
                toast("The Account has been successfully deleted.!");
            })
            .catch(error => {
                toast('Problem to deleting an account: ', error, '!');
            });
    }

    return (
        <div className={`${styles.main_container}`}>
            <Navbar />
            <div className={`${styles.container}`}>
                <h2>Fullname: {fullname}</h2>
                <p>Email: {email}</p>
                <button className={`${styles.log_out_button}`} onClick={handleSignOutButton}>Log Out</button>
                <button className={`${styles.delete_account_button}`} onClick={handleDeleteAccountButton}>Delete Account</button>
            </div>
        </div>
    );
}
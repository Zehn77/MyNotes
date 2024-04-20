import styles from './Dashboard.module.css';
import { signInWithGoogle } from "../../firebase/services";
import { toast } from 'react-toastify';

export default function Dashboard() {

    const handleSignInGoogleButton = () => {        
        signInWithGoogle()
            .then((result) => {
                toast('successfully signed in!');
            }).catch((error) => {
                toast('error in signed in!');
            });
    };

    return (
        <div className={`${styles.container}`}>
            <button onClick={handleSignInGoogleButton}>Sign In With Google</button>
        </div>
    );
}
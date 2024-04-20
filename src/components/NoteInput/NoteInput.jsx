import { useState } from 'react';
import styles from './NodeInput.module.css';

function NodeInput({title, text, setText}) {

    return (
        <div className={`${styles.container}`}>
            <label htmlFor={title}>{title}
                <br />
                <input type="text" onChange={(e) => setText(e.target.value)} value={text} autoComplete='off' id={title} />
            </label>
        </div>
    );
}

NodeInput.defaultProps = {
    title: 'No Title'
}

export default NodeInput;
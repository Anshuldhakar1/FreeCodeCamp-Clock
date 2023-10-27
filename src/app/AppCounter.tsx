import styles from './app.module.scss';

export const AppCounter = (props: { title: string, value: number, type: string, isRunning: boolean, setter: (v: number) => void }) => { 
    
    const commonStyles = ` ${styles.gridCenter} ${styles.coolerBTN}`;
    const decrementStyles = `${styles.decrementButton} ${commonStyles}`;
    const incrementStyles = `${styles.incrementButton} ${commonStyles}`;

    return (
        <div className={styles.counterOuter}>
            <div
                id={props.type + "-label"}
                className={styles.counterTitle}
            >
                {props.title}
            </div>
            <div className={styles.counterRow2}>
                <button
                    id={props.type + "-decrement"}
                    className={decrementStyles}
                    disabled={props.isRunning}
                    onClick={() => {
                        if (props.value > 1)
                            props.setter(props.value - 1);
                    }}
                >
                    <svg fill="#000000" viewBox="-8.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <title>angle-double-top</title>
                        <path d="M13.72 17.68c-0.2 0-0.44-0.080-0.6-0.24l-5.84-5.84-5.84 5.84c-0.32 0.32-0.84 0.32-1.2 0-0.32-0.32-0.32-0.84 0-1.2l6.44-6.44c0.32-0.32 0.88-0.32 1.2 0l6.44 6.44c0.32 0.32 0.32 0.84 0 1.2-0.16 0.16-0.4 0.24-0.6 0.24zM13.72 22.44c-0.2 0-0.44-0.080-0.6-0.24l-5.84-5.88-5.84 5.88c-0.32 0.32-0.84 0.32-1.2 0-0.32-0.32-0.32-0.84 0-1.2l6.44-6.44c0.32-0.32 0.88-0.32 1.2 0l6.44 6.44c0.32 0.32 0.32 0.84 0 1.2-0.16 0.16-0.4 0.24-0.6 0.24z"></path>
                    </svg>
                </button>
                <label id={props.type + "-length"}>{props.value}</label>
                <button
                    id={props.type + "-increment"}
                    className={incrementStyles}
                    disabled={props.isRunning}
                    onClick={() => {
                        if (props.value < 60)
                            props.setter(props.value + 1);
                    }}
                >
                    <svg fill="#000000" viewBox="-8.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <title>angle-double-top</title>
                        <path d="M13.72 17.68c-0.2 0-0.44-0.080-0.6-0.24l-5.84-5.84-5.84 5.84c-0.32 0.32-0.84 0.32-1.2 0-0.32-0.32-0.32-0.84 0-1.2l6.44-6.44c0.32-0.32 0.88-0.32 1.2 0l6.44 6.44c0.32 0.32 0.32 0.84 0 1.2-0.16 0.16-0.4 0.24-0.6 0.24zM13.72 22.44c-0.2 0-0.44-0.080-0.6-0.24l-5.84-5.88-5.84 5.88c-0.32 0.32-0.84 0.32-1.2 0-0.32-0.32-0.32-0.84 0-1.2l6.44-6.44c0.32-0.32 0.88-0.32 1.2 0l6.44 6.44c0.32 0.32 0.32 0.84 0 1.2-0.16 0.16-0.4 0.24-0.6 0.24z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );

};

export default AppCounter;
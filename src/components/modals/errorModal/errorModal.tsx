import styles from './errorModal.module.css';
interface ErrorModalProps {
    isActive: boolean,
    message: string
}
export default function ErrorModal(props: ErrorModalProps) {
    if (props.isActive) {
        return (
            <div className={styles.errorModal}>
                <div className={styles.errorContent}>
                    <h2>Error</h2>
                    <p>{props.message}</p>
                </div>
            </div>)
    }
}
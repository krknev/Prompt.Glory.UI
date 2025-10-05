 
import { Category } from '@/types/category';
import styles from './dashboardCategoryCard.module.css';

export default function DashboardCategoryCard({category}:{category: Category}) {

    return (<div key={category.id} className={styles.categoryCard}>
        <div className={styles.cardIcon}>
            <span>{category.icon}</span>
        </div>
        <div className={styles.cardContent}>
            <h4>{category.name}</h4>
            <p>{category.description}</p>
            <div className={styles.cardFooter}>
                <span className={styles.count}>{category.count} items</span>
                <button className={styles.cardButton}>Learn More</button>
            </div>
        </div>
    </div>)
}
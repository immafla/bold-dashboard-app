import styles from './dashboard.module.css' 
import {
  Card,
  Filter
} from '@/components'
export default function Dashboard() {

  
  return (
    <section className={styles.dashboardContainer}>

      <div className={styles.card}>
        <Card title='Total ventas' helpText='Texto de ayuda'>
          <h1>
            $500.000
          </h1>
          <h6>
            Junio 2024
          </h6>
        </Card>
      </div>

      <div className={styles.filters}>
        <Filter />
      </div>

      <div className={styles.table}>
        <Card title='Tus ventas de Junio' helpText='Texto de ayuda'>
          <h1>
            $500.000
          </h1>
          <h6>
            Junio 2024
          </h6>
        </Card>
      </div>

    </section>
  );
}

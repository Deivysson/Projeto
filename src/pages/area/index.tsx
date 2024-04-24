
import styles from './area.module.css';
import img from '../../../assets/imagens/micro.png';

export function Area() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.card}>
                    <h2>Nome do Paciente</h2>
                    <p>CPF: 000.000.000-00</p>
                </div>
                <div className={styles.logo}>
                    <img src={img} alt="Logo" />
                </div>
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Arquivo</th>
                            <th>Data de Inserção</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Arquivo1.pdf</td>
                            <td>24/04/2024</td>
                        </tr>
                        <tr>
                            <td>Arquivo2.pdf</td>
                            <td>23/04/2024</td>
                        </tr>
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import styles from './home.module.css';
import img from '../../../assets/imagens/micro.png'
import imgdoc from '../../../assets/imagens/undraw_medicine_b-1-ol.svg'

export function Home(){
    const [cpf, setCPF] = useState('');

    const handleSearch = () => {
        // Implemente a lógica de pesquisa de CPF aqui
        console.log('CPF pesquisado:', cpf);
    };

    return(
        <div className={styles.container}>

            
            <div className={styles.formContainer}>
            <img src={img} alt="Imagem" className={styles.image} />
                <h1>Envio de Exames</h1>
                <input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCPF(e.target.value)}
                    placeholder="Digite o CPF..."
                />
                <Link to='/sobre'> 
                <button className={styles.button}>Gerar</button> 
                </Link>
            </div>

            <div className={styles.imagedoc}>
            <img src={imgdoc} alt="Imagem" className={styles.docimage} />
            </div>

        
        </div>
    );
}

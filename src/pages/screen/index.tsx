// Screen.js
import { useState } from "react";
import styles from './screen.module.css';
import img from '../../../assets/imagens/micro.png';

export function Screen() {
 const [name, setName] = useState('');
 const [results, setResults] = useState([]);

 async function handleSearch() {
    const response = await fetch(`http://localhost:3000/pacientes/search?name=${name}`);
    const data = await response.json();
    console.log(data);
    setResults(data);
 }

 return(
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <img src={img} alt="Imagem" className={styles.image} />
        <h1>Envio de Exames</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do paciente"
        />
        <button className={styles.button} onClick={handleSearch}>Pesquisar</button>
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result['nom_paciente']}</li>
        
          ))}
        </ul>
      </div>
    </div>
 );
}

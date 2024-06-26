// Screen.js
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import styles from './screen.module.css';
import img from '../../../assets/imagens/micro.png';

export function Screen() {
 const [name, setName] = useState<string>('');
 const [results, setResults] = useState([]);
 
 const navigate = useNavigate();

 interface Paciente {
  nom_paciente: String;
  num_cpf: Number;
 }

 async function handleSearch() {
    const response = await fetch(`http://localhost:3000/pacientes/search?name=${name}`);
    const data = await response.json();
    console.log(data);
    setResults(data);
 }

 const handleNameClick = (paciente: Paciente) => {
  navigate('/form', { state: {paciente} });
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
            console.log('result', result),
            <li key={index} onClick={() => handleNameClick(result)}>
              {result['nom_paciente']}  {result['num_cpf']} </li>
        
          ))}
        </ul>
      </div>
    </div>
 );
}

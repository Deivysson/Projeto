import { useState } from "react";
import styles from './screen.module.css';
import img from '../../../assets/imagens/micro.png'

export function Screen() {
  const [name, setName] = useState('');
  const [searchedName, setSearchedName] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3001/search?cpf=${name}`);
      const data = await response.json();
      
      if (response.ok) {
        setSearchedName(data.name);
      } else {
        console.error('Erro ao buscar o nome:', data.error);
        setSearchedName('');
      }
    } catch (error) {
      console.error('Erro ao buscar o nome:', error);
      setSearchedName('');
    }
  };

  return(
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <img src={img} alt="Imagem" className={styles.image} />
        <h1>Envio de Exames</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="CPF do paciente"
        />
        <button className={styles.button} onClick={handleSearch}>Pesquisar</button> 
        {searchedName && <p>Nome: {searchedName}</p>}
      </div>
    </div>
  );
}

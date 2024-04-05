// screen.tsx

import { useState } from "react";
import styles from './screen.module.css';
import img from '../../../assets/imagens/micro.png';

export function Screen() {
  const [name, setName] = useState('');
  const [searchedNames, setSearchedNames] = useState<string[]>([]);

  const handleSearch = async () => {
    try {
      console.log('Pesquisando nome:', name);
      const response = await fetch('/screen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      const names = await response.json();
      console.log('Nomes encontrados:', names);
      setSearchedNames(names);
    } catch (error) {
      console.error('Erro ao buscar o nome:', error);
      setSearchedNames([]);
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
          placeholder="Nome do paciente"
        />
        <button className={styles.button} onClick={handleSearch}>Pesquisar</button> 
        {searchedNames.length > 0 && (
          <div>
            <p>Nomes encontrados:</p>
            <ul>
              {searchedNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

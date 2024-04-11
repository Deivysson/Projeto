import {  useState } from "react";
import styles from './login.module.css';
import img from '../../../assets/imagens/micro.png';


export function Login(){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');


    return(
        
        <div className={styles.container}>

        
            <form className={styles.formContainer}>
            <img src={img} alt="Imagem" className={styles.image} />
                <h1>LOGIN PACIENTE</h1>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Usuário"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="*********"
                />
                
                <button className={styles.button} type="submit">Entrar</button> 
                

                </form>
            
        
        </div>
    );
}

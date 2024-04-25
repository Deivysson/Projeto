import {  useState } from "react";
import styles from './login.module.css';
import img from '../../../assets/imagens/micro.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Login(){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleArea(e: React.FormEvent) {
        e.preventDefault(); 
        axios.post('http://localhost:3000/authenticate', { login: name, senha: password })
            .then(response => {
                if (response.data.user) {
                    
                    navigate(`/area?nom_paciente=${response.data.exames.nom_paciente}&num_cpf=${response.data.exames.num_cpf}&des_endereco=${response.data.exames.des_endereco}&des_email=${response.data.exames.des_email}`);
                } else {
                    alert('Login ou senha inválidos.');
                }
            })
            .catch(error => {
                console.error('Erro na autenticação:', error);
                alert('Erro na autenticação.');
            });
    }
    

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
                
                <button className={styles.button} type="submit" onClick={handleArea}>Entrar</button> 
                

                </form>
            
        
        </div>
    );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import styles from './home.module.css';
import img from '../../../assets/imagens/micro.png'
import imgdoc from '../../../assets/imagens/undraw_medicine_b-1-ol.svg'

import { useNavigate } from "react-router-dom";

import { auth } from "../../firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

export function Home(){
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    /*
    const handleSearch = () => {
        // Implemente a lógica de pesquisa de CPF aqui
        console.log('CPF pesquisado:', cpf);
    };
    */

    async function handleLogin(){
        
        if(user !== '' && password !== ''){

            await signInWithEmailAndPassword(auth, user, password)
            .then(() => {
                navigate('/admin', { replace: true })
            })
            .catch(() => {
                console.log('error ao fazer o login')
            })
            
        }else{
            alert('Prencha todos os campos!')
        }
    }

    return(
        
        <div className={styles.container}>

        
            <form className={styles.formContainer} onSubmit={handleLogin}>
            <img src={img} alt="Imagem" className={styles.image} />
                <h1>Envio de Exames</h1>
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Usuário"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="*********"
                />
                
                <button className={styles.button} type="submit">Entrar</button> 
                

                
                <Link to='/register'>
                Não possui uma conta ? Cadastre-se
                </Link>

                </form>
            

            <div className={styles.imagedoc}>
            <img src={imgdoc} alt="Imagem" className={styles.docimage} />
            </div>

        
        </div>
    );
}

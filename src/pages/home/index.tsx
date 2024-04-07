import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import styles from './home.module.css';
import img from '../../../assets/imagens/micro.png'
import imgdoc from '../../../assets/imagens/undraw_medicine_b-1-ol.svg'

import { useNavigate } from "react-router-dom";

import { auth } from "../../firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

export function Home(){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

  

    async function handleLogin(e: FormEvent){
        e.preventDefault();
       
        
        if(name === '' || password === ''){
            alert('Preencha todos os campos!')
            return;
            }

            await signInWithEmailAndPassword(auth, name, password)
            .then(() => {
                navigate('/Screen', {replace: true})
            })
            .catch((error) => {
                console.log(error);
            })
            
        }
    

    return(
        
        <div className={styles.container}>

        
            <form className={styles.formContainer} onSubmit={handleLogin}>
            <img src={img} alt="Imagem" className={styles.image} />
                <h1>Login</h1>
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
                

                
                <Link to='/register'>
                Adm
                </Link>

                </form>
            

            <div className={styles.imagedoc}>
            <img src={imgdoc} alt="Imagem" className={styles.docimage} />
            </div>

        
        </div>
    );
}

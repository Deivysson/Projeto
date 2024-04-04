import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import styles from './register.module.css';
import img from '../../../assets/imagens/micro.png'
import imgdoc from '../../../assets/imagens/undraw_two_factor_authentication_namy.svg'

import { auth } from "../../firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   

    const navigate = useNavigate();

    /*
    const handleSearch = () => {
        // Implemente a lógica de pesquisa de CPF aqui
        console.log('CPF pesquisado:', cpf);
    };
    */

    async function handleRegister(e: FormEvent){
        e.preventDefault();
       
        if(email !== '' || password !== ''){
            await createUserWithEmailAndPassword(auth, email, password)
            .then(() =>{
                navigate('/')
            })
        }else{
            alert('Prencha todos os campos!')
        }
    }

    

    return(
        <div className={styles.container}>

            <form className={styles.formContainer} onSubmit={handleRegister} >
            <img src={img} alt="Imagem" className={styles.image} />
                <h1>Cadastrar</h1>


                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Usuário"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                />

               
                <button className={styles.button} type="submit">Criar</button> 


                <Link to='/'>
                Ja possui ?
                </Link>

                </form>


            <div className={styles.imagedoc}>
            <img src={imgdoc} alt="Imagem" className={styles.docimage} />
            </div>

        
        </div>
    );
}

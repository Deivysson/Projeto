import { useState, useEffect } from 'react';
import styles from './gerar.module.css'


export function Gerar() {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const generateRandomString = (length: number) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    useEffect(() => {
        handleGenerate();
    }, []);

    const handleGenerate = () => {
        setLogin(generateRandomString(6));
        setSenha(generateRandomString(6)); 
    };

    return (
        <div className={styles.container}>
            <h1>SENHA DE ACESSO</h1>
            <div>
                <p>Login: {login}</p>
                <p>Senha: {senha}</p>
            </div>    
        </div>
    );
}

import './area.module.css';
import { useLocation } from "react-router-dom";
import img from '../../../assets/imagens/micro.png';
import { useState, useEffect } from 'react';

interface Exame {
    nome_arquivo: string;
    caminho_arquivo: string;
    data_insercao: string;
}

export function Area() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const nom_paciente = queryParams.get('nom_paciente');
    const num_cpf = queryParams.get('num_cpf');
    const des_email = queryParams.get('des_email');
    const [exames, setExames] = useState<Exame[]>([]);

    useEffect(() => {
        const cod_paciente = queryParams.get('cod_paciente');
        fetch(`http://localhost:3000/exames?cod_paciente=${cod_paciente}`)
            .then(response => response.json())
            .then(data => setExames(data.exames))
            .catch(error => console.error(error));
    }, [queryParams]);

    return (
        <div>
        <div className="headerContainer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <header>
                <h1>{nom_paciente}</h1>
                <p>CPF: {num_cpf}</p>
                <p>Email: {des_email}</p>
            </header>
            <img src={img} alt="Logo" className="logo" style={{ height: 'auto' }}/>
        </div>

        <table>
    <thead>
        <tr>
            <th>Exames</th>
            <th >Data de Inserção</th>
        </tr>
        <tr>
            <th>Arquivo.pdf</th>
            <th >23/04/2024</th>
        </tr>
    </thead>
    <tbody>
                    {exames.map((exame, index) => (
                        <tr key={index}>
                            <td><a href={`http://localhost:3000/${exame.caminho_arquivo}`} target="_blank" rel="noopener noreferrer">{exame.nome_arquivo}</a></td>
                            <td>{new Date(exame.data_insercao).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
</table>
    </div>
);
}

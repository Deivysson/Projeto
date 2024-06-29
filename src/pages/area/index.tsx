import './area.module.css';
import { useLocation } from "react-router-dom";
import img from '../../../assets/imagens/micro.png';
import { useState, useEffect } from 'react';

interface Exame {
    nome_arquivo: string;
    caminho_arquivo: string;
    exame: string;
    data_exame: string;
    medico: string;
}

export function Area() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const nom_paciente = queryParams.get('nom_paciente');
    const num_cpf = queryParams.get('num_cpf');
    const des_email = queryParams.get('des_email');
    const cod_paciente = queryParams.get('cod_paciente');
    
    const [exames, setExames] = useState<Exame[]>([]);

    useEffect(() => {
        if (!cod_paciente) {
            console.error('cod_paciente não encontrado nos parâmetros da URL.');
            return;
        }

        fetch(`http://localhost:3000/exames/arquivos?cod_paciente=${cod_paciente}`)
            .then(response => response.json())
            .then(data => setExames(data.exames))
            .catch(error => console.error('Erro ao buscar exames:', error));
    }, [cod_paciente]);

    return (
        <div>
            <div className="headerContainer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <header>
                    <h1>{nom_paciente}</h1>
                    <p>CPF: {num_cpf}</p>
                    <p>Email: {des_email}</p>
                </header>
                <img src={img} alt="Logo" className="logo" style={{ height: 'auto' }} />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Exame</th>
                        <th>Data do Exame</th>
                        <th>Médico</th>
                        <th>Arquivo</th>
                    </tr>
                </thead>
                <tbody>
                    {exames.map((exame, index) => (
                        <tr key={index}>
                            <td>{exame.exame}</td>
                            <td>{exame.data_exame}</td>
                            <td>{exame.medico}</td>
                            <td>
                                <a href={`http://localhost:3000/upload/${exame.nome_arquivo}`} target="_blank" rel="noopener noreferrer">
                                    {exame.nome_arquivo}
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

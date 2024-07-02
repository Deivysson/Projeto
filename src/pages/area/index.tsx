import React, { useState, useEffect } from 'react';
import './area.module.css';
import { useLocation } from "react-router-dom";
import { FaEye, FaDownload } from 'react-icons/fa';
import img from '../../../assets/imagens/micro.png';

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
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    useEffect(() => {
        if (!cod_paciente) {
            console.error('cod_paciente não encontrado nos parâmetros da URL.');
            return;
        }

        fetch(`http://localhost:3000/exames/arquivos?cod_paciente=${cod_paciente}`)
        .then(response => response.json())
        .then(data => {
            const sortedExames = data.exames.sort((a: Exame, b: Exame) => {
                return new Date(b.data_exame).getTime() - new Date(a.data_exame).getTime();
            });
            setExames(sortedExames);
        })
        .catch(error => console.error('Erro ao buscar exames:', error));
    }, [cod_paciente]);

    const handleDateClick = (date: string) => {
        setSelectedDate(selectedDate === date ? null : date);
    };

    

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

            <table className="exames-table">
                <thead>
                    <tr>
                        <th colSpan={2} className="exames-title">Exames realizados</th>
                    </tr>
                </thead>
                <tbody>
                    {exames.map((exame, index) => (
                        <React.Fragment key={index}>
                            <tr onClick={() => handleDateClick(exame.data_exame)} className={selectedDate === exame.data_exame ? 'selected-date' : ''}>
                                <td>{exame.data_exame.split(' ')[0]}</td>
                            </tr>
                            {selectedDate === exame.data_exame && (
                                <tr>
                                    <td colSpan={2}>
                                        <div className="exame-details">
                                            <div className="exame-info">
                                                <p><strong>Exame:</strong> {exame.exame}</p>
                                                <p className="medico-info"><strong>Médico:</strong> {exame.medico}</p>
                                            </div>
                                            <div className="icon-buttons">
                                                <a href={`http://localhost:3000/upload/${exame.nome_arquivo}`} target="_blank" rel="noopener noreferrer" className="icon-button">
                                                    <FaEye size={25} title="Visualizar"/>
                                                </a>
                                                <a href={`http://localhost:3000/upload/${exame.nome_arquivo}`} target="_blank" rel="noopener noreferrer" download className="icon-button">
                                                    <FaDownload size={25} title="Baixar"/>
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

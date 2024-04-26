import './area.module.css';
import { useLocation } from "react-router-dom";
import img from '../../../assets/imagens/micro.png'

export function Area() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const nom_paciente = queryParams.get('nom_paciente');
    const num_cpf = queryParams.get('num_cpf');
    const des_email = queryParams.get('des_email');

    return (
        <div>
        <div className="headerContainer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <header>
                <h1>Bem-vindo, {nom_paciente}!</h1>
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
     
    </tbody>
</table>
    </div>
);
}

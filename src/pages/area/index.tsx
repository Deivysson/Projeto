
import { useLocation } from "react-router-dom";

export function Area() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const nom_paciente = queryParams.get('nom_paciente');
    const num_cpf = queryParams.get('num_cpf');
    const des_endereco = queryParams.get('des_endereco');
    const des_email = queryParams.get('des_email');

    return (
        <div>
            <header>
                <h1>Bem-vindo, {nom_paciente}!</h1>
                <p>CPF: {num_cpf}</p>
                <p>Endereço: { des_endereco } </p>
                <p>Email: { des_email } </p>
            </header>
            
        </div>
    );
}


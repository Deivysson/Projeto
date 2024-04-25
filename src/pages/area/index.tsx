
import { useLocation } from "react-router-dom";

export function Area() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const nom_paciente = queryParams.get('nom_paciente');
    const num_cpf = queryParams.get('num_cpf');

    return (
        <div>
            <header>
                <h1>Bem-vindo, {nom_paciente}!</h1>
                <p>CPF: {num_cpf}</p>
            </header>
            
        </div>
    );
}


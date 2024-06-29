import { FormEvent, useState, ChangeEvent, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importação do SweetAlert2
import styles from './form.module.css';

export function Form() {
    const location = useLocation();
    const { paciente } = location.state;
    const navigate = useNavigate();

    const [exames, setExames] = useState<string[]>([]);
    const [medicos, setMedicos] = useState<string[]>([]);

    const [showExameList, setShowExameList] = useState(false);
    const [showMedicoList, setShowMedicoList] = useState(false);
    const [selectedExame, setSelectedExame] = useState('');
    const [selectedMedico, setSelectedMedico] = useState('');
    const [dataExame, setDataExame] = useState('');
    const [arquivo, setArquivo] = useState<File | null>(null);

    const exameInputRef = useRef<HTMLInputElement>(null);
    const medicoInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch('http://localhost:3000/medicos')
            .then(response => response.json())
            .then(data => setMedicos(data.map((medico: { nom_medico: string }) => medico.nom_medico)))
            .catch(error => console.error('Erro ao buscar médicos:', error));

        fetch('http://localhost:3000/tipos_exames')
            .then(response => response.json())
            .then(data => setExames(data.map((exame: { nome: string }) => exame.nome)))
            .catch(error => console.error('Erro ao buscar tipos de exames:', error));
    }, []);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setArquivo(e.target.files[0]);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!arquivo) {
            console.error('Nenhum arquivo selecionado');
            return;
        }

        const formData = new FormData();
        formData.append('arquivo', arquivo);
        formData.append('cod_paciente', paciente.cod_paciente.toString());
        formData.append('exame', selectedExame);
        formData.append('data_exame', dataExame);
        formData.append('medico', selectedMedico);

        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                Swal.fire({
                    title: 'Deseja enviar outro arquivo?',
                    icon: 'question',
                    confirmButtonText: 'SIM',
                    cancelButtonText: 'NÃO',
                    showCancelButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        setSelectedExame('');
                        setSelectedMedico('');
                        setDataExame('');
                        setArquivo(null);
                    } else {
                        navigate('/gerar', { state: { cod_paciente: paciente.cod_paciente } });
                    }
                });
            })
            .catch(error => console.error(error));
    };

    const handleExameSelect = (exame: string) => {
        console.log('Exame selecionado:', exame);
        setSelectedExame(exame);
        setShowExameList(false);
        exameInputRef.current?.blur();
    };

    const handleMedicoSelect = (medico: string) => {
        console.log('Medico selecionado:', medico);
        setSelectedMedico(medico);
        setShowMedicoList(false);
        medicoInputRef.current?.blur();
    };

    return (
        <div className={styles.container}>
            <h1>Formulário de Exame</h1>
            <input type="text" value={paciente.cod_paciente} readOnly className={styles.input} />
            <input type="text" value={paciente.nom_paciente} readOnly className={styles.input} />
            <input type="text" value={paciente.num_cpf} readOnly className={styles.input} />

            <label>
                Exame realizado:
                <input
                    type="text"
                    value={selectedExame} 
                    ref={exameInputRef}
                    onFocus={() => setShowExameList(true)}
                    onBlur={() => setShowExameList(false)}
                    onChange={(e) => setSelectedExame(e.target.value)}
                    className={styles.input} 
                />
                { showExameList && (
                    <ul className={styles.selectList}>
                        {exames.map((exame, index) => (
                            <li key={index} onMouseDown={() => handleExameSelect(exame)}>
                                {exame}
                            </li>
                        ))}
                    </ul>
                )}
            </label>

            <label>
                Data do Exame:
                <input type="date" value={dataExame} onChange={(e) => setDataExame(e.target.value)} className={styles.input} />
            </label>

            <label>
                Médico Solicitante:
                <input
                    type="text"
                    value={selectedMedico}
                    ref={medicoInputRef}
                    onFocus={() => setShowMedicoList(true)}
                    onBlur={() => setShowMedicoList(false)} 
                    onChange={(e) => setSelectedMedico(e.target.value)}
                    className={styles.input}
                />
                {showMedicoList && (
                    <ul className={styles.selectList}>
                        {medicos.map((medico, index) => (
                            <li key={index} onMouseDown={() => handleMedicoSelect(medico)}>
                                {medico}
                            </li>
                        ))}
                    </ul>
                )}
            </label>

            <label>
                Selecionar Arquivo:
                <input type="file" accept="application/pdf" onChange={handleFileChange} className={styles.inputFile} />
            </label>

            <button onClick={handleSubmit} className={styles.button}>Enviar</button>
        </div>
    );
}

export default Form;

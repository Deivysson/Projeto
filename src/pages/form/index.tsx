
import  { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './form.module.css'

export function Form() {
 const location = useLocation();
 const { nomPaciente } = location.state;
const navigate = useNavigate();


 // Estados para gerenciar os campos de input
 const [dataExame, setDataExame] = useState('');
 const [medicoSolicitante, setMedicoSolicitante] = useState('');
 const [arquivo, setArquivo] = useState(null);
 const [nomExame, setNomExame] = useState('');

 // Função para lidar com a mudança no campo de arquivo
 const handleFileChange = (e:FormEvent) => {
    setArquivo(e.target.files[0]);
 };

 // Função para lidar com a submissão do formulário
 const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica para enviar os dados para o backend
    console.log({ nomExame, dataExame, medicoSolicitante, arquivo });
 };

const handleRedirectToGerar = () => {
  navigate('/gerar');
}



 return (
    <div className={styles.container}>
      <h1>Formulário de Exame</h1>
      <input type="text" value={nomPaciente} readOnly className={styles.input} /> {/* Campo de input com o nome do paciente */}
      <label>

      <label>
        Exame realizado::
        <input type="text" value={nomExame} onChange={(e) => setNomExame(e.target.value)} className={styles.input} />
      </label>

        Data do Exame:
        <input type="date" value={dataExame} onChange={(e) => setDataExame(e.target.value)} className={styles.input} />
      </label>
      <label>
        Médico Solicitante:
        <input type="text" value={medicoSolicitante} onChange={(e) => setMedicoSolicitante(e.target.value)} className={styles.input} />
      </label>
      <label>
        Selecionar Arquivo:
        <input type="file" accept="application/pdf" onChange={handleFileChange} className={styles.input} />
      </label>
      <button onClick={handleSubmit} className={styles.button}>Enviar</button>
      <button onClick={handleRedirectToGerar} className={styles.button}>Gerar senha</button>
      

    </div>
 );

 
}

export default Form;

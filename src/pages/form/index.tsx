
import  { FormEvent, useState, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './form.module.css'

export function Form() {
 const location = useLocation();
 const { paciente } = location.state;
const navigate = useNavigate();

const exames = ['Exame A', 'Exame B', 'Exame C'];
const medicos = ['Dr.João', 'Dra. Maria', 'Dr.Deivysson'];

const [showExameList, setShowExameList] = useState(false);
 const [showMedicoList, setShowMedicoList] = useState(false);
 const [selectedExame, setSelectedExame] = useState('');
 const [selectedMedico, setSelectedMedico] = useState('');
 

 // Estados para gerenciar os campos de input
 const [dataExame, setDataExame] = useState('');
 const [arquivo, setArquivo] = useState<File | null>(null);

 // Função para lidar com a mudança no campo de arquivo
 const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    setArquivo(e.target.files[0]);
  }
 };

 const handleSubmit = (e:FormEvent) => {
  e.preventDefault();
  if (!arquivo) {
    console.error('Nenhum arquivo selecionado');
    return;
 }

 const formData = new FormData();
 formData.append('arquivo', arquivo);
 // Adicione outros campos do formulário ao formData se necessário

 fetch('http://localhost:3000/upload', {
    method: 'POST',
    body: formData,
 })
 .then(response => response.json())
 .then(data => console.log(data))
 .catch(error => console.error(error));
};
 



const handleRedirectToGerar = () => {
  const cod_paciente = paciente.cod_paciente;
  console.log('antes de chamar gerar cod_paciente: ', cod_paciente);
  navigate('/gerar', { state: {cod_paciente} });
 }

const handleExameSelect = (exame:any) => {
  console.log('Exame selecionado:', exame);
  setSelectedExame(exame);
  setShowExameList(false);
};

const handleMedicoSelect = (medico:any) => {
  console.log('Medico selecionado:', medico);
  setSelectedMedico(medico);
  setShowMedicoList(false);
}



 return (
    <div className={styles.container}>
      <h1>Formulário de Exame</h1>
      <input type="text" value={paciente.cod_paciente} readOnly className={styles.input} />
      <input type="text" value={paciente.nom_paciente} readOnly className={styles.input} />
      <input type="text" value={paciente.num_cpf} readOnly className={styles.input} />
      
      <label>

      <label>
        Exame realizado::
        <input
         type="text"
          value={selectedExame} 
          onFocus={() => setShowExameList(true)}
          onBlur={() => setShowExameList(false)}
          onChange={(e) => setSelectedExame(e.target.value)}
          className={styles.input} 
          />
          { showExameList && (
            <ul className={styles.selectList}>
              {exames.map((exame, index) => (
                <li key={index} onClick={() => handleExameSelect(exame)}>
                  {exame}
                </li>
              ))}
            </ul>
          ) }
      </label>


        Data do Exame:
        <input type="date" value={dataExame} onChange={(e) => setDataExame(e.target.value)} className={styles.input} />
      </label>


      <label>
        Médico Solicitante:
        <input
          type="text"
          value={selectedMedico}
          onFocus={() => setShowMedicoList(true)}
          onBlur={() => setShowMedicoList(false)} 
          onChange={(e) => setSelectedMedico(e.target.value)}
          className={styles.input}
            />
        {showMedicoList && (
        <ul className={styles.selectList}>
          {medicos.map((medico, index) => (
            <li key={index} onClick={() => handleMedicoSelect(medico)}>
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
      <button onClick={handleRedirectToGerar} className={styles.button}>Gerar senha</button>
      

    </div>
 );

 
}

export default Form;

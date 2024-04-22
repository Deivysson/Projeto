
import  { FormEvent, useState } from 'react';
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
 const [arquivo, setArquivo] = useState(null);

 // Função para lidar com a mudança no campo de arquivo
 const handleFileChange = (e:any) => {

    setArquivo(e.target.files[0]);
 };

 // Função para lidar com a submissão do formulário
 const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica para enviar os dados para o backend
    console.log({ selectedExame, dataExame, selectedMedico, arquivo });
 };

const handleRedirectToGerar = () => {
  navigate('/gerar');
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

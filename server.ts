// server.ts

import express, { Request, Response } from 'express';
import { Pool } from 'pg';

const app = express();
const port = 3001;

// Configuração do banco de dados PostgreSQL
const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'seu_banco_de_dados',
  password: 'sua_senha',
  port: 5432,
});

// Rota para pesquisa de CPF
app.get('/search', async (req: Request, res: Response) => {
  const { cpf } = req.query;

  try {
    const query = 'SELECT name FROM patients WHERE cpf = $1';
    const { rows } = await pool.query(query, [cpf]);
    
    if (rows.length === 0) {
      res.status(404).json({ error: 'Paciente não encontrado' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    console.error('Erro ao executar a consulta:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// db.ts

import { Request, Response } from 'express';
import { Pool } from 'pg';

// Configuração da conexão com o banco de dados
const pool = new Pool({
  user: 'postgres',
  host: '172.16.170.120',
  database: 'postgres',
  password: 'juizladrao_1994',
  port: 5432,
});

// Função para pesquisar nomes no banco de dados
export async function searchNames(req: Request, res: Response) {
  const name: string = req.body.name;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT name FROM arq_paciente WHERE name = $1', [name]);
    const names = result.rows.map((row: any) => row.name);
    client.release();
    res.status(200).json(names);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao pesquisar nome no banco de dados' });
  }
}

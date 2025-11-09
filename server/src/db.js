import pg from 'pg';

const {
  DB_HOST = 'db',
  DB_PORT = '5432',
  DB_USER = 'folio',
  DB_PASSWORD = 'folio_pw',
  DB_NAME = 'folio',
} = process.env;

export const pool = new pg.Pool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

export async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id BIGSERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT,
      description TEXT,
      image TEXT,
      tech JSONB,
      date VARCHAR(20),
      github TEXT,
      demo TEXT,
      show_github BOOLEAN DEFAULT TRUE,
      show_demo BOOLEAN DEFAULT TRUE,
      embed_url TEXT,
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS experiences (
      id BIGSERIAL PRIMARY KEY,
      position TEXT NOT NULL,
      company TEXT,
      location TEXT,
      period TEXT,
      description TEXT[],
      achievements TEXT[]
    );

    CREATE TABLE IF NOT EXISTS profile (
      id SMALLINT PRIMARY KEY DEFAULT 1,
      name TEXT,
      location TEXT,
      description TEXT,
      email TEXT,
      github TEXT,
      linkedin TEXT,
      profile_image TEXT
    );

    CREATE TABLE IF NOT EXISTS about_skills (
      id BIGSERIAL PRIMARY KEY,
      title TEXT,
      description TEXT,
      projects TEXT,
      icon TEXT
    );

    CREATE TABLE IF NOT EXISTS about_stats (
      id BIGSERIAL PRIMARY KEY,
      number TEXT,
      label TEXT
    );

    CREATE TABLE IF NOT EXISTS about_education (
      id BIGSERIAL PRIMARY KEY,
      degree TEXT,
      school TEXT,
      period TEXT,
      gpa TEXT
    );

    -- seed profile row if empty
    INSERT INTO profile (id)
    VALUES (1)
    ON CONFLICT (id) DO NOTHING;
  `);
}


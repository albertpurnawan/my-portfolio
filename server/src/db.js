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

export async function seedIfEmpty() {
  const { profileSeed, projectsSeed, experiencesSeed, aboutSkillsSeed, aboutStatsSeed, aboutEducationSeed } = await import('./seed-data.js');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // Profile
    const pr = await client.query('SELECT 1 FROM profile WHERE id=1 AND (name IS NOT NULL AND name <> \'\')');
    if (pr.rowCount === 0) {
      await client.query(
        'UPDATE profile SET name=$1, location=$2, description=$3, email=$4, github=$5, linkedin=$6, profile_image=$7 WHERE id=1',
        [profileSeed.name, profileSeed.location, profileSeed.description, profileSeed.email, profileSeed.github, profileSeed.linkedin, profileSeed.profileImage]
      );
    }
    // Projects
    const pj = await client.query('SELECT COUNT(1) FROM projects');
    if ((pj.rows[0]?.count|0) == 0) {
      for (const p of projectsSeed) {
        await client.query(
          'INSERT INTO projects (title, category, description, image, tech, date, github, demo, show_github, show_demo, embed_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',
          [p.title, p.category, p.description, p.image, JSON.stringify(p.tech), p.date, p.github, p.demo, p.showGithub, p.showDemo, p.embedUrl]
        );
      }
    }
    // Experiences
    const ex = await client.query('SELECT COUNT(1) FROM experiences');
    if ((ex.rows[0]?.count|0) == 0) {
      for (const e of experiencesSeed) {
        await client.query(
          'INSERT INTO experiences (position, company, location, period, description, achievements) VALUES ($1,$2,$3,$4,$5,$6)',
          [e.position, e.company, e.location, e.period, e.description, e.achievements]
        );
      }
    }
    // About
    const ab = await client.query('SELECT (SELECT COUNT(1) FROM about_skills) AS s, (SELECT COUNT(1) FROM about_stats) AS t, (SELECT COUNT(1) FROM about_education) AS e');
    const sCount = parseInt(ab.rows[0]?.s || '0', 10);
    const tCount = parseInt(ab.rows[0]?.t || '0', 10);
    const eCount = parseInt(ab.rows[0]?.e || '0', 10);
    if (sCount === 0) {
      for (const s of aboutSkillsSeed) {
        await client.query('INSERT INTO about_skills (title, description, projects, icon) VALUES ($1,$2,$3,$4)', [s.title, s.description, s.projects, s.icon || null]);
      }
    }
    if (tCount === 0) {
      for (const s of aboutStatsSeed) {
        await client.query('INSERT INTO about_stats (number, label) VALUES ($1,$2)', [s.number, s.label]);
      }
    }
    if (eCount === 0) {
      for (const ed of aboutEducationSeed) {
        await client.query('INSERT INTO about_education (degree, school, period, gpa) VALUES ($1,$2,$3,$4)', [ed.degree, ed.school, ed.period, ed.gpa || null]);
      }
    }
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }
}

export async function reseedDefaults() {
  const { profileSeed, projectsSeed, experiencesSeed, aboutSkillsSeed, aboutStatsSeed, aboutEducationSeed } = await import('./seed-data.js');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // Clear existing data
    await client.query('DELETE FROM projects');
    await client.query('DELETE FROM experiences');
    await client.query('DELETE FROM about_skills');
    await client.query('DELETE FROM about_stats');
    await client.query('DELETE FROM about_education');
    // Reset profile
    await client.query(
      'UPDATE profile SET name=$1, location=$2, description=$3, email=$4, github=$5, linkedin=$6, profile_image=$7 WHERE id=1',
      [profileSeed.name, profileSeed.location, profileSeed.description, profileSeed.email, profileSeed.github, profileSeed.linkedin, profileSeed.profileImage]
    );
    // Insert seeds
    for (const p of projectsSeed) {
      await client.query(
        'INSERT INTO projects (title, category, description, image, tech, date, github, demo, show_github, show_demo, embed_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',
        [p.title, p.category, p.description, p.image, JSON.stringify(p.tech), p.date, p.github, p.demo, p.showGithub, p.showDemo, p.embedUrl]
      );
    }
    for (const e of experiencesSeed) {
      await client.query(
        'INSERT INTO experiences (position, company, location, period, description, achievements) VALUES ($1,$2,$3,$4,$5,$6)',
        [e.position, e.company, e.location, e.period, e.description, e.achievements]
      );
    }
    for (const s of aboutSkillsSeed) {
      await client.query('INSERT INTO about_skills (title, description, projects, icon) VALUES ($1,$2,$3,$4)', [s.title, s.description, s.projects, s.icon || null]);
    }
    for (const s of aboutStatsSeed) {
      await client.query('INSERT INTO about_stats (number, label) VALUES ($1,$2)', [s.number, s.label]);
    }
    for (const ed of aboutEducationSeed) {
      await client.query('INSERT INTO about_education (degree, school, period, gpa) VALUES ($1,$2,$3,$4)', [ed.degree, ed.school, ed.period, ed.gpa || null]);
    }
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

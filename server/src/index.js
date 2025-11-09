import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool, migrate, seedIfEmpty, reseedDefaults } from './db.js';

dotenv.config();

const app = express();
const PORT = 80;
const ADMIN_API_TOKEN = process.env.ADMIN_API_TOKEN || '';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '';

app.use(express.json({ limit: '16mb' }));
app.use(express.urlencoded({ limit: '16mb', extended: true }));
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',').map(s => s.trim()).filter(Boolean) || '*',
  credentials: false,
}));

function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

function requireAdmin(req, res, next) {
  const auth = req.headers['authorization'] || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  const passHash = req.headers['x-admin-password-hash'] || '';
  const tokenOk = ADMIN_API_TOKEN && token === ADMIN_API_TOKEN;
  const passOk = ADMIN_PASSWORD_HASH && passHash === ADMIN_PASSWORD_HASH;
  if (!tokenOk && !passOk) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// Projects
app.get('/api/projects', asyncHandler(async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM projects ORDER BY id DESC');
  const data = rows.map(r => ({
    id: r.id,
    title: r.title,
    category: r.category,
    description: r.description,
    image: r.image,
    tech: r.tech || [],
    date: r.date,
    github: r.github,
    demo: r.demo,
    showGithub: r.show_github,
    showDemo: r.show_demo,
    embedUrl: r.embed_url,
  }));
  res.json(data);
}));

app.post('/api/projects', requireAdmin, asyncHandler(async (req, res) => {
  const p = req.body || {};
  const tech = Array.isArray(p.tech) ? p.tech : [];
  const techJson = JSON.stringify(tech);
  const { rows } = await pool.query(
    `INSERT INTO projects (title, category, description, image, tech, date, github, demo, show_github, show_demo, embed_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
     RETURNING *`,
    [p.title || '', p.category || '', p.description || '', p.image || '', techJson, p.date || '', p.github || '', p.demo || '', !!p.showGithub, !!p.showDemo, p.embedUrl || '']
  );
  res.status(201).json(rows[0]);
}));

app.put('/api/projects/:id', requireAdmin, asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const p = req.body || {};
  const tech = Array.isArray(p.tech) ? p.tech : [];
  const techJson = JSON.stringify(tech);
  const { rows } = await pool.query(
    `UPDATE projects
     SET title=$1, category=$2, description=$3, image=$4, tech=$5, date=$6, github=$7, demo=$8, show_github=$9, show_demo=$10, embed_url=$11, updated_at=now()
     WHERE id=$12 RETURNING *`,
    [p.title || '', p.category || '', p.description || '', p.image || '', techJson, p.date || '', p.github || '', p.demo || '', !!p.showGithub, !!p.showDemo, p.embedUrl || '', id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
}));

app.delete('/api/projects/:id', requireAdmin, asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  await pool.query('DELETE FROM projects WHERE id=$1', [id]);
  res.status(204).end();
}));

// Experience
app.get('/api/experiences', asyncHandler(async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM experiences ORDER BY id ASC');
  res.json(rows.map(e => ({
    id: e.id,
    position: e.position,
    company: e.company,
    location: e.location,
    period: e.period,
    description: e.description || [],
    achievements: e.achievements || [],
  })));
}));

app.post('/api/experiences', requireAdmin, asyncHandler(async (req, res) => {
  const e = req.body || {};
  const { rows } = await pool.query(
    `INSERT INTO experiences (position, company, location, period, description, achievements)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [e.position, e.company, e.location, e.period, e.description || [], e.achievements || []]
  );
  res.status(201).json(rows[0]);
}));

app.put('/api/experiences/:id', requireAdmin, asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const e = req.body || {};
  const { rows } = await pool.query(
    `UPDATE experiences SET position=$1, company=$2, location=$3, period=$4, description=$5, achievements=$6 WHERE id=$7 RETURNING *`,
    [e.position, e.company, e.location, e.period, e.description || [], e.achievements || [], id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
}));

app.delete('/api/experiences/:id', requireAdmin, asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  await pool.query('DELETE FROM experiences WHERE id=$1', [id]);
  res.status(204).end();
}));

// Profile
app.get('/api/profile', asyncHandler(async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM profile WHERE id=1');
  const p = rows[0] || {};
  res.json({
    name: p.name || '',
    location: p.location || '',
    description: p.description || '',
    email: p.email || '',
    github: p.github || '',
    linkedin: p.linkedin || '',
    profileImage: p.profile_image || '',
  });
}));

app.put('/api/profile', requireAdmin, asyncHandler(async (req, res) => {
  const p = req.body || {};
  const { rows } = await pool.query(
    `UPDATE profile SET name=$1, location=$2, description=$3, email=$4, github=$5, linkedin=$6, profile_image=$7 WHERE id=1 RETURNING *`,
    [p.name, p.location, p.description, p.email, p.github, p.linkedin, p.profileImage]
  );
  res.json(rows[0]);
}));

// About
app.get('/api/about', asyncHandler(async (req, res) => {
  const [skills, stats, education] = await Promise.all([
    pool.query('SELECT * FROM about_skills ORDER BY id ASC'),
    pool.query('SELECT * FROM about_stats ORDER BY id ASC'),
    pool.query('SELECT * FROM about_education ORDER BY id ASC'),
  ]);
  res.json({
    skills: skills.rows,
    stats: stats.rows,
    education: education.rows,
  });
}));

app.put('/api/about', requireAdmin, asyncHandler(async (req, res) => {
  const a = req.body || {};
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM about_skills');
    await client.query('DELETE FROM about_stats');
    await client.query('DELETE FROM about_education');

    for (const s of a.skills || []) {
      await client.query('INSERT INTO about_skills (title, description, projects, icon) VALUES ($1,$2,$3,$4)', [s.title, s.description, s.projects, s.icon]);
    }
    for (const s of a.stats || []) {
      await client.query('INSERT INTO about_stats (number, label) VALUES ($1,$2)', [s.number, s.label]);
    }
    for (const e of a.education || []) {
      await client.query('INSERT INTO about_education (degree, school, period, gpa) VALUES ($1,$2,$3,$4)', [e.degree, e.school, e.period, e.gpa]);
    }
    await client.query('COMMIT');
    res.json({ ok: true });
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}));

app.get('/healthz', (req, res) => res.json({ ok: true }));
app.get('/api/healthz', (req, res) => res.json({ ok: true }));
app.post('/admin/reseed', requireAdmin, async (req, res) => {
  try {
    await reseedDefaults();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Reseed failed' });
  }
});
app.post('/api/admin/reseed', requireAdmin, async (req, res) => {
  try {
    await reseedDefaults();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Reseed failed' });
  }
});

// Aggregated data export/import for Admin Data Tools
app.get('/api/data', asyncHandler(async (req, res) => {
  const [projectsRes, experiencesRes, profileRes, aboutSkillsRes, aboutStatsRes, aboutEducationRes] = await Promise.all([
    pool.query('SELECT * FROM projects ORDER BY id DESC'),
    pool.query('SELECT * FROM experiences ORDER BY id ASC'),
    pool.query('SELECT * FROM profile WHERE id=1'),
    pool.query('SELECT * FROM about_skills ORDER BY id ASC'),
    pool.query('SELECT * FROM about_stats ORDER BY id ASC'),
    pool.query('SELECT * FROM about_education ORDER BY id ASC'),
  ]);
  const projects = projectsRes.rows.map(r => ({
    id: r.id,
    title: r.title,
    category: r.category,
    description: r.description,
    image: r.image,
    tech: r.tech || [],
    date: r.date,
    github: r.github,
    demo: r.demo,
    showGithub: r.show_github,
    showDemo: r.show_demo,
    embedUrl: r.embed_url,
  }));
  const experiences = experiencesRes.rows.map(e => ({
    id: e.id,
    position: e.position,
    company: e.company,
    location: e.location,
    period: e.period,
    description: e.description || [],
    achievements: e.achievements || [],
  }));
  const p = profileRes.rows[0] || {};
  const profile = {
    name: p.name || '',
    location: p.location || '',
    description: p.description || '',
    email: p.email || '',
    github: p.github || '',
    linkedin: p.linkedin || '',
    profileImage: p.profile_image || '',
  };
  res.json({
    projects,
    experiences,
    profile,
    about: {
      skills: aboutSkillsRes.rows,
      stats: aboutStatsRes.rows,
      education: aboutEducationRes.rows,
    },
  });
}));

app.post('/api/data', requireAdmin, asyncHandler(async (req, res) => {
  const body = req.body || {};
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // Replace all datasets if provided
    if (body.profile && typeof body.profile === 'object') {
      const pr = body.profile;
      await client.query(
        'UPDATE profile SET name=$1, location=$2, description=$3, email=$4, github=$5, linkedin=$6, profile_image=$7 WHERE id=1',
        [pr.name, pr.location, pr.description, pr.email, pr.github, pr.linkedin, pr.profileImage]
      );
    }
    if (Array.isArray(body.projects)) {
      await client.query('DELETE FROM projects');
      for (const p of body.projects) {
        await client.query(
          'INSERT INTO projects (title, category, description, image, tech, date, github, demo, show_github, show_demo, embed_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',
          [p.title, p.category, p.description, p.image, JSON.stringify(p.tech || []), p.date, p.github, p.demo, !!p.showGithub, !!p.showDemo, p.embedUrl]
        );
      }
    }
    if (Array.isArray(body.experiences)) {
      await client.query('DELETE FROM experiences');
      for (const e of body.experiences) {
        await client.query(
          'INSERT INTO experiences (position, company, location, period, description, achievements) VALUES ($1,$2,$3,$4,$5,$6)',
          [e.position, e.company, e.location, e.period, e.description || [], e.achievements || []]
        );
      }
    }
    if (body.about && typeof body.about === 'object') {
      const a = body.about;
      await client.query('DELETE FROM about_skills');
      await client.query('DELETE FROM about_stats');
      await client.query('DELETE FROM about_education');
      for (const s of a.skills || []) {
        await client.query('INSERT INTO about_skills (title, description, projects, icon) VALUES ($1,$2,$3,$4)', [s.title, s.description, s.projects, s.icon || null]);
      }
      for (const s of a.stats || []) {
        await client.query('INSERT INTO about_stats (number, label) VALUES ($1,$2)', [s.number, s.label]);
      }
      for (const ed of a.education || []) {
        await client.query('INSERT INTO about_education (degree, school, period, gpa) VALUES ($1,$2,$3,$4)', [ed.degree, ed.school, ed.period, ed.gpa || null]);
      }
    }
    await client.query('COMMIT');
    res.json({ ok: true });
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}));

// Error handler
app.use((err, req, res, next) => {
  console.error('API error:', err?.stack || err?.message || err);
  res.status(500).json({ error: 'Internal Server Error', message: err?.message || undefined });
});

async function start() {
  await waitForDb();
  await migrate();
  await seedIfEmpty();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API listening on port ${PORT}`);
  });
}

start().catch(err => {
  console.error('Failed to start', err);
  process.exit(1);
});

async function waitForDb(retries = 30, delayMs = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.query('SELECT 1');
      return;
    } catch (e) {
      console.warn(`DB not ready, retrying... (${i + 1}/${retries})`);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw new Error('Database not reachable after retries');
}

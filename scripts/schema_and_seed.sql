-- ============================================================================
-- SCRIPT DE BASE DE DATOS: ESQUEMA Y CARGA INICIAL (SEED)
-- Instituto de Investigaciones Lingüísticas y Postgrado (IILP) - UMSA
-- Preparado para migración a PostgreSQL / Supabase / MySQL (Fase 2)
-- ============================================================================

-- 1. TABLA: programs (Programas Académicos de Postgrado)
CREATE TABLE IF NOT EXISTS programs (
    id VARCHAR(50) PRIMARY KEY,
    slug VARCHAR(120) UNIQUE NOT NULL,
    type VARCHAR(30) NOT NULL CHECK (type IN ('doctorado', 'maestria', 'especialidad', 'diplomado', 'curso')),
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    version VARCHAR(30) NOT NULL,
    degree_awarded VARCHAR(255) NOT NULL,
    modality VARCHAR(30) NOT NULL CHECK (modality IN ('Virtual', 'Semipresencial', 'Presencial')),
    duration_months INT NOT NULL,
    academic_hours INT NOT NULL,
    credits INT,
    investment_bob NUMERIC(10, 2) NOT NULL,
    registration_fee_bob NUMERIC(10, 2) NOT NULL DEFAULT 0,
    monthly_installment_bob NUMERIC(10, 2) NOT NULL DEFAULT 0,
    installments_count INT NOT NULL DEFAULT 1,
    start_date DATE NOT NULL,
    schedule VARCHAR(255) NOT NULL,
    status VARCHAR(30) NOT NULL CHECK (status IN ('open', 'imminent', 'upcoming', 'closed')),
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    cover_image TEXT,
    banner_image TEXT,
    brochure_pdf_url TEXT,
    summary TEXT NOT NULL,
    general_objective TEXT NOT NULL,
    specific_objectives JSON,
    applicant_profile JSON,
    graduate_profile JSON,
    methodology TEXT,
    requirements JSON,
    contact_whatsapp VARCHAR(20) NOT NULL DEFAULT '59163240879',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABLA: program_modules (Módulos del Plan de Estudios)
CREATE TABLE IF NOT EXISTS program_modules (
    id VARCHAR(50) PRIMARY KEY,
    program_id VARCHAR(50) NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    module_number INT NOT NULL,
    code VARCHAR(30) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    hours INT NOT NULL DEFAULT 0,
    credits INT,
    topics JSON,
    competencies JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABLA: faculty (Claustro Docente e Investigadores)
CREATE TABLE IF NOT EXISTS faculty (
    id VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    academic_degree VARCHAR(100) NOT NULL,
    degree_abbrev VARCHAR(20) NOT NULL,
    role_title VARCHAR(150) NOT NULL,
    bio TEXT NOT NULL,
    specialty VARCHAR(150) NOT NULL,
    photo_url TEXT,
    orcid VARCHAR(50),
    country VARCHAR(60) NOT NULL DEFAULT 'Bolivia',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. TABLA: program_faculty (Relación Docente-Programa)
CREATE TABLE IF NOT EXISTS program_faculty (
    program_id VARCHAR(50) NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    faculty_id VARCHAR(50) NOT NULL REFERENCES faculty(id) ON DELETE CASCADE,
    role_in_program VARCHAR(100) NOT NULL DEFAULT 'Docente de Módulo',
    order_display INT NOT NULL DEFAULT 1,
    PRIMARY KEY (program_id, faculty_id)
);

-- 5. TABLA: publications (Revista RILTA y Producción Científica)
CREATE TABLE IF NOT EXISTS publications (
    id VARCHAR(50) PRIMARY KEY,
    type VARCHAR(30) NOT NULL DEFAULT 'rilta',
    journal_name VARCHAR(255) NOT NULL,
    volume INT NOT NULL,
    issue INT NOT NULL,
    year INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    authors JSON NOT NULL,
    abstract_es TEXT NOT NULL,
    abstract_en TEXT,
    cover_image TEXT,
    pdf_url TEXT,
    ojs_url TEXT,
    doi VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. TABLA: announcements (Convocatorias y Eventos Académicos)
CREATE TABLE IF NOT EXISTS announcements (
    id VARCHAR(50) PRIMARY KEY,
    category VARCHAR(40) NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    published_date DATE NOT NULL,
    closing_date DATE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('vigente', 'cerrada')),
    location VARCHAR(200),
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    document_pdf_url TEXT,
    action_label VARCHAR(80),
    action_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. TABLA: institute_settings (Configuración e Identidad Institucional)
CREATE TABLE IF NOT EXISTS institute_settings (
    key VARCHAR(50) PRIMARY KEY,
    value JSON NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- CARGA INICIAL DE DATOS (SEED DATA)
-- ============================================================================

-- Programas
INSERT INTO programs (
    id, slug, type, title, subtitle, version, degree_awarded, modality, 
    duration_months, academic_hours, credits, investment_bob, registration_fee_bob, 
    monthly_installment_bob, installments_count, start_date, schedule, status, 
    is_featured, cover_image, banner_image, brochure_pdf_url, summary, general_objective, 
    specific_objectives, applicant_profile, graduate_profile, methodology, requirements, contact_whatsapp
) VALUES (
    'prog-mae-lta-v',
    'maestria-en-linguistica-teorica-y-aplicada',
    'maestria',
    'Maestría en Lingüística Teórica y Aplicada',
    'Formación avanzada en investigación lingüística, descripción de lenguas originarias y aplicaciones sociolingüísticas.',
    'Versión V',
    'Magíster Scientiarum en Lingüística Teórica y Aplicada',
    'Semipresencial',
    24,
    2400,
    60,
    15000.00,
    1500.00,
    675.00,
    20,
    '2027-05-15',
    'Lunes a Miércoles de 19:00 a 22:00 (Virtual) y Sábados intensivos de 08:30 a 13:30 (Semipresencial)',
    'open',
    TRUE,
    'https://res.cloudinary.com/dgygkqlbv/image/upload/v1776879396/descarga_wgrxqr.jpg',
    'https://res.cloudinary.com/dgygkqlbv/image/upload/v1776876903/portada_u9rcdt.png',
    '/docs/brochure-maestria-lta-v.pdf',
    'La Maestría en Lingüística Teórica y Aplicada (Versión V) del IILP forma investigadores capaces de generar conocimiento original sobre el lenguaje humano y sus aplicaciones en contextos multilingües andinos y amazónicos.',
    'Formar investigadores de alto nivel académico con sólidas competencias teóricas, metodológicas y aplicadas para la investigación científica del lenguaje.',
    '["Desarrollar capacidades para el análisis fonológico, morfosintáctico y semántico.", "Capacitar en el diseño de proyectos de investigación sociolingüística y etnolingüística.", "Promover la documentación y revitalización de las lenguas originarias de Bolivia."]',
    '["Licenciatura en Lingüística, Idiomas, Literatura, Educación, Antropología o áreas afines.", "Interés comprobado en la investigación lingüística teórica o aplicada.", "Capacidad de comprensión de textos científicos en lengua extranjera."]',
    '["Genera conocimiento científico original en lingüística teórica y aplicada.", "Diseña y ejecuta proyectos de investigación sociolingüística y políticas de revitalización.", "Desempeña docencia universitaria de postgrado en ciencias del lenguaje."]',
    'Modalidad híbrida con seminarios virtuales sincrónicos, tutorías personalizadas de tesis y talleres presenciales de análisis de corpus lingüístico en la Casa Marcelo Quiroga Santa Cruz.',
    '["Título en Provisión Nacional a nivel Licenciatura (fotocopia legalizada).", "Certificado de calificaciones de pregrado.", "Fotocopia simple de Cédula de Identidad.", "Curriculum Vitae debidamente documentado.", "Perfil preliminar de tesis de maestría (3 a 5 páginas).", "Comprobante de depósito de matrícula de inscripción."]',
    '59163240879'
),
(
    'prog-dip-ei-iii',
    'diplomado-en-educacion-intercultural-y-lenguas-originarias',
    'diplomado',
    'Diplomado en Educación Intercultural y Lenguas Originarias',
    'Especialización en metodologías de enseñanza bilingüe, diseño de materiales y políticas lingüísticas educativas.',
    'Versión III',
    'Diplomado en Educación Intercultural y Lenguas Originarias',
    'Virtual',
    6,
    800,
    20,
    4000.00,
    500.00,
    700.00,
    5,
    '2027-06-01',
    'Martes y Jueves de 19:30 a 22:00 (100% Virtual sincrónico)',
    'open',
    TRUE,
    'https://res.cloudinary.com/dgygkqlbv/image/upload/v1776879396/descarga_wgrxqr.jpg',
    'https://res.cloudinary.com/dgygkqlbv/image/upload/v1776876903/portada_u9rcdt.png',
    '/docs/brochure-diplomado-ei-iii.pdf',
    'Especialización práctica orientada a docentes de aula, educadores y gestores pedagógicos interesados en articular la diversidad cultural y el bilingüismo en procesos de enseñanza-aprendizaje.',
    'Fortalecer las competencias metodológicas y pedagógicas de los educadores para la implementación efectiva del modelo educativo sociocomunitario productivo intercultural y plurilingüe.',
    '["Analizar el marco normativo y conceptual de la educación intracultural, intercultural y plurilingüe.", "Diseñar materiales educativos contextualizados en lenguas originarias y castellano.", "Aplicar metodologías innovadoras para la enseñanza del bilingüismo coordinado."]',
    '["Profesionales con título docente (Normalistas / ESFM) o licenciatura en Educación, Lingüística, Pedagogía o Ciencias Humanas.", "Docentes en ejercicio en instituciones fiscales, de convenio o privadas."]',
    '["Aplica estrategias didácticas para la enseñanza de lenguas originarias como primera o segunda lengua.", "Elabora planes curriculares y textos escolares bilingües e interculturales.", "Asesora a comunidades e instituciones educativas en políticas de normalización lingüística."]',
    '100% virtual sincrónico mediante plataforma Moodle UMSA y sesiones de taller en Zoom interactivo con retroalimentación personalizada.',
    '["Título en Provisión Nacional (fotocopia legalizada o simple verificable).", "Fotocopia de Cédula de Identidad.", "Curriculum Vitae resumido.", "Formulario de preinscripción debidamente llenado.", "Comprobante de depósito de matrícula."]',
    '59163240879'
),
(
    'prog-dip-lla-ii',
    'diplomado-en-linguistica-y-lengua-aymara',
    'diplomado',
    'Diplomado en Lingüística y Lengua Aymara',
    'Estudio sistemático de la estructura gramatical, semántica, pragmática y escritura estandarizada del idioma aymara.',
    'Versión II',
    'Diplomado en Lingüística y Lengua Aymara',
    'Virtual',
    6,
    800,
    20,
    4000.00,
    500.00,
    700.00,
    5,
    '2027-07-15',
    'Lunes y Miércoles de 19:00 a 21:30 (100% Virtual sincrónico)',
    'imminent',
    FALSE,
    'https://res.cloudinary.com/dgygkqlbv/image/upload/v1776879396/descarga_wgrxqr.jpg',
    'https://res.cloudinary.com/dgygkqlbv/image/upload/v1776876903/portada_u9rcdt.png',
    '/docs/brochure-diplomado-aymara-ii.pdf',
    'Profundización en la lingüística formal y aplicada del aymara: estructura morfofonológica, sufijación compleja, pragmática andina y traducción especializada.',
    'Proporcionar un conocimiento analítico riguroso sobre el sistema lingüístico del aymara contemporáneo y sus herramientas de traducción e investigación.',
    '["Dominar la fonología y el sistema fonémico consonántico tripartito del aymara.", "Analizar los procesos de sufijación flexiva y derivativa con precisión gramatical.", "Capacitar en traducción y redacción de textos formales en lengua originaria."]',
    '["Hablantes nativos o aprendientes de nivel intermedio con licenciatura en cualquier área del conocimiento.", "Traductores, comunicadores e investigadores del mundo andino."]',
    '["Describe y explica con solidez científica los procesos gramaticales del aymara.", "Produce textos académicos y normativos en aymara unificado.", "Participa en proyectos de peritaje lingüístico y traducción oficial."]',
    'Clases virtuales sincrónicas apoyadas con grabaciones de audio nativo, corpus textuales analizados en clase y prácticas guiadas de redacción.',
    '["Fotocopia de Título de Licenciatura en Provisión Nacional.", "Fotocopia de Cédula de Identidad.", "Curriculum Vitae actualizado.", "Carta de motivación académica.", "Comprobante de depósito de matrícula."]',
    '59163240879'
);

-- Claustro Docente
INSERT INTO faculty (id, full_name, academic_degree, degree_abbrev, role_title, bio, specialty, photo_url, country) VALUES
('fac-carlos-quispe', 'Carlos Quispe Mamani', 'Doctor en Lingüística Teórica', 'Dr.', 'Docente Investigador Titular — Director IILP', 'Doctor en Lingüística por la Universidad de Texas en Austin. Especialista en fonología y morfología de lenguas andinas, con más de 25 años de trayectoria académica en la UMSA.', 'Fonología y Lingüística Andina', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', 'Bolivia'),
('fac-maria-gutierrez', 'María Elena Gutierrez', 'Magíster en Sociolingüística y Bilingüismo', 'M.Sc.', 'Coordinadora Académica de Postgrado', 'M.Sc. por la Universidad Mayor de San Simón / PROEIB Andes. Investigadora de políticas lingüísticas, contacto de lenguas y actitudes hacia las lenguas originarias.', 'Sociolingüística y Lenguas en Contacto', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', 'Bolivia'),
('fac-alberto-condori', 'Alberto Condori Flores', 'Doctor en Ciencias del Lenguaje', 'Dr.', 'Docente de Posgrado e Investigador RILTA', 'Doctor por la Universidad de Salamanca. Autor de múltiples libros sobre gramática aymara, revitalización y traducción especializada en los Andes.', 'Morfosintaxis Aymara y Semántica', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', 'Bolivia'),
('fac-lucia-vargas', 'Lucía Vargas Miranda', 'Doctora en Antropología Lingüística', 'Dra.', 'Docente Invitada Internacional', 'Doctora por El Colegio de México (COLMEX). Especialista en análisis del discurso, etnolingüística y pragmática cultural en comunidades originarias.', 'Etnolingüística y Análisis del Discurso', 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80', 'México / Bolivia');

-- Publicaciones RILTA
INSERT INTO publications (id, type, journal_name, volume, issue, year, title, authors, abstract_es, abstract_en, cover_image, pdf_url, ojs_url) VALUES
('pub-rilta-10', 'rilta', 'RILTA — Revista de Investigaciones en Lingüística Teórica y Aplicada', 10, 1, 2024, 'Investigaciones recientes en lingüística aplicada', '["Comité Editorial IILP"]', 'El volumen 10 de la Revista RILTA reúne investigaciones recientes en lingüística aplicada, didáctica del castellano andino y tecnologías de procesamiento de lenguas originarias.', 'Volume 10 of RILTA Journal gathers recent research in applied linguistics, Andean Spanish didactics, and indigenous language processing technologies.', 'https://ojs.umsa.bo/public/journals/22/cover_issue_144_es.jpg', 'https://ojs.umsa.bo/ojs/index.php/rilta/issue/view/144', 'https://ojs.umsa.bo/ojs/index.php/rilta/issue/view/144'),
('pub-rilta-09', 'rilta', 'RILTA — Revista de Investigaciones en Lingüística Teórica y Aplicada', 9, 1, 2023, 'Estudios sociolingüísticos', '["Comité Editorial IILP"]', 'El volumen 9 de RILTA presenta estudios sociolingüísticos sobre el bilingüismo aymara-castellano, actitudes lingüísticas y políticas de normalización en Bolivia.', 'Volume 9 of RILTA presents sociolinguistic studies on Aymara-Spanish bilingualism, linguistic attitudes and normalization policies in Bolivia.', 'https://ojs.umsa.bo/public/journals/22/cover_issue_140_es.jpg', 'https://ojs.umsa.bo/ojs/index.php/rilta/issue/view/140', 'https://ojs.umsa.bo/ojs/index.php/rilta/issue/view/140'),
('pub-rilta-06', 'rilta', 'RILTA — Revista de Investigaciones en Lingüística Teórica y Aplicada', 6, 1, 2020, 'Análisis del discurso contemporáneo', '["Comité Editorial IILP"]', 'El volumen 6 de RILTA se concentra en el análisis del discurso contemporáneo, explorando las prácticas discursivas en medios e instituciones del área andina.', 'Volume 6 of RILTA focuses on contemporary discourse analysis, exploring discursive practices in media and institutions of the Andean region.', 'https://ojs.umsa.bo/public/journals/22/cover_issue_128_es_ES.jpg', 'https://ojs.umsa.bo/ojs/index.php/rilta/issue/view/128', 'https://ojs.umsa.bo/ojs/index.php/rilta/issue/view/128');

-- Convocatorias
INSERT INTO announcements (id, category, title, slug, published_date, closing_date, status, location, summary, content, image_url, document_pdf_url, action_label, action_url) VALUES
('call-mae-lta-v', 'convocatoria_estudiantes', 'Admisión Maestría en Lingüística Teórica y Aplicada — Versión V', 'admision-maestria-linguistica-v', '2027-01-15', '2027-03-01', 'vigente', 'IILP — Casa Marcelo Quiroga Santa Cruz, UMSA', 'Se abren postulaciones para la quinta versión de la Maestría en Lingüística Teórica y Aplicada. Programa de 24 meses, 2.400 horas académicas y titulación oficial de la UMSA.', 'El Instituto de Investigaciones Lingüísticas y Postgrado convoca a profesionales a postular a la Maestría en Lingüística Teórica y Aplicada, Versión V.', 'https://res.cloudinary.com/dgygkqlbv/image/upload/v1776879396/descarga_wgrxqr.jpg', '/docs/maestria-lta-v-convocatoria.pdf', 'Consultar por WhatsApp', 'https://wa.me/59163240879?text=Hola%2C%20quisiera%20información%20sobre%20la%20Maestría%20en%20Lingüística%20Versión%20V'),
('call-beca-rilta', 'convocatoria_docente', 'Beca de Investigación RILTA 2027', 'beca-investigacion-rilta-2027', '2027-01-20', '2027-04-30', 'vigente', 'IILP — UMSA', 'Convocatoria abierta para la recepción de artículos científicos para el Volumen 11 de la Revista RILTA. Se otorgarán becas parciales a investigaciones destacadas.', 'El Comité Editorial de la Revista RILTA convoca a investigadores nacionales e internacionales a enviar artículos originales.', '', '/docs/convocatoria-rilta-2027.pdf', 'Enviar artículo', 'mailto:iilp@umsa.bo?subject=Postulación%20Artículo%20RILTA%20Vol.%2011'),
('call-sem-andina', 'evento_academico', 'Seminario Internacional de Lingüística Andina 2027', 'seminario-linguistica-andina-2027', '2027-02-01', '2027-06-12', 'vigente', 'Auditorio Casa Marcelo Quiroga Santa Cruz — UMSA, La Paz', 'Seminario internacional con ponentes de Bolivia, Perú y Ecuador sobre investigación en lenguas andinas y revitalización lingüística.', 'El IILP organiza el Seminario Internacional de Lingüística Andina que reunirá a investigadores para presentar avances en lenguas originarias.', '', '', 'Registrarse', 'https://wa.me/59163240879?text=Hola%2C%20quisiera%20registrarme%20al%20Seminario%20de%20Lingüística%20Andina%202027');

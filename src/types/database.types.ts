// ──────────────────────────────────────────────
// Modelo relacional del IILP — listo para MySQL / Supabase
// ──────────────────────────────────────────────

/** Programas de Postgrado (Tabla: programs) */
export interface Program {
  id: string;
  slug: string;
  type: 'maestria' | 'diplomado' | 'doctorado' | 'especialidad' | 'curso';
  title: string;
  subtitle: string;
  version: string;
  degree_awarded: string;
  modality: 'Virtual' | 'Semipresencial' | 'Presencial';
  duration_months: number;
  academic_hours: number;
  credits?: number;
  investment_bob: number;
  registration_fee_bob: number;
  installments_count: number;
  start_date: string;
  schedule: string;
  status: 'open' | 'imminent' | 'upcoming' | 'closed';
  is_featured: boolean;
  cover_image: string;
  banner_image: string;
  brochure_pdf_url: string;
  summary: string;
  general_objective: string;
  specific_objectives: string[];
  applicant_profile: string[];
  graduate_profile: string[];
  target_audience: string[];
  requirements: string[];
  methodology: string;
  contact_whatsapp: string;
}

/** Módulos del Plan de Estudios (Tabla: program_modules) */
export interface Module {
  id: string;
  program_id: string;
  module_number: number;
  code: string;
  title: string;
  description: string;
  hours: number;
  credits?: number;
  topics: string[];
}

/** Docentes y Claustro Académico (Tabla: faculty) */
export interface Faculty {
  id: string;
  full_name: string;
  academic_degree: string;
  degree_abbrev: string;
  role_title: string;
  bio: string;
  specialty: string;
  photo_url: string;
  orcid?: string;
  country: string;
}

/** Relación Programa-Docente (Tabla: program_faculty) */
export interface ProgramFacultyRelation {
  program_id: string;
  faculty_id: string;
  role_in_program: string;
  order_display: number;
}

/** Revista RILTA y Publicaciones (Tabla: publications) */
export interface Publication {
  id: string;
  type: 'rilta' | 'libro' | 'cuaderno_investigacion';
  journal_name: string;
  volume: number;
  issue: number;
  year: number;
  title: string;
  authors: string[];
  abstract_es: string;
  abstract_en: string;
  cover_image: string;
  pdf_url: string;
  ojs_url?: string;
  doi?: string;
}

/** Convocatorias y Eventos (Tabla: announcements) */
export interface Announcement {
  id: string;
  category: 'convocatoria_docente' | 'convocatoria_estudiantes' | 'evento_academico' | 'noticia';
  title: string;
  slug: string;
  published_date: string;
  closing_date?: string;
  status: 'vigente' | 'cerrada';
  location: string;
  summary: string;
  content: string;
  image_url: string;
  document_pdf_url?: string;
  action_label?: string;
  action_url?: string;
}

/** Línea de investigación */
export interface ResearchLine {
  id: string;
  title: string;
  description: string;
  icon: string;
}

/** Autoridad institucional */
export interface Authority {
  name: string;
  position: string;
  photo_url: string;
}

/** Red social */
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

/** Configuración Institucional (Tabla: institute_settings) */
export interface InstituteInfo {
  name: string;
  acronym: string;
  university: string;
  faculty: string;
  career: string;
  address: string;
  phone: string;
  email: string;
  main_whatsapp: string;
  office_hours: string;
  map_embed_url: string;
  social_links: SocialLink[];
  mission: string;
  vision: string;
  objectives: string;
  research_lines: ResearchLine[];
  authorities: Authority[];
  logos: {
    umsa: string;
    faculty: string;
    career: string;
    iilp: string;
    hero_background: string;
  };
}

/** Helpers de tipo para las pestañas del catálogo */
export type ProgramType = Program['type'];
export type ProgramStatus = Program['status'];

export const PROGRAM_TYPE_LABELS: Record<ProgramType, string> = {
  maestria: 'Maestría',
  diplomado: 'Diplomado',
  doctorado: 'Doctorado',
  especialidad: 'Especialidad',
  curso: 'Curso',
};

export const PROGRAM_STATUS_LABELS: Record<ProgramStatus, string> = {
  open: 'Inscripciones Abiertas',
  imminent: 'Inicio Inminente',
  upcoming: 'Próximamente',
  closed: 'Cerrado',
};

export const PROGRAM_STATUS_COLORS: Record<ProgramStatus, string> = {
  open: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  imminent: 'bg-amber-100 text-amber-800 border-amber-200',
  upcoming: 'bg-primary-100 text-primary-700 border-primary-200',
  closed: 'bg-gray-100 text-gray-600 border-gray-200',
};

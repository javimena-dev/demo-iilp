# Product

<!-- impeccable:product-schema 1 -->

## Platform
web

## Stack
React + Vite + TypeScript + Tailwind CSS (Frontend desacoplado de alto rendimiento, estructurado con modelos de datos JSON normalizados listos para migración directa a base de datos relacional MySQL/PostgreSQL/Supabase).

## Users
1. **Profesionales y Docentes:** Egresados universitarios y educadores en Bolivia e Iberoamérica que buscan programas de postgrado (Maestrías, Diplomados, Especialidades, Doctorados) con valor curricular y titulación oficial de la UMSA.
2. **Investigadores y Lingüistas:** Comunidad académica interesada en lingüística teórica y aplicada, lenguas originarias, sociolingüística y producción científica de la Revista RILTA.
3. **Postulantes en toma de decisión:** Usuarios que evalúan modalidad (virtual/semipresencial), inversión económica, horarios y requieren atención personalizada inmediata por WhatsApp.

## Product Purpose
Construir el portal web oficial y centro de admisiones del Instituto de Investigaciones Lingüísticas y Postgrado (IILP) de la UMSA, fusionando la exhaustividad curricular, jerarquía y autoridad formativa de TECH Universidad con la identidad institucional, cercanía cultural y alta conversión por WhatsApp de Posgrado UPEA/UMSA.

## Positioning
El referente estatal y científico de excelencia en investigación lingüística y formación postgradual en Bolivia, combinando el rigor académico y prestigio histórico de la UMSA con una plataforma digital moderna, ágil y transparente.

## Operating Context
- Alto tráfico proveniente de dispositivos móviles (redes sociales y WhatsApp en Bolivia) y escritorios institucionales.
- Conversión orientada a WhatsApp como canal primordial de asesoría y preinscripción académica en el contexto boliviano (+591 63240879).
- Ubicación física y académica: Casa Marcelo Quiroga Santa Cruz - UMSA, Av. 6 de Agosto Nro. 2118, La Paz, Bolivia (Tel. +591 2 244-0961, email iilp@umsa.bo).
- Arquitectura basada en datos JSON estructurados que actúan como "Base de Datos Local" (`programs.json`, `modules.json`, `faculty.json`, `calls.json`, `publications.json`, `institute.json`) con tipos TypeScript exhaustivos, garantizando que el MVP funcione al 100% de forma estática o servida, y permitiendo una posterior sustitución por API REST o consultas SQL directas sin alterar los componentes visuales.

## Capabilities and Constraints
- **MVP completo sin administrador:** Toda la experiencia pública (Home, Catálogo con filtros y búsqueda en tiempo real, Ficha extensa de programa estilo TECH con URLs individuales `/programas/:slug`, Visor de Revista RILTA, Convocatorias vigentes/cerradas y Contacto) es completamente funcional.
- **Generador de WhatsApp Contextual:** Cada CTA genera enlaces directos a WhatsApp (+591 63240879) con mensajes dinámicos que especifican el programa, la versión y la intención del postulante.
- **Sin enlaces ciegos (`#`) ni botones rotos:** Eliminación de los problemas del prototipo anterior (donde "Postular" o "Descargar PDF" no hacían nada); todos los botones conducen a acciones reales, modales informativos o enlaces verificados (PDFs oficiales, OJS de la UMSA, ubicación en mapa, canales institucionales).
- **Sin marcas de constructores visuales:** Reemplazo de la insignia Lovable por un pie de página institucional UMSA 100% profesional.

## Brand Commitments
- **Paleta UMSA-IILP:** Azul institucional `#0F4794`, Azul noche profundo `#082E54`, Dorado de distinción académica `#F4B63D` y Borgoña de alerta/cupos `#9E1B46`.
- **Logotipos e Identidad Oficial:**
  - Logo UMSA: `https://free-images.com/lg/2a00/umsa_logo_svg.jpg`
  - Logo Facultad de Humanidades: `https://res.cloudinary.com/dgygkqlbv/image/upload/v1776877391/logo_facultad_v6hujz.png`
  - Logo Carrera de Lingüística: `https://res.cloudinary.com/dgygkqlbv/image/upload/v1776877409/LINGUISTICA_mioqw7.png`
  - Logo IILP Hero: `https://res.cloudinary.com/dgygkqlbv/image/upload/v1776877702/IILP_-_Editada_mujaj7.png`
  - Fondo Hero: `https://res.cloudinary.com/dgygkqlbv/image/upload/v1776876903/portada_u9rcdt.png`
- **Tipografía:** Montserrat / Plus Jakarta Sans para titulares con carácter institucional; Inter / Source Sans 3 para lectura académica sin fatiga.
- **Inspiración equilibrada:** Estructura modular y páginas profundas de TECH (60%) + Identidad cultural, franja superior, catálogo con chips y canal de WhatsApp de Posgrado UPEA (40%).

## Evidence on Hand
- Datos reales extraídos de la propuesta previa de la institución (`https://propuestaiilp.lovable.app/`).
- Portadas y artículos reales de la Revista RILTA en el repositorio OJS UMSA (`https://ojs.umsa.bo/public/journals/22/cover_issue_...`).
- Referencias de producción analizadas: TECH Universidad (arquitectura de landing de máster oficial) y Posgrado UPEA (portal oficial de programas en Bolivia).

## Product Principles
1. **Claridad y Densidad Informativa:** La oferta académica muestra de inmediato carga horaria, créditos, inversión, modalidad y fechas clave.
2. **Conversión Ágil y Sin Fricción:** Rutas directas de contacto para que el postulante resuelva dudas y formalice su preinscripción en segundos.
3. **Calidad de Artesanía Impecable (Impeccable Craft):** Contraste estricto, microinteracciones sobrias, diseño totalmente adaptable y rendimiento de carga instantáneo.
4. **Preparación Estructural para Base de Datos:** Los datos JSON siguen esquemas relacionales normalizados con claves primarias, foráneas y atributos indexables.

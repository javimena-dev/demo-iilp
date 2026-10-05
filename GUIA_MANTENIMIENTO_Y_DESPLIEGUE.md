# Guía de Mantenimiento, Despliegue y Hoja de Ruta — IILP UMSA

Este documento proporciona las instrucciones completas para la gestión de contenidos en el **MVP Completo** del portal web del **Instituto de Investigaciones Lingüísticas y Postgrado (IILP) — UMSA**, así como los pasos para el despliegue en producción y la migración a Base de Datos en la Fase 2.

---

## 1. Cómo Actualizar Datos sin Necesidad de Base de Datos (Modo JSON)

Todos los contenidos académicos, convocatorias y publicaciones están centralizados en la carpeta `src/data/` en formato JSON estructurado:

```
src/data/
├── programs.json          # Catálogo completo de programas de postgrado
├── modules.json           # Módulos y temarios por programa
├── faculty.json           # Claustro docente e investigadores
├── program_faculty.json   # Asignación de docentes a programas
├── publications.json      # Revista RILTA y publicaciones científicas
├── calls.json             # Convocatorias docentes, estudiantiles y eventos
└── institute.json         # Información institucional, contacto, autoridades y logos
```

### 1.1. Modificar o Añadir un Programa de Postgrado (`programs.json`)
Cada programa cuenta con los siguientes campos clave:
- `slug`: Identificador único en la URL (ej. `maestria-en-linguistica-teorica-y-aplicada`).
- `status`: Estado de la convocatoria:
  - `"open"`: *Inscripciones Abiertas* (etiqueta verde con animación).
  - `"imminent"`: *Inicio Inminente* (etiqueta dorada de urgencia).
  - `"upcoming"`: *Próximamente* (etiqueta azul informativa).
  - `"closed"`: *Convocatoria Concluida*.
- `investment_bob`: Costo total en Bolivianos (ej. `15000`).
- `registration_fee_bob`: Matrícula inicial en Bs.
- `installments_count`: Cantidad de cuotas mensuales.
- `contact_whatsapp`: Número de WhatsApp de atención (por defecto `59163240879`).

> **Ejemplo de edición de fecha o costo:**  
> Simplemente edite el campo `"start_date": "2027-06-01"` y `"investment_bob": 16000`, guarde el archivo y ejecute `npm run build`.

### 1.2. Añadir un Nuevo Volumen de la Revista RILTA (`publications.json`)
Para publicar un nuevo volumen o número:
```json
{
  "id": "pub-rilta-11",
  "type": "rilta",
  "journal_name": "RILTA — Revista de Investigaciones en Lingüística Teórica y Aplicada",
  "volume": 11,
  "issue": 1,
  "year": 2027,
  "title": "Nuevas perspectivas en la revitalización de lenguas originarias",
  "authors": ["Comité Editorial IILP"],
  "abstract_es": "Resumen completo del volumen en español...",
  "abstract_en": "Complete abstract of the volume in English...",
  "cover_image": "https://enlace-a-la-portada.jpg",
  "pdf_url": "https://ojs.umsa.bo/ojs/index.php/rilta/issue/view/145",
  "ojs_url": "https://ojs.umsa.bo/ojs/index.php/rilta/issue/view/145"
}
```

### 1.3. Publicar o Cerrar una Convocatoria (`calls.json`)
- Para cerrar una convocatoria que ya venció, cambie `"status": "vigente"` por `"status": "cerrada"`.
- Los botones de acción (`action_url`) admiten enlaces directos a WhatsApp, correos `mailto:` o descargas de PDF.

---

## 2. Compilación y Despliegue en Servidores Web (HostGator / cPanel / Apache)

El proyecto está optimizado como una **Single Page Application (SPA)** de alto rendimiento.

### Paso 1: Generar la Versión de Producción
En la terminal del proyecto, ejecute:
```bash
npm run build
```
Esto creará la carpeta optimizada `dist/` con todos los archivos minificados HTML, CSS, JavaScript y activos estáticos.

### Paso 2: Subida de Archivos vía Administrador de Archivos de cPanel o FTP
1. Ingrese a su panel de control cPanel (HostGator o servidor universitario UMSA).
2. Abra el **Administrador de Archivos** y navegue a la carpeta raíz pública:
   - `public_html/` (o el subdominio correspondiente, ej. `postgrado.iilp.umsa.bo`).
3. Comprima el contenido interno de la carpeta `dist/` en un archivo `.zip`.
4. Suba el `.zip` y extráigalo directamente dentro de `public_html/`.

### Paso 3: Configuración del Enrutamiento SPA (`.htaccess`)
Para evitar el error `404 Not Found` cuando los usuarios recarguen páginas internas como `/programas/maestria-en-linguistica-teorica-y-aplicada` o `/rilta`, el proyecto ya incluye el archivo `.htaccess` configurado en `public/.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```
*Asegúrese de que el archivo `.htaccess` esté visible en la raíz de su `public_html`.*

---

## 3. Hoja de Ruta para Fase 2: Migración a Base de Datos y Panel de Administración

Cuando la institución decida habilitar un panel de administración con base de datos propia:

### 3.1. Ejecución del Script SQL
Se ha creado el archivo [scripts/schema_and_seed.sql](file:///c:/Users/XAVI/Documents/PROYECTOS%202026/IILP/scripts/schema_and_seed.sql), el cual contiene:
1. Las tablas relacionales normalizadas (`programs`, `program_modules`, `faculty`, `program_faculty`, `publications`, `announcements`, `institute_settings`).
2. Los datos de prueba reales (Seed data) cargados con los programas actuales del IILP.

Este script es directamente compatible con:
- **Supabase / PostgreSQL:** Se puede copiar y pegar en el *SQL Editor* de Supabase para tener la base de datos lista en 1 minuto.
- **MySQL / MariaDB (cPanel phpMyAdmin):** Compatible con adaptaciones mínimas de sintaxis si se requiere utilizar la base de datos MySQL provista por HostGator.

### 3.2. Conexión de la Interfaz al Backend
Gracias a que todos los tipos de TypeScript en `src/types/database.types.ts` son idénticos a los modelos de base de datos, para conectar la web solo se requiere cambiar la fuente de importación de datos por un cliente API o Supabase:

```typescript
// En lugar de:
// import programsData from '@/data/programs.json';

// En Fase 2:
import { supabase } from '@/lib/supabaseClient';
const { data: programs } = await supabase.from('programs').select('*');
```
Los componentes visuales del catálogo, la ficha TECH y los filtros seguirán funcionando con exactitud sin requerir reescritura.

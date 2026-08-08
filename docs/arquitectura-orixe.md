# Arquitectura de ORIXE

## 1. Filosofía del proyecto

ORIXE es una plataforma orientada a la exploración del territorio a través de misiones. El producto principal no es la web, sino la ficha de misión: un elemento estructurado, reutilizable y preparado para múltiples representaciones.

La filosofía central es simple:

- una misión = un único archivo de contenido
- una fuente de verdad = una sola
- toda representación posterior se genera automáticamente
- nunca debe duplicarse información entre web, ficha imprimible, mapa, SEO o buscador

Este enfoque permite que ORIXE evolucione como un sistema de datos, no como un conjunto de páginas manuales.

### Qué problema resuelve

El proyecto necesita un modelo que permita:

- añadir nuevas misiones sin reescribir código
- mantener una base de contenido escalable
- generar automáticamente varias representaciones del mismo contenido
- preparar el sistema para crecer hacia filtros, mapas, SEO avanzado, exportación a PDF y futuro panel de administración

### Objetivos del proyecto

- mantener una arquitectura simple y mantenible
- priorizar rendimiento y SEO
- separar contenido, presentación y generación
- preparar el proyecto para miles de misiones
- garantizar que la ficha de misión sea el centro del sistema

---

## 2. Arquitectura

### Estructura de carpetas

```text
src/
├── components/
├── content/
│   ├── missions/
│   └── config.ts
├── layouts/
├── lib/
├── pages/
│   ├── index.astro
│   └── misiones/
│       ├── index.astro
│       └── [slug].astro
└── styles/
```

### Justificación de cada carpeta

- src/components: componentes reutilizables para web y ficha imprimible
- src/content: fuente única de contenido del proyecto, mediante Astro Content Collections
- src/content/missions: almacenamiento definitivo de las misiones, cada una en un archivo YAML independiente
- src/layouts: estructura base de las páginas
- src/lib: utilidades de lectura y transformación de datos
- src/pages: rutas de Astro que generan automáticamente páginas web
- src/styles: estilos globales y estilos específicos para impresión

### Tecnologías utilizadas

- Astro como base del proyecto
- Astro Content Collections para gestionar el contenido estructurado
- YAML como formato para las misiones
- CSS propio para la capa visual
- HTML y CSS de impresión para la ficha A4

### Razones para utilizar Astro Content Collections

Astro Content Collections es la opción más adecuada porque:

- permite almacenar el contenido fuera del código
- ofrece una estructura clara y oficial para proyectos de Astro
- facilita la validación del contenido
- prepara el sistema para escalar sin introducir lógica manual por misión
- permite generar numerosas vistas desde una sola fuente de datos

---

## 3. Modelo de datos

Cada misión se representa mediante un archivo YAML único dentro de src/content/missions.

### Identificadores

Cada misión debe tener dos identificadores:

- id: identificador permanente e inmutable, por ejemplo orx-0001
- slug: identificador de URL, por ejemplo meis

Reglas:

- el id nunca debe cambiarse una vez creado
- el slug puede cambiarse en el futuro sin romper referencias internas si el sistema está bien diseñado
- el sistema debe utilizar internamente el id cuando sea necesario
- las URLs deben construirse a partir del slug

### Estructura oficial del archivo de misión

Cada archivo YAML debe contener los siguientes campos.

#### Campos obligatorios

- id: string
- slug: string
- title: string
- municipality: string
- province: string
- category: string
- ageRecommended: string
- duration: string
- difficulty: string
- image: string
- descriptionShort: string
- descriptionLong: string
- objective: string
- solution: string

#### Campos opcionales

- subtitle: string
- coordinates: object con lat y lng
- distance: string
- accessibility: string
- gallery: array de strings
- materials: array de strings
- instructions: array de strings
- challenge: array de objetos flexibles
- clues: array de strings
- badge: string
- googleMaps: string
- recommendations: array de strings
- warnings: array de strings
- tags: array de strings
- seoTitle: string
- seoDescription: string

### Descripción de los campos principales

- id: identificador estable y persistente de la misión
- slug: ruta de la misión en la web
- title: título visible de la misión
- subtitle: subtítulo complementario
- municipality: municipio donde se desarrolla
- province: provincia
- coordinates: coordenadas geográficas para futuras integraciones de mapa
- category: categoría principal de la misión
- ageRecommended: edad recomendada
- duration: tiempo estimado
- distance: distancia aproximada
- difficulty: dificultad
- accessibility: información de accesibilidad
- image: imagen principal usada por la web y la ficha
- gallery: galería de imágenes complementaria
- descriptionShort: resumen corto para tarjetas y SEO
- descriptionLong: descripción completa para la web y la ficha
- objective: objetivo pedagógico o narrativo
- materials: materiales necesarios
- instructions: instrucciones paso a paso
- challenge: estructura flexible para retos futuros
- clues: pistas opcionales
- solution: solución o cierre de la misión
- badge: referencia a la insignia asociada
- googleMaps: enlace a Google Maps
- recommendations: recomendaciones de uso
- warnings: advertencias o condiciones
- tags: etiquetas para filtros y búsquedas
- seoTitle: título para SEO
- seoDescription: descripción para SEO

### Cómo añadir nuevos campos en el futuro

Para crecer sin romper el sistema:

1. añadir el nuevo campo al esquema de content collection
2. actualizar el modelo de datos de la misión si es necesario
3. incluir el campo en la representación que lo use
4. mantener el campo opcional si aún no es obligatorio

La clave es que el sistema debe trabajar sobre un esquema central, no sobre páginas o componentes aislados.

---

## 4. Flujo de generación

El sistema está pensado para que una sola misión genere automáticamente todas las representaciones necesarias.

### Paso 1: crear el archivo YAML

Se crea un archivo en src/content/missions con un nombre estable y único.

### Paso 2: Astro Content Collections lo lee

Astro lee el archivo, valida su estructura y lo convierte en un entry de la colección missions.

### Paso 3: la capa de datos lo expone a la aplicación

Mediante utilidades en src/lib se accede a la colección y se obtiene:

- listado de misiones
- una misión concreta por id
- una misión concreta por slug

### Paso 4: la web se genera automáticamente

Las rutas dinámicas de Astro generan:

- la página web de la misión
- el listado general de misiones

### Paso 5: la ficha imprimible se genera automáticamente

Se genera otra ruta independiente para la versión imprimible:

- /misiones/[slug]/print

### Paso 6: los datos quedan listos para otros usos

Los mismos datos pueden usarse para:

- mapa
- buscador
- filtros
- categorías
- sitemap
- SEO
- Open Graph
- Schema.org

### Paso 7: se mantienen sin duplicación

No se escribe la misma información dos veces. Todo parte del mismo archivo YAML.

---

## 5. Ficha imprimible

La ficha imprimible es un elemento principal del proyecto y no debe depender de JavaScript para funcionar.

### Por qué es HTML + CSS de impresión

Se ha elegido HTML + CSS de impresión porque:

- permite generar una versión visual limpia y estructurada
- facilita el diseño para A4
- evita depender de una librería externa para PDF
- mantiene la ficha alineada con el contenido fuente
- permite exportarla fácilmente a PDF desde el navegador en el futuro

### Por qué no se generan PDFs ahora

No se generan PDFs directamente porque el objetivo actual es estabilizar la arquitectura y mantener el sistema simple. El PDF puede añadirse más adelante sin modificar las misiones, simplemente ajustando la salida de la ficha imprimible.

### Cómo se exportará a PDF en el futuro

En el futuro, la ruta /misiones/[slug]/print podrá abrirse en el navegador y exportarse como PDF desde la propia impresión del navegador. Esto evita introducir un flujo adicional en la arquitectura actual y mantiene el contenido centralizado.

---

## 6. Cómo crear una misión nueva

Para añadir una nueva misión, el desarrollador debe seguir este proceso:

1. crear un nuevo archivo YAML en src/content/missions
2. nombrarlo siguiendo el formato oficial:
   - orx-0001-meis.yaml
   - orx-0002-catoira.yaml
3. usar un id estable y permanente, por ejemplo orx-0002
4. definir un slug para la URL, por ejemplo catoira
5. completar los campos obligatorios y opcionales
6. guardar el archivo

### Qué ocurre automáticamente después

Una vez creado el archivo:

- aparece en el listado de misiones
- se genera la página web de la misión
- se genera la ficha imprimible
- queda disponible para futuras integraciones de mapa, buscador y SEO

No es necesario crear páginas manuales ni modificar listas ni mapas.

---

## 7. Escalabilidad

Esta arquitectura soporta miles de misiones porque:

- el contenido está almacenado de forma estructurada y uniforme
- las rutas se generan automáticamente desde los datos
- no existe lógica específica para una misión concreta
- los componentes son reutilizables
- la fuente de verdad es única
- el sistema está preparado para crecimiento horizontal sin reescribir estructuras base

---

## 8. Futuras ampliaciones

Esta arquitectura deja preparado el proyecto para evoluciones posteriores sin romper la base.

### Sistema de usuarios

Se podrá añadir un sistema de usuarios sin modificar la lógica base de las misiones, simplemente integrando una capa adicional de autenticación y perfiles.

### Insignias

Las insignias ya se contemplan como un campo de la ficha y podrán ampliarse con lógica de desbloqueo y seguimiento.

### Validación de retos

El campo challenge está pensado para crecer hacia respuestas verificables, validación automática y tipos de reto más complejos.

### IA

La estructura de datos permite integrar IA para generar pistas, traducciones, resúmenes o recomendaciones.

### Aplicación móvil

La arquitectura de contenido es compatible con una futura capa móvil porque las misiones están ya separadas de la presentación.

### Panel de administración

El proyecto está preparado para recibir un panel de administración que edite el contenido YAML o se conecte a un CMS sin cambiar la lógica central.

---

## 9. Decisión pendiente: formato de las misiones

No se ha cambiado todavía el formato de las misiones, pero la decisión merece una reflexión técnica clara.

### Ventajas del YAML

- es muy adecuado para datos estructurados y escalables
- encaja muy bien con Astro Content Collections
- permite validar campos con esquemas de forma sencilla
- facilita la importación, transformación y generación automática de contenido
- es muy claro para equipos técnicos y para crecimiento a largo plazo

### Ventajas del Markdown

- resulta muy cómodo para texto largo y narrativo
- es natural para redactores que trabajan con contenido editorial
- permite combinar contenido con formato ligero sin depender de mucha estructura
- puede ser útil si la prioridad futura es la redacción editorial más que la estructura de datos

### Inconvenientes del YAML

- puede volverse verboso cuando el contenido textual es muy extenso
- requiere disciplina en la estructuración de los campos
- no es tan cómodo para redactores no técnicos

### Inconvenientes del Markdown

- necesita más lógica para transformar el contenido en estructuras reutilizables
- puede ser más complejo integrar con validaciones estrictas y generación de datos múltiples
- puede complicar la coherencia si el contenido crece mucho y se mezcla con el formato visual

### Recomendación

Para ORIXE, y considerando exclusivamente los criterios de miles de misiones, gran cantidad de texto, SEO, impresión A4, mantenimiento y Astro Content Collections, recomendaría seguir con YAML como formato base.

La razón principal es que ORIXE no es solo un sitio editorial: es un sistema de contenido estructurado, con múltiples representaciones automáticas y fuerte necesidad de consistencia. YAML ofrece mejor base para eso.

### Resumen ejecutivo

La arquitectura de ORIXE se basa en una idea simple y potente:

- el contenido es el centro del proyecto
- la ficha de misión es la unidad principal
- la web, la ficha imprimible y el resto de representaciones se generan automáticamente
- la información no se duplica nunca
- el sistema está preparado para crecer durante años

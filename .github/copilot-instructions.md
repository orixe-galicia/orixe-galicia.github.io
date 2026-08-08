## ORIXE

* Astro
* CSS propio
* Componentes reutilizables
* SEO y rendimiento
* Mapa SVG
* Una misión = un archivo



\# Sistema de fichas imprimibles



La web NO es el producto final.



El producto principal es una ficha A4 imprimible.



Cada misión debe poder generar automáticamente una versión para imprimir.



\## Requisitos



Cada misión tendrá tres representaciones:



1\. Página web

2\. Ficha A4 imprimible

3\. Datos estructurados (para buscador, mapa y SEO)



Las tres deben generarse desde un único archivo de misión.



Nunca duplicar información.



\---



\## Ficha A4



Cada ficha imprimible debe incluir:



\- Título

\- Imagen principal

\- Municipio

\- Provincia

\- Tiempo estimado

\- Distancia

\- Dificultad

\- Edad recomendada

\- Introducción

\- Objetivo de la misión

\- Material necesario

\- Instrucciones

\- Reto

\- Espacio para escribir la respuesta

\- Código QR hacia la versión web

\- Espacio para la insignia

\- Pie con el logotipo de Orixe



Debe imprimirse correctamente en tamaño A4.



Debe existir una hoja de estilos específica para impresión (`@media print`).



La ficha no debe depender de JavaScript para imprimirse.



\---



\## Generación



Al crear una nueva misión:



\- debe generarse automáticamente su página web;

\- debe existir automáticamente una versión imprimible;

\- la información debe proceder del mismo archivo de datos.



Nunca escribir una ficha manualmente.



Todo debe construirse automáticamente.



\---



\## Futuro



En el futuro se podrán exportar las fichas como PDF.



La arquitectura debe dejar preparado ese paso sin tener que modificar las misiones existentes.


# Librerías para manipular el DOM
Hay muchas librerías avanzadas para manipular DOM que no son frameworks. Estas librerías proporcionan una forma más potente y flexible de interactuar con el DOM que las integradas en el API DOM. Aquí se facilitan algunos ejemplos:

## [Cheerio](https://github.com/cheeriojs/cheerio) (estrellas github +27,3k)
Cheerio es una librería que utiliza un API parecido a jQuery para interactuar con el DOM. Facilita la selección, manipulación, y consulta de elementos en el DOM con una syntaxis como jQuery.

     -Carga-
     const $ = cheerio.load('
     <ul id="languages">
       <li class="es">Castellano</li>
       <li class="ca">Catalan</li>
     </ul>
     ')

     -Renderizado-
     $.html() // Resultado: <html>...<body>...<ul>...</ul></body></html>

     -Selectores-
     $('.es','#languages').text(); //Resultado: Castellano


**Ventajas**
- Gran soporte de la comunidad
- Sintaxis parecida a jQuery, por lo que muchos desarrolladores la conocen
- Rápido y eficiente
- Flexible en análisis de documentos HTML y XML

**Desventajas**
- Puede ser menos eficiente que el API DOM nativa
- Curva de aprendizaje mayor que el API DOM


## [DOMPurify](https://github.com/cure53/DOMPurify) (+12,2k estrellas github)
DOMPurify is una librería que ayuda a sanear el contenido HTML para prevenir ataques cross-site scripting (XSS). Elimina código malicioso de HTML proporcionado por el usuario y lo remplaza con alternativas seguras.

Hay una demo donde poder [jugar con la librería DOMPurify](https://cure53.de/purify) online.

**Ventajas**
- Puede proteger contra ataques XSS
- Puede añadir una capa de seguridad adicional

**Desventajas**
- Puede ser más lenta que el saneamiento manual
- No es una solución completa

### Ejemplos

     const rules = {
       // Permitir solo etiquetas de texto
       allowedTags: ['p', 'h1', 'h2', 'h3'],
       // Permitir solo atributos de texto
       allowedAttributes: ['id', 'class', 'style'],
     };

     const sanitizedElement = DOMPurify.sanitize(element.innerHTML, rules);

---
     const dirty = 
     `
     <table border="1">
        <thea>
            <tr>
                <th>Column 1</th>
            </tr>
        </thea>
        <tbody>
            <t>
                <td>Row 1, Cell 1</td>
                <td>Row 1, Cell 2</td>
            </t>
        </tbody>
     </table>
     `

     const clean = DOMPurify.sanitize(dirty);

     RESULT
     <table border="1">
        <thead>
            <tr>
                <th>Column 1</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Row 1, Cell 1</td>
                <td>Row 1, Cell 2</td>
            </tr>
        </tbody>
     </table>

## [RE:DOM](https://github.com/redom/redom/) (+3,4k estrellas github)
RE:DOM es una pequeña librería DOM de 2KB de tamaño que permite actualizar el DOM de una forma más eficiente mejorando el rendimiento. No utiliza DOM virtual y es más rápido y utiliza menos memoria que la mayoría de librerías de DOM virtual, como React. Esto puede mejorar el rendimiento reduciendo el número de manipulaciones DOM.

**Ventajas**
- Rápido y eficiente en uso de memoria y en tareas complejas
- Facilidad de uso y aprendizaje
- Se puede utilizar con javascript puro

**Desventajas**
- Curva de aprendizaje mayor que la del DOM API nativo.
- No compatible con todos los navegadores

## [DOMCrawler](https://github.com/symfony/dom-crawler) (+3,9k estrellas github)
DOMCrawler es una librería que facilita navigar a través del DOM y extraer datos. Proporciona una interfície fluida para atravesar el árbol DOM y seleccionar elementos basados en sus atributos y contenido.

### Ejemplos

     <ul id="languages">
       <li class="es">Castellano</li>
       <li class="ca">Catalan</li>
     </ul>

     //hijos directos de *ul* con el selector .es
     $crawler->filter('ul')->children('li.es');
     //antecesor más cercano al elemento *li* con selector .es
     $crawler->closest('li.es');

**Ventajas**
- Curva de aprendizaje baja para desarrolladores sin conocimientos
- Flexible para navegar y extraer datos del DOM.

**Desventajas**
- Crea capa de abstracción sobre la API DOM nativa, esto puede limitar su capacidades.
- Con limitaciones para tareas complejas.

# Conclusión
Para la mayoría de operaciones del DOM es suficiente con el [API DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) pero para grandes proyectos algunas de estas librerías fueden facilitar de alguna manera el trabajo del desarrollador.<br>
Estas librerías ofrecen algunas ventajas e inconvenientes, así que la mejor librería para la manipulación del DOM depende de las necesidades de cada caso. Por ejemplo, si se necesita sanear el contenido HTML, DOMPurify es una buena opción. Si se necesita extraer datos del DOM, DOMCrawler es una buena opcion. Si se quiere mejorar el rendimiento, ReDOM es una buena opción. Y si se quiere un API parecido a jQuery, la elección sería Cheerio.

# Anotaciones
No hemos incorporado la librería React al tratarse de una librería de JavaScript para la creación de interfaces y no únicamente una librería que proporciona un acceso directo al API DOM.
React utiliza un DOM virtual, que es una representación del DOM real, pero mucho más rápido y con mejor rendimienot para la actualización de la interfície de usuario UI.

# Referencias
[1] [Cheerio](https://cheerio.js.org/)<br> 
[2] [NPM DOMPurify](https://www.npmjs.com/package/dompurify)<br> 
[3] [RE:DOM](https://redom.js.org/)<br> 
[4] [DOMCrawler](https://symfony.com/doc/current/components/dom_crawler.html)<br> 
[5] [NPM Cheerio](https://www.npmjs.com/package/cheerio)
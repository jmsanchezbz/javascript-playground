# El modelo DOM
## ¿Qué es DOM?
Document Object Model (DOM) es un sistema que permite al navegador organizar y manipular los elementos de la página web para facilitar la creación de aplicaciones.
El DOM representa el documento como nodos y objetos para que los programas puedan modificar la estructura, los estilos y el contenido.

## La historia de DOM
Los orígenes de DOM se remontan a  principios de 1992, donde Tim Berners-le creó la primera página web. En ese momento, era un documento simple con enalces de hipertexto y sólo se podía manipular manualmente.

En 1995, Netscape Comunications Corporation introdujo JavaScript que permitía a los desarrolladores a manipular contenidos, pero al no estar estandarizado, debían tratar con apis específicos para cada navegador.

En 1997, el consorcio de la World Wide Web (W3C) creó el grupo de trabajo Document Object Model (DOM) para crear un intefície de programación estandarizada para documentos web que sería soportada por todos los navegadores. A partir de 2004 el mantenimiento del estándar paso al grupo de trabajo sobre tecnología de aplicaciones de hipertexto web (WHATWG).

Versiones de DOM:
- Primera versión fue publicada en 1998, DOM Level 1, definía un grupo estándar de objetos y métodos para acceder y maniplar elementos del documento web.
- Segunda versión fue en publicada en el 2000, con soporte para documentos XML y mecanismos para maneajar eventos.
- Tercera versión fue publicada en 2004, con soporte para XPath y mejora para XML namespaces.
- Ultima versión fué publicada en 2015, DOM Level 4

## ¿Qué es el árbol DOM?
El árbol DOM es una estructura jerárquica que representa la página web com un arbol de objetos.
La raíz del árbol DOM empieza con un objeto documento, que representa toda la página web y los nodos hijos que representan los diferentes elementos y atributos del documetno.

La siguiente imágen muestra la estructura jerárica del DOM.
<div style="background-color:white"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/DOM-model.svg/428px-DOM-model.svg.png" alt="DOM Model"/></div>

La siguiente imagen muestra el estándar DOM de WHATWG
<div style="background-color:white"><img src="https://upload.wikimedia.org/wikipedia/commons/0/0d/WHATWG_DOM.png" alt="WHATWG DOM"/></div>

En el árbol DOM, un nodo es la unidad fundamental que representa un objeto del árbol.
El nodo *documento* representa todo el documento y sirve como raíz.

Un nodo *elemento* tiene un conjunto de propiedades, como el nombre del tag, atributos y los nodos hijo.

Un nodo *atributo* es un tipo de nodo que representa un atributo de un elemento HTML o XML, proporcionan información extra sobre el elemento.

Un *nodo texto* es un tipo de nodo que representa el contenido de texto de un elemento HTML o XML, son hijos de un nodo elemento.

## Métodos y/o propiedades
### Element: método [closest()](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)
El método closest() de la interfície Elemento atraviesa el elemento y sus padres hacia la raíz del documento hasta que encuentra un nodo que coincida con el selector CSS.

Sintaxis

     closest(selectores)

DOM

     Document
     └─ html
        ├─ head
        │  └─ title
        │     └─ "Ejemplo de DOM"
        └─ body
           ├─ h1#title.header
           │  └─ "Hola, DOM"
           ├─ div.example
           |  └─ p.italic
           |     └─ "Ejemplo1."
           ├─ div.example
           |  └─ p.italic
           |     └─ "Ejemplo2."
           └─ div.container
              └─ p.italic
                 └─ "Descripcion."

Ejemplo

     const p = document.querySelector('p.italic')
     const divContainerElement = p.closest('div')
     const divExampleEjemplo2Element = p.closest('div.example')
     const h1Element = p.closest('h1')

El resultado del método p.closest('div') será el antecesor *div.container*.
El resultado del método p.closest('div.example') será el antecesor *div.example* con el texto Ejemplo2 que es el más cercano al nodo p del que se hace la llamada.
El resultado del método p.closest('h1') será el antecesor *h1*.

### Node: método [cloneNode()](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode)
El método cloneNode() de la interfície Node devuelve una cópia del nodo desde donde se ha ejecutado el método.
También copia los atributos y valores, incluyendo listeners intrínsecos(inline).

Sintaxis

     node.cloneNode()
     node.cloneNode(deep)

Parámetros
     deep(opcional)
       - true, clonará el nodo y todo el subárbol, incluyendo el texto de los nodos texto de los hijos
       - false, sólo clonará el nodo

DOM

     Document
     └─ html
        ├─ head
        │  └─ title
        │     └─ "Ejemplo de DOM"
        └─ body
           ├─ h1#title.header
           │  └─ "Hola, DOM"
           └─ div.container
              └─ p.italic
                 └─ "Descripcion."

Ejemplo

     const body = document.querySelector('body')
     const p = document.querySelector('div.contanier')

     const pClone = p.cloneNode()
     const pCloneDeep = p.cloneNode(true)

     body.append(pClone,pCloneDeep)


Result DOM

     Document
     └─ html
        ├─ head
        │  └─ title
        │     └─ "Ejemplo de DOM"
        └─ body
           ├─ h1#title.header
           │  └─ "Hola, DOM"
           ├─ div.container
           │  └─ p.italic
           │     └─ "Descripcion."
           ├─ div.container
           └─ div.container
              └─ p.italic
                 └─ "Descripcion."

### Element: método [insertAdjacentElement()](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement)
El método insertAdjacentElement() de la interfície Element inserta un nodo de elemento dado en una posición relativa del elemento en que se invoca el método.

Sintaxis

     insertAdjacentElement(position, element)

Parámetros

     position
      - 'beforebegin' antes del propio elemento objetivo.
      - 'afterbegin' justo dentro del elemento objetivo, antes del primer hijo.
      - 'beforeend' justo dentro del elemento objetivo, después del último hijo.
      - 'afterend' después del propio elemento objetivo.
     element, elemento a insertar

DOM

     Document
     └─ html
        ├─ head
        │  └─ title
        │     └─ "Ejemplo de DOM"
        └─ body
           ├─ div#ex.container
           │  ├─ p.italic
           │  │  └─ "Descripcion."
           └─ div.container

Ejemplo

     const divEx = document.querySelector('#ex')
     const pBB = document.createElement('p')
     pBB.textContent='beforebegin'
     const pAB = document.createElement('p')
     pBB.textContent='afterbegin'
     const pBE = document.createElement('p')
     pBB.textContent='beforeend'
     const pAE = document.createElement('p')
     pBB.textContent='afterend'

     divEx.insertAdjacentElement('beforebegin',pBB)
     divEx.insertAdjacentElement('afterbegin',pAB)
     divEx.insertAdjacentElement('beforeend',pBE)
     divEx.insertAdjacentElement('afterend',pAE)


Result DOM

     Document
     └─ html
        ├─ head
        │  └─ title
        │     └─ "Ejemplo de DOM"
        └─ body
           ├─ p
           │  └─ "beforebegin"
           ├─ div#ex.container
           │  ├─ p
           │  │  └─ "afterbegin"
           │  ├─ p.italic
           │  │  └─ "Descripcion."
           │  └─ p
           │     └─ "beforeend"
           ├─ p
           │  └─ "afterend"
           └─ div.container

## Referencias
 [1] [The DOM API – JavaScript in the Browser](https://web-fundamentals.dev/dom-api)

 [2] [Understanding the DOM tree structure](https://www.almabetter.com/bytes/tutorials/javascript/dom-tree-structure)

 [3] [Wikipedia - Document Object Model](https://en.wikipedia.org/wiki/Document_Object_Model)

 [4] [mdn web docs](https://developer.mozilla.org/)

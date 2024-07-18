# 2.2. Responde en el foro las siguientes preguntas. Después de haber leído la introducción y realizado los ejercicios, responde las siguientes preguntas en el foro de la asignatura:

## • Pon un ejemplo práctico de un escenario donde sea necesario el uso de promesas. Intenta ser original y describe detalladamente el escenario.

Una aplicación de vídeo en streaming permite a los usuarios ver las películas de televisión en línea y para ello debe poder descargar el contenido de vídeo del servidor y mostrarlo al usuario de manera fluida.

Un problema puede ser que la conexión del usuario no sea muy rápida, por lo que el proceso de descarga del vídeo puede ser un proceso lento. Si la aplicación no puede descargar el contenido a la velocidad que el usuario lo ve, experimentará un buffering muy molesto al ver la película.

Para solucionar este problema la aplicación debe gestionar la descarga de manera asíncrona para mostrar el vídeo antes que se complete la descarga.

Se puede utilizar una promesa para descargar el contenido de vídeo, para mostrar el vídeo cuando se complete la descarga. Para la mejora de la experiencia del usuario, se podría dividir el vídeo en pequeñas partes para que la descarga se complete más rápido y poder realizar una precarga para mostrar el vídeo antes de completar la descarga completa.

También se podría comprobar la velocidad de conexión con una promesa y de esa forma reducir la calidad del vídeo dinámicamente y evitar el buffering.

## • ¿Hay algún ejercicio que te haya resultado complicado de resolver, o que no hayas podido resolver? ¿Has comprendido la solución propuesta?
Con las soluciones se han podido entender los ejercicios propuestos.
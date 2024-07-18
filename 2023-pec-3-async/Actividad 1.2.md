# 1.2. Responde en el foro las siguientes preguntas. Después de haber leído la introducción y realizado los ejercicios, responde las siguientes preguntas en el este foro:

## Identifica y describe dos escenarios de la vida real donde haya una comunicación asíncrona. Por ejemplo, y para que te sirva de orientación, una comunicación vía Whatsapp es una comunicación asíncrona. ¿Qué otro escenario identificarías?

Escenarios de comunicación asíncrona:
 - Correo electrónico, cuando envías un correo electrónico, no esperas una respuesta inmediata. El destinatario puede leer y responder al mensaje en su propio tiempo. El remitente y el destinatario no están conectados en tiempo real por lo que la respuesta no es instantánea y la comunicación puede ocurrir en momentos diferentes según la disponibilidad.
 - Gestor de incidencias, cuando pones una incidencia entra en una cola de asignación según prioridades del servicio por lo que a no ser que sea muy prioritaria la resolución no será inmediata. Una vez se resuelva nos informarán de como se resolvió.

## ¿Te has encontrado alguna vez, programando, con alguna situación donde te hayas tenido que enfrentar a un escenario asíncrono? Describe la situación. Si no lo has hecho, describe un escenario donde identifiques una comunicación asíncrona en un entorno de desarrollo. Se valorará positivamente la originalidad en las respuestas.

Sí, cuando realizas integración de servicios mediante servicios web REST la comunicación es asíncrona. Debes realizar la consulta y esperar una respuesta donde hay muchos factores que pueden afectar al tiempo de respuesta, como la conectividad, saturación del servidor, número de peticiones, recursos del servidor...

## ¿Hay algún ejercicio que te haya resultado complicado de resolver, o que no hayas podido resolver? ¿Has comprendido la solución propuesta?

Una de las mayores dificultades han sido los ejercicios de callback hell o piramid of doom es complicado hacer el segumiento de las llamadas y el resultado obtenido con la anidación de llamadas.
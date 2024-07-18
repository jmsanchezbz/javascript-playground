# Respuestas a las preguntas teóricas / Respostes a les preguntes teòriques


## Ejercicio T1 / Exercici T1
* T1.1 (2p) Indica los comandos que debería realizar cada desarrollador para sincronizar sus cambios con el repositorio en GitHub. No tengas en cuenta la posibilidad de que se produzca un conflicto, ya que ese caso se trata en el siguiente apartado.

En primer lugar debería añadir el fichero modificado index.html al índice antes de realizar el commit para grabar el cambio en el repositorio local. Posteriormente se realizaría un push del repositorio local al remoto. Es recomendable antes de hacer un push, realizar un pull del repositorio remoto para traer posibles cambios a nuestro repositorio local.

* T1.2 (1p) ¿Puede darse alguna situación de conflicto en este escenario?
Puede darse un conflicto al estar modificando los dos desarrolladores el mismo archivo. El segundo desarrollador que realice la actualización del repositorio remoto deberá subsanar el posible conflicto al haber modificado el mismo archivo index.html después que el desarrollador que subió el cambio primero.

## Ejercicio T2 / Exercici T2
* T2.1 (1p) ¿Qué commits están considerados en la rama front-end?
C1, C2, C4 y C8

* T2.2 (2p) El escenario incluye un conflicto, ¿cuál es? ¿cómo lo solucionarías?
El posible conflicto que podría darse es en el commit c11. Este posible conflicto lo debería solucionar el desarrollador que actualiza la rama back-end. Debería realizar un merge de la main con la back-end y resolviendo el conflicto modificando el/los archivo/s añadiendo sus cambios. Después haciendo el merge de back-end con main ya resuelto el confilcto.

## Ejercicio T3 / Exercici T3
* (1p) ¿Tienes motivos para dudar de la afirmación del desarrollador? ¿Por qué?
El desarrollador de ese repositorio ha hecho un fork de rust-lang/rfcbot-rs, lo que significa que su repositorio rfcbot-rs es una copia. A no ser que el repositorio del que hace el fork sea desarrollado por este mismo desarrollador, su afirmación sería falsa.


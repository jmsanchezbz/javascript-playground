# Actividad opcional 1. Decálogo de errores comunes
### La asincronía es quizás uno de los aspectos que más errores provocan cuando desarrollamos en JavaScript, ya sea por incorrección de nuestro código, o por una mala gestión de la asincronía. En esta actividad opcional deberás crear un decálogo de errores comunes (o malas prácticas) de la programación asíncrona. Algunos ejemplos son el uso de asyncs sin awaits o de promesas sin callbacks.

1. Uso de async sin await
    - Al utilizar una función asíncrona sin await para esperar a que la promesa devuelta se resuelva, obtenemos el valor undefined, por lo que al acceder al el obtenemos un error TypeError.
  
          async function getItem() {
             const response = await fetch(`https://api.example.com/items`);
             return response.json();
          }
          const item = getItem();
          console.log(item); //TypeError

1. Uso de promesas sin callbacks
2. Olvidar tratar los errores en las promesas
   - Si no tratamos los errores en las promesas podemos dificular el manejo de errores
3. Encadaenar promesas sin .then
   - En este caso, una segunda promesa podría comenzar antes de acabar o resolverse la primera. Si dependieramos de un valor necesario de la primera promesa para ejecutar correctamente la segunda no lo dispondríamos provocando resultados no deseados.
4. Mezclar funciones asíncronas como si fueran síncronas
    - Esperar que código asíncrono se comporte como código síncrono y viceversa, puede producir comportamientos erroneos.
  
          console.log('Start');
          setTimeout(() => console.log('Inside setTimeout'), 0);
          console.log('End');
          // Output order: Start, End, Inside setTimeout

5. Anidamiento excesivo de promesas
   - Este anidamiento producen un problema parecido al 'callback hell' o 'piramid of doom' y produce una complejidad y legibilidad del código en la mayoría de casos innecesaria y con alternativas como el uso de await.
6. Sobreuso de await in bucles
   - Utilizar await en bucles cuando se pueden realizar operaciones independientes y pueden ejecutarse en paralelo, perjudica el rendimiento del proceso se utilizan como peticiones síncronas.

          // Orden secuencial
          for (const item of items) {
            await someAsyncFunction(item);
          }

          // Concurrente con Promise.all
          await Promise.all(items.map(item => someAsyncFunction(item)));
  
7. No utilizar las funciones estáticas de Promise para promesas concurrentes
   - Promise.all() se completa cuando todas las promesas se resuelven
   - Promise.race() se completa con la primera promesa que se resuelve.
   - Promise.any() se completa con la primera promesa, incluso si se rechaza.
   - Promise.allSettled() se completa cuando todas las promesas se completan, independientemente del resultado.
8. Olvidar return en las promesas
   - Puede ocasionar un comportamiento inesperado al no devolver la promesa el callback no recogerá nada y no sabríamos cuando se ha terminado la acción o si se ha realizado.
9. No tratar errores correctamente
   - Las operaciones asíncronas también deben controlar los errores para no dificultar la depuración posterior con bloques try-catch

## Fuentes consultadas:
- Apuntes
- Ejercicios
- MDN web docs [Asynchronous](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)
- MDN web docs Asynchronous [Promises](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises)
- MDN web docs Asynchronous [Ref Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- Problemas de concurrencia con async/await en Javascript [Medium](https://statefull.medium.com/problemas-de-concurrencia-con-async-await-en-javascript-72e7a7cd37c8)
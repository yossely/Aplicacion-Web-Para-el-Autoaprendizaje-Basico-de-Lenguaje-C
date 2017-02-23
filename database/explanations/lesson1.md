Vamos a hacer el típico programa para empezar a conocer nuestro lenguaje, este es el ejemplo del “¡Hola Mundo!”
```c
#include <stdio.h> 

int main()
{ 
    printf("¡Hola Mundo!"); 
    return 0;
}
```
Estudiemos el significado de las instrucciones presentes en nuestro programa: 

 - En la línea 1 estamos incluyendo información de la _librería_ en C de entrada y salida, esta librería nos proporciona funciones para imprimir en pantalla (salida) información y para solicitar (entrada) información del usuario.
 - Luego, en la línea 3, tenemos nuestra **función principal** llamada `main`, todo el código que queremos que se ejecute debe ir dentro de esta función.
 - Por ahora, nuestro main muestra el mensaje “¡Hola Mundo!” usando la función `printf`, esta función pertenece a la librería `stdio.h` que hemos incluido en la primera línea y con ella podemos imprimir en pantalla lo que necesitemos de manera sencilla. La función printf ahora solo imprime una cadena de caracteres, que están encerrados con los signos `" "`
 - La línea 6 de nuestro main indica que el programa retorna 0 al sistema operativo cuando termina la ejecución. 
 - Observemos 3 características importantes aquí: la directiva `#include <stdio.h>` no termina en ningún caracter especial, nuestro `main` agrupa las dos instrucciones que queremos ejecutar con los signos `{ }` y cada una de las instrucciones termina en `;` 

### ¡Vamos a poner esto en acción con el ejemplo!
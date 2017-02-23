Una función es una serie de instrucciones agrupadas por los signos `{ }`, con un nombre y pueden o no, retornar un valor. Las funciones nos permiten dividir nuestro programa en piezas pequeñas más fácil de modificar y reutilizar bloques de código, es decir, escribimos la función una vez y la usamos las veces necesarias.

Si en nuestro programa debemos calcular en varias oportunidades el promedio de dos números, podemos escribir una función para calcular y retornar el promedio:
```c
int promedio(int valor1, int valor2)
{    
    int promedio;
    promedio = (valor1+valor2)/2;
    return promedio;
}
```
 - Se define el tipo de dato que retorna la función, en este caso es `int`. Puede ser cualquier tipo de dato (`float`, `char`, etc) y en caso de no retornar ningún valor, será de tipo `void` (vacío).
 - Se escoge el nombre de la función (*promedio*)
 - Las funciones pueden recibir *parámetros o argumentos*, ubicados dentro de los `( )` y separados por coma `,`. Debemos especificar el tipo de datos de cada parámetro. En este caso los valores recibidos serán guardados en las variables *valor1* y *valor2* respectivamente, con ellas podemos realizar las operaciones que hemos aplicados a variables de tipo `int`.
 - Se escriben las instrucciones que queremos que se ejecuten al llamar a esta función. En este caso se declara la variable *promedio* y se le asigna el valor resultante de la expresión `(valor1+valor2)/2`
 - Se retorna el valor de la variable promedio, notemos que esta variable es del mismo tipo que especificamos al declarar la función, es decir, int.

Para llamar la función escribimos el nombre de la función seguido de los parámetros que requiere la misma:
```c
int x = 3, y = 5;
int resultado = promedio(3,5);
```
Observemos que:

 - No es necesario que las variables enviadas por parámetro se llamen valor1 y valor2. 
 - Como la función promedio retorna un valor de tipo entero, podemos asignar ese valor a una variable del mismo tipo, en este caso resultado.
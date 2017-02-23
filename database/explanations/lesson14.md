Veamos cómo declarar un arreglo bidimensional o matriz::
```c
float matriz[5][9];
```
 Aquí tenemos una matriz de tipo `float`, tiene 5 filas y 9 columnas. Recordemos que los índices de los arreglos comienzan por 0, por lo tanto nuestra matriz luce:
####  Imagen
Para acceder a un elemento debemos especificar las coordenadas de la forma `matriz[fila][columna]`, es decir, si queremos acceder al elemento ubicado en la fila 3, columna 6, escribimos `matriz[3][6]`

Consideremos por ejemplo, inicializar un arreglo para usar como una matriz identidad
####  Imagen
Necesitamos visitar cada elemento, un par de ciclos `for` resulta perfecto, uno para recorrer cada fila y otro para recorrer cada columna:
```c
for (fila = 0; fila < 10; ++fila)
{
    for (columna = 0; columna < 10; ++columna)
    {
        // Si estamos en la diagonal principal, asignar valor 1.0f
        if (fila == columna)
        {
            matriz[fila][columna]=1.0f;
        }else{
            matriz[fila][columna]=0.0f;
        }
    }
}
```
Para inicializar una matriz especificamos los elementos de cada fila con la ayuda de `{ }` de la siguiente manera:
```c
int matriz[4][6] = {{1,1,0,1,0,1},
                    {0,0,1,1,0,0},
                    {0,1,1,0}};
```
Al no inicializar algún elemento, este tendrá como valor 0. En este ejemplo las últimas dos columnas de la 3º fila y la 4º fila completa tendrán 0.

También podemos *omitir* los `{ }` y escribir todos los elementos separados solo por comas, una vez el compilador encuentre suficientes valores para llenar una fila, empieza con la siguiente:
```c
int matriz[4][6] = {1,1,0,1,0,1,
                    0,0,1,1,0,0,
                    0,1,1,0};
```
De la misma manera se completan los elementos faltantes con el valor 0.
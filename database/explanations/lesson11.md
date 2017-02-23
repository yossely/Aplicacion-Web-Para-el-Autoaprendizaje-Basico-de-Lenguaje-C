Un arreglo es una estructura que contiene un número X de valores, siendo todos los valores del mismo tipo, estos valores son conocidos como elementos. La forma más simple de un arreglo tiene solo una dimensión, se denomina arreglo unidimensional o vector.
Para declarar un vector debemos especificar el tipo de dato de los elementos que vamos a guardar y la cantidad de elementos, por ejemplo:
```c
int vector[10];
```
####  Imagen
De aquí podemos observar:

 - Para acceder a un elemento en particular, escribimos el nombre de nuestro vector e indicamos el **índice** al que necesitamos acceder
 - Los índices para acceder a cada elemento *siempre empiezan* por **0**, en este vector de 10 elementos, el primer elemento se accede con el índice 0, el segundo con el índice 1, … y el elemento 10 se accede con el índice 9
En general si un vector es declarado de tipo `int` entonces cada elemento será tratado como si fuera una variable de tipo `int`, por lo tanto, podemos ejecutar las mismas operaciones que ya hemos aplicado a las variables tipo `int`:
```c
int vector[10];

/*Asigna el valor en la quinta 
    posicion (indice 4) de vector */
vector[4] = 0; 

/*Guarda un valor entero en la tercera 
    posicion (indice 2) de vector */
scanf("%d",&vector[2]);

for (i = 0; i < 10; i++)
{
    /*Imprime en pantalla todos los elementos
        de vector usando la variable i como
        indice */
    printf("%d\n",vector[i]);
}
```
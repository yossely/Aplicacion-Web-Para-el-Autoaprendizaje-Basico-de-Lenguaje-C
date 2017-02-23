El último ciclo de lenguaje C se denomina `for` y su estructura es la siguiente:
```c
for ( /*expresion1*/ ; /*expresion2*/ ; /*expresion3*/)
{
    /* Instrucciones */
}
```
 - La *expresion1* representa el paso de **inicialización**, el cual se ejecuta *una sola vez* **ANTES** de que el ciclo se empiece a ejecutar
 - La *expresion2* es la **expresión de control**, es decir, se evalúa expresion2 y si resulta verdadero (1) se ejecuta la iteración, de lo contrario se detiene el ciclo
 - La *expresion3* es la operación que se ejecuta al **FINAL** de cada iteración.

Con esto en mente, vamos a crear un ciclo for para imprimir una cuenta regresiva desde 10 hasta 1:
```c
int i;
for (i = 10; i > 0; i--)
{
    printf("%d\n",i);
}
```
En la línea 5 declaramos la variable que vamos a usar en el ciclo, luego las expresiones del ciclo nos indican:

 - Inicializar la variable con un valor de 10 **ANTES** de empezar las iteraciones
 - **Repetir** la instrucción printf("%d\n",i); **mientras** i sea mayor que 0  
 - Al **finalizar** cada iteración decrementar el valor de i en 1 
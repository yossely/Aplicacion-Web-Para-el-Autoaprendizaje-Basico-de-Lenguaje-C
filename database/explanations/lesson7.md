Un ciclo es una sentencia que se encarga de ejecutar repetidamente las instrucciones que se encuentran dentro del cuerpo del ciclo. En C, cada ciclo tiene una expresión de control. **ANTES** de cada ejecución del cuerpo del ciclo (a esto se le llama *iteración*), la expresión de control es evaluada y si el resultado es verdadero, el ciclo continúa su ejecución.

El primer ciclo que veremos se denomina `while`, tiene la siguiente estructura:
```c
while(/* expresion */){
    // Instrucciones
}
```
La expresión dentro de los paréntesis `( )` de la sentencia `while` es la **expresión de control**, es aquella que se evalúa y si resulta verdadero se ejecutan las instrucciones que están dentro del cuerpo del ciclo (iteración). Si queremos hacer un ciclo que imprima los números del 1 al 10:
```c
int numero = 1;
while(numero < 10){
    printf("%d\n", numero);
    numero = numero+1;
}
```
 - Declaramos la variable *numero* y la inicializamos en 1
 - Se evalúa la condición *numero* < 10 ? → Verdadero (1)
 - Se imprime el numero 1 y luego se incrementa el valor de *numero* a 2
 - Se evalúa nuevamente la condición *numero* < 10 ? → Verdadero (1)
 - Se imprime el numero 2 y luego se incrementa el valor de *numero* a 3
 - Así sucesivamente hasta que *numero* es igual a 10 
 - Se evalúa la condición *numero* < 10 ? → Falso (0)
 - Se sale del ciclo, es decir, se detienen las iteraciones y se continúa con la siguiente instrucción que esté después del `while`

> **Nota:** El cuerpo del ciclo puede que no sea ejecutado ni una vez, ya que la expresión de control es evaluada ANTES de cada iteración (incluída la primera)
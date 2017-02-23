El ciclo `do-while` es básicamente una sentencia `while` cuya expresión de control es evaluada **DESPUÉS** de cada ejecución del cuerpo del ciclo. La sentencia `do-while` tiene la forma:
```c
do{
    // Instrucciones
}while(/* expresion */);
```
Al encontrar un ciclo `do-while` lo que ocurre es: el cuerpo del ciclo es ejecutado primero, luego la expresión de control es evaluada, si el resultado es verdadero (1) el cuerpo del ciclo es ejecutado otra vez y así sucesivamente. El ciclo termina cuando el resultado de la expresión de control es falso (0).
La **diferencia** entre el *while* y el *do-while* es que el `do-while` **SIEMPRE SE EJECUTA AL MENOS UNA VEZ**, mientras que el `while` podría no ejecutarse ni una vez si al evaluar la expresión se obtiene como resultado falso (0). Con esta característica en mente podemos distinguir cuándo necesitamos un ciclo u otro.
Si queremos determinar la cantidad de dígitos que posee un número entero positivo podemos hacer lo siguiente:
```c
int valor, digitos=0;
printf("Introduzca un numero entero positivo: \n");
scanf("%d",&valor);

do{
    valor/=10;
    digitos=digitos+1;
}while(valor>0);

printf("El numero tiene %d digito(s)\n", digitos);
```
Si usamos un ciclo `while` en lugar del `do-while`, no estaremos tomando en cuenta el caso en que el numero ingresado sea 0, donde al evaluar la expresión resulta falso (0) **ANTES** de ejecutar el cuerpo de ciclo por lo que no incrementamos el valor de digitos y el resultado final será *“El numero tiene 0 digito(s)”* cuando en realidad tiene 1 dígito.
```c
while(valor>0){
    valor/=10;
    digitos=digitos+1;
}
```
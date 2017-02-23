A menudo necesitaremos comparar una expresión contra una serie de valores para ver con cuál coincide y con base en esa coincidencia ejecutar un bloque de instrucciones u otro. Para estas situaciones tenemos la sentencia `switch`
Veamos un ejemplo práctico: si queremos mostrar un indicador (Excelente, bueno, regular o malo) basados en el valor introducido por el usuario (4, 3, 2 o 1 respectivamente), la sentencia `switch` es:
```c
switch(valor){
    case 4:
        printf("Excelente\n");
        break;
    case 3:
        printf("Bueno\n");
        break;
    case 2:
        printf("Regular\n");
        break;
    case 1:
        printf("Malo\n");
        break;
    default:
        printf("Valor fuera del rango\n");
        break;
}
```
De aquí que:

 - La expresión a comparar en la sentencia `switch` puede ser **ÚNICAMENTE** de tipo `int`.
 - Cada caso `case` evalúa si valor coincide con un valor constante, el cual puede ser una expresión pero no puede contener variables, es decir, puede ser `5` ó `5+10` pero **no** `5+n`
 - Después de definir cada caso, vienen las instrucciones a ejecutar si coincide con el mismo, no se requiere `{ }` para agrupar estas instrucciones. Por lo general, la última instrucción de cada caso es `break;` que indica detener el proceso de evaluar si el valor dentro de `switch` coincide con los casos restantes y se continúa con la siguiente instrucción o sentencia que esté después del `switch`
 - No está permitido definir el mismo caso dos veces.
 - Si *valor* no coincide con ninguna de los casos listados, entonces las instrucciones dentro del caso `default` son ejecutadas.
 - El orden para definir los casos no importa, esto implica por ejemplo que el caso *default* no necesariamente va al final.
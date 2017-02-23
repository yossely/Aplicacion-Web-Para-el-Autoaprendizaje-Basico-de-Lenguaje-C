Para usar una variable en C, primero ésta debe ser **declarada**, es decir, debemos describir a la variable **ANTES** de usarla. Lenguaje C tiene varios tipos de datos, pero los más básicos son:

Tipo | Descripción
------------ | -------------
int | Números enteros (ya sea positivo o negativo)
float | Números decimales (ya sea positivo o negativo)
char | Caracter (un solo caracter: a, b, c, etc...)

Para declarar una variable primero especificamos el tipo de data que guardaremos en ella y el nombre o **identificador**. Al escoger el identificador se debe tomar en cuenta que puede contener letras, números y guión bajo `_`, debe empezar con letra o guión bajo y C distingue entre mayúsculas y minúsculas:
```c
int precio;
float descuento;
char caracter;
```
A través de la **asignación** guardamos valores en las variables variables, la asignación de un valor se puede hacer después de haber declarado la variable o en la misma instrucción de declaración, de esta manera: 
```c
int precio;
precio = 40;
```
```c
float descuento = 0.3f;
char = 'c';
```
Al escribir valores decimales en lenguaje C debemos especificar el `.` decimal y la `f`, es decir, si queremos guardar el valor 30 en una variable de tipo decimal debe ser `float variable = 30.0f;`

Ahora podemos hacer operaciones con estos valores y guardar el resultado en otra variable, vamos a calcular cuál es el precio final después de haber aplicado el descuento y guardar el valor en una variable de tipo `float`, esto con los operadores matemáticos básicos, + (suma), - (resta), * (multiplicación), / (división) y %(resto de la división):
```c
int precio;
float descuento, precio_final;
precio = 40;
descuento = 0.3f;
precio_final = precio - (precio*descuento);
```
En lenguaje C los operadores matemáticos tienen **reglas de precedencia**, las cuales indican que la multiplicación y división se resuelven primero y la suma y la resta después. La expresión que calcula el precio final también puede expresarse sin `( )` que agrupen `precio*descuento`, el resultado sería el mismo, pero para expresiones como `12 * 3 / 4` tal vez sea necesario usar `( )` para que la expresión se resuelva según nuestros requerimientos.
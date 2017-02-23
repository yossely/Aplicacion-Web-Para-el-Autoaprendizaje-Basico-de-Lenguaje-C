Se les llama sentencias de selección porque permiten seleccionar y ejecutar cierta porción de código dependiendo de alguna condición (evaluando una expresión). La primera sentencia que veremos se denomina `if` y su forma más simple es:
```c
if (/* condicion */)
{
    /* Bloque de instrucciones a ejecutar 
        SI se cumple la condicion */
}
```
Si la *condición* que se encuentra dentro del paréntesis se cumple, se ejecuta el bloque de *instrucciones* ubicado dentro de las `{ }`. Para formular condiciones, lenguaje C posee operadores de tres tipos:

 - Operadores Relacionales 

Símbolo | Descripción
------------ | -------------
`<` | Menor que
`\>` | Mayor que
`<=` | Menor o igual que
`\>=` | Mayor o igual que


- Operadores de Igualdad
 
Símbolo | Descripción
------------ | -------------
`==` | Igual que
`!=` | Diferente que


 - Operadores Lógicos 

Símbolo | Descripción
------------ | -------------
`!` | Negación
`&&` | AND lógico
<code>&#124;&#124;</code> | OR lógico

Al evaluar una expresión se produce como resultado un **0** (falso) o **1** (verdadero). Estos operadores también tienen *reglas de precedencia* las cuales indican que primero se resuelven los operadores relacionales, luego los de igualdad y por último los lógicos.
Por ejemplo, en la expresión `x < y && y == z` primero se evalúa si x es menor que y, luego si y es igual que z y por último se verifica que las dos condiciones anteriores tienen como resultado verdadero. Algunos programadores utilizan *paréntesis* para agrupar las condiciones y que sean más legibles: `(x < y) && (y == z)`
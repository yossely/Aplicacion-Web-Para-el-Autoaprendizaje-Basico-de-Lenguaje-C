# Cláusula `else`
En algunas oportunidades es útil ejecutar ciertas instrucciones si *NO* se cumple una condición `if`, para estos casos existe la cláusula `else`:
```c
if (/* condicion */)
{
    /* Bloque de instrucciones a ejecutar 
        SI se cumple la condicion */
}else{
    /* Bloque de instrucciones a ejecutar 
        si NO se cumple la condicion */
}
```
La sentencia `else` siempre va ligada con una sentencia `if`, ya que es la **contraparte** de la sentencia `if`, es decir, las instrucciones dentro de la cláusula `else` se ejecutan cuando al evaluar la expresión de la sentencia `if`, resulta **0** (falso)
# Imprimir y leer información con printf  y scanf
Ya vimos cómo imprimir valores de tipo `float`, ahora, para imprimir un valor de tipo `int`, debemos reemplazar el `%f` por `%d` de la siguiente manera:
```c
printf("mitad de 6 es %d\n", 6/2);
```
En la función printf es posible escribir expresiones directamente y de ser necesario varias expresiones en la misma instrucción, por ejemplo:
```c
int mitad = 2; 
printf("mitad de 6 es %d y 6/4 equivale a %.2f\n", 6/mitad, 6.0f/4.0f);
```
Vamos a notar algo muy importante en este tipo de instrucciones, en la posición del `%d` se mostrará el valor de la expresión `6/mitad` ya que es la **primera** expresión que se encuentra, en la posición del `%.2f` se mostrará el valor de la expresión 6.0f/4.0f ya que es la **segunda** expresión. Esto implica que la cantidad de variables o expresiones debe ser igual a la cantidad de %d o %f que se tengan.
El `%.2f` indica la cantidad de decimales que deseamos imprimir en pantalla del valor obtenido de la expresión `6.0f/4.0f`

Para permitir que el usuario ingrese información y usarla en nuestro programa usaremos la función `scanf` también perteneciente a la librería `stdio.h`, veamos:
```c
scanf("%d",&variable_entera);
scanf("%f",&variable_decimal);
```
 - Al igual que especificamos qué tipo de dato vamos a imprimir en pantalla con printf, debemos especificar qué tipo de dato queremos guardar con la función scanf `%d` - *int* o `%f` - *float*
 - Vemos un nuevo operador `&` en esta instrucción, con este operador obtenemos la dirección de la variable que precede, esto con el fin de indicar a la función `scanf` **dónde** debe guardar el valor que acaba de leer.
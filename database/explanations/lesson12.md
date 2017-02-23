Para crear y utilizar una cadena de caracteres (*string*) en lenguaje C, usamos dos características que ya vimos: tipo de dato `char` (caracter) y un vector (arreglo unidimensional). Digamos que necesitamos un variable capaz de almacenar un máximo(puede ser menos) de 10 caracteres:
```c
char mes[11];
```
Lenguaje C agrega caracteres null (representado por `\0`) para marcar el final de la cadena, es por esto que creamos la variable mes con un espacio adicional a los 10 que se requieren. 
Podemos inicializar nuestro *string* en la misma instrucción de declaración:
```c
char mes[11]="Octubre";
```
####  Imagen
También es posible declarar un string sin precisar su tamaño, en este caso el compilador se encarga de calcularlo:
```c
char mes[]="Septiembre";
```
Para imprimir en pantalla un *string* con la función `prinft`, usamos `%s` para marcar dónde queremos que vaya el contenido de la variable:
```c
printf("Mes: %s\n",mes);
```
Para leer y guardar una cadena de caracteres en nuestra variable string, podemos usar la función `scanf`:
```c
scanf("%s",mes);
```
La función `scanf` omite los espacios en blanco, es decir, lee y guarda cada caracter hasta que encuentra un espacio en blanco (también se omiten los espacios en blanco que pueda haber antes de los caracteres)

Existen otras dos funciones para imprimir y leer strings:
```c
gets(mes);
puts(mes);
```
Cuya principal diferencia es que `gets` no omite los espacios en blanco al leer una cadena de caracteres y `puts` solo imprime strings (cadena de caracteres) y siempre agrega el caracter de nueva linea `\n` al final de la impresión. 

Como un string es un vector de caracteres, podemos acceder a cada caracter, es decir, a cada elemento a través de un índice de la siguiente manera:
```c
char c = mes[3];
printf("Deletreo: \n");
for (int i = 0; i < 11; ++i)
{
    printf("- %c\n", mes[i]);
}
```
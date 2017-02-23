Los arreglos tienen algunas restricciones, por ejemplo, no es posible copiar un arreglo en otro con el operador de asignación `=`, ni comparar si dos vectores son iguales con el operador `==` 
### ERROR
```c
char string1[10] = "cadena 1";
char string2[10];
string2 = string1;
```
### ERROR
```c
if(string1 == string2)...
```
Afortunadamente, en C tenemos la librería `string.h` que nos proporciona funciones para conseguir lo que necesitamos:

- strcpy → `strcpy(string2, string1);` 
  - **Copia** el contenido de la variable *string1* en la variable *string2*
    
    ```c
    char string1[10] = "prueba",
        string2[10];
    strcpy(string2,string1);
    // string2 = "prueba"
    ```
- strlen → `strlen(string);` 
  - Calcula y devuelve la **longitud** (`int`) de la variable *string*
    
    ```c
    char cadena[10] = "prueba";
        int longitud = strlen(cadena);
    // longitud = 6
    ```
- strcat → `strcat(string1, string2);` 
  - **Añade** el contenido de la variable *string2* al final del contenido en la variable *string1*
    
    ```c
    char cadena1[20] = "¡Hola ",
        cadena2[10] = "mundo!";
        strcat(cadena1, cadena2);
        // cadena1 = "¡Hola mundo!"
    ```
- strcmp → `strcmp(string1, string2);` 
  - **Compara** las cadenas de caracteres *string1* y *string2*, devuelve un valor menor que, igual que o mayor que 0 si string1 es menor que, igual que o mayor que string2
    
    ```c
    if (strcmp(cadena1,cadena2) == 0)
        // cadena1 es igual que cadena2 ??
    
        if (strcmp(cadena1,cadena2) < 0)
        // cadena1 es menor que cadena2 ??
    
        if (strcmp(cadena1,cadena2) > 0)
        // cadena1 es mayor que cadena2 ??
    ```
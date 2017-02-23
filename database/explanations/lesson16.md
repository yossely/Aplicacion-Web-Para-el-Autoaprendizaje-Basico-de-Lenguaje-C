Las estructuras son la elección adecuada cuando necesitamos guardar una serie de datos relacionados entre sí de alguna manera, por ejemplo, supongamos que deseamos llevar el registro de un producto dentro de un almacén, este producto posee un código (número entero), nombre (cadena de caracteres), un precio (número decimal) y una cantidad (número entero).  
```c
typedef struct
{
    int codigo;
    char nombre[31];
    float precio;
    int cantidad;
}producto;
```
Usamos `typedef` para crear un nuevo tipo de dato llamado *producto*, el cual tiene *4 miembros* (codigo, nombre, precio y cantidad), los miembros de una estructura pueden ser de tipos de datos diferentes (`int`, `float`, `char`, etc). 
La instrucción para crear una nueva variable de tipo producto es:
```c
producto prod;
```
Podemos **inicializar** una variable del tipo creado en la misma instrucción de declaración, la única restricción es que los valores deben aparecer en el mismo orden que han sido declarados o especificar cada miembro con el operador `.` (punto) seguido del nombre:
```c
producto prod = {123, "la la", 23.23f, 2}; 
```
```c  
producto prod = { .nombre="la la", .codigo=123, .cantidad=2, .precio=23.23f};
```
### Imagen
Para **acceder** a cada miembro usamos el operador `.` (punto), por ejemplo, si queremos imprimir todos los valores de un producto:
```c  
printf("Codigo: %d\n",prod.codigo);
printf("Nombre: %s\n",prod.nombre);
printf("Precio: %.2f\n",prod.precio);
printf("Precio: %d\n",prod.cantidad);
```
Podemos aplicar todas las operaciones que conocemos hasta ahora a los diferentes miembros de una estructura dependiendo del tipo de dato del miembro, por ejemplo, podemos decrementar la cantidad del producto o leer un valor y guardarlo en el miembro llamado precio:
```c  
prod.cantidad--;
scanf("%f",&prod.precio);
```
Al ser un nuevo tipo de elemento podemos pasarlo como parámetro en una función: 
```c  
void imprimir_producto(producto p)
{
    printf("Codigo: %d\n",p.codigo);
    printf("Nombre: %s\n",p.nombre);
    printf("Precio: %.2f\n",p.precio);
    printf("Precio: %d\n",p.cantidad);
}
```
O retornarlo en una función: 
```c  
producto generar_producto()
{
    producto p = { .nombre="la la", 
                   .codigo=123, 
                   .cantidad=2, 
                   .precio=23.23f };
    return p;
}
```
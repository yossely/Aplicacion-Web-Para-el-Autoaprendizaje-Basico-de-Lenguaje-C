Estructura y arreglos pueden ser combinados sin ninguna restricción, lo que implica que los arreglos pueden tener estructuras como elementos y las estructuras pueden tener arreglos y otras estructuras como miembros.

Tener una estructura dentro de otra es útil en casos como: Se desea llevar el registro de estudiantes inscritos en la materia XXXXX, para esto se requiere guardar el nombre completo del estudiante, la cédula de identidad y las notas de los 3 parciales:  
```c
typedef struct
{
    char primer_nombre[31];
    char primer_apellido[31];
}nombre_completo;
```
```c
typedef struct
{
    nombre_completo nombre;
    int cedula;
    float notas_parciales[3];
}estudiante;
```
Vemos que primero hemos creado la estructura `nombre\_completo`, compuesta por *primer\_nombre* y *primer\_apellido* (strings). Luego creamos la estructura `estudiante`, la cual contiene un nombre (de tipo `nombre\_completo`), la cédula y un vector de 3 elementos para guardar las notas de cada parcial. 

Para crear y utilizar una variable de tipo estudiante:
```c
estudiante est1;

printf("Ingrese el nombre del estudiante\n");
scanf("%s",est1.nombre.primer_nombre);

printf("Ingrese el apellido del estudiante\n");
scanf("%s",est1.nombre.primer_apellido);

printf("Ingrese la cedula del estudiante\n");
scanf("%d",&est1.nombre.cedula);

printf("Ingrese las notas parciales:\n");

for (int i = 0; i < 3; ++i)
{
    printf("Parcial %d: \n",i+1);
    scanf("%f",&est1.nombre.notas_parciales[i]);
}
```
Al crear una estructura estamos declarando un nuevo tipo de dato, con el cual es posible crear arreglos como ya hemos estudiado. Si tenemos que llevar el registro de 20 estudiantes (en lugar de 1):
```c
int cantidad_estudiantes = 20;
estudiante estudiantes[cantidad_estudiantes];
```
De esta manera la variable estudiantes contendrá la información de 20 estudiantes.

Para acceder a cada estudiante y su información, usamos la combinación de dos notaciones ya conocidas: `[indice]` para acceder a un elemento (estudiante) y `.` (punto) para acceder a sus miembros (*nombre*, *cedula* y *notas_parciales*):
```c
int i;
// Ciclo para guardar información de cada estudiante
for (i = 0; i < cantidad_estudiantes; ++i)
{
    printf("Ingrese el nombre del estudiante\n");
    scanf("%s",estudiantes[i].nombre.primer_nombre);

    printf("Ingrese el apellido del estudiante\n");
    scanf("%s",estudiantes[i].nombre.primer_apellido);

    printf("Ingrese la cedula del estudiante\n");
    scanf("%d",&estudiantes[i].nombre.cedula);

    printf("Ingrese las notas parciales:\n");
    
    /*Ciclo para guardar la nota de cada parcial 
        de un estudiante */
    for (int j = 0; j < 3; ++j)
    {
        printf("Parcial %d: \n",j+1);
        scanf("%f",&estudiantes[i].nombre.notas_parciales[j]);
    }
}
```
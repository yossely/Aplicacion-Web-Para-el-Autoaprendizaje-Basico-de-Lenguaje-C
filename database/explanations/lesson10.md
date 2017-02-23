Muchas veces, en el cuerpo de los ciclos necesitemos aumentar o disminuir progresivamente algún valor (**contador**) o tal vez sumar valores en alguna variable y mostrar el total al final (**acumulador**), para estos casos existen operadores que nos ayudan a simplificar expresiones. Si tenemos:
```c
int i=0;
```
 - `i++;`    → se usa el valor viejo (0) en la instrucción actual y al finalizar, el operador ++ incrementa en 1 el valor guardado en i:
  - `printf("%d\n", i++);` → imprime 0
 - `++i;`     → se incrementa en 1 el valor guardado en i ANTES de ser usado en la instrucción actual:
  - `printf("%d\n", ++i);` → imprime 1
 - `i--;`    → se usa el valor viejo (0) en la instrucción actual y al finalizar, el operador -- decrementa en 1 el valor guardado en i
 - `--i;`     → se decrementa en 1 el valor guardado en i ANTES de ser usado en la instrucción actual
 - `i+=6;`     → el operador += equivale a tomar el valor que hay en i, sumarle 6 y guardar el resultado nuevamente en i. Con esto podemos crear acumuladores de la forma: `acumulador += nuevoValor;` donde se toma el valor que hay en *acumulador*, se suma el *nuevoValor* y se guarda el resultado nuevamente en la variable *acumulador*.
 - El operador `+=` se aplica de la misma manera con los demás operadores matemáticos `-=`, `*=`, `/=`, `%=`
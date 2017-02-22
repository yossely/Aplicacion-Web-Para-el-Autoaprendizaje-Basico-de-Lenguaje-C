#include <stdio.h> 

int main(){ 
    
    printf("What is your name, lastname, and address? \n"); 
    char name[30],lastname[30],address[30]; 
    scanf("%s",name); 
    scanf("%s",lastname); 
    scanf("%s",address); 

    printf("How old are you? \n"); 
    int age; 
    scanf("%d",&age); 

    printf("Nice to meet you %s %s who is %d years old and live in %s \n",name, lastname, age, address);   
    return 0;
}

/*#include <stdio.h> 

int main(){ 
    
    printf("What is your name? \n"); 
    char name[30]; 
    scanf("%s",name); 

    printf("How old are you? \n"); 
    int age; 
    scanf("%d",&age); 

    printf("Nice to meet you %s who is %d years old \n",name, age);   
    return 0;
}*/

/*
#include <stdio.h>

int main()
{
  int i;
  int count = 10;

  for ( i = 0; i < count; ++i)
  {
    int j;
    for (j = 0; j < i; ++j)
    {
      printf("-");
    }

    printf("\n");
  }

  return 0;
}

 */
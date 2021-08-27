#Introduction

>bloquear el cierre de la ventana del tutorial

##First page
Welcome to War Commands!!

Here you will have fun and learn how to program. 
Don't panic, it will be easy, for everybody, and for all ages, from the youngest to the most senior at home, 
and don't forget, fun!!

##Second page
There is no need to have any developer skill, you will learn everything from zero to hero, the only thing you need is passion
and be willing to learn while playing.

##Third page
So, the first you need to learn is how to open the tutorial!! 

Shall we start?

##Fourth page
Open the tutorial

>mostrar icono del tutorial y dejarlo en blinking, ahora se debe permitir el cerrar overlay, sino no se puede seleccionar el 
boton del tutorial



<hr>

#Newcomers
##Your first worker
###Step 1
As you may have guessed, this is a war, and you are the Commander in charge, so you must give commands by typing commands, 
remember this is WarCommands!

###Step 2
So your first command will be to create a worker to harvest resources 
<gif rotando de un minion>

###Step 3
Drag the Game command to the command panel
>show a gif of the dragging action, we have to create 2 gif, desktop and mobile screen sizes

* bloquear todos los comandos para que solo se puede arrastrar el Game
* bloquear al CommandContainer de la pagina para que solo se pueda arrastrar dentro del gameLoop

###Step 4
Select createWorker
>gif

* Pos quizas es mejor eliminar el punto del getBaseByName, habria que mantenerlo pero que no sea visible
* Desabilitar todas las demas opciones y dejar solamente la de creacion del worker 

###Step 5
Save the file
>blink button

###Step 6
Go to the game world
>blink button

###Step 7
Play game
>blink button

##Resources
###Step 1
- Pausar el juego automaticamente al haber creado los primeros 5 workers (demos unos 5 segundos)
- Mostrar el tutorial

Congratulations commander!!

Your first five workers are waiting to get their orders.

###Setp 2
But why only five workers have been created? 

This is cause you run out your resources.

>gif o imagen mostrando la ventanita de los recursos

###Step 3
In WarCommands world, as in the real world, you need to collect resources to build so, 
lest go to harvest!

##Harvest


- Poner el primer worker a cosechar energia
- Poner el segundo worker a cosechar materia
- let the workers do their work for a moment and let me explain what is warcommands


###Actions bar

#commads panel
explain commands?
#File buttons
explain buttons
#Files
intro -> explain is still a work in progress
#File editor
explanation




#First steps
Game command
none
getBase by name

<hr>

#To develop
* Al arrancar el juego  se debe comprovar si el tutorial ya se ha mostrado, en caso negativo se debe mostrar la introduccion
  bloqueando la posibilidad de cerrarlo hasta mostrar el punto de como abrir el tutorial.
* Añadir en el store un flag indicando si se puede o no cerrar el tutorial y asi saber cuando
  esconder el boton de cerrar e ignorar la tecla del escape
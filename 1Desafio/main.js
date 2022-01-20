/*
Solicita una clave en un do while  con una bandera de primer ingreso para solicitarte la clave y
al equivocarte en el siguiente bucle te dice cual es la clave en caso de colocarla erroneamente te 
avisa que te equivocaste y que te quedan X intentos. si colocas bien la clave o si agotas los intentos 
te muestra un alert distinto
*/

let firstEntry = true;
let password = 'CLAVE123';
let ingreso;
let reintentos=4;

do
{
    if (firstEntry)
    {
        ingreso = prompt("Ingrese la contraseña de acceso alfanumerica").toUpperCase() 
        firstEntry =false;
    }
    else
    {
        if(ingreso != password)
        {
            alert("Clave incorrecta quedan "+ reintentos + " reintentos")
            ingreso = prompt("Porfavor reingrese clave. Recuerde que la contraseña es clave123 ").toUpperCase()
            reintentos--;
        }
    }

    if(ingreso == password)
    {
        alert("Clave aceptada!! Bienvenido")
    }
    else if (reintentos == 0)
    {
        alert("Se agotaron los intentos, Aceso Bloqueado")
        alert ( "Programa cerrado")
    }
}while (ingreso != password&& reintentos>0)

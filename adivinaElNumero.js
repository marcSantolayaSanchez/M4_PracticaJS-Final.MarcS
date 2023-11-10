let numeroSecreto = Math.floor(Math.random() * 90000) + 10000;
let numeroSecretoString = numeroSecreto.toString();
console.log(numeroSecreto);
let victoria = false
let intentos = 0; // Inicializamos el contador de intentos a 0
let intentosAnteriores = []; // Almacenamos los intentos anteriores

function formulario() {
    if (intentos >= 6) {
        document.getElementById("intento").textContent = `No más intentos, El número era: ${numeroSecretoString}`;
        return;
    }
    if (victoria) {
        return;

    }
    /* 
        Utilizo el input.trim para los espacios en blanco que ponga el usuario.
    */
    let input = document.getElementById("digitos").value;
    let numeroUsuario = input.trim();
    /* 
        Si el usuario intenta poner un numero mayor a 5 digitos, le saltara un alert diciento que tiene que seguir el ejemplo. 
    */
    if (numeroUsuario.length !== 5 || isNaN(numeroUsuario)) {
        alert("PON 5 DIGITOS COMO EN EL EJEMPLO");
        return;
    }

    /* 
        Aqui valido el contenedor de los cubos. 
     */
    let cubosContainer = document.getElementById("cubosContainer");

    /* 
        En esta parte creo las filas.
    */

    let nuevaFila = document.createElement("div");
    nuevaFila.className = "filaDeCubos";

    /* 
        Utilizo un for para leer el numero de usuario ademas creo los cubos de color gris.
    */
    for (let i = 0; i < numeroUsuario.length; i++) {

        let cubo = document.createElement("div");
        cubo.className = "cubo";
        cubo.style.backgroundColor = "grey";
        /* 
            Creo un if en el cual si en el array del numero del usuario un numero es igual al numero secreto, este hará que el cubo en vez de gris sea verde.
            A parte utilizo un .includos para saber si el numero del usuario esta en el numero secreto pero no en esa posicion. Si esta, lo pongo en amarillo. 
        */
        if (numeroUsuario[i] === numeroSecretoString[i]) {
            cubo.style.backgroundColor = "green";
            document.querySelectorAll("#valorNumeroSecreto p")[i].textContent = numeroUsuario[i];
        } else if (numeroSecretoString.includes(numeroUsuario[i])) {
            cubo.style.backgroundColor = "yellow";
        }
        /* 
           Aqui utilizo un textContent para que en cubo se escriba el numero del usuario.
           Y utilizo appenChild para que se creen filas debajo de un elemento padre.
           En este caso se iran creando por debajo de la información de los intentos. 
           Y  cierro el for.
        */
        cubo.textContent = numeroUsuario[i];
        nuevaFila.appendChild(cubo);
    }
    /* 
        Aqui agrego la fila de cubos al contenedor, utilizando de nuevo el appendChild.
    */
    cubosContainer.appendChild(nuevaFila);



    /* 
        Aqui creo un if para generar la victoria. Si el usuario acierta salta un mensaje en informacion y ademas esta cambia de color.
        El problema es que en teoria, deberia de dejar de usar el boton de comprobar ya que quito el elemento "formulari" pero aun asi 
        en el html puedes seguir dandole a comprobar hasta quedarte sin intentos. Tambien uso un return pero el boton de comprobar sigue funcionando. 
        Si el usuario agota los intentos salta un mensaje.  
    */
    if (numeroUsuario === numeroSecretoString) {
        document.getElementById("intento").textContent = `HAS GANADO, LOQUETE!`;
        document.getElementById("intento").style.backgroundColor = "#09E4B9";
        victoria = true;


    } else {
        document.getElementById("intento").textContent = `HAS USADO UN ${intentos} de 6`;

    }



    /* 
        En este paso, me dirigo a hacer los intentos. Simplemento incremento el contador de intentos.
        Ademas utilizo el push para almacenar el intento actual en el array de los intentos anteriores.
        El push sirve para añadir uno o mas elementos al final de un array y devolver la longitud. 
    */
    intentos++;
    intentosAnteriores.push(numeroUsuario);
    /*
    Utilizo compararIntentosAnteriores para buscar el intento anterior más cercano al intento actual del usuario utilizando 
    la distancia entre los dígito sen la misma posición en ambos intentos.
    Luego, devuelve ese intento anterior más cercano.
    */
    let intentoCercano = compararIntentosAnteriores(numeroUsuario);
    /* 
        Continuo creando una funcion para determinar cual de los intentos del usuario esta mas cera del intento actual del usuario.
        Comienzo creando una variable la cual seleciona el primer intento para iniciar una comparacion.
    */

    function compararIntentosAnteriores(nuevoIntento) {

        let intentoCercano = intentosAnteriores[0];
        /* 
            En esta parte calculo la distancia entre el nuevo intento y el primer intento anterior.
        */
        let distanciaCercana = calcularDistancia(nuevoIntento, intentoCercano);
        /* 
            Creo un for para leer todos los intentos anteriores
        */
        // Itera sobre todos los intentos anteriores
        for (let intentoAnterior of intentosAnteriores) {
            /* 
                Vuelvo a calcular la distancia pero esta vez con el intento anterior, no el primero. 
            */
            let distancia = calcularDistancia(nuevoIntento, intentoAnterior);
            /* 
                Comparo la distancia actual con la distancia mas cercana encontrada actualmente.
                Si la distancia es menor, se actualiza la distancia cercana y el intento cercano. 
            */

            if (distancia < distanciaCercana) {

                distanciaCercana = distancia;
                intentoCercano = intentoAnterior;
            }
        }

        return intentoCercano;
    }

    /* 
       Esta funcion la utilizo en la funcion anterior para calcular la distancia entre los nuevos intentos y cada intento almacenado.
   */
    function calcularDistancia(intentoA, intentoB) {


        for (let i = 0; i < intentoA.length; i++) {
            if (intentoA[i] !== intentoB[i]) {
                distancia++;
            }
        }
        return;


    }
}


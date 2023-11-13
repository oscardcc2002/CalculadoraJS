let operandoa = "";
let operacion = "";
let botones;
let texto;
let resultado;
let puntoIngresado = false;
let parentesisIngresado = false;


document.addEventListener('keydown', function(event) {
    let key = event.key;

    let keyMappings = {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '0': '0',
        '.': '.',
        '+': '+',
        '-': '-',
        'x': 'x',
        '/': '/',
        '%': '%',
        'Enter': '=',
        'Backspace': '«',
        'Delete': 'C',
        '(': '( )',
        ')': '( )'
    };

    let buttonEquivalent = keyMappings[key];

    if (buttonEquivalent) {
        let button = document.querySelector(`[data-text="${buttonEquivalent}"]`);
        if (button) {
            button.click();
        }
    }
});



window.onload = function() {
    botones = document.getElementsByClassName('boton');
    resultado = document.getElementById('resultado');
    for (boton of botones) {
        boton.addEventListener('click', pulsar);
    }
}






function pulsar() {
    texto = this.innerText;

    if (texto === '+' || texto === '-' || texto === 'x' || texto === '/' || texto === '%') {
        let ultimoCaracter = operandoa.charAt(operandoa.length - 1);

        // Si el último carácter es también un operador, no permitas que se ingrese el operador actual
        if (isNaN(ultimoCaracter) && ultimoCaracter !== ')') {
          
                return;
            
        }
    }

    if (!isNaN(texto) || texto === ".") {

        if (resultado.value === "0") {
            if (texto === ".") {
                // Si el resultado es igual a "0" y se presiona ".", se añade un "0." al resultado
                resultado.value = "0";
                operandoa = "";
                operacion = "";
                console.log("Entra2");
            } else {
                resultado.value = "";
                // Si el resultado es igual a "0" y no se presiona ".", se reemplaza el contenido con el texto actual
                
            }
        }
    
        if (texto === "." && !puntoIngresado) {
            // Si no se ingresó un punto, hacemos la variable en true y escibimos
            puntoIngresado = true; 
            operandoa += texto;
            resultado.value += texto;
        } else if (!isNaN(texto)){
            operandoa += texto;
            resultado.value += texto;
        }
  




    } else if (texto === '+' || texto === '-' || texto === 'x' || texto === '/' || texto === '%'|| texto === '*') {
        operacion = texto;


            if (operacion === 'x') {
                operandoa += '*';
                resultado.value += 'x';
            } 

            else if (operacion === '%'){

                operandoa += '*(1/100)*';
                resultado.value += '%';
            }
                else  {
                    operandoa += operacion;
                    resultado.value += operacion;
                }

                puntoIngresado = false;


    } else if (texto === '=') {
        // Si es '=', evaluamos la cadena de operaciones y mostramos el resultado
        try {
        resultado.value = eval(operandoa);
            operandoa=resultado.value
        } catch (error) {
            resultado.value = "Error";
            return;
        }
        
        if(resultado.value.includes(".")){
            puntoIngresado = true;
        }else{
            puntoIngresado = false;
        }
        





    } else if (texto === 'C') {
        // Si es 'C', borramos el contenido del resultado y volvemos todas las variables a 0
        resultado.value = "0";
      operandoa = "";
        operacion = "";
        puntoIngresado = false;
        parentesisIngresado = false;







        

    }   else if (texto === '«') {
        if (resultado.value[resultado.value.length - 1] === ".") {
            puntoIngresado = false;
        } else if (resultado.value[resultado.value.length - 1] === ")") {
            parentesisIngresado = true;
        } else if (resultado.value[resultado.value.length - 1] === "(") {
            parentesisIngresado = false;
        }

        operandoa = operandoa.slice(0, -1);
        resultado.value = resultado.value.slice(0, -1);
    
        if (resultado.value === "") {
            resultado.value = "0";
            operandoa = "";
            operacion = "";
            puntoIngresado = false;
            parentesisIngresado = false;
        }

        












    }else if (texto === '( )') {
        let ultimoCaracter = operandoa.charAt(operandoa.length - 1);

        if (!isNaN(ultimoCaracter) && ultimoCaracter !== ')' && !parentesisIngresado && operandoa !== '' && ultimoCaracter !==".") {
            // Si el último carácter es un número y no se ha ingresado un paréntesis, agrega un paréntesis de apertura
            operandoa += '*(';
            resultado.value += 'x(';
            parentesisIngresado = true;
        } else if (isNaN(ultimoCaracter) && ultimoCaracter !== ')' && !parentesisIngresado && ultimoCaracter !==".") {
            // Si el último carácter no es un número y no se ha ingresado un paréntesis, agrega una multiplicación y un paréntesis de apertura
            operandoa += '(';
            resultado.value += '(';
            parentesisIngresado = true;
        } 
        
        
        else if(resultado.value === "0"  && !parentesisIngresado  && ultimoCaracter !==".") {
            resultado.value = "(";
            operandoa = "(";
            parentesisIngresado = true;
    
    }
        
        
        else if (parentesisIngresado && ultimoCaracter !==".") {
            // Si ya hay un paréntesis de apertura, cierra el paréntesis
            operandoa += ')';
            resultado.value += ')';
            parentesisIngresado = false;
        }
    }

    console.log(operandoa);

}


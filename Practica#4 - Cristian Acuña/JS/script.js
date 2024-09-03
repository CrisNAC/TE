// Arreglo para almacenar los clientes.
const listClientes = [];

/* const c = new Cliente('Juan', 34, 'juan@gmail.com');
listClientes.push(c); */

// Variable para controlar si estamos en modo edicion.
let indexEdit = -1;


// Cuando el DOM se carga por completo se muestra la lista.
document.addEventListener('DOMContentLoaded', function () {
    showList();
});


/**
 * Para agregar o editar los datos del Cliente.
 * Dependiendo del 'indexEdit' se agregara o se editara al cliente.
 */
function saveClient() {
    const name = document.getElementById('txt-Nombre').value;
    const edad = document.getElementById('txt-Edad').value;
    const email = document.getElementById('txt-Email').value;
    document.getElementById('title-principal').innerText = 'Nuevo cliente';

    if (controlError(name, edad, email)) {
        if (confirm('¿Está seguro de guardar estos datos?')) {
            if (indexEdit === -1) { // En esta parte se creara el cliente. 
                const cliente = new Cliente(name, edad, email);
                listClientes.push(cliente);
            } else { // En esta parte se editara el cliente.
                listClientes[indexEdit].name = name;
                listClientes[indexEdit].edad = edad;
                listClientes[indexEdit].email = email;
                indexEdit = -1;  // Salimos del modo edicion.
            }
            clearFields();
            alert('Los datos fueron guardados con éxito.');
            showList();
        } else {
            alert('Los datos no fueron registrados.');
        }
    }
}

/**
 * Para controlar los datos ingresados en los campos de entrada.
 * 
 * Controla que los campos no esten vacio.
 * En la edad controla que tenga un rango aceptable.
 * En el correo se verifica si tiene arroba y punto, y que
 * tenga valores antes y despues.
 * 
 * @param {*} name 
 * @param {*} edad 
 * @param {*} email 
 * @returns 
 */
function controlError(name, edad, email) {
    let control = true;
    const errorNombre = document.getElementById('error-Nombre');
    const errorEdad = document.getElementById('error-Edad');
    const errorEmail = document.getElementById('error-Email');

    if (name.trim() === '') {
        showError(errorNombre, 'Ingrese su nombre');
        control = false;
    } else {
        hideError(errorNombre);
    }

    if (edad === '' || edad < 1 || edad > 100) {
        showError(errorEdad, 'Ingrese una edad válida');
        control = false;
    } else {
        hideError(errorEdad);
    }

    const correo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo.test(email)) {
        showError(errorEmail, 'Ingrese su correo');
        control = false;
    } else {
        hideError(errorEmail);
    }
    return control;
}

/**
 * Limpia los campos de entrada.
 */
function clearFields() {
    document.getElementById('txt-Nombre').value = '';
    document.getElementById('txt-Edad').value = '';
    document.getElementById('txt-Email').value = '';
}

/**
 * Muestra los mensajes de error.
 * Recibe el campo donde se quiere modificar el mensaje y
 * el mensaje que se quiere poner.
 * 
 * @param {*} element 
 * @param {*} message 
 */ 
function showError(element, message) {
    element.innerText = message;
    element.style.display = 'block';
}

/**
 * Oculta los mensajes de error.
 * Recibiendo el campo que se quiere ocultar. 
 * 
 * @param {
 * } element 
 */
function hideError(element) {
    element.style.display = 'none';
}

/**
 * Para cancelar el ingreso de datos.
 * Vuelve a mostrar la lista.
 */
function cancelClient() {
    alert('Cancelando...');
    document.getElementById('title-principal').innerText = 'Nuevo cliente';
    clearFields();
    indexEdit = -1;  // Reseteamos el modo edicion.
    document.getElementById('error-Nombre').style.display = 'none';
    document.getElementById('error-Edad').style.display = 'none';
    document.getElementById('error-Email').style.display = 'none';
    showList();
}

/**
 * Muestra la lista de clientes.
 * Ocultar el formulario.
 */
function showList() {
    ocultar();
    const lista = document.getElementById('list');
    const listaVacia = document.getElementById('list-Vacia');
    if (listClientes.length < 1) {
        lista.style.display = 'none';
        listaVacia.style.display = 'block';
    } else {
        lista.style.display = 'block';
        listaVacia.style.display = 'none';
        const buffer = [];
        buffer.push('<table class="table table-striped"><thead><th>Id</th><th>Nombre</th><th>Edad</th><th>Email</th><th>Acciones</th></thead><tbody>');
        listClientes.forEach((cliente, index) => {
            buffer.push(`
                <tr>
                    <td>${cliente.id}</td>
                    <td>${cliente.name}</td>
                    <td>${cliente.edad}</td>
                    <td>${cliente.email}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editClient(${index})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteClient(${index})">Borrar</button>
                    </td>
                </tr>
            `);
        });
        buffer.push('</tbody></table>');
        lista.innerHTML = buffer.join('');
    }
}

/**
 * Muestra el formulario.
 * Oculta la lista de clientes y el boton de agregar cliente.
 */
function mostrar() {
    document.getElementById('content-form').style.display = 'block';
    document.getElementById('content-list').style.display = 'none';
    document.getElementById('agregarCliente').style.display = 'none';
}

/**
 * Oculta el formulario.
 * Muestra la lista de clientes y el boton de agregar cliente.
 */
function ocultar() {
    document.getElementById('content-list').style.display = 'block';
    document.getElementById('content-form').style.display = 'none';
    document.getElementById('agregarCliente').style.display = 'block';
}

/**
 * Edita el cliente recibiendo su posicion del arreglo.
 * Se cargan los datos en los campos de entrada para modificar sus valores.
 * 
 * @param {*} index 
 */
function editClient(index) {
    mostrar();
    document.getElementById('title-principal').innerText = 'Editando el Cliente';
    const name = document.getElementById('txt-Nombre');
    const edad = document.getElementById('txt-Edad');
    const email = document.getElementById('txt-Email');

    const cliente = listClientes[index];
    name.value = cliente.name;
    edad.value = cliente.edad;
    email.value = cliente.email;

    indexEdit = index;
}

/**
 * Elimina al cliente de la lista recibiendo su posicion del arreglo.
 * 
 * @param {*} index 
 */
function deleteClient(index) {
    listClientes.splice(index, 1);
    showList();
}
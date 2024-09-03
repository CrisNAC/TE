let idCliente = 1;

function Cliente(name, edad, email) {
    this.id = idCliente++;
    this.name = name;
    this.edad = edad;
    this.email = email;
}
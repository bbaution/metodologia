const listado = document.getElementById("lis");
const fecha = document.getElementById("fechaIds");
const total = document.getElementById("totalIds");
const observaciones = document.getElementById("observacionesIds");
const producto = document.getElementById("productoIds");
const clienteVentas = document.getElementById("clienteIds");
const rubroVentas = document.getElementById("rubroIds");
const objeciones = document.getElementById("objecionesIds");
const btnAgr = document.getElementById("agr");
const btnAct = document.getElementById("act");



let auxiliar;

listarId()
listar()


// validaciones

//crud
//buscador
document.addEventListener("keyup", e => {

    if (e.target.matches("#buscador")) {

        if (e.key === "Escape") e.target.value = ""

        document.querySelectorAll(".articulo").forEach(cliente => {

            cliente.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ? cliente.classList.remove("filtro")
                : cliente.classList.add("filtro")
        })

    }
})
//

async function guardar() {
    try {
        resp = axios.post("http://localhost:3000/consulta",
            {
                fecha: fecha.value,
                total: total.value,
                observaciones: observaciones.value,
                producto: producto.value,
                clienteId: clienteVentas.value,
                rubroId: rubroVentas.value,
                objecionesId: objeciones.value
            }
        )
    }

    catch (error) {
        console.log(error)
        alert("error")
    }
}




async function listar() {
    try {

        resp = await axios.get("http://localhost:3000/consulta/")
        listado.innerHTML = ""
        resp.data.forEach(async element => {
            respClientes = await axios.get("http://localhost:3000/clientes/" + element.clienteId),
                respRubro = await axios.get("http://localhost:3000/rubro/" + element.rubroId),
                respObjeciones = await axios.get("http://localhost:3000/objeciones/" + element.objecionesId),

                listado.innerHTML += '<hr> <li class="articulo"> <ul class="listado">' + '<button onclick="borrar(' + element.id + ')" class="bg-danger me-1"><i class="fa-solid fa-trash"></i></button>' + '<button onclick="mostrar(' + element.id + ')"class="bg-success me-2"><i class="fa-solid fa-pencil"></i></button>' + "</br> " + "Fecha: " + element.fecha + "<li>" + "Total: " + element.total + "</li><li>" + "<li>" + "Observaciones: " + element.observaciones + "</li><li>" + "<li>" + "Producto: " + element.producto + "</li><li>" + "<li>" + "Cliente: " + respClientes.data.nombre + "</li><li>"+ "<li>" + "Rubro: " + respRubro.data.direccion + "</li><li>"+ "<li>" + "Objeciones: " + respObjeciones.data.direccion + "</li>"+ "</li></ul> </li> <hr>"
        })
    } catch (error) {
        console.log(error)
        alert(error)
    }
}






async function mostrar(id) {
    try {
        btnAct.hidden = false;
        btnAgr.hidden = true;
        auxiliar = id;
        resp = await axios.get("http://localhost:3000/clientes/" + id);
        fecha.value = resp.data.fecha;
        total.value = resp.data.total;
        observaciones.value = resp.data.observaciones;
        producto.value = resp.data.producto;
        clienteVentas.value = resp.data.clienteId;
        rubroVentas.value = resp.data.rubroId;
        objeciones.value = resp.data.objecionesId;
    } catch (error) {

        console.log(error)
        alert("error")
    }
}

// async function actualizar() {

//     resp = await axios.put("http://localhost:3000/prestamos/" + auxiliar,
//         {
//             librosId: fecha.value,
//             alumnosId: total.value,
//             fechaPrestamo: fechaPrestamo.value,
//             fechaDevolucion: fechaDevolucion.value
//         })
//     btnAct.hidden = true;
//     btnAgr.hidden = false;
// }


async function actualizar() {
    try {


        resp = await axios.put("http://localhost:3000/clientes/" + auxiliar, {
            fecha: fecha.value,
            total: total.value,
            observaciones: observaciones.value,
            producto: producto.value,
            clienteId: clienteVentas.value,
            rubroId: rubroVentas.value,
            objecionesId: objeciones.value

        });

        btnAct.hidden = true;
        btnAgr.hidden = false;
    } catch (error) {
        console.log(error);
        alert("error");
    }
}


async function borrar(id) {
    try {
        await axios.delete("http://localhost:3000/consulta/" + id);
        listar()


    } catch (error) {
        console.log(error)
        alert("error")
    }
}


async function listarId() {

    try {
        let respLocalidades = await axios.get("http://localhost:3000/clientes");

        clienteVentas.innerHTML = "";
        respLocalidades.data.forEach(element => {
            clienteVentas.innerHTML += '<option value="' + element.id + '" id="prueba"> ' + element.nombre + '</option>'


        });


        let respCanal = await axios.get("http://localhost:3000/rubro");
        rubroVentas.innerHTML = "";
        respCanal.data.forEach(element => {
            rubroVentas.innerHTML += '<option value="' + element.id + '" id="prueba"> ' + element.direccion + '</option>'
        })

        let respFormaDePago = await axios.get("http://localhost:3000/objeciones");
        objeciones.innerHTML = "";
        respFormaDePago.data.forEach(element => {
            objeciones.innerHTML += '<option value="' + element.id + '" id="prueba"> ' + element.direccion + '</option>'
        })
    }

    catch (error) {
        console.log(error);
    }

}

// json-server -w db.json
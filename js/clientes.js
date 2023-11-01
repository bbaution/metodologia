const listado = document.getElementById("lis");
const localidadesClientes = document.getElementById("localidadesIds");
const canalClientes = document.getElementById("canalIds");
const pagoClientes = document.getElementById("formaDePagoIds");
const dniClientes = document.getElementById("dni")
const telefonoClientes = document.getElementById("telefono")
const nombreClientes = document.getElementById("nombre")
const btnAgr = document.getElementById("agr");
const btnAct = document.getElementById("act")

let auxiliar;

listarId()
listar()


// validaciones

//crud
//buscador
document.addEventListener("keyup", e=>{

    if (e.target.matches("#buscador")){
  
        if (e.key ==="Escape")e.target.value = ""
  
        document.querySelectorAll(".articulo").forEach(cliente =>{
  
            cliente.textContent.toLowerCase().includes(e.target.value.toLowerCase())
              ?cliente.classList.remove("filtro")
              :cliente.classList.add("filtro")
        })
  
    }
  })
//

async function guardar() {
try {
    resp = axios.post("http://localhost:3000/clientes",
            {
                localidadesId: localidadesClientes.value,
                canalId: canalClientes.value,
                pagosId: pagoClientes.value,
                dni: dniClientes.value,
                telefono: telefonoClientes.value,
                nombre: nombreClientes.value
                
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

        resp = await axios.get("http://localhost:3000/clientes/")
        listado.innerHTML = ""
        resp.data.forEach(async element => {
            respLocalidad = await axios.get("http://localhost:3000/localidades/" + element.localidadesId),
            respPagos = await axios.get("http://localhost:3000/pagos/" + element.pagosId),
            respCanales = await axios.get("http://localhost:3000/canal/" + element.canalId),

            listado.innerHTML += ' <li class="articulo"> <hr> <ul class="listado">' + '<button onclick="borrar(' + element.id + ')" class="bg-danger me-1"><i class="fa-solid fa-trash"></i></button>' + '<button onclick="mostrar(' + element.id + ')"class="bg-success me-2"><i class="fa-solid fa-pencil"></i></button>' + "</br> " + "Cliente: " + element.nombre + "<li>" + "Forma de Pago: " + respPagos.data.direccion + "</li><li>" + " Localidad: " + respLocalidad.data.direccion + "</li><li>" + " DNI: " + element.dni + "</li><li>" +  " Telefono: " + element.telefono +  "</li><li>" + " Canal de Comunicacion: " + respCanales.data.direccion + "</li></ul> <hr></li> "
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
        localidadesClientes.value = resp.data.localidadesId;
        canalClientes.value = resp.data.canalId;
        pagoClientes.value = resp.data.pagosId;
        dniClientes.value = resp.data.dni;
        telefonoClientes.value = resp.data.telefono;
        nombreClientes.value = resp.data.nombre;
    } catch (error) {
        console.log(error)
        alert("error")
    }
}

// async function actualizar() {

//     resp = await axios.put("http://localhost:3000/prestamos/" + auxiliar,
//         {
//             librosId: localidadesClientes.value,
//             alumnosId: canalClientes.value,
//             fechaPrestamo: fechaPrestamo.value,
//             fechaDevolucion: fechaDevolucion.value
//         })
//     btnAct.hidden = true;
//     btnAgr.hidden = false;
// }


async function actualizar() {
    try {


        resp = await axios.put("http://localhost:3000/clientes/" + auxiliar, {
                localidadesId: localidadesClientes.value,
                canalId: canalClientes.value,
                pagosId: pagoClientes.value,
                dni: dniClientes.value,
                telefono: telefonoClientes.value,
                nombre: nombreClientes.value
            
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
            await axios.delete("http://localhost:3000/clientes/" + id);
            listar()
        
        
    } catch (error) {
        console.log(error)
        alert("error")
    }
}

 
async function listarId() {

    try {
        let respLocalidades = await axios.get("http://localhost:3000/localidades");

        localidadesClientes.innerHTML = "";
        respLocalidades.data.forEach(element => {
            localidadesClientes.innerHTML += '<option value="' + element.id + '" id="prueba"> ' + element.direccion + '</option>'


        });


        let respCanal = await axios.get("http://localhost:3000/canal");
        canalIds.innerHTML = "";
        respCanal.data.forEach(element => {
            canalIds.innerHTML += '<option value="' + element.id + '" id="prueba"> ' + element.direccion + '</option>'
        })

        let respFormaDePago = await axios.get("http://localhost:3000/pagos");
        formaDePagoIds.innerHTML = "";
        respFormaDePago.data.forEach(element => {
            formaDePagoIds.innerHTML += '<option value="' + element.id + '" id="prueba"> ' + element.direccion + '</option>'
        })
    }

    catch (error) {
        console.log(error);
    }

}

// json-server -w db.json
const listado = document.getElementById("lis");
const prestados = document.getElementById("lisNoDev")
const devueltos = document.getElementById("lisPres")
const libroPrestamo = document.getElementById("librosIds");
const alumnoPrestamo = document.getElementById("alumnosIds");
const fechaPrestamo = document.getElementById("fechaPres");
const fechaDevolucion = document.getElementById("fechaDev");
const btnAgr = document.getElementById("agr");
const btnAct = document.getElementById("act")
let auxiliar;

listarId()
listar()
listaPrestamos()

// validaciones
async function validarInput() {
    let bandera = false;
    try {
        if (fechaPres.value == "") {
            alert("Debe ingresar la fecha del préstamo!");
            bandera = true;
        } else if (fechaPres.value > fechaDev.value && fechaDev.value !== "") {
            alert("Debe seleccionar una fecha de devolución válida.");
            bandera = true;
        } else {

        }
    } catch (error) {
        console.log(error);
    }
    return bandera;
}



async function noFueDevuelto(id) {
    let bandera = false;
    try {

        let resp = await axios.get("http://localhost:3000/prestamos");
        resp.data.forEach(element => {
            if (element.librosId == id && element.fechaDevolucion == "") {
                bandera = true;
            }
        })
    } catch (error) {
        console.log(error)
    }

    return bandera;
}


//crud


async function guardar() {
try {
    if (await validarInput()) {  
    } else {
        resp = axios.post("http://localhost:3000/prestamos",
            {
                librosId: libroPrestamo.value,
                //librosTitulo: libroPrestamo.value,
                alumnosId: alumnoPrestamo.value,
                //alumnosNombre: alumnoPrestamo.value,
                fechaPrestamo: fechaPrestamo.value,
                fechaDevolucion: fechaDevolucion.value
            }
        )
    }
        
} catch (error) {
        console.log(error)
        alert("error")
    }
}




async function listar() {
    try {

        resp = await axios.get("http://localhost:3000/prestamos/")
        listado.innerHTML = ""
        resp.data.forEach(async element => {
            respAlumnos = await axios.get("http://localhost:3000/alumnos/" + element.alumnosId),
            respLibros = await axios.get("http://localhost:3000/libros/" + element.librosId)
            listado.innerHTML += '<hr> <ul class="listado">' + '<button onclick="borrar(' + element.id + ')" class="bg-danger me-1"><i class="fa-solid fa-trash"></i></button>' + '<button onclick="mostrar(' + element.id + ')"class="bg-success me-2"><i class="fa-solid fa-pencil"></i></button>' + "Prestamo: |" + element.id + "<li>" + "Libro: " + respLibros.data.titulo + "</li><li>" + " Alumno: " + respAlumnos.data.nombre + "</li><li>" + " Fecha de Prestamo:" + element.fechaPrestamo + "</li><li>" + " Fecha de devolucion:" + element.fechaDevolucion + "</li></ul> <hr>"
        })
    } catch (error) {
        console.log(error)
        alert(error)
    }
}



async function listaPrestamos(){
    try 
    {
        let resp = await axios.get("http://localhost:3000/prestamos");
        prestados.innerHTML = "";
        devueltos.innerHTML = "";
        

        resp.data.forEach(async element=>{
            respAlumnos = await axios.get("http://localhost:3000/alumnos/" + element.alumnosId),
            respLibros = await axios.get("http://localhost:3000/libros/" + element.librosId)
            if(element.fechaDevolucion == "")
            {
                prestados.innerHTML += '<hr> <ul class="listado>' + "Prestamo: " + element.id + "<li>" + "Libro: " + respLibros.data.titulo + "</li><li>" + " Alumno: " + respAlumnos.data.nombre + "</li><li>" + " Fecha de Prestamo: " + element.fechaPrestamo + "</li><li>" + " Fecha de devolucion:" + element.fechaDevolucion + "</li></ul> <hr>"
                

            }
            else
            {
                devueltos.innerHTML +=  '<hr> <ul class="listado">' + "Prestamo: " + element.id + "<li>" + "Libro: " + respLibros.data.titulo + "</li><li>" + " Alumno: " + respAlumnos.data.nombre + "</li><li>" + " Fecha de Prestamo:" + element.fechaPrestamo + "</li><li>" + " Fecha de devolucion:" + element.fechaDevolucion + "</li></ul> <hr>"
            }
        })   
    } 
        
    catch (error) {
        console.log(error);
    }
}


async function mostrar(id) {
    try {
        btnAct.hidden = false;
        btnAgr.hidden = true;
        auxiliar = id;
        resp = await axios.get("http://localhost:3000/prestamos/" + id);
        libroPrestamo.value = resp.data.librosId;
        alumnoPrestamo.value = resp.data.alumnosId;
        fechaPrestamo.value = resp.data.fechaPrestamo;
        fechaDevolucion.value = resp.data.fechaDevolucion;
    } catch (error) {
        console.log(error)
        alert("error")
    }
}

// async function actualizar() {

//     resp = await axios.put("http://localhost:3000/prestamos/" + auxiliar,
//         {
//             librosId: libroPrestamo.value,
//             alumnosId: alumnoPrestamo.value,
//             fechaPrestamo: fechaPrestamo.value,
//             fechaDevolucion: fechaDevolucion.value
//         })
//     btnAct.hidden = true;
//     btnAgr.hidden = false;
// }


async function actualizar() {
    try {
        if (await validarInput()) {
            return; // Si hay errores de validación, no continuamos con la actualización
        }

        resp = await axios.get("http://localhost:3000/prestamos/" + auxiliar);
        const prestamo = resp.data;

        // Validamos que la fecha de devolución sea mayor o igual a la fecha de préstamo
        const fechaPrestamoValue = new Date(prestamo.fechaPrestamo);
        const fechaDevolucionValue = new Date(fechaDevolucion.value);

        if (fechaPrestamoValue > fechaDevolucionValue) {
            alert("La fecha de devolución no puede ser menor a la fecha de préstamo.");
            return;
        }

        resp = await axios.put("http://localhost:3000/prestamos/" + auxiliar, {
            librosId: libroPrestamo.value,
            alumnosId: alumnoPrestamo.value,
            fechaPrestamo: fechaPrestamo.value,
            fechaDevolucion: fechaDevolucion.value
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
        if (await noFueDevuelto(id)) {
            alert("No se puede borrar el libro porque no fue devuelto!")
        } else {
            await axios.delete("http://localhost:3000/prestamos/" + id);
            listar()
        }
        
    } catch (error) {
        console.log(error)
        alert("error")
    }
}

 
async function listarId() {

    try {
        let respLibros = await axios.get("http://localhost:3000/libros");

        librosIds.innerHTML = "";
        respLibros.data.forEach(element => {
            librosIds.innerHTML += '<option value="' + element.id + '" id="prueba"> ' + element.titulo + '</option>'


        });


        let respAlumnos = await axios.get("http://localhost:3000/alumnos");
        alumnosIds.innerHTML = "";
        respAlumnos.data.forEach(element => {
            alumnosIds.innerHTML += '<option value="' + element.id + '" id="prueba"> ' + element.nombre + '</option>'
        })
    }

    catch (error) {
        console.log(error);
    }

}

// json-server -w db.json
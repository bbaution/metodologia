
const listado = document.getElementById("lis");
const direccion = document.getElementById("dir");
const btnAgr = document.getElementById("agr");
const btnAct = document.getElementById("act");
let auxiliar
listar()

//Validaciones

async function deudaAlumno(id) {
    let bandera = false;
    let resp = await axios.get("http://localhost:3000/prestamos");
    resp.data.forEach(element => {
        if (element.alumnosId == id && element.fechaDevolucion == "") {
            bandera = true;
        }
    });
    return bandera;
}



async function validarInput() {
    let bandera = false;
    try {
        if (dir.value == "" ) {
            bandera = true;
            alert("Falta completar campos");
        } 
        } //else if (await nombreExistente(nom.value)){
            //bandera = true;
            //alert("Este nombre ya existe")
         catch (error) {
        console.log(error);
    }
    return bandera;
};



//CRUD
//
// async function guardar() {
//     try {
//         if (await validarInput() || await dniExistente(doc.value)) {
//             alert("El DNI ya existe o falta rellenar campos");
//         } else {
//             const resp = await axios.post("http://localhost:3000/alumnos", {
//                 nombre: nombre.value,
//                 direccion: direccion.value,
//                 documento: documento.value
//             });
//             alert("El alumno " + nombre.value + " se guardó con éxito!");
//         }
//     } catch (error) {
//         console.log(error);
//         alert("Error: " + error.message);
//     }
// }

async function guardar() {
    try {
        const inputValido = await validarInput();
        if (!inputValido) {
            const resp = await axios.post("http://localhost:3000/objeciones", {
                direccion: direccion.value
            });
            alert("la objecion " + direccion.value + " se guardó con éxito!");
        }
    } catch (error) {
        console.log(error);
        alert("Error: " + error.message);
    }
}

async function mostrar(id) {
    try {
        btnAct.hidden = false;
        btnAgr.hidden = true;
        auxiliar = id;
        resp = await axios.get("http://localhost:3000/objeciones/" + id)
        direccion.value = resp.data.direccion
    } catch (error) {
        console.log(error)
        alert("error")
    }
}

async function actualizar() {
    try {
        resp = await axios.put("http://localhost:3000/objeciones/" + auxiliar, {

            direccion: direccion.value
        })
        btnAct.hidden = true;
        btnAgr.hidden = false;
    } catch (error) {
        console.log(error)
        alert("error")
    }
}

async function borrar(id) {
    try {
        if (await deudaAlumno(id)) {
            alert("El alumno tiene deudas no se puede borrar")
        } else {
            await axios.delete("http://localhost:3000/objeciones/" + id);
            listar()
        }
    } catch (error) {
        console.log(error)
        alert("error")
    }
}

async function listar() {
    try {
        resp = await axios.get("http://localhost:3000/objeciones")
        listado.innerHTML = "";
        resp.data.forEach(element => {
            listado.innerHTML += '<hr> <li class="listado">' + '<button onclick="borrar(' + element.id + ')" class="bg-danger me-1"><i class="fa-solid fa-trash"></i></button>' + '<button onclick="mostrar(' + element.id + ')"class="bg-success me-2"><i class="fa-solid fa-pencil"></i></button>' + ' Id: ' + element.id + ' |' +' Objecion: '+element.direccion +"</li>"
        })
    } catch (error) {
        console.log(error)
        alert("error")
    }
}


// async function dniExistente(dni) {
//     let bandera = false;
//     const resp = await axios.get("http://localhost:3000/alumnos");
//     resp.data.forEach(e => {
//         if (e.documento == dni)
//             bandera = true;
//     })
//     return bandera;
// }

// async function nombreExistente(nomAlu) {
//     let bandera = false;
//     const respu = await axios.get("http://localhost:3000/alumnos");
//     respu.data.forEach(e => {
//         if(e.nombre == nomAlu)
//             bandera = true;
//     })
//     return bandera;
// }
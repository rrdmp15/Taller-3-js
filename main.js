let miFormularioSedesCampus = document.querySelector("#miFormularioSedesCampus");
let myFormularioCampers = document.querySelector("#myFormularioCampers");
let myFormularioTrainers = document.querySelector("#myFormularioTrainers");
let campus = {};
let horarios = ["6:00am - 2:00pm", "2:00pm - 10:00pm"];
let teams = ["Team 1", "Team 2", "Team 3", "Team 4"];
let selectHorario = document.getElementById("selectHorario");
let selectTeam = document.getElementById("selectTeam");
let horariosIngles = ["9:00am - 10:00am", "10:00am - 11:00am", "5:00pm - 6:00pm", "6:00pm - 7:00pm"];
let horariosSER = ["8:00am - 9:00am", "11:00am - 12:00am", "4:00pm - 5:00pm", "6:00pm - 8:00pm"];
let hIngles = document.getElementById("hIngles");
let hSer = document.getElementById("hSer");
let agregarSede = document.getElementById("agregarSede");
let datosCampers = document.getElementById("datosCampers");
let datosTrainers = document.getElementById("datosTrainers");
let btnNext1 = document.getElementById("btnNext1");
let btnNext2 = document.getElementById("btnNext2");
let botonReiniciar = document.getElementById('botonReiniciar')
let current_fs, next_fs, previous_fs;
let left, opacity, scale;
let animating;

// esconder section
datosCampers.style.display = "none";
datosTrainers.style.display = "none";

// mostrar section
btnNext1.addEventListener("click", mostrarCampers);
btnNext2.addEventListener("click", mostrarTrainers);

function mostrarCampers(){
    datosCampers.style.display = "block";
    agregarSede.style.display = "none";
}

function mostrarTrainers(){
    datosTrainers.style.display = "block";
    datosCampers.style.display = "none";
}

// reiniciar 
botonReiniciar.addEventListener('click', reiniciarJuego)

function reiniciarJuego(){
    location.reload();
}

// Formularios
miFormularioSedesCampus.addEventListener("submit", (e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target))
    campus[`${data.nombreSede}`] = {Camper: [], Trainers: []};
    listaSedes();
    actualizarOpcionesSelect();
    miFormularioSedesCampus.reset();
})

let listaSedes = ()=>{
    let opciones = document.querySelector("#sede");
    opciones.innerHTML = null;
    for (let [val, id] of Object.entries(campus)) {
        opciones.insertAdjacentHTML("beforeend", `
            <option value="${val}">${val}</option>
        `);
    }
}

myFormularioCampers.addEventListener("submit", (e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    console.log(data);
    let sede = data.sede;
    delete data.sede;
    campus[`${sede}`]["Camper"].unshift(data);
    console.log(campus);
    myFormularioCampers.reset();
})

myFormularioTrainers.addEventListener("submit", (e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    console.log(data);
    let sede = data.sede;
    delete data.sede;
    campus[`${sede}`]["Trainers"].unshift(data);
    console.log(campus);
    actualizarOpcionesSelect();
    myFormularioTrainers.reset();
})

function actualizarOpcionesSelect() {
    let opciones = document.querySelectorAll("[name='sede']");
    opciones.forEach(opcion => {
    opcion.innerHTML = null;
    for (let [val, id] of Object.entries(campus)) {
        opcion.insertAdjacentHTML("beforeend", `
        <option value="${val}">${val}</option>
        `);
    }
    });
}


// concatenar select
function recorrer (horario, team){
    selectTeam.innerHTML = "";

    for(let i of team){
        horario.innerHTML+=`<option value="${i}">${i}</option>`;
    }
}

function llenarTeam(){
    recorrer(selectHorario, horarios);
}

llenarTeam();

selectHorario.addEventListener("change", (e)=>{
    let dato = e.target.value 

    switch (dato) {
        case "6:00am - 2:00pm":
            recorrer(selectTeam, teams.slice(0,2))
            break;
        case "2:00pm - 10:00pm":
            recorrer(selectTeam, teams.slice(2,4))
            break;

        default:
            break;
    }
})

function recorrerI (indicar, valores){
    hIngles.innerHTML = "";

    for(let i of valores){
        indicar.innerHTML+= `<option value="${i}">${i}</option>`;
    }
}

selectTeam.addEventListener("change", (e)=>{
    let valor = e.target.value

    switch (valor) {
        case "Team 1":
            recorrerI(hIngles, horariosIngles.slice(0,1))
            break;
        case "Team 2":
            recorrerI(hIngles, horariosIngles.slice(1,2))
            break;
        case "Team 3":
                recorrerI(hIngles, horariosIngles.slice(2,3))
                break;
        case "Team 4":
            recorrerI(hIngles, horariosIngles.slice(3,4))
            break;

        default:
            break;
    }
})

function recorrerS (indicar, valores){
    hSer.innerHTML = "";

    for(let i of valores){
        indicar.innerHTML+= `<option value="${i}">${i}</option>`;
    }
}

selectTeam.addEventListener("change", (e)=>{
    let valor = e.target.value

    switch (valor) {
        case "Team 1":
            recorrerS(hSer, horariosSER.slice(0,1))
            break;
        case "Team 2":
            recorrerS(hSer, horariosSER.slice(1,2))
            break;
        case "Team 3":
                recorrerS(hSer, horariosSER.slice(2,3))
                break;
        case "Team 4":
            recorrerI(hSer, horariosSER.slice(3,4))
            break;

        default:
            break;
    }
})

// <option value=""></option>
//  `` 
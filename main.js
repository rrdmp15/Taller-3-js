let miFormularioSedesCampus = document.querySelector("#miFormularioSedesCampus");
let myFormularioPersonas = document.querySelector("#myFormularioPersonas");
let campus = {};

miFormularioSedesCampus.addEventListener("submit", (e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target))
    campus[`${data.nombreSede}`] = {Camper: [], Trainers: []};
    listaSedes();
    miFormularioSedesCampus.reset();
})

let listaSedes = ()=>{
    let opciones = document.querySelector("[name='sede']");
    opciones.innerHTML = null;
    for (let [val, id] of Object.entries(campus)) {
        opciones.insertAdjacentHTML("beforeend", `
            <option value="${val}">${val}</option>
        `);
    }
}

myFormularioPersonas.addEventListener("submit", (e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    console.log(data);
    let sede = data.sede;
    delete data.sede;
    campus[`${sede}`]["Camper"].unshift(data);
    console.log(campus);
    myFormularioPersonas.reset();
})


// <option value=""></option>
//  `  ` 
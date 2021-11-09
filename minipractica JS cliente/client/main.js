import Cliente from "./servicios/ClienteAPI"
import Handlebars from "handlebars"

var plantilla_lista = `
 {{#each .}}
    <li id="{{id}}" {{#comprado}}class="tachado"{{/comprado}}> 
      {{nombre}} <button id={{id}}_del>X</button>
    </li>
 {{/each}}
`

document.addEventListener('DOMContentLoaded', async function() {
    var cliente = new Cliente()
    var datos = await cliente.getItems()
    var lista = document.getElementById("lista")
    plantilla_func = Handlebars.compile(plantilla_lista)
    var html = plantilla_func(datos)
    lista.innerHTML = html

})

document.getElementById("lista").addEventListener("click", async function(e){
    id = e.target.id
    if (e.target.nodeName=="LI") {
        var cliente = new Cliente()
        if (e.target.classList.contains("tachado")) {
            var res = await cliente.changeItem(id, false)
            if (res) {
                e.target.classList.remove("tachado")
            }
        }
        else {
            var res = await cliente.changeItem(id, true)
            if (res) {
                e.target.classList.add("tachado")
            }
        }
    }
    else if (e.target.nodeName == "BUTTON") {
        //borrar item
        var cliente = new Cliente();
        var res = await cliente.deleteItem(parseInt(e.target.id))
        if (res){
            var lista = document.getElementById("lista");
            var item = document.getElementById(parseInt(e.target.id));
            lista.removeChild(item);
        }
    }
})

document.getElementById("add").addEventListener("click", async function(e) {
    nombre = document.getElementById("producto").value;
    var cliente = new Cliente();
    if(e.target.nodeName == "BUTTON"){
        var res = await cliente.addItem(nombre)
        if(res){
            var datos = await cliente.getItems()
            
            var nodo = document.createElement("li");
            nodo.setAttribute("id", datos[datos.length - 1].id);
            nodo.innerHTML = nombre;    
            document.getElementById("lista").appendChild(nodo);
            
            var b_borrar = document.createElement("button");
            b_borrar.setAttribute("id", datos[datos.length - 1].id + "_del");
            b_borrar.innerHTML = "X";
            document.getElementById(datos[datos.length - 1].id).appendChild(b_borrar);
        }
    }
})
const API_URL_BASE = "http://localhost:3000/items/"

export default class ClienteAPI {
    async getItems() {
        var resp = await fetch(API_URL_BASE)
        if (resp.ok) {
            var datos = await resp.json()
            return datos
        }
        else {
            throw new Error(resp.status)
        }
    }

    async changeItem(id, comprado) {
        var resp = await fetch(API_URL_BASE+id, {
            method: "PATCH",
            body: JSON.stringify({comprado: comprado}),
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        if (resp.ok) {
            return true
        }
        else {
            return false
        }
    }

    async deleteItem(id){
        var res = await fetch(API_URL_BASE+id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(res.ok){
            return true;
        }
        else{
            return false;
        }
    }

    async addItem(nombre){
        var res = await fetch(API_URL_BASE, {
            method: "POST",
            body: JSON.stringify({nombre: nombre}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(res.ok){
            return true;
        }
        else{
            return false;
        }
    }

}


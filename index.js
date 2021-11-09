import Vue from "vue";
import Vuex from "vuex";
import { Unidades } from "../util/Unidades";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    idActual: 2,
    lista: [
      { id: 1, nombre: "patatas", cantidad: 1, unidades: Unidades.KG },
      { id: 2, nombre: "ron", cantidad: 1, unidades: Unidades.BOTELLA }
    ]
  },
  mutations: {
    addItem(state, item) {
      state.idActual++;
      item.id = state.idActual;
      state.lista.push(item);
    },
    borrarItem(state, id) {
      var item = state.lista.findIndex(function (e) {
        return e.id == id;
      });
      state.lista.splice(item, 1);
    }
  }
});

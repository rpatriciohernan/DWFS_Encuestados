/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  editarPregunta: function(id, nuevoTextoPregunta){

    if (nuevoTextoPregunta != "" && nuevoTextoPregunta != undefined) {
      this.modelo.editarPregunta(id, nuevoTextoPregunta);
    }    
  },
  borrarPregunta: function(id) {
    this.modelo.borrarPregunta(id);
  },
  borrarPreguntas: function(){
    this.modelo.borrarPreguntas();
  },
  agregarVoto: function(id, textoRespuesta){
    if ( textoRespuesta != undefined & textoRespuesta != null) {
      this.modelo.incrementarVotoDeRespuesta(id, textoRespuesta);
    };
  }
};

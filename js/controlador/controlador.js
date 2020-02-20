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
  editarPregunta: function(nuevoTexto, nuevasRespuestas, id){

    if (nuevasRespuestas.length < 1) {
      this.modelo.editarPreguntaSinNuevasRespuestas(nuevoTexto, id);
    } else {
      this.modelo.editarPreguntaCompleta(nuevoTexto, nuevasRespuestas, id);
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

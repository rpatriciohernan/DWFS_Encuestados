/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

function validarContenidoExistente(elemento){
  return (elemento != undefined) && (elemento != null);
}

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
    if(validarContenidoExistente(pregunta) && validarContenidoExistente(respuestas)){
      this.modelo.agregarPregunta(pregunta, respuestas);
    }
  },
  borrarPregunta: function(id){
    this.modelo.borrarPregunta(id);
  },
  agregarVoto: function(nombrePregunta,respuestaSeleccionada){
    if(validarContenidoExistente(nombrePregunta) && validarContenidoExistente(respuestaSeleccionada)){
      this.modelo.agregarVoto(nombrePregunta,respuestaSeleccionada);
    };
  },
  agregarRespuesta: function(idPregunta, nuevaRespuesta){
    if(validarContenidoExistente(idPregunta) && validarContenidoExistente(nuevaRespuesta)){
      this.modelo.agregarRespuesta(idPregunta, nuevaRespuesta); 
    }
  },
  agregarVoto: function(nombrePregunta,respuestaSeleccionada){
    if(validarContenidoExistente(nombrePregunta) && validarContenidoExistente(respuestaSeleccionada)){
      this.modelo.agregarVoto(nombrePregunta,respuestaSeleccionada);
    }
  },
  editarPregunta: function(preguntaEditada){
    if(validarContenidoExistente(preguntaEditada)){
      this.modelo.editarPregunta(preguntaEditada);
    }
  },
  borrarPreguntas: function(){
    this.modelo.borrarPreguntas();
  }
};

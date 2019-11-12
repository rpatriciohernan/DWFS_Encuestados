/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.respuestaAgregada = new Evento(this); 
  this.votoAgregado = new Evento(this); 
  this.preguntaEditada = new Evento(this);
  this.preguntasBorradas = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var ultimoId = 0;
    if(this.preguntas.length > 0) {
      this.preguntas.forEach( 
        function(element){
          if(element.id > ultimoId) { ultimoId = element.id; };
      });
    };
    return ultimoId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function(id){
    this.preguntas = this.preguntas.filter(pregunta => pregunta.id !== id);
    this.eliminar(id);
    this.preguntaBorrada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    this.preguntas.forEach(pregunta => localStorage.setItem(pregunta.id,JSON.stringify(pregunta)));
  },

  eliminar:function(id){
    localStorage.removeItem(id);
  },

  agregarRespuesta: function(idPregunta, nuevaRespuesta){
    this.preguntas.find(pregunta => pregunta.id == idPregunta).cantidadPorRespuesta.push(nuevaRespuesta);
    this.guardar();
    this.respuestaAgregada.notificar();
  },

  agregarVoto: function(nombrePregunta,respuestaSeleccionada){
    var pregunta = this.preguntas.find(pregunta => pregunta.texto == nombrePregunta);
    var respuesta = pregunta.cantidadPorRespuesta.find(respuesta => respuesta.textoRespuesta == respuestaSeleccionada);
    respuesta.cantidad++;
    this.guardar();
    this.votoAgregado.notificar();
  },

  editarPregunta: function(preguntaEditada){
    this.preguntas.find(pregunta => pregunta.id == preguntaEditada.id) = preguntaEditada;
    this.guardar();
    this.preguntaEditada.notificar();
  },

  borrarPreguntas: function(){
    var contexto = this;
    this.preguntas.forEach(pregunta => contexto.eliminar(pregunta.id));
    this.preguntas = [];
    this.preguntasBorradas.notificar();
  },

};

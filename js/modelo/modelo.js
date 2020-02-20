/*
 * Modelo
 */
traerPreguntasAlmacenadas = function(){
  preguntasAlmacenadas = JSON.parse(localStorage.getItem("preguntas"));
  if (preguntasAlmacenadas == null) {
    return [];
  } else {
    return preguntasAlmacenadas;
  }
};

var Modelo = function() {
  this.preguntas = traerPreguntasAlmacenadas();
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.respuestaAgregada = new Evento(this);
  this.preguntasBorradas = new Evento(this);
  this.votoAgregado = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var idMaximo = 1;
    for (var i=0; i < this.preguntas.length; i++) {
      if ( this.preguntas[i].id > idMaximo) {
        idMaximo = this.preguntas[i].id;
      }
    };
    return idMaximo;
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

  editarPreguntaCompleta: function(nuevoTexto, nuevasRespuestas, id){
    this.preguntas.forEach(function(pregunta){
        if (pregunta.id == id){
          pregunta.textoPregunta = nuevoTexto;
          pregunta.cantidadPorRespuesta = nuevasRespuestas;
        }
    });
    this.guardar();
    this.preguntaEditada.notificar();
  },

  editarPreguntaSinNuevasRespuestas: function(nuevoTexto, id){
    this.preguntas.forEach(function(pregunta){
        if (pregunta.id == id){
          pregunta.textoPregunta = nuevoTexto;
        }
    });
    this.guardar();
    this.preguntaEditada.notificar();
  },


  borrarPreguntas: function(){
    this.preguntas = [];
    this.guardar();
    this.preguntasBorradas.notificar();
  },

  borrarPregunta: function(id) {
    var preguntasActualizado = [];
    this.preguntas.forEach(function(pregunta){
      if(pregunta.id != id) {
        preguntasActualizado.push(pregunta);
      };
    });
    this.preguntas = preguntasActualizado;
    this.guardar();
    this.preguntaBorrada.notificar();
  },

  agregarRespuesta: function(idPregunta, respuesta){
    this.preguntas.forEach(function(pregunta){
      if(pregunta.id == idPregunta){
        pregunta.cantidadPorRespuesta.push(respuesta);
      };
    });
    this.guardar();
    this.respuestaAgregada.notificar();
  },

  incrementarVotoDeRespuesta: function(id, textoRespuesta){
    var pregunta = this.preguntas.find(pregunta => pregunta.id == id);
    var respuesta = pregunta.cantidadPorRespuesta.find(respuesta => respuesta.textoRespuesta == textoRespuesta);
    respuesta.cantidad++;
    this.guardar();
    this.votoAgregado.notificar();
  },

  guardar: function(){
    localStorage.clear();
    localStorage.setItem("preguntas", JSON.stringify(this.preguntas));
  },
};

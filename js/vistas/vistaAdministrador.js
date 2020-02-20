/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaBorrada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEditada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.respuestaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntasBorradas.suscribir(function() {
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  inicializar: function() {
    this.reconstruirLista();
    this.configuracionDeBotones();
    validacionDeFormulario();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem;
    nuevoItem = $("<li class='list-group-item' id='"+pregunta.id+"'>"+pregunta.textoPregunta+"</li>");
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function() {
        textoRespuesta = $(this).val();
        if (textoRespuesta != "") {
          respuestas.push({'textoRespuesta': textoRespuesta, 'cantidad': 0});
        }
      })
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });

    e.botonBorrarPregunta.click(function(){
      var id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.borrarPregunta(id);
    });

    e.botonEditarPregunta.click(function(){
      var id = parseInt($('.list-group-item.active').attr('id'));
      var nuevoTextoPregunta = e.pregunta.val();
      var nuevasRespuestas = [];

      if (nuevoTextoPregunta == "") {
        nuevoTextoPregunta = $('.list-group-item.active h5').text();
      }

      $('[name="option[]"]').each(function() {
        textoRespuesta = $(this).val();
        if (textoRespuesta != "") {
          nuevasRespuestas.push({'textoRespuesta': textoRespuesta, 'cantidad': 0});
        }
      });

      contexto.controlador.editarPregunta(nuevoTextoPregunta, nuevasRespuestas, id);
      contexto.limpiarFormulario();
    });
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();

    $('#pregunta').val('');

    $('[name="option[]"]').each(function() {
      $(this).val('');
    });
  },
};

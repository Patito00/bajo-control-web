/* ===========================
   BAJO CONTROL — scripts.js
   =========================== */

document.addEventListener('DOMContentLoaded', function () {

  /* -------- NAVBAR HAMBURGUESA -------- */
  const toggle = document.getElementById('navToggle');
  const nav    = document.getElementById('navMenu');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('abierto');
      const abierto = nav.classList.contains('abierto');
      toggle.setAttribute('aria-expanded', abierto);
    });
    // Cerrar al hacer click en un enlace
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('abierto');
      });
    });
  }

  /* -------- ACTIVE LINK -------- */
  var pagina = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === pagina) a.classList.add('activo');
    if (pagina === '' && href === 'index.html') a.classList.add('activo');
  });

  /* -------- VALIDACIÓN DEL FORMULARIO -------- */
  var formulario = document.getElementById('form-contacto');
  if (!formulario) return;

  formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    limpiarErrores();

    var valido = true;

    var nombre  = formulario.querySelector('#nombre');
    var telefono= formulario.querySelector('#telefono');
    var email   = formulario.querySelector('#email');
    var servicio= formulario.querySelector('#servicio');
    var mensaje = formulario.querySelector('#mensaje');

    if (!nombre.value.trim() || nombre.value.trim().length < 2) {
      marcarError(nombre, 'Ingresá tu nombre completo.');
      valido = false;
    }

    if (!telefono.value.trim() || !/^[\d\s\+\-\(\)]{7,}$/.test(telefono.value.trim())) {
      marcarError(telefono, 'Ingresá un teléfono válido.');
      valido = false;
    }

    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      marcarError(email, 'Ingresá un correo electrónico válido.');
      valido = false;
    }

    if (!servicio.value) {
      marcarError(servicio, 'Seleccioná el servicio que necesitás.');
      valido = false;
    }

    if (!mensaje.value.trim() || mensaje.value.trim().length < 10) {
      marcarError(mensaje, 'Contanos brevemente qué necesitás (mín. 10 caracteres).');
      valido = false;
    }

    if (valido) {
      mostrarFeedback('exito', '✅ ¡Mensaje enviado! Julián se va a poner en contacto muy pronto.');
      formulario.reset();
    } else {
      mostrarFeedback('fallo', '⚠️ Revisá los campos marcados en rojo antes de continuar.');
    }
  });

  function marcarError(campo, mensaje) {
    campo.classList.add('error', 'is-invalid');
    var err = document.getElementById('err-' + campo.id);
    if (err) {
      err.textContent = mensaje;
      err.classList.add('visible');
    }
  }

  function limpiarErrores() {
    formulario.querySelectorAll('.error, .is-invalid').forEach(function (c) { c.classList.remove('error', 'is-invalid'); });
    formulario.querySelectorAll('.msg-error').forEach(function (e) { e.classList.remove('visible'); });
    var fb = document.getElementById('form-feedback');
    if (fb) { fb.className = 'd-none'; fb.textContent = ''; }
  }

  function mostrarFeedback(tipo, texto) {
    var fb = document.getElementById('form-feedback');
    if (!fb) return;
    fb.className = 'alert mt-3 ' + (tipo === 'exito' ? 'alert-success' : 'alert-danger');
    fb.textContent = texto;
    fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});

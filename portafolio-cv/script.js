// funciones anonimas autoejecutabels
// menu
// interaccion del menu, se pasa como variable el document
((d)=>{
  const $btnMenu = d.querySelector(".menu-btn"),
        $menu = d.querySelector(".menu");

  // programar el evento click del boton
  $btnMenu.addEventListener("click", (e) => {
    // al primer hijo (svg menu) entra a la lista de clases del boton le intercabia la clase none (se la agrega)
    // al ultimo hijo (svg X) entra a la lista de clases del boton le intercabia la clase none (se la saca)
    // tambien para que aparesca el menu
    $btnMenu.firstElementChild.classList.toggle("none");
    $btnMenu.lastElementChild.classList.toggle("none");
    $menu.classList.toggle("is-active");

  });

  // delegacion de eventos: delega el click a un elemento superior, aqui el document
  // pregunta por el objeto que gatilla el evento (e.target) y con matches evalua que selector lo gatilla elemento a del menu
  // evalua en negativo para que descarte cualquier otro elemento que no sea enlace
  // si es enlace saca el none del primer elemento y lo agrea al ultimo del boton y saca is-active del menu, lo esconde
  d.addEventListener("click", (e)=>{
    if (!e.target.matches(".menu a")) return false;

    $btnMenu.firstElementChild.classList.remove("none");
    $btnMenu.lastElementChild.classList.add("none");
    $menu.classList.remove("is-active");
  });
})(document);


// contact form
((d)=>{
  // definicion de variables concernientes al formulario
  const $form = d.querySelector(".contact-form"),
        $loader = d.querySelector(".contact-form-loader"),
        $response = d.querySelector(".contact-form-response");

  // programar el evento submit del boton
  $form.addEventListener("submit", (e) => {
    // evita que el formulario se envie
    e.preventDefault();
    
    // hacer visible el loader
    $loader.classList.remove("none");
    
    // peticion al API servicio de envio de correo, data del formulario
    // valida respuesta, si es ok convierte la info a json, sino rechaza la respuesta y la manda al catch
    // al enviar se oculta el loader y aparece la modal agregando en url el indice para la modal
    // limpia o resetea el formulario
    // si hay error se muestra en la modal con variable msg si no hay estatus da un mensaje personalizado
    // se desactiva el loader en el finally seccion que se ejecuta si el resultado es positivo o hay error
    // cerrar modal con un temporizador
    fetch("https://formsubmit.co/ajax/cristian72@gmail.com", {
      method: "POST",
      body: new FormData(e.target),
    })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      console.log(json);
      location.hash = "#gracias";
      $form.reset();
    })
    .catch((err) => {
      console.log(err);
      let msg = err.statusText || "Ocurrio un error al enviar";
      $response.querySelector("h3").innerHTML = `Error ${err.status}: ${msg}`;
    })
    .finally(() => {
      $loader.classList.add("none");
      setTimeout(() => {
        location.hash = "#close";
      }, 3000);
    });
  });

})(document);
window.addEventListener("DOMContentLoaded", () => {
  const repositorio = document.getElementById("table-user");
  const searchInput = document.getElementById("search-info");
  const alert_search = document.querySelector(".alert-search p");
  const dib_prevents = document.querySelector(".controller").children;
  const table_info = document.getElementById("table-info-user");
  // modal elements for user

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    contrasenia: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9\W]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^[0-9]{10}$/, // 7 a 14 numeros.
    cedula: /^[0-9]{10}$/, // 7 a 14 numeros.
  };

  const modal_create_user = document.querySelector(".modal-create-user");
  const button_create_user = document.querySelector(".button-create-user");

  const modal_update_user = document.querySelector(".modal-update-user");

  const modal_delete_user = document.querySelector(".modal-delete-user");

  // ------------METHOD GET-------------------- //
  const askFetch = async (method, datos) => {
    let searchData = new FormData();
    if (method == 1) {
      searchData.append("method", "GET");
      datos.forEach((element) => {
        searchData.append(element[0], element[1]);
      });
    } else if (method == 2) {
      searchData.append("method", "POST");
      datos.forEach((element) => {
        searchData.append(element[0], element[1]);
      });
    } else if (method == 3) {
      searchData.append("method", "PUT");
      datos.forEach((element) => {
        searchData.append(element[0], element[1]);
      });
    } else if (method == 4) {
      searchData.append("method", "DELETE");
      datos.forEach((element) => {
        searchData.append(element[0], element[1]);
      });
    } else {
      searchData.append("none", "none");
      datos.forEach((element) => {
        searchData.append(element[0], element[1]);
      });
    }
    try {
      const response = await fetch("assets/php/controller_user.php", {
        method: "POST",
        body: searchData,
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const showAllResult = () => {
    askFetch(1, ["", ""]).then((result) => {
      if (typeof result.success === "undefined") {
        let template = "";
        let valor = 1;
        controllerButtons(result, dib_prevents);
        valor = controllerRowUser(template, valor, result, repositorio);
        dib_prevents[0].addEventListener("click", () => {
          valor = controllerRowUser(template, valor, result, repositorio, 2);
        });
        dib_prevents[1].addEventListener("click", () => {
          valor = controllerRowUser(template, valor, result, repositorio);
        });
      } else {
        location.replace("login.html");
      }
    });
  };

  showAllResult();

  // ------------SEARCH USER-------------------- //
  searchInput.addEventListener("input", (e) => {
    let search_word = [];
    search_word.push(["word", e.target.value]);
    askFetch(6, search_word).then((result) => {
      let template = "";
      let valor = 1;
      if (typeof result["success"] === "undefined") {
        controllerButtons(result, dib_prevents);
        alert_search.parentNode.style.display = "none";
        table_info.style.display = "block";
        valor = controllerRowUser(template, valor, result, repositorio);
        dib_prevents[0].addEventListener("click", () => {
          valor = controllerRowUser(template, valor, result, repositorio, 2);
        });
        dib_prevents[1].addEventListener("click", () => {
          valor = controllerRowUser(template, valor, result, repositorio);
        });
      } else {
        showAlertSearch(template, alert_search, table_info, e);
      }
    });
  });

  const rellenar = (dato, tipo, list) => {
    let template = "";
    let i = 1;
    // ------------show rol-------------------- //
    if (tipo == 1) {
      i = 2;
      template = `
      <div class="modal-rol">
        <select id="modal-select-rol-update">
    `;
      list.forEach((element) => {
        if (element === dato) {
          template += `
          <option value="${i}" selected>${element}</option>
        `;
        } else {
          template += `
          <option value="${i}">${element}</option>
        `;
        }
        i++;
      });
      template += `
      </select>
        </div>
    `;
      // ------------show carrera-------------------- //
    } else {
      template = `
        <div class="modal-carrera">
          <select id="modal-select-carrera-update">
    `;
      list.forEach((element) => {
        if (element === dato) {
          template += `
          <option value="${i}" selected>${element}</option>
        `;
        } else {
          template += `
          <option value="${i}">${element}</option>
        `;
        }
        i++;
      });
      template += `
      </select>
        </div>
    `;
    }
    return template;
  };

  // ------------METHOD PUT-------------------- //
  repositorio.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.className === "button-update-user md hydrated") {
      let datos = [
        ["cedula", e.target.parentNode.parentNode.children[2].innerText],
      ];
      // ------------show data-------------------- //
      askFetch(6, datos).then((result) => {
        const rol_user = ["Asistente", "Docente", "Estudiante"];
        const rol_carrera = [
          "Contabilidad",
          "Desarrollo de Software",
          "Desarrollo infantil integral",
          "Electricidad",
          "Electromecánica",
          "Electrónica",
          "Fotografía",
          "Fotografía",
          "Marketing",
          "Procesamiento de Alimentos",
          "Producción Audiovisual",
        ];
        let template = "";
        template = `
                <div class="modal-container">
                  <ion-icon class="modal-icon-update" name="close"></ion-icon>
                  <div class="modal-title">
                    <h2>Actualizar Usuario</h2>
                  </div>
                  <form class="modal-form">
                    <div class="modal-nombre">
                      <input type="text" placeholder="Ingrese los nombres" value="${result[0].nombre}"/>
                    </div>
                    <div class="modal-apellido">
                      <input type="text" placeholder="Ingrese los apellidos" value="${result[0].apellido}"/>
                    </div>
                    <div class="modal-cedula">
                      <input type="text" placeholder="Ingrese la cédula" value="${result[0].cedula}"/>
                    </div>
                    <div class="modal-correo">
                      <input type="email" placeholder="Ingrese el email" value="${result[0].correo}"/>
                    </div>
                    <div class="modal-password">
                      <input type="password" placeholder="Ingrese la contraseña" value="${result[0].password}"/>
                    </div>
                    <div class="modal-telefono">
                      <input type="text" placeholder="Ingrese el número telefónico" value="${result[0].telefono}"/>
                    </div>
                `;
        template += rellenar(result[0].rol, 1, rol_user);
        template += rellenar(result[0].carrera, 2, rol_carrera);
        template += `
                <div class="modal-text-incomplete-box">
                  <p>
                    <ion-icon
                      class="icon-alert"
                      name="alert-circle-outline"
                    ></ion-icon>
                    Llene adecuadamente los campos
                  </p>
                    <ion-icon class="icon-close" name="close"></ion-icon>
                  </div>
                    <button class="modal-button-update">
                      Actualizar
                    </button>
                  </form>
                </div>
                `;
        modal_update_user.innerHTML = template;
        const modal_icon_update_user =
          modal_update_user.children[0].querySelector(".modal-icon-update");
        const modal_alert_update = modal_update_user.children[0].querySelector(
          ".modal-text-incomplete-box"
        );
        const modal_alert_close_update =
          modal_update_user.children[0].querySelector(".icon-close");
        modal_icon_update_user.addEventListener("click", () => {
          modal_update_user.classList.remove("modal-show");
        });
        const newData = modal_update_user.children[0].querySelectorAll(
          ".modal-form div input"
        );
        const newDataSelect = modal_update_user.children[0].querySelectorAll(
          ".modal-form div select"
        );
        modal_update_user.children[0]
          .querySelector(".modal-button-update")
          .addEventListener("click", (e) => {
            e.preventDefault();
            let temporalNewData = [];
            let title = [
              "nombre",
              "apellido",
              "cedula",
              "correo",
              "contrasenia",
              "telefono",
              "rol",
              "carrera",
            ];
            let i = 0;
            let option_update = true;
            temporalNewData.push(["oldCedula", result[0].cedula]);
            newData.forEach((element) => {
              temporalNewData.push([title[i], element.value]);
              if (i == 0) {
                if (!expresiones.nombre.test(element.value)) {
                  option_update = false;
                  element.style.border = "2px Solid #e35b5d";
                } else {
                  element.style.border = "3px Solid #1795ce";
                }
              } else if (i == 1) {
                if (!expresiones.apellido.test(element.value)) {
                  option_update = false;
                  element.style.border = "2px Solid #e35b5d";
                } else {
                  element.style.border = "3px Solid #1795ce";
                }
              } else if (i == 2) {
                if (!expresiones.cedula.test(element.value)) {
                  option_update = false;
                  element.style.border = "2px Solid #e35b5d";
                } else {
                  element.style.border = "3px Solid #1795ce";
                }
              } else if (i == 3) {
                if (!expresiones.correo.test(element.value)) {
                  option_update = false;
                  element.style.border = "2px Solid #e35b5d";
                } else {
                  element.style.border = "3px Solid #1795ce";
                }
              } else if (i == 4) {
                if (!expresiones.contrasenia.test(element.value)) {
                  option_update = false;
                  element.style.border = "2px Solid #e35b5d";
                } else {
                  element.style.border = "3px Solid #1795ce";
                }
              } else if (i == 5) {
                if (!expresiones.telefono.test(element.value)) {
                  option_update = false;
                  element.style.border = "2px Solid #e35b5d";
                } else {
                  element.style.border = "3px Solid #1795ce";
                }
              }
              i++;
            });
            newDataSelect.forEach((element) => {
              temporalNewData.push([title[i], element.value]);
              i++;
            });
            if (option_update) {
              askFetch(3, temporalNewData).then((result) => {
                if (result["success"]) {
                  modal_update_user.classList.remove("modal-show");
                  showAllResult();
                }
              });
            } else {
              modal_alert_update.style.display = "block";
            }
            modal_alert_close_update.addEventListener("click", () => {
              modal_alert_update.style.display = "none";
            });
          });
      });
      modal_update_user.classList.add("modal-show");
      // ------------METHOD DELETE-------------------- //
    } else if (e.target.className === "button-delete-user md hydrated") {
      let datos = null;
      datos = [
        ["cedula", e.target.parentNode.parentNode.children[2].innerText],
      ];
      let template = "";
      template = `
            <div class="modal-container">
              <ion-icon class="modal-icon-delete" name="close"></ion-icon>
              <div class="modal-title">
                <h2>Desea eliminar el usuario?</h2>
                <p>
                  <ion-icon
                    class="icon-alert"
                    name="alert-circle-outline"
                  ></ion-icon>
                  Este cambio sera irreversible
                </p>
              </div>
              <div class="modal-option">
                <button class="modal-button-delete">Eliminar</button>
                <button class="modal-button-cancelar-delete">Cancelar</button>
              </div>
            </div>
            `;
      modal_delete_user.innerHTML = template;
      modal_delete_user.classList.add("modal-show");
      const button_delete_user =
        modal_delete_user.children[0].children[2].children[0];
      const button_cancel_delete =
        modal_delete_user.children[0].children[2].children[1];
      const icon_cancel_delete_user = modal_delete_user.children[0].children[0];
      button_delete_user.addEventListener("click", () => {
        askFetch(4, datos).then((result) => {
          console.log(result);
          if (result["success"]) {
            modal_delete_user.classList.remove("modal-show");
            showAllResult();
          }
        });
      });
      button_cancel_delete.addEventListener("click", () => {
        modal_delete_user.classList.remove("modal-show");
      });
      icon_cancel_delete_user.addEventListener("click", () => {
        modal_delete_user.classList.remove("modal-show");
      });
    }
  });
  // ------------METHOD POST-------------------- //
  button_create_user.addEventListener("click", (e) => {
    e.preventDefault();
    modal_create_user.classList.add("modal-show");
    modal_create_user.innerHTML = templateCreateUser();
    const modal_button_create_user =
      modal_create_user.children[0].children[2].children[9];
    const modal_close_create_user = modal_create_user.children[0].children[0];
    const close_div_alert =
      modal_create_user.children[0].children[2].children[8].children[1];
    const div_alert = modal_create_user.children[0].children[2].children[8];
    const inputs =
      modal_create_user.children[0].children[2].querySelectorAll("div input");
    //#yellow --------------Validar INPUTS-----------------------//#
    inputs[2].addEventListener("input", (e) => {
      let tempData = [];
      tempData.push(["valueCi", e.target.value]);
      askFetch(6, tempData).then((result) => {
        if (result.success) {
          e.target.style.border = "2px Solid #e35b5d";
          let template = "";
          template = `
                <p>
                  <ion-icon
                    class="icon-alert"
                    name="alert-circle-outline"
                  ></ion-icon>
                  El numero de cédula ya existe en los registros.
                </p>
                <ion-icon
                    class="icon-close icon-close-create"
                    name="close"
                  ></ion-icon>
        `;
          div_alert.innerHTML = template;
          div_alert.style.display = "block";
          const icon_close = div_alert.children[1];
          icon_close.addEventListener("click", () => {
            div_alert.style.display = "none";
          });
        } else if (result.valor.length == 10) {
          e.target.style.border = "3px Solid #1795ce";
          div_alert.style.display = "none";
        }
      });
    });
    inputs[5].addEventListener("input", (e) => {
      let tempData = [];
      tempData.push(["valueNumber", e.target.value]);
      askFetch(6, tempData).then((result) => {
        if (result.success) {
          e.target.style.border = "2px Solid #e35b5d";
          let template = "";
          template = `
                <p>
                  <ion-icon
                    class="icon-alert"
                    name="alert-circle-outline"
                  ></ion-icon>
                  El numero telefónico ya existe en los registros.
                </p>
                <ion-icon
                    class="icon-close icon-close-create"
                    name="close"
                  ></ion-icon>
        `;
          div_alert.innerHTML = template;
          div_alert.style.display = "block";
          const icon_close = div_alert.children[1];
          icon_close.addEventListener("click", () => {
            div_alert.style.display = "none";
          });
        } else if (result.valor.length == 10) {
          e.target.style.border = "3px Solid #1795ce";
          div_alert.style.display = "none";
        }
      });
    });
    modal_button_create_user.addEventListener("click", (e) => {
      e.preventDefault();
      // const inputs = modal_create_user.querySelectorAll("div form div input");
      const selects =
        modal_create_user.children[0].children[2].querySelectorAll(
          "div select"
        );
      let temporalNewData = [];
      let title = [
        "nombre",
        "apellido",
        "cedula",
        "correo",
        "contrasenia",
        "telefono",
        "rol",
        "carrera",
      ];
      let i = 0;
      let option_create = true;
      inputs.forEach((element) => {
        temporalNewData.push([title[i], element.value]);
        if (i == 0) {
          if (!expresiones.nombre.test(element.value)) {
            option_create = false;
            element.style.border = "2px Solid #e35b5d";
          } else {
            element.style.border = "3px Solid #1795ce";
          }
        } else if (i == 1) {
          if (!expresiones.apellido.test(element.value)) {
            option_create = false;
            element.style.border = "2px Solid #e35b5d";
          } else {
            element.style.border = "3px Solid #1795ce";
          }
        } else if (i == 2) {
          if (!expresiones.cedula.test(element.value)) {
            option_create = false;
            element.style.border = "2px Solid #e35b5d";
          } else {
            element.style.border = "3px Solid #1795ce";
          }
        } else if (i == 3) {
          if (!expresiones.correo.test(element.value)) {
            option_create = false;
            element.style.border = "2px Solid #e35b5d";
          } else {
            element.style.border = "3px Solid #1795ce";
          }
        } else if (i == 4) {
          if (!expresiones.contrasenia.test(element.value)) {
            option_create = false;
            element.style.border = "2px Solid #e35b5d";
          } else {
            element.style.border = "3px Solid #1795ce";
          }
        } else if (i == 5) {
          if (!expresiones.telefono.test(element.value)) {
            option_create = false;
            element.style.border = "2px Solid #e35b5d";
          } else {
            element.style.border = "3px Solid #1795ce";
          }
        }
        i++;
      });
      selects.forEach((element) => {
        temporalNewData.push([title[i], element.value]);
        i++;
      });
      if (option_create) {
        askFetch(2, temporalNewData).then((result) => {
          if (result.success) {
            modal_create_user.classList.remove("modal-show");
            showAllResult();
          }
        });
        inputs.forEach((element) => {
          element.value = "";
        });
      } else {
        div_alert.style.display = "block";
      }
    });

    close_div_alert.addEventListener("click", () => {
      div_alert.style.display = "none";
    });

    modal_close_create_user.addEventListener("click", () => {
      modal_create_user.classList.remove("modal-show");
    });
  });
});

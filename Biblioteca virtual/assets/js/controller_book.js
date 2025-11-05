window.addEventListener("DOMContentLoaded", () => {
  const repositorio = document.getElementById("table-book");
  const searchInput = document.getElementById("search-info");
  const alert_search = document.querySelector(".alert-search p");
  const buttons_controller = document.querySelector(".controller");
  const table_info = document.getElementById("table-info-book");
  const dib_prevents = document.querySelector(".controller").children;
  //-------------Create
  const modal_create_book = document.querySelector(".modal-create-book");
  const btn = document.querySelector(".button-create-book");
  //-------------Update
  const modal_update_book = document.querySelector(".modal-update-book");
  //-------------Delete
  const modal_delete_book = document.querySelector(".modal-delete-book");

  const expresiones = {
    campo: /^[a-zA-Z0-9À-ÿ\W\s_]{1,500}$/, // Letras y espacios, pueden llevar acentos.
    anio: /^[0-9]{4}$/, // 4 números.
    isbn: /[0-9]{1,4}\W/, // 13 números. separado con -
  };

  //#blue ------------------------FUNCTION FETCH--------------------------//#
  const askFetch = async ($query, method = "GET", datos = ["", ""]) => {
    let searchData = new FormData();
    searchData.append("method", method);
    if (datos[0].length > 0) {
      datos.forEach((element) => {
        searchData.append(element[0], element[1]);
      });
    }
    searchData.append("query", $query);
    try {
      const response = await fetch("assets/php/controller_book.php", {
        method: "POST",
        body: searchData,
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };
  //#blue ------------------------FUNCTION VALIDATION--------------------------//#
  const valData = (box_element, data) => {
    let option = true;
    for (let element = 0; element < box_element.children.length; element++) {
      if (box_element.children[element].innerText == data) {
        option = false;
      }
    }
    return option;
  };
  //#blue ------------------------FUNCTION REMOVE BOX--------------------------//#
  const removeBox = (box_children) => {
    for (let element = 0; element < box_children.length; element++) {
      box_children[element].addEventListener("click", (e) => {
        e.target.remove();
      });
    }
  };

  //#green ------------METHOD GET-------------------- //#
  const showAllResult = () => {
    askFetch(1).then((result) => {
      if (!result.success) {
        let template = "";
        let valor = 1;
        controllerButtons(result, dib_prevents);
        valor = controllerRow(template, valor, result, repositorio);
        buttons_controller.children[0].addEventListener("click", () => {
          valor = controllerRow(template, valor, result, repositorio, 2);
        });
        buttons_controller.children[1].addEventListener("click", () => {
          valor = controllerRow(template, valor, result, repositorio);
        });
      } else {
        location.replace("login.html");
      }
    });
  };

  showAllResult();

  searchInput.addEventListener("input", (e) => {
    let search_word = [];
    search_word.push(["word", e.target.value]);
    askFetch(4, "GET", search_word).then((result) => {
      let template = "";
      let valor = 1;
      if (typeof result["success"] === "undefined") {
        controllerButtons(result, dib_prevents);
        alert_search.parentNode.style.display = "none";
        table_info.style.display = "block";
        valor = controllerRow(template, valor, result, repositorio);
        buttons_controller.children[0].addEventListener("click", () => {
          valor = controllerRow(template, valor, result, repositorio, 2);
        });
        buttons_controller.children[1].addEventListener("click", () => {
          valor = controllerRow(template, valor, result, repositorio);
        });
      } else {
        showAlertSearch(template, alert_search, table_info, e);
      }
    });
  });

  //#green ------------METHOD POST-------------------- //#
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    modal_create_book.innerHTML = templateCreateBook();
    modal_create_book.classList.add("modal-show");
    const box_categoria =
      modal_create_book.children[0].children[2].children[1].children[1]
        .children[0];
    const box_carrera =
      modal_create_book.children[0].children[2].children[1].children[1]
        .children[1];
    const allInputs =
      modal_create_book.children[0].children[2].children[0].querySelectorAll(
        "div input"
      );
    const btn_create_book =
      modal_create_book.children[0].children[2].children[3];
    const div_alert = modal_create_book.children[0].children[2].children[2];
    const close_modal_create = modal_create_book.children[0].children[0];
    var select_categoria =
      modal_create_book.children[0].children[2].children[1].children[2].children[0].querySelector(
        "#modal-select-categoria-create"
      );
    var select_carrera =
      modal_create_book.children[0].children[2].children[1].children[2].children[1].querySelector(
        "#modal-select-carrera-create"
      );

    var box_children_categoria = box_categoria.children;
    var box_children_carrera = box_carrera.children;

    removeBox(box_children_categoria);
    removeBox(box_children_carrera);

    select_categoria.addEventListener("change", (e) => {
      if (
        valData(box_categoria, e.target.children[e.target.value - 1].innerText)
      ) {
        let box = document.createElement("div");
        box.className = "box-span " + e.target.value;
        box.innerText = e.target.children[e.target.value - 1].innerText;
        const new_box = box_categoria.append(box);
        box_children_categoria = box_categoria.children;
      }
      removeBox(box_children_categoria);
    });

    select_carrera.addEventListener("change", (e) => {
      if (
        valData(box_carrera, e.target.children[e.target.value - 1].innerText)
      ) {
        let box = `
            <div class="box-span ${e.target.value}">${
          e.target.children[e.target.value - 1].innerText
        }</div>
          `;
        box_carrera.insertAdjacentHTML("beforeend", box);
        box_children_carrera = box_carrera.children;
      }
      removeBox(box_children_carrera);
    });
    //#white ------------CREATE DATA-------------------- //#
    btn_create_book.addEventListener("click", (e) => {
      e.preventDefault();
      let arrayBook = [];
      let temporalData = [];
      let option_create = true;
      allInputs.forEach((element) => {
        arrayBook.push([element.name, element.value]);
        if (element.name == "anio") {
          if (!expresiones.anio.test(element.value)) {
            option_create = false;
            element.style.border = "2px Solid #e35b5d";
          } else {
            element.style.border = "3px Solid #1795ce";
          }
        } else if (element.name == "isbn") {
          if (!expresiones.isbn.test(element.value)) {
            option_create = false;
            element.style.border = "2px Solid #e35b5d";
          } else {
            element.style.border = "3px Solid #1795ce";
          }
        } else {
          if (!expresiones.campo.test(element.value)) {
            option_create = false;
            element.style.border = "2px Solid #e35b5d";
          } else {
            element.style.border = "3px Solid #1795ce";
          }
        }
      });
      for (
        let element = 0;
        element < box_categoria.children.length;
        element++
      ) {
        temporalData.push(box_categoria.children[element].classList[1]);
      }
      arrayBook.push(["categoria", temporalData]);
      temporalData = [];
      for (let element = 0; element < box_carrera.children.length; element++) {
        temporalData.push(box_carrera.children[element].classList[1]);
      }
      arrayBook.push(["carrera", temporalData]);
      if (option_create) {
        askFetch(1, "POST", arrayBook).then((result) => {
          const validation =
            result["book"].success &&
            (result["carrera"].success || result["carrera"] === null) &&
            (result["categoria"].success || result["categoria"] === null);
          if (validation) {
            allInputs.forEach((element) => {
              element.value = "";
            });
            showAllResult();
            modal_create_book.classList.remove("modal-show");
            box_carrera.innerHTML = "";
            box_categoria.innerHTML = "";
          }
        });
      } else {
        div_alert.style.display = "block";
      }
      let close_alert = div_alert.children[1];
      close_alert.addEventListener("click", () => {
        div_alert.style.display = "none";
      });
    });

    close_modal_create.addEventListener("click", () => {
      modal_create_book.classList.remove("modal-show");
      allInputs.forEach((element) => {
        element.style.border = "3px Solid #1795ce";
      });
      div_alert.style.display = "none";
    });

    //#yellow --------------Validar INPUTS-----------------------//#
    allInputs[7].addEventListener("input", (e) => {
      let temporalData = [];
      temporalData.push(["valISBN", e.target.value]);
      askFetch(3, "GET", temporalData).then((result) => {
        if (typeof result.success === "undefined") {
          e.target.style.border = "2px Solid #e35b5d";
          let template = "";
          template = `
                  <p>
                    <ion-icon
                      class="icon-alert"
                      name="alert-circle-outline"
                    ></ion-icon>
                    El ISBN ya existe en los registros.
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
          btn_create_book.disabled = true;
        } else if (typeof result.success !== "undefined") {
          e.target.style.border = "3px Solid #1795ce";
          div_alert.style.display = "none";
          btn_create_book.disabled = false;
        }
      });
    });
  });

  //#green ------------METHOD DELETE-------------------- //#
  repositorio.addEventListener("click", (e) => {
    e.stopPropagation();

    //#green ------------METHOD PUT-------------------- //#
    if (e.target.className == "button-update-book md hydrated") {
      let dato = [];
      dato.push(["ISBN", e.target.parentNode.parentNode.children[6].innerText]);
      //#white ------------SHOW DATA-------------------- //#
      askFetch(2, "GET", dato).then((result) => {
        let template = "";
        template = `
        <div class="modal-container">
          <ion-icon class="modal-icon-update" name="close"></ion-icon>
          <div class="modal-title">
            <h2>Actualizar Libro</h2>
          </div>
          <form class="modal-form">
            <div class="modal-input">
              <div class="modal-autor">
                <input type="text" placeholder="Ingrese el/los autor/es" value="${result["Book"][0].autor}" name="autor"/>
              </div>
              <div class="modal-anio">
                <input type="text" placeholder="Ingrese el año" value="${result["Book"][0].anio}" name="anio"/>
              </div>
              <div class="modal-titulo">
                <input
                  type="text"
                  placeholder="Ingrese el título del libro"
                  value="${result["Book"][0].titulo}"
                  name="titulo"
                />
              </div>
              <div class="modal-editorial">
                <input
                  type="text"
                  placeholder="Ingrese la editorial del libro"
                  value="${result["Book"][0].editorial}"
                  name="editorial"
                />
              </div>
              <div class="modal-ciudad">
                <input type="text" placeholder="Ingrese la Ciudad" value="${result["Book"][0].ciudad}" name="ciudad"/>
              </div>
              <div class="modal-pais">
                <input type="text" placeholder="Ingrese el País" value="${result["Book"][0].pais}" name="pais"/>
              </div>
              <div class="modal-edicion">
                <input
                  type="text"
                  placeholder="Ingrese la edición del libro"
                  value="${result["Book"][0].edicion}"
                  name="edicion"
                />
              </div>
              <div class="modal-isbn">
                <input type="text" placeholder="Ingrese el ISBN del libro" value="${result["Book"][0].isbn}" name="isbn"/>
              </div>
              <div class="modal-doi">
                <input type="text" placeholder="Ingrese el DOI del libro" value="${result["Book"][0].doi}" name="doi"/>
              </div>
              <div class="modal-link">
                <input type="text" placeholder="Ingrese el link del libro" value="${result["Book"][0].link}" name="link"/>
              </div>
              <div class="modal-img">
                <input
                  type="text"
                  placeholder="Ingrese el link de la imagen"
                  value="${result["Book"][0].imagen}"
                  name="imagen"
                />
              </div>
            </div>
            <div class="modal-select">
              <div class="modal-select-title">
                <h2>Categoría</h2>
                <h2>Carrera</h2>
              </div>
              <div class="modal-box-libro">
                <div class="modal-categoria"></div>
                <div class="modal-carrera"></div>
              </div>
              <div class="modal-select-info-libro">
                <div class="modal-group-categoria">
                  <select id="modal-select-categoria-update">
                    <option value = "1">Generalidades</option>
                    <option value = "2">Filosofía</option>
                    <option value = "3">Religión</option>
                    <option value = "4">Ciencias Sociales</option>
                    <option value = "5">Filología</option>
                    <option value = "6">Ciencias Naturales</option>
                    <option value = "7">Técnica y Ciencias Prácticas</option>
                    <option value = "8">Arte</option>
                    <option value = "9">Literatura e Historia</option>
                  </select>
                </div>
                <div class="modal-group-carrera">
                  <select id="modal-select-carrera-update">
                    <option value="1" >Contabilidad</option>
                    <option value="2" >Desarrollo de Software</option>
                    <option value="3" >Desarrollo infantil integral</option>
                    <option value="4" >Electricidad</option>
                    <option value="5" >Electromecánica</option>
                    <option value="6" >Electrónica</option>
                    <option value="7" >Fotografía</option>
                    <option value="8" >Gestión Ambiental</option>
                    <option value="9" >Marketing</option>
                    <option value="10" >Procesamiento de Alimentos</option>
                    <option value="11" >Producción Audiovisual</option>
                    <option value="12" >Física</option>
                    <option value="13" >Lenguaje</option>
                    <option value="14" >Matemática</option>
                    <option value="15" >Ciencias Naturales</option>
                    <option value="16" >Ciencias Sociales</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-text-incomplete-box">
              <p>
                <ion-icon
                  class="icon-alert"
                  name="alert-circle-outline"
                ></ion-icon>
                Debe llenar los campos correctamente.
              </p>
              <ion-icon class="icon-close" name="close"></ion-icon>
            </div>
            <button class="modal-button-update" type="submit">Agregar</button>
          </form>
        </div>
        `;
        let box_element_categoria = "";
        let box_element_carrera = "";
        modal_update_book.innerHTML = template;
        const close_modal_update = modal_update_book.children[0].children[0];
        const button_update =
          modal_update_book.children[0].children[2].children[3];
        const box_categoria =
          modal_update_book.children[0].children[2].children[1].children[1]
            .children[0];
        const box_carrera =
          modal_update_book.children[0].children[2].children[1].children[1]
            .children[1];
        const allInputs =
          modal_update_book.children[0].children[2].children[0].querySelectorAll(
            "div input"
          );
        const div_alert = modal_update_book.children[0].children[2].children[2];
        const close_alert = div_alert.children[1];
        if (result["Categoria"].length > 0) {
          result["Categoria"].forEach((element) => {
            box_element_categoria += `
              <div class="box-span ${element.id}">${element.categoria}</div>
            `;
          });
        }
        if (result["Carrera"].length > 0) {
          box_categoria.innerHTML = box_element_categoria;
          result["Carrera"].forEach((element) => {
            box_element_carrera += `
              <div class="box-span ${element.id}">${element.carrera}</div>
            `;
          });
        }
        box_carrera.innerHTML = box_element_carrera;
        var select_categoria =
          modal_update_book.children[0].children[2].children[1].children[2].children[0].querySelector(
            "#modal-select-categoria-update"
          );
        var select_carrera =
          modal_update_book.children[0].children[2].children[1].children[2].children[1].querySelector(
            "#modal-select-carrera-update"
          );

        var box_children_categoria = box_categoria.children;
        var box_children_carrera = box_carrera.children;

        removeBox(box_children_categoria);
        removeBox(box_children_carrera);

        select_categoria.addEventListener("change", (e) => {
          if (
            valData(
              box_categoria,
              e.target.children[e.target.value - 1].innerText
            )
          ) {
            let box = document.createElement("div");
            box.className = "box-span " + e.target.value;
            box.innerText = e.target.children[e.target.value - 1].innerText;
            const new_box = box_categoria.append(box);
            box_children_categoria = box_categoria.children;
          }
          removeBox(box_children_categoria);
        });

        select_carrera.addEventListener("change", (e) => {
          if (
            valData(
              box_carrera,
              e.target.children[e.target.value - 1].innerText
            )
          ) {
            let box = `
              <div class="box-span ${e.target.value}">${
              e.target.children[e.target.value - 1].innerText
            }</div>
            `;
            box_carrera.insertAdjacentHTML("beforeend", box);
            box_children_carrera = box_carrera.children;
          }
          removeBox(box_children_carrera);
        });

        close_modal_update.addEventListener("click", () => {
          modal_update_book.classList.remove("modal-show");
        });

        allInputs[7].addEventListener("input", (e) => {
          let temporalData = [];
          temporalData.push(["valISBN", e.target.value]);
          askFetch(3, "GET", temporalData).then((result) => {
            if (typeof result.success === "undefined") {
              e.target.style.border = "2px Solid #e35b5d";
              let template = "";
              template = `
                      <p>
                        <ion-icon
                          class="icon-alert"
                          name="alert-circle-outline"
                        ></ion-icon>
                        El ISBN ya existe en los registros.
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
              button_update.disabled = true;
            } else if (typeof result.success !== "undefined") {
              e.target.style.border = "3px Solid #1795ce";
              div_alert.style.display = "none";
              button_update.disabled = false;
            }
          });
        });

        //#white ------------UPDATE DATA-------------------- //#
        button_update.addEventListener("click", (e) => {
          e.preventDefault();
          let arrayBook = [];
          let temporalData = [];
          let option_update = true;
          arrayBook.push(["old_isbn", result["Book"][0].isbn]);
          arrayBook.push(["id", result["Book"][0].id]);
          allInputs.forEach((element) => {
            arrayBook.push([element.name, element.value]);
            if (element.name == "anio") {
              if (!expresiones.anio.test(element.value)) {
                option_update = false;
                element.style.border = "2px Solid #e35b5d";
              } else {
                element.style.border = "3px Solid #1795ce";
              }
            } else if (element.name == "isbn") {
              if (!expresiones.isbn.test(element.value)) {
                option_update = false;
                element.style.border = "2px Solid #e35b5d";
              } else {
                element.style.border = "3px Solid #1795ce";
              }
            } else {
              if (!expresiones.campo.test(element.value)) {
                option_update = false;
                element.style.border = "2px Solid #e35b5d";
              } else {
                element.style.border = "3px Solid #1795ce";
              }
            }
          });
          for (
            let element = 0;
            element < box_categoria.children.length;
            element++
          ) {
            temporalData.push(box_categoria.children[element].classList[1]);
          }
          arrayBook.push(["categoria", temporalData]);
          temporalData = [];
          for (
            let element = 0;
            element < box_carrera.children.length;
            element++
          ) {
            temporalData.push(box_carrera.children[element].classList[1]);
          }
          arrayBook.push(["carrera", temporalData]);
          if (option_update) {
            askFetch(1, "PUT", arrayBook).then((result) => {
              const validation =
                result["book"].success &&
                (result["carrera"].success || result["carrera"] === null) &&
                (result["categoria"].success || result["categoria"] === null);
              if (validation) {
                showAllResult();
                modal_update_book.classList.remove("modal-show");
              }
            });
          } else {
            div_alert.style.display = "block";
          }
          close_alert.addEventListener("click", () => {
            div_alert.style.display = "none";
          });
        });
      });
      modal_update_book.classList.add("modal-show");
    } else if (e.target.className == "button-delete-book md hydrated") {
      let datos = [];
      datos.push([
        "isbn",
        e.target.parentNode.parentNode.children[6].innerText,
      ]);
      // console.log(datos);
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
      modal_delete_book.innerHTML = template;
      modal_delete_book.classList.add("modal-show");
      const button_delete_book =
        modal_delete_book.children[0].children[2].children[0];
      const button_cancel_delete =
        modal_delete_book.children[0].children[2].children[1];
      const icon_cancel_delete_book = modal_delete_book.children[0].children[0];
      button_delete_book.addEventListener("click", () => {
        askFetch(1, "DELETE", datos).then((result) => {
          const validation =
            result["book"].success &&
            (result["carrera"].success || result["carrera"] === null) &&
            (result["categoria"].success || result["categoria"] === null);
          if (validation) {
            showAllResult();
            modal_delete_book.classList.remove("modal-show");
          }
        });
      });
      button_cancel_delete.addEventListener("click", () => {
        modal_delete_book.classList.remove("modal-show");
      });
      icon_cancel_delete_book.addEventListener("click", () => {
        modal_delete_book.classList.remove("modal-show");
      });
    }
  });
});

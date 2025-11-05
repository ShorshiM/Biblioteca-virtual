//#red ---------------------BUTTONS LEFT RIGHT-----------------------//#
const controllerButtons = (result, div_prevents, limit = 9) => {
  if (result.length <= limit) {
    div_prevents[0].style.display = "none";
    div_prevents[1].style.display = "none";
  } else {
    div_prevents[0].style.display = "block";
    div_prevents[1].style.display = "block";
  }
};
//#lightblue-----------------------CONTROLLER BOOK---------------------//#
const controllerRow = (template, valor, result, repositorio, option = 1) => {
  repositorio.innerHTML = "";
  if (option === 1) {
    let contador = 1;
    if (valor !== 1) {
      valor += 1;
    }
    for (let element = valor; element <= result.length; element++) {
      template = `<tr>
        <td>${result[element - 1].titulo}</td>
        <td>${result[element - 1].autor}</td>
        <td>${result[element - 1].anio}</td>
        <td>${result[element - 1].ciudad} - ${result[element - 1].pais}</td>
        <td>${result[element - 1].editorial}</td>
        <td>${result[element - 1].edicion}</td>
        <td>${result[element - 1].isbn}</td>
        <td>${result[element - 1].doi}</td>
        <td><ion-icon class="button-update-book" name="create-outline"></ion-icon> <ion-icon class="button-delete-book" name="trash-outline"></ion-icon></td>
      </tr>`;
      repositorio.insertAdjacentHTML("beforeend", template);
      if (element % 10 == 0) {
        valor = element;
        break;
      }
      contador++;
    }
    if (contador < 10) {
      valor -= 1;
    }
  } else {
    if (valor !== 1 && valor !== 10) {
      valor -= 1;
    }
    for (let element = valor; element >= 1; element--) {
      template = `<tr>
        <td>${result[element - 1].titulo}</td>
        <td>${result[element - 1].autor}</td>
        <td>${result[element - 1].anio}</td>
        <td>${result[element - 1].ciudad} - ${result[element - 1].pais}</td>
        <td>${result[element - 1].editorial}</td>
        <td>${result[element - 1].edicion}</td>
        <td>${result[element - 1].isbn}</td>
        <td>${result[element - 1].doi}</td>
        <td><ion-icon class="button-update-book" name="create-outline"></ion-icon> <ion-icon class="button-delete-book" name="trash-outline"></ion-icon></td>
      </tr>`;
      repositorio.insertAdjacentHTML("afterbegin", template);
      if (element % 11 == 0) {
        valor = element;
        break;
      }
    }
  }
  return valor;
};

//#lightblue-----------------------CONTROLLER BOOKS---------------------//#
const controllerRowBooks = (
  template,
  valor,
  result,
  repositorio,
  option = 1
) => {
  repositorio.innerHTML = "";
  if (option === 1) {
    let contador = 1;
    if (valor !== 1) {
      valor += 1;
    }
    for (let element = valor; element <= result.length; element++) {
      template = `<div class="hero-card">
        <div class="card-img">
          <img src="${result[element - 1].imagen}" class="img-book"/>
        </div>
        <div class="card-content">
          <h2 class="title">${result[element - 1].titulo}</h2>
          <h2 class="author">${result[element - 1].autor}r</h2>
          <p class="anio">${result[element - 1].anio}</p>
          <p class="anio">ISBN: ${result[element - 1].isbn}</p>
           <a class="link" href="${
             result[element - 1].link
           }" target="_blank">Ver enlace</a>
        </div>
      </div>`;
      repositorio.insertAdjacentHTML("beforeend", template);
      if (element % 12 == 0) {
        valor = element;
        break;
      }
      contador++;
    }
    if (contador < 12) {
      valor -= 1;
    }
  } else {
    if (valor !== 1 && valor !== 12) {
      valor -= 1;
    }
    for (let element = valor; element >= 1; element--) {
      template = `<div class="hero-card">
        <div class="card-img">
          <img src="${result[element - 1].imagen}" class="img-book"/>
        </div>
        <div class="card-content">
          <h2 class="title">${result[element - 1].titulo}</h2>
          <h2 class="author">${result[element - 1].autor}r</h2>
          <p class="anio">${result[element - 1].anio}</p>
          <p class="anio">ISBN: ${result[element - 1].isbn}</p>
          <a class="link" href="${
            result[element - 1].link
          }" target="_blank">Ver enlace</a>
        </div>
      </div>`;
      repositorio.insertAdjacentHTML("afterbegin", template);
      if (element % 13 == 0) {
        valor = element;
        break;
      }
    }
  }
  return valor;
};

//#lightblue-----------------------CONTROLLER USER---------------------//#
const controllerRowUser = (
  template,
  valor,
  result,
  repositorio,
  option = 1
) => {
  repositorio.innerHTML = "";
  if (option === 1) {
    let contador = 1;
    if (valor !== 1) {
      valor += 1;
    }
    for (let element = valor; element <= result.length; element++) {
      if (result[element - 1].rol === "Administrador") {
        template = templateUser(result[element - 1], "status delivered", false);
      } else if (result[element - 1].rol === "Asistente") {
        template = templateUser(result[element - 1], "status inProgress");
      } else if (result[element - 1].rol === "Docente") {
        template = templateUser(result[element - 1], "status pending");
      } else {
        template = templateUser(result[element - 1], "status return");
      }
      repositorio.insertAdjacentHTML("beforeend", template);
      if (element % 10 == 0) {
        valor = element;
        break;
      }
      contador++;
    }
    if (contador < 10) {
      valor -= 1;
    }
  } else {
    if (valor !== 1 && valor !== 10) {
      valor -= 1;
    }
    for (let element = valor; element >= 1; element--) {
      if (result[element - 1].rol === "Administrador") {
        template = templateUser(result[element - 1], "status delivered", false);
      } else if (result[element - 1].rol === "Asistente") {
        template = templateUser(result[element - 1], "status inProgress");
      } else if (result[element - 1].rol === "Docente") {
        template = templateUser(result[element - 1], "status pending");
      } else {
        template = templateUser(result[element - 1], "status return");
      }
      repositorio.insertAdjacentHTML("afterbegin", template);
      if (element % 11 == 0) {
        valor = element;
        break;
      }
    }
  }
  return valor;
};

const templateUser = (element, status, option = true) => {
  if (option) {
    var template = `<tr>
      <td>${element.Usuario}</td>
      <td>${element.carrera}</td>
      <td>${element.cedula}</td>
      <td>${element.telefono}</td>
      <td>${element.correo}</td>
      <td><span class="${status}">${element.rol}</span></td>
      <td><ion-icon class="button-update-user" name="create-outline"></ion-icon> <ion-icon class="button-delete-user" name="trash-outline"></ion-icon></td>
    </tr>`;
  } else {
    var template = `<tr>
      <td>${element.Usuario}</td>
      <td>${element.carrera}</td>
      <td>${element.cedula}</td>
      <td>${element.telefono}</td>
      <td>${element.correo}</td>
      <td><span class="${status}">${element.rol}</span></td>
    </tr>`;
  }
  return template;
};

const showAlertSearch = (template, alert_search, table_info, e) => {
  template = `
        <ion-icon name="sad"></ion-icon>
        No se encontró resultados para <span style="color: #e35b5d">${e.target.value}</span>
        `;
  alert_search.innerHTML = template;
  alert_search.parentNode.style.display = "block";
  table_info.style.display = "none";
};

const showAlertSearchBooks = (template, alert_search, table_info) => {
  template = `
        <i class="far fa-frown-open"></i>
        No se encontró resultados para esta <span style="color: #e35b5d">Búsqueda</span>
        `;
  alert_search.innerHTML = template;
  alert_search.parentNode.style.display = "block";
  table_info.style.display = "none";
};

//#blue ------------------------FUNCTION FETCH--------------------------//#
const askFetch = async ($query, ruta, method = "GET", datos = ["", ""]) => {
  let searchData = new FormData();
  searchData.append("method", method);
  if (datos[0].length > 0) {
    datos.forEach((element) => {
      searchData.append(element[0], element[1]);
    });
  }
  searchData.append("query", $query);
  try {
    const response = await fetch(ruta, {
      method: "POST",
      body: searchData,
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const templateCreateUser = () => {
  const template = `
  <div class="modal-container">
    <ion-icon class="modal-icon-create" name="close"></ion-icon>
    <div class="modal-title">
      <h2>Nuevo Usuario</h2>
    </div>
    <form class="modal-form">
      <div class="modal-nombre">
        <input
          class="modal-input-user"
          type="text"
          placeholder="Ingrese los nombres"
        />
      </div>
      <div class="modal-apellido">
        <input
          class="modal-input-user"
          type="text"
          placeholder="Ingrese los apellidos"
        />
      </div>
      <div class="modal-cedula">
        <input
          class="modal-input-user"
          type="text"
          placeholder="Ingrese la cédula"
        />
      </div>
      <div class="modal-correo">
        <input
          class="modal-input-user"
          type="email"
          placeholder="Ingrese el email"
        />
      </div>
      <div class="modal-password">
        <input
          class="modal-input-user"
          type="password"
          placeholder="Ingrese la contraseña"
        />
      </div>
      <div class="modal-telefono">
        <input
          class="modal-input-user"
          type="text"
          placeholder="Ingrese el número telefónico"
        />
      </div>
      <div class="modal-rol">
        <select id="modal-select-rol-create">
          <option value="2">Asistente</option>
          <option value="3">Docente</option>
          <option value="4" selected>Estudiante</option>
        </select>
      </div>
      <div class="modal-carrera">
        <select id="modal-select-carrera-create">
          <option value="1" selected>Contabilidad</option>
          <option value="2">Desarrollo de Software</option>
          <option value="3">Desarrollo infantil integral</option>
          <option value="4">Electricidad</option>
          <option value="5">Electromecánica</option>
          <option value="6">Electrónica</option>
          <option value="7">Fotografía</option>
          <option value="8">Gestión Ambiental</option>
          <option value="9">Marketing</option>
          <option value="10">Procesamiento de Alimentos</option>
          <option value="11">Producción Audiovisual</option>
        </select>
      </div>
      <div
        class="modal-text-incomplete-box modal-text-incomplete-box-create"
      >
        <p>
          <ion-icon
            class="icon-alert"
            name="alert-circle-outline"
          ></ion-icon>
          Llene los campos adecuadamente.
        </p>
        <ion-icon
          class="icon-close icon-close-create"
          name="close"
        ></ion-icon>
      </div>
      <button class="modal-button-create" type="submit">Agregar</button>
    </form>
  </div>
  `;
  return template;
};

const templateCreateBook = () => {
  var template = `
  <div class="modal-container">
    <ion-icon class="modal-icon-create" name="close"></ion-icon>
    <div class="modal-title">
      <h2>Nuevo Libro</h2>
    </div>
    <form class="modal-form">
      <div class="modal-input">
        <div class="modal-autor">
          <input
            type="text"
            placeholder="Ingrese el/los autor/es"
            name="autor"
          />
        </div>
        <div class="modal-anio">
          <input type="text" placeholder="Ingrese el año" name="anio" />
        </div>
        <div class="modal-titulo">
          <input
            type="text"
            placeholder="Ingrese el título del libro"
            name="titulo"
          />
        </div>
        <div class="modal-editorial">
          <input
            type="text"
            placeholder="Ingrese la editorial del libro"
            name="editorial"
          />
        </div>
        <div class="modal-ciudad">
          <input
            type="text"
            placeholder="Ingrese la Ciudad"
            name="ciudad"
          />
        </div>
        <div class="modal-pais">
          <input
            type="text"
            placeholder="Ingrese el País"
            name="pais"
          />
        </div>
        <div class="modal-edicion">
          <input
            type="text"
            placeholder="Ingrese la edición del libro"
            name="edicion"
          />
        </div>
        <div class="modal-isbn">
          <input
            type="text"
            placeholder="Ingrese el ISBN del libro"
            name="isbn"
          />
        </div>
        <div class="modal-doi">
          <input
            type="text"
            placeholder="Ingrese el DOI del libro"
            name="doi"
          />
        </div>
        <div class="modal-link">
          <input
            type="text"
            placeholder="Ingrese el link del libro"
            name="link"
          />
        </div>
        <div class="modal-img">
          <input
            type="text"
            placeholder="Ingrese el link de la imagen"
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
            <select id="modal-select-categoria-create">
              <option value="1">Generalidades</option>
              <option value="2">Filosofía</option>
              <option value="3">Religión</option>
              <option value="4">Ciencias Sociales</option>
              <option value="5">Filología</option>
              <option value="6">Ciencias Naturales</option>
              <option value="7">Técnica y Ciencias Prácticas</option>
              <option value="8">Arte</option>
              <option value="9">Literatura e Historia</option>
            </select>
          </div>
          <div class="modal-group-carrera">
            <select id="modal-select-carrera-create">
              <option value="1">Contabilidad</option>
              <option value="2">Desarrollo de Software</option>
              <option value="3">Desarrollo infantil integral</option>
              <option value="4">Electricidad</option>
              <option value="5">Electromecánica</option>
              <option value="6">Electrónica</option>
              <option value="7">Fotografía</option>
              <option value="8">Gestión Ambiental</option>
              <option value="9">Marketing</option>
              <option value="10">Procesamiento de Alimentos</option>
              <option value="11">Producción Audiovisual</option>
              <option value="12">Física</option>
              <option value="13">Lenguaje</option>
              <option value="14">Matemática</option>
              <option value="15">Ciencias Naturales</option>
              <option value="16">Ciencias Sociales</option>
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
          Llene los campos correctamente.
        </p>
        <ion-icon class="icon-close" name="close"></ion-icon>
      </div>
      <button class="modal-button-create" type="submit">Agregar</button>
    </form>
  </div>
  `;
  return template;
};

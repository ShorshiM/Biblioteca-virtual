window.addEventListener("DOMContentLoaded", () => {
  const table_general = document.getElementById("body-table");
  const table_asistentes = document.getElementById("table-asistentes");
  const cards_info = document.getElementById("card-info");

  const mostrar = async () => {
    try {
      const response = await fetch("assets/php/show_dashboard_user.php");

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const showAllResult = () => {
    mostrar().then((result) => {
      if (result.usuarios) {
        let template = "";
        // -------------------datos usuarios--------------------
        for (let element = 0; element < result["usuarios"].length; element++) {
          if (result["usuarios"][element].rol === "Administrador") {
            template += `<tr>
            <td>${result["usuarios"][element].Nombres}</td>
            <td>${result["usuarios"][element].carrera}</td>
            <td>${result["usuarios"][element].cedula}</td>
            <td><span class="status delivered">${result["usuarios"][element].rol}</span></td>
          </tr>`;
            // } else if (element.rol === "Asistente") {
            //   template += `<tr>
            //   <td>${element.Nombres}</td>
            //   <td>${element.carrera}</td>
            //   <td>${element.cedula}</td>
            //   <td><span class="status inProgress">${element.rol}</span></td>
            // </tr>`;
          } else if (result["usuarios"][element].rol === "Docente") {
            template += `<tr>
            <td>${result["usuarios"][element].Nombres}</td>
            <td>${result["usuarios"][element].carrera}</td>
            <td>${result["usuarios"][element].cedula}</td>
            <td><span class="status pending">${result["usuarios"][element].rol}</span></td>
          </tr>`;
          } // else {
          //   template += `<tr>
          //   <td>${element.Nombres}</td>
          //   <td>${element.carrera}</td>
          //   <td>${element.cedula}</td>
          //   <td><span class="status return">${element.rol}</span></td>
          // </tr>`;
          // }
          if (element > 14) {
          }
        }
        // result["usuarios"].forEach((element) => {

        // });
        table_general.innerHTML = template;
        template = "";
        // -------------------datos asistentes--------------------
        result["asistentes"].forEach((element) => {
          template += `<tr>
          <td>
            <h4>
              ${element.apellidos} ${element.nombres} <br />
              <span>${element.telefono}</span>
            </h4>
          </td>
        </tr>`;
        });
        table_asistentes.innerHTML = template;
        template = "";
        // -------------------datos información--------------------
        result["informacion"].forEach((element) => {
          if (element.tipo_usuario === "Estudiante") {
            template += `<div class="card">
            <div>
              <div class="numbers">${element.Datos}</div>
              <div class="cardName">Estudiantes</div>
            </div>
  
            <div class="iconBx">
              <ion-icon name="people-outline"></ion-icon>
            </div>
          </div>`;
          } else if (element.tipo_usuario === "Docente") {
            template += `<div class="card">
            <div>
              <div class="numbers">${element.Datos}</div>
              <div class="cardName">Docentes</div>
            </div>
  
            <div class="iconBx">
              <ion-icon name="people-outline"></ion-icon>
            </div>
          </div>`;
          } else if (element.tipo_usuario === "Asistente") {
            template += `<div class="card">
            <div>
              <div class="numbers">${element.Datos}</div>
              <div class="cardName">Asistentes</div>
            </div>
  
            <div class="iconBx">
              <ion-icon name="person-circle"></ion-icon>
            </div>
          </div>`;
          } else if (element.tipo_usuario === "Libros") {
            template += `<div class="card">
            <div>
              <div class="numbers">${element.Datos}</div>
              <div class="cardName">${element.tipo_usuario}</div>
            </div>
  
            <div class="iconBx">
              <ion-icon name="bookmarks"></ion-icon>
            </div>
          </div>`;
          }
        });
        cards_info.innerHTML = template;
      } else {
        location.replace("login.html");
      }
    });
  };

  showAllResult();
});

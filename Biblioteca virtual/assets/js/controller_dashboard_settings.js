window.addEventListener("DOMContentLoaded", () => {
  const box_info = document.getElementById("box-body-info");
  var permiso = false;
  let temporal_password = "";

  const mostrar = async () => {
    let searchData = new FormData();
    searchData.append("method", "GET");
    try {
      const response = await fetch("assets/php/show_admin_information.php", {
        method: "POST",
        body: searchData,
      });

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const showAllResult = (permiso) => {
    mostrar().then((result) => {
      if (!result.access) {
        let template = "";
        let password = "";
        result.forEach((element) => {
          for (x = 0; x < element.contrasenia.length; x++) {
            password += "*";
          }
          if (permiso) {
            template = `
        <div class="name">
          <p><strong>Nombres: </strong></p>
          <p>${element.nombres}</p>
        </div>
        <div class="lastname">
          <p><strong>Apellidos: </strong></p>
          <p>${element.apellidos}</p>
        </div>
        <div class="cedula">
          <p><strong>Cédula: </strong></p>
          <p>${element.cedula}</p>
        </div>
        <div class="email">
          <p><strong>Correo: </strong></p>
          <p>${element.correo}</p>
        </div>
        <div class="password">
          <p><strong>Contraseña: </strong></p>
          <p>${element.contrasenia}</p>
          <br />
          <span class="password-view"
            ><ion-icon name="eye"></ion-icon
          ></span>
        </div>
        <div class="number-phone">
          <p><strong>Teléfono: </strong></p>
          <p>${element.telefono}</p>
        </div>`;
          } else {
            template = `
        <div class="name">
          <p><strong>Nombres: </strong></p>
          <p>${element.nombres}</p>
        </div>
        <div class="lastname">
          <p><strong>Apellidos: </strong></p>
          <p>${element.apellidos}</p>
        </div>
        <div class="cedula">
          <p><strong>Cédula: </strong></p>
          <p>${element.cedula}</p>
        </div>
        <div class="email">
          <p><strong>Correo: </strong></p>
          <p>${element.correo}</p>
        </div>
        <div class="password">
          <p><strong>Contraseña: </strong></p>
          <p>${password}</p>
          <br />
          <span class="password-view"
            ><ion-icon id="button-view" name="eye"></ion-icon
          ></span>
        </div>
        <div class="number-phone">
          <p><strong>Teléfono: </strong></p>
          <p>${element.telefono}</p>
        </div>`;
          }
          temporal_password = element.contrasenia;
        });
        box_info.innerHTML = template;
        const button = box_info.children[4].querySelector(".password-view");

        button.addEventListener("click", () => {
          if (permiso) {
            permiso = false;
          } else {
            permiso = true;
          }

          showAllResult(permiso);
        });
      } else {
        location.replace("login.html");
      }
    });
  };

  showAllResult(permiso);

  // modal elements for settings
  const modal_settings = document.querySelector(".modal-settings");
  const modal_button = document.querySelector(".modal-button");
  const modal_icon = document.querySelector(".modal-icon");
  const button = document.querySelector(".btn-change-password");
  const div_repeat_password = document.querySelector(
    ".modal-text-repeat-password"
  );
  const div_incomplete_box = document.querySelector(
    ".modal-text-incomplete-box"
  );
  const div_error_password = document.querySelector(
    ".modal-text-error-password"
  );
  const div_ok_password = document.querySelector(".modal-text-ok");
  const close_div = document.querySelectorAll(".icon-close");
  const temporal = document.querySelector(".temporal");
  const input_password = document.getElementById("password");
  const input_new_password = document.getElementById("new-password");
  const input_repeat_new_password = document.getElementById(
    "repeat-new-password"
  );

  const remove_alerts = () => {
    div_repeat_password.style.display = "none";
    div_incomplete_box.style.display = "none";
    div_error_password.style.display = "none";
    div_ok_password.style.display = "none";
  };

  close_div.forEach((element) =>
    element.addEventListener("click", remove_alerts)
  );

  button.addEventListener("click", () => {
    div_repeat_password.style.display = "none";
    div_incomplete_box.style.display = "none";
    div_error_password.style.display = "none";
    div_ok_password.style.display = "none";
    modal_settings.classList.add("modal-show");
  });

  // -----------------Verificación de contraseña------------------ //
  modal_button.addEventListener("click", (e) => {
    e.preventDefault();
    const val =
      input_password.value.length > 0 &&
      input_new_password.value.length > 0 &&
      input_repeat_new_password.value.length > 0 &&
      input_new_password.value === input_repeat_new_password.value &&
      input_password.value === temporal_password;
    if (val) {
      password_ok();
    } else {
      if (input_new_password.value !== input_repeat_new_password.value) {
        div_repeat_password.style.display = "block";
      } else if (input_password !== temporal_password) {
        div_error_password.style.display = "block";
      } else {
        div_incomplete_box.style.display = "block";
      }
    }
    // modal_settings.classList.remove("modal-show");
  });

  // -----------------method PUT------------------ //
  const new_password = async () => {
    let searchData = new FormData();
    searchData.append("method", "PUT");
    // searchData.append("user", id_user);
    searchData.append("new-password", input_new_password.value);
    try {
      const response = await fetch("assets/php/show_admin_information.php", {
        method: "POST",
        body: searchData,
      });

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const password_ok = () => {
    new_password().then((result) => {
      let template = "";
      if (result.success) {
        template = `
          <p>
            <ion-icon
              class="icon-alert"
              name="checkmark-done-sharp"
            ></ion-icon>
            Contraseña actualizada correctamente.
          </p>
          `;
        temporal.innerHTML = template;
        div_ok_password.style.display = "block";
        showAllResult(permiso);
      }
    });
    input_password.value = "";
    input_new_password.value = "";
    input_repeat_new_password.value = "";
  };

  modal_icon.addEventListener("click", () => {
    modal_settings.classList.remove("modal-show");
  });
});

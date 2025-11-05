window.addEventListener("DOMContentLoaded", () => {
  const user = document.getElementById("id-user");
  const password = document.getElementById("password-user");
  const btn = document.getElementById("btn-login");
  const div_alert = document.getElementById("div-alert");
  const information_password = document.querySelector(".information-password");
  const information_user = document.querySelector(".information-user");

  // const expresiones = {
  //   usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  //   nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  //   password: /^.{4,12}$/, // 4 a 12 digitos.
  //   correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  //   telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  // }

  const expresiones = {
    usuario: /^[0-9]{10}$/, // números y solo asta 10 dígitos
    password: /^.{4,12}$/, // 4 a 12 dígitos.
  };

  // -----------------Log In------------------ //
  const login = async () => {
    let searchData = new FormData();
    searchData.append("user", user.value);
    searchData.append("password", password.value);
    try {
      const response = await fetch("assets/php/login.php", {
        method: "POST",
        body: searchData,
      });

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const login_user = () => {
    login().then((result) => {
      if (result["success"] === "ok") {
        if (
          result["rol"] === "Administrador" ||
          result["rol"] === "Asistente"
        ) {
          location.href = "dashboard.html";
        } else {
          location.href = "index.html";
        }
      } else {
        let template = `
        <p>
                <ion-icon
                  class="icon-alert"
                  name="alert-circle-outline"
                ></ion-icon>
                ${result.success}
              </p>
              <ion-icon class="icon-close" name="close"></ion-icon>
        `;
        div_alert.innerHTML = template;
        div_alert.style.display = "block";
        icon_close = div_alert.children[1];
      }
      // -----------------Information password------------------ //
      icon_close.addEventListener("click", () => {
        div_alert.style.display = "none";
      });
    });
  };

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    // -----------------Value information------------------ //
    if (
      expresiones.usuario.test(user.value) &&
      expresiones.password.test(password.value)
    ) {
      password.style.border = "1px solid #aaa";
      user.style.border = "1px solid #aaa";
      login_user();
    } else if (!expresiones.usuario.test(user.value)) {
      user.style.border = "2px solid #e35b5d";
    } else if (!expresiones.password.test(password.value)) {
      password.style.border = "2px solid #e35b5d";
    }
  });

  // -----------------Information user------------------ //
  user.addEventListener("input", (e) => {
    if (expresiones.usuario.test(e.target.value)) {
      information_user.style.display = "none";
    } else if (user.value.length === 0) {
      information_user.style.display = "none";
    } else {
      information_user.style.display = "block";
    }
  });

  // -----------------Information password------------------ //
  password.addEventListener("input", (e) => {
    if (expresiones.password.test(e.target.value)) {
      information_password.style.display = "none";
    } else if (password.value.length === 0) {
      information_password.style.display = "none";
    } else {
      information_password.style.display = "block";
    }
  });
});

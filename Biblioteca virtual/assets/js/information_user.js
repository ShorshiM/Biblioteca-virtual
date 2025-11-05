window.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("title-for-user");
  const usuario = document.getElementById("nombre-for-user");
  const usuario_student = document.getElementById("session-user");
  const library = document.querySelector(".library");
  const basic_library = document.querySelector(".library-basic");
  const hero = document.querySelector(".hero");

  const mostrar = async () => {
    try {
      const response = await fetch("assets/php/information_user.php");

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const showAllResult = () => {
    mostrar().then((result) => {
      let template = "";

      if (result.nombres) {
        inactivityUser();
        if (result["rol"] == "Administrador" || result["rol"] == "Asistente") {
          var validar = title && usuario;
          if (validar !== null) {
            template = `
                <a href="#">
                    <span class="icon">
                    <ion-icon name="school"></ion-icon>
                    </span>
                    <span class="title">${result["rol"]}</span>
                </a>
                `;
            title.innerHTML = template;

            template = `
                <h2>${result["apellidos"]} ${result["nombres"]}</h2>
                `;
            usuario.innerHTML = template;

            const index_user = usuario;
            console.log(index_user);

            index_user.addEventListener("click", () => {
              location.href = "index.html";
            });
          }

          // option
          validar = library && basic_library && hero && usuario_student;
          if (validar !== null) {
            library.style.display = "none";
            basic_library.style.display = "none";
            hero.style.display = "block";
            template = `
            <span class="user-name"
                ><i class="far fa-user-circle"></i> ${result["apellidos"]} ${result["nombres"]} 
                <i class="fas fa-sort-down bottom-arrow"></i>
            </span>
            <div id="option">
                <a href="dashboard.html" class="logout-option">Dashboard</a>
                <a href="assets/php/logout.php" class="logout-option">Cerrar Sesión</a>
            </div>
            `;
            usuario_student.innerHTML = template;
            const option = usuario_student.querySelector("#option");
            const arrow =
              usuario_student.children[0].querySelector(".bottom-arrow");

            arrow.addEventListener("click", () => {
              if (option.style.display == "block") {
                option.style.display = "none";
              } else {
                option.style.display = "block";
              }
            });
          }
        } else {
          library.style.display = "none";
          basic_library.style.display = "none";
          hero.style.display = "block";
          template = `
            <span class="user-name"
                ><i class="far fa-user-circle"></i> ${result["apellidos"]} ${result["nombres"]} 
                <i class="fas fa-sort-down bottom-arrow"></i>
            </span>
            <div id="option">
                <a href="assets/php/logout.php" class="logout-option">Cerrar Sesión</a>
            </div>
            `;
          usuario_student.innerHTML = template;
          const option = usuario_student.querySelector("#option");
          const arrow =
            usuario_student.children[0].querySelector(".bottom-arrow");

          arrow.addEventListener("click", () => {
            if (option.style.display == "block") {
              option.style.display = "none";
            } else {
              option.style.display = "block";
            }
          });
        }
      } else {
        library.style.display = "block";
        basic_library.style.display = "block";
        hero.style.display = "none";
      }
    });
  };

  showAllResult();

  const inactivityUser = () => {
    var check = true;
    var activity = 360;
    var time = window.setInterval(() => {
      document.onmousemove = () => {
        activity = 360;
      };

      if (activity <= 0 && check) {
        alert("Termino el limite de tiempo por inactividad.");
        check = false;
        location.replace("assets/php/logout.php");
      }
      activity--;
    }, 1100);
  };
});

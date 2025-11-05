window.addEventListener("DOMContentLoaded", () => {
  const repositorio = document.getElementById("repositorio");
  const repositorio_basic = document.getElementById("repositorio-basic");
  const hero = document.querySelector(".hero-container");
  const div_hero_search = document.querySelectorAll(".hero-search div");
  const button_hero_search = document.querySelector(".hero-search").children[4];
  const alert_search = document.querySelector(".alert-search p");
  const div_prevents = document.querySelector(".controller").children;
  const select_carrera = div_hero_search[0].children[0];
  const select_categoria = div_hero_search[1].children[0];
  const input_title = div_hero_search[2].children[0];
  const input_author = div_hero_search[3].children[0];
  const RUTA = "assets/php/search_book.php";

  const mostrar = async () => {
    try {
      const response = await fetch("assets/php/carreras.php");

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const showAllResult = () => {
    mostrar().then((result) => {
      let template_carrera = "";
      let template_materias_basicas = "";

      result.forEach((element) => {
        if (element.id <= 11) {
          template_carrera += `
              <div class="box">
                  <div class="box-title">
                      <h2>${element.carrera}</h2>
                  </div>
                  <div class="box-image">
                      <img
                          class="box-image-img"
                          src="${element.imagen_carrera}"
                          alt="SUCRE - ${element.carrera}"
                      />
                  </div>
                  <div class="box-container">
                      <p><strong>Libros:</strong> <span>${element.Libros}</span></p>
                  </div>
                  <div class="box-button">
                      <button class="button-books">
                          Ver <i class="fas fa-angle-double-right"></i>
                      </button>
                  </div>
              </div>`;
        } else {
          template_materias_basicas += `
              <div class="box">
                  <div class="box-title">
                      <h2>${element.carrera}</h2>
                  </div>
                  <div class="box-image">
                      <img
                          class="box-image-img"
                          src="${element.imagen_carrera}"
                          alt="SUCRE - ${element.carrera}"
                      />
                  </div>
                  <div class="box-container">
                      <p><strong>Libros:</strong> <span>${element.Libros}</span></p>
                  </div>
                  <div class="box-button">
                      <button class="button-books">
                          Ver <i class="fas fa-angle-double-right"></i>
                      </button>
                  </div>
              </div>`;
        }
      });
      repositorio.innerHTML = template_carrera;
      repositorio_basic.innerHTML = template_materias_basicas;
      const buttons_ver = repositorio.querySelectorAll("div .button-books");
      const buttons_ver_basic =
        repositorio_basic.querySelectorAll("div .button-books");
      buttons_ver.forEach((element) => {
        element.addEventListener("click", () => {
          location.href = "login.html";
        });
      });
      buttons_ver_basic.forEach((element) => {
        element.addEventListener("click", () => {
          location.href = "login.html";
        });
      });
    });
  };

  //#white ------------------SHOW BOOKS------------------------//#
  const showBooks = () => {
    askFetch(2, RUTA).then((result) => {
      let template = "";
      let valor = 1;
      if (typeof result.success === "undefined") {
        valor = controllerRowBooks(template, valor, result, hero);
        div_prevents[0].addEventListener("click", () => {
          valor = controllerRowBooks(template, valor, result, hero, 2);
        });
        div_prevents[1].addEventListener("click", () => {
          valor = controllerRowBooks(template, valor, result, hero);
        });
      } else {
        showAlertSearchBooks(template, alert_search, hero);
      }
      const linksBook = hero.querySelectorAll("div div a");
      // console.log(linksBook);
      linksBook.forEach((element) => {
        element.addEventListener("click", (e) => {
          e.preventDefault();
          let newInfo = [];
          newInfo.push(["libro", e.target.parentNode.children[0].innerText]);
          askFetch(3, RUTA, "GET", newInfo).then((result) => {
            if (result.success) {
              window.open(e.target.href);
            }
          });
        });
      });
    });
  };

  showAllResult();
  showBooks();

  button_hero_search.addEventListener("click", (e) => {
    e.preventDefault();
    let temporalData = [];
    // console.log(select_carrera.options[select_carrera.selectedIndex].text);
    temporalData.push(["carrera", select_carrera.value]);
    temporalData.push(["categoria", select_categoria.value]);
    if (input_title.value.length > 0) {
      temporalData.push(["titulo", input_title.value]);
    }
    if (input_author.value.length > 0) {
      temporalData.push(["autor", input_author.value]);
    }
    askFetch(1, RUTA, "GET", temporalData).then((result) => {
      let template;
      let valor = 1;
      let allData = [];
      if (
        typeof result["carrera"].success === "undefined" &&
        typeof result["categoria"].success === "undefined"
      ) {
        let data = result["carrera"];
        allData = data.concat(result["categoria"]);
      } else if (typeof result["carrera"].success === "undefined") {
        allData = result["carrera"];
      } else if (typeof result["categoria"].success === "undefined") {
        allData = result["categoria"];
      }
      if (allData.length > 0) {
        controllerButtons(allData, div_prevents, 11);
        valor = controllerRowBooks(template, valor, allData, hero);
        div_prevents[0].addEventListener("click", () => {
          valor = controllerRowBooks(template, valor, allData, hero, 2);
        });
        div_prevents[1].addEventListener("click", () => {
          valor = controllerRowBooks(template, valor, result, hero);
        });
      } else {
        showAlertSearchBooks(template, alert_search, hero);
      }
    });
  });
});

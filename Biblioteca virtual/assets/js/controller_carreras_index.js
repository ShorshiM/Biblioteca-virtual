window.addEventListener("DOMContentLoaded", () => {
  const repositorio = document.getElementById("repositorio");
  const repositorio_basic = document.getElementById("repositorio-basic");

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
    });
  };

  showAllResult();
});

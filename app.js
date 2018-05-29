//Inicializador del elemento Slider

var jsonObjer;
var ciudad = [];
var tipo = [];
var results = [];

$(document).ready(function () {

  var slider = $("#rangoPrecio").data("ionRangeSlider");
  var selectC = document.getElementById('ciudad');
  var selectT = document.getElementById('tipo');
  var card = document.getElementById('listaa');

  $("#buscar").click(function () {
    var sliderFrom = slider.result.from;
    var sliderTo = slider.result.to;
    var ciudadPos = selectC.selectedIndex;
    var selectTip = selectT.selectedIndex;


    if (ciudadPos == 0 || selectTip == 0) {
      alert("Seleccione una ciudad y un tipo");
      return;
    }

    card.innerHTML="";
    for (var i = 0; i < jsonObjer.length; i++) {

      var precio = jsonObjer[i].Precio.replace("$", "").replace(",", "");
      var ciudadN = ciudad[ciudadPos - 1];
      var tipoN = tipo[selectTip - 1];

      if (!(precio > sliderFrom && precio < sliderTo)) {
        continue;
      }

      if (!(jsonObjer[i].Ciudad === ciudadN && jsonObjer[i].Tipo === tipoN)) {
        continue;
      }

      var imgString = '<div class="card horizontal"><div class="card-image"><img src="img/home.jpg"></div><div class="card-stacked"><div class="card-content"><div><b>Direccion:  ' + jsonObjer[i].Direccion + '</b><p></p></div><div><b>Ciudad:' + jsonObjer[i].Ciudad + ' </b><p></p></div><div><b>Telefono:' + jsonObjer[i].Telefono + ' </b><p></p></div><div><b>Código postal: ' + jsonObjer[i].Codigo_Postal + '</b><p></p></div><div><b>Precio: ' + jsonObjer[i].Precio + '</b><p></p></div><div><b>Tipo: ' + jsonObjer[i].Tipo + '</b><p></p></div></div><div class="card-action right-align"><a href="#">Ver más</a></div></div></div>'
      var temp = document.createElement('div');
      temp.innerHTML = imgString;

      card.appendChild(temp);
    }


  });

});

$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

function loadJSON(callback) {

  $.getJSON("./data.json", function (data) {

    jsonObjer = data;
    var selectC = document.getElementById('ciudad');
    var selectT = document.getElementById('tipo');


    for (var i = 0; i < data.length; i++) {
      if (!ciudad.includes(data[i].Ciudad)) {
        ciudad.push(data[i].Ciudad);

        var opt = document.createElement('option');
        opt.value = data[i].Ciudad;
        opt.innerHTML = data[i].Ciudad;
        selectC.appendChild(opt);
      }

      if (!tipo.includes(data[i].Tipo)) {
        tipo.push(data[i].Tipo);


        var opt = document.createElement('option');
        opt.value = data[i].Tipo;
        opt.innerHTML = data[i].Tipo;
        selectT.appendChild(opt);

      }

    }

  });



}

function init() {
  loadJSON(function (response) {
    // Parse JSON string into object

    var actual_JSON = JSON.parse(response);
  });
}


function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

init();
setSearch()

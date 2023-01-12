$(window).on('load', function () {
    var $preloader = $('#p_prldr'),
        $svg_anm   = $preloader.find('.svg_anm');
    $svg_anm.fadeOut();
    $preloader.delay(200).fadeOut('slow');
});

$( ".select" ).click(function(){ 
	    $( "li").slideToggle('fast'); 
	  });
	  	  
$(".first ").hover(function () {
    $(this).find("#select2 li").toggle('fast');
  });

var city;
var city3 = $(input).text();
var city2;
var input = $('#city'),
inpVal = input.val();   	 	      
 $(document).on('click', 'span[class^="k"]', function(e) {
    e.preventDefault();       
	input.val(inpVal + $(this).attr('value'));
	city2 = $(this).text();
 $('#selected2').css('display','block');	
}); 
 $(document).on('click', 'span[class^="s"]', function(e) {
    e.preventDefault();       
	input.val(inpVal + $(this).attr('value'));
	city2 = $(this).text();
  $('#selected2').css('display','block');	
});
$(document).on('click', 'input[id^="city"]', function(e) {
    e.preventDefault();       
	input.val(inpVal + $(this).attr('value'));
	city2 = $(this).text();
  $('#selected2').css('display','none');
});

// перевод на украинский описания погоды
var znak = ['light shower snow','heavy shower snow','fog','overcast clouds','clear sky','few clouds','scattered clouds','broken clouds','shower rain','rain','thunderstorm','snow','mist','thunderstorm with light rain','thunderstorm with rain','thunderstorm with heavy rain','light thunderstorm','thunderstorm','heavy thunderstorm','ragged thunderstorm','thunderstorm with light drizzle','thunderstorm with drizzle','thunderstorm with heavy drizzle','light intensity drizzle','drizzle','heavy intensity drizzle','light intensity drizzle rain','drizzle rain','heavy intensity drizzle rain','shower rain and drizzle','heavy shower rain and drizzle','shower drizzle','light rain','moderate rain','heavy intensity rain','very heavy rain','extreme rain','freezing rain','light intensity shower rain','shower rain','heavy intensity shower rain','ragged shower rain','light snow','Snow','Heavy snow','Sleet','Light shower sleet','Shower sleet','Light rain and snow','Rain and snow','Light shower snow','Shower snow','Heavy shower snow'];

var znakUA = ['Легкий снігопад','Cильний снігопад','Туман','Затяжна хмарність','Чисте небо','Невелика хмарність','Мінлива хмарність','Хмарність','Зливовий дощ','Дощ','Гроза','Сніг','Мряка','Гроза з невеликим дощем','Гроза з дощем','гроза з сильним дощем','Легка гроза','Гроза','Сильна гроза','Місцями гроза','гроза з легким дощем','гроза з дощем, що мрячить','гроза, сильно дрібний дощ','Слабка мряка','Мряка','Сильна мряка','Слабо дрібний дощ','дрібний дощ','Сильна мряка','Короткочасні зливи, мряка','Проливний короткочасний дощ, мряка','Щільна мряка','Невеликий дощ','Помірний дощ','Сильний дощ','Дуже сильний дощ','Злива','Крижаний дощ','Помірний дощ','Проливний дощ','Сильна злива','Змінний злива','Легкий снігопад','Сніг','Сильний снігопад','Мокрий сніг','Невеликий дощ зі снігом','Сльота, дощ зі снігом','Легкий змінний дощ/ сніг','дощ зі снігом','невеликий снігопад','Безперервний снігопад','Рясний снігопад'];	   
$('#cityB').on('click', function(){
	$('#mapsShow').css('display','block');
	 $('.p').css('display','block');
    $('#adress').css('display','block');	 
	$('#tablo').css('display','flex');
    $('#OUT1').css('display','block');	
	 $('#OUT11').css('display','block');	
	city=$('#city').val();

//Карта
$('#map2').replaceWith('<div id="map2" style="height:500px;width:80%;"></div>');

var apiURI112 = `https://nominatim.openstreetmap.org/search/${city}?format=json&addressdetails=1&limit=1&polygon_svg=1`;
$.ajax({
		  url: apiURI112,
		  dataType: "json",
		  type: "GET",
		  async: "true",		 
	      timeout : 1000,		  
		}).done(dataHandler4);

function dataHandler4(d) {
	if(d.length == 0){
		console.log('ERROR');
		$('iframe').attr('src','https://nominatim.openstreetmap.org/search/'+city2);
		$('#map2').css('display','none');
		$('#OUT1').css('display','none');
		$('#OUT11').css('display','none');
		$('.p').css('display','none');
		$('#adress').css('display','none');
		}else{
$('iframe').attr('src','');
$('#mapsShow').css('display','none');
	var lattit = d[0].lat;	
    var longit = d[0].lon;
	var address = d[0].display_name;
	$('#adress').text(address);	
var center = [lattit, longit];

// Создаём карту
var map2 = L.map('map2').setView(center, 17);

// Настраиваем OSM
L.tileLayer(
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	zoom:9,
    maxZoom: 12,
  }).addTo(map2);

// добавляем маркер в указанном месте
L.marker(center).addTo(map2);
		}
 }
		var apiURI2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ua, uk&units=metric&appid=caa2908ee2cd777cd12d876d95207e6f`;		
		$.ajax({
		  url: apiURI2,
		  dataType: "jsonp",
		  type: "GET",
		  async: "true",		 
	      timeout : 500,
                    success : function(data) {
                        console.log("Success");
                    },
                    error : function(e) {
						$('#cityC').html('<p style="color:red";>ERROR</p><p style="color:#bef7f1";>Перевірте коректність назви</p>');
						$('#tablo').css('display','none');
						$('#map2').css('display','none');
		                $('#OUT1').css('display','none');
		                $('#OUT11').css('display','none');
		                $('.p').css('display','none');
		                $('#adress').css('display','none');
                    },
                    done : function(e) {
                    },  
		}).done(dataHandler3),getWeather2();

$('.text-center').css('display','block');	
$('#selected').text(city);
$('#selected2').html('<p>('+city2+')</p>');
function getWeather2() {
var city4=$('#city').val();	
    var apiURI4 = `https://api.openweathermap.org/data/2.5/weather?q=${city4}&units=metric&appid=caa2908ee2cd777cd12d876d95207e6f`;
    //делаем запрос на данные о погоде    
    return $.ajax({
      url: apiURI4,
      dataType: "jsonp",
      type: "GET",
      async: "true",
	  timeout : 200,
    }).done(dataHandler2);
  }  
function dataHandler2(data) {
var tempMode = Math.round(data.main.temp);
var m4 = znak.indexOf(data.weather[0].description);	    
    if (data.main.temp && data.sys) {
      // отображение иконки
      if (data.weather) {
        var imgURL = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
		document.getElementById("demo27").innerHTML = "Погода: " + " " + znakUA[m4];
		document.getElementById("demo125").innerHTML = "Температура: " + " " + tempMode+"°C";
        $("#tmp24").attr("src", imgURL);       
      }      	   	
  }
} 
 	 
function dataHandler3(data) {	
    var name =  data.city.name;
$('#cityC').text('в' + ' ' + name);  	

var now = new Date();
var today = new Date(now.getFullYear(), now.getMonth(), now.getDate(),now.getHours()).valueOf();
var g = new Date(data.list[0].dt_txt).valueOf();		  
var d = new Date();
	d.setDate(d.getDate() + 1);
var K;
if(now < g){ K = Math.floor((d.getHours()/3))}else{K = Math.floor((d.getHours()/3)-1)};
	   	
//завтра
          //ЗАВТРА
var LAST = (14-(K));
var FIRST = (7-(K));
var arr1 = [];
var arr11 = [];
var arr111 = [];
for (var i=FIRST; i<=LAST; i++) {
 arr1.push(data.list[i].main["temp"]);  
 arr11.push(data.list[i].weather[0].icon); 
 arr111.push(data.list[i].weather[0]["description"]);   
};
var m = znak.indexOf(arr111[4]);
  min1 = arr1[0];
  max1 = min1;
  for (i = 1; i < arr1.length; ++i) {
      if (arr1[i] > max1) max1 = arr1[i];
      if (arr1[i] < min1) min1 = arr1[i];
  }  		
		$("#demo5").text("Макс" + " " + Math.round(max1)+"°C");
		$("#demo6").text("Мін" +  " " + Math.round(min1)+"°C");
		
		$("#demo172").text(" "+" " + Math.round(arr1[0])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr11[0] + ".png";
		$("#tmp111").attr("src", imgURL);
		
		$("#demo173").text(" " +  " " + Math.round(arr1[1])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr11[1] + ".png";
		$("#tmp112").attr("src", imgURL);
		
		$("#demo174").text(" " +  " " + Math.round(arr1[2])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr11[2] + ".png";
		$("#tmp113").attr("src", imgURL);
		
		$("#demo175").text(" " +  " " + Math.round(arr1[3])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr11[3] + ".png";
		$("#tmp114").attr("src", imgURL);
		
		$("#demo176").text(" " +  " " + Math.round(arr1[4])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr11[4] + ".png";
		$("#tmp115").attr("src", imgURL);
		
		$("#demo177").text(" " +  " " + Math.round(arr1[5])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr11[5] + ".png";
		$("#tmp116").attr("src", imgURL);
		
		$("#demo178").text(" " +  " " + Math.round(arr1[6])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr11[6] + ".png";
		$("#tmp117").attr("src", imgURL);
		
		$("#demo179").text(" " +  " " + Math.round(arr1[7])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr11[7] + ".png";
		$("#tmp118").attr("src", imgURL);
		
		var imgURL = "https://openweathermap.org/img/w/" + arr11[4] + ".png";
		$("#tmp4").attr("src", imgURL);
		$("#demo71").text(znakUA[m]);		
//післязавтра
var LAST1 = (22-K);
var FIRST1 = (15-K);
var arr2 = [];
var arr12 = [];
var arr121 = [];
for (var i= FIRST1; i<=LAST1; i++) {
 arr2.push(data.list[i].main["temp"]);  
 arr12.push(data.list[i].weather[0].icon);  
 arr121.push(data.list[i].weather[0]["description"]);   
};
var m1 = znak.indexOf(arr121[4]);
  min2 = arr2[0];
  max2 = min2;
  for (i = 1; i < arr2.length; ++i) {
      if (arr2[i] > max2) max2 = arr2[i];
      if (arr2[i] < min2) min2 = arr2[i];
  }           
		$("#demo10").text("Макс" + " " + Math.round(max2)+"°C");
		$("#demo11").text("Мін" +  " " + Math.round(min2)+"°C");
		$("#demo141").text(" " +  " " + Math.round(arr2[0])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr12[0] + ".png";
		$("#tmp121").attr("src", imgURL);
		$("#demo142").text(" " +  " " + Math.round(arr2[1])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr12[1] + ".png";
		$("#tmp122").attr("src", imgURL);
		$("#demo143").text(" " +  " " + Math.round(arr2[2])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr12[2] + ".png";
		$("#tmp123").attr("src", imgURL);
		$("#demo144").text(" " +  " " + Math.round(arr2[3])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr12[3] + ".png";
		$("#tmp124").attr("src", imgURL);
		$("#demo145").text(" " +  " " + Math.round(arr2[4])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr12[4] + ".png";
		$("#tmp125").attr("src", imgURL);
		$("#demo146").text(" " +  " " + Math.round(arr2[5])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr12[5] + ".png";
		$("#tmp126").attr("src", imgURL);
		$("#demo147").text(" " +  " " + Math.round(arr2[6])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr12[6] + ".png";
		$("#tmp127").attr("src", imgURL);
		$("#demo148").text(" " +  " " + Math.round(arr2[7])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr12[7] + ".png";
		$("#tmp128").attr("src", imgURL);
		
		var imgURL = "https://openweathermap.org/img/w/" + arr12[4] + ".png";
		$("#tmp5").attr("src", imgURL);
		$("#demo72").text(znakUA[m1]);
//после-послезавтра
var LAST2 = (30-K);
var FIRST2 = (23-K);
var arr3 = [];
var arr13 = [];
var arr131 = [];
for (var i=FIRST2; i<=LAST2; i++) {
 arr3.push(data.list[i].main["temp"]);  
 arr13.push(data.list[i].weather[0].icon);
 arr131.push(data.list[i].weather[0]["description"]);       
};
var m2 = znak.indexOf(arr131[4]);
  min3 = arr3[0];
  max3 = min3;
  for (i = 1; i < arr3.length; ++i) {
      if (arr3[i] > max3) max3 = arr3[i];
      if (arr3[i] < min3) min3 = arr3[i];
  }  
		$("#demo14").text("Макс" + " " + Math.round(max3)+"°C");
		$("#demo15").text("Мін" +  " " + Math.round(min3)+"°C");
		$("#demo151").text(" " +  " " + Math.round(arr3[0])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr13[0] + ".png";
		$("#tmp131").attr("src", imgURL);
		$("#demo152").text(" " +  " " + Math.round(arr3[1])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr13[1] + ".png";
		$("#tmp132").attr("src", imgURL);
		$("#demo153").text(" " +  " " + Math.round(arr3[2])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr13[2] + ".png";
		$("#tmp133").attr("src", imgURL);
		$("#demo154").text(" " +  " " + Math.round(arr3[3])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr13[3] + ".png";
		$("#tmp134").attr("src", imgURL);
		$("#demo155").text(" " +  " " + Math.round(arr3[4])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr13[4] + ".png";
		$("#tmp135").attr("src", imgURL);
		$("#demo156").text(" " +  " " + Math.round(arr3[5])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr13[5] + ".png";
		$("#tmp136").attr("src", imgURL);
		$("#demo157").text(" " +  " " + Math.round(arr3[6])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr13[6] + ".png";
		$("#tmp137").attr("src", imgURL);
		$("#demo158").text(" " +  " " + Math.round(arr3[7])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr13[7] + ".png";
		$("#tmp138").attr("src", imgURL);
		
		var imgURL = "https://openweathermap.org/img/w/" + arr13[4] + ".png";
		$("#tmp6").attr("src", imgURL);
		$("#demo73").text(znakUA[m2]);	
//после-после-послезавтра
var LAST3 = (38-K);
var FIRST3 = (31-K);
var arr4 = [];
var arr14 = [];
var arr444 = [];
var arr141 = [];
for (var i=FIRST3; i<=LAST3; i++) {
 arr4.push(data.list[i].main["temp"]);  
 arr14.push(data.list[i].weather[0].icon);
 arr444.push(data.list[i].dt_txt);
 arr141.push(data.list[i].weather[0]["description"]);         
};
var m3 = znak.indexOf(arr141[4]);
  min4 = arr4[0];
  max4 = min4;
  for (i = 1; i < arr4.length; ++i) {
      if (arr4[i] > max4) max4 = arr4[i];
      if (arr4[i] < min4) min4 = arr4[i];
  }  
		$("#demo18").text("Макс" + " " + Math.round(max4)+"°C");
		$("#demo19").text("Мін" +  " " + Math.round(min4)+"°C");
		$("#demo161").text(" " +  " " + Math.round(arr4[0])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr14[0] + ".png";
		$("#tmp181").attr("src", imgURL);
		$("#demo162").text(" " +  " " + Math.round(arr4[1])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr14[1] + ".png";
		$("#tmp182").attr("src", imgURL);
		$("#demo163").text(" " +  " " + Math.round(arr4[2])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr14[2] + ".png";
		$("#tmp183").attr("src", imgURL);
		$("#demo164").text(" " +  " " + Math.round(arr4[3])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr14[3] + ".png";
		$("#tmp184").attr("src", imgURL);
		$("#demo165").text(" " +  " " + Math.round(arr4[4])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr14[4] + ".png";
		$("#tmp185").attr("src", imgURL);
		$("#demo166").text(" " +  " " + Math.round(arr4[5])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr14[5] + ".png";
		$("#tmp186").attr("src", imgURL);
		$("#demo167").text(" " +  " " + Math.round(arr4[6])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr14[6] + ".png";
		$("#tmp187").attr("src", imgURL);
		$("#demo168").text(" " +  " " + Math.round(arr4[7])+"°C");
		var imgURL = "https://openweathermap.org/img/w/" + arr14[7] + ".png";
		$("#tmp188").attr("src", imgURL);
		
		var imgURL = "https://openweathermap.org/img/w/" + arr14[4] + ".png";
		$("#tmp7").attr("src", imgURL);
		$("#demo74").text(znakUA[m3]);					
   } 
   });
 //Показ дни недели 
  function showDateTime() {								
				var d = new Date();
				var n1, n2, n3, n4, n5;
				var weekday = new Array(7);
					weekday[0] = "Неділя";
					weekday[1] = "Понеділок";
					weekday[2] = "Вівторок";
					weekday[3] = "Середа";
					weekday[4] = "Четвер";
					weekday[5] = "П'ятниця";
					weekday[6] = "Субота";
					 
					 if(d.getDay() >= 3){
						   n1 = weekday[(d.getDay()+1)];
						   n2 = weekday[(d.getDay()+2)];
						   n3 = weekday[(d.getDay()+3)];
						   n4 = weekday[7-(d.getDay()+4)];} if(d.getDay() >= 4)
					     {
						   n1 = weekday[(d.getDay()+1)];
						   n2 = weekday[(d.getDay()+2)];
						   n3 = weekday[7-(d.getDay()+3)];
						   n4 = weekday[9-(d.getDay()+4)];} if(d.getDay() >= 5)
					     {
						   n1 = weekday[(d.getDay()+1)];
						   n2 = weekday[7-(d.getDay()+2)];
						   n3 = weekday[9-(d.getDay()+3)];
						   n4 = weekday[11-(d.getDay()+4)];} if(d.getDay() >= 6)
					     {
						   n1 = weekday[7-(d.getDay()+1)];
						   n2 = weekday[9-(d.getDay()+2)];
						   n3 = weekday[11-(d.getDay()+3)];
						   n4 = weekday[13-(d.getDay()+4)];}  if(d.getDay() < 3) 
						 {
					       n1 = weekday[(d.getDay()+1)];
						   n2 = weekday[(d.getDay()+2)];
						   n3 = weekday[(d.getDay()+3)];
						   n4 = weekday[(d.getDay()+4)];
						  
					     }						
								document.getElementById("day1").innerHTML = n1;
								document.getElementById("day2").innerHTML = n2;
								document.getElementById("day3").innerHTML = n3;
								document.getElementById("day4").innerHTML = n4;								
			}				
var $tempMode = $("#tempMode");
var $tempText = $("#temp-text");
var $windText = $("#wind-text");
var $windText2 = $("#wind-text2");
var $windText3 = $("#wind-text3");
var $windText4 = $("#wind-text4");
var $windText5 = $("#wind-text5");
  // эта функция берет температуру из обработчика данных и отображает температуру в соответствии с правильной единицей измерения температуры, а также отображает температуру теплой или холодной.
  function formatTemperature(kelvin) {        
    var clicked = false;
    var fahr = ((kelvin * 9 / 5) - 459.67).toFixed(0);
    var cels = (kelvin - 273.15).toFixed(1);
    //инициация индикации температуры
    $tempText.html(cels);
    var firstClick = false;
    //щелкните обработчик, чтобы обновить единицу измерения температуры.
    $tempMode.off("click").on("click", function() {
      firstClick = true;
      clicked === false ? clicked = true : clicked = false;
      clicked === true ? $tempMode.html("F&deg") : $tempMode.html("C&deg") ;
      if (clicked) {
	  $tempText.html(fahr);        
      } else
        $tempText.html(cels);
    });
    if (cels > 24) {
      $("#temp-text").css("color", "red");
    } else if (cels < 18) {
      $("#temp-text").css("color", "blue");
    }
  }
  //обрабатывает данные ответа и форматирует их соответствующим образом, поскольку это асинхронный объект ответа, вся обработка и форматирование данных должны выполняться в этой функции.  
  function dataHandler(data) {
    dataString = JSON.stringify(data);
    formatTemperature(data.main.temp);
    if (data.main.temp && data.sys) {
      // отображение иконки
      if (data.weather) {
        var imgURL = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        $("#weatherImg").attr("src", imgURL);
		 //выводим на украинском
var k = znak.indexOf(data.weather[0].description); 
        $("#weather-text").text(znakUA[k]);
      }
      // скорость ветра
      if (data.wind) {
        var knots = data.wind.speed;
        $windText.html(knots.toFixed(1) + " М/С");
        var knots2 = data.wind.speed * 1.9438445;
	    $windText2.html(knots2.toFixed(1) + " Вузлів");
      }
	  if (data.main) {
        var hum2 = data.main.pressure;
		var mm = (data.main.pressure * 0.75006).toFixed(0);
        $windText3.html(mm + " мм.рт.ст.");
    }
if (data.main) {
        var hum3 = data.main.humidity;
        $windText4.html(hum3 + " %");
    } 	
  }
}
  function getWeather(locdata) {
    var lat = locdata.latitude;
    var lon = locdata.longitude;	
    var apiURI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=caa2908ee2cd777cd12d876d95207e6f`;	
//выводим данные IP
    if (locdata){     
      $("#city-text").html(locdata.city );
      $("#city-text2").html(locdata.country_name);
      $("#city-text3").html(" Індекс: " + locdata.postal);
      $("#city-text4").html(" Широта: " + locdata.latitude + " Довгота: " + locdata.longitude);
      $("#city-text5").html("Ваш IP: " + locdata.ip);
      $("#city-text6").html(" Провайдер: " + locdata.org);
    } else {
    }
  
    return $.ajax({
      url: apiURI,
      dataType: "jsonp",
      type: "GET",
      async: "true",
    }).done(dataHandler);
  }
  var counter = 0;
  function getLocation() {    
    //делаем запрос на локализацию устройства
    return $.ajax({
      url: "https://ipapi.co/jsonp/",
      dataType: "jsonp",
      type: "GET",
      async: "true",
    });
  }    
  var updateInterval = setInterval(getLocation().done(getWeather), 3000);
  setTimeout(() => {clearInterval(updateInterval);}, 1500);
 function showDateTime2() {
            var now = new Date();
            date.textContent = `${now.toLocaleDateString("uk-UA", { day: "numeric", month: "long" })} ${now.getFullYear()} року, `
                + now.toLocaleDateString("uk-UA", { weekday: "long" });
            time.textContent = correctTime(now);
        }
        showDateTime2();
        setInterval(showDateTime2, 1000); 
        let stopwatchId, stopwatch_ms,
            timerId, timer_ms;                                 
        // Общая функция корректного отображения времени. 
        function correctTime(time) {
            let h = time.getHours(),
                m = time.getMinutes(),
                s = time.getSeconds();
            return `${(h < 10 ? "0" : "") + h}:${(m < 10 ? "0" : "") + m}:${(s < 10 ? "0" : "") + s}`;
        } 
        // В Opera отображение ведущего нуля часов глючит в Intl.
        function correctTimeIntl(time) {
            let format = Intl.DateTimeFormat("uk-UA", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
            return format.format(time);
        }
showDateTime2();
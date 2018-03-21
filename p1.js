var indiceEncontrado = -1;

var boolDataMode_XML = 1;
var boolDataMode_JSON = 2;
var boolDataMode = boolDataMode_JSON;

var txt = "<alumnos>" 
txt += 	"<alumno>" 
txt +=	"<clave>123456</clave>" 
txt +=	"<nombre>Juan</nombre>" 
txt +=	"<sexo>Masculino</sexo>" 
txt +=	"<edoCivil>Soltero</edoCivil>" 
txt += "</alumno>" 
txt += 	"<alumno>" 
txt +=	"<clave>123457</clave>" 
txt +=	"<nombre>Lety</nombre>" 
txt +=	"<sexo>Femenino</sexo>" 
txt +=	"<edoCivil>Soltero</edoCivil>" 
txt += "</alumno>" 
txt += "</alumnos>";

var parser = new DOMParser();
var xmlDoc = parser.parseFromString(txt,"text/xml");

var txtj = '{"alumno":['
			+ '{ "clave":"123450", "nombre":"Juan", '
				+'"sexo":"Masculino", "edoCivil":"Soltero"},'
			+ '{ "clave":"123451", "nombre":"Lety", '
				+'"sexo":"Femenino", "edoCivil":"Soltero"}'
			+ ']}';
			
var alumnos = JSON.parse(txtj);
			
function altas()
{
	document.getElementById("altas").style.display = "block";
	document.getElementById("bajas").style.display = "none";
	document.getElementById("buscar").style.display = "none";
	document.getElementById("cambios").style.display = "none";
	document.getElementById("reporte").style.display = "none";
} //altas

function sendData()
{
	clave = document.getElementById("claveA").value;
	nombre = document.getElementById("nombreA").value;
	if(document.getElementById("sexoMA").checked == true)
		sexo = "Masculino";
	else
		sexo = "Femenino";
	edoCivil = document.getElementById("edoCivilA").value;
	
	if (boolDataMode == boolDataMode_XML)
	{
		newEleClave = xmlDoc.createElement("clave");
		newTxtClave = xmlDoc.createTextNode(clave);
		newEleClave.appendChild(newTxtClave);

		newEleNombre = xmlDoc.createElement("nombre");
		newTxtNombre = xmlDoc.createTextNode(nombre);
		newEleNombre.appendChild(newTxtNombre);
	
		newEleSexo = xmlDoc.createElement("sexo");
		newTxtSexo = xmlDoc.createTextNode(sexo);
		newEleSexo.appendChild(newTxtSexo);
		
		newEleEdoCivil = xmlDoc.createElement("edoCivil");
		newTxtEdoCivil = xmlDoc.createTextNode(edoCivil);
		newEleEdoCivil. appendChild(newTxtEdoCivil);
		
		newEleA = xmlDoc.createElement("alumno");
		newEleA.appendChild(newEleClave);
		newEleA.appendChild(newEleNombre);
		newEleA.appendChild(newEleSexo);
		newEleA.appendChild(newEleEdoCivil);
	
		xmlDoc.getElementsByTagName("alumnos")[0].appendChild(newEleA);
	}//if
	else 
	{
		var objAlumno = {
			clave: clave,
			nombre: nombre,
			sexo: sexo,
			edoCivil: edoCivil,
		};
		
		alumnos.alumno.push(objAlumno);
	}//else JSON
	alert("Alta Realizada.");
}//sendData

function bajas()
{
	document.getElementById("altas").style.display = "none";
	document.getElementById("bajas").style.display = "block";
	document.getElementById("buscar").style.display = "none";
	document.getElementById("cambios").style.display = "none";
	document.getElementById("reporte").style.display = "none";
}

function deleteData()
{
	clave = document.getElementById("claveB").value;
	i = 0;
	flag = false;
	
	if (boolDataMode = boolDataMode_XML)
	{
		x = xmlDoc.getElementByTagName("alumno");
		l = x.length;
	}//if-XML
	else 
	{
		l = alumnos.alumno.length;
	}//else-JSON
	
	
	while ((i<l) && (flag==false))
	{
		if (boolDataMode == boolDataMode_XML)
		{
			if (x[i].childNodes[0].childNodes[0].nodoValue == clave)
			{	//Se encontro registro a borrar
				baja = confirm("Dar de baja a: "
								+x[i].childNodes[0].childNodes[0].nodoValue
								+" - "
								+x[i].childNodes[0].childNodes[0].nodoValue
								+ "?");
				if (baja == true)
				{
					x[i].parentNode.removeChild(x[i]);
					alert("Alumno dado de baja.");
				}
				flag = true;
			}
			else
				i++;
		}//if
		else if (boolDataMode == boolDataMode_JSON)
		{
			if (alumnos.alumno[i].clave == clave)
			{	//Se encontro registro a borrar
				baja = confirm("Dar de baja a: "
								+alumnos.alumno[i].clave
								+" - "
								+alumnos.alumno[i].nombre
								+ "?");
				if (baja == true)
				{
					alumnos.alumno.splice(i,1);
					alert("Alumno dado de baja.");
				}
				flag = true;
			}
			else
				i++;
		}//else-JSON
	}//while
	alert("Baja Realizada.");
}

function cambios()
{
	document.getElementById("altas").style.display = "none";
	document.getElementById("bajas").style.display = "none";
	document.getElementById("buscar").style.display = "none";
	document.getElementById("cambios").style.display = "block";
	document.getElementById("reporte").style.display = "none";
}

function changeData()
{
	clave = document.getElementById("buscarC").value;
	i=0;
	flag = false;
	
	if (boolDataMode == boolDataMode_XML)
	{
		x = xmlDoc.getElementsByTagName("alumno");
		l = x.length;
	}//if-XML
	else {
		l = alumnos.alumno.length;
	}//else-JSON
	
	while (i < l && flag == false)
	{
		if (boolDataMode == boolDataMode_XML)
		{
			if (x[i].childNodes[0].childNodes[0].nodeValue == clave)
			{
				//Copia de los valores del documento XML a controles HTML de la página
				document.getElementById("claveC").value = 
					x[i].childNodes[0].childNodes[0].nodeValue;
				document.getElementById("nombreC").value = 
					x[i].childNodes[1].childNodes[0].nodeValue;
					if (x[i].childNodes[0].childNodes[0].nodeValue == "Masculino")
				{
					document.getElementById("sexoMC").checked = true;
					document.getElementById("sexoFC").checked = false;
				}
				else
				{
					document.getElementById("sexoMC").checked = false;
					document.getElementById("sexoFC").checked = true;
				}
				document.getElementById("edoCivilC").value =
					x[i].childNodes[1].childNodes[0].nodeValue;
					indiceEncontrado = i;
					flag = true;
			}//if
			else{
				i++;
			}
		}//if-XML
		else if (boolDataMode == boolDataMode_JSON)
		{
			if (alumnos.alumno[i].clave == clave)
			{
				document.getElementById("claveC").value = alumnos.alumno[i].clave;
				document.getElementById("nombreC").value = alumnos.alumno[i].nombre;
				x[i].childNodes[1].childNodes[0].nodeValue;
				if (alumnos.alumno[i].sexo == "Masculino")
				{
					document.getElementById("sexoMC").checked = true;
					document.getElementById("sexoFC").checked = false;
				}
				else
				{
					document.getElementById("sexoMC").checked = false;
					document.getElementById("sexoFC").checked = true;
				}
				document.getElementById("edoCivilC").value =
				x[i].childNodes[1].childNodes[0].nodeValue;
				indiceEncontrado = i;
				flag = true;
				}//if
				else
					i++;
		}//else-JSON
	}//while
	
	if (flag)
		document.getElementById("formCambios").style.display = "block";
	else 
	{
		indiceEncontrado = -1;
		alert("Not Found");
	}
}//change data

function updateData () 
{
	i = indiceEncontrado;
	
	if (i >= 0)
	{
		//Si fue encontrado
		if (document.getElementById("sexoMC").checked = true)
			sexo = "Masculino";
		else
			sexo = "Femenino";
		if (boolDataMode == boolDataMode_XML)
		{
			x=xmlDoc.getElementById("alumno");
			
			x[i].childNodes[0].childNodes[0].nodeValue = document.getElementById("claveC").value;
			x[i].childNodes[1].childNodes[0].nodeValue = document.getElementById("nombreC").value;
			x[i].childNodes[2].childNodes[0].nodeValue = sexo;
			x[i].childNodes[3].childNodes[0].nodeValue = document.getElementById("edoCivilC").value;
		}//if-XML
		else
		{
			alumno.alumno[i].clave = document.getElementById("claveC").value;
			alumno.alumno[i].nombre = document.getElementById("nombreC").value;
			alumno.alumno[i].sexo = sexo;
			alumno.alumno[i].edoCivil = document.getElementById("edoCivilC").value;
		}//else-JSON
	}
	alert("Actualización Realizada");
}//updateData

function buscar()
{
	document.getElementById("altas").style.display = "none";
	document.getElementById("bajas").style.display = "none";
	document.getElementById("buscar").style.display = "block";
	document.getElementById("cambios").style.display = "none";
	document.getElementById("reporte").style.display = "none";
}

function busqueda()
{
	campo = document.getElementById("CampoBusqueda").value;
	valor = document.getElementById("TextoBusqueda").value;
	cont = 0;
	
	if (boolDataMode == boolDataMode_XML){
		a = xmlDoc.getElementsByName("alumno");
		x = xmlDoc.getElementsByName(campo);
		l = a.length;
	}//if-XML
	else if (boolDataMode == boolDataMode_JSON)
	{
		l = alumnos.alumno.length;
	}
	tblResultados = document.getElementById("resultadoBusqueda");
	
	tabla.innerHTML = "";
	tabla.innerHTML = "<thead><tr>"
						+ "<th>Clave</th>"
						+ "<th>Nombre</th>"
						+ "<th>Sexo</th>"
						+ "<th>Estado Civil</th>"
						+ "</tr></thead>"
						+ "<tbody>";
						
	for(i = 0; i < l; i++)
	{
		if (boolDataMode == boolDataMode_XML)
		{
			if (x[i].childNodes[0].nodeValue == valor)
			{
			tabla.innerHTML += "<tr>"
								+ "<td>"
								+		x[i].childNodes[0].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[1].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[2].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[3].childNodes[0].nodeValue
								+ "</td>"
							+ "</tr>";
				cont++;
			}//if
		}//if-XML
		else if (boolDataMode == boolDataMode_JSON)
		{
			if (alumnos.alumno[i][campo] == valor)
			{
				tblResultados.innerHTML += "<tr>"
								+ "<td>"
								+		alumnos.alumno[i].clave
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].nombre
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].sexo
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].edoCivil
								+ "</td>"
							+ "</tr>";
				cont++;
			}//if
		}//else-JSON
	}
	tabla.innerHTML += "</tbody>";
	if (cont == 0)
		document.getElementById("message").innerHTML = "No hay coincidencias";
	else
		document.getElementById("message").innerHTML = "Se encontraron"+cont+" coincidencias";
	}

function reporte()
{
	document.getElementById("altas").style.display = "none";
	document.getElementById("bajas").style.display = "none";
	document.getElementById("buscar").style.display = "none";
	document.getElementById("cambios").style.display = "none";
	document.getElementById("reporte").style.display = "block";
	
	var tabla = document.getElementById("tablaReporte");
	
	tabla.innerHTML = "";
	tabla.innerHTML = "<thead><tr>"
						+ "<th>Clave</th>"
						+ "<th>Nombre</th>"
						+ "<th>Sexo</th>"
						+ "<th>Estado Civil</th>"
						+ "</tr></thead>"
						+ "<tbody>";

	if (boolDataMode == boolDataMode_XML)
	{
		x = xmlDoc.getElementsByTagName("alumno");
		l = x.length;
		
		for(i = 0; i < l; i++)
		{
			tabla.innerHTML += "<tr>"
								+ "<td>"
								+		x[i].childNodes[0].childNodes[0].nodeValue
								+ "</td>"
									+ "<td>"
								+		x[i].childNodes[1].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[2].childNodes[0].nodeValue
								+ "</td>"
								+ "<td>"
								+		x[i].childNodes[3].childNodes[0].nodeValue
								+ "</td>"
							+ "</tr>";
		}
	tabla.innerHTML += "</tbody>";
	}
	else if (boolDataMode == boolDataMode_JSON)
	{
		for(i = 0; i < alumnos.alumno.length; i++)
		{
			tabla.innerHTML += "<tr>"
								+ "<td>"
								+		alumnos.alumno[i].clave
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].nombre
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].sexo
								+ "</td>"
								+ "<td>"
								+		alumnos.alumno[i].edoCivil
								+ "</td>"
							+ "</tr>";
		}
	}//JSON
}

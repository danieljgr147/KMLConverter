
        document.getElementById("kmlFileInput").addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                
                const reader = new FileReader();
                reader.onload = function (e) {
                    const kmlText = e.target.result;
                    console.log("KML Text:", kmlText);
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(kmlText, "text/xml");
                    const placemarks = xmlDoc.querySelectorAll("Placemark");
                    
                    console.log("Placemarks:", placemarks);

                    const table = document.createElement("table");
                    console.log("sirve");
                    table.id="hola";
                    table.innerHTML = "<tr><th>Name</th><th>Plot_name</th><th>Coordinates</th><th>Lat</th><th>Long</th></tr>";
                    let cont=0;
                    placemarks.forEach(function (placemark) {
                        cont=cont+1;
                        let nameElement=""; 
                        if (xmlDoc.documentElement.nodeName == "kml") {
                            for (const item of xmlDoc.getElementsByTagName('Schema')) {
                                nameElement = item.getAttribute("name")
                                console.log(item.getAttribute("name"))
                            }

                        }
                        
                        const coordinatesElement = placemark.querySelector("coordinates");
                    
                        if (nameElement && coordinatesElement) {
                           
                            const coordinates = coordinatesElement.textContent;
                            let coordinates_Div= coordinates.split(" ")
                           
                            let Plot_name = ("Lote: " + nameElement+" - "+cont);
                            for (let i = 0; i < coordinates_Div.length; i++) {
                                console.log(coordinates_Div[i]); 
                                const row = table.insertRow();
                             let location = coordinates_Div[i].split(",")
                            row.insertCell(0).textContent = nameElement;
                            row.insertCell(1).textContent = Plot_name;
                            row.insertCell(2).textContent = (location[1]+", "+location[0]); 
                            row.insertCell(3).textContent = location[1]; 
                            row.insertCell(4).textContent = location[0]; 
                            }
                            
                            
                        } else {
                            console.log("Marcador sin 'name' o 'coordinates' en el archivo KML.");
                        }
                    });
                    

                    
                    document.getElementById("tableContainer").innerHTML = "";
                    document.getElementById("tableContainer").appendChild(table);
                };

                reader.readAsText(file);
            }
        });

        function descargar(){
            $("[id*=hola]").table2excel({
                // exclude CSS class 
                exclude: ".noExl",
                Description: "Worksheet Description",
                fileDescription: "Reporte", //do not include extension 
                exclude_inputs: true
            });
        }
   
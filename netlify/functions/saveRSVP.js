const fetch = require("node-fetch");

exports.handler = async (event) => {
  console.log("Received event:", event);  // Muestra el evento recibido

  if (event.httpMethod === "POST") {
    try {
      const data = JSON.parse(event.body);
      console.log("Parsed data:", data);  // Muestra los datos enviados en el cuerpo de la solicitud

      // URL del Google Apps Script que recibe los datos
      const googleScriptURL = "https://script.google.com/macros/s/AKfycbxdIuGvylyI7XHDmI9_5IHBLudoqnx1kDgG2VqfRpKrm8J_Bn-PxAxohMol1KIWSSCn/exec";

      // Enviar los datos al Google Apps Script
      console.log("Sending data to Google Apps Script URL:", googleScriptURL);
      const response = await fetch(googleScriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.text();
      console.log("Google Apps Script response:", responseData);  // Muestra la respuesta del script

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Datos guardados correctamente", response: responseData }),
        headers: {
          "Access-Control-Allow-Origin": "*",  // Permite acceso desde cualquier origen
          "Access-Control-Allow-Methods": "POST, OPTIONS", // Métodos permitidos
          "Access-Control-Allow-Headers": "Content-Type", // Encabezados permitidos
        },
      };
    } catch (error) {
      console.error("Error occurred:", error);  // Muestra el error en la consola

      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error al guardar los datos", error: error.message }),
        headers: {
          "Access-Control-Allow-Origin": "*",  // Permite acceso desde cualquier origen
        },
      };
    }
  } else {
    console.log("Method not allowed:", event.httpMethod);  // Muestra el método HTTP si no es POST

    return {
      statusCode: 405, // Método no permitido
      body: JSON.stringify({ message: "Método no permitido" }),
      headers: {
        "Access-Control-Allow-Origin": "*",  // Permite acceso desde cualquier origen
      },
    };
  }
};

const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod === "POST") {
    try {
      const data = JSON.parse(event.body);

      // URL del Google Apps Script que recibe los datos
      const googleScriptURL = "https://script.google.com/macros/s/AKfycbwvmimuQiEzoC9UyXiEFwJ3l02_CasZ5b_dm_pNthjjE8JIxqr7DP_Kkp1CjYrEnkr0/exec";

      // Enviar los datos al Google Apps Script
      const response = await fetch(googleScriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.text();

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
      console.error("Error:", error);

      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error al guardar los datos", error: error.message }),
        headers: {
          "Access-Control-Allow-Origin": "*",  // Permite acceso desde cualquier origen
        },
      };
    }
  } else {
    return {
      statusCode: 405, // Método no permitido
      body: JSON.stringify({ message: "Método no permitido" }),
      headers: {
        "Access-Control-Allow-Origin": "*",  // Permite acceso desde cualquier origen
      },
    };
  }
};

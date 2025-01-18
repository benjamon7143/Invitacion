const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod === "POST") {
    try {
      const data = JSON.parse(event.body);

      // Configura la URL de tu script de Google Apps Script
      const googleScriptURL =
        "https://script.google.com/macros/s/AKfycbwvmimuQiEzoC9UyXiEFwJ3l02_CasZ5b_dm_pNthjjE8JIxqr7DP_Kkp1CjYrEnkr0/exec";

      // Envía los datos al script de Google Apps Script
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
      };
    } catch (error) {
      console.error("Error:", error);

      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error al guardar los datos", error: error.message }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Método no permitido" }),
    };
  }
};

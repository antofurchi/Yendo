const express = require("express");

const cors = require("cors");

const mercadopago = require("mercadopago");

const app = express();

app.use(cors());

app.use(express.json());

// ⚠️ PONÉ TU ACCESS TOKEN ACÁ

mercadopago.configure({

  access_token: "TU_ACCESS_TOKEN_ACA"

});

// Crear pago

app.post("/crear-pago", async (req, res) => {

  try {

    const preference = {

      items: [

        {

          title: "Pedido Yendo",

          unit_price: 100,

          quantity: 1

        }

      ]

    };

    const respuesta = await mercadopago.preferences.create(preference);

    res.json({

      id: respuesta.body.id

    });

  } catch (error) {

    console.log(error);

    res.status(500).send("Error");

  }

});

app.listen(3000, () => {

  console.log("Servidor funcionando en puerto 3000");

})
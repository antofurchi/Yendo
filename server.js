const express = require("express");

const cors = require("cors");

const mercadopago = require("mercadopago");

const app = express();

app.use(cors());

app.use(express.json());

mercadopago.configure({

  access_token: "APP_USR-5080712279828644-042316-1f317e34bbfd1ff20bed3952f0f7449a-3354994455"

});

app.get("/", (req, res) => {

  res.send("Servidor funcionando");

});

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

    const response = await mercadopago.preferences.create(preference);

    res.json({

      id: response.body.id

    });

  } catch (error) {

    console.log(error);

    res.status(500).send("Error al crear pago");

  }

});

app.listen(3000, () => {

  console.log("Servidor funcionando en puerto 3000");

})
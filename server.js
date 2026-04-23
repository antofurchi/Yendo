const express = require("express");

const cors = require("cors");

const mercadopago = require("mercadopago");

const app = express();

app.use(cors());

app.use(express.json());

mercadopago.configure({

  access_token: "TU_ACCESS_TOKEN"

});

app.post("/crear-preferencia", async (req, res) => {

  try {

    const items = req.body.items.map(item => ({

      title: item.nombre,

      quantity: 1,

      currency_id: "UYU",

      unit_price: item.precio

    }));

    const preference = {

      items

    };

    const response = await mercadopago.preferences.create(preference);

    res.json({

      init_point: response.body.init_point

    });

  } catch (error) {

    res.status(500).json({ error: "Error" });

  }

});

app.listen(3000, () => {

  console.log("Servidor funcionando");

});
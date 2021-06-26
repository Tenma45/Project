"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const axios = require("axios");

module.exports = {
  async findID(ctx) {
    const user = ctx.state.user;
    const { date_from, date_to } = ctx.request.body;
    if (user) {
      const res = await strapi.query("resultcad").find({
        userID: user.id,
        created_at_gte: new Date(date_from),
        created_at_lte: new Date(date_to),
      });
      ctx.send(res);
    }
  },
  async predict(ctx) {
    const { fbs, waist, age, bpsy, bpdi, tchol, hdl, dbfam } = ctx.request.body;
    const user = ctx.state.user;
    const result = await axios.post(
      "http://localhost:5000/predict/?target=hd",
      {
        fbs,
        waist,
        age,
        bpsy,
        bpdi,
        tchol,
        hdl,
        dbfam,
      }
    );
    const risk_cad = parseInt(result.data);
    if (user) {
      const id = user.id;
      const res = await strapi.query("resultcad").create({
        userID: id,
        age,
        bpsy,
        bpdi,
        fbs,
        tchol,
        hdl,
        risk_cad,
        waist,
        dbfam,
      });
    }
    ctx.send(risk_cad);
  },
};

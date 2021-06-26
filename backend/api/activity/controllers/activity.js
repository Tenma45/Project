"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async activityMonth(ctx) {
    const { date_from, date_to } = ctx.request.body;
    const activityName = ["quiz", "register", "predictcad", "predictdb"];
    const quiz = [];
    const register = [];
    const predictcad = [];
    const predictdb = [];
    const response = {
      quiz,
      register,
      predictdb,
      predictcad,
    };
    try {
      for (var i = 0; i < activityName.length; i++) {
        const activity = await strapi.query("activity").find({
          activity: activityName[i],
          created_at_gte: new Date(date_from),
          created_at_lte: new Date(date_to),
        });
        const activityDay = activity.reduce((a, c) => {
          let d = `${new Date(c.created_at).getFullYear()}-${(
            new Date(c.created_at).getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${new Date(c.created_at)
            .getDate()
            .toString()
            .padStart(2, "0")}`;
          a[d] = a[d] ? a[d] + 1 : 1;
          return a;
        }, {});
        if (activityName[i] === "quiz") {
          for (const [key, value] of Object.entries(activityDay)) {
            quiz.push({ x: key, y: value });
          }
        }
        if (activityName[i] === "register") {
          for (const [key, value] of Object.entries(activityDay)) {
            register.push({ x: key, y: value });
          }
        }
        if (activityName[i] === "predictdb") {
          for (const [key, value] of Object.entries(activityDay)) {
            predictdb.push({ x: key, y: value });
          }
        }
        if (activityName[i] === "predictcad") {
          for (const [key, value] of Object.entries(activityDay)) {
            predictcad.push({ x: key, y: value });
          }
        }
      }
      ctx.send(response);
    } catch (error) {
      const errorMessage = "Error when call activityMonth";
      strapi.log.error(errorMessage + " : " + error);
      ctx.badRequest(errorMessage);
    }
  },
};

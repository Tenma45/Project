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
    const toDate = new Date(date_to);
    const fromDate = new Date(date_from);
    toDate.setDate(toDate.getDate() + 1);
    try {
      var iterDate = new Date(date_from);
      var a = {};
      for (var i = 1; iterDate.getTime() !== toDate.getTime(); i++) {
        let d = `${iterDate.getFullYear()}-${(iterDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${iterDate.getDate().toString().padStart(2, "0")}`;
        a[d] = 0;
        iterDate.setMonth(new Date(date_from).getMonth());
        iterDate.setDate(new Date(date_from).getDate() + i);
      }

      for (var i = 0; i < activityName.length; i++) {
        const activity = await strapi.query("activity").find({
          activity: activityName[i],
          created_at_gte: fromDate,
          created_at_lte: toDate,
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
        const temp = [];
        for (const [key, value] of Object.entries(a)) {
          temp.push({ x: key, y: value });
        }
        for (const [key, value] of Object.entries(activityDay)) {
          temp.push({ x: key, y: value });
        }
        var holder = {};
        temp.forEach(function (d) {
          if (holder.hasOwnProperty(d.x)) {
            holder[d.x] = holder[d.x] + d.y;
          } else {
            holder[d.x] = d.y;
          }
        });
        if (activityName[i] === "quiz") {
          for (const [key, value] of Object.entries(holder)) {
            quiz.push({ x: key, y: value });
          }
        }
        if (activityName[i] === "register") {
          for (const [key, value] of Object.entries(holder)) {
            register.push({ x: key, y: value });
          }
        }
        if (activityName[i] === "predictdb") {
          for (const [key, value] of Object.entries(holder)) {
            predictdb.push({ x: key, y: value });
          }
        }
        if (activityName[i] === "predictcad") {
          for (const [key, value] of Object.entries(holder)) {
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

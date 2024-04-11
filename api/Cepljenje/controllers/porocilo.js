// api/cepljenje/controllers/porocilo.js

module.exports = {
    async generirajPorocilo(ctx) {
      try {
        // Pridobitev podatkov o cepljenjih, morda s filtriranjem po datumih ali živalih
        const cepljenja = await strapi.services.cepljenje.find(ctx.query);
  
        // Logika za obdelavo in pripravo podatkov za poročilo
        // To bi lahko vključevalo agregacijo podatkov, sortiranje, itd.
  
        // Vrnitev podatkov za poročilo
        return ctx.send(cepljenja);
      } catch (err) {
        ctx.send(err);
      }
    },
  };
// config/functions/cron.js

module.exports = {
    '0 8 * * *': async () => {
      // Kliče service vsak dan ob 8:00

    // Pridobivanje cepljenj, ki jim bo potekla veljavnost v naslednjih 30 dneh
    const danes = new Date();
    const potek = new Date(danes);
    potek.setDate(danes.getDate() + 30); // nastavitev na 30 dni v prihodnost

    const cepljenja = await strapi.services['opomnik-cepljenje'].find({
      datumPoteka_lt: potek,
      poslano: false,
    });

    cepljenja.forEach(async (cepljenje) => {
      try {
        // Pošiljanje e-maila
        await strapi.plugins['email'].services.email.send({
          to: 'info@kvark.si', // Zamenjajte s pravim e-mailom prejemnika
          from: 'mail@kvark.si', // Vaš e-mail za pošiljanje
          subject: 'Opomnik o poteku cepljenja',
          text: `Cepljenje bo poteklo ${cepljenje.datumPoteka}`,
        });

        // Posodobitev cepljenja, da označite opomnik kot poslan
        await strapi.services['opomnik-cepljenje'].update({ id: cepljenje.id }, { poslano: true });
      } catch (error) {
        console.log('Napaka pri pošiljanju e-maila:', error);
      }
    });
  },
};
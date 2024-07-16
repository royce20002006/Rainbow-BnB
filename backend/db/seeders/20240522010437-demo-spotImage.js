'use strict';
const { SpotImage } = require('../models');

let options = {};
options.tableName = 'SpotImages'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Define your schema in options objects
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await SpotImage.bulkCreate([
        {
          url: 'https://i.pinimg.com/originals/22/68/f3/2268f3afb704a4d19c287a6595b74eb8.jpg',
          spotId: 2,
          preview: true

        },
        {
          url: 'https://i.pinimg.com/originals/22/68/f3/2268f3afb704a4d19c287a6595b74eb8.jpg',
          spotId: 2,
          preview: false

        },
        {
          url: 'https://i.pinimg.com/originals/22/68/f3/2268f3afb704a4d19c287a6595b74eb8.jpg',
          spotId: 2,
          preview: false

        },
        {
          url: 'https://i.pinimg.com/originals/22/68/f3/2268f3afb704a4d19c287a6595b74eb8.jpg',
          spotId: 2,
          preview: false

        },
        {
          url: 'https://a.cdn-hotels.com/gdcs/production12/d1130/83f1c8c6-e12d-4e69-8433-c5bbc90b5ad6.jpg',
          spotId: 1,
          preview: true

        },
        {
          url: 'https://www.top5.com/wp-content/uploads/2018/11/most-impressive-castles-bodiam-castle.jpg',
          spotId: 1,
          preview: false

        },
        {
          url: 'https://flowerpowerdaily.com/wp-content/uploads/2020/06/Monks-Garden-Adam-Hillier.jpg',
          spotId: 1,
          preview: false

        },
        {
          url: 'https://s-media-cache-ak0.pinimg.com/736x/7d/87/fd/7d87fdc25f8ab6a05310aaca730bf7a2.jpg',
          spotId: 1,
          preview: false

        },
        {
          url: 'https://wallpaperaccess.com/full/3329117.jpg',
          spotId: 1,
          preview: false

        },
        {
          url: 'https://www.mycolorfulwanderings.com/wp-content/uploads/2020/11/Carriage-House-Utah-Winter-Cabin-Getaway-1150x889.jpg',
          spotId: 3,
          preview: true

        },
        {
          url: 'https://w0.peakpx.com/wallpaper/149/770/HD-wallpaper-forest-dark-fog-trees.jpg',
          spotId: 3,
          preview: false

        },
        {
          url: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?cs=srgb&dl=pexels-pixabay-417173.jpg&fm=jpg',
          spotId: 3,
          preview: false

        },
        {
          url: 'https://media.architecturaldigest.com/photos/5772f9f6fb40ea6a6467bbc7/16:9/w_2580,c_limit/aerial-photographs-mountains-03.jpg',
          spotId: 3,
          preview: false

        },
        {
          url: 'https://static.vecteezy.com/system/resources/thumbnails/023/308/330/small_2x/ai-generative-exterior-of-modern-luxury-house-with-garden-and-beautiful-sky-photo.jpg',
          spotId: 3,
          preview: false

        },
        {
          url: 'https://media.boutiquehotel.me/hotel/cover/573438_1516797769.jpg',
          spotId: 4,
          preview: true

        },
        {
          url: 'https://www.marthastewart.com/thmb/7HuZ1rtLCEkvz901XPmCUDSgLcM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/fence-lighting-b12e3f93c02f44498bab48863bf48086.jpg',
          spotId: 4,
          preview: false

        },
        {
          url: 'https://cdn.mos.cms.futurecdn.net/k9qjW7LvfxtGYwENHtzctZ-1200-80.jpg',
          spotId: 4,
          preview: false

        },
        {
          url: 'https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1652341068/EducationHub/photos/ocean-waves.jpg',
          spotId: 4,
          preview: false

        },
        {
          url: 'https://thumbs.dreamstime.com/b/sea-water-ocean-wave-surfing-surface-colorful-vibrant-sunset-barrel-shape-124362369.jpg',
          spotId: 4,
          preview: false

        },
        {
          url: 'https://explorenordegg.ca/wp-content/uploads/2023/05/Stix-3.jpeg',
          spotId: 5,
          preview: true

        },
        {
          url: 'https://www.khov.com/blog/wp-content/uploads/2021/09/75475_Four-Seasons-at-Sun-City-West_Saguaro_Kitchen-with-Peninsula-1600x1024.jpg',
          spotId: 5,
          preview: false

        },
        {
          url: 'https://www.ikea.com/images/a-gray-green-taellasen-upholstered-bed-frame-with-privacy-sc-88f435346a1c1f0df3b1a984a24d2334.jpg',
          spotId: 5,
          preview: false

        },
        {
          url: 'https://media.architecturaldigest.com/photos/64f71af50a84399fbdce2f6a/16:9/w_2560%2Cc_limit/Living%2520with%2520Lolo%2520Photo%2520Credit_%2520Life%2520Created%25204.jpg',
          spotId: 5,
          preview: false

        },
        {
          url: 'https://www.mydomaine.com/thmb/-hkQdsZbxjifa7NLrSOFbPfYbJY=/1632x0/filters:no_upscale():strip_icc()/heritage-lake-model-2524d1f5bc974300a65f3187a6ebd929.png',
          spotId: 5,
          preview: false

        },
        {
          url: 'https://farm2.staticflickr.com/1568/26605717921_3feb7c642c_h.jpg',
          spotId: 2,
          preview: false

        },
      ], { validate: true })
    } catch (error) {

    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(
      options,
      {
        id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7] },
      },

    );
  }
};

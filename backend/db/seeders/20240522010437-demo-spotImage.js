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
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746771132/cottage-home-brick-gate-shrubbery-7e117ecd-f5e2829db0d5485a8f092c274e310fa0_owlusl.jpg',
          cloudinaryPublicId: 'cottage-home-brick-gate-shrubbery-7e117ecd-f5e2829db0d5485a8f092c274e310fa0_owlusl',
          spotId: 2,
          preview: true

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746771382/img-01-kitchen-scaled.jpg.optimal_vhwuzs.jpg',
          cloudinaryPublicId: 'img-01-kitchen-scaled.jpg.optimal_vhwuzs',
          spotId: 2,
          preview: false

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746771485/white-living-room-windows_zbkdhz.jpg',
          cloudinaryPublicId: 'white-living-room-windows_zbkdhz',
          spotId: 2,
          preview: false

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746771602/second-livinb-room_kze8wx.jpg',
          cloudinaryPublicId: 'second-livinb-room_kze8wx',
          spotId: 2,
          preview: false

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746771707/Cropped_Cottage_bedrooms_1_new_nhihp3.jpg',
          cloudinaryPublicId: 'Cropped_Cottage_bedrooms_1_new_nhihp3',
          spotId: 2,
          preview: false

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746856488/istockphoto-1159222457-612x612_sr9vae.jpg',
          cloudinaryPublicId: 'istockphoto-1159222457-612x612_sr9vae',
          spotId: 1,
          preview: true

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746856652/castle-side_meso1p.jpg',
          cloudinaryPublicId: 'castle-side_meso1p',
          spotId: 1,
          preview: false

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746856804/castle-interior_aolp34.jpg',
          cloudinaryPublicId: 'castle-interior_aolp34',
          spotId: 1,
          preview: false

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746856906/castle-living-room_yu05dl.jpg',
          cloudinaryPublicId: 'castle-living-room_yu05dl',
          spotId: 1,
          preview: false

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746856992/castle-bedroom_j0xabq.jpg',
          cloudinaryPublicId: 'castle-bedroom_j0xabq',
          spotId: 1,
          preview: false

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746857089/cabin_q7xznl.jpg',
          cloudinaryPublicId: 'cabin_q7xznl',
          spotId: 3,
          preview: true

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746857167/cabin-interior_le0gxp.jpg',
          cloudinaryPublicId: 'cabin-interior_le0gxp',
          spotId: 3,
          preview: false

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746857276/cabin-bed_uzwhnq.jpg',
          cloudinaryPublicId: 'cabin-bed_uzwhnq',
          spotId: 3,
          preview: false

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746857356/cabin-kitchen_iyuokt.jpg',
          cloudinaryPublicId: 'cabin-kitchen_iyuokt',
          spotId: 3,
          preview: false

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746857446/cabin-stairs_e5womh.jpg',
          cloudinaryPublicId: 'cabin-stairs_e5womh',
          spotId: 3,
          preview: false

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746857578/resort_xk59hb.jpg',
          cloudinaryPublicId: 'resort_xk59hb',
          spotId: 4,
          preview: true

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746857705/resort-bath_buopwq.jpg',
          cloudinaryPublicId: 'resort-bath_buopwq',
          spotId: 4,
          preview: false

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746857789/resort-work_kgjxqt.jpg',
          cloudinaryPublicId: 'resort-work_kgjxqt',
          spotId: 4,
          preview: false

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746857887/resort-lobby_pucimp.jpg',
          cloudinaryPublicId: 'resort-lobby_pucimp',
          spotId: 4,
          preview: false

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746857969/resort-resturaunt_szkxrl.jpg',
          cloudinaryPublicId: 'resort-resturaunt_szkxrl',
          spotId: 4,
          preview: false

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746858072/country_ad6psa.jpg',
          cloudinaryPublicId: 'country_ad6psa',
          spotId: 5,
          preview: true

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746858161/country-interior_qfo3fq.jpg',
          cloudinaryPublicId: 'country-interior_qfo3fq',
          spotId: 5,
          preview: false

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746858276/country-kitchen_k5iarm.jpg',
          cloudinaryPublicId: 'country-kitchen_k5iarm',
          spotId: 5,
          preview: false

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746858363/country-cottage-decorating-ideas_ofhuzs.jpg',
          cloudinaryPublicId: 'country-cottage-decorating-ideas_ofhuzs',
          spotId: 5,
          preview: false

        },
        {
          url: 'https://res.cloudinary.com/dak84cj58/image/upload/v1746858465/bed_fimbt8.jpg',
          cloudinaryPublicId: 'bed_fimbt8',
          spotId: 5,
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

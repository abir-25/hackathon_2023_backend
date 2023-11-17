"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("districts", [
      {
        districtName: "Dhaka",
        stateId: 1,
      },
      {
        districtName: "Faridpur",
        stateId: 1,
      },
      {
        districtName: "Gazipur",
        stateId: 1,
      },
      {
        districtName: "Gopalganj",
        stateId: 1,
      },
      {
        districtName: "Kishoreganj",
        stateId: 1,
      },
      {
        districtName: "Madaripur",
        stateId: 1,
      },
      {
        districtName: "Bandarban",
        stateId: 2,
      },
      {
        districtName: "Brahmanbaria",
        stateId: 2,
      },
      {
        districtName: "Chandpur",
        stateId: 2,
      },
      {
        districtName: "Chittagong",
        stateId: 2,
      },
      {
        districtName: "Comilla",
        stateId: 2,
      },
      {
        districtName: "Cox's Bazar",
        stateId: 2,
      },
      {
        districtName: "Bagerhat",
        stateId: 3,
      },
      {
        districtName: "Chuadanga",
        stateId: 3,
      },
      {
        districtName: "Jessore",
        stateId: 3,
      },
      {
        districtName: "Khulna",
        stateId: 3,
      },
      {
        districtName: "Kushtia",
        stateId: 3,
      },
      {
        districtName: "Magura",
        stateId: 3,
      },
      {
        districtName: "Habiganj",
        stateId: 4,
      },
      {
        districtName: "Moulvibazar",
        stateId: 4,
      },
      {
        districtName: "Sunamganj",
        stateId: 4,
      },
      {
        districtName: "Sylhet",
        stateId: 4,
      },
      {
        districtName: "Bogra",
        stateId: 5,
      },
      {
        districtName: "Jaipurhat",
        stateId: 5,
      },
      {
        districtName: "Naogaon",
        stateId: 5,
      },
      {
        districtName: "Natore",
        stateId: 5,
      },
      {
        districtName: "Chapai Nawabganj",
        stateId: 5,
      },
      {
        districtName: "Jamalpur",
        stateId: 6,
      },
      {
        districtName: "Mymensingh",
        stateId: 6,
      },
      {
        districtName: "Netrokona",
        stateId: 6,
      },
      {
        districtName: "Khulna",
        stateId: 6,
      },
      {
        districtName: "Kushtia",
        stateId: 6,
      },
      {
        districtName: "magura",
        stateId: 6,
      },
      {
        districtName: "Bhola",
        stateId: 7,
      },
      {
        districtName: "Jhalokathi",
        stateId: 7,
      },
      {
        districtName: "Patuakhali",
        stateId: 7,
      },
      {
        districtName: "Pirojpur",
        stateId: 7,
      },
      {
        districtName: "Dinajpur",
        stateId: 8,
      },
      {
        districtName: "Gaibandha",
        stateId: 8,
      },
      {
        districtName: "Kurigram",
        stateId: 8,
      },
      {
        districtName: "Lalmonirhat",
        stateId: 8,
      },
      {
        districtName: "Rangpur",
        stateId: 8,
      },
      {
        districtName: "Bombuflat",
        stateId: 9,
      },
      {
        districtName: "Port Blair",
        stateId: 9,
      },
      {
        districtName: "Rangat",
        stateId: 9,
      },
      {
        districtName: "Addanki",
        stateId: 10,
      },
      {
        districtName: "Adoni",
        stateId: 10,
      },
      {
        districtName: "Alampur",
        stateId: 10,
      },
      {
        districtName: "Along",
        stateId: 11,
      },
      {
        districtName: "Bondila",
        stateId: 11,
      },
      {
        districtName: "Khonsa",
        stateId: 11,
      },
      {
        districtName: "Barbari",
        stateId: 12,
      },
      {
        districtName: "Abhayapuri",
        stateId: 12,
      },
      {
        districtName: "Basugaon",
        stateId: 12,
      },
      {
        districtName: "Amarpur",
        stateId: 13,
      },
      {
        districtName: "Areja",
        stateId: 13,
      },
      {
        districtName: "Asarganj",
        stateId: 13,
      },
      {
        districtName: "Chandigarh",
        stateId: 14,
      },
      {
        districtName: "Ahiwara",
        stateId: 15,
      },
      {
        districtName: "Arang",
        stateId: 15,
      },
      {
        districtName: "Baloda",
        stateId: 15,
      },
      {
        districtName: "Amli",
        stateId: 16,
      },
      {
        districtName: "Silvassa",
        stateId: 16,
      },
      {
        districtName: "Daman",
        stateId: 17,
      },
      {
        districtName: "Diu",
        stateId: 17,
      },
      {
        districtName: "Delhi",
        stateId: 18,
      },
      {
        districtName: "New Delhi",
        stateId: 18,
      },
      {
        districtName: "Aldona",
        stateId: 19,
      },
      {
        districtName: "Calapor",
        stateId: 19,
      },
      {
        districtName: "Chimbel",
        stateId: 19,
      },
      {
        districtName: "Abrama",
        stateId: 20,
      },
      {
        districtName: "Alang",
        stateId: 20,
      },
      {
        districtName: "Ahmedabad",
        stateId: 20,
      },
      {
        districtName: "Beri",
        stateId: 21,
      },
      {
        districtName: "Barwala",
        stateId: 21,
      },
      {
        districtName: "Chita",
        stateId: 21,
      },
      {
        districtName: "Baddi",
        stateId: 22,
      },
      {
        districtName: "Banjar",
        stateId: 22,
      },
      {
        districtName: "Dharamshala",
        stateId: 22,
      },
      {
        districtName: "Bandipur",
        stateId: 23,
      },
      {
        districtName: "Achabal",
        stateId: 23,
      },
      {
        districtName: "Banihal",
        stateId: 23,
      },
      {
        districtName: "Adityapur",
        stateId: 24,
      },
      {
        districtName: "Amlabad",
        stateId: 24,
      },
      {
        districtName: "Ara",
        stateId: 24,
      },
      {
        districtName: "Alabaster",
        stateId: 25,
      },
      {
        districtName: "Arab",
        stateId: 25,
      },
      {
        districtName: "Atmore",
        stateId: 25,
      },
      {
        districtName: "Anchorage",
        stateId: 26,
      },
      {
        districtName: "Barrow",
        stateId: 26,
      },
      {
        districtName: "Bethel",
        stateId: 26,
      },
      {
        districtName: "Apache Junction",
        stateId: 27,
      },
      {
        districtName: "Bisbee",
        stateId: 27,
      },
      {
        districtName: "Bouse",
        stateId: 27,
      },
      {
        districtName: "Alexander",
        stateId: 28,
      },
      {
        districtName: "Benton",
        stateId: 28,
      },
      {
        districtName: "Cabot",
        stateId: 28,
      },
      {
        districtName: "Acton",
        stateId: 29,
      },
      {
        districtName: "Aguanga",
        stateId: 29,
      },
      {
        districtName: "Alamo",
        stateId: 29,
      },
      {
        districtName: "Air Force Academy",
        stateId: 30,
      },
      {
        districtName: "Alamosa",
        stateId: 30,
      },
      {
        districtName: "Aspen",
        stateId: 30,
      },
      {
        districtName: "Ansonia",
        stateId: 31,
      },
      {
        districtName: "Avon",
        stateId: 31,
      },
      {
        districtName: "Canton",
        stateId: 31,
      },
      {
        districtName: "Bear",
        stateId: 32,
      },
      {
        districtName: "Brookside",
        stateId: 32,
      },
      {
        districtName: "Dover",
        stateId: 32,
      },
      {
        districtName: "Edgemoor",
        stateId: 32,
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

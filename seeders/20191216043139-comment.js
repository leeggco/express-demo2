'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        articleId: 1,
        content: "这是文章1的评论",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        articleId: 1,
        content: "这个还是文章1的评论啊",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        articleId: 2,
        content: "这是文章2的评论",
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Comments', null, {});
  }
};

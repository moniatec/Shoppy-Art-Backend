"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Products",
      [
        {
          productName: "Acropolis",
          price: 1000,
          description: "abstract art, modern art, impressionist, acrylic paint",
          photoUrl:
            "https://get.pxhere.com/photo/abstract-color-artistic-colorful-decor-painting-art-modern-art-impressionist-acrylic-paint-640027.jpg",
          orderId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productName: "Winter Nights",
          price: 1500,
          description:
            " colorful, contemporary art, creativity, expressionism, gouache,  vibrant color, watercolor",
          photoUrl:
            "http://hdwpro.com/wp-content/uploads/2016/10/HD-Artistic-Image.jpg",
          orderId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productName: "Mestiry",
          price: 2000,
          description:
            "abstract painting, acrylic paint, colorful, contemporary art, dirty, expressionism, gouache, messy, rough",
          photoUrl:
            "https://get.pxhere.com/photo/abstract-abstract-painting-acrylic-acrylic-paint-art-artistic-background-brush-canvas-colorful-contemporary-art-creative-creativity-design-dirty-expressionism-gouache-hd-wallpaper-ink-messy-modern-art-paint-painting-pattern-rough-texture-vibrant-color-wallpaper-watercolor-1532895.jpg",
          orderId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productName: "Big Mess",
          price: 1500,
          description:
            "abstract painting, acrylic paint, art, brush, canvas, creativity, dirty, expressionism, messy, modern art, painting, pattern",
          photoUrl:
            "https://www.artranked.com/images/7e/7efe4881821b078f5ad6187c5ebff720.jpg",
          orderId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productName: "Birds",
          price: 1500,
          description: "painting, folk art, colorful, creativity,",
          photoUrl:
            "http://www.rikoart.com/wp-content/uploads/2016/06/cockerel.jpg",
          orderId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productName: "Station",
          price: 2000,
          description:
            "painting, folk art, abstract, art station, colorful, creativity,",
          photoUrl:
            "https://cdna.artstation.com/p/assets/images/images/006/782/528/large/ross-tran-busstop-web.jpg?1501196755",
          orderId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productName: "Face",
          price: 1700,
          description:
            " art, sketch, drawing, illustration, mural, cyprus, modern art, acrylic paint, psychedelic art",
          photoUrl:
            "https://c.pxhere.com/photos/5a/f0/street_art_london_shoreditch_eastend_street_brick_lane_art_facade-1189691.jpg!d",
          orderId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productName: "Flowers",
          price: 1000,
          description:
            "decoration, carnival, autumn, colorful, toy, flora, painting, flowers, art, floristry, new orleans, psychedelic art",
          photoUrl:
            "https://get.pxhere.com/photo/flower-glass-decoration-carnival-autumn-colorful-toy-flora-painting-flowers-art-floristry-new-orleans-psychedelic-art-668590.jpg",
          orderId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Products", null, {});
  },
};

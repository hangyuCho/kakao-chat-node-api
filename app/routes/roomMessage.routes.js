module.exports = app => {
  const roomMessage = require("../controllers/roomMessage.controller.js");

  // Create a new RoomMessage
  app.post("/roomMessage", roomMessage.create);

  // Retrieve all roomMessage
  app.get("/roomMessage", roomMessage.findAll);

  // Retrieve a single RoomMessage with messageId
  app.get("/roomMessage/:messageId", roomMessage.findOne);

  // Update a RoomMessage with messageId
  app.put("/roomMessage/:messageId", roomMessage.update);

  // Delete a RoomMessage with messageId
  app.delete("/roomMessage/:customerId", roomMessage.delete);

  // Create a new RoomMessage
  app.delete("/roomMessage", roomMessage.deleteAll);
};

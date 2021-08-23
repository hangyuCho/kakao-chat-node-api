const RoomMessage = require("../models/roomMessage.model.js");

// Create and Save a new RoomMessage
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a RoomMessage
  const message = new RoomMessage({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // Save RoomMessage in the database
  RoomMessage.create(message, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the RoomMessage."
      });
    else res.send(data);
  });
};

// Retrieve all RoomMessages from the database.
exports.findAll = (req, res) => {
  RoomMessage.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages."
      });
    else res.send(data);
  });
};

// Find a single RoomMessage with a messageId
exports.findOne = (req, res) => {
  RoomMessage.findById(req.params.messageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found RoomMessage with id ${req.params.messageId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving RoomMessage with id " + req.params.messageId
        });
      }
    } else res.send(data);
  });
};

// Update a RoomMessage identified by the messageId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  RoomMessage.updateById(
    req.params.messageId,
    new RoomMessage(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found RoomMessage with id ${req.params.messageId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating RoomMessage with id " + req.params.messageId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a RoomMessage with the specified messageId in the request
exports.delete = (req, res) => {
  RoomMessage.remove(req.params.messageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found RoomMessage with id ${req.params.messageId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete RoomMessage with id " + req.params.messageId
        });
      }
    } else res.send({ message: `RoomMessage was deleted successfully!` });
  });
};

// Delete all RoomMessages from the database.
exports.deleteAll = (req, res) => {
  RoomMessage.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all messages."
      });
    else res.send({ message: `All RoomMessages were deleted successfully!` });
  });
};

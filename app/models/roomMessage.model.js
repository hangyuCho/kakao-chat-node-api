const sql = require("./db.js");

// constructor
const RoomMessage = function(roomMessage) {
  this.room = roomMessage.room;
  this.message = roomMessage.message;
  this.sender = roomMessage.sender;
  this.is_group_chat = roomMessage.isGroupChat;
  this.image_db = roomMessage.imageDb;
  this.package_name = roomMessage.packageName;
};

RoomMessage.create = (newRoomMessage, result) => {
  sql.query("INSERT INTO kakao_chat.room_message SET ?", newRoomMessage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created kakao_chat.room_message: ", { id: res.insertId, ...newRoomMessage });
    result(null, { id: res.insertId, ...newRoomMessage });
  });
};

RoomMessage.findById = (messageId, result) => {
  sql.query(`SELECT * FROM kakao_chat.room_message WHERE id = ${messageId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found kakao_chat.room_message: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found RoomMessage with the id
    result({ kind: "not_found" }, null);
  });
};

RoomMessage.getAll = result => {
  sql.query("SELECT * FROM kakao_chat.room_message", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("roomMessages: ", res);
    result(null, res);
  });
};

RoomMessage.updateById = (id, roomMessage, result) => {
  sql.query(
    "UPDATE kakao_chat.room_message SET message = ?, sender = ?, is_group_chat = ? WHERE message_id = ?",
    [roomMessage.email, roomMessage.name, roomMessage.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found RoomMessage with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated kakao_chat.room_message: ", { id: id, ...roomMessage });
      result(null, { id: id, ...roomMessage });
    }
  );
};

RoomMessage.remove = (id, result) => {
  sql.query("DELETE FROM kakao_chat.room_message WHERE message_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found RoomMessage with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted kakao_chat.room_message with id: ", id);
    result(null, res);
  });
};

RoomMessage.removeAll = result => {
  sql.query("DELETE FROM kakao_chat.room_message", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} roomMessages`);
    result(null, res);
  });
};

module.exports = RoomMessage;

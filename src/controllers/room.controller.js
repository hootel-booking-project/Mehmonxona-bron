import Room from "../models/room.model.js";

const getAllRooms = async (req, res) => {
  try {
    const { available, sortBy = "price", order = "asc", page = 1, limit = 10 } = req.query;

    let query = {};
    if (available) query.available = available === "true";

    const rooms = await Room.find(query)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).send({
      success: true,
      count: rooms.length,
      message: "Xonalar muvaffaqiyatli yuklandi",
      data: rooms
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Xonalarni yuklashda xatolik",
      error: error.message
    });
  }
};

const createRoom = async (req, res) => {
  try {
    const { number, type, price, available } = req.body;

    const existingRoom = await Room.findOne({ number });
    if (existingRoom) {
      return res.status(400).send({
        success: false,
        message: "Bunday xona allaqachon mavjud"
      });
    }

    const newRoom = new Room({ number, type, price, available });
    await newRoom.save();

    res.status(201).send({
      success: true,
      message: "Xona muvaffaqiyatli qoshildi",
      data: newRoom
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Xona qoshishda xatolik",
      error: error.message
    });
  }
};

const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).send({
        success: false,
        message: "Xona topilmadi"
      });
    }
    res.status(200).send({
      success: true,
      message: "Xona muvaffaqiyatli topildi",
      data: room
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Xonani yuklashda xatolik",
      error: error.message
    });
  }
};

const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedRoom) {
      return res.status(404).send({
        success: false,
        message: "Xona topilmadi"
      });
    }

    res.status(200).send({
      success: true,
      message: "Xona muvaffaqiyatli yangilandi",
      data: updatedRoom
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Xonani yangilashda xatolik",
      error: error.message
    });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      return res.status(404).send({
        success: false,
        message: "Xona topilmadi"
      });
    }
    res.status(200).send({
      success: true,
      message: "Xona muvaffaqiyatli ochirildi"
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Xonani ochirishda xatolik",
      error: error.message
    });
  }
};

export default{ getAllRooms, createRoom, getRoomById, updateRoom, deleteRoom}

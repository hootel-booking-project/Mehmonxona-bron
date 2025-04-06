import bookingModel from "../models/booking.model.js"
import customerModel from "../models/customer.model.js"

const bookingRoom = async (req, res) => {
    const { userId, roomId, dayIn, dayOut } = req.body

    const booking = await bookingModel.create({
        userId,
        roomId, 
        dayIn,
        dayOut
    })

    await customerModel.updateOne(
        {_id: userId},
        {
            $push: {
                booking: booking._id
            }
        }
    )

    res.status(201).send({
        message: "Succes",
        data: booking
    })
}

const getBookingById = async (req, res) => {
    const { id } = req.params;

    const booking = await bookingModel.findById(id).populate("customer");

    if (!booking) {
      return res.status(404).send({ message: "Booking not found" });
    }

    res.send({ message: "Success", data: booking });
  }

const getUserBookings = async (req, res) => {
    const { userId } = req.params;

    const bookings = await bookingModel.find({ userId }).populate("roomId");

    res.send({ message: "Success", data: bookings });
 
};


const updateBooking = async (req, res) => {
    const { id } = req.params;
    const { dayIn, dayOut } = req.body;

    const booking = await bookingModel.findByIdAndUpdate(
      id,
      { dayIn,dayOut },
      { new: true }
    );

    if (!booking) {
      return res.status(404).send({ message: "Booking not found" });
    }

    res.send({ message: "Booking updated successfully", data: booking });
 
};

const deleteBooking = async (req, res) => {
    const { id } = req.params;

    const booking = await bookingModel.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).send({ message: "Booking not found" });
    }

    res.send({ message: "Booking deleted successfully" });
};



export default { bookingRoom, getBookingById, getUserBookings, updateBooking, deleteBooking }
import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {

    const event = new Event(req.body);

    const savedEvent = await event.save();

    res.status(201).json(savedEvent);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUpcomingEvents = async (req, res) => {

  try {

    const today = new Date()

    const events = await Event.find({
      date: { $gte: today }
    }).sort({ date: 1 })

    res.json(events)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}

export const getPastEvents = async (req, res) => {

  try {

    const today = new Date()

    const events = await Event.find({
      date: { $lt: today }
    }).sort({ date: -1 })

    res.json(events)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}

export const getAllEvents = async (req, res) => {

  try {

    const events = await Event.find().sort({ date: -1 })

    res.json(events)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}

export const deleteEvent = async (req, res) => {
  try {

    const event = await Event.findByIdAndDelete(req.params.id)

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    res.json({ message: "Event deleted successfully" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getSingleEvent = async (req, res) => {

  try {

    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    res.json(event)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}

export const updateEvent = async (req,res) => {

  try{

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new:true }
    )

    if(!event){
      return res.status(404).json({ message:"Event not found" })
    }

    res.json(event)

  }catch(error){
    res.status(500).json({ message:error.message })
  }

}
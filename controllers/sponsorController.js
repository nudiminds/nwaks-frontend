import Sponsor from "../models/Sponsor.js"


export const createSponsor = async (req, res) => {
  try {

    const sponsor = new Sponsor(req.body)

    const savedSponsor = await sponsor.save()

    res.status(201).json(savedSponsor)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const getSponsors = async (req, res) => {

  try {

    const sponsors = await Sponsor.find().sort({ category: 1 })

    res.json(sponsors)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}


export const getSponsorById = async (req, res) => {

  try {

    const sponsor = await Sponsor.findById(req.params.id)

    res.json(sponsor)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}


export const updateSponsor = async (req, res) => {

  try {

    const sponsor = await Sponsor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(sponsor)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}


export const deleteSponsor = async (req, res) => {

  try {

    await Sponsor.findByIdAndDelete(req.params.id)

    res.json({ message: "Sponsor deleted" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}
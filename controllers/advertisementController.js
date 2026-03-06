import Advertisement from "../models/Advertisement.js"

export const createAdvertisement = async (req,res)=>{
  try{

    const ad = new Advertisement(req.body)

    const savedAd = await ad.save()

    res.status(201).json(savedAd)

  }catch(error){
    res.status(500).json({message:error.message})
  }
}


export const getAdvertisements = async (req,res)=>{
  try{

    const ads = await Advertisement.find({active:true})

    res.json(ads)

  }catch(error){
    res.status(500).json({message:error.message})
  }
}


export const getAllAdvertisements = async (req,res)=>{
  try{

    const ads = await Advertisement.find().sort({createdAt:-1})

    res.json(ads)

  }catch(error){
    res.status(500).json({message:error.message})
  }
}


export const getAdvertisementById = async (req,res)=>{
  try{

    const ad = await Advertisement.findById(req.params.id)

    res.json(ad)

  }catch(error){
    res.status(500).json({message:error.message})
  }
}


export const updateAdvertisement = async (req,res)=>{
  try{

    const ad = await Advertisement.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    )

    res.json(ad)

  }catch(error){
    res.status(500).json({message:error.message})
  }
}


export const deleteAdvertisement = async (req,res)=>{
  try{

    await Advertisement.findByIdAndDelete(req.params.id)

    res.json({message:"Advertisement deleted"})

  }catch(error){
    res.status(500).json({message:error.message})
  }
}
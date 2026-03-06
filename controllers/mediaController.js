import Media from "../models/Media.js"

export const createMedia = async (req,res)=>{
  try{

    const media = new Media(req.body)

    const saved = await media.save()

    res.status(201).json(saved)

  }catch(error){
    res.status(500).json({message:error.message})
  }
}

export const getMedia = async (req,res)=>{
  try{

    const media = await Media.find().sort({createdAt:-1})

    res.json(media)

  }catch(error){
    res.status(500).json({message:error.message})
  }
}

export const getMediaById = async (req,res)=>{
  try{

    const media = await Media.findById(req.params.id)

    res.json(media)

  }catch(error){
    res.status(500).json({message:error.message})
  }
}

export const updateMedia = async (req,res)=>{
  try{

    const media = await Media.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    )

    res.json(media)

  }catch(error){
    res.status(500).json({message:error.message})
  }
}

export const deleteMedia = async (req,res)=>{
  try{

    await Media.findByIdAndDelete(req.params.id)

    res.json({message:"Media deleted"})

  }catch(error){
    res.status(500).json({message:error.message})
  }
}
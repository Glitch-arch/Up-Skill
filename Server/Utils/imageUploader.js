import {v2 as cloudinary} from 'cloudinary'

export const uploadImageToCloudinary = async (file, folder, height, quality) => {

    const options = {folder}
    if (height) {
        options.height = height
    }
    if (quality) {
        options.qualitiy = quality
    }
    options.resourse_type = 'auto'

    return await cloudinary.upload(file.tempFilePath, options)

}
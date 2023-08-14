import file from "../Models/File.js";


export const localFileUpload = async (req, res) => {

    try {

        // file from req
        // Path where to save
        // then move the file to that path

        const file = req.files.file
        let path = __dirname + "/files" + Date.now() + `.${file.split('.')[1]}`

        file.mv(path, (error) => {
            console.log(error)
        })

        res.json({
            success: true,
            message: "Local file moved"
        })
    } catch (error) {
        console.log(error)
    }

}
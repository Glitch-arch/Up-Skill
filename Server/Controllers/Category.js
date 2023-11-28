import Tags from "../Models/Tags.js";

//  Category Changes pending
export const createCategory = async (req, res) => {
  try {
    const { description, name } = req.body;

    if (!description || !name) {
      return res.status(400).json({
        success: false,
        message: " error in tag creation",
      });
    }

    const dbTagCreation = await Tags.create({
      Name: name,
      description: description,
    });

    return res.status(200).json({
      success: true,
      message: "Category created",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: " Got an error while creating an Category ",
    });
  }
};

export const showAllCategory = async (req, res) => {
  try {
    const fetchAllTags_FormDb = await Tags.find(
      {},
      { Name: true, description: true }
    );
    res.status(200).json({
      success: true,
      message: "All Category fetched",
      body: fetchAllTags_FormDb,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: " Caught an error while fetching Category form db ",
    });
  }
};

export const categoryPageDetails = async (req, res) => {
  try {
    //get categoryId
    const { categoryId } = req.body;
    //get courses for specified categoryId
    const selectedCategory = await Tags.findById(categoryId)
      .populate("courses")
      .exec();
    //validation
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    }
    //get coursesfor different categories
    const differentCategories = await Tags.find({
      _id: { $ne: categoryId },
    })
      .populate("courses")
      .exec();

    //get top 10 selling courses
    //HW - write it on your own

    //return response
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

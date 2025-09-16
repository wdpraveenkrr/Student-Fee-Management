import courseModel from '../model/courseModel.js'
const addCourse = async (req, res) => {

    try {
        const { cname, cfee, cduration, ctopics, cdescription } = req.body;

        if (!cname || !cfee || !cduration || !ctopics || !cdescription ) {
            return res.json({ success: false, message: "Missing Details.." })
        }

        const courseData = { cname, cfee, cduration, ctopics, cdescription }

        const newCourse = new courseModel(courseData);
        await newCourse.save()

        res.json({ success: true, message: "Course Added" })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }

}

export { addCourse }


// get list of course (GET Method)

const listCourse = async (req, res) => {
    try {
        const course = await courseModel.find({});
        res.json({ success: true, data: course })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { listCourse }


// getParticular course

const getCourse = async (req, res) => {

    try {
        const { id } = req.params; // Get ID from URL
        const acourse = await courseModel.findById(id); // Find user

        if (!acourse) {
            return res.json({ success: false, message: "Course not found" });
        }

        res.json({ success: true, data: acourse });
    } catch (err) {
        res.json({ success: false, message: "Invalid ID format", error: err.message });
    }
}

export { getCourse }




// remove list of course (DELETE METHOD)

const removeCourse = async (req, res) => {
    try {
        const course = await courseModel.findById(req.params.id);
        await courseModel.findByIdAndDelete(course);
        res.json({ success: true, message: "Course Removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}

export { removeCourse }

// update the course list

const updateCourse = async (req, res) => {

   try {
    
    const id= req.params.id;

    const courseExist = await courseModel.findOne({_id:id})
    if (!courseExist) {
      return res.json({ message: "Course not found" });
    }

    const updatedCourse = await courseModel.findByIdAndUpdate(
      id,   // which course to update
      req.body,        // new data
      { new: true }    // return updated object  );
      )    

    res.json({ updatedCourse });

  } catch (error) {
    res.json({ message: "Error updating course", error });
  }

    }
    export { updateCourse }
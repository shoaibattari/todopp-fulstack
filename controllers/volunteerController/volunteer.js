import volunteerModel from "../../models/volunteerModel.js";

// Add Volunteer
export const createVolunteer = async (req, res) => {
  console.log("🚀 ~ createVolunteer ~ req:", req.body);
  try {
    const {
      fullName,
      fatherName,
      khundi,
      gender,
      dob,
      contact,
      email,
      address,
      cnic,
      omjCard,
      education,
      institution,
      field,
      volunteerArea,
      experience,
      timeCommitment,
    } = req.body;

    // Validate required fields
    if (
      !fullName ||
      !fatherName ||
      !khundi ||
      !gender ||
      !dob ||
      !contact ||
      !email ||
      !address ||
      !cnic ||
      !education ||
      !institution ||
      !volunteerArea ||
      !experience ||
      !timeCommitment
    ) {
      return res.status(400).json({
        message: "Please provide all required fields",
        status: false,
        data: null,
      });
    }

    // Create a new volunteer record
    const newVolunteer = await volunteerModel.create({
      fullName,
      fatherName,
      khundi,
      gender,
      dob,
      contact,
      email,
      address,
      cnic,
      omjCard,
      education,
      institution,
      field,
      volunteerArea,
      experience,
      timeCommitment,
    });

    res.status(200).json({
      message: "Volunteer registered successfully",
      status: true,
      data: newVolunteer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

export const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await volunteerModel.find().sort({ createdAt: -1 });

    if (volunteers.length === 0) {
      return res.status(200).json({
        message: "No data found",
        status: true,
      });
    }

    res.status(200).json({
      message: "All volunteers fetched successfully",
      status: true,
      data: volunteers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

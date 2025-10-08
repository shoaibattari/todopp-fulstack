import express from "express";
import {
  createVolunteer,
  getAllVolunteers,
} from "../controllers/volunteerController/volunteer.js";

const router = express.Router();

router.post("/add", createVolunteer);
router.get("/all-volunteers", getAllVolunteers);

export default router;

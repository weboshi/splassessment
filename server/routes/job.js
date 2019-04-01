import express from "express";
import job from "../controllers/jobsController"

const router = express.Router();

router.post("/newJob", job.createJob)
router.get("/getJobs", job.findAll)
router.get("/listing/:id", job.findId)
router.get("/getBookmarks/", job.getBookmarks)
router.get("/myPosts/:username", job.getUserJobs)
router.get("/getFollowPosts/", job.getFollowPosts)

export default router;
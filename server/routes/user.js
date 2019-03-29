import express from "express";
import user from "../controllers/usersController"

const router = express.Router();

router.get("/profile/:username", user.findById);
// router.post("/", user.create);
router.post("/logIn", user.signIn);
router.get("/getUserPins/:username", user.getUserPins);
router.put("/update", user.updateProfile);
router.delete("/delete/:id", user.remove);
router.post("/signup", user.createUser);
// router.put("/newJob", user.newJob)
router.get("/auth", user.authUser);
router.put("/addbookmark/:username", user.addBookmark)
router.get("/bookmarks/:username", user.getBookmarks)
router.get("/getUsers", user.findAllUsers)
// router.put("/newPin", user.newPin);

export default router;
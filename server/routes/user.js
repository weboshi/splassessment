import express from "express";
import user from "../controllers/usersController"

const router = express.Router();

router.get("/profile/:username", user.findById);
router.post("/logIn", user.signIn);
router.get("/getUserbookmarks/:username", user.getUserFollows);
router.put("/update", user.updateProfile);
router.delete("/delete/:id", user.remove);
router.post("/signup", user.createUser);
router.get("/auth", user.authUser);
router.put("/addbookmark/:username", user.addBookmark)
router.get("/bookmarks/:username", user.getBookmarks)
router.put("/removebookmark/:username", user.removeBookmark)
router.get("/getUsers", user.findAllUsers)

export default router;
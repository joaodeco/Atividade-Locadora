import { Router } from "express";
import {
  createRental,
  getAllRentals,
  getRentalById,
  updateRental,
  deleteRental,
} from "../controllers/aluguelController.js";

import check_token from "../middleware/check_token.js";
import check_role from "../middleware/check_role.js";

const router = Router();

router.post("/", check_token, check_role(["ADM", "REC"]), createRental);
router.get("/", check_token, check_role(["REC", "ADM", "TOSA"]), getAllRentals);
router.get("/:id", check_token, check_role(["REC", "ADM", "TOSA"]), getRentalById);
router.put("/:id", check_token, check_role(["ADM", "REC"]), updateRental);
router.delete("/:id", check_token, check_role(["ADM", "REC"]), deleteRental);

export default router;

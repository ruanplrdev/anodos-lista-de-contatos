import { Router } from 'express';
import { createContact, deleteContact, getContact, updateContact } from '../controllers/contactController';
import  authMiddleware  from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';

const router = Router();

router.post("/contacts", authMiddleware, createContact);
router.get("/contacts", authMiddleware, getContact);
router.put("/contacts/:id", authMiddleware, updateContact);
router.delete("/contacts/:id", authMiddleware, roleMiddleware('admin'), deleteContact);


export default router;

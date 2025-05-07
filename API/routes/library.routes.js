import express from 'express';
import multer from 'multer';
import path from 'path';
import LibraryItem from '../models/LibraryItem.js';

const router = express.Router();

// 📸 Multer storage config for file uploads
const uploadDir = path.join(process.cwd(), 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

// Create Library Item Route
router.post('/create', upload.single('file'), async (req, res) => {
  const { title, description } = req.body;
  const file = req.file;

  if (!file || !title || !description) {
    return res.status(400).json({ error: 'File, title, and description are required' });
  }

  try {
    const newLibraryItem = new LibraryItem({
      title,
      description,
      filePath: `/uploads/${file.filename}` // Store relative path
    });

    const savedLibraryItem = await newLibraryItem.save();
    res.status(201).json({
      message: 'Library item added successfully!',
      libraryItem: savedLibraryItem
    });
  } catch (err) {
    console.error('❌ Error saving library item:', err);
    res.status(500).json({ error: 'Error saving library item' });
  }
});

export default router;

/**
 * Posts router (already written). Mounted at /posts in app.js.
 *
 * The audit middleware is mounted only on POST / so public reads remain free of
 * write-audit log entries.
 */
const express = require('express');
const auditWrite = require('../middleware/auditWrite');

const router = express.Router();
const posts = [{ id: 1, title: 'Hello World' }];

// Public read — no extra middleware.
router.get('/', (req, res) => {
  res.json({ data: posts });
});

// Per-route middleware — audit writes without affecting public reads.
router.post('/', auditWrite, (req, res) => {
  const post = { id: posts.length + 1, title: req.body.title || 'Untitled' };
  posts.push(post);
  res.status(201).json({ data: post });
});

module.exports = router;

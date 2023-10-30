// addComment.js

import { supabase } from '../supabaseClient.mjs';
import express from 'express';
const router = express.Router();

router.post('/post/:post_id/comment', (req, res) => {
  const { user_id, comment_text } = req.body;
  const post_id = req.params.post_id;

  const query = 'INSERT INTO comments (user_id, post_id, comment_text) VALUES ($1, $2, $3)';
  const values = [user_id, post_id, comment_text];

  supabase
    .from('comments')
    .upsert([
      {
        user_id,
        post_id,
        comment_text,
      },
    ])
    .single()
    .then(({ data, error }) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error posting comment' });
      }
      return res.status(201).json({ message: 'Comment posted successfully' });
    });
});

export default router;

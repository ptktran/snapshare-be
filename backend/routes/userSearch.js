// userSearch.js
//Search for user using json filed
//Post: http://localhost:3000/api/user-search/search

/*
{
  "searchKey": "user_id",
  "searchValue": "13"
}

{
  "searchKey": "username",
  "searchValue": "Ja_Doe"
}

change search key to username or email and value to username*/

import express from 'express';
import { supabase } from '../supabaseClient.mjs';

import { createUser, getUserById, getUsersByUsername, getUsersByEmail } from '../models/User.js'; // Adjust the path as needed

const router = express.Router();

//search for user
router.post('/search', async (req, res) => {
    try {
      const { searchKey, searchValue } = req.body;
  
      if (!searchKey || !searchValue) {
        return res.status(400).json({ error: 'Search key and value are required' });
      }
  
      let user;
  
      if (searchKey === 'username') {
        user = await getUsersByUsername(searchValue, 'test1');
      }
      
      else if (searchKey === 'email') 
      {
        user = await getUsersByEmail(searchValue, 'test1');
      } 
      
      else if (searchKey === 'user_id') {
        user = await getUserById(searchValue, 'test1');
      } 
      
      else {
        return res.status(400).json({ error: 'Invalid search' });
      }
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error searching for user' });
    }
  });
  
export default router;

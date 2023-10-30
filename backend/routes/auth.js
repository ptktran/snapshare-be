// auth.js

//This file is for registering user into database, and creating said user in database table
//Also is used to get userinfo by typing into url(user_id, username or email)

//POST : http://localhost:3000/api/auth/register   //Add contents like following in postman etc.

/*{
  "username": "bill",
  "password_hash": "password1",
  "email": "bill@gmail.com",
  "user_bio": "my bio",
  "profile_picture_url": "profile_pic.jpg"
}
*/

//GET : http://localhost:3000/api/auth/find/username/<username> //Replace <username> with username

//GET: http://localhost:3000/api/auth/<#>   //Replace <#> with user id

//GET: http://localhost:3000/api/auth/find/email/<@gmail.com> //Replace  <@gmail.com> with email of user

import express from 'express';
import bcrypt from 'bcrypt';
import { supabase } from '../supabaseClient.mjs';

import { createUser, getUserById, getUsersByUsername, getUsersByEmail } from '../models/User.js'; 



const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const {username, email, password_hash, user_bio, profile_picture_url} = req.body;


  


    const validatedUsername = username.trim();
    const validatedEmail = email.trim();

    const maxUsernameLength = 255; 
    const maxEmailLength = 255; 

    if (validatedUsername.length > maxUsernameLength || validatedEmail.length > maxEmailLength) {
      return res.status(400).json({ error: 'Username or email is too long' });
    }


    const hashedPassword = await bcrypt.hash(password_hash, 10);

    const user = {
      username: validatedUsername,
      email: validatedEmail,
      password_hash: hashedPassword,
      user_bio,
      profile_picture_url,
    };

    

    const createdUser = await createUser(user);

    if (!createdUser) {
      return res.status(500).json({ error: 'creating user' });
    }

    return res.status(201).json(createdUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});


router.get('/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await getUserById(user_id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

// Find users by username
router.get('/find/username/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const users = await getUsersByUsername(username);

    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'Users not found' });
    }

    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

// Find users by email
router.get('/find/email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const users = await getUsersByEmail(email);

    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'Users not found' });
    }

    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

export default router;

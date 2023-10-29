// passwordResetRoute.js

/*

Post 

http://localhost:3000/api/password-reset/initiate-change

Post

http://localhost:3000/api/password-reset/update-password

*/

import express from 'express';
import { supabase } from '../supabaseClient.mjs';
import bcrypt from 'bcrypt';

const router = express.Router();

// Route for initiating a password change need old password
router.post('/initiate-change', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  // Verify the user's email
  const { data: user, error: userError } = await supabase
    .from('test1')
    .select('password_hash')
    .eq('email', email)
    .single();

  if (userError || !user) {
    return res.status(400).json({ error: 'Invalid email or user not found' });
  }

  // Verify the old password
  const passwordMatch = await bcrypt.compare(oldPassword, user.password_hash);

  if (!passwordMatch) {
    return res.status(400).json({ error: 'Invalid old password' });
  }

  // Hash the new password
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  // Update the user's password
  const { error: updateError } = await supabase
    .from('test1')
    .update({ password_hash: hashedNewPassword })
    .eq('email', email);

  if (updateError) {
    return res.status(500).json({ error: 'Error updating password' });
  }

  return res.status(200).json({ message: 'Password updated successfully' });
});



// Route to initiate a password reset
router.post('/initiate-password-reset', async (req, res) => {
  const { email, newPassword } = req.body;

  // Verify the user's email
  const { data: user, error: userError } = await supabase
    .from('test1')
    .select('email')
    .eq('email', email)
    .single();

  if (userError || !user) {
    return res.status(400).json({ error: 'Invalid email or user not found' });
  }

  try {
    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the table
    const { error: updateError } = await supabase
      .from('test1')
      .update({ password_hash: hashedNewPassword }) // Update the password field
      .eq('email', email);

    if (updateError) {
      return res.status(500).json({ error: 'Error updating the password' });
    }

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (updateError) {
    return res.status(500).json({ error: 'Error updating the password' });
  }
});

// Route to update password with email and new password after link is sent
router.post('/update-password', async (req, res) => {

  const { email, newPassword } = req.body;


  // Hash new pass
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);


  // Update tablwee
  const { error: updateError } = await supabase
    .from('test1')
    .update({ password_hash: hashedNewPassword })
    .eq('email', email);


  if (updateError) {
    return res.status(500).json({ error: 'Error updating the password' });
  }


  return res.status(200).json({ message: 'Password updated successfully' });
});


  /*// Update the user's password using Supabase Authentication table ?
  try {
    const { data: updateData, error: updateSupabaseError } = await supabase.auth.updateUser({
      password: hashedNewPassword, // Use the hashed new password
    });


    if (updateSupabaseError) {
      return res.status(500).json({ error: 'Error updating the password using Supabase' });
    }
  } catch (updateSupabaseError) {
    return res.status(500).json({ error: 'Error updating the password using Supabase' });
  }

*/
 
export default router;
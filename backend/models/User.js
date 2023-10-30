// User.js
import { supabase } from '../supabaseClient.mjs';

//provides function for auth.js 

// create a new user
const createUser = async (userData) => {
  try {
    const {username, email, password_hash, user_bio, profile_picture_url} = userData; // Use the correct property names

    const { data, error } = await supabase
  .from('test1')
  .upsert([userData], { onConflict: ['username', 'email'] });


    if (error) {
      console.error('Error creating user:', error);
      return null;
    }

    if (data && data.length > 0) {
      return data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

// get user by user_id
const getUserById = async (user_id) => {
  try {
    const { data, error } = await supabase
      .from('test1')
      .select('*')
      .eq('user_id', user_id);

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }

    if (data && data.length > 0) {
      return data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

// get users by email
const getUsersByEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from('test1')
      .select('*')
      .eq('email', email);

    if (error) {
      console.error('Error fetching users by email:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching users by email:', error);
    return null;
  }
}

// Function to get users by username
const getUsersByUsername = async (username) => {
  try {
    const { data, error } = await supabase
      .from('test1')
      .select('*')
      .eq('username', username);

    if (error) {
      console.error('Error fetching users by username:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching users by username:', error);
    return null;
  }
}
export { createUser, getUserById, getUsersByUsername, getUsersByEmail };

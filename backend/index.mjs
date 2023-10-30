import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan'; 
import authRoute from "./routes/auth.js";
import passwordResetRoute from './routes/passwordResetRoute.js'; 
import userSearchRoute from './routes/userSearch.js'; 
import addCommentRoute from './routes/addComment.js';
//import passresetRoute from './routes/newPasswordRoute.js';

import bodyParser from 'body-parser'; 

import cors from 'cors';




dotenv.config(); 
import { supabase } from './supabaseClient.mjs';

//const cors = require('cors');

const app = express();


app.use(cors());

app.use(helmet());
app.use(express.json()); 
app.use(morgan('common')); 


//app.use("/api/pass-reset",passresetRoute)
app.use("/api/auth" , authRoute);
app.use('/api/password-reset', passwordResetRoute);
app.use('/api/user-search', userSearchRoute); 
app.use('/api/addComment', addCommentRoute);
app.use('/api/updatepassword', passwordResetRoute);


console.log('Supabase database connected successfully.');

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});



//Below is just for testing database connection()
const { data, error } = await supabase.from('test1').select('*').eq('user_id',13);

if (error) {
  console.error('Error querying the database:', error);
} else {
  if (data.length > 0) {
    console.log('Record found:', data[0]);
  } else {
    console.log('Record not found.');
  }
}


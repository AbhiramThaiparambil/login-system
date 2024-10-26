const e = require('express');
const express = require('express');
const router = express.Router();
const session = require('express-session');

module.exports = router;

const LoginData = {
  name: 'Abhiram',
  email: 'abhiram@gmail.com',
  password: '121'
};

// Login User
router.post('/login', (req, res) => {
  const { name, email, password } = req.body;

  if (password === LoginData.password) {
    if (email === LoginData.email && name === LoginData.name) {
      req.session.user = email;
      res.redirect('/route/dashboard');
      
    }else{ res.render('base', { a:'ones more check your registered name an email address '});}
  } else {
    
    res.render('base', { a:'Enter a valid password'});
  }

});
 
// Dashboard Route
router.get('/dashboard', (req, res) => {
 
  if (req.session.user) {
  
    res.render('dashboard', { user:req.session.user});
  }
  // } else {
  //   res.send('It\'s not working');
  // }
});

// Logout Route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.send('Error');
    } else {
      res.redirect('/');
      
    }
  });
});




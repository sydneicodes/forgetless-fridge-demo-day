const { ObjectId } = require("mongodb");

module.exports = function (app, passport, db) {

  // normal routes ===============================================================

  // show the landing page (will also have our login links)
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  // WELCOME SECTION =========================
  app.get('/welcome', isLoggedIn, function (req, res) {
    res.render('welcome-page.ejs', {
      user: req.user.local
    })
  });

  // DASHBOARD SECTION =========================
  app.get('/dashboard', isLoggedIn, function (req, res) {
    res.render('dashboard.ejs', {
      user: req.user.local
    })
  });

  // GROCERY LIST CREATION SECTION ========================= 
  app.get('/grocery-list', isLoggedIn, function (req, res) {
    db.collection('purchased-groceries').find({ userID: req.user._id }).toArray((err, list) => {
      if (err) return console.log(err)
      res.render('grocery-list.ejs', {
        list
      })
    })
  });

  // MANAGE FRIDGE SECTION ========================= 
  app.get('/manage-fridge', isLoggedIn, function (req, res) {
    db.collection('purchased-groceries').find({ userID: req.user._id }).toArray((err, list) => {
      list.forEach((entry) => {
        let groceries = entry.groceries
        groceries.forEach((item) => {
          console.log(item, 'item')
          db.collection('fridge').find({ grocery: item }).toArray((err, groceryInFridge) => {
            console.log(groceryInFridge, 'matched?')
            if (err) return console.log(err)
            res.render('manage-fridge.ejs', {
              list,
              groceryInFridge
            })
          })
        })
      })
    })
  });


  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // message board routes ===============================================================

  app.post('/save-list', (req, res) => {
    console.log(req.body)
    db.collection('purchased-groceries').insertOne({ groceries: req.body.purchased, userID: req.user._id, date: new Date().toLocaleDateString(), title: 'Grocery List', listId: new Date().valueOf(), unpurchasedCount: req.body.unpurchasedCount }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/grocery-list')
    })

  })

  app.post('/addToFridge', (req, res) => {
    console.log(req.body)
    db.collection('fridge').insertOne({ grocery: req.body.grocery, userID: req.user._id, expDate: req.body.expDate, listId: req.body.listId }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/manage-fridge')
    })
  })

  app.put('/edit', (req, res) => {
    console.log(req.body)
    db.collection('purchased-groceries')
      .findOneAndUpdate({ _id: ObjectId(req.body._id) }, {
        $set: {
          title: req.body.newTitle
        }
      }, {
        sort: { _id: -1 },
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  })

  app.delete('/deleteList', (req, res) => {
    db.collection('purchased-groceries').findOneAndDelete({ _id: ObjectId(req.body._id) }, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/welcome', // redirect to the welcome page
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/welcome', // redirect to the welcome page
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect('/welcome');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}

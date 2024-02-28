const path = require("path");
const express = require("express");
const app = express();
const PORT = 4444;
const mongoose = require("mongoose");
const hbs = require("hbs");
const User = require("./models/users");
const session = require("express-session");
const passport = require("./auth/passport");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "asdjbaskdadbaskdv",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://priyansh:priyanshvansh@cluster0.w1vqwhi.mongodb.net/?retryWrites=true&w=majority",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.get()
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/login",passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    return res.render("index",{
      username:req.user.username
    });
  }
);

app.post("/username", async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      res.render("register", {
        msg: "user already present",
      });
    } else {
      bcrypt.genSalt(saltRounds, async function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          await User.create({
            username,
            password: hash,
          });
          res.render("login", {
            msg: "signup successfull",
          });
        });
      });
    }
  } catch (err) {
    res.send(err);
  }
});
// app.post("/username", async (req, res) => {
//   const { userName } = req.body;
//   // console.log(username);
//   await Users.create({
//     userName,
//     password
//     // save()
//   });
//   res.render("index");
// });

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("register");
});

// app.get("/pic", async (req, res)=>{
//   try {
//     const users = await Users.find();
//     console.log(users);
//     res.render("c",{
//       users
//     });
//   } catch (error) {

//   }
// })

// app.post("/pic", async (req, res) => {
//   const { image } = req.body;
//   console.log(image);
//   await Users.create({
//     image
//   });
//   res.redirect("/pic");
// });
// app.post("/pic", async (req, res) => {
//   const { image } = req.body;
//   console.log(image);
//   await Users.create({
//     image
//   });
//   res.redirect("/pic");
// });

mongoose.connect(
    "mongodb+srv://priyansh:priyanshvansh@cluster0.w1vqwhi.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:` + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

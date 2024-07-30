const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";
const nodemailer = require("nodemailer");
const crypto = require("crypto");
// Creating MySQL connection
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "library",
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Post for Message or Feedback
app.post("/api/message", (req, res) => {
  const email = req.body.email;
  const message = req.body.messages;
  const name = req.body.name;
  const phone_no = req.body.phoneno;
  // console.log(newItem);
  console.log(email, message, name, phone_no);
  if(!email ||!name ||!message ||!phone_no){
    return res.status(500).json({ error: error.message });
  }
  const query =
    "INSERT INTO library.message (name,email,phone_no,message) VALUES (?,?,?,?)";
  const values = [name, email, phone_no, message];

  pool.query(query, values, (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    return console.log(results);
  });
});

function encryptString(text, key) {
  const cipher = crypto.createCipher("aes-256-cbc", key);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}
const encryptionKey = "mySecretKey";
// Endpoint for login
app.get("/api/login", (req, res) => {
  const { email, password } = req.query;
  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }
  const mypassword = encryptString(password, encryptionKey);
  const query =
    "SELECT * FROM library.login WHERE mail_id = ? AND password = ?";
  pool.query(query, [email, mypassword], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Check if user exists
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const userData = results;
    const token = jwt.sign({ user: userData }, secretKey, { expiresIn: "12h" });
    // console.log(token);
    // Construct response object with user data and token
    const response = {
      userData: userData,
      token: token,
    };

    // Send response
    res.json(response);
  });
});

// Add Admin
app.post("/api/admin", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide all required details" });
  }
  const mypassword = encryptString(password, encryptionKey);
  const section = "admin";
  const myclass = null;

  const query =
    "INSERT INTO login (name, mail_id, section, class, password) VALUES (?, ?, ?, ?, ?)";
  const values = [name, email, section, myclass, mypassword];
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error("Error inserting admin:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
    console.log("Admin Saved:", results.insertId);
    return res
      .status(200)
      .json({ success: true, message: "Admin added successfully" });
  });
});
//  Delete Admin
app.delete("/api/admin", (req, res) => {
  const adminId = req.body.id;
  console.log("Admin Deleted");
  const query = "DELETE FROM login WHERE id=?";

  pool.query(query, [adminId], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  });
});
// Add Student
app.post("/api/student", (req, res) => {
  const { name, email, myclass, password } = req.body;
  const mypassword = encryptString(password, encryptionKey);
  if (!name || !email || !myclass || !password) {
    return res
      .status(400)
      .json({ error: "Please provide all required details" });
  }

  const section = "student";
  const query =
    "INSERT INTO login (name, mail_id, section, class, password) VALUES (?, ?, ?, ?, ?)";
  const values = [name, email, section, myclass, mypassword];
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error("Error inserting student:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
    console.log("Student Saved:", results.insertId);
    return res
      .status(200)
      .json({ success: true, message: "Student added successfully" });
  });
});

//  Delete Student
app.delete("/api/student", (req, res) => {
  const adminId = req.body.id;
  const query = "DELETE FROM login WHERE id=?";

  pool.query(query, [adminId], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  });
});

// Middleware function to verify JWT token

//  Books

//Get books
app.get("/api/book", (req, res) => {
  let { class: classValue } = req.query;

  if (!classValue) {
    // Default value if classValue is undefined
    classValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  } else {
    // Parse classValue to an array of integers
    classValue = classValue.split(",").map(Number);
  }

  const query = "SELECT * FROM library.books WHERE class IN (?)";

  pool.query(query, [classValue], (error, results) => {
    if (error) {
      console.log("Error fetching books:", error);
      return res.status(500).json({ error: error.message });
    }
    const dataObject = {
      data: results,
    };
    console.log("Books fetched successfully");
    res.json(dataObject.data);
  });
});

//Delete Books
app.delete("/api/book", (req, res) => {
  const bookId = req.body.id;
  const query = "DELETE FROM books WHERE id=?";

  pool.query(query, [bookId], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  });

  console.log(`Deleted row with ID =$ {bookId}`);
  return res.status(200).json(results);
});

//Add Books
app.post("/api/book/add", (req, res) => {
  const {
    id,
    name,
    category,
    class: myclass,
    date,
    quantity,
    description,
  } = req.body;
  console.log(req.body);
  console.log(id, name, category, myclass, date, quantity, description);

  if (
    !id ||
    !name ||
    !category ||
    !myclass ||
    !date ||
    !quantity ||
    !description
  ) {
    return res.status(400).json({ error: "Please provide all book details" });
  }
  const query =
    "INSERT INTO books (id, name, category, class, date, quantity, description) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [id, name, category, myclass, date, quantity, description];

  // Execute the query
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error("Error inserting book:", error);
      console.log("error");
      return res.status(500).json({ success: false, error: error.message });
    }
    console.log("Book Saved:", results.insertId);
    return res.status(200).json({
      success: true,
      message: "Book added successfully",
      bookId: results.insertId,
    });
  });
});

// date
app.get("/api/abook/date", (req, res) => {
  const currentDate = new Date();
  const myDate = currentDate.toLocaleDateString();
  const body = { date: myDate };
  res.json(body.date);

  // console.log(body.date);
});

// category
app.get("/api/abook/category", (req, res) => {
  const regular = {
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  };
  const special = {
    data: [0],
  };

  const { requ } = req.query;
  if (requ === "Regular") {
    res.json(regular.data);
  } else if (requ === "Special") {
    res.json(special.data);
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
});

// Get Admin
app.get("/api/addAdmin", (req, res) => {
  const query = "SELECT * FROM login WHERE section=?";
  const section = "admin";
  pool.query(query, [section], (error, results) => {
    if (error) {
      console.log("Error arrived in fetching");
      return res.status(500).json({ error: error.message });
    }
    const dataObject = {
      data: results,
    };
    console.log(dataObject.data);
    res.json(dataObject.data);
    console.log("GET request received");
  });
});

// Get Student
app.get("/api/login/student", (req, res) => {
  const { name, myclass } = req.query;
  const section = "student";
  let query;
  let values = [section];

  if (!name && !myclass) {
    query = "SELECT * FROM library.login WHERE section=?";
  } else if (name && !myclass) {
    query = "SELECT * FROM library.login WHERE section=? AND name LIKE ?";
    values.push(`${name}%`);
  } else if (!name && myclass) {
    query = "SELECT * FROM library.login WHERE section=? AND class=?";
    values.push(myclass);
  } else {
    query =
      "SELECT * FROM library.login WHERE section=? AND name LIKE ? AND class=?";
    values.push(`${name}%`, myclass);
  }

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error("Error fetching students", error);
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

// Get Records
app.get("/api/records", (req, res) => {
  let { status } = req.query;
  let query;
  let values;

  if (!status || status === "All") {
    query = "SELECT * FROM records ORDER BY t_date DESC"; // Fetch all records if status is not provided or 'All' is selected
    values = [];
  } else {
    query = "SELECT * FROM records WHERE status=? ORDER BY t_date DESC";
    values = [status];
  }

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error("Error fetching records", error);
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

// Update Record
// Update Record
app.post("/api/records/post", (req, res) => {
  const { status: recordStatus, id: recordId, date } = req.body;
  console.log(recordStatus, recordId, date);

  const query = "UPDATE records SET status = ?, t_date = ? WHERE id = ?";

  pool.query(query, [recordStatus, date, recordId], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(results);
  });
});

//...................................Got Date ..............................................
app.post("/api/gotdate", (req, res) => {
  const { id, date, status } = req.body;
  console.log(id, date, status);
  // Check if all required fields are provided
  if (!id || !date || !status) {
    console.log("Error on posting status to complete");
    return res.status(400).json({ error: "Error occur on Changing quantity" });
  }
  // SQL query corrected for INSERT statement
  const query = "UPDATE records SET g_date=? , status=? WHERE id = ?";
  const values = [date, status, id];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(results);
  });
});

//....................................................................Student...................................................................

//Get Book
app.get("/api/sbook", (req, res) => {
  let { class: classValue } = req.query;

  if (!classValue) {
    // Default value if classValue is undefined
    classValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  } else {
    // Parse classValue to an array of integers
    classValue = classValue.split(",").map(Number);
  }

  const query = "SELECT * FROM library.books WHERE class IN (?)";

  pool.query(query, [classValue], (error, results) => {
    if (error) {
      console.log("Error fetching books:", error);
      return res.status(500).json({ error: error.message });
    }
    const dataObject = {
      data: results,
    };
    console.log("Books fetched successfully");
    res.json(dataObject.data);
  });
});

//......Individual Book...............
app.get("/api/mybook", (req, res) => {
  const { id } = req.query.id; // Destructure 'class' from query parameters

  if (!id) {
    console.error("Plese send Id");
  }

  // console.log(class);
  console.log(id);

  const query = "SELECT * FROM books WHERE id = ?";

  // Use your database connection pool (assuming 'pool' is defined correctly)
  pool.query(query, id, (error, results) => {
    if (error) {
      console.log("Error fetching books:", error);
      return res.status(500).json({ error: error.message });
    }

    const dataObject = {
      data: results,
    };

    // console.log("Books fetched successfully");
    res.json(dataObject.data);
  });
});

//.......Srecords...............
app.get("/api/srecords", (req, res) => {
  const { email } = req.query; // Use req.query to get query parameters
  // console.log(req.query);
  console.log(email);
  console.log(email);
  console.log(email);
  const query = "SELECT * FROM records WHERE email = ? ORDER BY t_date DESC"; // Adjust the SQL query

  pool.query(query, [email], (error, results) => {
    if (error) {
      console.log("Error arrived in fetching");
      return res.status(500).json({ error: error.message });
    }
    const dataObject = {
      data: results,
    };
    res.json(dataObject.data);
    console.log("GET request received");
  });
});

// Post Record
// Assuming you have initialized `app` and `pool` correctly

app.post("/api/post/records", (req, res) => {
  const { s_name, email, class_name, b_name, b_id } = req.body;
  const status = "pending";
  const t_date = "";
  console.log(s_name, email, class_name, b_name, b_id);

  // Validate required fields
  if (!s_name || !email || !class_name || !b_name || !b_id) {
    return res.status(400).json({ error: "Please provide all book details" });
  }

  // SQL query for INSERT statement
  const query =
    "INSERT INTO records (s_name, email, class, b_name, b_id, status,t_date) VALUES (?, ?, ?, ?, ?, ?,?)";
  const values = [s_name, email, class_name, b_name, b_id, status, t_date];

  // Execute the query
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
    return res
      .status(200)
      .json({ message: "Record inserted successfully", data: results });
  });
});

//...................................Quantity Change.....................................

app.post("/api/mybook/quantity", (req, res) => {
  const { quantity, id } = req.body;

  if (!quantity) {
    return res.status(400).json({ error: "Error occur on Changing quantity" });
  }

  // SQL query corrected for INSERT statement
  const query = "UPDATE books SET quantity=? WHERE id = ?";
  const values = [quantity, id];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(results);
  });
});

//.....................................................................Checking the number of pending or success status of individual user.................
app.get("/api/userrecords", (req, res) => {
  const email = req.query.email;
  console.log(email);
  const status = "completed";
  // If a status query parameter is provided, use it
  if (!email) {
    console.error("No email detected !");
  }

  const query = "SELECT * FROM library.records WHERE email = ? AND status!=?";
  const values = [email, status];

  // Execute the query
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error("Error fetching records", error);
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

//......................................Check OTP....................
app.get("/api/checkOtp", (req, res) => {
  const { email } = req.query;
  console.log("Hi this is backend");
  const query = "SELECT * FROM login WHERE mail_id=?";
  pool.query(query, [email], (error, results) => {
    if (error) {
      console.log("Error arrived in fetching");
      return res.status(500).json({ error: error.message });
    }
    const dataObject = {
      data: results,
    };
    console.log(dataObject.data);
    res.json(dataObject.data);
    console.log("GET reques.....t received");
  });
});

//.....................................................Send OTP........................................................
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kasamsaving@gmail.com",
    pass: "iyjb gtmt yhbx imji",
  },
});

let otpCache = {};
app.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const query = "UPDATE login SET OTP = ? WHERE mail_id = ?";
  const values = [otp, email];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(results);
  });
  // Store OTP in cache
  otpCache[email] = otp;
  console.log(email, otp);
  // Email setup
  const mailOptions = {
    from: "kasamsaving@gmail.com",
    to: email,
    subject:
      "Get your OTP from library management software of Shree Secondary School",
    html: `
      <p>Hi ${email},</p>
      <p>Enter the 6-digit code to verify it's you.</p>
      <p><h2>Your OTP code is: ${otp} </h2></p>
      <p>If you don't get the OTP, please contact the administrator through the phone number given on the home page. Also, you can tell us in the message section on the same page.</p>
      <p>Please feel free to contact us and don't forget to give feedback.</p>
    `,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending OTP.");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("OTP sent to your email.");
    }
  });
});

//.....................................Change Password...................................
app.post("/changepassword", (req, res) => {
  const password = req.body.password.myNewPassword;
  const email = req.body.email.email;
  const mypassword = encryptString(password, encryptionKey);
  console.log(req.body);
  console.log(password);

  // Check if all required fields are provided
  if (!password || !email) {
    return res.status(400).json({ error: "Error occur on Changing quantity" });
  }

  // SQL query corrected for INSERT statement
  const query = "UPDATE login SET password=? WHERE mail_id = ?";
  const values = [mypassword, email];
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(results);
  });
});

//......................................Message ///////////////////////////////////////////////////////////////////////////////////////
app.post("/api/post/message", (req, res) => {
  const { email, section, seen, message } = req.body;
  console.log(email, section, message, seen);
  if (!email || !section || !message || !seen) {
    return res.status(400).json({ error: "Error occur on Changing quantity" });
  }
  // SQL query corrected for INSERT statement
  const query =
    "INSERT INTO library.notifications (mail_id,section,message,seen) VALUES (?,?,?,?)";
  const values = [email, section, message, seen];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(results);
  });
});

app.get("/api/get/message", (req, res) => {
  const { section, email, days } = req.query;
  console.log("Hi this is backend");
  let query = "";
  let values = [];
  console.log(section, email, days);
  console.log(section, email, days);
  console.log(section, email, days);
  if (!section && !email) {
    console.log("Error in params");
    return res.status(400).json({ error: "Missing parameters" });
  }

  if (!email) {
    query = "SELECT * FROM library.notifications";
  } else {
    query = "SELECT * FROM library.notifications WHERE mail_id=?";
    values = [email];
  }

  if (days) {
    query += email ? " AND" : " WHERE";
    query += " created_at >= NOW() - INTERVAL ? DAY";
    values.push(days);
  }
  query += " ORDER BY created_at DESC";

  pool.query(query, values, (error, results) => {
    if (error) {
      console.log("Error occurred in fetching data:", error);
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
    console.log("GET request received");
  });
});

app.get("/api/get/badge", (req, res) => {
  const seen = "unseen";
  const query = "SELECT * FROM library.notifications WHERE seen=?";
  const value = [seen];
  pool.query(query, value, (error, results) => {
    if (error) {
      console.log("Error occurred in fetching data:", error);
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
    console.log("GET request received");
  });
});
app.post("/api/get/badge", (req, res) => {
  const seen = req.query.seen;
  const query = "UPDATE notifications SET seen=? WHERE id>0";
  const value = [seen];
  pool.query(query, value, (error, results) => {
    if (error) {
      console.log("Error occurred in fetching data:", error);
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
    console.log("post request approved");
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

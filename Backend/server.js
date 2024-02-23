const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const svgCaptcha = require('svg-captcha');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000; // You can change this to your desired port
app.use((req, res, next) => {
  res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; img-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self';"
  );
  next();
});
app.use(cors(
    {
        origin:["http://localhost:3001"],
        methods:["POST","GET","PUT","DELETE"],
        credentials:true
    }
));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'surya@123', // Replace with a secret key
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      
    },
  })
);
app.use(express.static('public'));
app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')));
const connection =   mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'manager',
    database: 'assetmanagement'
});

connection.connect();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Use path.join to create an absolute path
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
}
});
const upload = multer({ storage });

app.get('/api/products/count', (req, res) => {
  const query = 'SELECT COUNT(*) as count FROM products1'; // Replace 'products' with your actual table name

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching product count:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results && results.length > 0) {
        const productCount = results[0].count;
        res.json({ count: productCount });
      } else {
        console.error('No results found in the "products" table.');
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  });
});
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM products1'; // Replace 'products' with your actual table name

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ products: results });
    }
  });
});

app.get('/api/varient/count', (req, res) => {
  const query = 'SELECT COUNT(*) as count FROM varients'; // Replace 'products' with your actual table name

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching product count:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results && results.length > 0) {
        const varientCount = results[0].count;
        res.json({ count: varientCount });
      } else {
        console.error('No results found in the "products" table.');
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  });
});

app.get('/api/user/count', (req, res) => {
  const query = 'SELECT COUNT(*) as count FROM userlogin'; // Replace 'userlogins' with your actual table name

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching user login count:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results && results.length > 0) {
        const userLoginCount = results[0].count;
        res.json({ count: userLoginCount });
      } else {
        console.error('No results found in the "userlogins" table.');
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  });
});
const generateRandomAlphabets = () => {
  const alphabets = 'ABCDEFG234abcdefghHIJKLMNOPQRSijklmnopTU#$%^&*_VWXYZ01qrstuvwxyz56789!@';
  const captchaLength = 5; // You can adjust the length as needed
  let captcha = '';
  for (let i = 0; i < captchaLength; i++) {
    const randomIndex = Math.floor(Math.random() * alphabets.length);
    captcha += alphabets[randomIndex];
  }
  return captcha;
};

app.get('/captcha', (req, res) => {
  const captchaText = generateRandomAlphabets();
  req.session.captcha = captchaText;
  res.json({ captcha: captchaText });
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/');
  }

  jwt.verify(token, 'surya', (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.redirect('/');
    }

    req.decoded = decoded;
    next();
  });
};

// Example protected route
app.get('/dashboard', verifyUser, (req, res) => {
  // If the middleware passes, the user is authenticated
  res.json({ message: 'Access granted', user: req.decoded });
});


app.post('/loginform', (req, res) => {
  const { username, password, usertype, userEnteredCaptcha } = req.body;

  // Verify the user-entered CAPTCHA text
  if (userEnteredCaptcha !== req.session.captcha) {
    return res.status(400).json({ message: 'CAPTCHA verification failed' });
  }

  let query = '';
  if (usertype === 'user') {
    query = `SELECT * FROM userlogin WHERE username = ? AND password = ?`;
  } else if (usertype === 'admin') {
    query = `SELECT * FROM adminlogin WHERE username = ? AND password = ?`;
  } else {
    return res.status(400).json({ message: 'Invalid user type' });
  }

  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error('Error querying the database:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length > 0) {
      const user = results[0];
// Generate JWT token
      const token = jwt.sign({ userId: user.id, userType: usertype }, 'surya', { expiresIn: '1h' });
      res.json({
        message: 'Login successful',
        userType: usertype,
        userId: user.id,
        token,
        // Include any other user-related data you need
      });
    } else {
      console.error('Invalid credentials:', { username, usertype });
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});


app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({Status: "Success"})
})

app.post('/register', (req, res) => {
  const { name, email, phoneNumber, username, password } = req.body;

  // Define the SQL query to insert user data into the database
  const sql = 'INSERT INTO userlogin (name, email, phonenumber, username, password) VALUES (?, ?, ?, ?, ?)';
  const values = [name, email, phoneNumber, username, password];

  // Execute the insert query
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('MySQL error:', err);
      res.status(500).json({ message: 'Registration failed' });
    } else {
      console.log('User registered:', result.insertId);
      res.status(200).json({ message: 'Registration successful' });
    }
  });
});

app.post('/check-user', (req, res) => {
  const { emailOrPhone } = req.body;

  // Find the user with the provided email or phone
  const query = 'SELECT * FROM userlogin WHERE email = ? OR phonenumber = ?';
  connection.query(query,[decodeURIComponent(emailOrPhone), decodeURIComponent(emailOrPhone)], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // User found
    res.status(200).json({ success: true, message: 'User found' });
  });
});

app.post('/reset-password', (req, res) => {
  const { emailOrPhone, newPassword, confirmPassword } = req.body;

  // Find the user with the provided email or phone
  const query = 'SELECT * FROM userlogin WHERE email = ? OR phonenumber = ?';
  connection.query(query, [decodeURIComponent(emailOrPhone), decodeURIComponent(emailOrPhone)], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const user = results[0];

    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Update the user's password
    const updateQuery = 'UPDATE userlogin SET password = ? WHERE id = ?';
    connection.query(updateQuery, [newPassword, user.id], (updateErr) => {
      if (updateErr) {
        console.error('Error updating password:', updateErr);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      res.status(200).json({ success: true, message: 'Password reset successful' });
    });
  });
});



// app.get('/assesst', (req, res) => {
//     const sql = 'SELECT * FROM products1';
//     connection.query(sql, (err, data) => {
//       if (err) return res.json(err);
//       return res.json(data);
//     });
//   });
app.get('/assesst', (req, res) => {
  const sql = 'SELECT productid, productName, productImage FROM products1';
  connection.query(sql, (err, data) => {
      if (err) {
          console.error('Error retrieving products:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      
      // Modify the response data to include full image URLs
      const modifiedData = data.map(product => ({
          ...product,
          productImage: `http://localhost:3000/${product.productImage}`
      }));

      return res.json(modifiedData);
  });
});

  
  app.post('/product', upload.single('productImage'), (req, res) => {
    const { productid,productName, productDescription } = req.body;
    const productImage = req.file ? req.file.path.replace(/\\/g, '/') : null;
  
    // Check if variants is present in the request body
  
  
    // Convert variantValues array to a string without quotes and backslashes
 
  
    // Insert product data into MySQL database
    const sql = "INSERT INTO products1(`productid`,`productName`, `productImage`, `productDescription`) VALUES (?, ?,?,?);"
    const values = [productid,productName, productImage, productDescription];
   
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      } else {
        console.log('Product data inserted successfully:', result);
        return res.status(200).json({ success: true, message: 'Product submitted successfully' });

      }
    });
  });
  
  

  app.post('/adddescription', (req, res) => {
    const { descriptions } = req.body;
  
    if (!descriptions || !Array.isArray(descriptions) || descriptions.length === 0) {
      return res.status(400).json({ error: 'Invalid descriptions data.' });
    }
  
    // Start a transaction
    connection.beginTransaction(function (err) {
      if (err) {
        console.error('Error beginning transaction:', err);
        return res.status(500).json({ error: 'Failed to begin transaction.' });
      }
  
      const sql = 'INSERT INTO varients (variant) VALUES ?'; // Note the change in SQL query
  
      // Prepare the data for insertion
      const valuesToInsert = descriptions.map((description) => [description]);
  
      // Insert descriptions within the transaction
      connection.query(sql, [valuesToInsert], (err, result) => {
        if (err) {
          console.error('Error adding descriptions:', err);
  
          // Rollback the transaction in case of an error
          connection.rollback(function () {
            console.error('Transaction rolled back.');
            res.status(500).json({ error: 'Failed to add descriptions.' });
          });
        } else {
          // Commit the transaction if there are no errors
          connection.commit(function (err) {
            if (err) {
              console.error('Error committing transaction:', err);
              connection.rollback(function () {
                console.error('Transaction rolled back.');
                res.status(500).json({ error: 'Failed to commit transaction.' });
              });
            } else {
              console.log('Descriptions added successfully.');
              res.status(201).json({ message: 'Descriptions added successfully.' });
            }
          });
        }
      });
    });
  });
  

app.get('/product/variants/:productName', (req, res) => {
  const { productName } = req.params;
  const sql = 'SELECT variant FROM productview WHERE productName = ?';

  connection.query(sql, [productName], (err, results) => {
    if (err) {
      console.error('Error fetching variants:', err);
      res.status(500).json({ error: 'Failed to fetch variants.' });
    } else {
      const variants = results.map((result) => result.variant);
      res.status(200).json({ variants });
    }
  });
});
app.post('/purchase', (req, res) => {
  const { productName, variantValues } = req.body;

  const sql = "INSERT INTO variantvalues (productid, variant, value) VALUES ?";

  const valuesToInsert = Object.entries(variantValues).map(([variant, value]) => [
    productName,
  
    variant,
    value,
  ]);

  connection.query(sql, [valuesToInsert], (err, result) => {
    if (err) {
      console.error('Error inserting purchase data:', err);
      res.status(500).json({ error: 'Failed to save purchase data.' });
    } else {
      res.status(200).json({ message: 'Purchase data saved successfully.' });
    }
  });
});

app.get('/productsfetch', (req, res) => {
  connection.query('SELECT productName FROM products1', (error, rows) => {
    if (error) {
      console.error('Error fetching products from MySQL:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const products = rows.map((row) => row.productName);
      res.json({ products });
    }
  });
});

  // Endpoint to fetch variants based on the selected product
  app.get('/variants1', (req, res) => {
    const { product } = req.query;
    console.log(product)
    const sql = 'SELECT DISTINCT variant FROM productview WHERE productName = ?';
  
    connection.query(sql, [product], (err, result) => {
      if (err) {
        console.error('Error fetching variants from MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const variants = result.map((row) => row.variant);
        res.json({ variants });
      }
    });
  });



// Endpoint to save the purchase data
// Endpoint to save the purchase data
//// Endpoint to save the purchase data
app.post('/purchase', (req, res) => {
  const { productName, variantValues } = req.body;

  const sql = "INSERT INTO `variantvalues` (productid, variant, value) VALUES ?";

  const valuesToInsert = Object.entries(variantValues).map(([variant, value]) => [
    productName,
  
    variant,
    value,
  ]);

  connection.query(sql, [valuesToInsert], (err, result) => {
    if (err) {
      console.error('Error inserting purchase data:', err);
      res.status(500).json({ error: 'Failed to save purchase data.' });
    } else {
      res.status(200).json({ message: 'Purchase data saved successfully.' });
    }
  });
});




  
app.get('/variants/:productId', (req, res) => {
  const { productId } = req.params;

  // Replace 'variants' and 'variant_description' with your actual table and column names
  const sql = 'SELECT variant FROM productview WHERE productid = ?';

  connection.query(sql, [productId], (err, result) => {
    if (err) {
      console.error('Error fetching variants:', err);
      return res.status(500).json({ error: 'Failed to fetch variants.' });
    }

    // Extract the variant descriptions from the result
    const variants = result.map((row) => row.description);

    res.status(200).json(variants);
  });
});
app.get('/variant/values/:variantName', (req, res) => {
  const { variantName } = req.params;

  // Query the database to get values for the specified variant
  const sql ='SELECT value FROM `variantvalues` WHERE variant = ?'
  connection.query(sql, [variantName],(err, results) => {
      if (err) {
        console.error('Error fetching variant values:', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      const values = results.map((row) => row.value);
      res.json({ values });
    }
  );
});
// Define an API endpoint to save variants
app.post('/addvariants',  (req, res) => {
  try {
    const { productId, variantDescriptions } = req.body;

    if (!productId || !Array.isArray(variantDescriptions)) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    // Insert the variants into the database
    for (const description of variantDescriptions) {
       connection.query('INSERT INTO varients (variant, productid) VALUES (?, ?)', [description, productId]);
    }

    res.status(201).json({ message: 'Variants added successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



//search here 
// Handle search requests
app.get('/search', (req, res) => {
  const { query } = req.query;

  
  const sql = `SELECT * FROM products1 WHERE productName LIKE '%${query}%'`;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error during search:', err);
      return res.status(500).json({ error: 'Search failed' });
    }

    res.json({ results });
  });
});

// // Route for fetching variants for a product
// app.get('/product/:productId/variants', (req, res) => {
//   const { productId } = req.params;

//   // Replace with your database query to fetch variants
//   const variantsQuery = `SELECT variant FROM varients WHERE productid = ${productId} `;

//   connection.query(variantsQuery, (err, results) => {
//     if (err) {
//       console.error('Error fetching variants:', err);
//       res.status(500).json({ error: 'Failed to fetch variants.' });
//     } else {
//       res.json({ variants: results.map((row) => row.variant) });
//     }
//   });
// });


// // Route for fetching variant values
// app.get('/variants/:variant/values', (req, res) => {
//   const { variant } = req.params;

//   // Replace with your database query to fetch values for a variant
//   const valuesQuery = `SELECT \`value\` FROM \`variantvalues\` WHERE \`variant\` = '${variant}'`;

//   connection.query(valuesQuery, (err, results) => {
//     if (err) {
//       console.error('Error fetching variant values:', err);
//       res.status(500).json({ error: 'Failed to fetch values.' });
//     } else {
//       res.json({ values: results.map((row) => row.value) });
//     }
//   });
// });

//add varinat value 
// Route to fetch variants for a specific product
app.get('/product/:productName/variants', (req, res) => {
  const productName = req.params.productName;
  const sql = 'SELECT variants FROM products1 WHERE productName = ?';
  connection.query(sql, [productName], (err, results) => {
    if (err) {
      console.error('Error fetching variants:', err);
      res.status(500).json({ error: 'Failed to fetch variants' });
      return;
    }
    if (results.length === 0 || !results[0].variants) {
      res.status(404).json({ error: 'Product not found or no variants available' });
    } else {
      const variants = results[0].variants.split(',').map(variant => variant.trim());
      res.json({ variants });
    }
  });
});

// Route to update variant values for a specific product
app.post('/product/:productName/update-variant-values', (req, res) => {
  const productName = req.params.productName;
  const { variantValues } = req.body;

  const sql = 'UPDATE products1 SET variantValues = ? WHERE productName = ?';

  connection.query(sql, [variantValues, productName], (err, results) => {
    if (err) {
      console.error('Error updating variant values:', err);
      res.status(500).json({ error: 'Failed to update variant values' });
      return;
    }
    res.json({ message: 'Variant values updated successfully' });
  });
});



//delete variants selection 

app.get('/variants1/:productId', (req, res) => {
  const { productId } = req.params;
  const sql = 'SELECT variant FROM varients WHERE productid = ?';

  connection.query(sql, [productId], (err, results) => {
    if (err) {
      console.error('Error fetching variants:', err);
      return res.status(500).json({ error: 'Failed to fetch variants.' });
    }

    // Extract the variant descriptions from the results
    const variant = results.map((row) => row.variant);

    res.status(200).json(variant);
  });
});

// Define a route to handle the DELETE request
app.delete('/variants/delete', (req, res) => {
  const { variantIds } = req.body;

  // Check if variantIds is an array
  if (!Array.isArray(variantIds) || variantIds.length === 0) {
    return res.status(400).json({ error: 'Invalid variant IDs provided' });
  }

  // Construct a SQL query to delete the selected variants
  const deleteQuery = 'DELETE FROM varients WHERE variant IN (?)';

  connection.query(deleteQuery, [variantIds], (err, result) => {
    if (err) {
      console.error('Error deleting variants:', err);
      return res.status(500).json({ error: 'Failed to delete variants' });
    }

    // Successful deletion
    res.status(200).json({ message: 'Variants deleted successfully' });
  });
});


app.get('/report', (req, res) => {
  connection.query('SELECT * FROM products1', (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    } else {
      res.json(results);
    }
  });
});
app.get('/productsfetch', (req, res) => {
  connection.query('SELECT productName FROM products', (error, rows) => {
    if (error) {
      console.error('Error fetching products from MySQL:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const products = rows.map((row) => row.productName);
      res.json({ products });
    }
  });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

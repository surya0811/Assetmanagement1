const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const svgCaptcha = require('svg-captcha');
const session = require('express-session');

const app = express();
const port = 3000; // You can change this to your desired port

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
  })
);

const connection =   mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'manager',
    database: 'assetmanagement'
});

connection.connect();

app.get('/api/products/count', (req, res) => {
  const query = 'SELECT COUNT(*) as count FROM products'; // Replace 'products' with your actual table name

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
  const query = 'SELECT * FROM products'; // Replace 'products' with your actual table name

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
  const alphabets = 'ABCDEFG234HIJKLMNOPQRSTU#$%^&*_VWXYZ0156789!@';
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

app.post('/loginform', (req, res) => {
  const { username, password, usertype, userEnteredCaptcha } = req.body;

  // Verify the user-entered CAPTCHA text
  if (userEnteredCaptcha !== req.session.captcha) {
    res.status(400).json({ message: 'CAPTCHA verification failed' });
    return;
  }

  let query = '';
  if (usertype === 'user') {
    query = `SELECT * FROM userlogin WHERE username = ? AND password = ?`;
  } else if (usertype === 'admin') {
    query = `SELECT * FROM adminlogin WHERE username = ? AND password = ?`;
  } else {
    res.status(400).json({ message: 'Invalid user type' });
    return;
  }

  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error('Error querying the database:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.length > 0) {
      // Here, you can generate a JWT token upon successful login and send it in the response
      const id = results[0].id;
      const token = jwt.sign({ id }, 'jwt-secret-key', { expiresIn: '1d' });
      res.cookie('token', token);
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ Error: 'You are not Authenticated' });
  } else {
    jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ Error: 'Token is invalid' });
      }
      next();
    });
  }
};app.get('/dashboard', verifyUser, (req, res) => {
  return res.json({ Status: "Success" })
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

app.get('/assesst', (req, res) => {
    const sql = 'SELECT * FROM products';
    connection.query(sql, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
  
  app.post('/addproduct', (req, res) => {
    const { id, productName } = req.body;
  
    // Check if a product with the same 'productid' already exists
    const checkProductQuery = 'SELECT COUNT(*) as count FROM products WHERE productid = ?';
  
    connection.query(checkProductQuery, [id], (checkError, checkResults) => {
      if (checkError) {
        console.error('Error checking product existence:', checkError);
        return res.status(500).json({ error: 'Failed to check product existence.' });
      }
  
      const productExists = checkResults[0].count > 0;
  
      if (productExists) {
        // Product with the same 'productid' already exists, handle accordingly
        return res.status(400).json({ error: 'Product with the same ID already exists.' });
      }
  
      // Product with 'productid' doesn't exist, proceed with insertion
      const insertProductQuery = 'INSERT INTO products (productid, productName) VALUES (?, ?)';
  
      connection.query(insertProductQuery, [id, productName], (insertError, insertResults) => {
        if (insertError) {
          console.error('Error adding product:', insertError);
          return res.status(500).json({ error: 'Failed to add product.' });
        }
  
        res.json({ message: 'Product added successfully' });
      });
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




// Endpoint to save the purchase data
// Endpoint to save the purchase data
//// Endpoint to save the purchase data
app.post('/purchase', (req, res) => {
  const { productName, variantValues } = req.body;

  const sql = "INSERT INTO `variantvalues` (productname, variant, value) VALUES ?";

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

  
  const sql = `SELECT * FROM products WHERE productName LIKE '%${query}%'`;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error during search:', err);
      return res.status(500).json({ error: 'Search failed' });
    }

    res.json({ results });
  });
});

// Route for fetching variants for a product
app.get('/product/:productId/variants', (req, res) => {
  const { productId } = req.params;

  // Replace with your database query to fetch variants
  const variantsQuery = `SELECT variant FROM varients WHERE productid = ${productId} `;

  connection.query(variantsQuery, (err, results) => {
    if (err) {
      console.error('Error fetching variants:', err);
      res.status(500).json({ error: 'Failed to fetch variants.' });
    } else {
      res.json({ variants: results.map((row) => row.variant) });
    }
  });
});


// Route for fetching variant values
app.get('/variants/:variant/values', (req, res) => {
  const { variant } = req.params;

  // Replace with your database query to fetch values for a variant
  const valuesQuery = `SELECT \`value\` FROM \`variantvalues\` WHERE \`variant\` = '${variant}'`;

  connection.query(valuesQuery, (err, results) => {
    if (err) {
      console.error('Error fetching variant values:', err);
      res.status(500).json({ error: 'Failed to fetch values.' });
    } else {
      res.json({ values: results.map((row) => row.value) });
    }
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
  connection.query('SELECT * FROM filterview', (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

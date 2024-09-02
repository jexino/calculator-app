const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Set Handlebars as the view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Route to render the calculator page
app.get('/', (req, res) => {
  res.render('index', { title: 'Simple Calculator' });
});

// Route to handle form submission and perform calculations
app.post('/calculate', (req, res) => {
  const { number1, number2, operation } = req.body;
  let result;

  // Convert input to numbers
  const num1 = parseFloat(number1);
  const num2 = parseFloat(number2);

  // Perform calculation based on the operation
  switch (operation) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      result = num1 / num2;
      break;
    default:
      result = 'Invalid operation';
      break;
  }

  // Render the index page with the result
  res.render('index', { title: 'Simple Calculator', result });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

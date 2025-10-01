const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('🚀 Backend server is running on port', PORT);
  console.log('🌐 API available at: http://localhost:' + PORT + '/api');
  console.log('🔗 Products API: http://localhost:' + PORT + '/api/products');
});
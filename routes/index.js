var express = require('express');
var router = express.Router();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgres://xnmuplgazveahe:4cf62b4cf199b49baddc568243fc9772bb84d5392b1942bf86b20e092a249fab@ec2-75-101-138-26.compute-1.amazonaws.com:5432/d9f4g8c2bgj6gg',
  ssl: true
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TING' });
});

router.get('/playlist', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM playlist');
      const results = { 'results': (result) ? result.rows : null};
      res.render('playlist', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });

module.exports = router;

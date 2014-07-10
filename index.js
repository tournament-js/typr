module.exports = process.env.TYPR_COV
  ? require('./lib-cov/typr.js')
  : require('./lib/typr.js');

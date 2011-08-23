var tests = require(__dirname + '/core')
  , Benchmark = require('benchmark')
  , suite = new Benchmark.Suite;

suite.add('textile', function() {
  tests.run(require(__dirname + '/../lib/stextile'));
})
.on('cycle', function(event, bench) {
  console.log(String(bench));
})
.on('complete', function() {
})
.run(true);


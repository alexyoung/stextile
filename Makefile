sample:
	@./bin/stextile test/fixtures/sample.textile

test:
	node test/test.js

benchmark:
	node test/benchmark.js

.PHONY: test

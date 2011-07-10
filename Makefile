TESTS = test/*.js

sample:
	@./bin/stextile test/fixtures/sample.textile	 

test:
	node $(TESTS)

.PHONY: test

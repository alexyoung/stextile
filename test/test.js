var assert = require('assert')
  , textile = require(__dirname + '/../lib/stextile');

// Paragraphs
assert.equal('<p>A paragraph</p>\n', textile('A paragraph\n'));
assert.equal('<p>A paragraph</p>\n', textile('p. A paragraph\n'));
assert.equal('<p style="text-align: center">A paragraph</p>\n', textile('p=. A paragraph\n'));

// Headers
assert.equal('<h3>Hello World</h3>\n', textile('h3. Hello World'));
assert.equal('<h3>Hello World</h3>\n<h4>Deeper</h4>\n', textile('h3. Hello World\nh4. Deeper'));
assert.equal('<h3>Hello World</h3>\n<p>Hello again.</p>\n', textile('h3. Hello World\n\nHello again.\n'));

// Links with fullstops
assert.equal('<p><a href="http://example.com">Example</a>.</p>\n', textile('"Example":http://example.com.'));

// Commas
assert.equal('<p><a href="http://example.com">Example</a>, text</p>\n', textile('"Example":http://example.com, text'));

// Links
assert.equal('<p><a href="http://example.com">Example</a></p>\n', textile('"Example":http://example.com'));
assert.equal('<p><a title="Title" href="http://example.com">Example</a></p>\n', textile('"Example (Title)":http://example.com'));

// Multiple links
assert.equal(
  '<p><a href="http://example.com">Example</a> and <a href="http://example.com/2">Example 2</a></p>\n',
  textile('"Example":http://example.com and "Example 2":http://example.com/2')
);

// Bold
assert.equal('<p>Some <strong>bold text</strong> here</p>\n', textile('Some *bold text* here'));
assert.equal('<p>Some <em>emphasised text</em> here</p>\n', textile('Some _emphasised text_ here'));

// Unordered lists
assert.equal('<ul>\n<li>A list item</li>\n</ul>\n', textile('* A list item\n'));

// Lists with links
assert.equal('<ul>\n<li><a href="http://dailyjs.com/2010/11/01/node-tutorial/">Part 1: Introduction</a></li>\n</ul>\n', textile('* "Part 1: Introduction":http://dailyjs.com/2010/11/01/node-tutorial/\n'));
assert.equal(
  '<ul>\n<li><a href=\"http://dailyjs.com/2010/11/01/node-tutorial/\">Part 1: Introduction</a>  </li>\n<li><a href=\"http://dailyjs.com/2010/11/08/node-tutorial-2/\">Part 2: Installation and Skeleton App</a>, source code commit: <a href=\"https://github.com/alexyoung/nodepad/commit/4ea936b4b426012528fc722c7576391b48d5a0b7\">4ea936b</a>',
  textile('* "Part 1: Introduction":http://dailyjs.com/2010/11/01/node-tutorial/\n* "Part 2: Installation and Skeleton App":http://dailyjs.com/2010/11/08/node-tutorial-2/, source code commit: "4ea936b":https://github.com/alexyoung/nodepad/commit/4ea936b4b426012528fc722c7576391b48d5a0b7')
);

// Blockquotes
assert.equal('<blockquote>A quote</blockquote>\n', textile('bq. A quote\n'));
assert.equal('<blockquote class="example">A quote</blockquote>\n', textile('bq(example). A quote\n'));
assert.equal('<blockquote lang="en">A quote</blockquote>\n', textile('bq[en]. A quote\n'));

// Tables
assert.equal('<table>\n<tr>\n<td>A</td></tr>\n<tr>\n<td>B</td></tr>\n</table>\n', textile('|A|\n|B|\n'));
assert.equal('<table>\n<tr>\n<td>A</td><td>B</td></tr>\n<tr>\n<td>C</td><td>D</td></tr>\n</table>\n', textile('|A|B|\n|C|D|\n'));
assert.equal('<table style="color: red">\n<tr>\n<td>A</td></tr>\n<tr>\n<td>B</td></tr>\n</table>\n', textile('table{color: red}.\n|A|\n|B|\n'));

// Entity replacement

// Interleaved quotes
assert.equal('<p>&#8216;It&#8217;s clear that the fox said &#8220;hello&#8221;.&#8217;</p>\n', textile('\'It\'s clear that the fox said "hello".\'\n'));

// Preformatted
assert.equal('<pre>This !is!\n code</pre>\n', textile('<pre>This !is!\n code</pre>'));
assert.equal('<p><code>This is code</code></p>\n', textile('<code>This is code</code>'));
assert.equal('<p><code>This !is! code</code></p>\n', textile('<code>This !is! code</code>'));
assert.equal('<pre class="prettyprint lang-js">This "is"\n \'code\'</pre>\n', textile('<pre class="prettyprint lang-js">This "is"\n \'code\'</pre>'));
assert.equal('<pre class="prettyprint lang-js">\nThis "is"\n \'code\'\n</pre>\n', textile('<pre class="prettyprint lang-js">\nThis "is"\n \'code\'\n</pre>'));

// Images
assert.equal('<p><img src="/example.png" alt="" /></p>\n', textile('!/example.png!'));

// With alt attributes
assert.equal('<p><img src="/example.png" alt="alt attr" /></p>\n', textile('!/example.png(alt attr)!'));

// Multiple images
assert.equal('<p><img src="/images/posts/cluster_live.png" alt="" /></p>\n<p>More text</p>\n<p><img src="/example.png" alt="" /></p>\n', textile('!/images/posts/cluster_live.png!\nMore text\n!/example.png!'));

// Not a valid image
assert.equal('<p>OMG@!?!</p>\n', textile('OMG@!?!\n'));

// Similar but valid
assert.equal('<p><img src="?img=example.png" alt="" /></p>\n', textile('!?img=example.png!'));

// A more involved example: Don't match inside tags
assert.equal('<p><img src="http://www.assoc-amazon.com/e/ir?t=da07e-20&l=as2&o=1&a=0596517742" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></p>\n', textile('<img src="http://www.assoc-amazon.com/e/ir?t=da07e-20&l=as2&o=1&a=0596517742" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />'));

var imgTagsTextile = 'I just finished reading "OOP The Good Parts: Message Passing, Duck Typing, Object Composition, and not Inheritance":http://fitzgeraldnick.com/weblog/39/ by Nick Fitzgerald.  Obvious references to Douglas Crockford\'s <a href="http://www.amazon.com/gp/product/0596517742?ie=UTF8&tag=da07e-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0596517742">JavaScript: The Good Parts</a><img src="http://www.assoc-amazon.com/e/ir?t=da07e-20&l=as2&o=1&a=0596517742" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /> aside, the article builds on some interesting points by authors like Raganwald that will resonate with many DailyJS readers:'

var imgTagsHTML = '<p>I just finished reading <a href="http://fitzgeraldnick.com/weblog/39/">OOP The Good Parts: Message Passing, Duck Typing, Object Composition, and not Inheritance</a> by Nick Fitzgerald.  Obvious references to Douglas Crockford&#8217;s <a href="http://www.amazon.com/gp/product/0596517742?ie=UTF8&tag=da07e-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0596517742">JavaScript: The Good Parts</a><img src="http://www.assoc-amazon.com/e/ir?t=da07e-20&l=as2&o=1&a=0596517742" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /> aside, the article builds on some interesting points by authors like Raganwald that will resonate with many DailyJS readers:</p>\n';

assert.equal(imgTagsHTML, textile(imgTagsTextile));


## What Exactly ARE Params?
Params (short for "parameters") are the variable parts of your URL that get captured by the square brackets [] in your file name.
Example:

File: app/posts/[id]/page.js

URL: /posts/123

Result: params = { id: "123" }

File: app/users/[username]/posts/[postId]/page.js

URL: /users/john/posts/456

Result: params = { username: "john", postId: "456" }
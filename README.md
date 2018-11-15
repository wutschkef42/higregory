# A little REST API in node.js
Hi Gregory,
this is a Todo List API I wrote as a proof of concept. It took me rougly 12 hours to make, could be quicker, but I am not very experienced with mongodb and had to spend some time figuring out how to represent relations between documents.

## Resources
### Users
Users can register and login to obtain JWT that grants them access to resources their own for a period of 24 hours after which the token must be renewed.
### TodoItems
TodoItems represent tasks. They store the task name, creation date and status.
### TodoLists
TodoLists have a one-to-many relationship with TodoItems. Each list contains an array of items (mongoose subdocuments). Lists are owned by their creator and can only be accessed if the JWT matches the creator's userId.
## Routes
### Authentication
post `/register`

request body must contain username, email and password. returns JWT.

post `/login`

request body must contain username and password. returns JWT.

get `/logout`

revokes JWT

### User
get `/users`

returns list of all users (should require admin privilege, not yet implemented)

get `/users/:userId`

returns a single user

put `/users/:userId`

updates a single user

delete `/users/:userId`

deletes a single user

### todoList
get `/lists`

returns all existing lists (should require admin privilege, not yet implemented)

post `/lists` 

creates a list owned by the requesting userID

delete `/lists`

deletes a list owned by the requesting userID

get `/lists/:listId`

reads a list

post `/lists/:listId`

request body must contain name of new todoItem. Adds item to list.

delete `/lists/:listId`

deletes item from list

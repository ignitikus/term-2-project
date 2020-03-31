# This is Term 2 Project @CodeImmersives

[Link to project on heroku](https://nikocode-term2-project.herokuapp.com)

Some of the packages used in this project: 

[Method override](https://www.npmjs.com/package/method-override) - allows to use HTTP verbs (PUT and DELETE) on a client side

[bcryptjs](https://www.npmjs.com/package/bcryptjs) - password encryption

[News Api](https://newsapi.org) - Provides news headlines

[Socket IO](socket.io) - allows real-time communication between the server and thec lient

Available routes:
   * `/` - main page accessible only after authorization. Features: latest 'covid-19' related news, user posts, and live chat.
   * `/logout` - logs out user and destroys session.

   * `/api/users/` 
      * GET
         * `/login` - login and register forms.
         * `/profile` - profile loaded with features dependent on a role (user or admin)
      * POST
         * `/login` - submits login form and check if user is in the database. If not redirects back and flashes error message
         * `/register` - submits register form, checks all fields, looks for duplicate based on email.
         * `/createpost` - submits form to create a new post in database
         * `/add-comment/:id/:user` - submits form to make a comment under specific post. `:id` - unique id of a post. `:user` - users id
      * PUT
         * `/update-profile` - submits form to update user information in database
         * `/update-password` - submits form to update user's password in database
   
   * `/api/admin` - validation implemented based on account role. 
      * PUT
         * `/update-visibility/:id` - admin account has ability to change visibility for every user post(`:id` - id of a post). Upon changing visibility, post no longer will be present in *posts* tab but still be visible in profile section
      * DELETE
         * `/delete-user/:email` - deletes a user from database. `:email` - users email has to match with database
         * `delete-post/:postId` - deletes a post from database
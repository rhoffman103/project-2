# The BlueIt Social Media Application
![md-blueit-logo.png](/public/images/md-blueit-logo.png "BlueIt")
## BlueIt Team:
* **Team Leader** Bobby Hoffman
* Declan Morrison
* Scott Sawyer
* Andrew Harding

BlueIt is a public forum that let's you speak your mind, and see what others in your area are talking about. You can search by topic, username, or location. **Hosted** by Heroku, **Run** with Express-Handlebars, **Powered** by it's users.

## Used Technologies
* Passport.js
* Bcrypt
* Geolocator
* Materialize
* Body-Parser
* Express
* Express-Handlebars
* Express-Session
* MySQL
* Sequelize

Creating an account with BlueIt allows you to post to your local area or by topic. Every post you make can be given one or more topics to help sort it in the BlueIt database. Every post you make will be tied to your username.

![md-make-post.png](/public/images/md-make-post.png "Make a Post")

You can also filter through other posts, see what people are saying, when and where. Your main feed defaults to you location, found with Geolocator. The feed is then popuated with all posts from the same location and displays them, newest to oldest. You can also apply filters to your feed from the filters toolbar. Setting one or more topics will filter the posts in your feed to only include those related to the selected topics. You can order the posts to display based on their rating by other users. And you can limit the posts you see to a specific username.

![md-filter-bar.png](/public/images/md-filter-bar.png "Filter Bar")

The BlueIt community is about sharing experiences with others, whether they're 10 miles away or 10,000.

![md-make-post.png](/public/images/md-post-feed.png "Make a Post")
## money manager

Send POST request to https://moneymanagerapp2.herokuapp.com/register to REGISTER.

it accepts email and password as the request body 

Once successfully registered, an email is sent to the user to activate their account

Send POST request to https://moneymanagerapp2.herokuapp.com/login with (email and password) to LOGIN after Activation.

it returns the user details and a token, the token is also set to the cookies and "token"

Send GET request to https://moneymanagerapp2.herokuapp.com/posts to get all the posts

it returns an array of posts available or empty array if no post

Send POST request to https://moneymanagerapp2.herokuapp.com/posts with (amount, category, type, color, and date) as request body in order to CREATE a new post

Send GET request to https://moneymanagerapp2.herokuapp.com/posts/{{post id}} to get a particular post

Send DELETE request to https://moneymanagerapp2.herokuapp.com/posts/{{post id}} to delete a particular post

**GET [http://localhost:8080/api/user/login](http://localhost:8080/api/user/login)**


<table>
  <tr>
   <td>Body
   </td>
   <td>{
<p>
	"username" : "bochacho2",
<p>
	"password" : "newpass"
<p>
}
   </td>
  </tr>
  <tr>
   <td>201
<p>
Success
   </td>
   <td>{
<p>
	"userObj": {
<p>
    	"_id": "65d9ec0ab81f4499fdc5191c",
<p>
    	"username": "bochacho2",
<p>
    	"pictures": [],
<p>
    	"interestedIn": [],
<p>
    	"interests": [],
<p>
    	"__v": 2,
<p>
    	"dislikes": [
<p>
        	"65d6171b9f621c3a1f0cb028"
<p>
    	],
<p>
    	"likes": {}
<p>
	},
<p>
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ5ZWMwYWI4MWY0NDk5ZmRjNTE5MWMiLCJpYXQiOjE3MDk3NjY4OTYsImV4cCI6MTcwOTg1MzI5Nn0.rV_WojsHdm6ucK--DmiabhxGY7x3H1DzA6cOTsbu8gY"
<p>
}
   </td>
  </tr>
</table>




**POST** [http://localhost:8080/api/user/create_user](http://localhost:8080/api/user/create_user)


<table>
  <tr>
   <td>Body
   </td>
   <td>{
<p>
"data": {"username": "matchTest2",
<p>
"password": "tempPass",
<p>
"interests": ["Jordans", "Rick & Morty", "Water", "Painting"],
<p>
}
<p>
}
<p>
Optional Fields to add in data: \
DOB(as new Date("2000-04-18"))
<p>
showUsersLookingFor'
<p>
'matchWith'
<p>
'gender'
<p>
'interestedIn'
<p>
'bio'
<p>
'interests'
   </td>
  </tr>
  <tr>
   <td>201 Success
   </td>
   <td>{
<p>
	"userObj": {
<p>
    	"username": "matchTest3",
<p>
    	"pictures": [],
<p>
    	"dislikes": [],
<p>
    	"interestedIn": [],
<p>
    	"interests": [
<p>
        	"Jordans",
<p>
        	"Rick & Morty",
<p>
        	"Water",
<p>
        	"Painting"
<p>
    	],
<p>
    	"_id": "65ea1cea3694cf04fb2d2a0d",
<p>
    	"__v": 0
<p>
	},
<p>
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVhMWNlYTM2OTRjZjA0ZmIyZDJhMGQiLCJpYXQiOjE3MDk4NDE2NDIsImV4cCI6MTcwOTkyODA0Mn0.hHKxyrDkhavb0iDRBGwgLCqroBUzFTJ6aSlrJ4i-IOg"
<p>
}
   </td>
  </tr>
</table>




**GET** [http://localhost:8080/api/user/getMatches](http://localhost:8080/api/user/getMatches)


<table>
  <tr>
   <td>Header
   </td>
   <td>Authorization: “Bearer JWT_Token”
   </td>
  </tr>
  <tr>
   <td>Body
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>201 Success
   </td>
   <td>{
<p>
	"listUsers": [
<p>
    	{
<p>
        	"_id": "65d617479f621c3a1f0cb04c",
<p>
        	"username": "user20",
<p>
        	"interests": [
<p>
            	"Cycling",
<p>
            	"Yoga",
<p>
            	"Gardening"
<p>
        	      ],
<p>
        	"commonInterestsCount": 0
<p>
    	},
<p>
    … (30 results)
<p>
    ]
<p>
}
   </td>
  </tr>
</table>




**GET** [http://localhost:8080/api/user/getUser](http://localhost:8080/api/user/getUser)


<table>
  <tr>
   <td>Header
   </td>
   <td>Authorization: “Bearer JWT_Token”
   </td>
  </tr>
  <tr>
   <td>Body
   </td>
   <td>{
<p>
	"_id": "65d903244b1f31e1e4f813fa"
<p>
}
   </td>
  </tr>
  <tr>
   <td>201 Success
   </td>
   <td>{
<p>
	"userObj": {
<p>
    	"_id": "65d903244b1f31e1e4f813fa",
<p>
    	"username": "bochacho",
<p>
    	"pictures": [
<p>
        	"https://m.media-amazon.com/images/M/MV5BNGJmMWEzOGQtMWZkNS00MGNiLTk5NGEtYzg1YzAyZTgzZTZmXkEyXkFqcGdeQXVyMTE1MTYxNDAw._V1_.jpg"
<p>
    	],
<p>
    	"interestedIn": [],
<p>
    	"interests": [
<p>
        	"Cooking",
<p>
        	"Painting",
<p>
        	"Rock Climbing"
<p>
    	],
<p>
    	"__v": 4,
<p>
    	"dislikes": [
<p>
        	"65d6171a9f621c3a1f0cb024",
<p>
        	"65d617489f621c3a1f0cb062"
<p>
    	],
<p>
    	"likes": {}
<p>
	}
<p>
}
   </td>
  </tr>
</table>




**POST** [http://localhost:8080/api/user/modifyUser](http://localhost:8080/api/user/modifyUser)


<table>
  <tr>
   <td>Header
   </td>
   <td>Authorization: “Bearer JWT_Token”
   </td>
  </tr>
  <tr>
   <td>Body
   </td>
   <td>{
<p>
"password" : "newPass",
<p>
"currentPassword" : "tempPass",
<p>
"DOB": "2000-04-18"
<p>
}
   </td>
  </tr>
  <tr>
   <td>201 Success
   </td>
   <td>{
<p>
	"userObj": {
<p>
    	"_id": "65ea1cea3694cf04fb2d2a0d",
<p>
    	"username": "matchTest3",
<p>
    	"pictures": [],
<p>
    	"dislikes": [],
<p>
    	"interestedIn": [],
<p>
    	"interests": [
<p>
        	"Jordans",
<p>
        	"Rick & Morty",
<p>
        	"Water",
<p>
        	"Painting"
<p>
    	],
<p>
    	"__v": 0,
<p>
    	"DOB": "2000-04-18T00:00:00.000Z"
<p>
	},
<p>
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhMWNlYTM2OTRjZjA0ZmIyZDJhMGQiLCJpYXQiOjE3MDk4NDI1NDcsImV4cCI6MTcwOTkyODk0N30.2rQufusgnh4cn35baD8zkunE--8xZDK_f6yZdCAlJVo"
<p>
}
   </td>
  </tr>
</table>




**POST** [http://localhost:8080/api/user/likeDislike](http://localhost:8080/api/user/likeDislike) \



<table>
  <tr>
   <td>Header
   </td>
   <td>Authorization: “Bearer JWT_Token”
   </td>
  </tr>
  <tr>
   <td>Body
   </td>
   <td>{
<p>
	"_id": "65d6171b9f621c3a1f0cb028",
<p>
	"like": true
<p>
}
   </td>
  </tr>
  <tr>
   <td>201 Success
   </td>
   <td>{
<p>
	"message": "Great Success"
<p>
}
   </td>
  </tr>
  <tr>
   <td>400 Bad Request
   </td>
   <td>{
<p>
	"message": "User already liked."
<p>
}
   </td>
  </tr>
  <tr>
   <td>404 Not Found
   </td>
   <td>{
<p>
	"message": "Who you tryna contact? The wind?"
<p>
}
   </td>
  </tr>
</table>


404 - when the userID is invalid or not given in the body

If “like” is not given it defaults to dislike



**POST** [http://localhost:8080/api/user/likeDislike](http://localhost:8080/api/user/likeDislike) \



<table>
  <tr>
   <td>Header
   </td>
   <td>Authorization: “Bearer JWT_Token”
   </td>
  </tr>
  <tr>
   <td>Body
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>201 Success
   </td>
   <td>{
<p>
	"likedUsers": [
<p>
    	"65d6171a9f621c3a1f0cb024",
<p>
    	"65d6171b9f621c3a1f0cb028"
<p>
	]
<p>
}
   </td>
  </tr>
</table>


404 - when the userID is invalid or not given in the body

If “like” is not given it defaults to dislike

**GET** [http://localhost:8080/api/user/getCatches](http://localhost:8080/api/user/getCatches)


<table>
  <tr>
   <td>Header
   </td>
   <td>Authorization: “Bearer JWT_Token”
   </td>
  </tr>
  <tr>
   <td>Body
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>201 Success
   </td>
   <td>{
<p>
	"catches": {
<p>
    	"65d6171a9f621c3a1f0cb024": “65d6171a9f636l1d1f0qf331”,
<p>
    	"65d6171b9f621c3a1f0cb028": "65d6171b9q621d7a1f0cb991"
<p>
	}
<p>
}
   </td>
  </tr>
</table>


201 - 

catches: {

	userID: convoID

}

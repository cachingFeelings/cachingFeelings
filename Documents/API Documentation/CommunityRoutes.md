**GET** [http://localhost:8080/api/community/getPosts](http://localhost:8080/api/community/getPosts)


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
   <td>“posts”: [
<p>
    {
<p>
        “author” : userID,
<p>
        “title” : string,
<p>
        “body” :string,
<p>
        “likes” : [userID],
<p>
        “dislikes” : [userID],
<p>
        “timeStamp” : Date,
<p>
        “reportedBy” : [userID],
<p>
        “˙hide” :boolean
<p>
    }
<p>
]
   </td>
  </tr>
</table>




**POST** [http://localhost:8080/api/community/newPosts](http://localhost:8080/api/community/getPosts)


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
        “title” : string,
<p>
        “body” :string,
<p>
}
   </td>
  </tr>
  <tr>
   <td>201 Success
   </td>
   <td>{
<p>
        “_id” : postID
<p>
        “author” : userID,
<p>
        “title” : string,
<p>
        “body” :string,
<p>
        “likes” : [userID],
<p>
        “dislikes” : [userID],
<p>
        “timeStamp” : Date,
<p>
        “reportedBy” : [userID],
<p>
        “˙hide” :boolean
<p>
}
   </td>
  </tr>
</table>




**POST** [http://localhost:8080/api/community/likeDislike](http://localhost:8080/api/community/likeDislike)


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
        “postID” : postID
<p>
        “like” : boolean
<p>
}
   </td>
  </tr>
  <tr>
   <td>201 Success
   </td>
   <td>{
<p>
        “_id” : postID
<p>
        “author” : userID,
<p>
        “title” : string,
<p>
        “body” :string,
<p>
        “likes” : [userID],
<p>
        “dislikes” : [userID],
<p>
        “timeStamp” : Date,
<p>
        “reportedBy” : [userID],
<p>
        “˙hide” :boolean
<p>
}
   </td>
  </tr>
</table>




**POST** [http://localhost:8080/api/community/report](http://localhost:8080/api/community/report)


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
        “postID” : postID
<p>
        “report” : boolean
<p>
}
   </td>
  </tr>
  <tr>
   <td>201 Success
   </td>
   <td>{
<p>
        “_id” : postID
<p>
        “author” : userID,
<p>
        “title” : string,
<p>
        “body” :string,
<p>
        “likes” : [userID],
<p>
        “dislikes” : [userID],
<p>
        “timeStamp” : Date,
<p>
        “reportedBy” : [userID],
<p>
        “˙hide” :boolean
<p>
}
   </td>
  </tr>
</table>




**DELETE** [http://localhost:8080/api/community/](http://localhost:8080/api/community/report)delete


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
        “postID” : postID
<p>
}
   </td>
  </tr>
  <tr>
   <td>201 Success
   </td>
   <td>{
<p>
        “_id” : postID
<p>
        “author” : userID,
<p>
        “title” : string,
<p>
        “body” :string,
<p>
        “likes” : [userID],
<p>
        “dislikes” : [userID],
<p>
        “timeStamp” : Date,
<p>
        “reportedBy” : [userID],
<p>
        “˙hide” :boolean
<p>
}
   </td>
  </tr>
</table>


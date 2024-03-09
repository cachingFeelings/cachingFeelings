
**GET** [http://localhost:8080/api/message/batchGetMessages](http://localhost:8080/api/message/batchGetMessages)


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
“messageIDs” : [messageID]
<p>
}
   </td>
  </tr>
  <tr>
   <td>201 Success
   </td>
   <td>{
<p>
   “listMessages” : [
<p>
        {
<p>
                “_id” : messageID
<p>
                “from”: userID,
<p>
                “to” : userID,
<p>
                “body” : string, \
                “mediaLink” : [string]
<p>
                “burnAfterRead” : boolean,
<p>
                “seen” : boolean,
<p>
                “convoID”: convoID \
        }
<p>
    ]
<p>
}
   </td>
  </tr>
</table>


Returns all messages in a chronological order. 

Might need to change the endpoint if we’re expecting lots of messages back and forth. Might need to set up pagination. 



**GET** [http://localhost:8080/api/message/getMessages](http://localhost:8080/api/message/batchGetMessages)


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
“messageID” : messageID
<p>
}
   </td>
  </tr>
  <tr>
   <td>201 Success
   </td>
   <td>        {
<p>
                “_id” : messageID
<p>
                “from”: userID,
<p>
                “to” : userID,
<p>
                “body” : string, \
                “mediaLink” : [string]
<p>
                “burnAfterRead” : boolean,
<p>
                “seen” : boolean,
<p>
                “convoID”: convoID \
        }
   </td>
  </tr>
</table>




**POST** [http://localhost:8080/api/message/sendMessage](http://localhost:8080/api/message/batchGetMessages)


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
“body” : string, \
“mediaLink” : [string]
<p>
“burnAfterRead” : boolean,
<p>
“seen” : boolean,
<p>
“to”: userID
<p>
}
   </td>
  </tr>
  <tr>
   <td>201 Success
   </td>
   <td>        {
<p>
                “_id” : messageID
<p>
                “from”: userID,
<p>
                “to” : userID,
<p>
                “body” : string, \
                “mediaLink” : [string]
<p>
                “burnAfterRead” : boolean,
<p>
                “seen” : boolean,
<p>
                “convoID”: convoID \
        }
   </td>
  </tr>
</table>


The burnAfterRead and seen are optional tags.

Defaults:

burnAfterRead - false

seen - false

**POST** [http://localhost:8080/api/message/updateSeen](http://localhost:8080/api/message/updateSeen)


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
“messageID” : messageID
<p>
}
   </td>
  </tr>
  <tr>
   <td>201 Success
   </td>
   <td>        {
<p>
                “_id” : messageID
<p>
                “from”: userID,
<p>
                “to” : userID,
<p>
                “body” : string, \
                “mediaLink” : [string]
<p>
                “burnAfterRead” : boolean,
<p>
                “seen” : boolean,
<p>
                “convoID”: convoID \
        }
   </td>
  </tr>
</table>


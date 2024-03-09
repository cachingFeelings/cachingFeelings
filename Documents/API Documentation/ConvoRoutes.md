**GET** [http://localhost:8080/api/convo/getConvo](http://localhost:8080/api/convo/getConvo)


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
“convoID” : ConvoID
<p>
}
   </td>
  </tr>
  <tr>
   <td>201 Success
   </td>
   <td>{
<p>
    “_id”: convoID,
<p>
    “messages”: [messageID]
<p>
    “users” : [userID]
<p>
}
   </td>
  </tr>
</table>


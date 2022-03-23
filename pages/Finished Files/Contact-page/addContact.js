   
  // ADDING the datas into database
  const addComment = document.querySelector("#contacti")
  addComment.addEventListener("submit", (e) => {
    e.preventDefault()
    let contactData = {
        name: addComment.name.value,
        email: addComment.email.value,
        phone:addComment.phone.value,
        message: document.getElementById('message').value
    }
    fetch('http://localhost:3000/api/messages', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(contactData)
    })
      .then(response => response.json())  
  .then((data) => {
        console.log(data);
        console.log("The message has been added SUCCESSFULLY");
        addComment.reset()
    })
    .catch((err) => {
    console.log("The error has been occured: " + err);
    })
  })

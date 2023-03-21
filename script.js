function submitdetails(event){
    event.preventDefault()
    const fname = event.target.name.value
    const email = event.target.emailid.value
    const mobile = event.target.phno.value

    // localStorage.setItem('name',fname)
    // localStorage.setItem('emailId',email)
    // localStorage.setItem('number',mobile)

    const obj = {
        fname,
        email,
        mobile
    } 

    axios.post("https://crudcrud.com/api/c5a27b85a5614047927ba70d5990059f/appointmentdata",obj)
    .then((response) => {
        showuseronscreen(response.data)
        console.log(response)
    })
    .catch((err) => {
        console.log(err)
    })
    // localStorage.setItem(obj.email,JSON.stringify(obj))
    // showuseronscreen (obj)

}

window.addEventListener("DOMContentLoaded",() => {
    axios.get("https://crudcrud.com/api/c5a27b85a5614047927ba70d5990059f/appointmentdata")
    .then((response) =>{
        console.log(response)

        for(var i=0; i<response.data.length; i++)
        {
            showuseronscreen(response.data[i])
        }
    })
    .catch((error) => {
        console.log(error)
    })
})


function showuseronscreen (obj){
    const parentelem = document.getElementById("users")
    const childelem = document.createElement("li")
    childelem.textContent = obj.fname + ' - ' + obj.email+' - ' + obj.mobile

    const deletebutton = document.createElement("input")
    deletebutton.type = "button"
    deletebutton.value = "Delete"

    deletebutton.onclick = () => {
        axios
          .delete(`https://crudcrud.com/api/c5a27b85a5614047927ba70d5990059f/appointmentdata/${obj._id}`)
          .then(() => {
            parentelem.removeChild(childelem);
          })
          .catch((err) => {
            console.log(err);
          });
    }
   


    const editbutton = document.createElement("input")
    editbutton.type ="button"
    editbutton.value = "Edit"

    editbutton.onclick = () => {
        localStorage.removeItem(obj.email)
        parentelem.removeChild(childelem)
        document.getElementById("fnameinput").value = obj.fname
        document.getElementById("emailinput").value = obj.email
        document.getElementById("mobileinput").value = obj.mobile

    }



    childelem.appendChild(deletebutton)
    childelem.appendChild(editbutton)

    parentelem.appendChild(childelem)
}
function notify(notif){
    var newNotif = document.createElement("p");
    newNotif.textContent = notif;
    newNotif.id = "notification";
    setTimeout(() =>{
        newNotif.remove();
    }, 2000);
    document.querySelector("#notification-holder").appendChild(newNotif);
}
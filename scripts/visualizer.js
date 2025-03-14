function visualize() {
    let currentHolder = document.getElementById("element-holder");
    currentHolder.remove();

    let mainHolder = document.getElementById("main-holder");
    let newHolder = document.createElement("div");
    newHolder.id = "element-holder";
    mainHolder.appendChild(newHolder);

    for (let i = 0; i < allTracks.length; i++) {

    }
}
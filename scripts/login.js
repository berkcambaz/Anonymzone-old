function login() {
    let username = document.getElementById("username").value;
    let useragreement = document.getElementById("useragreement").checked;

    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let error = this.responseText.split("&");

            if (error.length == 2) {
                let errorDisplay = document.getElementsByClassName("error");

                errorDisplay[0].innerHTML = error[0];
                errorDisplay[1].style = error[1] ? "color: red;" : "";
            } else {
                window.location = "../index.php";
            }
        }
    };
    ajax.open("GET", "../services/dologin.php?username=" + username + "&useragreement=" + useragreement, true);
    ajax.send();
}
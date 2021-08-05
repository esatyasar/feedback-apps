
let body =document.body;

body.insertAdjacentHTML("beforeend", 
    `<div class="btn-feedback">
        <button class="feedback">Feedback</button>
    </div>`);
    const btnFeedback = document.querySelector(".feedback");
    
    // onclick feedback 
    btnFeedback.addEventListener("click", () => {
    // form added
    body.insertAdjacentHTML("beforeend", 
    `<div class="main">
            <div class="form-container">
                <div class="close-container">
                    <button class="close"><i class="fas fa-times"></i></button>
                </div>
                <form action="#" method="get" class="form">
                    <input type="text" class="input userName" placeholder="user name">
                    <input type="hidden" class="userBrowser" value="browser">
                    <input type="hidden" class="operatingSystem" value="system">
                    <input type="hidden" class="userUrl" value="url">
                    <input type="hidden" class="type" value="type">
                    <input type="text" class="input title" placeholder="Issue Title">
                    <textarea name="feedback" class="input" id="feedback" cols="30" rows="10"
                    placeholder="Please enter your feedback..."></textarea>
                    <select class="priority input">
                        <option value="Highest">Highest</option>
                        <option value="High">High</option>
                        <option value="Medium" selected>Medium</option>
                        <option value="Low">Low</option>
                        <option value="Lowest">Lowest</option>
                    </select>
                    <button class="submit">Submit</button>
                    <span class="success" style="font-family:Nunito Sans"></span>
                </form>
            </div>
    </div>`);
    
    btnFeedback.style.visibility = "hidden"; // feedback button hidden
   
    

    // call functions
    btnSubmit();
    browser();
    findSystem();
    getUrl();
    closeForm();
   
})

// onclick submit button
function btnSubmit(){
    const submit = document.querySelector(".submit");
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        const userName = document.querySelector(".userName"); 
        if (typeof(Storage) !== "undefined") { //local Storage
        // Store
        localStorage.setItem("userName", `${userName.value}`); 
        userName.value = localStorage.getItem("userName");
        
    }else{
        alert("Sorry, your browser does not support Web Storage...");
    }
    // call axios
    getAxios();
    
    })
    

}
// check user's browser
function browser(){
    const browser =document.querySelector(".userBrowser")
    browser.value=navigator.userAgent.replace(/\s+/g, '-').toLowerCase();
    browser.setAttribute("disabled", false)
}

// find user's operating system
function findSystem(){
    const operatingSystem = document.querySelector(".operatingSystem");
    operatingSystem.value=navigator.appVersion.replace(/\s+/g, '-').toLowerCase();
    operatingSystem.setAttribute("disabled", false)
}
// get user's url
function getUrl(){
    const userUrl = document.querySelector(".userUrl");
    userUrl.value = `${window.location.href}`;
    userUrl.setAttribute("disabled",false);
}

// The entered values are transmitted to the server.
function getAxios(){
    const url = "https://turacoon.test/api/feedback";
    const userName = document.querySelector(".userName");
    const userUrl = document.querySelector(".userUrl");
    const operatingSystem = document.querySelector(".operatingSystem");
    const browser =document.querySelector(".userBrowser");
    const type = document.querySelector(".type");
    const title = document.querySelector(".title");
    const textArea = document.getElementById("feedback");
    const priority = document.querySelector(".priority");
    const submit = document.querySelector(".submit");
    const success = document.querySelector(".success")

    axios.post(url, { 
        name : `${userName.value}`,
        url : `${userUrl.value}`,
        os : `${operatingSystem.value}`,
        browser: `${browser.value}`,
        title: `${title.value}`,
        type : `${type.value}`,
        text : `${textArea.value}`,
        priority : `${priority.value}`
    }).then((response) => {
        debugger;
        if(response.data.success){
            submit.style.display = "none";
            success.innerHTML = "Your feedback get to saved successfully";
            success.style.color = "green";
            setTimeout(function(){
                submit.style.display = "block-inline";
                success.innerHTML = "";
                success.style.visibility = "hidden";
                const close = document.querySelector(".close");
                close.click();
             }, 1500);
        }else{
            submit.style.visibility = "hidden";
            success.innerHTML = "Your feedback could not be received";
            success.style.color = "red";
        }
    })
}

// when click close button, the form is closing
function closeForm(){
    const close = document.querySelector(".close");
    close.addEventListener("click",() =>{
        const btnFeedback = document.querySelector(".feedback");
        const main = document.querySelector(".main");
        btnFeedback.style.visibility = "visible"; // feedback button visible
        main.style.visibility = "hidden" // form hidden
        window.location.reload();
})  
}


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
                    <input type="text" class="userName" placeholder="user name">
                    <input type="hidden" class="userBrowser" value="browser">
                    <input type="hidden" class="operatingSystem" value="system">
                    <input type="hidden" class="userUrl" value="url">
                    <input type="hidden" class="type" value="type">
                    <textarea name="feedback" id="feedback" cols="30" rows="10"
                    placeholder="Please enter your feedback..."></textarea>
                    <button class="submit">Submit</button>
                </form>
            </div>
    </div>`);

    btnFeedback.style.visibility = "hidden"; // feedback button hidden

    // call functions
    btnSubmit();
    browser();
    findSystem();
    getUrl();
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

function browser(){
    const browser =document.querySelector(".userBrowser")
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) 
    {
        browser.value = "Your browser: Opera";
        browser.setAttribute("disabled",false)
    }
    else if(navigator.userAgent.indexOf("Chrome") != -1 )
    {
        browser.value = "Your browser: Chrome";
        browser.setAttribute("disabled",false)
    }
    else if(navigator.userAgent.indexOf("Safari") != -1)
    {
        browser.value = "Your browser: Safari";
        browser.setAttribute("disabled",false)
    }
    else if(navigator.userAgent.indexOf("Firefox") != -1 ) 
    {
        browser.value = "Your browser: Firefox";
        browser.setAttribute("disabled",false)
    }
    else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
    {
        browser.value = "Your browser: IE";
        browser.setAttribute("disabled",false); 
    }  
    else 
    {
       alert('unknown');
    }
}
    
function findSystem(){
    
    const operatingSystem = document.querySelector(".operatingSystem");
        if (navigator.appVersion.indexOf("Win") != -1){
            operatingSystem.value = "Your operating System: Windows OS";
            operatingSystem.setAttribute("disabled", false)
        }  
         
        else if (navigator.appVersion.indexOf("Mac") != -1){
            operatingSystem.value = "Your operating System: Mac Os";
            operatingSystem.setAttribute("disabled", false)
        }  
          
        else if (navigator.appVersion.indexOf("X11") != -1){
            operatingSystem.value = "Your operating System: UNIX Os";
            operatingSystem.setAttribute("disabled", false)
        }  
          
        else if (navigator.appVersion.indexOf("Linux") != -1){
            operatingSystem.value = "Your operating System: Linux OS";
            operatingSystem.setAttribute("disabled", false)
        }else{
            operatingSystem.value = "Your operating system: not known"
            operatingSystem.setAttribute("disabled", false)
        }
         
}

function getUrl(){
    const userUrl = document.querySelector(".userUrl");
    userUrl.value = `${window.location.href}`;
    userUrl.setAttribute("disabled",false);
}

function getAxios(){
    const url = "https://tipbaks.com/api/feedback";
    const userName = document.querySelector(".userName");
    const userUrl = document.querySelector(".userUrl");
    const operatingSystem = document.querySelector(".operatingSystem");
    const browser =document.querySelector(".userBrowser");
    const type = document.querySelector(".type");
    const textArea = document.getElementById("feedback");

    axios.post(url, {
        params: {
            name : `${userName.value}`,
            url : `${userUrl.value}`,
            env : `${operatingSystem.value} / ${browser.value}`,
            type : `${type.value}`,
            text : `${textArea.value}`
        }
    })
}


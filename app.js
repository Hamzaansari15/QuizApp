import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBk0z-HnPdl8DceZjh6DGjyIJsjmG0tv-4",
    authDomain: "quiz-app-8dfe7.firebaseapp.com",
    projectId: "quiz-app-8dfe7",
    storageBucket: "quiz-app-8dfe7.appspot.com",
    messagingSenderId: "121004155127",
    appId: "1:121004155127:web:510024b009ba2e953833f2",
    measurementId: "G-ZJ0VYT2TQG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const container = document.querySelector(".container");
const pwShowHide = document.querySelectorAll(".showHidePw");
const pwFields = document.querySelectorAll(".password");
const signUp = document.querySelector(".signup-link");
const login = document.querySelector(".login-link");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            if (pwField.type === "password") {
                pwField.type = "text";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                })
            } else {
                pwField.type = "password";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                })
            }
        })
    })
})
signUp.addEventListener("click", () => {
    container.classList.add("active");

});
login.addEventListener("click", () => {
    container.classList.remove("active");

});



//                  SIGN UP SECTION


let signupBtn = document.getElementById("signup_btn");
signupBtn.addEventListener("click", () => {
    let signupName = document.getElementById("signup_name").value;
    let signupNameReg = /^[a-zA-Z ]+$/;
    if (!signupNameReg.test(signupName)) {
        swal({
            text: "Invalid Name!",
            icon: "warning",
        })
        return false;
    }
    let signupEmail = document.getElementById("signup_email").value;
    let signupEmailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!signupEmailReg.test(signupEmail)) {
        swal({
            text: "Invalid  email address!",
            icon: "warning",
        })
        return false;
    }
    let signupPassword = document.getElementById("signup_password").value;
    let signupPasswordReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!signupPasswordReg.test(signupPassword)) {
        swal({
            text: "Invalid  Password.!",
            icon: "warning"
        })
        return false;
    }
    let signupConfirmPassword = document.getElementById("signup_confirm_password").value;
    if (signupConfirmPassword !== signupPassword) {
        swal({
            text: "Please Comfirm Password.!",
            icon: "warning"
        })
        return false;
    } else {
        createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
            .then(async (userCredential) => {
                const user = userCredential.user;
                await setDoc(doc(db, "user", user.uid), {
                    name: signupName,
                    email: signupEmail
                });
                swal("Good job!", "Signup successful!")
                    .then(() => {
                        location.reload();
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            })
    }
})

//               LOGIN  SECTION 




let loginBtn = document.getElementById("login_btn")
loginBtn.addEventListener("click", () => {
    let loginEmail = document.getElementById("login_email").value;
    let loginPassword = document.getElementById("login_password").value;
    console.log(loginEmail);
    console.log(loginPassword);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user) {
                console.log('login')
                let signUpBody = document.getElementById('signup_body');
                signUpBody.style.display = 'none';
                let ruleDiv = document.getElementById('quiz_rule');
                ruleDiv.style.display = 'flex';

            }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            if (errorMessage) {
                swal({
                    text: "User Not Found!",
                    icon: "warning",
                })

            }

        })

});
window.onload = async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            // console.log('hamza')
        } else {
        }
    });
};
let rulesBtn = document.getElementById('rule_button');
rulesBtn.addEventListener('click', () => {
    let ruleDiv = document.getElementById('quiz_rule');
    ruleDiv.style.display = 'none';
    let quizBody = document.getElementById('quiz_body');
    // quizBody.style.display = 'flex';
})
const questions =
    [
        {
            question: 'HTML stands for',
            a: 'Hyper Text Markup Language',
            b: 'HighText Machine Language',
            c: 'HyperText and links Markup Language',
            d: 'None of these',
            correct: 'a'
        },
        {
            question: 'How many tags are in a regular element?',
            a: '2',
            b: '1',
            c: '4',
            d: '3',
            correct: 'a'
        },
        {
            question: 'The correct sequence of HTML tags for starting a webpage is',
            a: 'Head, Title, HTML, body',
            b: 'HTML, Body, Title, Head',
            c: 'HTML, Head, Title, Body',
            d: 'HTML, Head, Title, Body',
            correct: 'c'
        },
        {
            question: 'What is the difference between an opening tag and a closing tag?',
            a: 'Opening tag has a / in front',
            b: 'Closing tag has a / in front',
            c: 'There is no difference',
            d: 'None of these',
            correct: 'b'
        },
        {
            question: '< br  / > What type of tag is this?',
            a: 'Break tag',
            b: 'A broken one',
            c: 'An opening tag',
            d: 'None of these',
            correct: 'a'
        }
    ];



let i = 0;
let total = questions.length;
let correct = 0;
const loadQuestion = () => {
    let quizDiv = document.getElementById('quiz');
    let input = document.getElementsByClassName('input');
    // console.log(input[1])
    let quiz = ` <div id="quiz_question">Q${i + 1}) ${questions[i].question}</div>`;
    input[0].innerHTML = questions[i].a
    input[1].innerHTML = questions[i].b
    input[2].innerHTML = questions[i].c
    input[3].innerHTML = questions[i].d
    quizDiv.innerHTML = quiz;
}
loadQuestion();
const resetAnswer = () => {
    let inputValue = document.querySelectorAll('.input_value');
    inputValue.forEach((input) => {
        input.checked = false
    })
}
const getAnswer = () => {
    let inputValue = document.querySelectorAll('.input_value');
    if(inputValue.checked){
        console.log('haaa')
    }else{
        console.log('no')
    }
}
const getResult = () => {
    getAnswer();
}
let nextBtn = document.getElementById('quiz_next_btn');
nextBtn.addEventListener('click', () => {
    ++i;
    if(i == total){
        return;
    }
    getResult();
    loadQuestion();
    resetAnswer();
    
    

})
// let backBtn = document.getElementById('quiz_back_btn');
// backBtn.addEventListener('click', () => {
//     --i;
//     if(i < 1){
//        backBtn.style.display = 'none'
//     }
//     loadQuestion();

// })

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

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
const db = getFirestore(app);

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
    if (6 >= signupPassword.length) {
        console.log(signupPassword.length)
        swal({
            text: "Password must be six character.!",
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
                localStorage.setItem('name', signupName);
                await setDoc(doc(db, "user", uid), {
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
                    text: "Invalid Email or Password!",
                    icon: "warning",
                }).then(() => {
                    location.reload();
                })

            }

        })

});

let rulesBtn = document.getElementById('rule_button');
let quizBody = document.getElementById('quiz_body');
let counter = document.getElementById('counter');
rulesBtn.addEventListener('click', () => {
    let ruleDiv = document.getElementById('quiz_rule');
    counter.style.display = 'block'
    ruleDiv.style.display = 'none';
    quizBody.style.display = 'flex';
    setInterval(updateCountdown, 1000);
})
const questions =
    [
        {
            question: 'HTML stands for',
            'a': 'Hyper Text Markup Language',
            'b': 'HighText Machine Language',
            'c': 'HyperText and links Markup Language',
            'd': 'None of these',
            'correct': 'a'
        },
        {
            question: 'How many tags are in a regular element?',
            'a': '1',
            'c': '4',
            'c': '2',
            'd': '3',
            'correct': 'c'
        },
        {
            question: 'The correct sequence of HTML tags for starting a webpage is',
            'a': 'HTML, Body, Title, Head',
            'b': 'HTML, Head, Title, Body',
            'c': 'Head, Title, HTML, body',
            'd': 'HTML, Head, Title, Body',
            'correct': 'b'
        },
        {
            question: 'What is the difference between an opening tag and a closing tag?',
            'a': 'Opening tag has a / in fron',
            'b': 'There is no difference',
            'c': 'Closing tag has a / in front',
            'd': 'None of these',
            'correct': 'c'
        },
        {
            question: '< br  / > What type of tag is this?',
            'a': 'Break tag',
            'b': 'A broken one',
            'c': 'An opening tag',
            'd': 'None of these',
            'correct': 'a'
        }
    ];



let index = 0;
let total = questions.length;
let right = 0;
let inputValue = document.querySelectorAll('.input_value');
const loadQuestion = () => {
    if (index == total) {
        counter.style.display = 'none';
        count.style.display = 'none';
        endQuiz();
        return;
    }
    let question = document.getElementById('quiz_question');
    question.innerHTML = `Q${index + 1}) ${questions[index].question}`;
    let option = document.querySelectorAll('.input');
    option[0].innerHTML = questions[index].a;
    option[1].innerHTML = questions[index].b;
    option[2].innerHTML = questions[index].c;
    option[3].innerHTML = questions[index].d;
}
loadQuestion();

const endQuiz = () => {
    let result = document.getElementById('main_result');
    result.style.display = 'flex';
    quizBody.style.display = 'none';
    let score = document.getElementById('score');
    score.innerHTML = `${right}/5`
}

const loadNextQuestion = () => {
    inputValue.forEach((input) => {
        if (input.checked) {
            index++;
            loadQuestion();
        }
    })
}

const submitQuiz = () => {
    const correctAnswer = getAnswer();
    console.log(correctAnswer);
    console.log(questions[index].correct);
    if (correctAnswer === questions[index].correct) {
        right++;
    }
    else {
        console.log('wrong')
    }
    loadNextQuestion();
    resetQuiz();
}

const getAnswer = () => {
    let answer;
    inputValue.forEach((input) => {
        if (input.checked) {
            answer = input.value;
        }
    })
    return answer;
}

const resetQuiz = () => {
    inputValue.forEach((input) => {
        input.checked = false;
    })
}

let nextQuestion = document.getElementById('quiz_next_btn');
nextQuestion.addEventListener('click', submitQuiz)

let homeBtn = document.getElementById('home_btn');
homeBtn.addEventListener('click', () => {
    location.reload();
})


let startingTime = 0.2;
let time = startingTime * 60
let count = document.getElementById('count')
console.log(count)

const updateCountdown = () => {
    const min = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds
    count.innerHTML = `${min}:${seconds}`;
    time--;
    if(seconds <= 0){
        endQuiz();
        counter.style.display = 'none';
        count.style.display = 'none';
    }
}


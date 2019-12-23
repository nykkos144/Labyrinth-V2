var firebaseConfig = {
    apiKey: "AIzaSyDTPu_2Xx9GP_dNT_6Z_A-ZCO2cQXOm18M",
    authDomain: "maze-46199.firebaseapp.com",
    databaseURL: "https://maze-46199.firebaseio.com",
    projectId: "maze-46199",
    storageBucket: "maze-46199.appspot.com",
    messagingSenderId: "37535683617",
    appId: "1:37535683617:web:2f5cea2f0b455a51c1ff60",
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

function addUser() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let repeatPassword = document.getElementById('repeatPassword');

    document.getElementById('text').style.visibility = 'hidden';
    document.getElementById('spinner').style.visibility = 'visible';

    if (password.value == repeatPassword.value) {
        const promise = auth.createUserWithEmailAndPassword(email.value , password.value);
            promise.catch(function(error) {

            let errorCode = error.code;

            console.log(errorCode)

            if (errorCode == 'auth/email-already-in-use') {
                alert('Email already in use');

                document.getElementById('text').style.visibility = 'visible';
                document.getElementById('spinner').style.visibility = 'hidden';
            }
            if (errorCode == 'auth/invalid-email') {
                alert('Invalid email');

                document.getElementById('text').style.visibility = 'visible';
                document.getElementById('spinner').style.visibility = 'hidden';
            }
            if (errorCode == 'auth/weak-password') {
                alert('Password must be at least 6 characters');

                document.getElementById('text').style.visibility = 'visible';
                document.getElementById('spinner').style.visibility = 'hidden';
            }        
        });
        promise.then(cred => {
            let promiseP = db.collection(cred.user.uid).doc(cred.user.uid).set({
                
            });
            promiseP.then(function() {
                console.log('Signed Up');
                window.location.href = "LogIn.html";    
            })
        });
    }
    if (password.value != repeatPassword.value) {

        document.getElementById('text').style.visibility = 'visible';
        document.getElementById('spinner').style.visibility = 'hidden';
    
        alert("Passwords don't match");
    }
}





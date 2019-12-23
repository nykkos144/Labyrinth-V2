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


function findUser() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    document.getElementById('text').style.visibility = 'hidden';
    document.getElementById('spinner').style.visibility = 'visible';

    const promise = auth.signInWithEmailAndPassword(email.value , password.value);
    promise.catch(function(error) {
        let errorCode = error.code;
    
        console.log(errorCode)

        if (errorCode == 'auth/invalid-email') {
            alert('Invalid email');

            document.getElementById('text').style.visibility = 'visible';
            document.getElementById('spinner').style.visibility = 'hidden';
        }
        if (errorCode == 'auth/user-not-found') {
            alert('User not found');

            document.getElementById('text').style.visibility = 'visible';
            document.getElementById('spinner').style.visibility = 'hidden';
        }
        if (errorCode == 'auth/wrong-password') {
            alert('Wrong password');

            document.getElementById('text').style.visibility = 'visible';
            document.getElementById('spinner').style.visibility = 'hidden';
        }
    });
    promise.then(function() {
        console.log('Logged In');
        window.location.href = "index.html";
    })
}





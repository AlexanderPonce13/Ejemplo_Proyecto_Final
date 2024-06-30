document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene el envío del formulario para manejar la validación manualmente
    
    // Obtiene los valores de los campos de nombre de usuario y contraseña
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Variables para los mensajes de error
    var usernameError = document.getElementById('usernameError');
    var passwordError = document.getElementById('passwordError');
    var generalError = document.getElementById('generalError');

    // Variable para controlar la validez del formulario
    var valid = true;

    // Validación del nombre de usuario
    if (username.trim() === "") {
        usernameError.textContent = "El nombre de usuario es obligatorio.";
        valid = false;
    } else if (username.length < 3 || username.length > 20) {
        usernameError.textContent = "El nombre de usuario debe tener entre 3 y 20 caracteres.";
        valid = false;
    } else {
        usernameError.textContent = "";
    }

    // Validación de la contraseña
    if (password.trim() === "") {
        passwordError.textContent = "La contraseña es obligatoria.";
        valid = false;
    } else if (password.length < 6 || password.length > 20) {
        passwordError.textContent = "La contraseña debe tener entre 6 y 20 caracteres.";
        valid = false;
    } else {
        passwordError.textContent = "";
    }

    // Si ambos campos son válidos
    if (valid) {
        // Simulación de una autenticación exitosa
        if (username === 'usuario' && password === 'contraseña') { // Verifica las credenciales de prueba
            generalError.textContent = ''; // Limpiar cualquier mensaje de error previo
            // Redirige al usuario al panel de control
            window.location.href = "../panel/dashboard.html";
        } else {
            generalError.textContent = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.'; // Muestra el mensaje de error si las credenciales son incorrectas
        }
    } else {
        generalError.textContent = ''; // Limpiar cualquier mensaje de error previo si las validaciones individuales fallan
    }
});

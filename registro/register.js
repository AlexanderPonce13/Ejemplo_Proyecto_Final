document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene el envío del formulario para manejar la validación manualmente

    // Obtiene los valores de los campos del formulario
    var newUsername = document.getElementById('newUsername').value;
    var newPassword = document.getElementById('newPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var email = document.getElementById('email').value;
    var role = document.getElementById('role').value;

    var valid = true; // Variable para controlar la validez del formulario

    // Validación de la contraseña
    var passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(newPassword)) {
        valid = false;
        document.getElementById('newPasswordError').textContent = 'La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, un número y un caracter especial (@#$%&).';
        document.getElementById('newPasswordError').style.display = 'block'; // Muestra el mensaje de error
    } else {
        document.getElementById('newPasswordError').style.display = 'none'; // Oculta el mensaje de error si la contraseña es válida
    }

    // Validación de la confirmación de contraseña
    if (confirmPassword.trim() === '' || confirmPassword !== newPassword) { // Verifica si la confirmación de contraseña está vacía o no coincide con la contraseña
        valid = false;
        document.getElementById('confirmPasswordError').textContent = 'Las contraseñas no coinciden.';
        document.getElementById('confirmPasswordError').style.display = 'block'; // Muestra el mensaje de error
    } else {
        document.getElementById('confirmPasswordError').style.display = 'none'; // Oculta el mensaje de error si las contraseñas coinciden
    }

    // Validación del correo electrónico
    if (email.trim() === '') { // Verifica si el campo de correo electrónico está vacío
        valid = false;
        document.getElementById('emailError').textContent = 'El correo electrónico es obligatorio.';
        document.getElementById('emailError').style.display = 'block'; // Muestra el mensaje de error
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // Verifica si el correo electrónico tiene un formato válido utilizando una expresión regular
        valid = false;
        document.getElementById('emailError').textContent = 'El formato del correo electrónico no es válido.';
        document.getElementById('emailError').style.display = 'block'; // Muestra el mensaje de error
    } else {
        document.getElementById('emailError').style.display = 'none'; // Oculta el mensaje de error si el correo electrónico es válido
    }

    // Validación del rol
    if (role.trim() === '') { // Verifica si no se ha seleccionado ningún rol
        valid = false;
        document.getElementById('roleError').textContent = 'El rol es obligatorio.';
        document.getElementById('roleError').style.display = 'block'; // Muestra el mensaje de error
    } else {
        document.getElementById('roleError').style.display = 'none'; // Oculta el mensaje de error si se ha seleccionado un rol
    }

    if (valid) { // Si todos los campos son válidos
        alert('Usuario registrado exitosamente.'); // Muestra una alerta de éxito
        document.getElementById('registerForm').reset(); // Reinicia el formulario
    }
   
});

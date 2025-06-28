function initialiseForm() {
    const form = document.getElementById('contact-form')
    if (form) {
        const inputs = form.querySelectorAll('input, textarea')
        inputs.forEach(input => {
            input.addEventListener('blur', validateField)  
            input.addEventListener('input', clearErrors)
        })

        form.addEventListener('submit', (e) => {
            e.preventDefault()

            let isValid = true
            inputs.forEach(input => {
                if (!validateField({ target: input })) {
                    isValid = false
                }
            })
            if (isValid) {
                submitForm(form)
            }
        })
    } else {
        throw new Error("Form Id not found")
    }
}
// Validate form fields
function validateField(e) {
    const field = e.target
    const value = field.value.trim()
    const fieldName = field.name 

    removeFieldError(field)

    if (!value) {
        showFieldError(field, `${fieldName} is required`)
        return false
    }
    if (fieldName === "email" && !isValidEmail(value)) {
        showFieldError(field, `${fieldName} is not valid`)
        return false
    }
    if (fieldName === "message" && value.length < 11) {
        showFieldError(field, `${fieldName} must be at least 11 characters long`)
        return false
    }
    return true
}

// Apply regex validation on input email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function clearErrors(e) {
    removeFieldError(e.target)
} 

// Create new div to display field error message
function showFieldError(field, message) {
    if (field && message) {
        field.classList.add('error-message')
        const errorDiv = document.createElement('div')
        errorDiv.className = 'field-error'
        errorDiv.textContent = message.charAt(0).toUpperCase() + message.slice(1)
        errorDiv.style.color = "red"
        errorDiv.style.fontStyle = "italics"
        field.parentNode.style.borderColor = "red"
        field.parentNode.appendChild(errorDiv)
    } else {
        console.log(`One or both parameters missing: ${field}, ${message}`)
    }
}

// Remove previously displayed field error message
function removeFieldError(field) {
    if(field) {
        field.classList.remove('error-message')
        const errorDiv = field.parentNode.querySelector('.field-error')
        field.parentNode.style.borderColor = "black"
        errorDiv? errorDiv.remove() : null
    } else {
        console.log("Field parameter is missing")
    }
}

// Submit form function 
function submitForm(form) {
    if (form) {
        const submitButton = form.querySelector("button")
        var buttonText = submitButton.textContent
        submitButton.textContent = "Sending message..."
        submitButton.disabled = true

        setTimeout(() => {
            alert("Your message has been sent successfully")
            form.reset()
            submitButton.textContent = buttonText
            submitButton.disabled = false
        }, 2000)
    } else {
        console.log("Form parameter is missing")
    }
}

initialiseForm()
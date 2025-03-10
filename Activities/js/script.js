document.addEventListener("DOMContentLoaded", function () {
    const fields = ["firstName", "lastName", "email"];
    
    fields.forEach(id => {
        const inputField = document.getElementById(id);
        
        inputField.addEventListener("focus", function () {
            this.style.borderColor = "blue";
        });

        inputField.addEventListener("blur", function () {
            this.style.borderColor = "";
        });
    });
});

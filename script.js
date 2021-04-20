var slide = [
    "res/images/slide-0.jpg",
    "res/images/slide-1.jpg",
    "res/images/slide-2.jpg",
    "res/images/slide-3.jpg",
    "res/images/slide-4.jpg",
    "res/images/slide-5.jpg"
];

var numero = 0;
var currentlyShown = undefined;

/**
 * cette fonction sert à changer le slide affiché de la galerie
 * @param {number} sens 1 pour aller en avant et 
 * -1 pour aller en arrière
 */
function ChangeSlide(sens) {
    numero = numero + sens;
    if (numero < 0)
        numero = slide.length - 1;
    if (numero > slide.length - 1)
        numero = 0;
    document.getElementById("slider-element").src = slide[numero];
}

function hideCurrent() {
    if (currentlyShown) {
        hide(currentlyShown);
    }
}
/**
 * cette fonction sert à cacher la popup et le dim
 * @param {string} id 
 */
function hide(id) {
    document.body.style.overflow = 'auto';
    document.getElementById(id).style.visibility = "hidden"
    document.getElementById("dim").style.visibility = "hidden"
    currentlyShown = undefined;
}
/**
 * cette fonctions sert à révéler la popup et le dim
 * @param {string} id 
 */
function reveal(id) {
    document.body.style.overflow = 'hidden';
    document.getElementById(id).style.visibility = "visible"
    document.getElementById("dim").style.visibility = "visible"
    currentlyShown = id;
}

var Form1;
var Form2;
var Form3;
var toValidate;
var back;
var next;
var validate;

var progress;

var index = 0;

/**
 * cette fonction sert à initialiser les variables globales
 */
function init() {
    Form1 = document.getElementById('Form1');
    Form2 = document.getElementById('Form2');
    Form3 = document.getElementById('Form3');
    toValidate = [
        Form1.getElementsByTagName("input"),
        Form2.getElementsByTagName("input"),            
        Form3.getElementsByTagName("input")
    ]
    back = document.getElementById('back');
    next = document.getElementById('next');
    validate = document.getElementById('validate');
    progress = document.getElementById('progress');

    back.onclick = function() {
        if (index > 0) {
            index --;
            updateForm(index);
        }
    }
    
    next.onclick = function() {
        let valid = Array.from(toValidate[index]).every(e => e.checkValidity())
        if (index === 1) {
            valid = verification()
        }
        if (!valid){
            if (index !== 1) {
                alert("Veuillez remplir tous les champs obligatoires dans un format valide")
            }
            return
        }
        if (index < 2) {
            index ++;
            updateForm(index);
        }
    }

    updateForm(index);
    setupNumberField();
}

/**
 * cette fonction sert à afficher le slide de l'index
 * courant de la popup et afficher les boutons selon 
 * la valeur de celui-ci ainsi que la barre indiquant
 * l'étape du formulaire
 * @param {number} index index courant de la popup
 */
function updateForm(index) {
    Form1.style.left = ((0 - index) * 100) + "%";
    Form2.style.left = ((1 - index) * 100) + "%";
    Form3.style.left = ((2 - index) * 100) + "%";
    progress.style.left = Math.round(index * 33.3) + "%";

    switch (index) {
        case 0 :
            back.style.display = "none";
            next.style.display = "block";
            validate.style.display = "none";
            break;
        
        case 1 :
            back.style.display = "block";
            next.style.display = "block";
            validate.style.display = "none";
            break;

        case 2 :
            back.style.display = "block";
            next.style.display = "none";
            validate.style.display = "block";
            break;
    }
}

/**
 * 
 * @returns retourne un booléan qui indique si la condition
 * image et/ou une description est validé
 */
function verification() {
    let texte = document.getElementById("user-description")
    let image = document.getElementById("presenceImage")
    console.log(texte.value, image.value)

    if (texte.value === "" && image.value === "non") {
        alert("Veuillez choisir oui pour joindre une image ou ajouter une description")
        return false
        }
    return true
}

/**
 * cette fonction sert afficher un message si 
 * l'utilisateur a choisi oui pour transmettre un 
 * fichier image
 */
function imageFile() {
    let option = document.getElementById("presenceImage")

    if  (option.value === "oui") {
        alert("N'oubliez pas de joindre votre fichier image dans le mail")
    }
}

/**
 * cette fonction sert à rajouter +33 au numero 
 * et formater son apparence avec des espaces
 */
function setupNumberField() {
    const fields = document.getElementsByClassName("international-phone");
    Array.from(fields).forEach(field => {
        console.log(`Setting up ${field}`);
        const inputHandler = () => {
            let fieldValue = field.value;
            let value = "";

            fieldValue = fieldValue.replaceAll(/^\+33( 0|0){0,1}/g, "")
            fieldValue = fieldValue.replaceAll(/[^0-9]/g, "")
            for (let i = 0; i < fieldValue.length;) {
                if (i % 2 === 1) {
                    value += " "
                }

                value += fieldValue[i]
                i++;
            }

            field.value = "+33 " + value;
        }

        field.oninput = inputHandler
        field.onchange = inputHandler
    })
}
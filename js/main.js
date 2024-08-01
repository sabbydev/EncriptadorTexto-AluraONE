const noContentOutput = document.getElementById('no-content-output');
const hasContentOutput = document.getElementById('has-content-output');
const inputTextarea = document.getElementById('input-textarea');
const outputTextarea = document.getElementById('output-textarea');
const encryptButton = document.getElementById('encrypt-button');
const decryptButton = document.getElementById('decrypt-button');
const copyButton = document.getElementById('copy-button');
var isNoContentSet = false;

encryptButton.addEventListener('click', () => processText(encryptText));
decryptButton.addEventListener('click', () => processText(decryptText));
copyButton.addEventListener('click', copyToClipboard);

function processText(processType) {
    let inputTextareaContent = inputTextarea.value;
    if (validateContent(inputTextareaContent)) {
        outputTextarea.value = processType(inputTextareaContent);
        clearInputTextarea();
    }
}

function encryptText(str) {
    return str.replace(/e/g, "enter")
              .replace(/i/g, "imes")
              .replace(/a/g, "ai")
              .replace(/o/g, "ober")
              .replace(/u/g, "ufat");
}

function decryptText(str) {
    return str.replace(/enter/g, "e")
              .replace(/imes/g, "i")
              .replace(/ai/g, "a")
              .replace(/ober/g, "o")
              .replace(/ufat/g, "u");
}

function clearInputTextarea() {
    inputTextarea.value = '';
}

function copyToClipboard() {
    navigator.clipboard.writeText(outputTextarea.value)
        .then(() => {
            copyButton.textContent = '¡Copiado!';
            setTimeout(() => {
                copyButton.textContent = 'Copiar';
            }, 5000);
        })
        .catch(err => {
            console.error('Error al copiar al portapapeles: ', err);
            alert('Error al copiar al portapapeles');
        });
}

function validateContent(content) {
    if (onlyLowercaseSpacesAndExclamation(content)) {
        setResultSection(content);
        return true;
    } else {
        alert('Solo letras minúsculas sin acento');
        return false;
    }
}

function onlyLowercaseSpacesAndExclamation(str) {
    const regex = /^[a-z\s!]*$/;
    return regex.test(str);
}

function setResultSection(content) {
    if (isEmptyOrWithSpaces(content)) {
        setNoContent();
        if (isNoContentSet) {
            alert('Ingrese el texto que desees encriptar o desencriptar');
        }
        isNoContentSet = true;
    } else {
        setHasContent();
        isNoContentSet = false;
    }
}

function isEmptyOrWithSpaces(str) {
    return str.trim() === "";
}

function setNoContent() {
    if (noContentOutput.classList.contains('hidden')) {
        noContentOutput.classList.remove('hidden');
    }
    hasContentOutput.classList.add('hidden');
}

function setHasContent() {
    if (hasContentOutput.classList.contains('hidden')) {
        hasContentOutput.classList.remove('hidden');
    }
    noContentOutput.classList.add('hidden');
}
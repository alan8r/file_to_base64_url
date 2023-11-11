function utf8_to_base64(string) {
    return window.btoa(unescape(encodeURIComponent(string)))
}

function handleFile(event) {
    let reader = new FileReader(),
        file = inputFile.files[0]
    
    if (file.type.substring(0,4) == "text") {
        reader.addEventListener("loadend", loadTextFile)
        reader.readAsText(file)
    } else {
        reader.addEventListener("loadend", loadFile)
        reader.readAsDataURL(file)
    }

    let fileType = file.type,
        fileSize = file.size

    infoDiv.innerHTML = `&emsp;type:&emsp;${fileType}<br>&emsp;size:&emsp;${fileSize} bytes`
}

function loadTextFile(event) {
    let fileType = inputFile.files[0].type,
        encodedFile = utf8_to_base64(event.target.result)

    textArea.value = `data:${fileType};base64,${encodedFile}`
}

function loadFile(event) {
    textArea.value = event.target.result
}

function clearClicked() {
    textArea.value = ""
    inputFile.value = ""
    infoDiv.innerHTML = "&emsp;No file loaded."
}

let textArea = document.querySelector("textarea"),
    inputFile = document.querySelector("input"),
    btnClear = document.querySelector("button"),
    infoDiv = document.querySelectorAll("div")[1]

inputFile.addEventListener("change", handleFile)

btnClear.addEventListener("click", clearClicked)
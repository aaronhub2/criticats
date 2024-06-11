function llamarPhp(nombrephp){

    const docphp=nombrephp;
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", docphp);
    xhttp.send();
}

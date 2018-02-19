function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var data = xhttp.responseText;
    // Innen, ide dolgozz... Itt hívd meg a függvényeid stb. A json file tartalma innen érhető csak
    // Live servert használd mindig
    data = JSON.parse(data);
    myFunction1(data);
    myFunction6(data);
}


getData('js/meteorits.json', successAjax);

function myFunction1(data) {
    var table = "";
    for (var i = 0; i < data.length; i++) {
        table += "<tr>"
        if (parseInt(data[i].id) > 0) {
            table += `<td>${data[i].id}</td>`
        }
        if (parseInt(data[i].mass) > 0) {
            table += `<td>${Number(data[i].mass).toFixed(2)}</td>`
        } else {
            table += `<td></td>`
        }
        if (data[i].name != "") {
            table += `<td>${data[i].name}</td>`
        }
        if (data[i].nametype != "") {
            table += `<td>${data[i].nametype}</td>`
        }
        if (data[i].recclass != "") {
            table += `<td>${data[i].recclass}</td>`
        }
        if (Number.isFinite(parseFloat(data[i].reclat)) == true) {
            table += `<td>${data[i].reclat}</td>`
        } else {
            table += `<td></td>`
        }
        if (Number.isFinite(parseFloat(data[i].reclong)) == true) {
            table += `<td>${data[i].reclong}</td>`
        } else {
            table += `<td></td>`
        }
        if (data[i].year != "") {
            var d = new Date(data[i].year);
            table += `<td>${d.getFullYear()}. ${d.getMonth()}. ${d.getDate()}.</td>`
        }
        table += "</tr>"
        document.querySelector("#tbody").innerHTML = table;
    }
}

function myFunction2(data) {
    var temp;
    for (i = 0; i < data.length - 1; i++) {
        for (j = i + 1; j < data.length; j++) {
            if (parseInt(data[i].id) > parseInt(data[j].id)) {
                temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }
        }
    }
    myFunction1(data)
}

function myFunction3(data) {
    var temp;
    for (i = 0; i < data.length - 1; i++) {
        for (j = i + 1; j < data.length; j++) {
            if (parseFloat(data[i].mass) > parseFloat(data[j].mass)) {
                temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }
        }
    }
    myFunction1(data)
}

function myFunction4(data) {
    var temp;
    for (i = 0; i < data.length - 1; i++) {
        for (j = i + 1; j < data.length; j++) {
            if (data[i].name > data[j].name) {
                temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }
        }
    }
    myFunction1(data)
}

function myFunction5(data) {
    var temp;
    for (i = 0; i < data.length - 1; i++) {
        for (j = i + 1; j < data.length; j++) {
            if (data[i].nametype > data[j].nametype) {
                temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }
        }
    }
    myFunction1(data)
}

function myFunction6(data) {
    var sum;
    for (var i = 0; i < data.length; i++) {
        sum += parseInt(data[i].mass);
    }
    document.querySelector("#sum").innerHTML = `Az összes meteorit összsúlya: ${sum.toFixed(2)}`;
}

// Megvan hogy mit hogy kéne megcsinálni, valószínűleg a táblázat létrehozása miatt nem megy semmi

/* 
    A kapott JSON file a Föld-be csapódott meteoritok adatait tartalmazza.

    FELADATOK:
    1. Írasd ki egy táblázatba a következő adatait a meteoritoknak:
        id
        mass
        name
        nametype
        recclass
        reclat
        reclong
        year

     Pozitív, ha ezeket az elemeket nem az innerHTML segítségével hozod létre. 

    2. A táblázatban formázd a tömeget 2 tizedes jegy pontosan. Ha kell kerekíts a legközelebbi egészre.
       A matamatikai kerekítés szabályait használd. Ha valahol egész érték van, ott is legyen a 00 kiiratva
       az egész érték után .
       Formázd a dátumot az alábbi formátumba: 1990. 01. 02. 
    
    3. A táblázat fejlécére kattintva növekvő sorrendbe lehessen rendezni a táblázat adatait az alábbi
       meteorit tulajdonságok szerint: id, mass, name, és reclass.
       Az id és a mass szerinti rendezés számok alapján rendezzen.

    4.  Valósítsd meg a rendezést úgy, hogy nem csak növekvő, hanem csökkenő sorrendbe is lehessen az adatokat rendezni.
        Ha az adatok még nincsenek rendezve, akkor az adott fejlév/tulajdonság alapján növekvő sorrendbe rendezze az adatokat kattintásra.
        Amennyiben még egyszer ugyanarra a fejlécre kattintanak, akkor a sorrend legyen csökkenő. És így tovább....
        Amennyiben egy új fejlécre kattintanak, először mindig növekvő sorrend szerint legyenek az  adatok rendezve.

    5. A táblázat alá az alábbi adatokat ki kell iratni/számolni:

        Az összes meteorit összsúlya
        A legkönyebb meteorit súlya
        A legnehezebb meteorit súlya
        A meteoritok súlyának átlaga
        Hány darab meteorit csapódott be 1990-ben
        Hány darab meteorit súlya legalább 10000

        Ezeket az elemeket ne az innerHTML segítségével hozd létre. Használd az ismert node metódusokat. KÖTELEZŐEN!

    6. Legyen szép a táblázat és az adatok. HAsználj CSS-t a formázáshoz.

    7. Töltsd fel az elkészült fileokat egy github repoba, és küld el a repo elérhetőségét.

    8. Szusszanj egyet.

*/
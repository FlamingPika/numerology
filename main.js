const check = (type, num) => {
    let today = new Date(Date.now())
    if (type === "day"){
        if (num < 1 || num > 31) {
            return false;
        }
    } else if (type === "month"){
        if (num < 1 || num > 12) {
            return false;
        }
    } else if (type === "year"){
        if (num > today.getFullYear() || num < 1) {
            return false;
        }
    }
    return true;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function validating(num_input){
    if (check(num_input.id, num_input.value) === false){
        if (num_input.getAttribute('invalid') === "false") {
            num_input.classList.toggle('invalid');
        }
        num_input.setAttribute('invalid', "true");
    } else {
        if (num_input.getAttribute('invalid') === "true"){
            num_input.classList.toggle('invalid');
            num_input.setAttribute('invalid', "false")
        }
    }
}
let num_inputs = document.getElementsByClassName('num-input-container')

Array.from(num_inputs).forEach(function(num_input){
    num_input.addEventListener("keyup", function(event) {
        if ((event.keyCode === 13 || num_input.value.length == 2) && num_input.id !== "year") {
            num_input.nextElementSibling.nextElementSibling.focus();
        }
    });
})

const process = (obj) => {
    let num = 0;
    for (let i = 0; i < obj.length; ++i){
        num += parseInt(obj[i]);
    }
    return num;
}

function checkValid() {
    let num_inputs = document.getElementsByClassName('num-input-container');
    let invalid = false;
    Array.from(num_inputs).forEach(function(num_input){
        if (num_input.getAttribute('invalid') === "true"){
            num_input.classList.toggle('process');
            invalid = true;
        }
    })
    return (invalid) ? false : true;

}

let can_toggle = true;
async function calculate() {

    if (document.getElementById('res').getAttribute('visible') === 'true'){
        return;
    }
    if (can_toggle && checkValid()) {
        can_toggle = false;
        document.getElementById('res').setAttribute('ongoing', 'true');
        let outer_container = document.getElementsByClassName("num-input-container")
        Array.from(outer_container)[0].classList.toggle('process');
        document.getElementById("ddesc").classList.toggle('gone')
        document.getElementById("day").value = process(document.getElementById("day").value);
        await sleep(500);
        Array.from(outer_container)[1].classList.toggle('process');
        document.getElementById("mdesc").classList.toggle('gone')
        document.getElementById("month").value = process(document.getElementById("month").value);
        await sleep(500);
        document.getElementById("ydesc").classList.toggle('gone')
        while (true) {
            Array.from(outer_container)[2].classList.toggle('process');
            document.getElementById("year").value = process(document.getElementById("year").value);
            await sleep(500);
            if (document.getElementById("year").value.length == 1){
                break;
            }
            Array.from(outer_container)[2].classList.toggle('process');
            await sleep(200);
        }

        Array.from(outer_container).forEach(function(e){
            e.classList.toggle('process');
        });

        let container = document.getElementsByClassName("image")
        Array.from(container)[0].classList.toggle('show');
        Array.from(container)[1].classList.toggle('show');

        await sleep(1000);

        Array.from(outer_container)[0].classList.toggle('combine1');
        Array.from(outer_container)[1].classList.toggle('combine2');
        Array.from(outer_container)[2].classList.toggle('combine3');
        Array.from(container)[0].classList.toggle('combine1');
        Array.from(container)[1].classList.toggle('combine2');

        await sleep(500);

        Array.from(outer_container)[0].classList.toggle('gone');
        Array.from(outer_container)[1].classList.toggle('gone');
        Array.from(outer_container)[2].classList.toggle('gone');
        Array.from(container)[0].classList.toggle('gone');
        Array.from(container)[1].classList.toggle('gone');

        let sum = parseInt(document.getElementById("day").value) + parseInt(document.getElementById("month").value) + parseInt(document.getElementById("year").value);
        
        if (sum >= 10) {
            let temp = process(sum.toString());
            document.getElementById('res').innerHTML = sum.toString() + '/' + temp.toString();
            document.getElementById('res').classList.toggle('morethan10');
        } else {
            document.getElementById('res').innerHTML = sum;
        }
        
        document.getElementById('res').classList.toggle('show');
        document.getElementById('res').setAttribute('visible', 'true')

        await sleep(200);

        document.getElementById('res').classList.toggle('float');

        document.getElementById('res').setAttribute('ongoing', 'false');
        can_toggle = true;

    } else {
        await sleep(200);
        checkValid();
    }
}

function reset() {
    if (document.getElementById('res').getAttribute('ongoing') === 'true'){
        return;
    }
    let elements = document.getElementsByClassName("num-input-container");
    Array.from(elements).forEach(function(e){
        e.classList.remove('gone');
    });
    Array.from(elements)[0].classList.remove('combine1');
    Array.from(elements)[1].classList.remove('combine2');
    Array.from(elements)[2].classList.remove('combine3');

    elements = document.getElementsByClassName("image");
    Array.from(elements).forEach(function(e){
        e.classList.remove('show');
        e.classList.remove('gone');
    });

    document.getElementById("ddesc").classList.remove('gone');
    document.getElementById("mdesc").classList.remove('gone');
    document.getElementById("ydesc").classList.remove('gone');

    Array.from(elements)[0].classList.remove('combine1');
    Array.from(elements)[1].classList.remove('combine2');

    document.getElementById('res').classList.remove('show');
    document.getElementById('res').classList.remove('float');
    document.getElementById('res').classList.remove('morethan10');
    document.getElementById('res').setAttribute('visible', 'false');

    document.getElementById("day").value = 0;
    document.getElementById("month").value = 0;
    document.getElementById("year").value = 0;
}
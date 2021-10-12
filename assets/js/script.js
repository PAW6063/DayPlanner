let date = moment();//You can change the time by insert at this variable for testing

const plannerText = ["", "", "", "", "", "", "", "", ""];//used for localstorage, getting text, giving text

function displayDate() {
    $('#currentDay').text(date.format("dddd, MMMM Do"));//display date in jumbotron
}

displayDate();

//local storage
function loadStorage() {
    let tempLoader = JSON.parse(localStorage.getItem('plannerText'));
    for(let i = 0; i < plannerText.length; i++){
        plannerText[i] = tempLoader[i];
    }
}

loadStorage();

function generateHtml() {
    let slotTime = moment(8, "hA");//for comparing current moment with times on planner
    
    //dynamically updating html
    for(let i = 0; i < 9; i++) {
        $('.container').append($(`<div id="slot${i}"class="time-block">`));
        $(`#slot${i}`).append($(`<div id="row${i}" class="row">`));
        
        $(`#row${i}`).append(`<h3 class="hour col-1">${slotTime.add(1, 'h').format('hA')}</h3>`);
        $(`#row${i}`).append('<textarea class="description col">');
        $(`#row${i}`).append('<button class="saveBtn col-1">Save</button>');
        
        if((date.format('H') - slotTime.format('H')) > 0){
            $(`#row${i} textarea`).addClass('past');
        }else if((date.format('H') - slotTime.format('H')) == 0){
            $(`#row${i} textarea`).addClass('present');
        }else{
            $(`#row${i} textarea`).addClass('future');
        }

        //update text
        $(`#row${i} textarea`).val(plannerText[i]);
    }
}

generateHtml();

//save function
$('.row').on('click', '.saveBtn', function(event) {
    plannerText[$(this).parents().attr('id')[3]] = $(this).siblings("textarea").val();
    localStorage.setItem('plannerText', JSON.stringify(plannerText));
;});

function postInventory() {
    var newInventory = {
        userName: $('#inputName').val().trim(),
        cash: cash,
        food: food,
        water: water,
        gas: gas,
        
        
    }
    $.post('api/inventory', newInventory).then(function (data) {
        console.log(data);
    })
}

function getInventory(){
    $.get('api/newInventory', function(data, status){
        console.log(data);
    })
}
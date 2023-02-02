var userid = null;
var url = "ws://wkwin0280068.global.publicisgroupe.net:61614/stomp";
// Setup websocket connection
var client = Stomp.client(url, "v11.stomp");
// Setup header options
const headers = {
    id: userid,
    ack: 'client'
};

function IsEmail(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var res = filter.test(email);
    return res;
}

function showMessage(message) {
    let priceValue = '.price-value-' + message.style;
    $(priceValue).html('&#x20B9;' + message.bidPrice);
}

const setupActiveMq = () => {
    client.connect("admin", "admin", function () {
        //Setup subscription of topic (/topic/biddings)
        client.subscribe("/topic/biddings", function (message) {
            const msg = JSON.parse(message.body);
            showMessage(msg);
            message.ack();
        }, headers);
    });
}

const getUser = () => {
    $('#homeModal').modal('show');
}

// run after page is loaded
window.onload = getUser;

$(document).ready(function () {

    $('#signup').click(function (e) {
        e.preventDefault();
        var email = $('#email').val();
        if (IsEmail(email)) {
            userid = email;
            $('#loggedUser').html(userid);
            $("#validation_msg").addClass("hide");
            $('#homeModal').modal('hide');
            setupActiveMq();
        } else {
            $("#validation_msg").removeClass("hide");
            $('#email').val('');
        }
    });

    $('.js_bid').click(function (e) {
        e.preventDefault();
        var style = this.getAttribute("data-style");
        var productName = this.getAttribute("data-productName");
        var bidPrice = $("input[name=" + style + "_bidPrice]").val();
        var bidData = {
            email: userid,
            style: style,
            productName: productName,
            bidPrice: bidPrice
        };
        $.ajax({
            url: '/publish',
            type: 'POST',
            data: bidData
        }).done(function (response) {
            console.log(response);
        }).fail(function (error) {
            console.log(error);
        });
    });
});
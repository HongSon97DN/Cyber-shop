function Validation() {
    this.checkEmpty = function(inputVal,spanID,message) {
        if (inputVal.trim() != "") {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    };

    this.checkNumber = function(inputVal,spanID,message) {
        let number = /^[0-9]+$/;

        if (inputVal.match(number)) {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }
}
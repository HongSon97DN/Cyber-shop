function PhoneAdminService() {
    this.getItemList = function() {
        return axios({
            method: 'GET',
            url: 'https://62e7707993938a545bd19492.mockapi.io/PhoneProducts',
        });
    };

    this.addItem = function(item) {
        return axios({
            method: 'POST',
            url: 'https://62e7707993938a545bd19492.mockapi.io/PhoneProducts',
            data: item
        });
    };

    this.deleteItem = function(id) {
        return axios({
            method: 'DELETE',
            url: `https://62e7707993938a545bd19492.mockapi.io/PhoneProducts/${id}`,
        });
    };

    this.getItemDetail = function(id) {
        return axios({
            method: 'GET',
            url: `https://62e7707993938a545bd19492.mockapi.io/PhoneProducts/${id}`,
        });   
    };

    this.updateItem = function(id,item) {
        return axios({
            method: 'PUT',
            url: `https://62e7707993938a545bd19492.mockapi.io/PhoneProducts/${id}`,
            data: item
        });
    };

}
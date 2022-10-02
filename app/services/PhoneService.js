function PhoneService() {
    this.phonetList = function () {
        let phone = axios({
            method: "get",
            url: 'https://62e7707993938a545bd19492.mockapi.io/PhoneProducts',
        });
        return phone;
    };

    this.showPhone = function (id) {
        return axios({
            method: 'get',
            url: `https://62e7707993938a545bd19492.mockapi.io/PhoneProducts/${id}`,
        });
    };
}
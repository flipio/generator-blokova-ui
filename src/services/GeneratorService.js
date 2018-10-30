import Vue from 'vue'

const BASE_URL = 'https://dev.filipjelic.com';

export default {

    generate(data) {
        return Vue.http.post(BASE_URL + '/api/generator', data)
    }

}

import axios from '../axios/axios'
function get_authorization() {
        let cookies = document.cookie.split(";")
        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].indexOf('Authorization=Bearer') != -1) {
                let cookie = cookies[i].split("=")[1].trim();
                axios.defaults.headers.common['Authorization'] = cookie;
                console.log(axios.defaults.headers.common['Authorization'])
                console.log(document.cookie)
                return cookie;
            }
        }
}
export default get_authorization
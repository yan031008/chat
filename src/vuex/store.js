import { createStore } from 'vuex'

export const store = createStore({
    state(){
        return {
            id: '',
            tel_number:'',
            username: "",
            userimage:''
        }
    },
    mutations: {
        // assgin(state,data) {
        //     // state.id=
        // }
    }
})

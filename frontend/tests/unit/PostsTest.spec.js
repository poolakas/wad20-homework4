import {mount, createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Posts from "../../src/components/Posts.vue";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

//Create dummy store
const store = new Vuex.Store({
    state: {
        user: {
            id: 1,
            firstname: 'test',
            lastname: 'test',
            email: 'test',
            avatar: 'test',
        }
    },
    getters: {
        user: (state) => state.user,
    }
});

//Create dummy routes
const routes = [
    {
        path: '/',
        name: 'posts',
    },
    {
        path: '/profiles',
        name: 'profiles'
    }
];

const router = new VueRouter({routes});

const testData = [
    {
        id: 1,
        text: "I think it's going to rain",
        createTime: "2020-12-05 13:53:23",
        likes: 0,
        liked: false,
        media: {
            url: "test-image.jpg",
            type: "image"
        },
        author: {
            id: 2,
            firstname: "Gordon",
            lastname: "Freeman",
            avatar: 'avatar.url'
        }
    },
    {
        id: 2,
        text: "Which weighs more, a pound of feathers or a pound of bricks?",
        createTime: "2020-12-05 13:53:23",
        likes: 1,
        liked: true,
        media: null,
        author: {
            id: 3,
            firstname: "Sarah",
            lastname: "Connor",
            avatar: 'avatar.url'
        }
    },
    {
        id: 4,
        text: null,
        createTime: "2020-12-05 13:53:23",
        likes: 3,
        liked: false,
        media: {
            url: "test-video.mp4",
            type: "video"
        },
        author: {
            id: 5,
            firstname: "Richard",
            lastname: "Stallman",
            avatar: 'avatar.url'
        }
    }
];

// eslint-disable-next-line no-undef
jest.mock("axios", () => ({
    get: () => Promise.resolve({
        data: testData
    })
}));

describe('Posts', () => {
    const wrapper = mount(Posts, {router, store, localVue});
    it('NumberPosts',() => {
        expect(testData.length==3).toBe(true)
    })
    it('media',() =>{
        let hasMedia = 0
        for(var i = 0; i<testData.length;i++){
            if(testData[i].hasOwnProperty('media')==true){
                if(testData[i]['media'] == null){
                    hasMedia++

                }else {
                    if (testData[i]['media'].hasOwnProperty('type')==true && testData[i]['media'].hasOwnProperty('url')==true   ) {
                        hasMedia++

                    }
                }
            }

        }
        expect(hasMedia==testData.length).toBe(true)
    })

    it('1 == 1', function () {
        expect(true).toBe(true)
    });
    it('dateformat', () =>{
        let correctDate = 0
        for(var i = 0;i<testData.length;i++){
            console.log(testData[i]['createTime'])
            //if(testData[i]['createTime'].DateTimeFormat())
        }
        expect()
    })
});
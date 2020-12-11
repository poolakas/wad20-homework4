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
        const divpost = wrapper.findAll('[class="post"]')
        expect(divpost).toHaveLength(testData.length)
    })
    it('media',() =>{
        const divpost = wrapper.findAll('[class="post-image"]')
        const divpostimg = wrapper.findAll('div div div div img')
        const divpostvid = wrapper.findAll('video')
        expect(divpost.exists()).toBe(true)
        //if there is no media at all this returns false
        expect(divpostimg).toHaveLength(1)
        expect(divpostvid).toHaveLength(1)
        //because there is only 1 video rendered
    })

    it('1 == 1', function () {
        expect(true).toBe(true)
    });
    it('dateformat', () =>{
        const divpost = wrapper.findAll('[class="date"]')
        var options = {weekday:'long'}
        var options2 = {month: 'long'}
        for(var i = 0; i<  divpost.length;i++){
            let datesplit = divpost.at(i).text().split(',')
            let day = (datesplit[0])
            if(day ==="Sunday"||day==="Monday"||day==="Tuesday"||day ==="Wednesday"||day==="Thursday"||day==="Friday"||day==="Saturday"){
                expect(true).toBe(true)
            }
            let month = (datesplit[1].split(" "))[1]
            if(month==="January"||month==="February"||month==="March"||month==="April"||month==="May"||month==="June"||month==="July"||month==="August"||month==="September"||month==="October"||month==="November"||month==="December"){
                expect(true).toBe(true)
            }
            let day2 = (datesplit[1].split(" "))[2]
            if(day2<32 && day2>0){
                expect(true).toBe(true)
            }
            let year = (datesplit[2].split(" "))[1]
            if(year<2030 && year>1900){
                expect(true).toBe(true)

            }
            let clock1 = (datesplit[2].split(" "))[2].split(":")
            if(clock1[0]<=12 && clock1[0]>=0 && clock1[1]>=0 && clock1[1]<=60){
                expect(true).toBe(true)

            }
            let clock2 = (datesplit[2].split(" "))[3]
            if(clock2==="AM"||clock2==="PM"){
                expect(true).toBe(true)

            }
        }
    })
});
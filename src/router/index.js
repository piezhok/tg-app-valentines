import { createRouter, createWebHashHistory } from 'vue-router'
import Received from '../views/ReceivedView.vue'
import Letter from '../views/LetterView.vue'
import Sent from '../views/SentView.vue'
import New from '../views/NewView.vue'

const routes = [
    {
        path: '/received',
        name: 'received',
        component: Received
    }, {
        path: '/received/:id(\\d+)',
        name: 'received-letter',
        component: Letter
    }, {
        path: '/sent',
        name: 'sent',
        component: Sent
    },
    {
        path: '/sent/:id(\\d+)',
        name: 'sent-letter',
        component: Letter
    }, {
        path: '/new',
        name: 'new',
        component: New
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.afterEach((to, from) => {
    if (to.params.id != undefined && from.params.id != undefined) {
        const toId = parseInt(to.params.id);
        const fromId = parseInt(from.params.id);
        if (toId < fromId) {
            to.meta.transition = 'slide-right';

        } else if (toId > toId) {
            to.meta.transition = 'slide-left';
        }
    } else {
        to.meta.transition = 'fade';
    }
    // const toDepth = to.path.split('/').length
    // const fromDepth = from.path.split('/').length
    // to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})

export default router
import { router } from '../../main.js'

//点击跳转页面
export function toProducts(type){
    switch(type){
        case 'AGV4':
            router.push({path: '/AGV4'})
            break;
        case 'agvLanJingLing':
            router.push({path: '/LanJingLing'})
            break;
        case 'forklift':
            router.push({path: '/forklift1'})
            break;
        case 'upperMachine':
            router.push({path: '/UpperMachine'})
            break;
    }
}
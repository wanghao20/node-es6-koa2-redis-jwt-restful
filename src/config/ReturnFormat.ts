/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：与前端交互时定义的返回变量格式
 */
// 红包列表
class RedEnvelopeVal {
    id = '';
    generation = 0;
    grade = 0;
    isExpired = 0;
    littleTime: any;
}
// 征战列表
// tslint:disable-next-line:max-classes-per-file
class Expeditions {
    id = '';
    name = 0;
    grade = 0;
    headImg = 0;
    isRed=0;
    redDate=''
}
// 征战列表
// tslint:disable-next-line:max-classes-per-file
class ArmyList {
    id = '';
    name = 0;
    grade = 0;
    headImg = 0;
}

export { RedEnvelopeVal, Expeditions,ArmyList }
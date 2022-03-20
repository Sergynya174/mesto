export default class UserInfo {
    constructor({data}){
        this._name = data.name;
        this._job = data.job;
    }

    getUserInfo(){
        const userData = {
            name: this._name.textContent,
            job: this._job.textContent
        }
        return userData;
    }

    setUserInfo(userData){
        this._name.textContent = userData.name;
        this._job.textContent = userData.job;
    }
}
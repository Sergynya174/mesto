export default class UserInfo {
    constructor({data}){
        this._name = data.name;
        this._job = data.about;
        this._avatar = data.avatar;
    }

    getUserInfo(){
        const userData = {
            name: this._name.textContent,
            about: this._job.textContent
        }
        return userData;
    }

    setUserInfo(userData){
        this._name.textContent = userData.name;
        this._job.textContent = userData.about;
        this.setUserAvatar(userData);
    }

    setUserAvatar(data){
        this._avatar.src = data.avatar;
    }
}
class Api {
    constructor(options){
        this._options = options;
    }

    getProfile() {
        return fetch(`${this._options.url}/users/me`, {
            method: 'GET',
            headers: this._options.headers
        }).then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).then((obj) => {
            return obj;
        }).catch((err) => {
            console.error(err);
        })
    }
    
    getCards() {
        return fetch(`${this._options.url}/cards`, {
            method: 'GET',
            headers: this._options.headers
        }).then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).then((obj) => {
            return obj;
        }).catch((err) => {
            console.error(err);
        })
    }
    
    editProfile(userData) {
        return fetch(`${this._options.url}/users/me`, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        }).then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).then((obj) => {
            return obj;
        }).catch((err) => {
            console.error(err);
        })
    }

    addCard(data) {
        return fetch(`${this._options.url}/cards`, {
            method: 'POST',
            headers: this._options.headers,
            body: JSON.stringify({
                name: data.title,
                link: data.link
            })
        }).then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).then((obj) => {
            return obj;
        }).catch((err) => {
            console.error(err);
        })
    }

    deleteCard(id) {
        return fetch(`${this._options.url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._options.headers
        }).then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).then((obj) => {
            return obj;
        }).catch((err) => {
            console.error(err);
        })
    }

    addLike(id) {
        return fetch(`${this._options.url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._options.headers
        }).then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).then((obj) => {
            return obj;
        }).catch((err) => {
            console.error(err);
        })
    }

    deleteLike(id) {
        return fetch(`${this._options.url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._options.headers
        }).then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).then((obj) => {
            return obj;
        }).catch((err) => {
            console.error(err);
        })
    }

    addAvatar(data) {
        return fetch(`${this._options.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                avatar: data.url
            })
        }).then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).then((obj) => {
            return obj;
        }).catch((err) => {
            console.log(err);
        })
    }
}

export const api = new Api ({
    url: 'https://mesto.nomoreparties.co/v1/cohort-38',
    headers: {
    authorization: 'f2d279ee-e2e6-4713-9f2e-835540e17693',
    'Content-Type': 'application/json; charset=utf-8'
  }
})
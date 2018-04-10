class App
{
    constructor () {
        this.DOM = {};
    }

    init () {
        this.DOM.name = document.querySelector('.name');
        this.setLoading(true);
        this.addUserName();
        this.setLoading(false);
    }

    setLoading (loading) {
        if (loading) {
            document.body.className += ' loading';
        }
        else {
            document.body.className = document.body.className
                .replace(/\bloading\b/g, '')
                .replace(/\b\s\s\b/, ' ')
                .trim();
        }
    }

    addUserName () {
        const userInfo = window.ShowpadLib.getUserInfo();
        this.DOM.name.innerHTML = userInfo.user_name;
    }
}

window.onShowpadLibLoaded = () => {
    const app = new App();
    app.init();
};
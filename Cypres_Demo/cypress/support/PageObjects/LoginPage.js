import AbtractsPage from "../commons/AbtractsPage";

class LoginPage extends AbtractsPage {
    constructor(){
        super();
        this.logo = '.logo';
        this.userName = '#username';
        this.password = '#password';
        this.loginBtn = '.ant-btn';
        this.forgotPassword = 'a';
        this.warningMessageEmptyUserName = ':nth-child(1) > .ant-col > .ant-form-item-control > .ant-form-explain';
        this.warningMessageEmptyPassword = ':nth-child(2) > .ant-col > .ant-form-item-control > .ant-form-explain';
        this.alertIncorrectUser = '.ant-notification-notice';
    }

}

export default LoginPage;
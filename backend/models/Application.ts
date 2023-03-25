export default class Application {
    companyName: string;
    applicationDate: string;
    applicationStatus: string;
    // for multiple applications to the same company if needed
    applicationId: string;

    constructor(companyName: string, applicationDate: string, applicationStatus: string, applicationId: string) {
        this.companyName = companyName;
        this.applicationDate = applicationDate;
        this.applicationStatus = applicationStatus;
        this.applicationId = applicationId;
    }
}
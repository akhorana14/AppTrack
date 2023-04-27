export enum Classification {
    /**
     * Application Confirmation
     */
    APPLIED,
    ONLINE_ASSESSMENT,
    INTERVIEW,
    OFFER,
    REJECT,
    STALE,
    OTHER
}

export function parseClassification(str: string) {
    str = str.toUpperCase();
    switch (str) {
        case "APPLICATION CONFIRMATION":
            return Classification.APPLIED;
        case "APPLIED":
            return Classification.APPLIED;
        case "ONLINE_ASSESSMENT":
            return Classification.ONLINE_ASSESSMENT;
        case "ONLINE ASSESSMENT":
            return Classification.ONLINE_ASSESSMENT;
        case "OA":
            return Classification.ONLINE_ASSESSMENT;
        case "INTERVIEW":
            return Classification.INTERVIEW;
        case "OFFER":
            return Classification.OFFER;
        case "REJECT":
            return Classification.REJECT;
        case "REJECTION":
            return Classification.REJECT;
        case "REJECTED":
            return Classification.REJECT;
        case "OTHER":
            return Classification.OTHER;
    }
    throw {message: "Invalid classification type"};
}

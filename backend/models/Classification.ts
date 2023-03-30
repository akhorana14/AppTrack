export enum Classification {
    APPLIED,
    ONLINE_ASSESSMENT,
    INTERVIEW,
    OFFER,
    REJECT,
    OTHER
}

export function parseClassification(str: string) {
    str = str.toUpperCase();
    switch(str) {
        case "APPLIED":
            return Classification.APPLIED;
        case "ONLINE_ASSESSMENT":
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
    return null;
}

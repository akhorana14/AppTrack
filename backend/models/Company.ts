export default class Company {
    name: string;
    link: string; 
    leetcodeLink: string;
    levelsLink: string;
    color: string;

    constructor(name: string, link: string, leetcodeLink: string, levelsLink: string, color: string) {
        this.name = name;
        this.link = link;
        this.leetcodeLink = leetcodeLink;
        this.levelsLink = levelsLink;
        this.color = color;
    }
}
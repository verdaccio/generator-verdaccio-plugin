import Generator from "yeoman-generator";
export default class VerdaccioPluginGenerator extends Generator {
    private props;
    private projectName;
    private destinationPathName;
    constructor(args: any, opts: any);
    prompting(): Promise<void>;
    packageJSON(): void;
    writing(): void;
    install(): void;
}

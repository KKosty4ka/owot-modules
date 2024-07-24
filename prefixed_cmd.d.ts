interface PrefixedCmdEvent {
    data: any;
    sender: string;
    id?: string;
    username?: string;
}

type PrefixedCmdModule = {
    sendCmd: (prefix: string, obj: any, includeUsername?: bool) => void,
    onCmd: (prefix: string, handler: (e: PrefixedCmdEvent) => void) => void,
    offCmd: (prefix: string, handler: (e: PrefixedCmdEvent) => void) => void
};
let handlers = {};

function sendCmd(prefix, obj, includeUsername) {
    w.broadcastCommand(prefix + JSON.stringify(obj), includeUsername);
}

function onCmd(prefix, handler) {
    if (!handlers.hasOwnProperty(prefix)) {
        handlers[prefix] = [];
    }

    handlers[prefix].push(handler);
}

function offCmd(prefix, handler) {
    if (!handlers.hasOwnProperty(prefix)) return;

    while (true) {
        let idx = handlers[prefix].indexOf(handler);
        if (idx === -1) break;

        handlers[prefix].splice(idx, 1);
    }
}

w.broadcastReceive();

w.on("cmd", e => {
    for (let prefix in handlers) {
        if (!handlers[prefix].length) continue;
        if (!e.data.startsWith(prefix)) continue;

        let data = e.data.substring(prefix.length);

        try {
            data = JSON.parse(data);
        } catch {
            continue;
        }

        let event = {
            data,
            sender: e.sender,
            id: e.id,
            username: e.username
        };

        for (let handler of handlers[prefix]) {
            handler(event);
        }
    }
});

return {
    sendCmd,
    onCmd
};
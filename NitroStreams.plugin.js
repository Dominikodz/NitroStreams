/**
 * @name NitroStreams
 * @author Domson
 * @description Allows you to stream in Discord's Nitro quality.
 * @version 1.1.0
 * @website https://github.com/Dominikodz/NitroStreams
 * @source https://github.com/Dominikodz/NitroStreams/blob/main/NitroStreams.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Dominikodz/NitroStreams/main/NitroStreams.plugin.js
 */
/*@cc_on
@if (@_jscript)
    
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();

@else@*/

/*
 * Copyright © 2019-2023, Domson
 * All rights reserved.
 * Code may not be redistributed, modified or otherwise taken without explicit permission.
 */

const config = {
	info: {
		name: "NitroStreams",
		authors: [
            {
                name: "Domson 🤔",
                discord_id: "477079532999016448",
                github_username: "Dominikodz"
		    }
        ],
        version: "1.1.0",
		description: "Allows you to stream in Discord's Nitro quality.",
		github: "https://github.com/Dominikodz/NitroStreams",
		github_raw: "https://raw.githubusercontent.com/Dominikodz/NitroStreams/main/NitroStreams.plugin.js"
	},
	changelog: [
        {
            title: "NitroStreams Updated!",
            type: "fixed",
            items: [
                "Updated plugin. If discord decides to patch this method, i will autoUpdate the plugin :)."
            ]
	    }
    ],
    main: "NitroStreams.plugin.js",
};

class Dummy {
    constructor() {this._config = config;}
    start() {}
    stop() {}
}

if (!window.hasOwnProperty("ZeresPluginLibrary")) {
    BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
        confirmText: "Download Now",
        cancelText: "Cancel",
        onConfirm: () => {
            require("request").get("https://betterdiscord.app/gh-redirect?id=9", async (err, resp, body) => {
                if (err) return require("electron").shell.openExternal("https://betterdiscord.app/Download?id=9");
                if (resp.statusCode === 302) {
                    require("request").get(resp.headers.location, async (error, response, content) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.app/Download?id=9");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), content, r));
                    });
                }
                else {
                    await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                }
            });
        }
    });
};
module.exports = !global.ZeresPluginLibrary ? Dummy : (([Plugin, Api]) => {
    const plugin = (Plugin, Api) => {
    const {ContextMenu, DOM, Webpack, Patcher} = window.BdApi;

    /* globals BdApi:false */
    return class NitroStreams extends Plugin {
        onStart() {
            console.log(
                window.webpackChunkdiscord_app.push([
                    [Math.random()], {}, (req) => {
                        for (const m of Object.keys(req.c).map((x) => req.c[x].exports).filter((x) => x)) {
                            if (m.default && m.default.getCurrentUser !== undefined) {
                                return m.default.getCurrentUser().premiumType = 2;
                            }
                        }
                    }
                ])
            );
        }
       
        onStop() {}
    };
};
    return plugin(Plugin, Api);
})(global.ZeresPluginLibrary.buildPlugin(config));
/*@end@*/

var SmartRead = SmartRead || {};

SmartRead.AddSubScriptionAction = {
run: function(arguments){
    arguments.completionFunction({
                                 baseURI: document.baseURI
    });
}
}

var ExtensionPreprocessingJS = SmartRead.AddSubScriptionAction;
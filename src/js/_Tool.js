function Tool(){}
Tool.prototype = {
    desc: null,
    name: null,
    task : null,
    run: function(visor){this.task(visor)}
}
// ---| Declaramos las tareas generales |---
var ZoomIn = {
    name: "ZoomIn tool",
    desc: "Hacer zoom sobre el documento actual",
    task: function(visor){
        visor.zoomIn();
    }
}
// extendemos del objeto Tool
ZoomIn = Utils.merge(ZoomIn, Tool);
// y lo hacemos inmutable
Utils.makeFinal(ZoomIn);

var ZoomOut = {
    name: "ZoomOut",
    desc: "Reducir el zoom del documento",
    task: function(visor){
        visor.zoomOut();
    }
}
// extendemos del objeto Tool
ZoomOut = Utils.merge(ZoomOut, Tool);
// y lo hacemos inmutable
Utils.makeFinal(ZoomOut);

var Save = {
    name: "Guardar",
    desc: "Descargar el documento actual",
    task: function(visor){
        visor.download();
    }
}
// extendemos del objeto Tool
Save = Utils.merge(Save, Tool);
// y lo hacemos inmutable
Utils.makeFinal(Save);

var FullScreen = {
    name: "Pantalla completa",
    desc: "Abre el documento en pantalla completa",
    task: function(visor){
        visor.goFullscreen();
    }
}
// extendemos del objeto Tool
FullScreen = Utils.merge(FullScreen, Tool);
// y lo hacemos inmutable
Utils.makeFinal(FullScreen);

function ToolItem(tool){
    console.assert(tool !== undefined,"Illegal argument");
    if(tool instanceof Tool){
        this.element = null;
        this.tool = tool;
    }
    else if(typeof tool === "object"){
        this.tool = tool.tool;
        this.element = tool.element;
        var _this = this;
    } else throw new TypeError("Illegal argument type");
}
ToolItem.prototype = {
    setElement: function(e){
        this.element = e;
    },
    setTool: function(tool){
        console.assert(typeof tool === "object", "Illegal argument");
        this.tool = tool;
    },
    run: function(visor){
        this.tool.run(visor);
    },
    getElement: function(){
        return this.element;
    },
    getTool: function(){
        return this.tool;
    }
}
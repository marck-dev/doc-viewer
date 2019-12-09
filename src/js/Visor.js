function Visor(){
    this.document = null;
    this.scale = 1;
    // enlace para descargar en Internet Explorer
    this.IEDownloadUrl = null;
    // events
    /**
     * @event cuando carga el documento
     */
    this.ondocumentload = null;
    /**
     * @event cuando se cambia el documento
     */
    this.ondocumentchange = null;
    /**
     * @event al hacer zoom
     */
    this.onzoomin = null;
    /**
     * @event al quitar el zoom
     */
    this.onzoomout = null;
    /**
     * @event al entar en pantalla completa
     */
    this.onfullscreenenter = null;
    /**
     * @event al salir de la pantalla completa
     */
    this.onfullscreenexit = null;
    /**
     * @event cuando se descarga el archivo
     */
    this.ondownload = null;
    /**
     * @event cuando se cambia la escala del documento
     */
    this.onscalechange = null;
}

Visor.prototype = {
    setDocument: function(doc){
        this.document = doc;
        if(this.ondocumentchange != null && Utils.isFunction(this.ondocumentchange))
            this.ondocumentchange(this);
        return this;
    },
    setScale: function(scale){
        this.scale = scale;
        if(this.onscalechange != null && 
            Utils.isFunction(this.onscalechange))
            this.onscalechange(this);
        return this;
    },
    setIEDownloadUrl: function(url){
        this.IEDownloadUrl = url;
        return this;
    },
    render: function(canvas){
        if(!canvas instanceof HTMLElement) throw new TypeError("No se ha pasado un objeto canvas")
        // renderDoc Abstract method
        this.renderDoc(canvas);
        return this;
    },
    /**
     * Renderiza el documento en el contexto dado
     * @abstract 
     * @param {HTMLCanvasElement} canvas 
     */
    renderDoc: null
}
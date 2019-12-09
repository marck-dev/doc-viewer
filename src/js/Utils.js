
// código embebido
(function(){
    /**
     * Objeto con varias funciones utiles
     * @author Marck C. Guzman
     * @instance
     */
    var Utils = {
        /**
         * Permite clear objetos que hereden de funciones u otro objeto,
         * una forma trivial de simular la herencia en javascript
         * @param {Object} p Objeto | fucion a extender
         * @returns {Object} el nuevo objeto que hereda del que se le ha pasado
         */
        inherit: function (p) {
            if (p == null || p == undefined) throw new TypeError();
            if (Object.create)
                return Object.create(p);
            if (typeof p !== "function" || typeof p !== "object") throw new TypeError();
            var out = function () { };
            out.prototype = p;
            return new out();
        },
        /**
         * Comprueba si lo que se le pasa es una funcion o no
         * @param {function} f funcion a comprobar
         * @returns {boolean}
         */
        isFunction: function(f){
            return typeof f === "function";
        },
        /**
         * Crea una fusión entre dos objetos, estableciendon las propeiedades que no esten
         * en el objeto inicial pero si en el modelo, con los valores por defecto del modelo
         * @param {Object} input objeto a comprobar
         * @param {Object} model modelo que se desea obtener
         * @returns {Object} el objeto resultante del merge
         */
        merge: function(input, model){
            for(var k in model){
                if(!input.hasOwnProperty(k))
                    input[k] = model[k];
            }
            return input;
        },
        /**
         * Evita que un objeto sea extensible, que se le puedan añadir propiedades
         * y que estas se puedan modificar
         * @param {Object} obj que se desea hacer constante
         */
        makeFinal : function(obj){
            Object.preventExtensions(obj);
            for(var prop in obj){
                Object.defineProperty(obj,prop,{writable: false, enumerable: true, configurable: false});
            }
        },
        /**
         * Clona objetos no nativos, los que se crean, manteniendo los valores del
         * objeto que se recibe.
         * @param {Object} obj objeto a clonar
         */
        clone: function(obj){
            var a = this.inherit(obj);
            for(var prop in obj){
                a[prop] = obj[prop];
            }
            return a;
        },
        /**
         * Recorre un array u objeto y ejecuta la función de callback que se le pasa,
         * esta función recibe el elemnto actual
         * @param {Object} object objeto a recorrer
         * @callback callback(element) funcion
         */
        foreach: function(object, callback){
            if(typeof callback !== "function") throw new TypeError();
            for(var prop in object){
                callback(object[prop]);
            }
        }
    }
    Utils.makeFinal(Utils);
    window.Utils = Utils;
})()
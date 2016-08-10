(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var _cmp = 'components/';
  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf(_cmp) === 0) {
        start = _cmp.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return _cmp + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var _reg = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (_reg.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  require._cache = cache;
  globals.require = require;
})();
"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;}; /*!
 * jQuery JavaScript Library v2.2.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-04-05T19:26Z
 */(function(global,factory){if((typeof module==="undefined"?"undefined":_typeof(module))==="object"&&_typeof(module.exports)==="object"){ // For CommonJS and CommonJS-like environments where a proper `window`
// is present, execute the factory and get jQuery.
// For environments that do not have a `window` with a `document`
// (such as Node.js), expose a factory as module.exports.
// This accentuates the need for the creation of a real `window`.
// e.g. var jQuery = require("jquery")(window);
// See ticket #14549 for more info.
module.exports=global.document?factory(global,true):function(w){if(!w.document){throw new Error("jQuery requires a window with a document");}return factory(w);};}else {factory(global);} // Pass this if window is not defined yet
})(typeof window!=="undefined"?window:undefined,function(window,noGlobal){ // Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr=[];var document=window.document;var _slice=arr.slice;var concat=arr.concat;var push=arr.push;var indexOf=arr.indexOf;var class2type={};var toString=class2type.toString;var hasOwn=class2type.hasOwnProperty;var support={};var version="2.2.3", // Define a local copy of jQuery
jQuery=function jQuery(selector,context){ // The jQuery object is actually just the init constructor 'enhanced'
// Need init if jQuery is called (just allow error to be thrown if not included)
return new jQuery.fn.init(selector,context);}, // Support: Android<4.1
// Make sure we trim BOM and NBSP
rtrim=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, // Matches dashed string for camelizing
rmsPrefix=/^-ms-/,rdashAlpha=/-([\da-z])/gi, // Used by jQuery.camelCase as callback to replace()
fcamelCase=function fcamelCase(all,letter){return letter.toUpperCase();};jQuery.fn=jQuery.prototype={ // The current version of jQuery being used
jquery:version,constructor:jQuery, // Start with an empty selector
selector:"", // The default length of a jQuery object is 0
length:0,toArray:function toArray(){return _slice.call(this);}, // Get the Nth element in the matched element set OR
// Get the whole matched element set as a clean array
get:function get(num){return num!=null? // Return just the one element from the set
num<0?this[num+this.length]:this[num]: // Return all the elements in a clean array
_slice.call(this);}, // Take an array of elements and push it onto the stack
// (returning the new matched element set)
pushStack:function pushStack(elems){ // Build a new jQuery matched element set
var ret=jQuery.merge(this.constructor(),elems); // Add the old object onto the stack (as a reference)
ret.prevObject=this;ret.context=this.context; // Return the newly-formed element set
return ret;}, // Execute a callback for every element in the matched set.
each:function each(callback){return jQuery.each(this,callback);},map:function map(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},slice:function slice(){return this.pushStack(_slice.apply(this,arguments));},first:function first(){return this.eq(0);},last:function last(){return this.eq(-1);},eq:function eq(i){var len=this.length,j=+i+(i<0?len:0);return this.pushStack(j>=0&&j<len?[this[j]]:[]);},end:function end(){return this.prevObject||this.constructor();}, // For internal use only.
// Behaves like an Array's method, not like a jQuery method.
push:push,sort:arr.sort,splice:arr.splice};jQuery.extend=jQuery.fn.extend=function(){var options,name,src,copy,copyIsArray,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false; // Handle a deep copy situation
if(typeof target==="boolean"){deep=target; // Skip the boolean and the target
target=arguments[i]||{};i++;} // Handle case when target is a string or something (possible in deep copy)
if((typeof target==="undefined"?"undefined":_typeof(target))!=="object"&&!jQuery.isFunction(target)){target={};} // Extend jQuery itself if only one argument is passed
if(i===length){target=this;i--;}for(;i<length;i++){ // Only deal with non-null/undefined values
if((options=arguments[i])!=null){ // Extend the base object
for(name in options){src=target[name];copy=options[name]; // Prevent never-ending loop
if(target===copy){continue;} // Recurse if we're merging plain objects or arrays
if(deep&&copy&&(jQuery.isPlainObject(copy)||(copyIsArray=jQuery.isArray(copy)))){if(copyIsArray){copyIsArray=false;clone=src&&jQuery.isArray(src)?src:[];}else {clone=src&&jQuery.isPlainObject(src)?src:{};} // Never move original objects, clone them
target[name]=jQuery.extend(deep,clone,copy); // Don't bring in undefined values
}else if(copy!==undefined){target[name]=copy;}}}} // Return the modified object
return target;};jQuery.extend({ // Unique for each copy of jQuery on the page
expando:"jQuery"+(version+Math.random()).replace(/\D/g,""), // Assume jQuery is ready without the ready module
isReady:true,error:function error(msg){throw new Error(msg);},noop:function noop(){},isFunction:function isFunction(obj){return jQuery.type(obj)==="function";},isArray:Array.isArray,isWindow:function isWindow(obj){return obj!=null&&obj===obj.window;},isNumeric:function isNumeric(obj){ // parseFloat NaNs numeric-cast false positives (null|true|false|"")
// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
// subtraction forces infinities to NaN
// adding 1 corrects loss of precision from parseFloat (#15100)
var realStringObj=obj&&obj.toString();return !jQuery.isArray(obj)&&realStringObj-parseFloat(realStringObj)+1>=0;},isPlainObject:function isPlainObject(obj){var key; // Not plain objects:
// - Any object or value whose internal [[Class]] property is not "[object Object]"
// - DOM nodes
// - window
if(jQuery.type(obj)!=="object"||obj.nodeType||jQuery.isWindow(obj)){return false;} // Not own constructor property must be Object
if(obj.constructor&&!hasOwn.call(obj,"constructor")&&!hasOwn.call(obj.constructor.prototype||{},"isPrototypeOf")){return false;} // Own properties are enumerated firstly, so to speed up,
// if last one is own, then all properties are own
for(key in obj){}return key===undefined||hasOwn.call(obj,key);},isEmptyObject:function isEmptyObject(obj){var name;for(name in obj){return false;}return true;},type:function type(obj){if(obj==null){return obj+"";} // Support: Android<4.0, iOS<6 (functionish RegExp)
return (typeof obj==="undefined"?"undefined":_typeof(obj))==="object"||typeof obj==="function"?class2type[toString.call(obj)]||"object":typeof obj==="undefined"?"undefined":_typeof(obj);}, // Evaluates a script in a global context
globalEval:function globalEval(code){var script,indirect=eval;code=jQuery.trim(code);if(code){ // If the code includes a valid, prologue position
// strict mode pragma, execute code by injecting a
// script tag into the document.
if(code.indexOf("use strict")===1){script=document.createElement("script");script.text=code;document.head.appendChild(script).parentNode.removeChild(script);}else { // Otherwise, avoid the DOM node creation, insertion
// and removal by using an indirect global eval
indirect(code);}}}, // Convert dashed to camelCase; used by the css and data modules
// Support: IE9-11+
// Microsoft forgot to hump their vendor prefix (#9572)
camelCase:function camelCase(string){return string.replace(rmsPrefix,"ms-").replace(rdashAlpha,fcamelCase);},nodeName:function nodeName(elem,name){return elem.nodeName&&elem.nodeName.toLowerCase()===name.toLowerCase();},each:function each(obj,callback){var length,i=0;if(isArrayLike(obj)){length=obj.length;for(;i<length;i++){if(callback.call(obj[i],i,obj[i])===false){break;}}}else {for(i in obj){if(callback.call(obj[i],i,obj[i])===false){break;}}}return obj;}, // Support: Android<4.1
trim:function trim(text){return text==null?"":(text+"").replace(rtrim,"");}, // results is for internal usage only
makeArray:function makeArray(arr,results){var ret=results||[];if(arr!=null){if(isArrayLike(Object(arr))){jQuery.merge(ret,typeof arr==="string"?[arr]:arr);}else {push.call(ret,arr);}}return ret;},inArray:function inArray(elem,arr,i){return arr==null?-1:indexOf.call(arr,elem,i);},merge:function merge(first,second){var len=+second.length,j=0,i=first.length;for(;j<len;j++){first[i++]=second[j];}first.length=i;return first;},grep:function grep(elems,callback,invert){var callbackInverse,matches=[],i=0,length=elems.length,callbackExpect=!invert; // Go through the array, only saving the items
// that pass the validator function
for(;i<length;i++){callbackInverse=!callback(elems[i],i);if(callbackInverse!==callbackExpect){matches.push(elems[i]);}}return matches;}, // arg is for internal usage only
map:function map(elems,callback,arg){var length,value,i=0,ret=[]; // Go through the array, translating each of the items to their new values
if(isArrayLike(elems)){length=elems.length;for(;i<length;i++){value=callback(elems[i],i,arg);if(value!=null){ret.push(value);}} // Go through every key on the object,
}else {for(i in elems){value=callback(elems[i],i,arg);if(value!=null){ret.push(value);}}} // Flatten any nested arrays
return concat.apply([],ret);}, // A global GUID counter for objects
guid:1, // Bind a function to a context, optionally partially applying any
// arguments.
proxy:function proxy(fn,context){var tmp,args,proxy;if(typeof context==="string"){tmp=fn[context];context=fn;fn=tmp;} // Quick check to determine if target is callable, in the spec
// this throws a TypeError, but we will just return undefined.
if(!jQuery.isFunction(fn)){return undefined;} // Simulated bind
args=_slice.call(arguments,2);proxy=function proxy(){return fn.apply(context||this,args.concat(_slice.call(arguments)));}; // Set the guid of unique handler to the same of original handler, so it can be removed
proxy.guid=fn.guid=fn.guid||jQuery.guid++;return proxy;},now:Date.now, // jQuery.support is not used in Core but other projects attach their
// properties to it so it needs to exist.
support:support}); // JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */if(typeof Symbol==="function"){jQuery.fn[Symbol.iterator]=arr[Symbol.iterator];} /* jshint ignore: end */ // Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(i,name){class2type["[object "+name+"]"]=name.toLowerCase();});function isArrayLike(obj){ // Support: iOS 8.2 (not reproducible in simulator)
// `in` check used to prevent JIT error (gh-2145)
// hasOwn isn't used here due to false negatives
// regarding Nodelist length in IE
var length=!!obj&&"length" in obj&&obj.length,type=jQuery.type(obj);if(type==="function"||jQuery.isWindow(obj)){return false;}return type==="array"||length===0||typeof length==="number"&&length>0&&length-1 in obj;}var Sizzle= /*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */function(window){var i,support,Expr,getText,isXML,tokenize,compile,select,outermostContext,sortInput,hasDuplicate, // Local document vars
setDocument,document,docElem,documentIsHTML,rbuggyQSA,rbuggyMatches,matches,contains, // Instance-specific data
expando="sizzle"+1*new Date(),preferredDoc=window.document,dirruns=0,done=0,classCache=createCache(),tokenCache=createCache(),compilerCache=createCache(),sortOrder=function sortOrder(a,b){if(a===b){hasDuplicate=true;}return 0;}, // General-purpose constants
MAX_NEGATIVE=1<<31, // Instance methods
hasOwn={}.hasOwnProperty,arr=[],pop=arr.pop,push_native=arr.push,push=arr.push,slice=arr.slice, // Use a stripped-down indexOf as it's faster than native
// http://jsperf.com/thor-indexof-vs-for/5
indexOf=function indexOf(list,elem){var i=0,len=list.length;for(;i<len;i++){if(list[i]===elem){return i;}}return -1;},booleans="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", // Regular expressions
// http://www.w3.org/TR/css3-selectors/#whitespace
whitespace="[\\x20\\t\\r\\n\\f]", // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
identifier="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
attributes="\\["+whitespace+"*("+identifier+")(?:"+whitespace+ // Operator (capture 2)
"*([*^$|!~]?=)"+whitespace+ // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+identifier+"))|)"+whitespace+"*\\]",pseudos=":("+identifier+")(?:\\(("+ // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
// 1. quoted (capture 3; capture 4 or capture 5)
"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|"+ // 2. simple (capture 6)
"((?:\\\\.|[^\\\\()[\\]]|"+attributes+")*)|"+ // 3. anything else (capture 2)
".*"+")\\)|)", // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
rwhitespace=new RegExp(whitespace+"+","g"),rtrim=new RegExp("^"+whitespace+"+|((?:^|[^\\\\])(?:\\\\.)*)"+whitespace+"+$","g"),rcomma=new RegExp("^"+whitespace+"*,"+whitespace+"*"),rcombinators=new RegExp("^"+whitespace+"*([>+~]|"+whitespace+")"+whitespace+"*"),rattributeQuotes=new RegExp("="+whitespace+"*([^\\]'\"]*?)"+whitespace+"*\\]","g"),rpseudo=new RegExp(pseudos),ridentifier=new RegExp("^"+identifier+"$"),matchExpr={"ID":new RegExp("^#("+identifier+")"),"CLASS":new RegExp("^\\.("+identifier+")"),"TAG":new RegExp("^("+identifier+"|[*])"),"ATTR":new RegExp("^"+attributes),"PSEUDO":new RegExp("^"+pseudos),"CHILD":new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+whitespace+"*(even|odd|(([+-]|)(\\d*)n|)"+whitespace+"*(?:([+-]|)"+whitespace+"*(\\d+)|))"+whitespace+"*\\)|)","i"),"bool":new RegExp("^(?:"+booleans+")$","i"), // For use in libraries implementing .is()
// We use this for POS matching in `select`
"needsContext":new RegExp("^"+whitespace+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+whitespace+"*((?:-\\d)?\\d*)"+whitespace+"*\\)|)(?=[^-]|$)","i")},rinputs=/^(?:input|select|textarea|button)$/i,rheader=/^h\d$/i,rnative=/^[^{]+\{\s*\[native \w/, // Easily-parseable/retrievable ID or TAG or CLASS selectors
rquickExpr=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,rsibling=/[+~]/,rescape=/'|\\/g, // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
runescape=new RegExp("\\\\([\\da-f]{1,6}"+whitespace+"?|("+whitespace+")|.)","ig"),funescape=function funescape(_,escaped,escapedWhitespace){var high="0x"+escaped-0x10000; // NaN means non-codepoint
// Support: Firefox<24
// Workaround erroneous numeric interpretation of +"0x"
return high!==high||escapedWhitespace?escaped:high<0? // BMP codepoint
String.fromCharCode(high+0x10000): // Supplemental Plane codepoint (surrogate pair)
String.fromCharCode(high>>10|0xD800,high&0x3FF|0xDC00);}, // Used for iframes
// See setDocument()
// Removing the function wrapper causes a "Permission Denied"
// error in IE
unloadHandler=function unloadHandler(){setDocument();}; // Optimize for push.apply( _, NodeList )
try{push.apply(arr=slice.call(preferredDoc.childNodes),preferredDoc.childNodes); // Support: Android<4.0
// Detect silently failing push.apply
arr[preferredDoc.childNodes.length].nodeType;}catch(e){push={apply:arr.length? // Leverage slice if possible
function(target,els){push_native.apply(target,slice.call(els));}: // Support: IE<9
// Otherwise append directly
function(target,els){var j=target.length,i=0; // Can't trust NodeList.length
while(target[j++]=els[i++]){}target.length=j-1;}};}function Sizzle(selector,context,results,seed){var m,i,elem,nid,nidselect,match,groups,newSelector,newContext=context&&context.ownerDocument, // nodeType defaults to 9, since context defaults to document
nodeType=context?context.nodeType:9;results=results||[]; // Return early from calls with invalid selector or context
if(typeof selector!=="string"||!selector||nodeType!==1&&nodeType!==9&&nodeType!==11){return results;} // Try to shortcut find operations (as opposed to filters) in HTML documents
if(!seed){if((context?context.ownerDocument||context:preferredDoc)!==document){setDocument(context);}context=context||document;if(documentIsHTML){ // If the selector is sufficiently simple, try using a "get*By*" DOM method
// (excepting DocumentFragment context, where the methods don't exist)
if(nodeType!==11&&(match=rquickExpr.exec(selector))){ // ID selector
if(m=match[1]){ // Document context
if(nodeType===9){if(elem=context.getElementById(m)){ // Support: IE, Opera, Webkit
// TODO: identify versions
// getElementById can match elements by name instead of ID
if(elem.id===m){results.push(elem);return results;}}else {return results;} // Element context
}else { // Support: IE, Opera, Webkit
// TODO: identify versions
// getElementById can match elements by name instead of ID
if(newContext&&(elem=newContext.getElementById(m))&&contains(context,elem)&&elem.id===m){results.push(elem);return results;}} // Type selector
}else if(match[2]){push.apply(results,context.getElementsByTagName(selector));return results; // Class selector
}else if((m=match[3])&&support.getElementsByClassName&&context.getElementsByClassName){push.apply(results,context.getElementsByClassName(m));return results;}} // Take advantage of querySelectorAll
if(support.qsa&&!compilerCache[selector+" "]&&(!rbuggyQSA||!rbuggyQSA.test(selector))){if(nodeType!==1){newContext=context;newSelector=selector; // qSA looks outside Element context, which is not what we want
// Thanks to Andrew Dupont for this workaround technique
// Support: IE <=8
// Exclude object elements
}else if(context.nodeName.toLowerCase()!=="object"){ // Capture the context ID, setting it first if necessary
if(nid=context.getAttribute("id")){nid=nid.replace(rescape,"\\$&");}else {context.setAttribute("id",nid=expando);} // Prefix every selector in the list
groups=tokenize(selector);i=groups.length;nidselect=ridentifier.test(nid)?"#"+nid:"[id='"+nid+"']";while(i--){groups[i]=nidselect+" "+toSelector(groups[i]);}newSelector=groups.join(","); // Expand context for sibling selectors
newContext=rsibling.test(selector)&&testContext(context.parentNode)||context;}if(newSelector){try{push.apply(results,newContext.querySelectorAll(newSelector));return results;}catch(qsaError){}finally {if(nid===expando){context.removeAttribute("id");}}}}}} // All others
return select(selector.replace(rtrim,"$1"),context,results,seed);} /**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */function createCache(){var keys=[];function cache(key,value){ // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
if(keys.push(key+" ")>Expr.cacheLength){ // Only keep the most recent entries
delete cache[keys.shift()];}return cache[key+" "]=value;}return cache;} /**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */function markFunction(fn){fn[expando]=true;return fn;} /**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */function assert(fn){var div=document.createElement("div");try{return !!fn(div);}catch(e){return false;}finally { // Remove from its parent by default
if(div.parentNode){div.parentNode.removeChild(div);} // release memory in IE
div=null;}} /**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */function addHandle(attrs,handler){var arr=attrs.split("|"),i=arr.length;while(i--){Expr.attrHandle[arr[i]]=handler;}} /**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */function siblingCheck(a,b){var cur=b&&a,diff=cur&&a.nodeType===1&&b.nodeType===1&&(~b.sourceIndex||MAX_NEGATIVE)-(~a.sourceIndex||MAX_NEGATIVE); // Use IE sourceIndex if available on both nodes
if(diff){return diff;} // Check if b follows a
if(cur){while(cur=cur.nextSibling){if(cur===b){return -1;}}}return a?1:-1;} /**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */function createInputPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type===type;};} /**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */function createButtonPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return (name==="input"||name==="button")&&elem.type===type;};} /**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */function createPositionalPseudo(fn){return markFunction(function(argument){argument=+argument;return markFunction(function(seed,matches){var j,matchIndexes=fn([],seed.length,argument),i=matchIndexes.length; // Match elements found at the specified indexes
while(i--){if(seed[j=matchIndexes[i]]){seed[j]=!(matches[j]=seed[j]);}}});});} /**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */function testContext(context){return context&&typeof context.getElementsByTagName!=="undefined"&&context;} // Expose support vars for convenience
support=Sizzle.support={}; /**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */isXML=Sizzle.isXML=function(elem){ // documentElement is verified for cases where it doesn't yet exist
// (such as loading iframes in IE - #4833)
var documentElement=elem&&(elem.ownerDocument||elem).documentElement;return documentElement?documentElement.nodeName!=="HTML":false;}; /**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */setDocument=Sizzle.setDocument=function(node){var hasCompare,parent,doc=node?node.ownerDocument||node:preferredDoc; // Return early if doc is invalid or already selected
if(doc===document||doc.nodeType!==9||!doc.documentElement){return document;} // Update global variables
document=doc;docElem=document.documentElement;documentIsHTML=!isXML(document); // Support: IE 9-11, Edge
// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
if((parent=document.defaultView)&&parent.top!==parent){ // Support: IE 11
if(parent.addEventListener){parent.addEventListener("unload",unloadHandler,false); // Support: IE 9 - 10 only
}else if(parent.attachEvent){parent.attachEvent("onunload",unloadHandler);}} /* Attributes
	---------------------------------------------------------------------- */ // Support: IE<8
// Verify that getAttribute really returns attributes and not properties
// (excepting IE8 booleans)
support.attributes=assert(function(div){div.className="i";return !div.getAttribute("className");}); /* getElement(s)By*
	---------------------------------------------------------------------- */ // Check if getElementsByTagName("*") returns only elements
support.getElementsByTagName=assert(function(div){div.appendChild(document.createComment(""));return !div.getElementsByTagName("*").length;}); // Support: IE<9
support.getElementsByClassName=rnative.test(document.getElementsByClassName); // Support: IE<10
// Check if getElementById returns elements by name
// The broken getElementById methods don't pick up programatically-set names,
// so use a roundabout getElementsByName test
support.getById=assert(function(div){docElem.appendChild(div).id=expando;return !document.getElementsByName||!document.getElementsByName(expando).length;}); // ID find and filter
if(support.getById){Expr.find["ID"]=function(id,context){if(typeof context.getElementById!=="undefined"&&documentIsHTML){var m=context.getElementById(id);return m?[m]:[];}};Expr.filter["ID"]=function(id){var attrId=id.replace(runescape,funescape);return function(elem){return elem.getAttribute("id")===attrId;};};}else { // Support: IE6/7
// getElementById is not reliable as a find shortcut
delete Expr.find["ID"];Expr.filter["ID"]=function(id){var attrId=id.replace(runescape,funescape);return function(elem){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");return node&&node.value===attrId;};};} // Tag
Expr.find["TAG"]=support.getElementsByTagName?function(tag,context){if(typeof context.getElementsByTagName!=="undefined"){return context.getElementsByTagName(tag); // DocumentFragment nodes don't have gEBTN
}else if(support.qsa){return context.querySelectorAll(tag);}}:function(tag,context){var elem,tmp=[],i=0, // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
results=context.getElementsByTagName(tag); // Filter out possible comments
if(tag==="*"){while(elem=results[i++]){if(elem.nodeType===1){tmp.push(elem);}}return tmp;}return results;}; // Class
Expr.find["CLASS"]=support.getElementsByClassName&&function(className,context){if(typeof context.getElementsByClassName!=="undefined"&&documentIsHTML){return context.getElementsByClassName(className);}}; /* QSA/matchesSelector
	---------------------------------------------------------------------- */ // QSA and matchesSelector support
// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
rbuggyMatches=[]; // qSa(:focus) reports false when true (Chrome 21)
// We allow this because of a bug in IE8/9 that throws an error
// whenever `document.activeElement` is accessed on an iframe
// So, we allow :focus to pass through QSA all the time to avoid the IE error
// See http://bugs.jquery.com/ticket/13378
rbuggyQSA=[];if(support.qsa=rnative.test(document.querySelectorAll)){ // Build QSA regex
// Regex strategy adopted from Diego Perini
assert(function(div){ // Select is set to empty string on purpose
// This is to test IE's treatment of not explicitly
// setting a boolean content attribute,
// since its presence should be enough
// http://bugs.jquery.com/ticket/12359
docElem.appendChild(div).innerHTML="<a id='"+expando+"'></a>"+"<select id='"+expando+"-\r\\' msallowcapture=''>"+"<option selected=''></option></select>"; // Support: IE8, Opera 11-12.16
// Nothing should be selected when empty strings follow ^= or $= or *=
// The test attribute must be unknown in Opera but "safe" for WinRT
// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
if(div.querySelectorAll("[msallowcapture^='']").length){rbuggyQSA.push("[*^$]="+whitespace+"*(?:''|\"\")");} // Support: IE8
// Boolean attributes and "value" are not treated correctly
if(!div.querySelectorAll("[selected]").length){rbuggyQSA.push("\\["+whitespace+"*(?:value|"+booleans+")");} // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
if(!div.querySelectorAll("[id~="+expando+"-]").length){rbuggyQSA.push("~=");} // Webkit/Opera - :checked should return selected option elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
// IE8 throws error here and will not see later tests
if(!div.querySelectorAll(":checked").length){rbuggyQSA.push(":checked");} // Support: Safari 8+, iOS 8+
// https://bugs.webkit.org/show_bug.cgi?id=136851
// In-page `selector#id sibing-combinator selector` fails
if(!div.querySelectorAll("a#"+expando+"+*").length){rbuggyQSA.push(".#.+[+~]");}});assert(function(div){ // Support: Windows 8 Native Apps
// The type and name attributes are restricted during .innerHTML assignment
var input=document.createElement("input");input.setAttribute("type","hidden");div.appendChild(input).setAttribute("name","D"); // Support: IE8
// Enforce case-sensitivity of name attribute
if(div.querySelectorAll("[name=d]").length){rbuggyQSA.push("name"+whitespace+"*[*^$|!~]?=");} // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
// IE8 throws error here and will not see later tests
if(!div.querySelectorAll(":enabled").length){rbuggyQSA.push(":enabled",":disabled");} // Opera 10-11 does not throw on post-comma invalid pseudos
div.querySelectorAll("*,:x");rbuggyQSA.push(",.*:");});}if(support.matchesSelector=rnative.test(matches=docElem.matches||docElem.webkitMatchesSelector||docElem.mozMatchesSelector||docElem.oMatchesSelector||docElem.msMatchesSelector)){assert(function(div){ // Check to see if it's possible to do matchesSelector
// on a disconnected node (IE 9)
support.disconnectedMatch=matches.call(div,"div"); // This should fail with an exception
// Gecko does not error, returns false instead
matches.call(div,"[s!='']:x");rbuggyMatches.push("!=",pseudos);});}rbuggyQSA=rbuggyQSA.length&&new RegExp(rbuggyQSA.join("|"));rbuggyMatches=rbuggyMatches.length&&new RegExp(rbuggyMatches.join("|")); /* Contains
	---------------------------------------------------------------------- */hasCompare=rnative.test(docElem.compareDocumentPosition); // Element contains another
// Purposefully self-exclusive
// As in, an element does not contain itself
contains=hasCompare||rnative.test(docElem.contains)?function(a,b){var adown=a.nodeType===9?a.documentElement:a,bup=b&&b.parentNode;return a===bup||!!(bup&&bup.nodeType===1&&(adown.contains?adown.contains(bup):a.compareDocumentPosition&&a.compareDocumentPosition(bup)&16));}:function(a,b){if(b){while(b=b.parentNode){if(b===a){return true;}}}return false;}; /* Sorting
	---------------------------------------------------------------------- */ // Document order sorting
sortOrder=hasCompare?function(a,b){ // Flag for duplicate removal
if(a===b){hasDuplicate=true;return 0;} // Sort on method existence if only one input has compareDocumentPosition
var compare=!a.compareDocumentPosition-!b.compareDocumentPosition;if(compare){return compare;} // Calculate position if both inputs belong to the same document
compare=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b): // Otherwise we know they are disconnected
1; // Disconnected nodes
if(compare&1||!support.sortDetached&&b.compareDocumentPosition(a)===compare){ // Choose the first element that is related to our preferred document
if(a===document||a.ownerDocument===preferredDoc&&contains(preferredDoc,a)){return -1;}if(b===document||b.ownerDocument===preferredDoc&&contains(preferredDoc,b)){return 1;} // Maintain original order
return sortInput?indexOf(sortInput,a)-indexOf(sortInput,b):0;}return compare&4?-1:1;}:function(a,b){ // Exit early if the nodes are identical
if(a===b){hasDuplicate=true;return 0;}var cur,i=0,aup=a.parentNode,bup=b.parentNode,ap=[a],bp=[b]; // Parentless nodes are either documents or disconnected
if(!aup||!bup){return a===document?-1:b===document?1:aup?-1:bup?1:sortInput?indexOf(sortInput,a)-indexOf(sortInput,b):0; // If the nodes are siblings, we can do a quick check
}else if(aup===bup){return siblingCheck(a,b);} // Otherwise we need full lists of their ancestors for comparison
cur=a;while(cur=cur.parentNode){ap.unshift(cur);}cur=b;while(cur=cur.parentNode){bp.unshift(cur);} // Walk down the tree looking for a discrepancy
while(ap[i]===bp[i]){i++;}return i? // Do a sibling check if the nodes have a common ancestor
siblingCheck(ap[i],bp[i]): // Otherwise nodes in our document sort first
ap[i]===preferredDoc?-1:bp[i]===preferredDoc?1:0;};return document;};Sizzle.matches=function(expr,elements){return Sizzle(expr,null,null,elements);};Sizzle.matchesSelector=function(elem,expr){ // Set document vars if needed
if((elem.ownerDocument||elem)!==document){setDocument(elem);} // Make sure that attribute selectors are quoted
expr=expr.replace(rattributeQuotes,"='$1']");if(support.matchesSelector&&documentIsHTML&&!compilerCache[expr+" "]&&(!rbuggyMatches||!rbuggyMatches.test(expr))&&(!rbuggyQSA||!rbuggyQSA.test(expr))){try{var ret=matches.call(elem,expr); // IE 9's matchesSelector returns false on disconnected nodes
if(ret||support.disconnectedMatch|| // As well, disconnected nodes are said to be in a document
// fragment in IE 9
elem.document&&elem.document.nodeType!==11){return ret;}}catch(e){}}return Sizzle(expr,document,null,[elem]).length>0;};Sizzle.contains=function(context,elem){ // Set document vars if needed
if((context.ownerDocument||context)!==document){setDocument(context);}return contains(context,elem);};Sizzle.attr=function(elem,name){ // Set document vars if needed
if((elem.ownerDocument||elem)!==document){setDocument(elem);}var fn=Expr.attrHandle[name.toLowerCase()], // Don't get fooled by Object.prototype properties (jQuery #13807)
val=fn&&hasOwn.call(Expr.attrHandle,name.toLowerCase())?fn(elem,name,!documentIsHTML):undefined;return val!==undefined?val:support.attributes||!documentIsHTML?elem.getAttribute(name):(val=elem.getAttributeNode(name))&&val.specified?val.value:null;};Sizzle.error=function(msg){throw new Error("Syntax error, unrecognized expression: "+msg);}; /**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */Sizzle.uniqueSort=function(results){var elem,duplicates=[],j=0,i=0; // Unless we *know* we can detect duplicates, assume their presence
hasDuplicate=!support.detectDuplicates;sortInput=!support.sortStable&&results.slice(0);results.sort(sortOrder);if(hasDuplicate){while(elem=results[i++]){if(elem===results[i]){j=duplicates.push(i);}}while(j--){results.splice(duplicates[j],1);}} // Clear input after sorting to release objects
// See https://github.com/jquery/sizzle/pull/225
sortInput=null;return results;}; /**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */getText=Sizzle.getText=function(elem){var node,ret="",i=0,nodeType=elem.nodeType;if(!nodeType){ // If no nodeType, this is expected to be an array
while(node=elem[i++]){ // Do not traverse comment nodes
ret+=getText(node);}}else if(nodeType===1||nodeType===9||nodeType===11){ // Use textContent for elements
// innerText usage removed for consistency of new lines (jQuery #11153)
if(typeof elem.textContent==="string"){return elem.textContent;}else { // Traverse its children
for(elem=elem.firstChild;elem;elem=elem.nextSibling){ret+=getText(elem);}}}else if(nodeType===3||nodeType===4){return elem.nodeValue;} // Do not include comment or processing instruction nodes
return ret;};Expr=Sizzle.selectors={ // Can be adjusted by the user
cacheLength:50,createPseudo:markFunction,match:matchExpr,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{"ATTR":function ATTR(match){match[1]=match[1].replace(runescape,funescape); // Move the given value to match[3] whether quoted or unquoted
match[3]=(match[3]||match[4]||match[5]||"").replace(runescape,funescape);if(match[2]==="~="){match[3]=" "+match[3]+" ";}return match.slice(0,4);},"CHILD":function CHILD(match){ /* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/match[1]=match[1].toLowerCase();if(match[1].slice(0,3)==="nth"){ // nth-* requires argument
if(!match[3]){Sizzle.error(match[0]);} // numeric x and y parameters for Expr.filter.CHILD
// remember that false/true cast respectively to 0/1
match[4]=+(match[4]?match[5]+(match[6]||1):2*(match[3]==="even"||match[3]==="odd"));match[5]=+(match[7]+match[8]||match[3]==="odd"); // other types prohibit arguments
}else if(match[3]){Sizzle.error(match[0]);}return match;},"PSEUDO":function PSEUDO(match){var excess,unquoted=!match[6]&&match[2];if(matchExpr["CHILD"].test(match[0])){return null;} // Accept quoted arguments as-is
if(match[3]){match[2]=match[4]||match[5]||""; // Strip excess characters from unquoted arguments
}else if(unquoted&&rpseudo.test(unquoted)&&( // Get excess from tokenize (recursively)
excess=tokenize(unquoted,true))&&( // advance to the next closing parenthesis
excess=unquoted.indexOf(")",unquoted.length-excess)-unquoted.length)){ // excess is a negative index
match[0]=match[0].slice(0,excess);match[2]=unquoted.slice(0,excess);} // Return only captures needed by the pseudo filter method (type and argument)
return match.slice(0,3);}},filter:{"TAG":function TAG(nodeNameSelector){var nodeName=nodeNameSelector.replace(runescape,funescape).toLowerCase();return nodeNameSelector==="*"?function(){return true;}:function(elem){return elem.nodeName&&elem.nodeName.toLowerCase()===nodeName;};},"CLASS":function CLASS(className){var pattern=classCache[className+" "];return pattern||(pattern=new RegExp("(^|"+whitespace+")"+className+"("+whitespace+"|$)"))&&classCache(className,function(elem){return pattern.test(typeof elem.className==="string"&&elem.className||typeof elem.getAttribute!=="undefined"&&elem.getAttribute("class")||"");});},"ATTR":function ATTR(name,operator,check){return function(elem){var result=Sizzle.attr(elem,name);if(result==null){return operator==="!=";}if(!operator){return true;}result+="";return operator==="="?result===check:operator==="!="?result!==check:operator==="^="?check&&result.indexOf(check)===0:operator==="*="?check&&result.indexOf(check)>-1:operator==="$="?check&&result.slice(-check.length)===check:operator==="~="?(" "+result.replace(rwhitespace," ")+" ").indexOf(check)>-1:operator==="|="?result===check||result.slice(0,check.length+1)===check+"-":false;};},"CHILD":function CHILD(type,what,argument,first,last){var simple=type.slice(0,3)!=="nth",forward=type.slice(-4)!=="last",ofType=what==="of-type";return first===1&&last===0? // Shortcut for :nth-*(n)
function(elem){return !!elem.parentNode;}:function(elem,context,xml){var cache,uniqueCache,outerCache,node,nodeIndex,start,dir=simple!==forward?"nextSibling":"previousSibling",parent=elem.parentNode,name=ofType&&elem.nodeName.toLowerCase(),useCache=!xml&&!ofType,diff=false;if(parent){ // :(first|last|only)-(child|of-type)
if(simple){while(dir){node=elem;while(node=node[dir]){if(ofType?node.nodeName.toLowerCase()===name:node.nodeType===1){return false;}} // Reverse direction for :only-* (if we haven't yet done so)
start=dir=type==="only"&&!start&&"nextSibling";}return true;}start=[forward?parent.firstChild:parent.lastChild]; // non-xml :nth-child(...) stores cache data on `parent`
if(forward&&useCache){ // Seek `elem` from a previously-cached index
// ...in a gzip-friendly way
node=parent;outerCache=node[expando]||(node[expando]={}); // Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={});cache=uniqueCache[type]||[];nodeIndex=cache[0]===dirruns&&cache[1];diff=nodeIndex&&cache[2];node=nodeIndex&&parent.childNodes[nodeIndex];while(node=++nodeIndex&&node&&node[dir]||( // Fallback to seeking `elem` from the start
diff=nodeIndex=0)||start.pop()){ // When found, cache indexes on `parent` and break
if(node.nodeType===1&&++diff&&node===elem){uniqueCache[type]=[dirruns,nodeIndex,diff];break;}}}else { // Use previously-cached element index if available
if(useCache){ // ...in a gzip-friendly way
node=elem;outerCache=node[expando]||(node[expando]={}); // Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={});cache=uniqueCache[type]||[];nodeIndex=cache[0]===dirruns&&cache[1];diff=nodeIndex;} // xml :nth-child(...)
// or :nth-last-child(...) or :nth(-last)?-of-type(...)
if(diff===false){ // Use the same loop as above to seek `elem` from the start
while(node=++nodeIndex&&node&&node[dir]||(diff=nodeIndex=0)||start.pop()){if((ofType?node.nodeName.toLowerCase()===name:node.nodeType===1)&&++diff){ // Cache the index of each encountered element
if(useCache){outerCache=node[expando]||(node[expando]={}); // Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={});uniqueCache[type]=[dirruns,diff];}if(node===elem){break;}}}}} // Incorporate the offset, then check against cycle size
diff-=last;return diff===first||diff%first===0&&diff/first>=0;}};},"PSEUDO":function PSEUDO(pseudo,argument){ // pseudo-class names are case-insensitive
// http://www.w3.org/TR/selectors/#pseudo-classes
// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
// Remember that setFilters inherits from pseudos
var args,fn=Expr.pseudos[pseudo]||Expr.setFilters[pseudo.toLowerCase()]||Sizzle.error("unsupported pseudo: "+pseudo); // The user may use createPseudo to indicate that
// arguments are needed to create the filter function
// just as Sizzle does
if(fn[expando]){return fn(argument);} // But maintain support for old signatures
if(fn.length>1){args=[pseudo,pseudo,"",argument];return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())?markFunction(function(seed,matches){var idx,matched=fn(seed,argument),i=matched.length;while(i--){idx=indexOf(seed,matched[i]);seed[idx]=!(matches[idx]=matched[i]);}}):function(elem){return fn(elem,0,args);};}return fn;}},pseudos:{ // Potentially complex pseudos
"not":markFunction(function(selector){ // Trim the selector passed to compile
// to avoid treating leading and trailing
// spaces as combinators
var input=[],results=[],matcher=compile(selector.replace(rtrim,"$1"));return matcher[expando]?markFunction(function(seed,matches,context,xml){var elem,unmatched=matcher(seed,null,xml,[]),i=seed.length; // Match elements unmatched by `matcher`
while(i--){if(elem=unmatched[i]){seed[i]=!(matches[i]=elem);}}}):function(elem,context,xml){input[0]=elem;matcher(input,null,xml,results); // Don't keep the element (issue #299)
input[0]=null;return !results.pop();};}),"has":markFunction(function(selector){return function(elem){return Sizzle(selector,elem).length>0;};}),"contains":markFunction(function(text){text=text.replace(runescape,funescape);return function(elem){return (elem.textContent||elem.innerText||getText(elem)).indexOf(text)>-1;};}), // "Whether an element is represented by a :lang() selector
// is based solely on the element's language value
// being equal to the identifier C,
// or beginning with the identifier C immediately followed by "-".
// The matching of C against the element's language value is performed case-insensitively.
// The identifier C does not have to be a valid language name."
// http://www.w3.org/TR/selectors/#lang-pseudo
"lang":markFunction(function(lang){ // lang value must be a valid identifier
if(!ridentifier.test(lang||"")){Sizzle.error("unsupported lang: "+lang);}lang=lang.replace(runescape,funescape).toLowerCase();return function(elem){var elemLang;do {if(elemLang=documentIsHTML?elem.lang:elem.getAttribute("xml:lang")||elem.getAttribute("lang")){elemLang=elemLang.toLowerCase();return elemLang===lang||elemLang.indexOf(lang+"-")===0;}}while((elem=elem.parentNode)&&elem.nodeType===1);return false;};}), // Miscellaneous
"target":function target(elem){var hash=window.location&&window.location.hash;return hash&&hash.slice(1)===elem.id;},"root":function root(elem){return elem===docElem;},"focus":function focus(elem){return elem===document.activeElement&&(!document.hasFocus||document.hasFocus())&&!!(elem.type||elem.href||~elem.tabIndex);}, // Boolean properties
"enabled":function enabled(elem){return elem.disabled===false;},"disabled":function disabled(elem){return elem.disabled===true;},"checked":function checked(elem){ // In CSS3, :checked should return both checked and selected elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
var nodeName=elem.nodeName.toLowerCase();return nodeName==="input"&&!!elem.checked||nodeName==="option"&&!!elem.selected;},"selected":function selected(elem){ // Accessing this property makes selected-by-default
// options in Safari work properly
if(elem.parentNode){elem.parentNode.selectedIndex;}return elem.selected===true;}, // Contents
"empty":function empty(elem){ // http://www.w3.org/TR/selectors/#empty-pseudo
// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
//   but not by others (comment: 8; processing instruction: 7; etc.)
// nodeType < 6 works because attributes (2) do not appear as children
for(elem=elem.firstChild;elem;elem=elem.nextSibling){if(elem.nodeType<6){return false;}}return true;},"parent":function parent(elem){return !Expr.pseudos["empty"](elem);}, // Element/input types
"header":function header(elem){return rheader.test(elem.nodeName);},"input":function input(elem){return rinputs.test(elem.nodeName);},"button":function button(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type==="button"||name==="button";},"text":function text(elem){var attr;return elem.nodeName.toLowerCase()==="input"&&elem.type==="text"&&( // Support: IE<8
// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
(attr=elem.getAttribute("type"))==null||attr.toLowerCase()==="text");}, // Position-in-collection
"first":createPositionalPseudo(function(){return [0];}),"last":createPositionalPseudo(function(matchIndexes,length){return [length-1];}),"eq":createPositionalPseudo(function(matchIndexes,length,argument){return [argument<0?argument+length:argument];}),"even":createPositionalPseudo(function(matchIndexes,length){var i=0;for(;i<length;i+=2){matchIndexes.push(i);}return matchIndexes;}),"odd":createPositionalPseudo(function(matchIndexes,length){var i=1;for(;i<length;i+=2){matchIndexes.push(i);}return matchIndexes;}),"lt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument;for(;--i>=0;){matchIndexes.push(i);}return matchIndexes;}),"gt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument;for(;++i<length;){matchIndexes.push(i);}return matchIndexes;})}};Expr.pseudos["nth"]=Expr.pseudos["eq"]; // Add button/input type pseudos
for(i in {radio:true,checkbox:true,file:true,password:true,image:true}){Expr.pseudos[i]=createInputPseudo(i);}for(i in {submit:true,reset:true}){Expr.pseudos[i]=createButtonPseudo(i);} // Easy API for creating new setFilters
function setFilters(){}setFilters.prototype=Expr.filters=Expr.pseudos;Expr.setFilters=new setFilters();tokenize=Sizzle.tokenize=function(selector,parseOnly){var matched,match,tokens,type,soFar,groups,preFilters,cached=tokenCache[selector+" "];if(cached){return parseOnly?0:cached.slice(0);}soFar=selector;groups=[];preFilters=Expr.preFilter;while(soFar){ // Comma and first run
if(!matched||(match=rcomma.exec(soFar))){if(match){ // Don't consume trailing commas as valid
soFar=soFar.slice(match[0].length)||soFar;}groups.push(tokens=[]);}matched=false; // Combinators
if(match=rcombinators.exec(soFar)){matched=match.shift();tokens.push({value:matched, // Cast descendant combinators to space
type:match[0].replace(rtrim," ")});soFar=soFar.slice(matched.length);} // Filters
for(type in Expr.filter){if((match=matchExpr[type].exec(soFar))&&(!preFilters[type]||(match=preFilters[type](match)))){matched=match.shift();tokens.push({value:matched,type:type,matches:match});soFar=soFar.slice(matched.length);}}if(!matched){break;}} // Return the length of the invalid excess
// if we're just parsing
// Otherwise, throw an error or return tokens
return parseOnly?soFar.length:soFar?Sizzle.error(selector): // Cache the tokens
tokenCache(selector,groups).slice(0);};function toSelector(tokens){var i=0,len=tokens.length,selector="";for(;i<len;i++){selector+=tokens[i].value;}return selector;}function addCombinator(matcher,combinator,base){var dir=combinator.dir,checkNonElements=base&&dir==="parentNode",doneName=done++;return combinator.first? // Check against closest ancestor/preceding element
function(elem,context,xml){while(elem=elem[dir]){if(elem.nodeType===1||checkNonElements){return matcher(elem,context,xml);}}}: // Check against all ancestor/preceding elements
function(elem,context,xml){var oldCache,uniqueCache,outerCache,newCache=[dirruns,doneName]; // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
if(xml){while(elem=elem[dir]){if(elem.nodeType===1||checkNonElements){if(matcher(elem,context,xml)){return true;}}}}else {while(elem=elem[dir]){if(elem.nodeType===1||checkNonElements){outerCache=elem[expando]||(elem[expando]={}); // Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[elem.uniqueID]||(outerCache[elem.uniqueID]={});if((oldCache=uniqueCache[dir])&&oldCache[0]===dirruns&&oldCache[1]===doneName){ // Assign to newCache so results back-propagate to previous elements
return newCache[2]=oldCache[2];}else { // Reuse newcache so results back-propagate to previous elements
uniqueCache[dir]=newCache; // A match means we're done; a fail means we have to keep checking
if(newCache[2]=matcher(elem,context,xml)){return true;}}}}}};}function elementMatcher(matchers){return matchers.length>1?function(elem,context,xml){var i=matchers.length;while(i--){if(!matchers[i](elem,context,xml)){return false;}}return true;}:matchers[0];}function multipleContexts(selector,contexts,results){var i=0,len=contexts.length;for(;i<len;i++){Sizzle(selector,contexts[i],results);}return results;}function condense(unmatched,map,filter,context,xml){var elem,newUnmatched=[],i=0,len=unmatched.length,mapped=map!=null;for(;i<len;i++){if(elem=unmatched[i]){if(!filter||filter(elem,context,xml)){newUnmatched.push(elem);if(mapped){map.push(i);}}}}return newUnmatched;}function setMatcher(preFilter,selector,matcher,postFilter,postFinder,postSelector){if(postFilter&&!postFilter[expando]){postFilter=setMatcher(postFilter);}if(postFinder&&!postFinder[expando]){postFinder=setMatcher(postFinder,postSelector);}return markFunction(function(seed,results,context,xml){var temp,i,elem,preMap=[],postMap=[],preexisting=results.length, // Get initial elements from seed or context
elems=seed||multipleContexts(selector||"*",context.nodeType?[context]:context,[]), // Prefilter to get matcher input, preserving a map for seed-results synchronization
matcherIn=preFilter&&(seed||!selector)?condense(elems,preMap,preFilter,context,xml):elems,matcherOut=matcher? // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
postFinder||(seed?preFilter:preexisting||postFilter)? // ...intermediate processing is necessary
[]: // ...otherwise use results directly
results:matcherIn; // Find primary matches
if(matcher){matcher(matcherIn,matcherOut,context,xml);} // Apply postFilter
if(postFilter){temp=condense(matcherOut,postMap);postFilter(temp,[],context,xml); // Un-match failing elements by moving them back to matcherIn
i=temp.length;while(i--){if(elem=temp[i]){matcherOut[postMap[i]]=!(matcherIn[postMap[i]]=elem);}}}if(seed){if(postFinder||preFilter){if(postFinder){ // Get the final matcherOut by condensing this intermediate into postFinder contexts
temp=[];i=matcherOut.length;while(i--){if(elem=matcherOut[i]){ // Restore matcherIn since elem is not yet a final match
temp.push(matcherIn[i]=elem);}}postFinder(null,matcherOut=[],temp,xml);} // Move matched elements from seed to results to keep them synchronized
i=matcherOut.length;while(i--){if((elem=matcherOut[i])&&(temp=postFinder?indexOf(seed,elem):preMap[i])>-1){seed[temp]=!(results[temp]=elem);}}} // Add elements to results, through postFinder if defined
}else {matcherOut=condense(matcherOut===results?matcherOut.splice(preexisting,matcherOut.length):matcherOut);if(postFinder){postFinder(null,results,matcherOut,xml);}else {push.apply(results,matcherOut);}}});}function matcherFromTokens(tokens){var checkContext,matcher,j,len=tokens.length,leadingRelative=Expr.relative[tokens[0].type],implicitRelative=leadingRelative||Expr.relative[" "],i=leadingRelative?1:0, // The foundational matcher ensures that elements are reachable from top-level context(s)
matchContext=addCombinator(function(elem){return elem===checkContext;},implicitRelative,true),matchAnyContext=addCombinator(function(elem){return indexOf(checkContext,elem)>-1;},implicitRelative,true),matchers=[function(elem,context,xml){var ret=!leadingRelative&&(xml||context!==outermostContext)||((checkContext=context).nodeType?matchContext(elem,context,xml):matchAnyContext(elem,context,xml)); // Avoid hanging onto element (issue #299)
checkContext=null;return ret;}];for(;i<len;i++){if(matcher=Expr.relative[tokens[i].type]){matchers=[addCombinator(elementMatcher(matchers),matcher)];}else {matcher=Expr.filter[tokens[i].type].apply(null,tokens[i].matches); // Return special upon seeing a positional matcher
if(matcher[expando]){ // Find the next relative operator (if any) for proper handling
j=++i;for(;j<len;j++){if(Expr.relative[tokens[j].type]){break;}}return setMatcher(i>1&&elementMatcher(matchers),i>1&&toSelector( // If the preceding token was a descendant combinator, insert an implicit any-element `*`
tokens.slice(0,i-1).concat({value:tokens[i-2].type===" "?"*":""})).replace(rtrim,"$1"),matcher,i<j&&matcherFromTokens(tokens.slice(i,j)),j<len&&matcherFromTokens(tokens=tokens.slice(j)),j<len&&toSelector(tokens));}matchers.push(matcher);}}return elementMatcher(matchers);}function matcherFromGroupMatchers(elementMatchers,setMatchers){var bySet=setMatchers.length>0,byElement=elementMatchers.length>0,superMatcher=function superMatcher(seed,context,xml,results,outermost){var elem,j,matcher,matchedCount=0,i="0",unmatched=seed&&[],setMatched=[],contextBackup=outermostContext, // We must always have either seed elements or outermost context
elems=seed||byElement&&Expr.find["TAG"]("*",outermost), // Use integer dirruns iff this is the outermost matcher
dirrunsUnique=dirruns+=contextBackup==null?1:Math.random()||0.1,len=elems.length;if(outermost){outermostContext=context===document||context||outermost;} // Add elements passing elementMatchers directly to results
// Support: IE<9, Safari
// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
for(;i!==len&&(elem=elems[i])!=null;i++){if(byElement&&elem){j=0;if(!context&&elem.ownerDocument!==document){setDocument(elem);xml=!documentIsHTML;}while(matcher=elementMatchers[j++]){if(matcher(elem,context||document,xml)){results.push(elem);break;}}if(outermost){dirruns=dirrunsUnique;}} // Track unmatched elements for set filters
if(bySet){ // They will have gone through all possible matchers
if(elem=!matcher&&elem){matchedCount--;} // Lengthen the array for every element, matched or not
if(seed){unmatched.push(elem);}}} // `i` is now the count of elements visited above, and adding it to `matchedCount`
// makes the latter nonnegative.
matchedCount+=i; // Apply set filters to unmatched elements
// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
// no element matchers and no seed.
// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
// case, which will result in a "00" `matchedCount` that differs from `i` but is also
// numerically zero.
if(bySet&&i!==matchedCount){j=0;while(matcher=setMatchers[j++]){matcher(unmatched,setMatched,context,xml);}if(seed){ // Reintegrate element matches to eliminate the need for sorting
if(matchedCount>0){while(i--){if(!(unmatched[i]||setMatched[i])){setMatched[i]=pop.call(results);}}} // Discard index placeholder values to get only actual matches
setMatched=condense(setMatched);} // Add matches to results
push.apply(results,setMatched); // Seedless set matches succeeding multiple successful matchers stipulate sorting
if(outermost&&!seed&&setMatched.length>0&&matchedCount+setMatchers.length>1){Sizzle.uniqueSort(results);}} // Override manipulation of globals by nested matchers
if(outermost){dirruns=dirrunsUnique;outermostContext=contextBackup;}return unmatched;};return bySet?markFunction(superMatcher):superMatcher;}compile=Sizzle.compile=function(selector,match /* Internal Use Only */){var i,setMatchers=[],elementMatchers=[],cached=compilerCache[selector+" "];if(!cached){ // Generate a function of recursive functions that can be used to check each element
if(!match){match=tokenize(selector);}i=match.length;while(i--){cached=matcherFromTokens(match[i]);if(cached[expando]){setMatchers.push(cached);}else {elementMatchers.push(cached);}} // Cache the compiled function
cached=compilerCache(selector,matcherFromGroupMatchers(elementMatchers,setMatchers)); // Save selector and tokenization
cached.selector=selector;}return cached;}; /**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */select=Sizzle.select=function(selector,context,results,seed){var i,tokens,token,type,find,compiled=typeof selector==="function"&&selector,match=!seed&&tokenize(selector=compiled.selector||selector);results=results||[]; // Try to minimize operations if there is only one selector in the list and no seed
// (the latter of which guarantees us context)
if(match.length===1){ // Reduce context if the leading compound selector is an ID
tokens=match[0]=match[0].slice(0);if(tokens.length>2&&(token=tokens[0]).type==="ID"&&support.getById&&context.nodeType===9&&documentIsHTML&&Expr.relative[tokens[1].type]){context=(Expr.find["ID"](token.matches[0].replace(runescape,funescape),context)||[])[0];if(!context){return results; // Precompiled matchers will still verify ancestry, so step up a level
}else if(compiled){context=context.parentNode;}selector=selector.slice(tokens.shift().value.length);} // Fetch a seed set for right-to-left matching
i=matchExpr["needsContext"].test(selector)?0:tokens.length;while(i--){token=tokens[i]; // Abort if we hit a combinator
if(Expr.relative[type=token.type]){break;}if(find=Expr.find[type]){ // Search, expanding context for leading sibling combinators
if(seed=find(token.matches[0].replace(runescape,funescape),rsibling.test(tokens[0].type)&&testContext(context.parentNode)||context)){ // If seed is empty or no tokens remain, we can return early
tokens.splice(i,1);selector=seed.length&&toSelector(tokens);if(!selector){push.apply(results,seed);return results;}break;}}}} // Compile and execute a filtering function if one is not provided
// Provide `match` to avoid retokenization if we modified the selector above
(compiled||compile(selector,match))(seed,context,!documentIsHTML,results,!context||rsibling.test(selector)&&testContext(context.parentNode)||context);return results;}; // One-time assignments
// Sort stability
support.sortStable=expando.split("").sort(sortOrder).join("")===expando; // Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates=!!hasDuplicate; // Initialize against the default document
setDocument(); // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached=assert(function(div1){ // Should return 1, but returns 4 (following)
return div1.compareDocumentPosition(document.createElement("div"))&1;}); // Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if(!assert(function(div){div.innerHTML="<a href='#'></a>";return div.firstChild.getAttribute("href")==="#";})){addHandle("type|href|height|width",function(elem,name,isXML){if(!isXML){return elem.getAttribute(name,name.toLowerCase()==="type"?1:2);}});} // Support: IE<9
// Use defaultValue in place of getAttribute("value")
if(!support.attributes||!assert(function(div){div.innerHTML="<input/>";div.firstChild.setAttribute("value","");return div.firstChild.getAttribute("value")==="";})){addHandle("value",function(elem,name,isXML){if(!isXML&&elem.nodeName.toLowerCase()==="input"){return elem.defaultValue;}});} // Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if(!assert(function(div){return div.getAttribute("disabled")==null;})){addHandle(booleans,function(elem,name,isXML){var val;if(!isXML){return elem[name]===true?name.toLowerCase():(val=elem.getAttributeNode(name))&&val.specified?val.value:null;}});}return Sizzle;}(window);jQuery.find=Sizzle;jQuery.expr=Sizzle.selectors;jQuery.expr[":"]=jQuery.expr.pseudos;jQuery.uniqueSort=jQuery.unique=Sizzle.uniqueSort;jQuery.text=Sizzle.getText;jQuery.isXMLDoc=Sizzle.isXML;jQuery.contains=Sizzle.contains;var dir=function dir(elem,_dir,until){var matched=[],truncate=until!==undefined;while((elem=elem[_dir])&&elem.nodeType!==9){if(elem.nodeType===1){if(truncate&&jQuery(elem).is(until)){break;}matched.push(elem);}}return matched;};var _siblings=function _siblings(n,elem){var matched=[];for(;n;n=n.nextSibling){if(n.nodeType===1&&n!==elem){matched.push(n);}}return matched;};var rneedsContext=jQuery.expr.match.needsContext;var rsingleTag=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/;var risSimple=/^.[^:#\[\.,]*$/; // Implement the identical functionality for filter and not
function winnow(elements,qualifier,not){if(jQuery.isFunction(qualifier)){return jQuery.grep(elements,function(elem,i){ /* jshint -W018 */return !!qualifier.call(elem,i,elem)!==not;});}if(qualifier.nodeType){return jQuery.grep(elements,function(elem){return elem===qualifier!==not;});}if(typeof qualifier==="string"){if(risSimple.test(qualifier)){return jQuery.filter(qualifier,elements,not);}qualifier=jQuery.filter(qualifier,elements);}return jQuery.grep(elements,function(elem){return indexOf.call(qualifier,elem)>-1!==not;});}jQuery.filter=function(expr,elems,not){var elem=elems[0];if(not){expr=":not("+expr+")";}return elems.length===1&&elem.nodeType===1?jQuery.find.matchesSelector(elem,expr)?[elem]:[]:jQuery.find.matches(expr,jQuery.grep(elems,function(elem){return elem.nodeType===1;}));};jQuery.fn.extend({find:function find(selector){var i,len=this.length,ret=[],self=this;if(typeof selector!=="string"){return this.pushStack(jQuery(selector).filter(function(){for(i=0;i<len;i++){if(jQuery.contains(self[i],this)){return true;}}}));}for(i=0;i<len;i++){jQuery.find(selector,self[i],ret);} // Needed because $( selector, context ) becomes $( context ).find( selector )
ret=this.pushStack(len>1?jQuery.unique(ret):ret);ret.selector=this.selector?this.selector+" "+selector:selector;return ret;},filter:function filter(selector){return this.pushStack(winnow(this,selector||[],false));},not:function not(selector){return this.pushStack(winnow(this,selector||[],true));},is:function is(selector){return !!winnow(this, // If this is a positional/relative selector, check membership in the returned set
// so $("p:first").is("p:last") won't return true for a doc with two "p".
typeof selector==="string"&&rneedsContext.test(selector)?jQuery(selector):selector||[],false).length;}}); // Initialize a jQuery object
// A central reference to the root jQuery(document)
var rootjQuery, // A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
// Strict HTML recognition (#11290: must start with <)
rquickExpr=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,init=jQuery.fn.init=function(selector,context,root){var match,elem; // HANDLE: $(""), $(null), $(undefined), $(false)
if(!selector){return this;} // Method init() accepts an alternate rootjQuery
// so migrate can support jQuery.sub (gh-2101)
root=root||rootjQuery; // Handle HTML strings
if(typeof selector==="string"){if(selector[0]==="<"&&selector[selector.length-1]===">"&&selector.length>=3){ // Assume that strings that start and end with <> are HTML and skip the regex check
match=[null,selector,null];}else {match=rquickExpr.exec(selector);} // Match html or make sure no context is specified for #id
if(match&&(match[1]||!context)){ // HANDLE: $(html) -> $(array)
if(match[1]){context=context instanceof jQuery?context[0]:context; // Option to run scripts is true for back-compat
// Intentionally let the error be thrown if parseHTML is not present
jQuery.merge(this,jQuery.parseHTML(match[1],context&&context.nodeType?context.ownerDocument||context:document,true)); // HANDLE: $(html, props)
if(rsingleTag.test(match[1])&&jQuery.isPlainObject(context)){for(match in context){ // Properties of context are called as methods if possible
if(jQuery.isFunction(this[match])){this[match](context[match]); // ...and otherwise set as attributes
}else {this.attr(match,context[match]);}}}return this; // HANDLE: $(#id)
}else {elem=document.getElementById(match[2]); // Support: Blackberry 4.6
// gEBID returns nodes no longer in the document (#6963)
if(elem&&elem.parentNode){ // Inject the element directly into the jQuery object
this.length=1;this[0]=elem;}this.context=document;this.selector=selector;return this;} // HANDLE: $(expr, $(...))
}else if(!context||context.jquery){return (context||root).find(selector); // HANDLE: $(expr, context)
// (which is just equivalent to: $(context).find(expr)
}else {return this.constructor(context).find(selector);} // HANDLE: $(DOMElement)
}else if(selector.nodeType){this.context=this[0]=selector;this.length=1;return this; // HANDLE: $(function)
// Shortcut for document ready
}else if(jQuery.isFunction(selector)){return root.ready!==undefined?root.ready(selector): // Execute immediately if ready is not present
selector(jQuery);}if(selector.selector!==undefined){this.selector=selector.selector;this.context=selector.context;}return jQuery.makeArray(selector,this);}; // Give the init function the jQuery prototype for later instantiation
init.prototype=jQuery.fn; // Initialize central reference
rootjQuery=jQuery(document);var rparentsprev=/^(?:parents|prev(?:Until|All))/, // Methods guaranteed to produce a unique set when starting from a unique set
guaranteedUnique={children:true,contents:true,next:true,prev:true};jQuery.fn.extend({has:function has(target){var targets=jQuery(target,this),l=targets.length;return this.filter(function(){var i=0;for(;i<l;i++){if(jQuery.contains(this,targets[i])){return true;}}});},closest:function closest(selectors,context){var cur,i=0,l=this.length,matched=[],pos=rneedsContext.test(selectors)||typeof selectors!=="string"?jQuery(selectors,context||this.context):0;for(;i<l;i++){for(cur=this[i];cur&&cur!==context;cur=cur.parentNode){ // Always skip document fragments
if(cur.nodeType<11&&(pos?pos.index(cur)>-1: // Don't pass non-elements to Sizzle
cur.nodeType===1&&jQuery.find.matchesSelector(cur,selectors))){matched.push(cur);break;}}}return this.pushStack(matched.length>1?jQuery.uniqueSort(matched):matched);}, // Determine the position of an element within the set
index:function index(elem){ // No argument, return index in parent
if(!elem){return this[0]&&this[0].parentNode?this.first().prevAll().length:-1;} // Index in selector
if(typeof elem==="string"){return indexOf.call(jQuery(elem),this[0]);} // Locate the position of the desired element
return indexOf.call(this, // If it receives a jQuery object, the first element is used
elem.jquery?elem[0]:elem);},add:function add(selector,context){return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(),jQuery(selector,context))));},addBack:function addBack(selector){return this.add(selector==null?this.prevObject:this.prevObject.filter(selector));}});function sibling(cur,dir){while((cur=cur[dir])&&cur.nodeType!==1){}return cur;}jQuery.each({parent:function parent(elem){var parent=elem.parentNode;return parent&&parent.nodeType!==11?parent:null;},parents:function parents(elem){return dir(elem,"parentNode");},parentsUntil:function parentsUntil(elem,i,until){return dir(elem,"parentNode",until);},next:function next(elem){return sibling(elem,"nextSibling");},prev:function prev(elem){return sibling(elem,"previousSibling");},nextAll:function nextAll(elem){return dir(elem,"nextSibling");},prevAll:function prevAll(elem){return dir(elem,"previousSibling");},nextUntil:function nextUntil(elem,i,until){return dir(elem,"nextSibling",until);},prevUntil:function prevUntil(elem,i,until){return dir(elem,"previousSibling",until);},siblings:function siblings(elem){return _siblings((elem.parentNode||{}).firstChild,elem);},children:function children(elem){return _siblings(elem.firstChild);},contents:function contents(elem){return elem.contentDocument||jQuery.merge([],elem.childNodes);}},function(name,fn){jQuery.fn[name]=function(until,selector){var matched=jQuery.map(this,fn,until);if(name.slice(-5)!=="Until"){selector=until;}if(selector&&typeof selector==="string"){matched=jQuery.filter(selector,matched);}if(this.length>1){ // Remove duplicates
if(!guaranteedUnique[name]){jQuery.uniqueSort(matched);} // Reverse order for parents* and prev-derivatives
if(rparentsprev.test(name)){matched.reverse();}}return this.pushStack(matched);};});var rnotwhite=/\S+/g; // Convert String-formatted options into Object-formatted ones
function createOptions(options){var object={};jQuery.each(options.match(rnotwhite)||[],function(_,flag){object[flag]=true;});return object;} /*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */jQuery.Callbacks=function(options){ // Convert options from String-formatted to Object-formatted if needed
// (we check in cache first)
options=typeof options==="string"?createOptions(options):jQuery.extend({},options);var  // Flag to know if list is currently firing
firing, // Last fire value for non-forgettable lists
memory, // Flag to know if list was already fired
_fired, // Flag to prevent firing
_locked, // Actual callback list
list=[], // Queue of execution data for repeatable lists
queue=[], // Index of currently firing callback (modified by add/remove as needed)
firingIndex=-1, // Fire callbacks
fire=function fire(){ // Enforce single-firing
_locked=options.once; // Execute callbacks for all pending executions,
// respecting firingIndex overrides and runtime changes
_fired=firing=true;for(;queue.length;firingIndex=-1){memory=queue.shift();while(++firingIndex<list.length){ // Run callback and check for early termination
if(list[firingIndex].apply(memory[0],memory[1])===false&&options.stopOnFalse){ // Jump to end and forget the data so .add doesn't re-fire
firingIndex=list.length;memory=false;}}} // Forget the data if we're done with it
if(!options.memory){memory=false;}firing=false; // Clean up if we're done firing for good
if(_locked){ // Keep an empty list if we have data for future add calls
if(memory){list=[]; // Otherwise, this object is spent
}else {list="";}}}, // Actual Callbacks object
self={ // Add a callback or a collection of callbacks to the list
add:function add(){if(list){ // If we have memory from a past run, we should fire after adding
if(memory&&!firing){firingIndex=list.length-1;queue.push(memory);}(function add(args){jQuery.each(args,function(_,arg){if(jQuery.isFunction(arg)){if(!options.unique||!self.has(arg)){list.push(arg);}}else if(arg&&arg.length&&jQuery.type(arg)!=="string"){ // Inspect recursively
add(arg);}});})(arguments);if(memory&&!firing){fire();}}return this;}, // Remove a callback from the list
remove:function remove(){jQuery.each(arguments,function(_,arg){var index;while((index=jQuery.inArray(arg,list,index))>-1){list.splice(index,1); // Handle firing indexes
if(index<=firingIndex){firingIndex--;}}});return this;}, // Check if a given callback is in the list.
// If no argument is given, return whether or not list has callbacks attached.
has:function has(fn){return fn?jQuery.inArray(fn,list)>-1:list.length>0;}, // Remove all callbacks from the list
empty:function empty(){if(list){list=[];}return this;}, // Disable .fire and .add
// Abort any current/pending executions
// Clear all callbacks and values
disable:function disable(){_locked=queue=[];list=memory="";return this;},disabled:function disabled(){return !list;}, // Disable .fire
// Also disable .add unless we have memory (since it would have no effect)
// Abort any pending executions
lock:function lock(){_locked=queue=[];if(!memory){list=memory="";}return this;},locked:function locked(){return !!_locked;}, // Call all callbacks with the given context and arguments
fireWith:function fireWith(context,args){if(!_locked){args=args||[];args=[context,args.slice?args.slice():args];queue.push(args);if(!firing){fire();}}return this;}, // Call all the callbacks with the given arguments
fire:function fire(){self.fireWith(this,arguments);return this;}, // To know if the callbacks have already been called at least once
fired:function fired(){return !!_fired;}};return self;};jQuery.extend({Deferred:function Deferred(func){var tuples=[ // action, add listener, listener list, final state
["resolve","done",jQuery.Callbacks("once memory"),"resolved"],["reject","fail",jQuery.Callbacks("once memory"),"rejected"],["notify","progress",jQuery.Callbacks("memory")]],_state="pending",_promise={state:function state(){return _state;},always:function always(){deferred.done(arguments).fail(arguments);return this;},then:function then() /* fnDone, fnFail, fnProgress */{var fns=arguments;return jQuery.Deferred(function(newDefer){jQuery.each(tuples,function(i,tuple){var fn=jQuery.isFunction(fns[i])&&fns[i]; // deferred[ done | fail | progress ] for forwarding actions to newDefer
deferred[tuple[1]](function(){var returned=fn&&fn.apply(this,arguments);if(returned&&jQuery.isFunction(returned.promise)){returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);}else {newDefer[tuple[0]+"With"](this===_promise?newDefer.promise():this,fn?[returned]:arguments);}});});fns=null;}).promise();}, // Get a promise for this deferred
// If obj is provided, the promise aspect is added to the object
promise:function promise(obj){return obj!=null?jQuery.extend(obj,_promise):_promise;}},deferred={}; // Keep pipe for back-compat
_promise.pipe=_promise.then; // Add list-specific methods
jQuery.each(tuples,function(i,tuple){var list=tuple[2],stateString=tuple[3]; // promise[ done | fail | progress ] = list.add
_promise[tuple[1]]=list.add; // Handle state
if(stateString){list.add(function(){ // state = [ resolved | rejected ]
_state=stateString; // [ reject_list | resolve_list ].disable; progress_list.lock
},tuples[i^1][2].disable,tuples[2][2].lock);} // deferred[ resolve | reject | notify ]
deferred[tuple[0]]=function(){deferred[tuple[0]+"With"](this===deferred?_promise:this,arguments);return this;};deferred[tuple[0]+"With"]=list.fireWith;}); // Make the deferred a promise
_promise.promise(deferred); // Call given func if any
if(func){func.call(deferred,deferred);} // All done!
return deferred;}, // Deferred helper
when:function when(subordinate /* , ..., subordinateN */){var i=0,resolveValues=_slice.call(arguments),length=resolveValues.length, // the count of uncompleted subordinates
remaining=length!==1||subordinate&&jQuery.isFunction(subordinate.promise)?length:0, // the master Deferred.
// If resolveValues consist of only a single Deferred, just use that.
deferred=remaining===1?subordinate:jQuery.Deferred(), // Update function for both resolve and progress values
updateFunc=function updateFunc(i,contexts,values){return function(value){contexts[i]=this;values[i]=arguments.length>1?_slice.call(arguments):value;if(values===progressValues){deferred.notifyWith(contexts,values);}else if(! --remaining){deferred.resolveWith(contexts,values);}};},progressValues,progressContexts,resolveContexts; // Add listeners to Deferred subordinates; treat others as resolved
if(length>1){progressValues=new Array(length);progressContexts=new Array(length);resolveContexts=new Array(length);for(;i<length;i++){if(resolveValues[i]&&jQuery.isFunction(resolveValues[i].promise)){resolveValues[i].promise().progress(updateFunc(i,progressContexts,progressValues)).done(updateFunc(i,resolveContexts,resolveValues)).fail(deferred.reject);}else {--remaining;}}} // If we're not waiting on anything, resolve the master
if(!remaining){deferred.resolveWith(resolveContexts,resolveValues);}return deferred.promise();}}); // The deferred used on DOM ready
var readyList;jQuery.fn.ready=function(fn){ // Add the callback
jQuery.ready.promise().done(fn);return this;};jQuery.extend({ // Is the DOM ready to be used? Set to true once it occurs.
isReady:false, // A counter to track how many items to wait for before
// the ready event fires. See #6781
readyWait:1, // Hold (or release) the ready event
holdReady:function holdReady(hold){if(hold){jQuery.readyWait++;}else {jQuery.ready(true);}}, // Handle when the DOM is ready
ready:function ready(wait){ // Abort if there are pending holds or we're already ready
if(wait===true?--jQuery.readyWait:jQuery.isReady){return;} // Remember that the DOM is ready
jQuery.isReady=true; // If a normal DOM Ready event fired, decrement, and wait if need be
if(wait!==true&&--jQuery.readyWait>0){return;} // If there are functions bound, to execute
readyList.resolveWith(document,[jQuery]); // Trigger any bound ready events
if(jQuery.fn.triggerHandler){jQuery(document).triggerHandler("ready");jQuery(document).off("ready");}}}); /**
 * The ready event handler and self cleanup method
 */function completed(){document.removeEventListener("DOMContentLoaded",completed);window.removeEventListener("load",completed);jQuery.ready();}jQuery.ready.promise=function(obj){if(!readyList){readyList=jQuery.Deferred(); // Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE9-10 only
// Older IE sometimes signals "interactive" too soon
if(document.readyState==="complete"||document.readyState!=="loading"&&!document.documentElement.doScroll){ // Handle it asynchronously to allow scripts the opportunity to delay ready
window.setTimeout(jQuery.ready);}else { // Use the handy event callback
document.addEventListener("DOMContentLoaded",completed); // A fallback to window.onload, that will always work
window.addEventListener("load",completed);}}return readyList.promise(obj);}; // Kick off the DOM ready check even if the user does not
jQuery.ready.promise(); // Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access=function access(elems,fn,key,value,chainable,emptyGet,raw){var i=0,len=elems.length,bulk=key==null; // Sets many values
if(jQuery.type(key)==="object"){chainable=true;for(i in key){access(elems,fn,i,key[i],true,emptyGet,raw);} // Sets one value
}else if(value!==undefined){chainable=true;if(!jQuery.isFunction(value)){raw=true;}if(bulk){ // Bulk operations run against the entire set
if(raw){fn.call(elems,value);fn=null; // ...except when executing function values
}else {bulk=fn;fn=function fn(elem,key,value){return bulk.call(jQuery(elem),value);};}}if(fn){for(;i<len;i++){fn(elems[i],key,raw?value:value.call(elems[i],i,fn(elems[i],key)));}}}return chainable?elems: // Gets
bulk?fn.call(elems):len?fn(elems[0],key):emptyGet;};var acceptData=function acceptData(owner){ // Accepts only:
//  - Node
//    - Node.ELEMENT_NODE
//    - Node.DOCUMENT_NODE
//  - Object
//    - Any
/* jshint -W018 */return owner.nodeType===1||owner.nodeType===9||! +owner.nodeType;};function Data(){this.expando=jQuery.expando+Data.uid++;}Data.uid=1;Data.prototype={register:function register(owner,initial){var value=initial||{}; // If it is a node unlikely to be stringify-ed or looped over
// use plain assignment
if(owner.nodeType){owner[this.expando]=value; // Otherwise secure it in a non-enumerable, non-writable property
// configurability must be true to allow the property to be
// deleted with the delete operator
}else {Object.defineProperty(owner,this.expando,{value:value,writable:true,configurable:true});}return owner[this.expando];},cache:function cache(owner){ // We can accept data for non-element nodes in modern browsers,
// but we should not, see #8335.
// Always return an empty object.
if(!acceptData(owner)){return {};} // Check if the owner object already has a cache
var value=owner[this.expando]; // If not, create one
if(!value){value={}; // We can accept data for non-element nodes in modern browsers,
// but we should not, see #8335.
// Always return an empty object.
if(acceptData(owner)){ // If it is a node unlikely to be stringify-ed or looped over
// use plain assignment
if(owner.nodeType){owner[this.expando]=value; // Otherwise secure it in a non-enumerable property
// configurable must be true to allow the property to be
// deleted when data is removed
}else {Object.defineProperty(owner,this.expando,{value:value,configurable:true});}}}return value;},set:function set(owner,data,value){var prop,cache=this.cache(owner); // Handle: [ owner, key, value ] args
if(typeof data==="string"){cache[data]=value; // Handle: [ owner, { properties } ] args
}else { // Copy the properties one-by-one to the cache object
for(prop in data){cache[prop]=data[prop];}}return cache;},get:function get(owner,key){return key===undefined?this.cache(owner):owner[this.expando]&&owner[this.expando][key];},access:function access(owner,key,value){var stored; // In cases where either:
//
//   1. No key was specified
//   2. A string key was specified, but no value provided
//
// Take the "read" path and allow the get method to determine
// which value to return, respectively either:
//
//   1. The entire cache object
//   2. The data stored at the key
//
if(key===undefined||key&&typeof key==="string"&&value===undefined){stored=this.get(owner,key);return stored!==undefined?stored:this.get(owner,jQuery.camelCase(key));} // When the key is not a string, or both a key and value
// are specified, set or extend (existing objects) with either:
//
//   1. An object of properties
//   2. A key and value
//
this.set(owner,key,value); // Since the "set" path can have two possible entry points
// return the expected data based on which path was taken[*]
return value!==undefined?value:key;},remove:function remove(owner,key){var i,name,camel,cache=owner[this.expando];if(cache===undefined){return;}if(key===undefined){this.register(owner);}else { // Support array or space separated string of keys
if(jQuery.isArray(key)){ // If "name" is an array of keys...
// When data is initially created, via ("key", "val") signature,
// keys will be converted to camelCase.
// Since there is no way to tell _how_ a key was added, remove
// both plain key and camelCase key. #12786
// This will only penalize the array argument path.
name=key.concat(key.map(jQuery.camelCase));}else {camel=jQuery.camelCase(key); // Try the string as a key before any manipulation
if(key in cache){name=[key,camel];}else { // If a key with the spaces exists, use it.
// Otherwise, create an array by matching non-whitespace
name=camel;name=name in cache?[name]:name.match(rnotwhite)||[];}}i=name.length;while(i--){delete cache[name[i]];}} // Remove the expando if there's no more data
if(key===undefined||jQuery.isEmptyObject(cache)){ // Support: Chrome <= 35-45+
// Webkit & Blink performance suffers when deleting properties
// from DOM nodes, so set to undefined instead
// https://code.google.com/p/chromium/issues/detail?id=378607
if(owner.nodeType){owner[this.expando]=undefined;}else {delete owner[this.expando];}}},hasData:function hasData(owner){var cache=owner[this.expando];return cache!==undefined&&!jQuery.isEmptyObject(cache);}};var dataPriv=new Data();var dataUser=new Data(); //	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014
var rbrace=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,rmultiDash=/[A-Z]/g;function dataAttr(elem,key,data){var name; // If nothing was found internally, try to fetch any
// data from the HTML5 data-* attribute
if(data===undefined&&elem.nodeType===1){name="data-"+key.replace(rmultiDash,"-$&").toLowerCase();data=elem.getAttribute(name);if(typeof data==="string"){try{data=data==="true"?true:data==="false"?false:data==="null"?null: // Only convert to a number if it doesn't change the string
+data+""===data?+data:rbrace.test(data)?jQuery.parseJSON(data):data;}catch(e){} // Make sure we set the data so it isn't changed later
dataUser.set(elem,key,data);}else {data=undefined;}}return data;}jQuery.extend({hasData:function hasData(elem){return dataUser.hasData(elem)||dataPriv.hasData(elem);},data:function data(elem,name,_data){return dataUser.access(elem,name,_data);},removeData:function removeData(elem,name){dataUser.remove(elem,name);}, // TODO: Now that all calls to _data and _removeData have been replaced
// with direct calls to dataPriv methods, these can be deprecated.
_data:function _data(elem,name,data){return dataPriv.access(elem,name,data);},_removeData:function _removeData(elem,name){dataPriv.remove(elem,name);}});jQuery.fn.extend({data:function data(key,value){var i,name,data,elem=this[0],attrs=elem&&elem.attributes; // Gets all values
if(key===undefined){if(this.length){data=dataUser.get(elem);if(elem.nodeType===1&&!dataPriv.get(elem,"hasDataAttrs")){i=attrs.length;while(i--){ // Support: IE11+
// The attrs elements can be null (#14894)
if(attrs[i]){name=attrs[i].name;if(name.indexOf("data-")===0){name=jQuery.camelCase(name.slice(5));dataAttr(elem,name,data[name]);}}}dataPriv.set(elem,"hasDataAttrs",true);}}return data;} // Sets multiple values
if((typeof key==="undefined"?"undefined":_typeof(key))==="object"){return this.each(function(){dataUser.set(this,key);});}return access(this,function(value){var data,camelKey; // The calling jQuery object (element matches) is not empty
// (and therefore has an element appears at this[ 0 ]) and the
// `value` parameter was not undefined. An empty jQuery object
// will result in `undefined` for elem = this[ 0 ] which will
// throw an exception if an attempt to read a data cache is made.
if(elem&&value===undefined){ // Attempt to get data from the cache
// with the key as-is
data=dataUser.get(elem,key)|| // Try to find dashed key if it exists (gh-2779)
// This is for 2.2.x only
dataUser.get(elem,key.replace(rmultiDash,"-$&").toLowerCase());if(data!==undefined){return data;}camelKey=jQuery.camelCase(key); // Attempt to get data from the cache
// with the key camelized
data=dataUser.get(elem,camelKey);if(data!==undefined){return data;} // Attempt to "discover" the data in
// HTML5 custom data-* attrs
data=dataAttr(elem,camelKey,undefined);if(data!==undefined){return data;} // We tried really hard, but the data doesn't exist.
return;} // Set the data...
camelKey=jQuery.camelCase(key);this.each(function(){ // First, attempt to store a copy or reference of any
// data that might've been store with a camelCased key.
var data=dataUser.get(this,camelKey); // For HTML5 data-* attribute interop, we have to
// store property names with dashes in a camelCase form.
// This might not apply to all properties...*
dataUser.set(this,camelKey,value); // *... In the case of properties that might _actually_
// have dashes, we need to also store a copy of that
// unchanged property.
if(key.indexOf("-")>-1&&data!==undefined){dataUser.set(this,key,value);}});},null,value,arguments.length>1,null,true);},removeData:function removeData(key){return this.each(function(){dataUser.remove(this,key);});}});jQuery.extend({queue:function queue(elem,type,data){var queue;if(elem){type=(type||"fx")+"queue";queue=dataPriv.get(elem,type); // Speed up dequeue by getting out quickly if this is just a lookup
if(data){if(!queue||jQuery.isArray(data)){queue=dataPriv.access(elem,type,jQuery.makeArray(data));}else {queue.push(data);}}return queue||[];}},dequeue:function dequeue(elem,type){type=type||"fx";var queue=jQuery.queue(elem,type),startLength=queue.length,fn=queue.shift(),hooks=jQuery._queueHooks(elem,type),next=function next(){jQuery.dequeue(elem,type);}; // If the fx queue is dequeued, always remove the progress sentinel
if(fn==="inprogress"){fn=queue.shift();startLength--;}if(fn){ // Add a progress sentinel to prevent the fx queue from being
// automatically dequeued
if(type==="fx"){queue.unshift("inprogress");} // Clear up the last queue stop function
delete hooks.stop;fn.call(elem,next,hooks);}if(!startLength&&hooks){hooks.empty.fire();}}, // Not public - generate a queueHooks object, or return the current one
_queueHooks:function _queueHooks(elem,type){var key=type+"queueHooks";return dataPriv.get(elem,key)||dataPriv.access(elem,key,{empty:jQuery.Callbacks("once memory").add(function(){dataPriv.remove(elem,[type+"queue",key]);})});}});jQuery.fn.extend({queue:function queue(type,data){var setter=2;if(typeof type!=="string"){data=type;type="fx";setter--;}if(arguments.length<setter){return jQuery.queue(this[0],type);}return data===undefined?this:this.each(function(){var queue=jQuery.queue(this,type,data); // Ensure a hooks for this queue
jQuery._queueHooks(this,type);if(type==="fx"&&queue[0]!=="inprogress"){jQuery.dequeue(this,type);}});},dequeue:function dequeue(type){return this.each(function(){jQuery.dequeue(this,type);});},clearQueue:function clearQueue(type){return this.queue(type||"fx",[]);}, // Get a promise resolved when queues of a certain type
// are emptied (fx is the type by default)
promise:function promise(type,obj){var tmp,count=1,defer=jQuery.Deferred(),elements=this,i=this.length,resolve=function resolve(){if(! --count){defer.resolveWith(elements,[elements]);}};if(typeof type!=="string"){obj=type;type=undefined;}type=type||"fx";while(i--){tmp=dataPriv.get(elements[i],type+"queueHooks");if(tmp&&tmp.empty){count++;tmp.empty.add(resolve);}}resolve();return defer.promise(obj);}});var pnum=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;var rcssNum=new RegExp("^(?:([+-])=|)("+pnum+")([a-z%]*)$","i");var cssExpand=["Top","Right","Bottom","Left"];var isHidden=function isHidden(elem,el){ // isHidden might be called from jQuery#filter function;
// in that case, element will be second argument
elem=el||elem;return jQuery.css(elem,"display")==="none"||!jQuery.contains(elem.ownerDocument,elem);};function adjustCSS(elem,prop,valueParts,tween){var adjusted,scale=1,maxIterations=20,currentValue=tween?function(){return tween.cur();}:function(){return jQuery.css(elem,prop,"");},initial=currentValue(),unit=valueParts&&valueParts[3]||(jQuery.cssNumber[prop]?"":"px"), // Starting value computation is required for potential unit mismatches
initialInUnit=(jQuery.cssNumber[prop]||unit!=="px"&&+initial)&&rcssNum.exec(jQuery.css(elem,prop));if(initialInUnit&&initialInUnit[3]!==unit){ // Trust units reported by jQuery.css
unit=unit||initialInUnit[3]; // Make sure we update the tween properties later on
valueParts=valueParts||[]; // Iteratively approximate from a nonzero starting point
initialInUnit=+initial||1;do { // If previous iteration zeroed out, double until we get *something*.
// Use string for doubling so we don't accidentally see scale as unchanged below
scale=scale||".5"; // Adjust and apply
initialInUnit=initialInUnit/scale;jQuery.style(elem,prop,initialInUnit+unit); // Update scale, tolerating zero or NaN from tween.cur()
// Break the loop if scale is unchanged or perfect, or if we've just had enough.
}while(scale!==(scale=currentValue()/initial)&&scale!==1&&--maxIterations);}if(valueParts){initialInUnit=+initialInUnit||+initial||0; // Apply relative offset (+=/-=) if specified
adjusted=valueParts[1]?initialInUnit+(valueParts[1]+1)*valueParts[2]:+valueParts[2];if(tween){tween.unit=unit;tween.start=initialInUnit;tween.end=adjusted;}}return adjusted;}var rcheckableType=/^(?:checkbox|radio)$/i;var rtagName=/<([\w:-]+)/;var rscriptType=/^$|\/(?:java|ecma)script/i; // We have to close these tags to support XHTML (#13200)
var wrapMap={ // Support: IE9
option:[1,"<select multiple='multiple'>","</select>"], // XHTML parsers do not magically insert elements in the
// same way that tag soup parsers do. So we cannot shorten
// this by omitting <tbody> or other required elements.
thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]}; // Support: IE9
wrapMap.optgroup=wrapMap.option;wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;wrapMap.th=wrapMap.td;function getAll(context,tag){ // Support: IE9-11+
// Use typeof to avoid zero-argument method invocation on host objects (#15151)
var ret=typeof context.getElementsByTagName!=="undefined"?context.getElementsByTagName(tag||"*"):typeof context.querySelectorAll!=="undefined"?context.querySelectorAll(tag||"*"):[];return tag===undefined||tag&&jQuery.nodeName(context,tag)?jQuery.merge([context],ret):ret;} // Mark scripts as having already been evaluated
function setGlobalEval(elems,refElements){var i=0,l=elems.length;for(;i<l;i++){dataPriv.set(elems[i],"globalEval",!refElements||dataPriv.get(refElements[i],"globalEval"));}}var rhtml=/<|&#?\w+;/;function buildFragment(elems,context,scripts,selection,ignored){var elem,tmp,tag,wrap,contains,j,fragment=context.createDocumentFragment(),nodes=[],i=0,l=elems.length;for(;i<l;i++){elem=elems[i];if(elem||elem===0){ // Add nodes directly
if(jQuery.type(elem)==="object"){ // Support: Android<4.1, PhantomJS<2
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(nodes,elem.nodeType?[elem]:elem); // Convert non-html into a text node
}else if(!rhtml.test(elem)){nodes.push(context.createTextNode(elem)); // Convert html into DOM nodes
}else {tmp=tmp||fragment.appendChild(context.createElement("div")); // Deserialize a standard representation
tag=(rtagName.exec(elem)||["",""])[1].toLowerCase();wrap=wrapMap[tag]||wrapMap._default;tmp.innerHTML=wrap[1]+jQuery.htmlPrefilter(elem)+wrap[2]; // Descend through wrappers to the right content
j=wrap[0];while(j--){tmp=tmp.lastChild;} // Support: Android<4.1, PhantomJS<2
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(nodes,tmp.childNodes); // Remember the top-level container
tmp=fragment.firstChild; // Ensure the created nodes are orphaned (#12392)
tmp.textContent="";}}} // Remove wrapper from fragment
fragment.textContent="";i=0;while(elem=nodes[i++]){ // Skip elements already in the context collection (trac-4087)
if(selection&&jQuery.inArray(elem,selection)>-1){if(ignored){ignored.push(elem);}continue;}contains=jQuery.contains(elem.ownerDocument,elem); // Append to fragment
tmp=getAll(fragment.appendChild(elem),"script"); // Preserve script evaluation history
if(contains){setGlobalEval(tmp);} // Capture executables
if(scripts){j=0;while(elem=tmp[j++]){if(rscriptType.test(elem.type||"")){scripts.push(elem);}}}}return fragment;}(function(){var fragment=document.createDocumentFragment(),div=fragment.appendChild(document.createElement("div")),input=document.createElement("input"); // Support: Android 4.0-4.3, Safari<=5.1
// Check state lost if the name is set (#11217)
// Support: Windows Web Apps (WWA)
// `name` and `type` must use .setAttribute for WWA (#14901)
input.setAttribute("type","radio");input.setAttribute("checked","checked");input.setAttribute("name","t");div.appendChild(input); // Support: Safari<=5.1, Android<4.2
// Older WebKit doesn't clone checked state correctly in fragments
support.checkClone=div.cloneNode(true).cloneNode(true).lastChild.checked; // Support: IE<=11+
// Make sure textarea (and checkbox) defaultValue is properly cloned
div.innerHTML="<textarea>x</textarea>";support.noCloneChecked=!!div.cloneNode(true).lastChild.defaultValue;})();var rkeyEvent=/^key/,rmouseEvent=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,rtypenamespace=/^([^.]*)(?:\.(.+)|)/;function returnTrue(){return true;}function returnFalse(){return false;} // Support: IE9
// See #13393 for more info
function safeActiveElement(){try{return document.activeElement;}catch(err){}}function _on(elem,types,selector,data,fn,one){var origFn,type; // Types can be a map of types/handlers
if((typeof types==="undefined"?"undefined":_typeof(types))==="object"){ // ( types-Object, selector, data )
if(typeof selector!=="string"){ // ( types-Object, data )
data=data||selector;selector=undefined;}for(type in types){_on(elem,type,selector,data,types[type],one);}return elem;}if(data==null&&fn==null){ // ( types, fn )
fn=selector;data=selector=undefined;}else if(fn==null){if(typeof selector==="string"){ // ( types, selector, fn )
fn=data;data=undefined;}else { // ( types, data, fn )
fn=data;data=selector;selector=undefined;}}if(fn===false){fn=returnFalse;}else if(!fn){return elem;}if(one===1){origFn=fn;fn=function fn(event){ // Can use an empty set, since event contains the info
jQuery().off(event);return origFn.apply(this,arguments);}; // Use same guid so caller can remove using origFn
fn.guid=origFn.guid||(origFn.guid=jQuery.guid++);}return elem.each(function(){jQuery.event.add(this,types,fn,data,selector);});} /*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */jQuery.event={global:{},add:function add(elem,types,handler,data,selector){var handleObjIn,eventHandle,tmp,events,t,handleObj,special,handlers,type,namespaces,origType,elemData=dataPriv.get(elem); // Don't attach events to noData or text/comment nodes (but allow plain objects)
if(!elemData){return;} // Caller can pass in an object of custom data in lieu of the handler
if(handler.handler){handleObjIn=handler;handler=handleObjIn.handler;selector=handleObjIn.selector;} // Make sure that the handler has a unique ID, used to find/remove it later
if(!handler.guid){handler.guid=jQuery.guid++;} // Init the element's event structure and main handler, if this is the first
if(!(events=elemData.events)){events=elemData.events={};}if(!(eventHandle=elemData.handle)){eventHandle=elemData.handle=function(e){ // Discard the second event of a jQuery.event.trigger() and
// when an event is called after a page has unloaded
return typeof jQuery!=="undefined"&&jQuery.event.triggered!==e.type?jQuery.event.dispatch.apply(elem,arguments):undefined;};} // Handle multiple events separated by a space
types=(types||"").match(rnotwhite)||[""];t=types.length;while(t--){tmp=rtypenamespace.exec(types[t])||[];type=origType=tmp[1];namespaces=(tmp[2]||"").split(".").sort(); // There *must* be a type, no attaching namespace-only handlers
if(!type){continue;} // If event changes its type, use the special event handlers for the changed type
special=jQuery.event.special[type]||{}; // If selector defined, determine special event api type, otherwise given type
type=(selector?special.delegateType:special.bindType)||type; // Update special based on newly reset type
special=jQuery.event.special[type]||{}; // handleObj is passed to all event handlers
handleObj=jQuery.extend({type:type,origType:origType,data:data,handler:handler,guid:handler.guid,selector:selector,needsContext:selector&&jQuery.expr.match.needsContext.test(selector),namespace:namespaces.join(".")},handleObjIn); // Init the event handler queue if we're the first
if(!(handlers=events[type])){handlers=events[type]=[];handlers.delegateCount=0; // Only use addEventListener if the special events handler returns false
if(!special.setup||special.setup.call(elem,data,namespaces,eventHandle)===false){if(elem.addEventListener){elem.addEventListener(type,eventHandle);}}}if(special.add){special.add.call(elem,handleObj);if(!handleObj.handler.guid){handleObj.handler.guid=handler.guid;}} // Add to the element's handler list, delegates in front
if(selector){handlers.splice(handlers.delegateCount++,0,handleObj);}else {handlers.push(handleObj);} // Keep track of which events have ever been used, for event optimization
jQuery.event.global[type]=true;}}, // Detach an event or set of events from an element
remove:function remove(elem,types,handler,selector,mappedTypes){var j,origCount,tmp,events,t,handleObj,special,handlers,type,namespaces,origType,elemData=dataPriv.hasData(elem)&&dataPriv.get(elem);if(!elemData||!(events=elemData.events)){return;} // Once for each type.namespace in types; type may be omitted
types=(types||"").match(rnotwhite)||[""];t=types.length;while(t--){tmp=rtypenamespace.exec(types[t])||[];type=origType=tmp[1];namespaces=(tmp[2]||"").split(".").sort(); // Unbind all events (on this namespace, if provided) for the element
if(!type){for(type in events){jQuery.event.remove(elem,type+types[t],handler,selector,true);}continue;}special=jQuery.event.special[type]||{};type=(selector?special.delegateType:special.bindType)||type;handlers=events[type]||[];tmp=tmp[2]&&new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)"); // Remove matching events
origCount=j=handlers.length;while(j--){handleObj=handlers[j];if((mappedTypes||origType===handleObj.origType)&&(!handler||handler.guid===handleObj.guid)&&(!tmp||tmp.test(handleObj.namespace))&&(!selector||selector===handleObj.selector||selector==="**"&&handleObj.selector)){handlers.splice(j,1);if(handleObj.selector){handlers.delegateCount--;}if(special.remove){special.remove.call(elem,handleObj);}}} // Remove generic event handler if we removed something and no more handlers exist
// (avoids potential for endless recursion during removal of special event handlers)
if(origCount&&!handlers.length){if(!special.teardown||special.teardown.call(elem,namespaces,elemData.handle)===false){jQuery.removeEvent(elem,type,elemData.handle);}delete events[type];}} // Remove data and the expando if it's no longer used
if(jQuery.isEmptyObject(events)){dataPriv.remove(elem,"handle events");}},dispatch:function dispatch(event){ // Make a writable jQuery.Event from the native event object
event=jQuery.event.fix(event);var i,j,ret,matched,handleObj,handlerQueue=[],args=_slice.call(arguments),handlers=(dataPriv.get(this,"events")||{})[event.type]||[],special=jQuery.event.special[event.type]||{}; // Use the fix-ed jQuery.Event rather than the (read-only) native event
args[0]=event;event.delegateTarget=this; // Call the preDispatch hook for the mapped type, and let it bail if desired
if(special.preDispatch&&special.preDispatch.call(this,event)===false){return;} // Determine handlers
handlerQueue=jQuery.event.handlers.call(this,event,handlers); // Run delegates first; they may want to stop propagation beneath us
i=0;while((matched=handlerQueue[i++])&&!event.isPropagationStopped()){event.currentTarget=matched.elem;j=0;while((handleObj=matched.handlers[j++])&&!event.isImmediatePropagationStopped()){ // Triggered event must either 1) have no namespace, or 2) have namespace(s)
// a subset or equal to those in the bound event (both can have no namespace).
if(!event.rnamespace||event.rnamespace.test(handleObj.namespace)){event.handleObj=handleObj;event.data=handleObj.data;ret=((jQuery.event.special[handleObj.origType]||{}).handle||handleObj.handler).apply(matched.elem,args);if(ret!==undefined){if((event.result=ret)===false){event.preventDefault();event.stopPropagation();}}}}} // Call the postDispatch hook for the mapped type
if(special.postDispatch){special.postDispatch.call(this,event);}return event.result;},handlers:function handlers(event,_handlers){var i,matches,sel,handleObj,handlerQueue=[],delegateCount=_handlers.delegateCount,cur=event.target; // Support (at least): Chrome, IE9
// Find delegate handlers
// Black-hole SVG <use> instance trees (#13180)
//
// Support: Firefox<=42+
// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
if(delegateCount&&cur.nodeType&&(event.type!=="click"||isNaN(event.button)||event.button<1)){for(;cur!==this;cur=cur.parentNode||this){ // Don't check non-elements (#13208)
// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
if(cur.nodeType===1&&(cur.disabled!==true||event.type!=="click")){matches=[];for(i=0;i<delegateCount;i++){handleObj=_handlers[i]; // Don't conflict with Object.prototype properties (#13203)
sel=handleObj.selector+" ";if(matches[sel]===undefined){matches[sel]=handleObj.needsContext?jQuery(sel,this).index(cur)>-1:jQuery.find(sel,this,null,[cur]).length;}if(matches[sel]){matches.push(handleObj);}}if(matches.length){handlerQueue.push({elem:cur,handlers:matches});}}}} // Add the remaining (directly-bound) handlers
if(delegateCount<_handlers.length){handlerQueue.push({elem:this,handlers:_handlers.slice(delegateCount)});}return handlerQueue;}, // Includes some event props shared by KeyEvent and MouseEvent
props:("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase "+"metaKey relatedTarget shiftKey target timeStamp view which").split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function filter(event,original){ // Add which for key events
if(event.which==null){event.which=original.charCode!=null?original.charCode:original.keyCode;}return event;}},mouseHooks:{props:("button buttons clientX clientY offsetX offsetY pageX pageY "+"screenX screenY toElement").split(" "),filter:function filter(event,original){var eventDoc,doc,body,button=original.button; // Calculate pageX/Y if missing and clientX/Y available
if(event.pageX==null&&original.clientX!=null){eventDoc=event.target.ownerDocument||document;doc=eventDoc.documentElement;body=eventDoc.body;event.pageX=original.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0);event.pageY=original.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0);} // Add which for click: 1 === left; 2 === middle; 3 === right
// Note: button is not normalized, so don't use it
if(!event.which&&button!==undefined){event.which=button&1?1:button&2?3:button&4?2:0;}return event;}},fix:function fix(event){if(event[jQuery.expando]){return event;} // Create a writable copy of the event object and normalize some properties
var i,prop,copy,type=event.type,originalEvent=event,fixHook=this.fixHooks[type];if(!fixHook){this.fixHooks[type]=fixHook=rmouseEvent.test(type)?this.mouseHooks:rkeyEvent.test(type)?this.keyHooks:{};}copy=fixHook.props?this.props.concat(fixHook.props):this.props;event=new jQuery.Event(originalEvent);i=copy.length;while(i--){prop=copy[i];event[prop]=originalEvent[prop];} // Support: Cordova 2.5 (WebKit) (#13255)
// All events should have a target; Cordova deviceready doesn't
if(!event.target){event.target=document;} // Support: Safari 6.0+, Chrome<28
// Target should not be a text node (#504, #13143)
if(event.target.nodeType===3){event.target=event.target.parentNode;}return fixHook.filter?fixHook.filter(event,originalEvent):event;},special:{load:{ // Prevent triggered image.load events from bubbling to window.load
noBubble:true},focus:{ // Fire native event if possible so blur/focus sequence is correct
trigger:function trigger(){if(this!==safeActiveElement()&&this.focus){this.focus();return false;}},delegateType:"focusin"},blur:{trigger:function trigger(){if(this===safeActiveElement()&&this.blur){this.blur();return false;}},delegateType:"focusout"},click:{ // For checkbox, fire native event so checked state will be right
trigger:function trigger(){if(this.type==="checkbox"&&this.click&&jQuery.nodeName(this,"input")){this.click();return false;}}, // For cross-browser consistency, don't fire native .click() on links
_default:function _default(event){return jQuery.nodeName(event.target,"a");}},beforeunload:{postDispatch:function postDispatch(event){ // Support: Firefox 20+
// Firefox doesn't alert if the returnValue field is not set.
if(event.result!==undefined&&event.originalEvent){event.originalEvent.returnValue=event.result;}}}}};jQuery.removeEvent=function(elem,type,handle){ // This "if" is needed for plain objects
if(elem.removeEventListener){elem.removeEventListener(type,handle);}};jQuery.Event=function(src,props){ // Allow instantiation without the 'new' keyword
if(!(this instanceof jQuery.Event)){return new jQuery.Event(src,props);} // Event object
if(src&&src.type){this.originalEvent=src;this.type=src.type; // Events bubbling up the document may have been marked as prevented
// by a handler lower down the tree; reflect the correct value.
this.isDefaultPrevented=src.defaultPrevented||src.defaultPrevented===undefined&& // Support: Android<4.0
src.returnValue===false?returnTrue:returnFalse; // Event type
}else {this.type=src;} // Put explicitly provided properties onto the event object
if(props){jQuery.extend(this,props);} // Create a timestamp if incoming event doesn't have one
this.timeStamp=src&&src.timeStamp||jQuery.now(); // Mark it as fixed
this[jQuery.expando]=true;}; // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype={constructor:jQuery.Event,isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse,preventDefault:function preventDefault(){var e=this.originalEvent;this.isDefaultPrevented=returnTrue;if(e){e.preventDefault();}},stopPropagation:function stopPropagation(){var e=this.originalEvent;this.isPropagationStopped=returnTrue;if(e){e.stopPropagation();}},stopImmediatePropagation:function stopImmediatePropagation(){var e=this.originalEvent;this.isImmediatePropagationStopped=returnTrue;if(e){e.stopImmediatePropagation();}this.stopPropagation();}}; // Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(orig,fix){jQuery.event.special[orig]={delegateType:fix,bindType:fix,handle:function handle(event){var ret,target=this,related=event.relatedTarget,handleObj=event.handleObj; // For mouseenter/leave call the handler if related is outside the target.
// NB: No relatedTarget if the mouse left/entered the browser window
if(!related||related!==target&&!jQuery.contains(target,related)){event.type=handleObj.origType;ret=handleObj.handler.apply(this,arguments);event.type=fix;}return ret;}};});jQuery.fn.extend({on:function on(types,selector,data,fn){return _on(this,types,selector,data,fn);},one:function one(types,selector,data,fn){return _on(this,types,selector,data,fn,1);},off:function off(types,selector,fn){var handleObj,type;if(types&&types.preventDefault&&types.handleObj){ // ( event )  dispatched jQuery.Event
handleObj=types.handleObj;jQuery(types.delegateTarget).off(handleObj.namespace?handleObj.origType+"."+handleObj.namespace:handleObj.origType,handleObj.selector,handleObj.handler);return this;}if((typeof types==="undefined"?"undefined":_typeof(types))==="object"){ // ( types-object [, selector] )
for(type in types){this.off(type,selector,types[type]);}return this;}if(selector===false||typeof selector==="function"){ // ( types [, fn] )
fn=selector;selector=undefined;}if(fn===false){fn=returnFalse;}return this.each(function(){jQuery.event.remove(this,types,fn,selector);});}});var rxhtmlTag=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, // Support: IE 10-11, Edge 10240+
// In IE/Edge using regex groups here causes severe slowdowns.
// See https://connect.microsoft.com/IE/feedback/details/1736512/
rnoInnerhtml=/<script|<style|<link/i, // checked="checked" or checked
rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,rscriptTypeMasked=/^true\/(.*)/,rcleanScript=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g; // Manipulating tables requires a tbody
function manipulationTarget(elem,content){return jQuery.nodeName(elem,"table")&&jQuery.nodeName(content.nodeType!==11?content:content.firstChild,"tr")?elem.getElementsByTagName("tbody")[0]||elem.appendChild(elem.ownerDocument.createElement("tbody")):elem;} // Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript(elem){elem.type=(elem.getAttribute("type")!==null)+"/"+elem.type;return elem;}function restoreScript(elem){var match=rscriptTypeMasked.exec(elem.type);if(match){elem.type=match[1];}else {elem.removeAttribute("type");}return elem;}function cloneCopyEvent(src,dest){var i,l,type,pdataOld,pdataCur,udataOld,udataCur,events;if(dest.nodeType!==1){return;} // 1. Copy private data: events, handlers, etc.
if(dataPriv.hasData(src)){pdataOld=dataPriv.access(src);pdataCur=dataPriv.set(dest,pdataOld);events=pdataOld.events;if(events){delete pdataCur.handle;pdataCur.events={};for(type in events){for(i=0,l=events[type].length;i<l;i++){jQuery.event.add(dest,type,events[type][i]);}}}} // 2. Copy user data
if(dataUser.hasData(src)){udataOld=dataUser.access(src);udataCur=jQuery.extend({},udataOld);dataUser.set(dest,udataCur);}} // Fix IE bugs, see support tests
function fixInput(src,dest){var nodeName=dest.nodeName.toLowerCase(); // Fails to persist the checked state of a cloned checkbox or radio button.
if(nodeName==="input"&&rcheckableType.test(src.type)){dest.checked=src.checked; // Fails to return the selected option to the default selected state when cloning options
}else if(nodeName==="input"||nodeName==="textarea"){dest.defaultValue=src.defaultValue;}}function domManip(collection,args,callback,ignored){ // Flatten any nested arrays
args=concat.apply([],args);var fragment,first,scripts,hasScripts,node,doc,i=0,l=collection.length,iNoClone=l-1,value=args[0],isFunction=jQuery.isFunction(value); // We can't cloneNode fragments that contain checked, in WebKit
if(isFunction||l>1&&typeof value==="string"&&!support.checkClone&&rchecked.test(value)){return collection.each(function(index){var self=collection.eq(index);if(isFunction){args[0]=value.call(this,index,self.html());}domManip(self,args,callback,ignored);});}if(l){fragment=buildFragment(args,collection[0].ownerDocument,false,collection,ignored);first=fragment.firstChild;if(fragment.childNodes.length===1){fragment=first;} // Require either new content or an interest in ignored elements to invoke the callback
if(first||ignored){scripts=jQuery.map(getAll(fragment,"script"),disableScript);hasScripts=scripts.length; // Use the original fragment for the last item
// instead of the first because it can end up
// being emptied incorrectly in certain situations (#8070).
for(;i<l;i++){node=fragment;if(i!==iNoClone){node=jQuery.clone(node,true,true); // Keep references to cloned scripts for later restoration
if(hasScripts){ // Support: Android<4.1, PhantomJS<2
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(scripts,getAll(node,"script"));}}callback.call(collection[i],node,i);}if(hasScripts){doc=scripts[scripts.length-1].ownerDocument; // Reenable scripts
jQuery.map(scripts,restoreScript); // Evaluate executable scripts on first document insertion
for(i=0;i<hasScripts;i++){node=scripts[i];if(rscriptType.test(node.type||"")&&!dataPriv.access(node,"globalEval")&&jQuery.contains(doc,node)){if(node.src){ // Optional AJAX dependency, but won't run scripts if not present
if(jQuery._evalUrl){jQuery._evalUrl(node.src);}}else {jQuery.globalEval(node.textContent.replace(rcleanScript,""));}}}}}}return collection;}function _remove(elem,selector,keepData){var node,nodes=selector?jQuery.filter(selector,elem):elem,i=0;for(;(node=nodes[i])!=null;i++){if(!keepData&&node.nodeType===1){jQuery.cleanData(getAll(node));}if(node.parentNode){if(keepData&&jQuery.contains(node.ownerDocument,node)){setGlobalEval(getAll(node,"script"));}node.parentNode.removeChild(node);}}return elem;}jQuery.extend({htmlPrefilter:function htmlPrefilter(html){return html.replace(rxhtmlTag,"<$1></$2>");},clone:function clone(elem,dataAndEvents,deepDataAndEvents){var i,l,srcElements,destElements,clone=elem.cloneNode(true),inPage=jQuery.contains(elem.ownerDocument,elem); // Fix IE cloning issues
if(!support.noCloneChecked&&(elem.nodeType===1||elem.nodeType===11)&&!jQuery.isXMLDoc(elem)){ // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
destElements=getAll(clone);srcElements=getAll(elem);for(i=0,l=srcElements.length;i<l;i++){fixInput(srcElements[i],destElements[i]);}} // Copy the events from the original to the clone
if(dataAndEvents){if(deepDataAndEvents){srcElements=srcElements||getAll(elem);destElements=destElements||getAll(clone);for(i=0,l=srcElements.length;i<l;i++){cloneCopyEvent(srcElements[i],destElements[i]);}}else {cloneCopyEvent(elem,clone);}} // Preserve script evaluation history
destElements=getAll(clone,"script");if(destElements.length>0){setGlobalEval(destElements,!inPage&&getAll(elem,"script"));} // Return the cloned set
return clone;},cleanData:function cleanData(elems){var data,elem,type,special=jQuery.event.special,i=0;for(;(elem=elems[i])!==undefined;i++){if(acceptData(elem)){if(data=elem[dataPriv.expando]){if(data.events){for(type in data.events){if(special[type]){jQuery.event.remove(elem,type); // This is a shortcut to avoid jQuery.event.remove's overhead
}else {jQuery.removeEvent(elem,type,data.handle);}}} // Support: Chrome <= 35-45+
// Assign undefined instead of using delete, see Data#remove
elem[dataPriv.expando]=undefined;}if(elem[dataUser.expando]){ // Support: Chrome <= 35-45+
// Assign undefined instead of using delete, see Data#remove
elem[dataUser.expando]=undefined;}}}}});jQuery.fn.extend({ // Keep domManip exposed until 3.0 (gh-2225)
domManip:domManip,detach:function detach(selector){return _remove(this,selector,true);},remove:function remove(selector){return _remove(this,selector);},text:function text(value){return access(this,function(value){return value===undefined?jQuery.text(this):this.empty().each(function(){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){this.textContent=value;}});},null,value,arguments.length);},append:function append(){return domManip(this,arguments,function(elem){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var target=manipulationTarget(this,elem);target.appendChild(elem);}});},prepend:function prepend(){return domManip(this,arguments,function(elem){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var target=manipulationTarget(this,elem);target.insertBefore(elem,target.firstChild);}});},before:function before(){return domManip(this,arguments,function(elem){if(this.parentNode){this.parentNode.insertBefore(elem,this);}});},after:function after(){return domManip(this,arguments,function(elem){if(this.parentNode){this.parentNode.insertBefore(elem,this.nextSibling);}});},empty:function empty(){var elem,i=0;for(;(elem=this[i])!=null;i++){if(elem.nodeType===1){ // Prevent memory leaks
jQuery.cleanData(getAll(elem,false)); // Remove any remaining nodes
elem.textContent="";}}return this;},clone:function clone(dataAndEvents,deepDataAndEvents){dataAndEvents=dataAndEvents==null?false:dataAndEvents;deepDataAndEvents=deepDataAndEvents==null?dataAndEvents:deepDataAndEvents;return this.map(function(){return jQuery.clone(this,dataAndEvents,deepDataAndEvents);});},html:function html(value){return access(this,function(value){var elem=this[0]||{},i=0,l=this.length;if(value===undefined&&elem.nodeType===1){return elem.innerHTML;} // See if we can take a shortcut and just use innerHTML
if(typeof value==="string"&&!rnoInnerhtml.test(value)&&!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){value=jQuery.htmlPrefilter(value);try{for(;i<l;i++){elem=this[i]||{}; // Remove element nodes and prevent memory leaks
if(elem.nodeType===1){jQuery.cleanData(getAll(elem,false));elem.innerHTML=value;}}elem=0; // If using innerHTML throws an exception, use the fallback method
}catch(e){}}if(elem){this.empty().append(value);}},null,value,arguments.length);},replaceWith:function replaceWith(){var ignored=[]; // Make the changes, replacing each non-ignored context element with the new content
return domManip(this,arguments,function(elem){var parent=this.parentNode;if(jQuery.inArray(this,ignored)<0){jQuery.cleanData(getAll(this));if(parent){parent.replaceChild(elem,this);}} // Force callback invocation
},ignored);}});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(selector){var elems,ret=[],insert=jQuery(selector),last=insert.length-1,i=0;for(;i<=last;i++){elems=i===last?this:this.clone(true);jQuery(insert[i])[original](elems); // Support: QtWebKit
// .get() because push.apply(_, arraylike) throws
push.apply(ret,elems.get());}return this.pushStack(ret);};});var iframe,elemdisplay={ // Support: Firefox
// We have to pre-define these values for FF (#10227)
HTML:"block",BODY:"block"}; /**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */ // Called only from within defaultDisplay
function actualDisplay(name,doc){var elem=jQuery(doc.createElement(name)).appendTo(doc.body),display=jQuery.css(elem[0],"display"); // We don't have any data stored on the element,
// so use "detach" method as fast way to get rid of the element
elem.detach();return display;} /**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */function defaultDisplay(nodeName){var doc=document,display=elemdisplay[nodeName];if(!display){display=actualDisplay(nodeName,doc); // If the simple way fails, read from inside an iframe
if(display==="none"||!display){ // Use the already-created iframe if possible
iframe=(iframe||jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement); // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
doc=iframe[0].contentDocument; // Support: IE
doc.write();doc.close();display=actualDisplay(nodeName,doc);iframe.detach();} // Store the correct default display
elemdisplay[nodeName]=display;}return display;}var rmargin=/^margin/;var rnumnonpx=new RegExp("^("+pnum+")(?!px)[a-z%]+$","i");var getStyles=function getStyles(elem){ // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
// IE throws on elements created in popups
// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
var view=elem.ownerDocument.defaultView;if(!view||!view.opener){view=window;}return view.getComputedStyle(elem);};var swap=function swap(elem,options,callback,args){var ret,name,old={}; // Remember the old values, and insert the new ones
for(name in options){old[name]=elem.style[name];elem.style[name]=options[name];}ret=callback.apply(elem,args||[]); // Revert the old values
for(name in options){elem.style[name]=old[name];}return ret;};var documentElement=document.documentElement;(function(){var pixelPositionVal,boxSizingReliableVal,pixelMarginRightVal,reliableMarginLeftVal,container=document.createElement("div"),div=document.createElement("div"); // Finish early in limited (non-browser) environments
if(!div.style){return;} // Support: IE9-11+
// Style of cloned element affects source element cloned (#8908)
div.style.backgroundClip="content-box";div.cloneNode(true).style.backgroundClip="";support.clearCloneStyle=div.style.backgroundClip==="content-box";container.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;"+"padding:0;margin-top:1px;position:absolute";container.appendChild(div); // Executing both pixelPosition & boxSizingReliable tests require only one layout
// so they're executed at the same time to save the second computation.
function computeStyleTests(){div.style.cssText= // Support: Firefox<29, Android 2.3
// Vendor-prefix box-sizing
"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;"+"position:relative;display:block;"+"margin:auto;border:1px;padding:1px;"+"top:1%;width:50%";div.innerHTML="";documentElement.appendChild(container);var divStyle=window.getComputedStyle(div);pixelPositionVal=divStyle.top!=="1%";reliableMarginLeftVal=divStyle.marginLeft==="2px";boxSizingReliableVal=divStyle.width==="4px"; // Support: Android 4.0 - 4.3 only
// Some styles come back with percentage values, even though they shouldn't
div.style.marginRight="50%";pixelMarginRightVal=divStyle.marginRight==="4px";documentElement.removeChild(container);}jQuery.extend(support,{pixelPosition:function pixelPosition(){ // This test is executed only once but we still do memoizing
// since we can use the boxSizingReliable pre-computing.
// No need to check if the test was already performed, though.
computeStyleTests();return pixelPositionVal;},boxSizingReliable:function boxSizingReliable(){if(boxSizingReliableVal==null){computeStyleTests();}return boxSizingReliableVal;},pixelMarginRight:function pixelMarginRight(){ // Support: Android 4.0-4.3
// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
// since that compresses better and they're computed together anyway.
if(boxSizingReliableVal==null){computeStyleTests();}return pixelMarginRightVal;},reliableMarginLeft:function reliableMarginLeft(){ // Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
if(boxSizingReliableVal==null){computeStyleTests();}return reliableMarginLeftVal;},reliableMarginRight:function reliableMarginRight(){ // Support: Android 2.3
// Check if div with explicit width and no margin-right incorrectly
// gets computed margin-right based on width of container. (#3333)
// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
// This support function is only executed once so no memoizing is needed.
var ret,marginDiv=div.appendChild(document.createElement("div")); // Reset CSS: box-sizing; display; margin; border; padding
marginDiv.style.cssText=div.style.cssText= // Support: Android 2.3
// Vendor-prefix box-sizing
"-webkit-box-sizing:content-box;box-sizing:content-box;"+"display:block;margin:0;border:0;padding:0";marginDiv.style.marginRight=marginDiv.style.width="0";div.style.width="1px";documentElement.appendChild(container);ret=!parseFloat(window.getComputedStyle(marginDiv).marginRight);documentElement.removeChild(container);div.removeChild(marginDiv);return ret;}});})();function curCSS(elem,name,computed){var width,minWidth,maxWidth,ret,style=elem.style;computed=computed||getStyles(elem);ret=computed?computed.getPropertyValue(name)||computed[name]:undefined; // Support: Opera 12.1x only
// Fall back to style even without computed
// computed is undefined for elems on document fragments
if((ret===""||ret===undefined)&&!jQuery.contains(elem.ownerDocument,elem)){ret=jQuery.style(elem,name);} // Support: IE9
// getPropertyValue is only needed for .css('filter') (#12537)
if(computed){ // A tribute to the "awesome hack by Dean Edwards"
// Android Browser returns percentage for some values,
// but width seems to be reliably pixels.
// This is against the CSSOM draft spec:
// http://dev.w3.org/csswg/cssom/#resolved-values
if(!support.pixelMarginRight()&&rnumnonpx.test(ret)&&rmargin.test(name)){ // Remember the original values
width=style.width;minWidth=style.minWidth;maxWidth=style.maxWidth; // Put in the new values to get a computed value out
style.minWidth=style.maxWidth=style.width=ret;ret=computed.width; // Revert the changed values
style.width=width;style.minWidth=minWidth;style.maxWidth=maxWidth;}}return ret!==undefined? // Support: IE9-11+
// IE returns zIndex value as an integer.
ret+"":ret;}function addGetHookIf(conditionFn,hookFn){ // Define the hook, we'll check on the first run if it's really needed.
return {get:function get(){if(conditionFn()){ // Hook not needed (or it's not possible to use it due
// to missing dependency), remove it.
delete this.get;return;} // Hook needed; redefine it so that the support test is not executed again.
return (this.get=hookFn).apply(this,arguments);}};}var  // Swappable if display is none or starts with table
// except "table", "table-cell", or "table-caption"
// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
rdisplayswap=/^(none|table(?!-c[ea]).+)/,cssShow={position:"absolute",visibility:"hidden",display:"block"},cssNormalTransform={letterSpacing:"0",fontWeight:"400"},cssPrefixes=["Webkit","O","Moz","ms"],emptyStyle=document.createElement("div").style; // Return a css property mapped to a potentially vendor prefixed property
function vendorPropName(name){ // Shortcut for names that are not vendor prefixed
if(name in emptyStyle){return name;} // Check for vendor prefixed names
var capName=name[0].toUpperCase()+name.slice(1),i=cssPrefixes.length;while(i--){name=cssPrefixes[i]+capName;if(name in emptyStyle){return name;}}}function setPositiveNumber(elem,value,subtract){ // Any relative (+/-) values have already been
// normalized at this point
var matches=rcssNum.exec(value);return matches? // Guard against undefined "subtract", e.g., when used as in cssHooks
Math.max(0,matches[2]-(subtract||0))+(matches[3]||"px"):value;}function augmentWidthOrHeight(elem,name,extra,isBorderBox,styles){var i=extra===(isBorderBox?"border":"content")? // If we already have the right measurement, avoid augmentation
4: // Otherwise initialize for horizontal or vertical properties
name==="width"?1:0,val=0;for(;i<4;i+=2){ // Both box models exclude margin, so add it if we want it
if(extra==="margin"){val+=jQuery.css(elem,extra+cssExpand[i],true,styles);}if(isBorderBox){ // border-box includes padding, so remove it if we want content
if(extra==="content"){val-=jQuery.css(elem,"padding"+cssExpand[i],true,styles);} // At this point, extra isn't border nor margin, so remove border
if(extra!=="margin"){val-=jQuery.css(elem,"border"+cssExpand[i]+"Width",true,styles);}}else { // At this point, extra isn't content, so add padding
val+=jQuery.css(elem,"padding"+cssExpand[i],true,styles); // At this point, extra isn't content nor padding, so add border
if(extra!=="padding"){val+=jQuery.css(elem,"border"+cssExpand[i]+"Width",true,styles);}}}return val;}function getWidthOrHeight(elem,name,extra){ // Start with offset property, which is equivalent to the border-box value
var valueIsBorderBox=true,val=name==="width"?elem.offsetWidth:elem.offsetHeight,styles=getStyles(elem),isBorderBox=jQuery.css(elem,"boxSizing",false,styles)==="border-box"; // Support: IE11 only
// In IE 11 fullscreen elements inside of an iframe have
// 100x too small dimensions (gh-1764).
if(document.msFullscreenElement&&window.top!==window){ // Support: IE11 only
// Running getBoundingClientRect on a disconnected node
// in IE throws an error.
if(elem.getClientRects().length){val=Math.round(elem.getBoundingClientRect()[name]*100);}} // Some non-html elements return undefined for offsetWidth, so check for null/undefined
// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
if(val<=0||val==null){ // Fall back to computed then uncomputed css if necessary
val=curCSS(elem,name,styles);if(val<0||val==null){val=elem.style[name];} // Computed unit is not pixels. Stop here and return.
if(rnumnonpx.test(val)){return val;} // Check for style in case a browser which returns unreliable values
// for getComputedStyle silently falls back to the reliable elem.style
valueIsBorderBox=isBorderBox&&(support.boxSizingReliable()||val===elem.style[name]); // Normalize "", auto, and prepare for extra
val=parseFloat(val)||0;} // Use the active box-sizing model to add/subtract irrelevant styles
return val+augmentWidthOrHeight(elem,name,extra||(isBorderBox?"border":"content"),valueIsBorderBox,styles)+"px";}function showHide(elements,show){var display,elem,hidden,values=[],index=0,length=elements.length;for(;index<length;index++){elem=elements[index];if(!elem.style){continue;}values[index]=dataPriv.get(elem,"olddisplay");display=elem.style.display;if(show){ // Reset the inline display of this element to learn if it is
// being hidden by cascaded rules or not
if(!values[index]&&display==="none"){elem.style.display="";} // Set elements which have been overridden with display: none
// in a stylesheet to whatever the default browser style is
// for such an element
if(elem.style.display===""&&isHidden(elem)){values[index]=dataPriv.access(elem,"olddisplay",defaultDisplay(elem.nodeName));}}else {hidden=isHidden(elem);if(display!=="none"||!hidden){dataPriv.set(elem,"olddisplay",hidden?display:jQuery.css(elem,"display"));}}} // Set the display of most of the elements in a second loop
// to avoid the constant reflow
for(index=0;index<length;index++){elem=elements[index];if(!elem.style){continue;}if(!show||elem.style.display==="none"||elem.style.display===""){elem.style.display=show?values[index]||"":"none";}}return elements;}jQuery.extend({ // Add in style property hooks for overriding the default
// behavior of getting and setting a style property
cssHooks:{opacity:{get:function get(elem,computed){if(computed){ // We should always get a number back from opacity
var ret=curCSS(elem,"opacity");return ret===""?"1":ret;}}}}, // Don't automatically add "px" to these possibly-unitless properties
cssNumber:{"animationIterationCount":true,"columnCount":true,"fillOpacity":true,"flexGrow":true,"flexShrink":true,"fontWeight":true,"lineHeight":true,"opacity":true,"order":true,"orphans":true,"widows":true,"zIndex":true,"zoom":true}, // Add in properties whose names you wish to fix before
// setting or getting the value
cssProps:{"float":"cssFloat"}, // Get and set the style property on a DOM Node
style:function style(elem,name,value,extra){ // Don't set styles on text and comment nodes
if(!elem||elem.nodeType===3||elem.nodeType===8||!elem.style){return;} // Make sure that we're working with the right name
var ret,type,hooks,origName=jQuery.camelCase(name),style=elem.style;name=jQuery.cssProps[origName]||(jQuery.cssProps[origName]=vendorPropName(origName)||origName); // Gets hook for the prefixed version, then unprefixed version
hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName]; // Check if we're setting a value
if(value!==undefined){type=typeof value==="undefined"?"undefined":_typeof(value); // Convert "+=" or "-=" to relative numbers (#7345)
if(type==="string"&&(ret=rcssNum.exec(value))&&ret[1]){value=adjustCSS(elem,name,ret); // Fixes bug #9237
type="number";} // Make sure that null and NaN values aren't set (#7116)
if(value==null||value!==value){return;} // If a number was passed in, add the unit (except for certain CSS properties)
if(type==="number"){value+=ret&&ret[3]||(jQuery.cssNumber[origName]?"":"px");} // Support: IE9-11+
// background-* props affect original clone's values
if(!support.clearCloneStyle&&value===""&&name.indexOf("background")===0){style[name]="inherit";} // If a hook was provided, use that value, otherwise just set the specified value
if(!hooks||!("set" in hooks)||(value=hooks.set(elem,value,extra))!==undefined){style[name]=value;}}else { // If a hook was provided get the non-computed value from there
if(hooks&&"get" in hooks&&(ret=hooks.get(elem,false,extra))!==undefined){return ret;} // Otherwise just get the value from the style object
return style[name];}},css:function css(elem,name,extra,styles){var val,num,hooks,origName=jQuery.camelCase(name); // Make sure that we're working with the right name
name=jQuery.cssProps[origName]||(jQuery.cssProps[origName]=vendorPropName(origName)||origName); // Try prefixed name followed by the unprefixed name
hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName]; // If a hook was provided get the computed value from there
if(hooks&&"get" in hooks){val=hooks.get(elem,true,extra);} // Otherwise, if a way to get the computed value exists, use that
if(val===undefined){val=curCSS(elem,name,styles);} // Convert "normal" to computed value
if(val==="normal"&&name in cssNormalTransform){val=cssNormalTransform[name];} // Make numeric if forced or a qualifier was provided and val looks numeric
if(extra===""||extra){num=parseFloat(val);return extra===true||isFinite(num)?num||0:val;}return val;}});jQuery.each(["height","width"],function(i,name){jQuery.cssHooks[name]={get:function get(elem,computed,extra){if(computed){ // Certain elements can have dimension info if we invisibly show them
// but it must have a current display style that would benefit
return rdisplayswap.test(jQuery.css(elem,"display"))&&elem.offsetWidth===0?swap(elem,cssShow,function(){return getWidthOrHeight(elem,name,extra);}):getWidthOrHeight(elem,name,extra);}},set:function set(elem,value,extra){var matches,styles=extra&&getStyles(elem),subtract=extra&&augmentWidthOrHeight(elem,name,extra,jQuery.css(elem,"boxSizing",false,styles)==="border-box",styles); // Convert to pixels if value adjustment is needed
if(subtract&&(matches=rcssNum.exec(value))&&(matches[3]||"px")!=="px"){elem.style[name]=value;value=jQuery.css(elem,name);}return setPositiveNumber(elem,value,subtract);}};});jQuery.cssHooks.marginLeft=addGetHookIf(support.reliableMarginLeft,function(elem,computed){if(computed){return (parseFloat(curCSS(elem,"marginLeft"))||elem.getBoundingClientRect().left-swap(elem,{marginLeft:0},function(){return elem.getBoundingClientRect().left;}))+"px";}}); // Support: Android 2.3
jQuery.cssHooks.marginRight=addGetHookIf(support.reliableMarginRight,function(elem,computed){if(computed){return swap(elem,{"display":"inline-block"},curCSS,[elem,"marginRight"]);}}); // These hooks are used by animate to expand properties
jQuery.each({margin:"",padding:"",border:"Width"},function(prefix,suffix){jQuery.cssHooks[prefix+suffix]={expand:function expand(value){var i=0,expanded={}, // Assumes a single number if not a string
parts=typeof value==="string"?value.split(" "):[value];for(;i<4;i++){expanded[prefix+cssExpand[i]+suffix]=parts[i]||parts[i-2]||parts[0];}return expanded;}};if(!rmargin.test(prefix)){jQuery.cssHooks[prefix+suffix].set=setPositiveNumber;}});jQuery.fn.extend({css:function css(name,value){return access(this,function(elem,name,value){var styles,len,map={},i=0;if(jQuery.isArray(name)){styles=getStyles(elem);len=name.length;for(;i<len;i++){map[name[i]]=jQuery.css(elem,name[i],false,styles);}return map;}return value!==undefined?jQuery.style(elem,name,value):jQuery.css(elem,name);},name,value,arguments.length>1);},show:function show(){return showHide(this,true);},hide:function hide(){return showHide(this);},toggle:function toggle(state){if(typeof state==="boolean"){return state?this.show():this.hide();}return this.each(function(){if(isHidden(this)){jQuery(this).show();}else {jQuery(this).hide();}});}});function Tween(elem,options,prop,end,easing){return new Tween.prototype.init(elem,options,prop,end,easing);}jQuery.Tween=Tween;Tween.prototype={constructor:Tween,init:function init(elem,options,prop,end,easing,unit){this.elem=elem;this.prop=prop;this.easing=easing||jQuery.easing._default;this.options=options;this.start=this.now=this.cur();this.end=end;this.unit=unit||(jQuery.cssNumber[prop]?"":"px");},cur:function cur(){var hooks=Tween.propHooks[this.prop];return hooks&&hooks.get?hooks.get(this):Tween.propHooks._default.get(this);},run:function run(percent){var eased,hooks=Tween.propHooks[this.prop];if(this.options.duration){this.pos=eased=jQuery.easing[this.easing](percent,this.options.duration*percent,0,1,this.options.duration);}else {this.pos=eased=percent;}this.now=(this.end-this.start)*eased+this.start;if(this.options.step){this.options.step.call(this.elem,this.now,this);}if(hooks&&hooks.set){hooks.set(this);}else {Tween.propHooks._default.set(this);}return this;}};Tween.prototype.init.prototype=Tween.prototype;Tween.propHooks={_default:{get:function get(tween){var result; // Use a property on the element directly when it is not a DOM element,
// or when there is no matching style property that exists.
if(tween.elem.nodeType!==1||tween.elem[tween.prop]!=null&&tween.elem.style[tween.prop]==null){return tween.elem[tween.prop];} // Passing an empty string as a 3rd parameter to .css will automatically
// attempt a parseFloat and fallback to a string if the parse fails.
// Simple values such as "10px" are parsed to Float;
// complex values such as "rotate(1rad)" are returned as-is.
result=jQuery.css(tween.elem,tween.prop,""); // Empty strings, null, undefined and "auto" are converted to 0.
return !result||result==="auto"?0:result;},set:function set(tween){ // Use step hook for back compat.
// Use cssHook if its there.
// Use .style if available and use plain properties where available.
if(jQuery.fx.step[tween.prop]){jQuery.fx.step[tween.prop](tween);}else if(tween.elem.nodeType===1&&(tween.elem.style[jQuery.cssProps[tween.prop]]!=null||jQuery.cssHooks[tween.prop])){jQuery.style(tween.elem,tween.prop,tween.now+tween.unit);}else {tween.elem[tween.prop]=tween.now;}}}}; // Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop=Tween.propHooks.scrollLeft={set:function set(tween){if(tween.elem.nodeType&&tween.elem.parentNode){tween.elem[tween.prop]=tween.now;}}};jQuery.easing={linear:function linear(p){return p;},swing:function swing(p){return 0.5-Math.cos(p*Math.PI)/2;},_default:"swing"};jQuery.fx=Tween.prototype.init; // Back Compat <1.8 extension point
jQuery.fx.step={};var fxNow,timerId,rfxtypes=/^(?:toggle|show|hide)$/,rrun=/queueHooks$/; // Animations created synchronously will run synchronously
function createFxNow(){window.setTimeout(function(){fxNow=undefined;});return fxNow=jQuery.now();} // Generate parameters to create a standard animation
function genFx(type,includeWidth){var which,i=0,attrs={height:type}; // If we include width, step value is 1 to do all cssExpand values,
// otherwise step value is 2 to skip over Left and Right
includeWidth=includeWidth?1:0;for(;i<4;i+=2-includeWidth){which=cssExpand[i];attrs["margin"+which]=attrs["padding"+which]=type;}if(includeWidth){attrs.opacity=attrs.width=type;}return attrs;}function createTween(value,prop,animation){var tween,collection=(Animation.tweeners[prop]||[]).concat(Animation.tweeners["*"]),index=0,length=collection.length;for(;index<length;index++){if(tween=collection[index].call(animation,prop,value)){ // We're done with this property
return tween;}}}function defaultPrefilter(elem,props,opts){ /* jshint validthis: true */var prop,value,toggle,tween,hooks,oldfire,display,checkDisplay,anim=this,orig={},style=elem.style,hidden=elem.nodeType&&isHidden(elem),dataShow=dataPriv.get(elem,"fxshow"); // Handle queue: false promises
if(!opts.queue){hooks=jQuery._queueHooks(elem,"fx");if(hooks.unqueued==null){hooks.unqueued=0;oldfire=hooks.empty.fire;hooks.empty.fire=function(){if(!hooks.unqueued){oldfire();}};}hooks.unqueued++;anim.always(function(){ // Ensure the complete handler is called before this completes
anim.always(function(){hooks.unqueued--;if(!jQuery.queue(elem,"fx").length){hooks.empty.fire();}});});} // Height/width overflow pass
if(elem.nodeType===1&&("height" in props||"width" in props)){ // Make sure that nothing sneaks out
// Record all 3 overflow attributes because IE9-10 do not
// change the overflow attribute when overflowX and
// overflowY are set to the same value
opts.overflow=[style.overflow,style.overflowX,style.overflowY]; // Set display property to inline-block for height/width
// animations on inline elements that are having width/height animated
display=jQuery.css(elem,"display"); // Test default display if display is currently "none"
checkDisplay=display==="none"?dataPriv.get(elem,"olddisplay")||defaultDisplay(elem.nodeName):display;if(checkDisplay==="inline"&&jQuery.css(elem,"float")==="none"){style.display="inline-block";}}if(opts.overflow){style.overflow="hidden";anim.always(function(){style.overflow=opts.overflow[0];style.overflowX=opts.overflow[1];style.overflowY=opts.overflow[2];});} // show/hide pass
for(prop in props){value=props[prop];if(rfxtypes.exec(value)){delete props[prop];toggle=toggle||value==="toggle";if(value===(hidden?"hide":"show")){ // If there is dataShow left over from a stopped hide or show
// and we are going to proceed with show, we should pretend to be hidden
if(value==="show"&&dataShow&&dataShow[prop]!==undefined){hidden=true;}else {continue;}}orig[prop]=dataShow&&dataShow[prop]||jQuery.style(elem,prop); // Any non-fx value stops us from restoring the original display value
}else {display=undefined;}}if(!jQuery.isEmptyObject(orig)){if(dataShow){if("hidden" in dataShow){hidden=dataShow.hidden;}}else {dataShow=dataPriv.access(elem,"fxshow",{});} // Store state if its toggle - enables .stop().toggle() to "reverse"
if(toggle){dataShow.hidden=!hidden;}if(hidden){jQuery(elem).show();}else {anim.done(function(){jQuery(elem).hide();});}anim.done(function(){var prop;dataPriv.remove(elem,"fxshow");for(prop in orig){jQuery.style(elem,prop,orig[prop]);}});for(prop in orig){tween=createTween(hidden?dataShow[prop]:0,prop,anim);if(!(prop in dataShow)){dataShow[prop]=tween.start;if(hidden){tween.end=tween.start;tween.start=prop==="width"||prop==="height"?1:0;}}} // If this is a noop like .hide().hide(), restore an overwritten display value
}else if((display==="none"?defaultDisplay(elem.nodeName):display)==="inline"){style.display=display;}}function propFilter(props,specialEasing){var index,name,easing,value,hooks; // camelCase, specialEasing and expand cssHook pass
for(index in props){name=jQuery.camelCase(index);easing=specialEasing[name];value=props[index];if(jQuery.isArray(value)){easing=value[1];value=props[index]=value[0];}if(index!==name){props[name]=value;delete props[index];}hooks=jQuery.cssHooks[name];if(hooks&&"expand" in hooks){value=hooks.expand(value);delete props[name]; // Not quite $.extend, this won't overwrite existing keys.
// Reusing 'index' because we have the correct "name"
for(index in value){if(!(index in props)){props[index]=value[index];specialEasing[index]=easing;}}}else {specialEasing[name]=easing;}}}function Animation(elem,properties,options){var result,stopped,index=0,length=Animation.prefilters.length,deferred=jQuery.Deferred().always(function(){ // Don't match elem in the :animated selector
delete tick.elem;}),tick=function tick(){if(stopped){return false;}var currentTime=fxNow||createFxNow(),remaining=Math.max(0,animation.startTime+animation.duration-currentTime), // Support: Android 2.3
// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
temp=remaining/animation.duration||0,percent=1-temp,index=0,length=animation.tweens.length;for(;index<length;index++){animation.tweens[index].run(percent);}deferred.notifyWith(elem,[animation,percent,remaining]);if(percent<1&&length){return remaining;}else {deferred.resolveWith(elem,[animation]);return false;}},animation=deferred.promise({elem:elem,props:jQuery.extend({},properties),opts:jQuery.extend(true,{specialEasing:{},easing:jQuery.easing._default},options),originalProperties:properties,originalOptions:options,startTime:fxNow||createFxNow(),duration:options.duration,tweens:[],createTween:function createTween(prop,end){var tween=jQuery.Tween(elem,animation.opts,prop,end,animation.opts.specialEasing[prop]||animation.opts.easing);animation.tweens.push(tween);return tween;},stop:function stop(gotoEnd){var index=0, // If we are going to the end, we want to run all the tweens
// otherwise we skip this part
length=gotoEnd?animation.tweens.length:0;if(stopped){return this;}stopped=true;for(;index<length;index++){animation.tweens[index].run(1);} // Resolve when we played the last frame; otherwise, reject
if(gotoEnd){deferred.notifyWith(elem,[animation,1,0]);deferred.resolveWith(elem,[animation,gotoEnd]);}else {deferred.rejectWith(elem,[animation,gotoEnd]);}return this;}}),props=animation.props;propFilter(props,animation.opts.specialEasing);for(;index<length;index++){result=Animation.prefilters[index].call(animation,elem,props,animation.opts);if(result){if(jQuery.isFunction(result.stop)){jQuery._queueHooks(animation.elem,animation.opts.queue).stop=jQuery.proxy(result.stop,result);}return result;}}jQuery.map(props,createTween,animation);if(jQuery.isFunction(animation.opts.start)){animation.opts.start.call(elem,animation);}jQuery.fx.timer(jQuery.extend(tick,{elem:elem,anim:animation,queue:animation.opts.queue})); // attach callbacks from options
return animation.progress(animation.opts.progress).done(animation.opts.done,animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);}jQuery.Animation=jQuery.extend(Animation,{tweeners:{"*":[function(prop,value){var tween=this.createTween(prop,value);adjustCSS(tween.elem,prop,rcssNum.exec(value),tween);return tween;}]},tweener:function tweener(props,callback){if(jQuery.isFunction(props)){callback=props;props=["*"];}else {props=props.match(rnotwhite);}var prop,index=0,length=props.length;for(;index<length;index++){prop=props[index];Animation.tweeners[prop]=Animation.tweeners[prop]||[];Animation.tweeners[prop].unshift(callback);}},prefilters:[defaultPrefilter],prefilter:function prefilter(callback,prepend){if(prepend){Animation.prefilters.unshift(callback);}else {Animation.prefilters.push(callback);}}});jQuery.speed=function(speed,easing,fn){var opt=speed&&(typeof speed==="undefined"?"undefined":_typeof(speed))==="object"?jQuery.extend({},speed):{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&!jQuery.isFunction(easing)&&easing};opt.duration=jQuery.fx.off?0:typeof opt.duration==="number"?opt.duration:opt.duration in jQuery.fx.speeds?jQuery.fx.speeds[opt.duration]:jQuery.fx.speeds._default; // Normalize opt.queue - true/undefined/null -> "fx"
if(opt.queue==null||opt.queue===true){opt.queue="fx";} // Queueing
opt.old=opt.complete;opt.complete=function(){if(jQuery.isFunction(opt.old)){opt.old.call(this);}if(opt.queue){jQuery.dequeue(this,opt.queue);}};return opt;};jQuery.fn.extend({fadeTo:function fadeTo(speed,to,easing,callback){ // Show any hidden elements after setting opacity to 0
return this.filter(isHidden).css("opacity",0).show() // Animate to the value specified
.end().animate({opacity:to},speed,easing,callback);},animate:function animate(prop,speed,easing,callback){var empty=jQuery.isEmptyObject(prop),optall=jQuery.speed(speed,easing,callback),doAnimation=function doAnimation(){ // Operate on a copy of prop so per-property easing won't be lost
var anim=Animation(this,jQuery.extend({},prop),optall); // Empty animations, or finishing resolves immediately
if(empty||dataPriv.get(this,"finish")){anim.stop(true);}};doAnimation.finish=doAnimation;return empty||optall.queue===false?this.each(doAnimation):this.queue(optall.queue,doAnimation);},stop:function stop(type,clearQueue,gotoEnd){var stopQueue=function stopQueue(hooks){var stop=hooks.stop;delete hooks.stop;stop(gotoEnd);};if(typeof type!=="string"){gotoEnd=clearQueue;clearQueue=type;type=undefined;}if(clearQueue&&type!==false){this.queue(type||"fx",[]);}return this.each(function(){var dequeue=true,index=type!=null&&type+"queueHooks",timers=jQuery.timers,data=dataPriv.get(this);if(index){if(data[index]&&data[index].stop){stopQueue(data[index]);}}else {for(index in data){if(data[index]&&data[index].stop&&rrun.test(index)){stopQueue(data[index]);}}}for(index=timers.length;index--;){if(timers[index].elem===this&&(type==null||timers[index].queue===type)){timers[index].anim.stop(gotoEnd);dequeue=false;timers.splice(index,1);}} // Start the next in the queue if the last step wasn't forced.
// Timers currently will call their complete callbacks, which
// will dequeue but only if they were gotoEnd.
if(dequeue||!gotoEnd){jQuery.dequeue(this,type);}});},finish:function finish(type){if(type!==false){type=type||"fx";}return this.each(function(){var index,data=dataPriv.get(this),queue=data[type+"queue"],hooks=data[type+"queueHooks"],timers=jQuery.timers,length=queue?queue.length:0; // Enable finishing flag on private data
data.finish=true; // Empty the queue first
jQuery.queue(this,type,[]);if(hooks&&hooks.stop){hooks.stop.call(this,true);} // Look for any active animations, and finish them
for(index=timers.length;index--;){if(timers[index].elem===this&&timers[index].queue===type){timers[index].anim.stop(true);timers.splice(index,1);}} // Look for any animations in the old queue and finish them
for(index=0;index<length;index++){if(queue[index]&&queue[index].finish){queue[index].finish.call(this);}} // Turn off finishing flag
delete data.finish;});}});jQuery.each(["toggle","show","hide"],function(i,name){var cssFn=jQuery.fn[name];jQuery.fn[name]=function(speed,easing,callback){return speed==null||typeof speed==="boolean"?cssFn.apply(this,arguments):this.animate(genFx(name,true),speed,easing,callback);};}); // Generate shortcuts for custom animations
jQuery.each({slideDown:genFx("show"),slideUp:genFx("hide"),slideToggle:genFx("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(name,props){jQuery.fn[name]=function(speed,easing,callback){return this.animate(props,speed,easing,callback);};});jQuery.timers=[];jQuery.fx.tick=function(){var timer,i=0,timers=jQuery.timers;fxNow=jQuery.now();for(;i<timers.length;i++){timer=timers[i]; // Checks the timer has not already been removed
if(!timer()&&timers[i]===timer){timers.splice(i--,1);}}if(!timers.length){jQuery.fx.stop();}fxNow=undefined;};jQuery.fx.timer=function(timer){jQuery.timers.push(timer);if(timer()){jQuery.fx.start();}else {jQuery.timers.pop();}};jQuery.fx.interval=13;jQuery.fx.start=function(){if(!timerId){timerId=window.setInterval(jQuery.fx.tick,jQuery.fx.interval);}};jQuery.fx.stop=function(){window.clearInterval(timerId);timerId=null;};jQuery.fx.speeds={slow:600,fast:200, // Default speed
_default:400}; // Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay=function(time,type){time=jQuery.fx?jQuery.fx.speeds[time]||time:time;type=type||"fx";return this.queue(type,function(next,hooks){var timeout=window.setTimeout(next,time);hooks.stop=function(){window.clearTimeout(timeout);};});};(function(){var input=document.createElement("input"),select=document.createElement("select"),opt=select.appendChild(document.createElement("option"));input.type="checkbox"; // Support: iOS<=5.1, Android<=4.2+
// Default value for a checkbox should be "on"
support.checkOn=input.value!==""; // Support: IE<=11+
// Must access selectedIndex to make default options select
support.optSelected=opt.selected; // Support: Android<=2.3
// Options inside disabled selects are incorrectly marked as disabled
select.disabled=true;support.optDisabled=!opt.disabled; // Support: IE<=11+
// An input loses its value after becoming a radio
input=document.createElement("input");input.value="t";input.type="radio";support.radioValue=input.value==="t";})();var boolHook,attrHandle=jQuery.expr.attrHandle;jQuery.fn.extend({attr:function attr(name,value){return access(this,jQuery.attr,name,value,arguments.length>1);},removeAttr:function removeAttr(name){return this.each(function(){jQuery.removeAttr(this,name);});}});jQuery.extend({attr:function attr(elem,name,value){var ret,hooks,nType=elem.nodeType; // Don't get/set attributes on text, comment and attribute nodes
if(nType===3||nType===8||nType===2){return;} // Fallback to prop when attributes are not supported
if(typeof elem.getAttribute==="undefined"){return jQuery.prop(elem,name,value);} // All attributes are lowercase
// Grab necessary hook if one is defined
if(nType!==1||!jQuery.isXMLDoc(elem)){name=name.toLowerCase();hooks=jQuery.attrHooks[name]||(jQuery.expr.match.bool.test(name)?boolHook:undefined);}if(value!==undefined){if(value===null){jQuery.removeAttr(elem,name);return;}if(hooks&&"set" in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}elem.setAttribute(name,value+"");return value;}if(hooks&&"get" in hooks&&(ret=hooks.get(elem,name))!==null){return ret;}ret=jQuery.find.attr(elem,name); // Non-existent attributes return null, we normalize to undefined
return ret==null?undefined:ret;},attrHooks:{type:{set:function set(elem,value){if(!support.radioValue&&value==="radio"&&jQuery.nodeName(elem,"input")){var val=elem.value;elem.setAttribute("type",value);if(val){elem.value=val;}return value;}}}},removeAttr:function removeAttr(elem,value){var name,propName,i=0,attrNames=value&&value.match(rnotwhite);if(attrNames&&elem.nodeType===1){while(name=attrNames[i++]){propName=jQuery.propFix[name]||name; // Boolean attributes get special treatment (#10870)
if(jQuery.expr.match.bool.test(name)){ // Set corresponding property to false
elem[propName]=false;}elem.removeAttribute(name);}}}}); // Hooks for boolean attributes
boolHook={set:function set(elem,value,name){if(value===false){ // Remove boolean attributes when set to false
jQuery.removeAttr(elem,name);}else {elem.setAttribute(name,name);}return name;}};jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g),function(i,name){var getter=attrHandle[name]||jQuery.find.attr;attrHandle[name]=function(elem,name,isXML){var ret,handle;if(!isXML){ // Avoid an infinite loop by temporarily removing this function from the getter
handle=attrHandle[name];attrHandle[name]=ret;ret=getter(elem,name,isXML)!=null?name.toLowerCase():null;attrHandle[name]=handle;}return ret;};});var rfocusable=/^(?:input|select|textarea|button)$/i,rclickable=/^(?:a|area)$/i;jQuery.fn.extend({prop:function prop(name,value){return access(this,jQuery.prop,name,value,arguments.length>1);},removeProp:function removeProp(name){return this.each(function(){delete this[jQuery.propFix[name]||name];});}});jQuery.extend({prop:function prop(elem,name,value){var ret,hooks,nType=elem.nodeType; // Don't get/set properties on text, comment and attribute nodes
if(nType===3||nType===8||nType===2){return;}if(nType!==1||!jQuery.isXMLDoc(elem)){ // Fix name and attach hooks
name=jQuery.propFix[name]||name;hooks=jQuery.propHooks[name];}if(value!==undefined){if(hooks&&"set" in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}return elem[name]=value;}if(hooks&&"get" in hooks&&(ret=hooks.get(elem,name))!==null){return ret;}return elem[name];},propHooks:{tabIndex:{get:function get(elem){ // elem.tabIndex doesn't always return the
// correct value when it hasn't been explicitly set
// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
// Use proper attribute retrieval(#12072)
var tabindex=jQuery.find.attr(elem,"tabindex");return tabindex?parseInt(tabindex,10):rfocusable.test(elem.nodeName)||rclickable.test(elem.nodeName)&&elem.href?0:-1;}}},propFix:{"for":"htmlFor","class":"className"}}); // Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if(!support.optSelected){jQuery.propHooks.selected={get:function get(elem){var parent=elem.parentNode;if(parent&&parent.parentNode){parent.parentNode.selectedIndex;}return null;},set:function set(elem){var parent=elem.parentNode;if(parent){parent.selectedIndex;if(parent.parentNode){parent.parentNode.selectedIndex;}}}};}jQuery.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){jQuery.propFix[this.toLowerCase()]=this;});var rclass=/[\t\r\n\f]/g;function getClass(elem){return elem.getAttribute&&elem.getAttribute("class")||"";}jQuery.fn.extend({addClass:function addClass(value){var classes,elem,cur,curValue,clazz,j,finalValue,i=0;if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).addClass(value.call(this,j,getClass(this)));});}if(typeof value==="string"&&value){classes=value.match(rnotwhite)||[];while(elem=this[i++]){curValue=getClass(elem);cur=elem.nodeType===1&&(" "+curValue+" ").replace(rclass," ");if(cur){j=0;while(clazz=classes[j++]){if(cur.indexOf(" "+clazz+" ")<0){cur+=clazz+" ";}} // Only assign if different to avoid unneeded rendering.
finalValue=jQuery.trim(cur);if(curValue!==finalValue){elem.setAttribute("class",finalValue);}}}}return this;},removeClass:function removeClass(value){var classes,elem,cur,curValue,clazz,j,finalValue,i=0;if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).removeClass(value.call(this,j,getClass(this)));});}if(!arguments.length){return this.attr("class","");}if(typeof value==="string"&&value){classes=value.match(rnotwhite)||[];while(elem=this[i++]){curValue=getClass(elem); // This expression is here for better compressibility (see addClass)
cur=elem.nodeType===1&&(" "+curValue+" ").replace(rclass," ");if(cur){j=0;while(clazz=classes[j++]){ // Remove *all* instances
while(cur.indexOf(" "+clazz+" ")>-1){cur=cur.replace(" "+clazz+" "," ");}} // Only assign if different to avoid unneeded rendering.
finalValue=jQuery.trim(cur);if(curValue!==finalValue){elem.setAttribute("class",finalValue);}}}}return this;},toggleClass:function toggleClass(value,stateVal){var type=typeof value==="undefined"?"undefined":_typeof(value);if(typeof stateVal==="boolean"&&type==="string"){return stateVal?this.addClass(value):this.removeClass(value);}if(jQuery.isFunction(value)){return this.each(function(i){jQuery(this).toggleClass(value.call(this,i,getClass(this),stateVal),stateVal);});}return this.each(function(){var className,i,self,classNames;if(type==="string"){ // Toggle individual class names
i=0;self=jQuery(this);classNames=value.match(rnotwhite)||[];while(className=classNames[i++]){ // Check each className given, space separated list
if(self.hasClass(className)){self.removeClass(className);}else {self.addClass(className);}} // Toggle whole class name
}else if(value===undefined||type==="boolean"){className=getClass(this);if(className){ // Store className if set
dataPriv.set(this,"__className__",className);} // If the element has a class name or if we're passed `false`,
// then remove the whole classname (if there was one, the above saved it).
// Otherwise bring back whatever was previously saved (if anything),
// falling back to the empty string if nothing was stored.
if(this.setAttribute){this.setAttribute("class",className||value===false?"":dataPriv.get(this,"__className__")||"");}}});},hasClass:function hasClass(selector){var className,elem,i=0;className=" "+selector+" ";while(elem=this[i++]){if(elem.nodeType===1&&(" "+getClass(elem)+" ").replace(rclass," ").indexOf(className)>-1){return true;}}return false;}});var rreturn=/\r/g,rspaces=/[\x20\t\r\n\f]+/g;jQuery.fn.extend({val:function val(value){var hooks,ret,isFunction,elem=this[0];if(!arguments.length){if(elem){hooks=jQuery.valHooks[elem.type]||jQuery.valHooks[elem.nodeName.toLowerCase()];if(hooks&&"get" in hooks&&(ret=hooks.get(elem,"value"))!==undefined){return ret;}ret=elem.value;return typeof ret==="string"? // Handle most common string cases
ret.replace(rreturn,""): // Handle cases where value is null/undef or number
ret==null?"":ret;}return;}isFunction=jQuery.isFunction(value);return this.each(function(i){var val;if(this.nodeType!==1){return;}if(isFunction){val=value.call(this,i,jQuery(this).val());}else {val=value;} // Treat null/undefined as ""; convert numbers to string
if(val==null){val="";}else if(typeof val==="number"){val+="";}else if(jQuery.isArray(val)){val=jQuery.map(val,function(value){return value==null?"":value+"";});}hooks=jQuery.valHooks[this.type]||jQuery.valHooks[this.nodeName.toLowerCase()]; // If set returns undefined, fall back to normal setting
if(!hooks||!("set" in hooks)||hooks.set(this,val,"value")===undefined){this.value=val;}});}});jQuery.extend({valHooks:{option:{get:function get(elem){var val=jQuery.find.attr(elem,"value");return val!=null?val: // Support: IE10-11+
// option.text throws exceptions (#14686, #14858)
// Strip and collapse whitespace
// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
jQuery.trim(jQuery.text(elem)).replace(rspaces," ");}},select:{get:function get(elem){var value,option,options=elem.options,index=elem.selectedIndex,one=elem.type==="select-one"||index<0,values=one?null:[],max=one?index+1:options.length,i=index<0?max:one?index:0; // Loop through all the selected options
for(;i<max;i++){option=options[i]; // IE8-9 doesn't update selected after form reset (#2551)
if((option.selected||i===index)&&( // Don't return options that are disabled or in a disabled optgroup
support.optDisabled?!option.disabled:option.getAttribute("disabled")===null)&&(!option.parentNode.disabled||!jQuery.nodeName(option.parentNode,"optgroup"))){ // Get the specific value for the option
value=jQuery(option).val(); // We don't need an array for one selects
if(one){return value;} // Multi-Selects return an array
values.push(value);}}return values;},set:function set(elem,value){var optionSet,option,options=elem.options,values=jQuery.makeArray(value),i=options.length;while(i--){option=options[i];if(option.selected=jQuery.inArray(jQuery.valHooks.option.get(option),values)>-1){optionSet=true;}} // Force browsers to behave consistently when non-matching value is set
if(!optionSet){elem.selectedIndex=-1;}return values;}}}}); // Radios and checkboxes getter/setter
jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]={set:function set(elem,value){if(jQuery.isArray(value)){return elem.checked=jQuery.inArray(jQuery(elem).val(),value)>-1;}}};if(!support.checkOn){jQuery.valHooks[this].get=function(elem){return elem.getAttribute("value")===null?"on":elem.value;};}}); // Return jQuery for attributes-only inclusion
var rfocusMorph=/^(?:focusinfocus|focusoutblur)$/;jQuery.extend(jQuery.event,{trigger:function trigger(event,data,elem,onlyHandlers){var i,cur,tmp,bubbleType,ontype,handle,special,eventPath=[elem||document],type=hasOwn.call(event,"type")?event.type:event,namespaces=hasOwn.call(event,"namespace")?event.namespace.split("."):[];cur=tmp=elem=elem||document; // Don't do events on text and comment nodes
if(elem.nodeType===3||elem.nodeType===8){return;} // focus/blur morphs to focusin/out; ensure we're not firing them right now
if(rfocusMorph.test(type+jQuery.event.triggered)){return;}if(type.indexOf(".")>-1){ // Namespaced trigger; create a regexp to match event type in handle()
namespaces=type.split(".");type=namespaces.shift();namespaces.sort();}ontype=type.indexOf(":")<0&&"on"+type; // Caller can pass in a jQuery.Event object, Object, or just an event type string
event=event[jQuery.expando]?event:new jQuery.Event(type,(typeof event==="undefined"?"undefined":_typeof(event))==="object"&&event); // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
event.isTrigger=onlyHandlers?2:3;event.namespace=namespaces.join(".");event.rnamespace=event.namespace?new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)"):null; // Clean up the event in case it is being reused
event.result=undefined;if(!event.target){event.target=elem;} // Clone any incoming data and prepend the event, creating the handler arg list
data=data==null?[event]:jQuery.makeArray(data,[event]); // Allow special events to draw outside the lines
special=jQuery.event.special[type]||{};if(!onlyHandlers&&special.trigger&&special.trigger.apply(elem,data)===false){return;} // Determine event propagation path in advance, per W3C events spec (#9951)
// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
if(!onlyHandlers&&!special.noBubble&&!jQuery.isWindow(elem)){bubbleType=special.delegateType||type;if(!rfocusMorph.test(bubbleType+type)){cur=cur.parentNode;}for(;cur;cur=cur.parentNode){eventPath.push(cur);tmp=cur;} // Only add window if we got to document (e.g., not plain obj or detached DOM)
if(tmp===(elem.ownerDocument||document)){eventPath.push(tmp.defaultView||tmp.parentWindow||window);}} // Fire handlers on the event path
i=0;while((cur=eventPath[i++])&&!event.isPropagationStopped()){event.type=i>1?bubbleType:special.bindType||type; // jQuery handler
handle=(dataPriv.get(cur,"events")||{})[event.type]&&dataPriv.get(cur,"handle");if(handle){handle.apply(cur,data);} // Native handler
handle=ontype&&cur[ontype];if(handle&&handle.apply&&acceptData(cur)){event.result=handle.apply(cur,data);if(event.result===false){event.preventDefault();}}}event.type=type; // If nobody prevented the default action, do it now
if(!onlyHandlers&&!event.isDefaultPrevented()){if((!special._default||special._default.apply(eventPath.pop(),data)===false)&&acceptData(elem)){ // Call a native DOM method on the target with the same name name as the event.
// Don't do default actions on window, that's where global variables be (#6170)
if(ontype&&jQuery.isFunction(elem[type])&&!jQuery.isWindow(elem)){ // Don't re-trigger an onFOO event when we call its FOO() method
tmp=elem[ontype];if(tmp){elem[ontype]=null;} // Prevent re-triggering of the same event, since we already bubbled it above
jQuery.event.triggered=type;elem[type]();jQuery.event.triggered=undefined;if(tmp){elem[ontype]=tmp;}}}}return event.result;}, // Piggyback on a donor event to simulate a different one
simulate:function simulate(type,elem,event){var e=jQuery.extend(new jQuery.Event(),event,{type:type,isSimulated:true // Previously, `originalEvent: {}` was set here, so stopPropagation call
// would not be triggered on donor event, since in our own
// jQuery.event.stopPropagation function we had a check for existence of
// originalEvent.stopPropagation method, so, consequently it would be a noop.
//
// But now, this "simulate" function is used only for events
// for which stopPropagation() is noop, so there is no need for that anymore.
//
// For the 1.x branch though, guard for "click" and "submit"
// events is still used, but was moved to jQuery.event.stopPropagation function
// because `originalEvent` should point to the original event for the constancy
// with other events and for more focused logic
});jQuery.event.trigger(e,null,elem);if(e.isDefaultPrevented()){event.preventDefault();}}});jQuery.fn.extend({trigger:function trigger(type,data){return this.each(function(){jQuery.event.trigger(type,data,this);});},triggerHandler:function triggerHandler(type,data){var elem=this[0];if(elem){return jQuery.event.trigger(type,data,elem,true);}}});jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick "+"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "+"change select submit keydown keypress keyup error contextmenu").split(" "),function(i,name){ // Handle event binding
jQuery.fn[name]=function(data,fn){return arguments.length>0?this.on(name,null,data,fn):this.trigger(name);};});jQuery.fn.extend({hover:function hover(fnOver,fnOut){return this.mouseenter(fnOver).mouseleave(fnOut||fnOver);}});support.focusin="onfocusin" in window; // Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if(!support.focusin){jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){ // Attach a single capturing handler on the document while someone wants focusin/focusout
var handler=function handler(event){jQuery.event.simulate(fix,event.target,jQuery.event.fix(event));};jQuery.event.special[fix]={setup:function setup(){var doc=this.ownerDocument||this,attaches=dataPriv.access(doc,fix);if(!attaches){doc.addEventListener(orig,handler,true);}dataPriv.access(doc,fix,(attaches||0)+1);},teardown:function teardown(){var doc=this.ownerDocument||this,attaches=dataPriv.access(doc,fix)-1;if(!attaches){doc.removeEventListener(orig,handler,true);dataPriv.remove(doc,fix);}else {dataPriv.access(doc,fix,attaches);}}};});}var location=window.location;var nonce=jQuery.now();var rquery=/\?/; // Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON=function(data){return JSON.parse(data+"");}; // Cross-browser xml parsing
jQuery.parseXML=function(data){var xml;if(!data||typeof data!=="string"){return null;} // Support: IE9
try{xml=new window.DOMParser().parseFromString(data,"text/xml");}catch(e){xml=undefined;}if(!xml||xml.getElementsByTagName("parsererror").length){jQuery.error("Invalid XML: "+data);}return xml;};var rhash=/#.*$/,rts=/([?&])_=[^&]*/,rheaders=/^(.*?):[ \t]*([^\r\n]*)$/mg, // #7653, #8125, #8152: local protocol detection
rlocalProtocol=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//, /* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */prefilters={}, /* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */transports={}, // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
allTypes="*/".concat("*"), // Anchor tag for parsing the document origin
originAnchor=document.createElement("a");originAnchor.href=location.href; // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports(structure){ // dataTypeExpression is optional and defaults to "*"
return function(dataTypeExpression,func){if(typeof dataTypeExpression!=="string"){func=dataTypeExpression;dataTypeExpression="*";}var dataType,i=0,dataTypes=dataTypeExpression.toLowerCase().match(rnotwhite)||[];if(jQuery.isFunction(func)){ // For each dataType in the dataTypeExpression
while(dataType=dataTypes[i++]){ // Prepend if requested
if(dataType[0]==="+"){dataType=dataType.slice(1)||"*";(structure[dataType]=structure[dataType]||[]).unshift(func); // Otherwise append
}else {(structure[dataType]=structure[dataType]||[]).push(func);}}}};} // Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR){var inspected={},seekingTransport=structure===transports;function inspect(dataType){var selected;inspected[dataType]=true;jQuery.each(structure[dataType]||[],function(_,prefilterOrFactory){var dataTypeOrTransport=prefilterOrFactory(options,originalOptions,jqXHR);if(typeof dataTypeOrTransport==="string"&&!seekingTransport&&!inspected[dataTypeOrTransport]){options.dataTypes.unshift(dataTypeOrTransport);inspect(dataTypeOrTransport);return false;}else if(seekingTransport){return !(selected=dataTypeOrTransport);}});return selected;}return inspect(options.dataTypes[0])||!inspected["*"]&&inspect("*");} // A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend(target,src){var key,deep,flatOptions=jQuery.ajaxSettings.flatOptions||{};for(key in src){if(src[key]!==undefined){(flatOptions[key]?target:deep||(deep={}))[key]=src[key];}}if(deep){jQuery.extend(true,target,deep);}return target;} /* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */function ajaxHandleResponses(s,jqXHR,responses){var ct,type,finalDataType,firstDataType,contents=s.contents,dataTypes=s.dataTypes; // Remove auto dataType and get content-type in the process
while(dataTypes[0]==="*"){dataTypes.shift();if(ct===undefined){ct=s.mimeType||jqXHR.getResponseHeader("Content-Type");}} // Check if we're dealing with a known content-type
if(ct){for(type in contents){if(contents[type]&&contents[type].test(ct)){dataTypes.unshift(type);break;}}} // Check to see if we have a response for the expected dataType
if(dataTypes[0] in responses){finalDataType=dataTypes[0];}else { // Try convertible dataTypes
for(type in responses){if(!dataTypes[0]||s.converters[type+" "+dataTypes[0]]){finalDataType=type;break;}if(!firstDataType){firstDataType=type;}} // Or just use first one
finalDataType=finalDataType||firstDataType;} // If we found a dataType
// We add the dataType to the list if needed
// and return the corresponding response
if(finalDataType){if(finalDataType!==dataTypes[0]){dataTypes.unshift(finalDataType);}return responses[finalDataType];}} /* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */function ajaxConvert(s,response,jqXHR,isSuccess){var conv2,current,conv,tmp,prev,converters={}, // Work with a copy of dataTypes in case we need to modify it for conversion
dataTypes=s.dataTypes.slice(); // Create converters map with lowercased keys
if(dataTypes[1]){for(conv in s.converters){converters[conv.toLowerCase()]=s.converters[conv];}}current=dataTypes.shift(); // Convert to each sequential dataType
while(current){if(s.responseFields[current]){jqXHR[s.responseFields[current]]=response;} // Apply the dataFilter if provided
if(!prev&&isSuccess&&s.dataFilter){response=s.dataFilter(response,s.dataType);}prev=current;current=dataTypes.shift();if(current){ // There's only work to do if current dataType is non-auto
if(current==="*"){current=prev; // Convert response if prev dataType is non-auto and differs from current
}else if(prev!=="*"&&prev!==current){ // Seek a direct converter
conv=converters[prev+" "+current]||converters["* "+current]; // If none found, seek a pair
if(!conv){for(conv2 in converters){ // If conv2 outputs current
tmp=conv2.split(" ");if(tmp[1]===current){ // If prev can be converted to accepted input
conv=converters[prev+" "+tmp[0]]||converters["* "+tmp[0]];if(conv){ // Condense equivalence converters
if(conv===true){conv=converters[conv2]; // Otherwise, insert the intermediate dataType
}else if(converters[conv2]!==true){current=tmp[0];dataTypes.unshift(tmp[1]);}break;}}}} // Apply converter (if not an equivalence)
if(conv!==true){ // Unless errors are allowed to bubble, catch and return them
if(conv&&s.throws){response=conv(response);}else {try{response=conv(response);}catch(e){return {state:"parsererror",error:conv?e:"No conversion from "+prev+" to "+current};}}}}}}return {state:"success",data:response};}jQuery.extend({ // Counter for holding the number of active queries
active:0, // Last-Modified header cache for next request
lastModified:{},etag:{},ajaxSettings:{url:location.href,type:"GET",isLocal:rlocalProtocol.test(location.protocol),global:true,processData:true,async:true,contentType:"application/x-www-form-urlencoded; charset=UTF-8", /*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/accepts:{"*":allTypes,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"}, // Data converters
// Keys separate source (or catchall "*") and destination types with a single space
converters:{ // Convert anything to text
"* text":String, // Text to html (true = no transformation)
"text html":true, // Evaluate text as a json expression
"text json":jQuery.parseJSON, // Parse text as xml
"text xml":jQuery.parseXML}, // For options that shouldn't be deep extended:
// you can add your own custom options here if
// and when you create one that shouldn't be
// deep extended (see ajaxExtend)
flatOptions:{url:true,context:true}}, // Creates a full fledged settings object into target
// with both ajaxSettings and settings fields.
// If target is omitted, writes into ajaxSettings.
ajaxSetup:function ajaxSetup(target,settings){return settings? // Building a settings object
ajaxExtend(ajaxExtend(target,jQuery.ajaxSettings),settings): // Extending ajaxSettings
ajaxExtend(jQuery.ajaxSettings,target);},ajaxPrefilter:addToPrefiltersOrTransports(prefilters),ajaxTransport:addToPrefiltersOrTransports(transports), // Main method
ajax:function ajax(url,options){ // If url is an object, simulate pre-1.5 signature
if((typeof url==="undefined"?"undefined":_typeof(url))==="object"){options=url;url=undefined;} // Force options to be an object
options=options||{};var transport, // URL without anti-cache param
cacheURL, // Response headers
responseHeadersString,responseHeaders, // timeout handle
timeoutTimer, // Url cleanup var
urlAnchor, // To know if global events are to be dispatched
fireGlobals, // Loop variable
i, // Create the final options object
s=jQuery.ajaxSetup({},options), // Callbacks context
callbackContext=s.context||s, // Context for global events is callbackContext if it is a DOM node or jQuery collection
globalEventContext=s.context&&(callbackContext.nodeType||callbackContext.jquery)?jQuery(callbackContext):jQuery.event, // Deferreds
deferred=jQuery.Deferred(),completeDeferred=jQuery.Callbacks("once memory"), // Status-dependent callbacks
_statusCode=s.statusCode||{}, // Headers (they are sent all at once)
requestHeaders={},requestHeadersNames={}, // The jqXHR state
state=0, // Default abort message
strAbort="canceled", // Fake xhr
jqXHR={readyState:0, // Builds headers hashtable if needed
getResponseHeader:function getResponseHeader(key){var match;if(state===2){if(!responseHeaders){responseHeaders={};while(match=rheaders.exec(responseHeadersString)){responseHeaders[match[1].toLowerCase()]=match[2];}}match=responseHeaders[key.toLowerCase()];}return match==null?null:match;}, // Raw string
getAllResponseHeaders:function getAllResponseHeaders(){return state===2?responseHeadersString:null;}, // Caches the header
setRequestHeader:function setRequestHeader(name,value){var lname=name.toLowerCase();if(!state){name=requestHeadersNames[lname]=requestHeadersNames[lname]||name;requestHeaders[name]=value;}return this;}, // Overrides response content-type header
overrideMimeType:function overrideMimeType(type){if(!state){s.mimeType=type;}return this;}, // Status-dependent callbacks
statusCode:function statusCode(map){var code;if(map){if(state<2){for(code in map){ // Lazy-add the new callback in a way that preserves old ones
_statusCode[code]=[_statusCode[code],map[code]];}}else { // Execute the appropriate callbacks
jqXHR.always(map[jqXHR.status]);}}return this;}, // Cancel the request
abort:function abort(statusText){var finalText=statusText||strAbort;if(transport){transport.abort(finalText);}done(0,finalText);return this;}}; // Attach deferreds
deferred.promise(jqXHR).complete=completeDeferred.add;jqXHR.success=jqXHR.done;jqXHR.error=jqXHR.fail; // Remove hash character (#7531: and string promotion)
// Add protocol if not provided (prefilters might expect it)
// Handle falsy url in the settings object (#10093: consistency with old signature)
// We also use the url parameter if available
s.url=((url||s.url||location.href)+"").replace(rhash,"").replace(rprotocol,location.protocol+"//"); // Alias method option to type as per ticket #12004
s.type=options.method||options.type||s.method||s.type; // Extract dataTypes list
s.dataTypes=jQuery.trim(s.dataType||"*").toLowerCase().match(rnotwhite)||[""]; // A cross-domain request is in order when the origin doesn't match the current origin.
if(s.crossDomain==null){urlAnchor=document.createElement("a"); // Support: IE8-11+
// IE throws exception if url is malformed, e.g. http://example.com:80x/
try{urlAnchor.href=s.url; // Support: IE8-11+
// Anchor's host property isn't correctly set when s.url is relative
urlAnchor.href=urlAnchor.href;s.crossDomain=originAnchor.protocol+"//"+originAnchor.host!==urlAnchor.protocol+"//"+urlAnchor.host;}catch(e){ // If there is an error parsing the URL, assume it is crossDomain,
// it can be rejected by the transport if it is invalid
s.crossDomain=true;}} // Convert data if not already a string
if(s.data&&s.processData&&typeof s.data!=="string"){s.data=jQuery.param(s.data,s.traditional);} // Apply prefilters
inspectPrefiltersOrTransports(prefilters,s,options,jqXHR); // If request was aborted inside a prefilter, stop there
if(state===2){return jqXHR;} // We can fire global events as of now if asked to
// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
fireGlobals=jQuery.event&&s.global; // Watch for a new set of requests
if(fireGlobals&&jQuery.active++===0){jQuery.event.trigger("ajaxStart");} // Uppercase the type
s.type=s.type.toUpperCase(); // Determine if request has content
s.hasContent=!rnoContent.test(s.type); // Save the URL in case we're toying with the If-Modified-Since
// and/or If-None-Match header later on
cacheURL=s.url; // More options handling for requests with no content
if(!s.hasContent){ // If data is available, append data to url
if(s.data){cacheURL=s.url+=(rquery.test(cacheURL)?"&":"?")+s.data; // #9682: remove data so that it's not used in an eventual retry
delete s.data;} // Add anti-cache in url if needed
if(s.cache===false){s.url=rts.test(cacheURL)? // If there is already a '_' parameter, set its value
cacheURL.replace(rts,"$1_="+nonce++): // Otherwise add one to the end
cacheURL+(rquery.test(cacheURL)?"&":"?")+"_="+nonce++;}} // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
if(s.ifModified){if(jQuery.lastModified[cacheURL]){jqXHR.setRequestHeader("If-Modified-Since",jQuery.lastModified[cacheURL]);}if(jQuery.etag[cacheURL]){jqXHR.setRequestHeader("If-None-Match",jQuery.etag[cacheURL]);}} // Set the correct header, if data is being sent
if(s.data&&s.hasContent&&s.contentType!==false||options.contentType){jqXHR.setRequestHeader("Content-Type",s.contentType);} // Set the Accepts header for the server, depending on the dataType
jqXHR.setRequestHeader("Accept",s.dataTypes[0]&&s.accepts[s.dataTypes[0]]?s.accepts[s.dataTypes[0]]+(s.dataTypes[0]!=="*"?", "+allTypes+"; q=0.01":""):s.accepts["*"]); // Check for headers option
for(i in s.headers){jqXHR.setRequestHeader(i,s.headers[i]);} // Allow custom headers/mimetypes and early abort
if(s.beforeSend&&(s.beforeSend.call(callbackContext,jqXHR,s)===false||state===2)){ // Abort if not done already and return
return jqXHR.abort();} // Aborting is no longer a cancellation
strAbort="abort"; // Install callbacks on deferreds
for(i in {success:1,error:1,complete:1}){jqXHR[i](s[i]);} // Get transport
transport=inspectPrefiltersOrTransports(transports,s,options,jqXHR); // If no transport, we auto-abort
if(!transport){done(-1,"No Transport");}else {jqXHR.readyState=1; // Send global event
if(fireGlobals){globalEventContext.trigger("ajaxSend",[jqXHR,s]);} // If request was aborted inside ajaxSend, stop there
if(state===2){return jqXHR;} // Timeout
if(s.async&&s.timeout>0){timeoutTimer=window.setTimeout(function(){jqXHR.abort("timeout");},s.timeout);}try{state=1;transport.send(requestHeaders,done);}catch(e){ // Propagate exception as error if not done
if(state<2){done(-1,e); // Simply rethrow otherwise
}else {throw e;}}} // Callback for when everything is done
function done(status,nativeStatusText,responses,headers){var isSuccess,success,error,response,modified,statusText=nativeStatusText; // Called once
if(state===2){return;} // State is "done" now
state=2; // Clear timeout if it exists
if(timeoutTimer){window.clearTimeout(timeoutTimer);} // Dereference transport for early garbage collection
// (no matter how long the jqXHR object will be used)
transport=undefined; // Cache response headers
responseHeadersString=headers||""; // Set readyState
jqXHR.readyState=status>0?4:0; // Determine if successful
isSuccess=status>=200&&status<300||status===304; // Get response data
if(responses){response=ajaxHandleResponses(s,jqXHR,responses);} // Convert no matter what (that way responseXXX fields are always set)
response=ajaxConvert(s,response,jqXHR,isSuccess); // If successful, handle type chaining
if(isSuccess){ // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
if(s.ifModified){modified=jqXHR.getResponseHeader("Last-Modified");if(modified){jQuery.lastModified[cacheURL]=modified;}modified=jqXHR.getResponseHeader("etag");if(modified){jQuery.etag[cacheURL]=modified;}} // if no content
if(status===204||s.type==="HEAD"){statusText="nocontent"; // if not modified
}else if(status===304){statusText="notmodified"; // If we have data, let's convert it
}else {statusText=response.state;success=response.data;error=response.error;isSuccess=!error;}}else { // Extract error from statusText and normalize for non-aborts
error=statusText;if(status||!statusText){statusText="error";if(status<0){status=0;}}} // Set data for the fake xhr object
jqXHR.status=status;jqXHR.statusText=(nativeStatusText||statusText)+""; // Success/Error
if(isSuccess){deferred.resolveWith(callbackContext,[success,statusText,jqXHR]);}else {deferred.rejectWith(callbackContext,[jqXHR,statusText,error]);} // Status-dependent callbacks
jqXHR.statusCode(_statusCode);_statusCode=undefined;if(fireGlobals){globalEventContext.trigger(isSuccess?"ajaxSuccess":"ajaxError",[jqXHR,s,isSuccess?success:error]);} // Complete
completeDeferred.fireWith(callbackContext,[jqXHR,statusText]);if(fireGlobals){globalEventContext.trigger("ajaxComplete",[jqXHR,s]); // Handle the global AJAX counter
if(! --jQuery.active){jQuery.event.trigger("ajaxStop");}}}return jqXHR;},getJSON:function getJSON(url,data,callback){return jQuery.get(url,data,callback,"json");},getScript:function getScript(url,callback){return jQuery.get(url,undefined,callback,"script");}});jQuery.each(["get","post"],function(i,method){jQuery[method]=function(url,data,callback,type){ // Shift arguments if data argument was omitted
if(jQuery.isFunction(data)){type=type||callback;callback=data;data=undefined;} // The url can be an options object (which then must have .url)
return jQuery.ajax(jQuery.extend({url:url,type:method,dataType:type,data:data,success:callback},jQuery.isPlainObject(url)&&url));};});jQuery._evalUrl=function(url){return jQuery.ajax({url:url, // Make this explicit, since user can override this through ajaxSetup (#11264)
type:"GET",dataType:"script",async:false,global:false,"throws":true});};jQuery.fn.extend({wrapAll:function wrapAll(html){var wrap;if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapAll(html.call(this,i));});}if(this[0]){ // The elements to wrap the target around
wrap=jQuery(html,this[0].ownerDocument).eq(0).clone(true);if(this[0].parentNode){wrap.insertBefore(this[0]);}wrap.map(function(){var elem=this;while(elem.firstElementChild){elem=elem.firstElementChild;}return elem;}).append(this);}return this;},wrapInner:function wrapInner(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapInner(html.call(this,i));});}return this.each(function(){var self=jQuery(this),contents=self.contents();if(contents.length){contents.wrapAll(html);}else {self.append(html);}});},wrap:function wrap(html){var isFunction=jQuery.isFunction(html);return this.each(function(i){jQuery(this).wrapAll(isFunction?html.call(this,i):html);});},unwrap:function unwrap(){return this.parent().each(function(){if(!jQuery.nodeName(this,"body")){jQuery(this).replaceWith(this.childNodes);}}).end();}});jQuery.expr.filters.hidden=function(elem){return !jQuery.expr.filters.visible(elem);};jQuery.expr.filters.visible=function(elem){ // Support: Opera <= 12.12
// Opera reports offsetWidths and offsetHeights less than zero on some elements
// Use OR instead of AND as the element is not visible if either is true
// See tickets #10406 and #13132
return elem.offsetWidth>0||elem.offsetHeight>0||elem.getClientRects().length>0;};var r20=/%20/g,rbracket=/\[\]$/,rCRLF=/\r?\n/g,rsubmitterTypes=/^(?:submit|button|image|reset|file)$/i,rsubmittable=/^(?:input|select|textarea|keygen)/i;function buildParams(prefix,obj,traditional,add){var name;if(jQuery.isArray(obj)){ // Serialize array item.
jQuery.each(obj,function(i,v){if(traditional||rbracket.test(prefix)){ // Treat each array item as a scalar.
add(prefix,v);}else { // Item is non-scalar (array or object), encode its numeric index.
buildParams(prefix+"["+((typeof v==="undefined"?"undefined":_typeof(v))==="object"&&v!=null?i:"")+"]",v,traditional,add);}});}else if(!traditional&&jQuery.type(obj)==="object"){ // Serialize object item.
for(name in obj){buildParams(prefix+"["+name+"]",obj[name],traditional,add);}}else { // Serialize scalar item.
add(prefix,obj);}} // Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param=function(a,traditional){var prefix,s=[],add=function add(key,value){ // If value is a function, invoke it and return its value
value=jQuery.isFunction(value)?value():value==null?"":value;s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(value);}; // Set traditional to true for jQuery <= 1.3.2 behavior.
if(traditional===undefined){traditional=jQuery.ajaxSettings&&jQuery.ajaxSettings.traditional;} // If an array was passed in, assume that it is an array of form elements.
if(jQuery.isArray(a)||a.jquery&&!jQuery.isPlainObject(a)){ // Serialize the form elements
jQuery.each(a,function(){add(this.name,this.value);});}else { // If traditional, encode the "old" way (the way 1.3.2 or older
// did it), otherwise encode params recursively.
for(prefix in a){buildParams(prefix,a[prefix],traditional,add);}} // Return the resulting serialization
return s.join("&").replace(r20,"+");};jQuery.fn.extend({serialize:function serialize(){return jQuery.param(this.serializeArray());},serializeArray:function serializeArray(){return this.map(function(){ // Can add propHook for "elements" to filter or add form elements
var elements=jQuery.prop(this,"elements");return elements?jQuery.makeArray(elements):this;}).filter(function(){var type=this.type; // Use .is( ":disabled" ) so that fieldset[disabled] works
return this.name&&!jQuery(this).is(":disabled")&&rsubmittable.test(this.nodeName)&&!rsubmitterTypes.test(type)&&(this.checked||!rcheckableType.test(type));}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:jQuery.isArray(val)?jQuery.map(val,function(val){return {name:elem.name,value:val.replace(rCRLF,"\r\n")};}):{name:elem.name,value:val.replace(rCRLF,"\r\n")};}).get();}});jQuery.ajaxSettings.xhr=function(){try{return new window.XMLHttpRequest();}catch(e){}};var xhrSuccessStatus={ // File protocol always yields status code 0, assume 200
0:200, // Support: IE9
// #1450: sometimes IE returns 1223 when it should be 204
1223:204},xhrSupported=jQuery.ajaxSettings.xhr();support.cors=!!xhrSupported&&"withCredentials" in xhrSupported;support.ajax=xhrSupported=!!xhrSupported;jQuery.ajaxTransport(function(options){var _callback,errorCallback; // Cross domain only allowed if supported through XMLHttpRequest
if(support.cors||xhrSupported&&!options.crossDomain){return {send:function send(headers,complete){var i,xhr=options.xhr();xhr.open(options.type,options.url,options.async,options.username,options.password); // Apply custom fields if provided
if(options.xhrFields){for(i in options.xhrFields){xhr[i]=options.xhrFields[i];}} // Override mime type if needed
if(options.mimeType&&xhr.overrideMimeType){xhr.overrideMimeType(options.mimeType);} // X-Requested-With header
// For cross-domain requests, seeing as conditions for a preflight are
// akin to a jigsaw puzzle, we simply never set it to be sure.
// (it can always be set on a per-request basis or even using ajaxSetup)
// For same-domain requests, won't change header if already provided.
if(!options.crossDomain&&!headers["X-Requested-With"]){headers["X-Requested-With"]="XMLHttpRequest";} // Set headers
for(i in headers){xhr.setRequestHeader(i,headers[i]);} // Callback
_callback=function callback(type){return function(){if(_callback){_callback=errorCallback=xhr.onload=xhr.onerror=xhr.onabort=xhr.onreadystatechange=null;if(type==="abort"){xhr.abort();}else if(type==="error"){ // Support: IE9
// On a manual native abort, IE9 throws
// errors on any property access that is not readyState
if(typeof xhr.status!=="number"){complete(0,"error");}else {complete( // File: protocol always yields status 0; see #8605, #14207
xhr.status,xhr.statusText);}}else {complete(xhrSuccessStatus[xhr.status]||xhr.status,xhr.statusText, // Support: IE9 only
// IE9 has no XHR2 but throws on binary (trac-11426)
// For XHR2 non-text, let the caller handle it (gh-2498)
(xhr.responseType||"text")!=="text"||typeof xhr.responseText!=="string"?{binary:xhr.response}:{text:xhr.responseText},xhr.getAllResponseHeaders());}}};}; // Listen to events
xhr.onload=_callback();errorCallback=xhr.onerror=_callback("error"); // Support: IE9
// Use onreadystatechange to replace onabort
// to handle uncaught aborts
if(xhr.onabort!==undefined){xhr.onabort=errorCallback;}else {xhr.onreadystatechange=function(){ // Check readyState before timeout as it changes
if(xhr.readyState===4){ // Allow onerror to be called first,
// but that will not handle a native abort
// Also, save errorCallback to a variable
// as xhr.onerror cannot be accessed
window.setTimeout(function(){if(_callback){errorCallback();}});}};} // Create the abort callback
_callback=_callback("abort");try{ // Do send the request (this may raise an exception)
xhr.send(options.hasContent&&options.data||null);}catch(e){ // #14683: Only rethrow if this hasn't been notified as an error yet
if(_callback){throw e;}}},abort:function abort(){if(_callback){_callback();}}};}}); // Install script dataType
jQuery.ajaxSetup({accepts:{script:"text/javascript, application/javascript, "+"application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function textScript(text){jQuery.globalEval(text);return text;}}}); // Handle cache's special case and crossDomain
jQuery.ajaxPrefilter("script",function(s){if(s.cache===undefined){s.cache=false;}if(s.crossDomain){s.type="GET";}}); // Bind script tag hack transport
jQuery.ajaxTransport("script",function(s){ // This transport only deals with cross domain requests
if(s.crossDomain){var script,_callback2;return {send:function send(_,complete){script=jQuery("<script>").prop({charset:s.scriptCharset,src:s.url}).on("load error",_callback2=function callback(evt){script.remove();_callback2=null;if(evt){complete(evt.type==="error"?404:200,evt.type);}}); // Use native DOM manipulation to avoid our domManip AJAX trickery
document.head.appendChild(script[0]);},abort:function abort(){if(_callback2){_callback2();}}};}});var oldCallbacks=[],rjsonp=/(=)\?(?=&|$)|\?\?/; // Default jsonp settings
jQuery.ajaxSetup({jsonp:"callback",jsonpCallback:function jsonpCallback(){var callback=oldCallbacks.pop()||jQuery.expando+"_"+nonce++;this[callback]=true;return callback;}}); // Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter("json jsonp",function(s,originalSettings,jqXHR){var callbackName,overwritten,responseContainer,jsonProp=s.jsonp!==false&&(rjsonp.test(s.url)?"url":typeof s.data==="string"&&(s.contentType||"").indexOf("application/x-www-form-urlencoded")===0&&rjsonp.test(s.data)&&"data"); // Handle iff the expected data type is "jsonp" or we have a parameter to set
if(jsonProp||s.dataTypes[0]==="jsonp"){ // Get callback name, remembering preexisting value associated with it
callbackName=s.jsonpCallback=jQuery.isFunction(s.jsonpCallback)?s.jsonpCallback():s.jsonpCallback; // Insert callback into url or form data
if(jsonProp){s[jsonProp]=s[jsonProp].replace(rjsonp,"$1"+callbackName);}else if(s.jsonp!==false){s.url+=(rquery.test(s.url)?"&":"?")+s.jsonp+"="+callbackName;} // Use data converter to retrieve json after script execution
s.converters["script json"]=function(){if(!responseContainer){jQuery.error(callbackName+" was not called");}return responseContainer[0];}; // Force json dataType
s.dataTypes[0]="json"; // Install callback
overwritten=window[callbackName];window[callbackName]=function(){responseContainer=arguments;}; // Clean-up function (fires after converters)
jqXHR.always(function(){ // If previous value didn't exist - remove it
if(overwritten===undefined){jQuery(window).removeProp(callbackName); // Otherwise restore preexisting value
}else {window[callbackName]=overwritten;} // Save back as free
if(s[callbackName]){ // Make sure that re-using the options doesn't screw things around
s.jsonpCallback=originalSettings.jsonpCallback; // Save the callback name for future use
oldCallbacks.push(callbackName);} // Call if it was a function and we have a response
if(responseContainer&&jQuery.isFunction(overwritten)){overwritten(responseContainer[0]);}responseContainer=overwritten=undefined;}); // Delegate to script
return "script";}}); // Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML=function(data,context,keepScripts){if(!data||typeof data!=="string"){return null;}if(typeof context==="boolean"){keepScripts=context;context=false;}context=context||document;var parsed=rsingleTag.exec(data),scripts=!keepScripts&&[]; // Single tag
if(parsed){return [context.createElement(parsed[1])];}parsed=buildFragment([data],context,scripts);if(scripts&&scripts.length){jQuery(scripts).remove();}return jQuery.merge([],parsed.childNodes);}; // Keep a copy of the old load method
var _load=jQuery.fn.load; /**
 * Load a url into a page
 */jQuery.fn.load=function(url,params,callback){if(typeof url!=="string"&&_load){return _load.apply(this,arguments);}var selector,type,response,self=this,off=url.indexOf(" ");if(off>-1){selector=jQuery.trim(url.slice(off));url=url.slice(0,off);} // If it's a function
if(jQuery.isFunction(params)){ // We assume that it's the callback
callback=params;params=undefined; // Otherwise, build a param string
}else if(params&&(typeof params==="undefined"?"undefined":_typeof(params))==="object"){type="POST";} // If we have elements to modify, make the request
if(self.length>0){jQuery.ajax({url:url, // If "type" variable is undefined, then "GET" method will be used.
// Make value of this field explicit since
// user can override it through ajaxSetup method
type:type||"GET",dataType:"html",data:params}).done(function(responseText){ // Save response for use in complete callback
response=arguments;self.html(selector? // If a selector was specified, locate the right elements in a dummy div
// Exclude scripts to avoid IE 'Permission Denied' errors
jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector): // Otherwise use the full result
responseText); // If the request succeeds, this function gets "data", "status", "jqXHR"
// but they are ignored because response was set above.
// If it fails, this function gets "jqXHR", "status", "error"
}).always(callback&&function(jqXHR,status){self.each(function(){callback.apply(this,response||[jqXHR.responseText,status,jqXHR]);});});}return this;}; // Attach a bunch of functions for handling common AJAX events
jQuery.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(i,type){jQuery.fn[type]=function(fn){return this.on(type,fn);};});jQuery.expr.filters.animated=function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem===fn.elem;}).length;}; /**
 * Gets a window from an element
 */function getWindow(elem){return jQuery.isWindow(elem)?elem:elem.nodeType===9&&elem.defaultView;}jQuery.offset={setOffset:function setOffset(elem,options,i){var curPosition,curLeft,curCSSTop,curTop,curOffset,curCSSLeft,calculatePosition,position=jQuery.css(elem,"position"),curElem=jQuery(elem),props={}; // Set position first, in-case top/left are set even on static elem
if(position==="static"){elem.style.position="relative";}curOffset=curElem.offset();curCSSTop=jQuery.css(elem,"top");curCSSLeft=jQuery.css(elem,"left");calculatePosition=(position==="absolute"||position==="fixed")&&(curCSSTop+curCSSLeft).indexOf("auto")>-1; // Need to be able to calculate position if either
// top or left is auto and position is either absolute or fixed
if(calculatePosition){curPosition=curElem.position();curTop=curPosition.top;curLeft=curPosition.left;}else {curTop=parseFloat(curCSSTop)||0;curLeft=parseFloat(curCSSLeft)||0;}if(jQuery.isFunction(options)){ // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
options=options.call(elem,i,jQuery.extend({},curOffset));}if(options.top!=null){props.top=options.top-curOffset.top+curTop;}if(options.left!=null){props.left=options.left-curOffset.left+curLeft;}if("using" in options){options.using.call(elem,props);}else {curElem.css(props);}}};jQuery.fn.extend({offset:function offset(options){if(arguments.length){return options===undefined?this:this.each(function(i){jQuery.offset.setOffset(this,options,i);});}var docElem,win,elem=this[0],box={top:0,left:0},doc=elem&&elem.ownerDocument;if(!doc){return;}docElem=doc.documentElement; // Make sure it's not a disconnected DOM node
if(!jQuery.contains(docElem,elem)){return box;}box=elem.getBoundingClientRect();win=getWindow(doc);return {top:box.top+win.pageYOffset-docElem.clientTop,left:box.left+win.pageXOffset-docElem.clientLeft};},position:function position(){if(!this[0]){return;}var offsetParent,offset,elem=this[0],parentOffset={top:0,left:0}; // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
// because it is its only offset parent
if(jQuery.css(elem,"position")==="fixed"){ // Assume getBoundingClientRect is there when computed position is fixed
offset=elem.getBoundingClientRect();}else { // Get *real* offsetParent
offsetParent=this.offsetParent(); // Get correct offsets
offset=this.offset();if(!jQuery.nodeName(offsetParent[0],"html")){parentOffset=offsetParent.offset();} // Add offsetParent borders
parentOffset.top+=jQuery.css(offsetParent[0],"borderTopWidth",true);parentOffset.left+=jQuery.css(offsetParent[0],"borderLeftWidth",true);} // Subtract parent offsets and element margins
return {top:offset.top-parentOffset.top-jQuery.css(elem,"marginTop",true),left:offset.left-parentOffset.left-jQuery.css(elem,"marginLeft",true)};}, // This method will return documentElement in the following cases:
// 1) For the element inside the iframe without offsetParent, this method will return
//    documentElement of the parent window
// 2) For the hidden or detached element
// 3) For body or html element, i.e. in case of the html node - it will return itself
//
// but those exceptions were never presented as a real life use-cases
// and might be considered as more preferable results.
//
// This logic, however, is not guaranteed and can change at any point in the future
offsetParent:function offsetParent(){return this.map(function(){var offsetParent=this.offsetParent;while(offsetParent&&jQuery.css(offsetParent,"position")==="static"){offsetParent=offsetParent.offsetParent;}return offsetParent||documentElement;});}}); // Create scrollLeft and scrollTop methods
jQuery.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(method,prop){var top="pageYOffset"===prop;jQuery.fn[method]=function(val){return access(this,function(elem,method,val){var win=getWindow(elem);if(val===undefined){return win?win[prop]:elem[method];}if(win){win.scrollTo(!top?val:win.pageXOffset,top?val:win.pageYOffset);}else {elem[method]=val;}},method,val,arguments.length);};}); // Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each(["top","left"],function(i,prop){jQuery.cssHooks[prop]=addGetHookIf(support.pixelPosition,function(elem,computed){if(computed){computed=curCSS(elem,prop); // If curCSS returns percentage, fallback to offset
return rnumnonpx.test(computed)?jQuery(elem).position()[prop]+"px":computed;}});}); // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each({Height:"height",Width:"width"},function(name,type){jQuery.each({padding:"inner"+name,content:type,"":"outer"+name},function(defaultExtra,funcName){ // Margin is only for outerHeight, outerWidth
jQuery.fn[funcName]=function(margin,value){var chainable=arguments.length&&(defaultExtra||typeof margin!=="boolean"),extra=defaultExtra||(margin===true||value===true?"margin":"border");return access(this,function(elem,type,value){var doc;if(jQuery.isWindow(elem)){ // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
// isn't a whole lot we can do. See pull request at this URL for discussion:
// https://github.com/jquery/jquery/pull/764
return elem.document.documentElement["client"+name];} // Get document width or height
if(elem.nodeType===9){doc=elem.documentElement; // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
// whichever is greatest
return Math.max(elem.body["scroll"+name],doc["scroll"+name],elem.body["offset"+name],doc["offset"+name],doc["client"+name]);}return value===undefined? // Get width or height on the element, requesting but not forcing parseFloat
jQuery.css(elem,type,extra): // Set width or height on the element
jQuery.style(elem,type,value,extra);},type,chainable?margin:undefined,chainable,null);};});});jQuery.fn.extend({bind:function bind(types,data,fn){return this.on(types,null,data,fn);},unbind:function unbind(types,fn){return this.off(types,null,fn);},delegate:function delegate(selector,types,data,fn){return this.on(types,selector,data,fn);},undelegate:function undelegate(selector,types,fn){ // ( namespace ) or ( selector, types [, fn] )
return arguments.length===1?this.off(selector,"**"):this.off(types,selector||"**",fn);},size:function size(){return this.length;}});jQuery.fn.andSelf=jQuery.fn.addBack; // Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
if(typeof define==="function"&&define.amd){define("jquery",[],function(){return jQuery;});}var  // Map over jQuery in case of overwrite
_jQuery=window.jQuery, // Map over the $ in case of overwrite
_$=window.$;jQuery.noConflict=function(deep){if(window.$===jQuery){window.$=_$;}if(deep&&window.jQuery===jQuery){window.jQuery=_jQuery;}return jQuery;}; // Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if(!noGlobal){window.jQuery=window.$=jQuery;}return jQuery;});
"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};if("undefined"==typeof jQuery){var jQuery;jQuery="function"==typeof require?$=require("jquery"):$;}jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function swing(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e);},easeInQuad:function easeInQuad(a,b,c,d,e){return d*(b/=e)*b+c;},easeOutQuad:function easeOutQuad(a,b,c,d,e){return -d*(b/=e)*(b-2)+c;},easeInOutQuad:function easeInOutQuad(a,b,c,d,e){return (b/=e/2)<1?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c;},easeInCubic:function easeInCubic(a,b,c,d,e){return d*(b/=e)*b*b+c;},easeOutCubic:function easeOutCubic(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c;},easeInOutCubic:function easeInOutCubic(a,b,c,d,e){return (b/=e/2)<1?d/2*b*b*b+c:d/2*((b-=2)*b*b+2)+c;},easeInQuart:function easeInQuart(a,b,c,d,e){return d*(b/=e)*b*b*b+c;},easeOutQuart:function easeOutQuart(a,b,c,d,e){return -d*((b=b/e-1)*b*b*b-1)+c;},easeInOutQuart:function easeInOutQuart(a,b,c,d,e){return (b/=e/2)<1?d/2*b*b*b*b+c:-d/2*((b-=2)*b*b*b-2)+c;},easeInQuint:function easeInQuint(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c;},easeOutQuint:function easeOutQuint(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c;},easeInOutQuint:function easeInOutQuint(a,b,c,d,e){return (b/=e/2)<1?d/2*b*b*b*b*b+c:d/2*((b-=2)*b*b*b*b+2)+c;},easeInSine:function easeInSine(a,b,c,d,e){return -d*Math.cos(b/e*(Math.PI/2))+d+c;},easeOutSine:function easeOutSine(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c;},easeInOutSine:function easeInOutSine(a,b,c,d,e){return -d/2*(Math.cos(Math.PI*b/e)-1)+c;},easeInExpo:function easeInExpo(a,b,c,d,e){return 0==b?c:d*Math.pow(2,10*(b/e-1))+c;},easeOutExpo:function easeOutExpo(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c;},easeInOutExpo:function easeInOutExpo(a,b,c,d,e){return 0==b?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c;},easeInCirc:function easeInCirc(a,b,c,d,e){return -d*(Math.sqrt(1-(b/=e)*b)-1)+c;},easeOutCirc:function easeOutCirc(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c;},easeInOutCirc:function easeInOutCirc(a,b,c,d,e){return (b/=e/2)<1?-d/2*(Math.sqrt(1-b*b)-1)+c:d/2*(Math.sqrt(1-(b-=2)*b)+1)+c;},easeInElastic:function easeInElastic(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4;}else var f=g/(2*Math.PI)*Math.asin(d/h);return -(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*(2*Math.PI)/g))+c;},easeOutElastic:function easeOutElastic(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4;}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*(2*Math.PI)/g)+d+c;},easeInOutElastic:function easeInOutElastic(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(2==(b/=e/2))return c+d;if(g||(g=e*(.3*1.5)),h<Math.abs(d)){h=d;var f=g/4;}else var f=g/(2*Math.PI)*Math.asin(d/h);return 1>b?-.5*(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*(2*Math.PI)/g))+c:h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*(2*Math.PI)/g)*.5+d+c;},easeInBack:function easeInBack(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*(b/=e)*b*((f+1)*b-f)+c;},easeOutBack:function easeOutBack(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*((b=b/e-1)*b*((f+1)*b+f)+1)+c;},easeInOutBack:function easeInOutBack(a,b,c,d,e,f){return void 0==f&&(f=1.70158),(b/=e/2)<1?d/2*(b*b*(((f*=1.525)+1)*b-f))+c:d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c;},easeInBounce:function easeInBounce(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c;},easeOutBounce:function easeOutBounce(a,b,c,d,e){return (b/=e)<1/2.75?d*(7.5625*b*b)+c:2/2.75>b?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:2.5/2.75>b?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c;},easeInOutBounce:function easeInOutBounce(a,b,c,d,e){return e/2>b?.5*jQuery.easing.easeInBounce(a,2*b,0,d,e)+c:.5*jQuery.easing.easeOutBounce(a,2*b-e,0,d,e)+.5*d+c;}}),jQuery.extend(jQuery.easing,{easeInOutMaterial:function easeInOutMaterial(a,b,c,d,e){return (b/=e/2)<1?d/2*b*b+c:d/4*((b-=2)*b*b+2)+c;}}),jQuery.Velocity?console.log("Velocity is already loaded. You may be needlessly importing Velocity again; note that Materialize includes Velocity."):(!function(a){function b(a){var b=a.length,d=c.type(a);return "function"===d||c.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===d||0===b||"number"==typeof b&&b>0&&b-1 in a;}if(!a.jQuery){var c=function c(a,b){return new c.fn.init(a,b);};c.isWindow=function(a){return null!=a&&a==a.window;},c.type=function(a){return null==a?a+"":"object"==(typeof a==="undefined"?"undefined":_typeof(a))||"function"==typeof a?e[g.call(a)]||"object":typeof a==="undefined"?"undefined":_typeof(a);},c.isArray=Array.isArray||function(a){return "array"===c.type(a);},c.isPlainObject=function(a){var b;if(!a||"object"!==c.type(a)||a.nodeType||c.isWindow(a))return !1;try{if(a.constructor&&!f.call(a,"constructor")&&!f.call(a.constructor.prototype,"isPrototypeOf"))return !1;}catch(d){return !1;}for(b in a){}return void 0===b||f.call(a,b);},c.each=function(a,c,d){var e,f=0,g=a.length,h=b(a);if(d){if(h)for(;g>f&&(e=c.apply(a[f],d),e!==!1);f++){}else for(f in a){if(e=c.apply(a[f],d),e===!1)break;}}else if(h)for(;g>f&&(e=c.call(a[f],f,a[f]),e!==!1);f++){}else for(f in a){if(e=c.call(a[f],f,a[f]),e===!1)break;}return a;},c.data=function(a,b,e){if(void 0===e){var f=a[c.expando],g=f&&d[f];if(void 0===b)return g;if(g&&b in g)return g[b];}else if(void 0!==b){var f=a[c.expando]||(a[c.expando]=++c.uuid);return d[f]=d[f]||{},d[f][b]=e,e;}},c.removeData=function(a,b){var e=a[c.expando],f=e&&d[e];f&&c.each(b,function(a,b){delete f[b];});},c.extend=function(){var a,b,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;for("boolean"==typeof h&&(k=h,h=arguments[i]||{},i++),"object"!=(typeof h==="undefined"?"undefined":_typeof(h))&&"function"!==c.type(h)&&(h={}),i===j&&(h=this,i--);j>i;i++){if(null!=(f=arguments[i]))for(e in f){a=h[e],d=f[e],h!==d&&(k&&d&&(c.isPlainObject(d)||(b=c.isArray(d)))?(b?(b=!1,g=a&&c.isArray(a)?a:[]):g=a&&c.isPlainObject(a)?a:{},h[e]=c.extend(k,g,d)):void 0!==d&&(h[e]=d));}}return h;},c.queue=function(a,d,e){function f(a,c){var d=c||[];return null!=a&&(b(Object(a))?!function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;){a[e++]=b[d++];}if(c!==c)for(;void 0!==b[d];){a[e++]=b[d++];}return a.length=e,a;}(d,"string"==typeof a?[a]:a):[].push.call(d,a)),d;}if(a){d=(d||"fx")+"queue";var g=c.data(a,d);return e?(!g||c.isArray(e)?g=c.data(a,d,f(e)):g.push(e),g):g||[];}},c.dequeue=function(a,b){c.each(a.nodeType?[a]:a,function(a,d){b=b||"fx";var e=c.queue(d,b),f=e.shift();"inprogress"===f&&(f=e.shift()),f&&("fx"===b&&e.unshift("inprogress"),f.call(d,function(){c.dequeue(d,b);}));});},c.fn=c.prototype={init:function init(a){if(a.nodeType)return this[0]=a,this;throw new Error("Not a DOM node.");},offset:function offset(){var b=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return {top:b.top+(a.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:b.left+(a.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)};},position:function position(){function a(){for(var a=this.offsetParent||document;a&&"html"===!a.nodeType.toLowerCase&&"static"===a.style.position;){a=a.offsetParent;}return a||document;}var b=this[0],a=a.apply(b),d=this.offset(),e=/^(?:body|html)$/i.test(a.nodeName)?{top:0,left:0}:c(a).offset();return d.top-=parseFloat(b.style.marginTop)||0,d.left-=parseFloat(b.style.marginLeft)||0,a.style&&(e.top+=parseFloat(a.style.borderTopWidth)||0,e.left+=parseFloat(a.style.borderLeftWidth)||0),{top:d.top-e.top,left:d.left-e.left};}};var d={};c.expando="velocity"+new Date().getTime(),c.uuid=0;for(var e={},f=e.hasOwnProperty,g=e.toString,h="Boolean Number String Function Array Date RegExp Object Error".split(" "),i=0;i<h.length;i++){e["[object "+h[i]+"]"]=h[i].toLowerCase();}c.fn.init.prototype=c.fn,a.Velocity={Utilities:c};}}(window),function(a){"object"==(typeof module==="undefined"?"undefined":_typeof(module))&&"object"==_typeof(module.exports)?module.exports=a():"function"==typeof define&&define.amd?define(a):a();}(function(){return function(a,b,c,d){function e(a){for(var b=-1,c=a?a.length:0,d=[];++b<c;){var e=a[b];e&&d.push(e);}return d;}function f(a){return p.isWrapped(a)?a=[].slice.call(a):p.isNode(a)&&(a=[a]),a;}function g(a){var b=m.data(a,"velocity");return null===b?d:b;}function h(a){return function(b){return Math.round(b*a)*(1/a);};}function i(a,c,d,e){function f(a,b){return 1-3*b+3*a;}function g(a,b){return 3*b-6*a;}function h(a){return 3*a;}function i(a,b,c){return ((f(b,c)*a+g(b,c))*a+h(b))*a;}function j(a,b,c){return 3*f(b,c)*a*a+2*g(b,c)*a+h(b);}function k(b,c){for(var e=0;p>e;++e){var f=j(c,a,d);if(0===f)return c;var g=i(c,a,d)-b;c-=g/f;}return c;}function l(){for(var b=0;t>b;++b){x[b]=i(b*u,a,d);}}function m(b,c,e){var f,g,h=0;do {g=c+(e-c)/2,f=i(g,a,d)-b,f>0?e=g:c=g;}while(Math.abs(f)>r&&++h<s);return g;}function n(b){for(var c=0,e=1,f=t-1;e!=f&&x[e]<=b;++e){c+=u;}--e;var g=(b-x[e])/(x[e+1]-x[e]),h=c+g*u,i=j(h,a,d);return i>=q?k(b,h):0==i?h:m(b,c,c+u);}function o(){y=!0,(a!=c||d!=e)&&l();}var p=4,q=.001,r=1e-7,s=10,t=11,u=1/(t-1),v="Float32Array" in b;if(4!==arguments.length)return !1;for(var w=0;4>w;++w){if("number"!=typeof arguments[w]||isNaN(arguments[w])||!isFinite(arguments[w]))return !1;}a=Math.min(a,1),d=Math.min(d,1),a=Math.max(a,0),d=Math.max(d,0);var x=v?new Float32Array(t):new Array(t),y=!1,z=function z(b){return y||o(),a===c&&d===e?b:0===b?0:1===b?1:i(n(b),c,e);};z.getControlPoints=function(){return [{x:a,y:c},{x:d,y:e}];};var A="generateBezier("+[a,c,d,e]+")";return z.toString=function(){return A;},z;}function j(a,b){var c=a;return p.isString(a)?t.Easings[a]||(c=!1):c=p.isArray(a)&&1===a.length?h.apply(null,a):p.isArray(a)&&2===a.length?u.apply(null,a.concat([b])):p.isArray(a)&&4===a.length?i.apply(null,a):!1,c===!1&&(c=t.Easings[t.defaults.easing]?t.defaults.easing:s),c;}function k(a){if(a){var b=new Date().getTime(),c=t.State.calls.length;c>1e4&&(t.State.calls=e(t.State.calls));for(var f=0;c>f;f++){if(t.State.calls[f]){var h=t.State.calls[f],i=h[0],j=h[2],n=h[3],o=!!n,q=null;n||(n=t.State.calls[f][3]=b-16);for(var r=Math.min((b-n)/j.duration,1),s=0,u=i.length;u>s;s++){var w=i[s],y=w.element;if(g(y)){var z=!1;if(j.display!==d&&null!==j.display&&"none"!==j.display){if("flex"===j.display){var A=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];m.each(A,function(a,b){v.setPropertyValue(y,"display",b);});}v.setPropertyValue(y,"display",j.display);}j.visibility!==d&&"hidden"!==j.visibility&&v.setPropertyValue(y,"visibility",j.visibility);for(var B in w){if("element"!==B){var C,D=w[B],E=p.isString(D.easing)?t.Easings[D.easing]:D.easing;if(1===r)C=D.endValue;else {var F=D.endValue-D.startValue;if(C=D.startValue+F*E(r,j,F),!o&&C===D.currentValue)continue;}if(D.currentValue=C,"tween"===B)q=C;else {if(v.Hooks.registered[B]){var G=v.Hooks.getRoot(B),H=g(y).rootPropertyValueCache[G];H&&(D.rootPropertyValue=H);}var I=v.setPropertyValue(y,B,D.currentValue+(0===parseFloat(C)?"":D.unitType),D.rootPropertyValue,D.scrollData);v.Hooks.registered[B]&&(g(y).rootPropertyValueCache[G]=v.Normalizations.registered[G]?v.Normalizations.registered[G]("extract",null,I[1]):I[1]),"transform"===I[0]&&(z=!0);}}}j.mobileHA&&g(y).transformCache.translate3d===d&&(g(y).transformCache.translate3d="(0px, 0px, 0px)",z=!0),z&&v.flushTransformCache(y);}}j.display!==d&&"none"!==j.display&&(t.State.calls[f][2].display=!1),j.visibility!==d&&"hidden"!==j.visibility&&(t.State.calls[f][2].visibility=!1),j.progress&&j.progress.call(h[1],h[1],r,Math.max(0,n+j.duration-b),n,q),1===r&&l(f);}}}t.State.isTicking&&x(k);}function l(a,b){if(!t.State.calls[a])return !1;for(var c=t.State.calls[a][0],e=t.State.calls[a][1],f=t.State.calls[a][2],h=t.State.calls[a][4],i=!1,j=0,k=c.length;k>j;j++){var l=c[j].element;if(b||f.loop||("none"===f.display&&v.setPropertyValue(l,"display",f.display),"hidden"===f.visibility&&v.setPropertyValue(l,"visibility",f.visibility)),f.loop!==!0&&(m.queue(l)[1]===d||!/\.velocityQueueEntryFlag/i.test(m.queue(l)[1]))&&g(l)){g(l).isAnimating=!1,g(l).rootPropertyValueCache={};var n=!1;m.each(v.Lists.transforms3D,function(a,b){var c=/^scale/.test(b)?1:0,e=g(l).transformCache[b];g(l).transformCache[b]!==d&&new RegExp("^\\("+c+"[^.]").test(e)&&(n=!0,delete g(l).transformCache[b]);}),f.mobileHA&&(n=!0,delete g(l).transformCache.translate3d),n&&v.flushTransformCache(l),v.Values.removeClass(l,"velocity-animating");}if(!b&&f.complete&&!f.loop&&j===k-1)try{f.complete.call(e,e);}catch(o){setTimeout(function(){throw o;},1);}h&&f.loop!==!0&&h(e),g(l)&&f.loop===!0&&!b&&(m.each(g(l).tweensContainer,function(a,b){/^rotate/.test(a)&&360===parseFloat(b.endValue)&&(b.endValue=0,b.startValue=360),/^backgroundPosition/.test(a)&&100===parseFloat(b.endValue)&&"%"===b.unitType&&(b.endValue=0,b.startValue=100);}),t(l,"reverse",{loop:!0,delay:f.delay})),f.queue!==!1&&m.dequeue(l,f.queue);}t.State.calls[a]=!1;for(var p=0,q=t.State.calls.length;q>p;p++){if(t.State.calls[p]!==!1){i=!0;break;}}i===!1&&(t.State.isTicking=!1,delete t.State.calls,t.State.calls=[]);}var m,n=function(){if(c.documentMode)return c.documentMode;for(var a=7;a>4;a--){var b=c.createElement("div");if(b.innerHTML="<!--[if IE "+a+"]><span></span><![endif]-->",b.getElementsByTagName("span").length)return b=null,a;}return d;}(),o=function(){var a=0;return b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame||function(b){var c,d=new Date().getTime();return c=Math.max(0,16-(d-a)),a=d+c,setTimeout(function(){b(d+c);},c);};}(),p={isString:function isString(a){return "string"==typeof a;},isArray:Array.isArray||function(a){return "[object Array]"===Object.prototype.toString.call(a);},isFunction:function isFunction(a){return "[object Function]"===Object.prototype.toString.call(a);},isNode:function isNode(a){return a&&a.nodeType;},isNodeList:function isNodeList(a){return "object"==(typeof a==="undefined"?"undefined":_typeof(a))&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(a))&&a.length!==d&&(0===a.length||"object"==_typeof(a[0])&&a[0].nodeType>0);},isWrapped:function isWrapped(a){return a&&(a.jquery||b.Zepto&&b.Zepto.zepto.isZ(a));},isSVG:function isSVG(a){return b.SVGElement&&a instanceof b.SVGElement;},isEmptyObject:function isEmptyObject(a){for(var b in a){return !1;}return !0;}},q=!1;if(a.fn&&a.fn.jquery?(m=a,q=!0):m=b.Velocity.Utilities,8>=n&&!q)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(7>=n)return void (jQuery.fn.velocity=jQuery.fn.animate);var r=400,s="swing",t={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:b.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:c.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:m,Redirects:{},Easings:{},Promise:b.Promise,defaults:{queue:"",duration:r,easing:s,begin:d,complete:d,progress:d,display:d,visibility:d,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},init:function init(a){m.data(a,"velocity",{isSVG:p.isSVG(a),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}});},hook:null,mock:!1,version:{major:1,minor:2,patch:2},debug:!1};b.pageYOffset!==d?(t.State.scrollAnchor=b,t.State.scrollPropertyLeft="pageXOffset",t.State.scrollPropertyTop="pageYOffset"):(t.State.scrollAnchor=c.documentElement||c.body.parentNode||c.body,t.State.scrollPropertyLeft="scrollLeft",t.State.scrollPropertyTop="scrollTop");var u=function(){function a(a){return -a.tension*a.x-a.friction*a.v;}function b(b,c,d){var e={x:b.x+d.dx*c,v:b.v+d.dv*c,tension:b.tension,friction:b.friction};return {dx:e.v,dv:a(e)};}function c(c,d){var e={dx:c.v,dv:a(c)},f=b(c,.5*d,e),g=b(c,.5*d,f),h=b(c,d,g),i=1/6*(e.dx+2*(f.dx+g.dx)+h.dx),j=1/6*(e.dv+2*(f.dv+g.dv)+h.dv);return c.x=c.x+i*d,c.v=c.v+j*d,c;}return function d(a,b,e){var f,g,h,i={x:-1,v:0,tension:null,friction:null},j=[0],k=0,l=1e-4,m=.016;for(a=parseFloat(a)||500,b=parseFloat(b)||20,e=e||null,i.tension=a,i.friction=b,f=null!==e,f?(k=d(a,b),g=k/e*m):g=m;h=c(h||i,g),j.push(1+h.x),k+=16,Math.abs(h.x)>l&&Math.abs(h.v)>l;){}return f?function(a){return j[a*(j.length-1)|0];}:k;};}();t.Easings={linear:function linear(a){return a;},swing:function swing(a){return .5-Math.cos(a*Math.PI)/2;},spring:function spring(a){return 1-Math.cos(4.5*a*Math.PI)*Math.exp(6*-a);}},m.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(a,b){t.Easings[b[0]]=i.apply(null,b[1]);});var v=t.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function register(){for(var a=0;a<v.Lists.colors.length;a++){var b="color"===v.Lists.colors[a]?"0 0 0 1":"255 255 255 1";v.Hooks.templates[v.Lists.colors[a]]=["Red Green Blue Alpha",b];}var c,d,e;if(n)for(c in v.Hooks.templates){d=v.Hooks.templates[c],e=d[0].split(" ");var f=d[1].match(v.RegEx.valueSplit);"Color"===e[0]&&(e.push(e.shift()),f.push(f.shift()),v.Hooks.templates[c]=[e.join(" "),f.join(" ")]);}for(c in v.Hooks.templates){d=v.Hooks.templates[c],e=d[0].split(" ");for(var a in e){var g=c+e[a],h=a;v.Hooks.registered[g]=[c,h];}}},getRoot:function getRoot(a){var b=v.Hooks.registered[a];return b?b[0]:a;},cleanRootPropertyValue:function cleanRootPropertyValue(a,b){return v.RegEx.valueUnwrap.test(b)&&(b=b.match(v.RegEx.valueUnwrap)[1]),v.Values.isCSSNullValue(b)&&(b=v.Hooks.templates[a][1]),b;},extractValue:function extractValue(a,b){var c=v.Hooks.registered[a];if(c){var d=c[0],e=c[1];return b=v.Hooks.cleanRootPropertyValue(d,b),b.toString().match(v.RegEx.valueSplit)[e];}return b;},injectValue:function injectValue(a,b,c){var d=v.Hooks.registered[a];if(d){var e,f,g=d[0],h=d[1];return c=v.Hooks.cleanRootPropertyValue(g,c),e=c.toString().match(v.RegEx.valueSplit),e[h]=b,f=e.join(" ");}return c;}},Normalizations:{registered:{clip:function clip(a,b,c){switch(a){case "name":return "clip";case "extract":var d;return v.RegEx.wrappedValueAlreadyExtracted.test(c)?d=c:(d=c.toString().match(v.RegEx.valueUnwrap),d=d?d[1].replace(/,(\s+)?/g," "):c),d;case "inject":return "rect("+c+")";}},blur:function blur(a,b,c){switch(a){case "name":return t.State.isFirefox?"filter":"-webkit-filter";case "extract":var d=parseFloat(c);if(!d&&0!==d){var e=c.toString().match(/blur\(([0-9]+[A-z]+)\)/i);d=e?e[1]:0;}return d;case "inject":return parseFloat(c)?"blur("+c+")":"none";}},opacity:function opacity(a,b,c){if(8>=n)switch(a){case "name":return "filter";case "extract":var d=c.toString().match(/alpha\(opacity=(.*)\)/i);return c=d?d[1]/100:1;case "inject":return b.style.zoom=1,parseFloat(c)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(c),10)+")";}else switch(a){case "name":return "opacity";case "extract":return c;case "inject":return c;}}},register:function register(){9>=n||t.State.isGingerbread||(v.Lists.transformsBase=v.Lists.transformsBase.concat(v.Lists.transforms3D));for(var a=0;a<v.Lists.transformsBase.length;a++){!function(){var b=v.Lists.transformsBase[a];v.Normalizations.registered[b]=function(a,c,e){switch(a){case "name":return "transform";case "extract":return g(c)===d||g(c).transformCache[b]===d?/^scale/i.test(b)?1:0:g(c).transformCache[b].replace(/[()]/g,"");case "inject":var f=!1;switch(b.substr(0,b.length-1)){case "translate":f=!/(%|px|em|rem|vw|vh|\d)$/i.test(e);break;case "scal":case "scale":t.State.isAndroid&&g(c).transformCache[b]===d&&1>e&&(e=1),f=!/(\d)$/i.test(e);break;case "skew":f=!/(deg|\d)$/i.test(e);break;case "rotate":f=!/(deg|\d)$/i.test(e);}return f||(g(c).transformCache[b]="("+e+")"),g(c).transformCache[b];}};}();}for(var a=0;a<v.Lists.colors.length;a++){!function(){var b=v.Lists.colors[a];v.Normalizations.registered[b]=function(a,c,e){switch(a){case "name":return b;case "extract":var f;if(v.RegEx.wrappedValueAlreadyExtracted.test(e))f=e;else {var g,h={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(e)?g=h[e]!==d?h[e]:h.black:v.RegEx.isHex.test(e)?g="rgb("+v.Values.hexToRgb(e).join(" ")+")":/^rgba?\(/i.test(e)||(g=h.black),f=(g||e).toString().match(v.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ");}return 8>=n||3!==f.split(" ").length||(f+=" 1"),f;case "inject":return 8>=n?4===e.split(" ").length&&(e=e.split(/\s+/).slice(0,3).join(" ")):3===e.split(" ").length&&(e+=" 1"),(8>=n?"rgb":"rgba")+"("+e.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")";}};}();}}},Names:{camelCase:function camelCase(a){return a.replace(/-(\w)/g,function(a,b){return b.toUpperCase();});},SVGAttribute:function SVGAttribute(a){var b="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return (n||t.State.isAndroid&&!t.State.isChrome)&&(b+="|transform"),new RegExp("^("+b+")$","i").test(a);},prefixCheck:function prefixCheck(a){if(t.State.prefixMatches[a])return [t.State.prefixMatches[a],!0];for(var b=["","Webkit","Moz","ms","O"],c=0,d=b.length;d>c;c++){var e;if(e=0===c?a:b[c]+a.replace(/^\w/,function(a){return a.toUpperCase();}),p.isString(t.State.prefixElement.style[e]))return t.State.prefixMatches[a]=e,[e,!0];}return [a,!1];}},Values:{hexToRgb:function hexToRgb(a){var b,c=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,d=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return a=a.replace(c,function(a,b,c,d){return b+b+c+c+d+d;}),b=d.exec(a),b?[parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16)]:[0,0,0];},isCSSNullValue:function isCSSNullValue(a){return 0==a||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(a);},getUnitType:function getUnitType(a){return (/^(rotate|skew)/i.test(a)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(a)?"":"px");},getDisplayType:function getDisplayType(a){var b=a&&a.tagName.toString().toLowerCase();return (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(b)?"inline":/^(li)$/i.test(b)?"list-item":/^(tr)$/i.test(b)?"table-row":/^(table)$/i.test(b)?"table":/^(tbody)$/i.test(b)?"table-row-group":"block");},addClass:function addClass(a,b){a.classList?a.classList.add(b):a.className+=(a.className.length?" ":"")+b;},removeClass:function removeClass(a,b){a.classList?a.classList.remove(b):a.className=a.className.toString().replace(new RegExp("(^|\\s)"+b.split(" ").join("|")+"(\\s|$)","gi")," ");}},getPropertyValue:function getPropertyValue(a,c,e,f){function h(a,c){function e(){j&&v.setPropertyValue(a,"display","none");}var i=0;if(8>=n)i=m.css(a,c);else {var j=!1;if(/^(width|height)$/.test(c)&&0===v.getPropertyValue(a,"display")&&(j=!0,v.setPropertyValue(a,"display",v.Values.getDisplayType(a))),!f){if("height"===c&&"border-box"!==v.getPropertyValue(a,"boxSizing").toString().toLowerCase()){var k=a.offsetHeight-(parseFloat(v.getPropertyValue(a,"borderTopWidth"))||0)-(parseFloat(v.getPropertyValue(a,"borderBottomWidth"))||0)-(parseFloat(v.getPropertyValue(a,"paddingTop"))||0)-(parseFloat(v.getPropertyValue(a,"paddingBottom"))||0);return e(),k;}if("width"===c&&"border-box"!==v.getPropertyValue(a,"boxSizing").toString().toLowerCase()){var l=a.offsetWidth-(parseFloat(v.getPropertyValue(a,"borderLeftWidth"))||0)-(parseFloat(v.getPropertyValue(a,"borderRightWidth"))||0)-(parseFloat(v.getPropertyValue(a,"paddingLeft"))||0)-(parseFloat(v.getPropertyValue(a,"paddingRight"))||0);return e(),l;}}var o;o=g(a)===d?b.getComputedStyle(a,null):g(a).computedStyle?g(a).computedStyle:g(a).computedStyle=b.getComputedStyle(a,null),"borderColor"===c&&(c="borderTopColor"),i=9===n&&"filter"===c?o.getPropertyValue(c):o[c],(""===i||null===i)&&(i=a.style[c]),e();}if("auto"===i&&/^(top|right|bottom|left)$/i.test(c)){var p=h(a,"position");("fixed"===p||"absolute"===p&&/top|left/i.test(c))&&(i=m(a).position()[c]+"px");}return i;}var i;if(v.Hooks.registered[c]){var j=c,k=v.Hooks.getRoot(j);e===d&&(e=v.getPropertyValue(a,v.Names.prefixCheck(k)[0])),v.Normalizations.registered[k]&&(e=v.Normalizations.registered[k]("extract",a,e)),i=v.Hooks.extractValue(j,e);}else if(v.Normalizations.registered[c]){var l,o;l=v.Normalizations.registered[c]("name",a),"transform"!==l&&(o=h(a,v.Names.prefixCheck(l)[0]),v.Values.isCSSNullValue(o)&&v.Hooks.templates[c]&&(o=v.Hooks.templates[c][1])),i=v.Normalizations.registered[c]("extract",a,o);}if(!/^[\d-]/.test(i))if(g(a)&&g(a).isSVG&&v.Names.SVGAttribute(c)){if(/^(height|width)$/i.test(c))try{i=a.getBBox()[c];}catch(p){i=0;}else i=a.getAttribute(c);}else i=h(a,v.Names.prefixCheck(c)[0]);return v.Values.isCSSNullValue(i)&&(i=0),t.debug>=2&&console.log("Get "+c+": "+i),i;},setPropertyValue:function setPropertyValue(a,c,d,e,f){var h=c;if("scroll"===c)f.container?f.container["scroll"+f.direction]=d:"Left"===f.direction?b.scrollTo(d,f.alternateValue):b.scrollTo(f.alternateValue,d);else if(v.Normalizations.registered[c]&&"transform"===v.Normalizations.registered[c]("name",a))v.Normalizations.registered[c]("inject",a,d),h="transform",d=g(a).transformCache[c];else {if(v.Hooks.registered[c]){var i=c,j=v.Hooks.getRoot(c);e=e||v.getPropertyValue(a,j),d=v.Hooks.injectValue(i,d,e),c=j;}if(v.Normalizations.registered[c]&&(d=v.Normalizations.registered[c]("inject",a,d),c=v.Normalizations.registered[c]("name",a)),h=v.Names.prefixCheck(c)[0],8>=n)try{a.style[h]=d;}catch(k){t.debug&&console.log("Browser does not support ["+d+"] for ["+h+"]");}else g(a)&&g(a).isSVG&&v.Names.SVGAttribute(c)?a.setAttribute(c,d):a.style[h]=d;t.debug>=2&&console.log("Set "+c+" ("+h+"): "+d);}return [h,d];},flushTransformCache:function flushTransformCache(a){function b(b){return parseFloat(v.getPropertyValue(a,b));}var c="";if((n||t.State.isAndroid&&!t.State.isChrome)&&g(a).isSVG){var d={translate:[b("translateX"),b("translateY")],skewX:[b("skewX")],skewY:[b("skewY")],scale:1!==b("scale")?[b("scale"),b("scale")]:[b("scaleX"),b("scaleY")],rotate:[b("rotateZ"),0,0]};m.each(g(a).transformCache,function(a){/^translate/i.test(a)?a="translate":/^scale/i.test(a)?a="scale":/^rotate/i.test(a)&&(a="rotate"),d[a]&&(c+=a+"("+d[a].join(" ")+") ",delete d[a]);});}else {var e,f;m.each(g(a).transformCache,function(b){return e=g(a).transformCache[b],"transformPerspective"===b?(f=e,!0):(9===n&&"rotateZ"===b&&(b="rotate"),void (c+=b+e+" "));}),f&&(c="perspective"+f+" "+c);}v.setPropertyValue(a,"transform",c);}};v.Hooks.register(),v.Normalizations.register(),t.hook=function(a,b,c){var e=d;return a=f(a),m.each(a,function(a,f){if(g(f)===d&&t.init(f),c===d)e===d&&(e=t.CSS.getPropertyValue(f,b));else {var h=t.CSS.setPropertyValue(f,b,c);"transform"===h[0]&&t.CSS.flushTransformCache(f),e=h;}}),e;};var w=function w(){function a(){return h?B.promise||null:i;}function e(){function a(a){function l(a,b){var c=d,e=d,g=d;return p.isArray(a)?(c=a[0],!p.isArray(a[1])&&/^[\d-]/.test(a[1])||p.isFunction(a[1])||v.RegEx.isHex.test(a[1])?g=a[1]:(p.isString(a[1])&&!v.RegEx.isHex.test(a[1])||p.isArray(a[1]))&&(e=b?a[1]:j(a[1],h.duration),a[2]!==d&&(g=a[2]))):c=a,b||(e=e||h.easing),p.isFunction(c)&&(c=c.call(f,y,x)),p.isFunction(g)&&(g=g.call(f,y,x)),[c||0,e,g];}function n(a,b){var c,d;return d=(b||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(a){return c=a,"";}),c||(c=v.Values.getUnitType(a)),[d,c];}function r(){var a={myParent:f.parentNode||c.body,position:v.getPropertyValue(f,"position"),fontSize:v.getPropertyValue(f,"fontSize")},d=a.position===I.lastPosition&&a.myParent===I.lastParent,e=a.fontSize===I.lastFontSize;I.lastParent=a.myParent,I.lastPosition=a.position,I.lastFontSize=a.fontSize;var h=100,i={};if(e&&d)i.emToPx=I.lastEmToPx,i.percentToPxWidth=I.lastPercentToPxWidth,i.percentToPxHeight=I.lastPercentToPxHeight;else {var j=g(f).isSVG?c.createElementNS("http://www.w3.org/2000/svg","rect"):c.createElement("div");t.init(j),a.myParent.appendChild(j),m.each(["overflow","overflowX","overflowY"],function(a,b){t.CSS.setPropertyValue(j,b,"hidden");}),t.CSS.setPropertyValue(j,"position",a.position),t.CSS.setPropertyValue(j,"fontSize",a.fontSize),t.CSS.setPropertyValue(j,"boxSizing","content-box"),m.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(a,b){t.CSS.setPropertyValue(j,b,h+"%");}),t.CSS.setPropertyValue(j,"paddingLeft",h+"em"),i.percentToPxWidth=I.lastPercentToPxWidth=(parseFloat(v.getPropertyValue(j,"width",null,!0))||1)/h,i.percentToPxHeight=I.lastPercentToPxHeight=(parseFloat(v.getPropertyValue(j,"height",null,!0))||1)/h,i.emToPx=I.lastEmToPx=(parseFloat(v.getPropertyValue(j,"paddingLeft"))||1)/h,a.myParent.removeChild(j);}return null===I.remToPx&&(I.remToPx=parseFloat(v.getPropertyValue(c.body,"fontSize"))||16),null===I.vwToPx&&(I.vwToPx=parseFloat(b.innerWidth)/100,I.vhToPx=parseFloat(b.innerHeight)/100),i.remToPx=I.remToPx,i.vwToPx=I.vwToPx,i.vhToPx=I.vhToPx,t.debug>=1&&console.log("Unit ratios: "+JSON.stringify(i),f),i;}if(h.begin&&0===y)try{h.begin.call(o,o);}catch(u){setTimeout(function(){throw u;},1);}if("scroll"===C){var w,z,A,D=/^x$/i.test(h.axis)?"Left":"Top",E=parseFloat(h.offset)||0;h.container?p.isWrapped(h.container)||p.isNode(h.container)?(h.container=h.container[0]||h.container,w=h.container["scroll"+D],A=w+m(f).position()[D.toLowerCase()]+E):h.container=null:(w=t.State.scrollAnchor[t.State["scrollProperty"+D]],z=t.State.scrollAnchor[t.State["scrollProperty"+("Left"===D?"Top":"Left")]],A=m(f).offset()[D.toLowerCase()]+E),i={scroll:{rootPropertyValue:!1,startValue:w,currentValue:w,endValue:A,unitType:"",easing:h.easing,scrollData:{container:h.container,direction:D,alternateValue:z}},element:f},t.debug&&console.log("tweensContainer (scroll): ",i.scroll,f);}else if("reverse"===C){if(!g(f).tweensContainer)return void m.dequeue(f,h.queue);"none"===g(f).opts.display&&(g(f).opts.display="auto"),"hidden"===g(f).opts.visibility&&(g(f).opts.visibility="visible"),g(f).opts.loop=!1,g(f).opts.begin=null,g(f).opts.complete=null,s.easing||delete h.easing,s.duration||delete h.duration,h=m.extend({},g(f).opts,h);var F=m.extend(!0,{},g(f).tweensContainer);for(var G in F){if("element"!==G){var H=F[G].startValue;F[G].startValue=F[G].currentValue=F[G].endValue,F[G].endValue=H,p.isEmptyObject(s)||(F[G].easing=h.easing),t.debug&&console.log("reverse tweensContainer ("+G+"): "+JSON.stringify(F[G]),f);}}i=F;}else if("start"===C){var F;g(f).tweensContainer&&g(f).isAnimating===!0&&(F=g(f).tweensContainer),m.each(q,function(a,b){if(RegExp("^"+v.Lists.colors.join("$|^")+"$").test(a)){var c=l(b,!0),e=c[0],f=c[1],g=c[2];if(v.RegEx.isHex.test(e)){for(var h=["Red","Green","Blue"],i=v.Values.hexToRgb(e),j=g?v.Values.hexToRgb(g):d,k=0;k<h.length;k++){var m=[i[k]];f&&m.push(f),j!==d&&m.push(j[k]),q[a+h[k]]=m;}delete q[a];}}});for(var K in q){var L=l(q[K]),M=L[0],N=L[1],O=L[2];K=v.Names.camelCase(K);var P=v.Hooks.getRoot(K),Q=!1;if(g(f).isSVG||"tween"===P||v.Names.prefixCheck(P)[1]!==!1||v.Normalizations.registered[P]!==d){(h.display!==d&&null!==h.display&&"none"!==h.display||h.visibility!==d&&"hidden"!==h.visibility)&&/opacity|filter/.test(K)&&!O&&0!==M&&(O=0),h._cacheValues&&F&&F[K]?(O===d&&(O=F[K].endValue+F[K].unitType),Q=g(f).rootPropertyValueCache[P]):v.Hooks.registered[K]?O===d?(Q=v.getPropertyValue(f,P),O=v.getPropertyValue(f,K,Q)):Q=v.Hooks.templates[P][1]:O===d&&(O=v.getPropertyValue(f,K));var R,S,T,U=!1;if(R=n(K,O),O=R[0],T=R[1],R=n(K,M),M=R[0].replace(/^([+-\/*])=/,function(a,b){return U=b,"";}),S=R[1],O=parseFloat(O)||0,M=parseFloat(M)||0,"%"===S&&(/^(fontSize|lineHeight)$/.test(K)?(M/=100,S="em"):/^scale/.test(K)?(M/=100,S=""):/(Red|Green|Blue)$/i.test(K)&&(M=M/100*255,S="")),/[\/*]/.test(U))S=T;else if(T!==S&&0!==O)if(0===M)S=T;else {e=e||r();var V=/margin|padding|left|right|width|text|word|letter/i.test(K)||/X$/.test(K)||"x"===K?"x":"y";switch(T){case "%":O*="x"===V?e.percentToPxWidth:e.percentToPxHeight;break;case "px":break;default:O*=e[T+"ToPx"];}switch(S){case "%":O*=1/("x"===V?e.percentToPxWidth:e.percentToPxHeight);break;case "px":break;default:O*=1/e[S+"ToPx"];}}switch(U){case "+":M=O+M;break;case "-":M=O-M;break;case "*":M=O*M;break;case "/":M=O/M;}i[K]={rootPropertyValue:Q,startValue:O,currentValue:O,endValue:M,unitType:S,easing:N},t.debug&&console.log("tweensContainer ("+K+"): "+JSON.stringify(i[K]),f);}else t.debug&&console.log("Skipping ["+P+"] due to a lack of browser support.");}i.element=f;}i.element&&(v.Values.addClass(f,"velocity-animating"),J.push(i),""===h.queue&&(g(f).tweensContainer=i,g(f).opts=h),g(f).isAnimating=!0,y===x-1?(t.State.calls.push([J,o,h,null,B.resolver]),t.State.isTicking===!1&&(t.State.isTicking=!0,k())):y++);}var e,f=this,h=m.extend({},t.defaults,s),i={};switch(g(f)===d&&t.init(f),parseFloat(h.delay)&&h.queue!==!1&&m.queue(f,h.queue,function(a){t.velocityQueueEntryFlag=!0,g(f).delayTimer={setTimeout:setTimeout(a,parseFloat(h.delay)),next:a};}),h.duration.toString().toLowerCase()){case "fast":h.duration=200;break;case "normal":h.duration=r;break;case "slow":h.duration=600;break;default:h.duration=parseFloat(h.duration)||1;}t.mock!==!1&&(t.mock===!0?h.duration=h.delay=1:(h.duration*=parseFloat(t.mock)||1,h.delay*=parseFloat(t.mock)||1)),h.easing=j(h.easing,h.duration),h.begin&&!p.isFunction(h.begin)&&(h.begin=null),h.progress&&!p.isFunction(h.progress)&&(h.progress=null),h.complete&&!p.isFunction(h.complete)&&(h.complete=null),h.display!==d&&null!==h.display&&(h.display=h.display.toString().toLowerCase(),"auto"===h.display&&(h.display=t.CSS.Values.getDisplayType(f))),h.visibility!==d&&null!==h.visibility&&(h.visibility=h.visibility.toString().toLowerCase()),h.mobileHA=h.mobileHA&&t.State.isMobile&&!t.State.isGingerbread,h.queue===!1?h.delay?setTimeout(a,h.delay):a():m.queue(f,h.queue,function(b,c){return c===!0?(B.promise&&B.resolver(o),!0):(t.velocityQueueEntryFlag=!0,void a(b));}),""!==h.queue&&"fx"!==h.queue||"inprogress"===m.queue(f)[0]||m.dequeue(f);}var h,i,n,o,q,s,u=arguments[0]&&(arguments[0].p||m.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||p.isString(arguments[0].properties));if(p.isWrapped(this)?(h=!1,n=0,o=this,i=this):(h=!0,n=1,o=u?arguments[0].elements||arguments[0].e:arguments[0]),o=f(o)){u?(q=arguments[0].properties||arguments[0].p,s=arguments[0].options||arguments[0].o):(q=arguments[n],s=arguments[n+1]);var x=o.length,y=0;if(!/^(stop|finish)$/i.test(q)&&!m.isPlainObject(s)){var z=n+1;s={};for(var A=z;A<arguments.length;A++){p.isArray(arguments[A])||!/^(fast|normal|slow)$/i.test(arguments[A])&&!/^\d/.test(arguments[A])?p.isString(arguments[A])||p.isArray(arguments[A])?s.easing=arguments[A]:p.isFunction(arguments[A])&&(s.complete=arguments[A]):s.duration=arguments[A];}}var B={promise:null,resolver:null,rejecter:null};h&&t.Promise&&(B.promise=new t.Promise(function(a,b){B.resolver=a,B.rejecter=b;}));var C;switch(q){case "scroll":C="scroll";break;case "reverse":C="reverse";break;case "finish":case "stop":m.each(o,function(a,b){g(b)&&g(b).delayTimer&&(clearTimeout(g(b).delayTimer.setTimeout),g(b).delayTimer.next&&g(b).delayTimer.next(),delete g(b).delayTimer);});var D=[];return m.each(t.State.calls,function(a,b){b&&m.each(b[1],function(c,e){var f=s===d?"":s;return f===!0||b[2].queue===f||s===d&&b[2].queue===!1?void m.each(o,function(c,d){d===e&&((s===!0||p.isString(s))&&(m.each(m.queue(d,p.isString(s)?s:""),function(a,b){p.isFunction(b)&&b(null,!0);}),m.queue(d,p.isString(s)?s:"",[])),"stop"===q?(g(d)&&g(d).tweensContainer&&f!==!1&&m.each(g(d).tweensContainer,function(a,b){b.endValue=b.currentValue;}),D.push(a)):"finish"===q&&(b[2].duration=1));}):!0;});}),"stop"===q&&(m.each(D,function(a,b){l(b,!0);}),B.promise&&B.resolver(o)),a();default:if(!m.isPlainObject(q)||p.isEmptyObject(q)){if(p.isString(q)&&t.Redirects[q]){var E=m.extend({},s),F=E.duration,G=E.delay||0;return E.backwards===!0&&(o=m.extend(!0,[],o).reverse()),m.each(o,function(a,b){parseFloat(E.stagger)?E.delay=G+parseFloat(E.stagger)*a:p.isFunction(E.stagger)&&(E.delay=G+E.stagger.call(b,a,x)),E.drag&&(E.duration=parseFloat(F)||(/^(callout|transition)/.test(q)?1e3:r),E.duration=Math.max(E.duration*(E.backwards?1-a/x:(a+1)/x),.75*E.duration,200)),t.Redirects[q].call(b,b,E||{},a,x,o,B.promise?B:d);}),a();}var H="Velocity: First argument ("+q+") was not a property map, a known action, or a registered redirect. Aborting.";return B.promise?B.rejecter(new Error(H)):console.log(H),a();}C="start";}var I={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},J=[];m.each(o,function(a,b){p.isNode(b)&&e.call(b);});var K,E=m.extend({},t.defaults,s);if(E.loop=parseInt(E.loop),K=2*E.loop-1,E.loop)for(var L=0;K>L;L++){var M={delay:E.delay,progress:E.progress};L===K-1&&(M.display=E.display,M.visibility=E.visibility,M.complete=E.complete),w(o,"reverse",M);}return a();}};t=m.extend(w,t),t.animate=w;var x=b.requestAnimationFrame||o;return t.State.isMobile||c.hidden===d||c.addEventListener("visibilitychange",function(){c.hidden?(x=function x(a){return setTimeout(function(){a(!0);},16);},k()):x=b.requestAnimationFrame||o;}),a.Velocity=t,a!==b&&(a.fn.velocity=w,a.fn.velocity.defaults=t.defaults),m.each(["Down","Up"],function(a,b){t.Redirects["slide"+b]=function(a,c,e,f,g,h){var i=m.extend({},c),j=i.begin,k=i.complete,l={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},n={};i.display===d&&(i.display="Down"===b?"inline"===t.CSS.Values.getDisplayType(a)?"inline-block":"block":"none"),i.begin=function(){j&&j.call(g,g);for(var c in l){n[c]=a.style[c];var d=t.CSS.getPropertyValue(a,c);l[c]="Down"===b?[d,0]:[0,d];}n.overflow=a.style.overflow,a.style.overflow="hidden";},i.complete=function(){for(var b in n){a.style[b]=n[b];}k&&k.call(g,g),h&&h.resolver(g);},t(a,l,i);};}),m.each(["In","Out"],function(a,b){t.Redirects["fade"+b]=function(a,c,e,f,g,h){var i=m.extend({},c),j={opacity:"In"===b?1:0},k=i.complete;i.complete=e!==f-1?i.begin=null:function(){k&&k.call(g,g),h&&h.resolver(g);},i.display===d&&(i.display="In"===b?"auto":"none"),t(this,j,i);};}),t;}(window.jQuery||window.Zepto||window,window,document);})),!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(k(a,c),b);}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1;}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;){b.call(c,a[e],e,a),e++;}else for(e in a){a.hasOwnProperty(e)&&b.call(c,a[e],e,a);}}function h(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;){(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;}return a;}function i(a,b){return h(a,b,!0);}function j(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&h(d,c);}function k(a,b){return function(){return a.apply(b,arguments);};}function l(a,b){return (typeof a==="undefined"?"undefined":_typeof(a))==ka?a.apply(b?b[0]||d:d,b):a;}function m(a,b){return a===d?b:a;}function n(a,b,c){g(r(b),function(b){a.addEventListener(b,c,!1);});}function o(a,b,c){g(r(b),function(b){a.removeEventListener(b,c,!1);});}function p(a,b){for(;a;){if(a==b)return !0;a=a.parentNode;}return !1;}function q(a,b){return a.indexOf(b)>-1;}function r(a){return a.trim().split(/\s+/g);}function s(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++;}return -1;}function t(a){return Array.prototype.slice.call(a,0);}function u(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];s(e,g)<0&&d.push(a[f]),e[f]=g,f++;}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b];}):d.sort()),d;}function v(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ia.length;){if(c=ia[g],e=c?c+f:b,e in a)return e;g++;}return d;}function w(){return oa++;}function x(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow;}function y(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){l(a.options.enable,[a])&&c.handler(b);},this.init();}function z(a){var b,c=a.options.inputClass;return new (b=c?c:ra?N:sa?Q:qa?S:M)(a,A);}function A(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&ya&&0===d-e,g=b&(Aa|Ba)&&0===d-e;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,B(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c;}function B(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=E(b)),e>1&&!c.firstMultiple?c.firstMultiple=E(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=F(d);b.timeStamp=na(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=J(h,i),b.distance=I(h,i),C(c,b),b.offsetDirection=H(b.deltaX,b.deltaY),b.scale=g?L(g.pointers,d):1,b.rotation=g?K(g.pointers,d):0,D(c,b);var j=a.element;p(b.srcEvent.target,j)&&(j=b.srcEvent.target),b.target=j;}function C(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===ya||f.eventType===Aa)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y);}function D(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Ba&&(i>xa||h.velocity===d)){var j=h.deltaX-b.deltaX,k=h.deltaY-b.deltaY,l=G(i,j,k);e=l.x,f=l.y,c=ma(l.x)>ma(l.y)?l.x:l.y,g=H(j,k),a.lastInterval=b;}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g;}function E(a){for(var b=[],c=0;c<a.pointers.length;){b[c]={clientX:la(a.pointers[c].clientX),clientY:la(a.pointers[c].clientY)},c++;}return {timeStamp:na(),pointers:b,center:F(b),deltaX:a.deltaX,deltaY:a.deltaY};}function F(a){var b=a.length;if(1===b)return {x:la(a[0].clientX),y:la(a[0].clientY)};for(var c=0,d=0,e=0;b>e;){c+=a[e].clientX,d+=a[e].clientY,e++;}return {x:la(c/b),y:la(d/b)};}function G(a,b,c){return {x:b/a||0,y:c/a||0};}function H(a,b){return a===b?Ca:ma(a)>=ma(b)?a>0?Da:Ea:b>0?Fa:Ga;}function I(a,b,c){c||(c=Ka);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e);}function J(a,b,c){c||(c=Ka);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI;}function K(a,b){return J(b[1],b[0],La)-J(a[1],a[0],La);}function L(a,b){return I(b[0],b[1],La)/I(a[0],a[1],La);}function M(){this.evEl=Na,this.evWin=Oa,this.allow=!0,this.pressed=!1,y.apply(this,arguments);}function N(){this.evEl=Ra,this.evWin=Sa,y.apply(this,arguments),this.store=this.manager.session.pointerEvents=[];}function O(){this.evTarget=Ua,this.evWin=Va,this.started=!1,y.apply(this,arguments);}function P(a,b){var c=t(a.touches),d=t(a.changedTouches);return b&(Aa|Ba)&&(c=u(c.concat(d),"identifier",!0)),[c,d];}function Q(){this.evTarget=Xa,this.targetIds={},y.apply(this,arguments);}function R(a,b){var c=t(a.touches),d=this.targetIds;if(b&(ya|za)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=t(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return p(a.target,i);}),b===ya)for(e=0;e<f.length;){d[f[e].identifier]=!0,e++;}for(e=0;e<g.length;){d[g[e].identifier]&&h.push(g[e]),b&(Aa|Ba)&&delete d[g[e].identifier],e++;}return h.length?[u(f.concat(h),"identifier",!0),h]:void 0;}function S(){y.apply(this,arguments);var a=k(this.handler,this);this.touch=new Q(this.manager,a),this.mouse=new M(this.manager,a);}function T(a,b){this.manager=a,this.set(b);}function U(a){if(q(a,bb))return bb;var b=q(a,cb),c=q(a,db);return b&&c?cb+" "+db:b||c?b?cb:db:q(a,ab)?ab:_a;}function V(a){this.id=w(),this.manager=null,this.options=i(a||{},this.defaults),this.options.enable=m(this.options.enable,!0),this.state=eb,this.simultaneous={},this.requireFail=[];}function W(a){return a&jb?"cancel":a&hb?"end":a&gb?"move":a&fb?"start":"";}function X(a){return a==Ga?"down":a==Fa?"up":a==Da?"left":a==Ea?"right":"";}function Y(a,b){var c=b.manager;return c?c.get(a):a;}function Z(){V.apply(this,arguments);}function $(){Z.apply(this,arguments),this.pX=null,this.pY=null;}function _(){Z.apply(this,arguments);}function aa(){V.apply(this,arguments),this._timer=null,this._input=null;}function ba(){Z.apply(this,arguments);}function ca(){Z.apply(this,arguments);}function da(){V.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0;}function ea(a,b){return b=b||{},b.recognizers=m(b.recognizers,ea.defaults.preset),new fa(a,b);}function fa(a,b){b=b||{},this.options=i(b,ea.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=z(this),this.touchAction=new T(this,this.options.touchAction),ga(this,!0),g(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3]);},this);}function ga(a,b){var c=a.element;g(a.options.cssProps,function(a,d){c.style[v(c.style,d)]=b?a:"";});}function ha(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d);}var ia=["","webkit","moz","MS","ms","o"],ja=b.createElement("div"),ka="function",la=Math.round,ma=Math.abs,na=Date.now,oa=1,pa=/mobile|tablet|ip(ad|hone|od)|android/i,qa="ontouchstart" in a,ra=v(a,"PointerEvent")!==d,sa=qa&&pa.test(navigator.userAgent),ta="touch",ua="pen",va="mouse",wa="kinect",xa=25,ya=1,za=2,Aa=4,Ba=8,Ca=1,Da=2,Ea=4,Fa=8,Ga=16,Ha=Da|Ea,Ia=Fa|Ga,Ja=Ha|Ia,Ka=["x","y"],La=["clientX","clientY"];y.prototype={handler:function handler(){},init:function init(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(x(this.element),this.evWin,this.domHandler);},destroy:function destroy(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(x(this.element),this.evWin,this.domHandler);}};var Ma={mousedown:ya,mousemove:za,mouseup:Aa},Na="mousedown",Oa="mousemove mouseup";j(M,y,{handler:function handler(a){var b=Ma[a.type];b&ya&&0===a.button&&(this.pressed=!0),b&za&&1!==a.which&&(b=Aa),this.pressed&&this.allow&&(b&Aa&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:va,srcEvent:a}));}});var Pa={pointerdown:ya,pointermove:za,pointerup:Aa,pointercancel:Ba,pointerout:Ba},Qa={2:ta,3:ua,4:va,5:wa},Ra="pointerdown",Sa="pointermove pointerup pointercancel";a.MSPointerEvent&&(Ra="MSPointerDown",Sa="MSPointerMove MSPointerUp MSPointerCancel"),j(N,y,{handler:function handler(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Pa[d],f=Qa[a.pointerType]||a.pointerType,g=f==ta,h=s(b,a.pointerId,"pointerId");e&ya&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Aa|Ba)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1));}});var Ta={touchstart:ya,touchmove:za,touchend:Aa,touchcancel:Ba},Ua="touchstart",Va="touchstart touchmove touchend touchcancel";j(O,y,{handler:function handler(a){var b=Ta[a.type];if(b===ya&&(this.started=!0),this.started){var c=P.call(this,a,b);b&(Aa|Ba)&&0===c[0].length-c[1].length&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:ta,srcEvent:a});}}});var Wa={touchstart:ya,touchmove:za,touchend:Aa,touchcancel:Ba},Xa="touchstart touchmove touchend touchcancel";j(Q,y,{handler:function handler(a){var b=Wa[a.type],c=R.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:ta,srcEvent:a});}}),j(S,y,{handler:function handler(a,b,c){var d=c.pointerType==ta,e=c.pointerType==va;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Aa|Ba)&&(this.mouse.allow=!0),this.callback(a,b,c);},destroy:function destroy(){this.touch.destroy(),this.mouse.destroy();}});var Ya=v(ja.style,"touchAction"),Za=Ya!==d,$a="compute",_a="auto",ab="manipulation",bb="none",cb="pan-x",db="pan-y";T.prototype={set:function set(a){a==$a&&(a=this.compute()),Za&&(this.manager.element.style[Ya]=a),this.actions=a.toLowerCase().trim();},update:function update(){this.set(this.manager.options.touchAction);},compute:function compute(){var a=[];return g(this.manager.recognizers,function(b){l(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()));}),U(a.join(" "));},preventDefaults:function preventDefaults(a){if(!Za){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=q(d,bb),f=q(d,db),g=q(d,cb);return e||f&&c&Ha||g&&c&Ia?this.preventSrc(b):void 0;}},preventSrc:function preventSrc(a){this.manager.session.prevented=!0,a.preventDefault();}};var eb=1,fb=2,gb=4,hb=8,ib=hb,jb=16,kb=32;V.prototype={defaults:{},set:function set(a){return h(this.options,a),this.manager&&this.manager.touchAction.update(),this;},recognizeWith:function recognizeWith(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=Y(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this;},dropRecognizeWith:function dropRecognizeWith(a){return f(a,"dropRecognizeWith",this)?this:(a=Y(a,this),delete this.simultaneous[a.id],this);},requireFailure:function requireFailure(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=Y(a,this),-1===s(b,a)&&(b.push(a),a.requireFailure(this)),this;},dropRequireFailure:function dropRequireFailure(a){if(f(a,"dropRequireFailure",this))return this;a=Y(a,this);var b=s(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this;},hasRequireFailures:function hasRequireFailures(){return this.requireFail.length>0;},canRecognizeWith:function canRecognizeWith(a){return !!this.simultaneous[a.id];},emit:function emit(a){function b(b){c.manager.emit(c.options.event+(b?W(d):""),a);}var c=this,d=this.state;hb>d&&b(!0),b(),d>=hb&&b(!0);},tryEmit:function tryEmit(a){return this.canEmit()?this.emit(a):void (this.state=kb);},canEmit:function canEmit(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(kb|eb)))return !1;a++;}return !0;},recognize:function recognize(a){var b=h({},a);return l(this.options.enable,[this,b])?(this.state&(ib|jb|kb)&&(this.state=eb),this.state=this.process(b),void (this.state&(fb|gb|hb|jb)&&this.tryEmit(b))):(this.reset(),void (this.state=kb));},process:function process(){},getTouchAction:function getTouchAction(){},reset:function reset(){}},j(Z,V,{defaults:{pointers:1},attrTest:function attrTest(a){var b=this.options.pointers;return 0===b||a.pointers.length===b;},process:function process(a){var b=this.state,c=a.eventType,d=b&(fb|gb),e=this.attrTest(a);return d&&(c&Ba||!e)?b|jb:d||e?c&Aa?b|hb:b&fb?b|gb:fb:kb;}}),j($,Z,{defaults:{event:"pan",threshold:10,pointers:1,direction:Ja},getTouchAction:function getTouchAction(){var a=this.options.direction,b=[];return a&Ha&&b.push(db),a&Ia&&b.push(cb),b;},directionTest:function directionTest(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Ha?(e=0===f?Ca:0>f?Da:Ea,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ca:0>g?Fa:Ga,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction;},attrTest:function attrTest(a){return Z.prototype.attrTest.call(this,a)&&(this.state&fb||!(this.state&fb)&&this.directionTest(a));},emit:function emit(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a);}}),j(_,Z,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function getTouchAction(){return [bb];},attrTest:function attrTest(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&fb);},emit:function emit(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a);}}}),j(aa,V,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function getTouchAction(){return [_a];},process:function process(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Aa|Ba)&&!f)this.reset();else if(a.eventType&ya)this.reset(),this._timer=e(function(){this.state=ib,this.tryEmit();},b.time,this);else if(a.eventType&Aa)return ib;return kb;},reset:function reset(){clearTimeout(this._timer);},emit:function emit(a){this.state===ib&&(a&&a.eventType&Aa?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=na(),this.manager.emit(this.options.event,this._input)));}}),j(ba,Z,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function getTouchAction(){return [bb];},attrTest:function attrTest(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&fb);}}),j(ca,Z,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Ha|Ia,pointers:1},getTouchAction:function getTouchAction(){return $.prototype.getTouchAction.call(this);},attrTest:function attrTest(a){var b,c=this.options.direction;return c&(Ha|Ia)?b=a.velocity:c&Ha?b=a.velocityX:c&Ia&&(b=a.velocityY),this._super.attrTest.call(this,a)&&c&a.direction&&a.distance>this.options.threshold&&ma(b)>this.options.velocity&&a.eventType&Aa;},emit:function emit(a){var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a);}}),j(da,V,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function getTouchAction(){return [ab];},process:function process(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&ya&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Aa)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||I(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=ib,this.tryEmit();},b.interval,this),fb):ib;}return kb;},failTimeout:function failTimeout(){return this._timer=e(function(){this.state=kb;},this.options.interval,this),kb;},reset:function reset(){clearTimeout(this._timer);},emit:function emit(){this.state==ib&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input));}}),ea.VERSION="2.0.4",ea.defaults={domEvents:!1,touchAction:$a,enable:!0,inputTarget:null,inputClass:null,preset:[[ba,{enable:!1}],[_,{enable:!1},["rotate"]],[ca,{direction:Ha}],[$,{direction:Ha},["swipe"]],[da],[da,{event:"doubletap",taps:2},["tap"]],[aa]],cssProps:{userSelect:"default",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var lb=1,mb=2;fa.prototype={set:function set(a){return h(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this;},stop:function stop(a){this.session.stopped=a?mb:lb;},recognize:function recognize(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&ib)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;){c=d[f],b.stopped===mb||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(fb|gb|hb)&&(e=b.curRecognizer=c),f++;}}},get:function get(a){if(a instanceof V)return a;for(var b=this.recognizers,c=0;c<b.length;c++){if(b[c].options.event==a)return b[c];}return null;},add:function add(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a;},remove:function remove(a){if(f(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(s(b,a),1),this.touchAction.update(),this;},on:function on(a,b){var c=this.handlers;return g(r(a),function(a){c[a]=c[a]||[],c[a].push(b);}),this;},off:function off(a,b){var c=this.handlers;return g(r(a),function(a){b?c[a].splice(s(c[a],b),1):delete c[a];}),this;},emit:function emit(a,b){this.options.domEvents&&ha(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault();};for(var d=0;d<c.length;){c[d](b),d++;}}},destroy:function destroy(){this.element&&ga(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null;}},h(ea,{INPUT_START:ya,INPUT_MOVE:za,INPUT_END:Aa,INPUT_CANCEL:Ba,STATE_POSSIBLE:eb,STATE_BEGAN:fb,STATE_CHANGED:gb,STATE_ENDED:hb,STATE_RECOGNIZED:ib,STATE_CANCELLED:jb,STATE_FAILED:kb,DIRECTION_NONE:Ca,DIRECTION_LEFT:Da,DIRECTION_RIGHT:Ea,DIRECTION_UP:Fa,DIRECTION_DOWN:Ga,DIRECTION_HORIZONTAL:Ha,DIRECTION_VERTICAL:Ia,DIRECTION_ALL:Ja,Manager:fa,Input:y,TouchAction:T,TouchInput:Q,MouseInput:M,PointerEventInput:N,TouchMouseInput:S,SingleTouchInput:O,Recognizer:V,AttrRecognizer:Z,Tap:da,Pan:$,Swipe:ca,Pinch:_,Rotate:ba,Press:aa,on:n,off:o,each:g,merge:i,extend:h,inherit:j,bindFn:k,prefixed:v}),(typeof define==="undefined"?"undefined":_typeof(define))==ka&&define.amd?define(function(){return ea;}):"undefined"!=typeof module&&module.exports?module.exports=ea:a[c]=ea;}(window,document,"Hammer"),function(a){"function"==typeof define&&define.amd?define(["jquery","hammerjs"],a):"object"==(typeof exports==="undefined"?"undefined":_typeof(exports))?a(require("jquery"),require("hammerjs")):a(jQuery,Hammer);}(function(a,b){function c(c,d){var e=a(c);e.data("hammer")||e.data("hammer",new b(e[0],d));}a.fn.hammer=function(a){return this.each(function(){c(this,a);});},b.Manager.prototype.emit=function(b){return function(c,d){b.call(this,c,d),a(this.element).trigger({type:c,gesture:d});};}(b.Manager.prototype.emit);}),function(a){a.Package?Materialize={}:a.Materialize={};}(window),Materialize.guid=function(){function a(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1);}return function(){return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a();};}(),Materialize.elementOrParentIsFixed=function(a){var b=$(a),c=b.add(b.parents()),d=!1;return c.each(function(){return "fixed"===$(this).css("position")?(d=!0,!1):void 0;}),d;};var Vel;Vel=$?$.Velocity:jQuery?jQuery.Velocity:Velocity,function(a){a.fn.collapsible=function(b){var c={accordion:void 0};return b=a.extend(c,b),this.each(function(){function c(b){h=g.find("> li > .collapsible-header"),b.hasClass("active")?b.parent().addClass("active"):b.parent().removeClass("active"),b.parent().hasClass("active")?b.siblings(".collapsible-body").stop(!0,!1).slideDown({duration:350,easing:"easeOutQuart",queue:!1,complete:function complete(){a(this).css("height","");}}):b.siblings(".collapsible-body").stop(!0,!1).slideUp({duration:350,easing:"easeOutQuart",queue:!1,complete:function complete(){a(this).css("height","");}}),h.not(b).removeClass("active").parent().removeClass("active"),h.not(b).parent().children(".collapsible-body").stop(!0,!1).slideUp({duration:350,easing:"easeOutQuart",queue:!1,complete:function complete(){a(this).css("height","");}});}function d(b){b.hasClass("active")?b.parent().addClass("active"):b.parent().removeClass("active"),b.parent().hasClass("active")?b.siblings(".collapsible-body").stop(!0,!1).slideDown({duration:350,easing:"easeOutQuart",queue:!1,complete:function complete(){a(this).css("height","");}}):b.siblings(".collapsible-body").stop(!0,!1).slideUp({duration:350,easing:"easeOutQuart",queue:!1,complete:function complete(){a(this).css("height","");}});}function e(a){var b=f(a);return b.length>0;}function f(a){return a.closest("li > .collapsible-header");}var g=a(this),h=a(this).find("> li > .collapsible-header"),i=g.data("collapsible");g.off("click.collapse","> li > .collapsible-header"),h.off("click.collapse"),g.on("click.collapse","> li > .collapsible-header",function(g){var h=a(this),j=a(g.target);e(j)&&(j=f(j)),j.toggleClass("active"),b.accordion||"accordion"===i||void 0===i?c(j):(d(j),h.hasClass("active")&&d(h));});var h=g.find("> li > .collapsible-header");b.accordion||"accordion"===i||void 0===i?c(h.filter(".active").first()):h.filter(".active").each(function(){d(a(this));});});},a(document).ready(function(){a(".collapsible").collapsible();});}(jQuery),function(a){a.fn.scrollTo=function(b){return a(this).scrollTop(a(this).scrollTop()-a(this).offset().top+a(b).offset().top),this;},a.fn.dropdown=function(b){var c={inDuration:300,outDuration:225,constrain_width:!0,hover:!1,gutter:0,belowOrigin:!1,alignment:"left"};this.each(function(){function d(){void 0!==g.data("induration")&&(h.inDuration=g.data("inDuration")),void 0!==g.data("outduration")&&(h.outDuration=g.data("outDuration")),void 0!==g.data("constrainwidth")&&(h.constrain_width=g.data("constrainwidth")),void 0!==g.data("hover")&&(h.hover=g.data("hover")),void 0!==g.data("gutter")&&(h.gutter=g.data("gutter")),void 0!==g.data("beloworigin")&&(h.belowOrigin=g.data("beloworigin")),void 0!==g.data("alignment")&&(h.alignment=g.data("alignment"));}function e(b){"focus"===b&&(i=!0),d(),j.addClass("active"),g.addClass("active"),h.constrain_width===!0?j.css("width",g.outerWidth()):j.css("white-space","nowrap");var c=window.innerHeight,e=g.innerHeight(),f=g.offset().left,k=g.offset().top-a(window).scrollTop(),l=h.alignment,m=0,n=0,o=0;h.belowOrigin===!0&&(o=e);var p=0,q=g.parent();if(!q.is("body")&&q[0].scrollHeight>q[0].clientHeight&&(p=q[0].scrollTop),f+j.innerWidth()>a(window).width()?l="right":f-j.innerWidth()+g.innerWidth()<0&&(l="left"),k+j.innerHeight()>c)if(k+e-j.innerHeight()<0){var r=c-k-o;j.css("max-height",r);}else o||(o+=e),o-=j.innerHeight();if("left"===l)m=h.gutter,n=g.position().left+m;else if("right"===l){var s=g.position().left+g.outerWidth()-j.outerWidth();m=-h.gutter,n=s+m;}j.css({position:"absolute",top:g.position().top+o+p,left:n}),j.stop(!0,!0).css("opacity",0).slideDown({queue:!1,duration:h.inDuration,easing:"easeOutCubic",complete:function complete(){a(this).css("height","");}}).animate({opacity:1},{queue:!1,duration:h.inDuration,easing:"easeOutSine"});}function f(){i=!1,j.fadeOut(h.outDuration),j.removeClass("active"),g.removeClass("active"),setTimeout(function(){j.css("max-height","");},h.outDuration);}var g=a(this),h=a.extend({},c,b),i=!1,j=a("#"+g.attr("data-activates"));if(d(),g.after(j),h.hover){var k=!1;g.unbind("click."+g.attr("id")),g.on("mouseenter",function(a){k===!1&&(e(),k=!0);}),g.on("mouseleave",function(b){var c=b.toElement||b.relatedTarget;a(c).closest(".dropdown-content").is(j)||(j.stop(!0,!0),f(),k=!1);}),j.on("mouseleave",function(b){var c=b.toElement||b.relatedTarget;a(c).closest(".dropdown-button").is(g)||(j.stop(!0,!0),f(),k=!1);});}else g.unbind("click."+g.attr("id")),g.bind("click."+g.attr("id"),function(b){i||(g[0]!=b.currentTarget||g.hasClass("active")||0!==a(b.target).closest(".dropdown-content").length?g.hasClass("active")&&(f(),a(document).unbind("click."+j.attr("id")+" touchstart."+j.attr("id"))):(b.preventDefault(),e("click")),j.hasClass("active")&&a(document).bind("click."+j.attr("id")+" touchstart."+j.attr("id"),function(b){j.is(b.target)||g.is(b.target)||g.find(b.target).length||(f(),a(document).unbind("click."+j.attr("id")+" touchstart."+j.attr("id")));}));});g.on("open",function(a,b){e(b);}),g.on("close",f);});},a(document).ready(function(){a(".dropdown-button").dropdown();});}(jQuery),function(a){var b=0,c=0,d=function d(){return c++,"materialize-lean-overlay-"+c;};a.fn.extend({openModal:function openModal(c){var e=a("body"),f=e.innerWidth();e.css("overflow","hidden"),e.width(f);var g={opacity:.5,in_duration:350,out_duration:250,ready:void 0,complete:void 0,dismissible:!0,starting_top:"4%"},h=a(this);h.hasClass("open")||(overlayID=d(),$overlay=a('<div class="lean-overlay"></div>'),lStack=++b,$overlay.attr("id",overlayID).css("z-index",1e3+2*lStack),h.data("overlay-id",overlayID).css("z-index",1e3+2*lStack+1),h.addClass("open"),a("body").append($overlay),c=a.extend(g,c),c.dismissible&&($overlay.click(function(){h.closeModal(c);}),a(document).on("keyup.leanModal"+overlayID,function(a){27===a.keyCode&&h.closeModal(c);})),h.find(".modal-close").on("click.close",function(a){h.closeModal(c);}),$overlay.css({display:"block",opacity:0}),h.css({display:"block",opacity:0}),$overlay.velocity({opacity:c.opacity},{duration:c.in_duration,queue:!1,ease:"easeOutCubic"}),h.data("associated-overlay",$overlay[0]),h.hasClass("bottom-sheet")?h.velocity({bottom:"0",opacity:1},{duration:c.in_duration,queue:!1,ease:"easeOutCubic",complete:function complete(){"function"==typeof c.ready&&c.ready();}}):(a.Velocity.hook(h,"scaleX",.7),h.css({top:c.starting_top}),h.velocity({top:"10%",opacity:1,scaleX:"1"},{duration:c.in_duration,queue:!1,ease:"easeOutCubic",complete:function complete(){"function"==typeof c.ready&&c.ready();}})));}}),a.fn.extend({closeModal:function closeModal(c){var d={out_duration:250,complete:void 0},e=a(this),f=e.data("overlay-id"),g=a("#"+f);e.removeClass("open"),c=a.extend(d,c),a("body").css({overflow:"",width:""}),e.find(".modal-close").off("click.close"),a(document).off("keyup.leanModal"+f),g.velocity({opacity:0},{duration:c.out_duration,queue:!1,ease:"easeOutQuart"}),e.hasClass("bottom-sheet")?e.velocity({bottom:"-100%",opacity:0},{duration:c.out_duration,queue:!1,ease:"easeOutCubic",complete:function complete(){g.css({display:"none"}),"function"==typeof c.complete&&c.complete(),g.remove(),b--;}}):e.velocity({top:c.starting_top,opacity:0,scaleX:.7},{duration:c.out_duration,complete:function complete(){a(this).css("display","none"),"function"==typeof c.complete&&c.complete(),g.remove(),b--;}});}}),a.fn.extend({leanModal:function leanModal(b){return this.each(function(){var c={starting_top:"4%"},d=a.extend(c,b);a(this).click(function(b){d.starting_top=(a(this).offset().top-a(window).scrollTop())/1.15;var c=a(this).attr("href")||"#"+a(this).data("target");a(c).openModal(d),b.preventDefault();});});}});}(jQuery),function(a){a.fn.materialbox=function(){return this.each(function(){function b(){f=!1;var b=i.parent(".material-placeholder"),d=(window.innerWidth,window.innerHeight,i.data("width")),g=i.data("height");i.velocity("stop",!0),a("#materialbox-overlay").velocity("stop",!0),a(".materialbox-caption").velocity("stop",!0),a("#materialbox-overlay").velocity({opacity:0},{duration:h,queue:!1,easing:"easeOutQuad",complete:function complete(){e=!1,a(this).remove();}}),i.velocity({width:d,height:g,left:0,top:0},{duration:h,queue:!1,easing:"easeOutQuad"}),a(".materialbox-caption").velocity({opacity:0},{duration:h,queue:!1,easing:"easeOutQuad",complete:function complete(){b.css({height:"",width:"",position:"",top:"",left:""}),i.css({height:"",top:"",left:"",width:"","max-width":"",position:"","z-index":""}),i.removeClass("active"),f=!0,a(this).remove(),c&&c.css("overflow","");}});}if(!a(this).hasClass("initialized")){a(this).addClass("initialized");var c,d,e=!1,f=!0,g=275,h=200,i=a(this),j=a("<div></div>").addClass("material-placeholder");i.wrap(j),i.on("click",function(){var h=i.parent(".material-placeholder"),j=window.innerWidth,k=window.innerHeight,l=i.width(),m=i.height();if(f===!1)return b(),!1;if(e&&f===!0)return b(),!1;f=!1,i.addClass("active"),e=!0,h.css({width:h[0].getBoundingClientRect().width,height:h[0].getBoundingClientRect().height,position:"relative",top:0,left:0}),c=void 0,d=h[0].parentNode;for(;null!==d&&!a(d).is(document);){var n=a(d);"visible"!==n.css("overflow")&&(n.css("overflow","visible"),c=void 0===c?n:c.add(n)),d=d.parentNode;}i.css({position:"absolute","z-index":1e3}).data("width",l).data("height",m);var o=a('<div id="materialbox-overlay"></div>').css({opacity:0}).click(function(){f===!0&&b();});if(i.before(o),o.velocity({opacity:1},{duration:g,queue:!1,easing:"easeOutQuad"}),""!==i.data("caption")){var p=a('<div class="materialbox-caption"></div>');p.text(i.data("caption")),a("body").append(p),p.css({display:"inline"}),p.velocity({opacity:1},{duration:g,queue:!1,easing:"easeOutQuad"});}var q=0,r=l/j,s=m/k,t=0,u=0;r>s?(q=m/l,t=.9*j,u=.9*j*q):(q=l/m,t=.9*k*q,u=.9*k),i.hasClass("responsive-img")?i.velocity({"max-width":t,width:l},{duration:0,queue:!1,complete:function complete(){i.css({left:0,top:0}).velocity({height:u,width:t,left:a(document).scrollLeft()+j/2-i.parent(".material-placeholder").offset().left-t/2,top:a(document).scrollTop()+k/2-i.parent(".material-placeholder").offset().top-u/2},{duration:g,queue:!1,easing:"easeOutQuad",complete:function complete(){f=!0;}});}}):i.css("left",0).css("top",0).velocity({height:u,width:t,left:a(document).scrollLeft()+j/2-i.parent(".material-placeholder").offset().left-t/2,top:a(document).scrollTop()+k/2-i.parent(".material-placeholder").offset().top-u/2},{duration:g,queue:!1,easing:"easeOutQuad",complete:function complete(){f=!0;}});}),a(window).scroll(function(){e&&b();}),a(document).keyup(function(a){27===a.keyCode&&f===!0&&e&&b();});}});},a(document).ready(function(){a(".materialboxed").materialbox();});}(jQuery),function(a){a.fn.parallax=function(){var b=a(window).width();return this.each(function(c){function d(c){var d;d=601>b?e.height()>0?e.height():e.children("img").height():e.height()>0?e.height():500;var f=e.children("img").first(),g=f.height(),h=g-d,i=e.offset().top+d,j=e.offset().top,k=a(window).scrollTop(),l=window.innerHeight,m=k+l,n=(m-j)/(d+l),o=Math.round(h*n);c&&f.css("display","block"),i>k&&k+l>j&&f.css("transform","translate3D(-50%,"+o+"px, 0)");}var e=a(this);e.addClass("parallax"),e.children("img").one("load",function(){d(!0);}).each(function(){this.complete&&a(this).load();}),a(window).scroll(function(){b=a(window).width(),d(!1);}),a(window).resize(function(){b=a(window).width(),d(!1);});});};}(jQuery),function(a){var b={init:function init(){return this.each(function(){var b=a(this);a(window).width();b.width("100%");var c,d,e=b.find("li.tab a"),f=b.width(),g=Math.max(f,b[0].scrollWidth)/e.length,h=0;c=a(e.filter('[href="'+location.hash+'"]')),0===c.length&&(c=a(this).find("li.tab a.active").first()),0===c.length&&(c=a(this).find("li.tab a").first()),c.addClass("active"),h=e.index(c),0>h&&(h=0),void 0!==c[0]&&(d=a(c[0].hash)),b.append('<div class="indicator"></div>');var i=b.find(".indicator");b.is(":visible")&&(i.css({right:f-(h+1)*g}),i.css({left:h*g})),a(window).resize(function(){f=b.width(),g=Math.max(f,b[0].scrollWidth)/e.length,0>h&&(h=0),0!==g&&0!==f&&(i.css({right:f-(h+1)*g}),i.css({left:h*g}));}),e.not(c).each(function(){a(this.hash).hide();}),b.on("click","a",function(j){if(a(this).parent().hasClass("disabled"))return void j.preventDefault();f=b.width(),g=Math.max(f,b[0].scrollWidth)/e.length,c.removeClass("active"),void 0!==d&&d.hide(),c=a(this),d=a(this.hash),e=b.find("li.tab a"),c.addClass("active");var k=h;h=e.index(a(this)),0>h&&(h=0),void 0!==d&&d.show(),h-k>=0?(i.velocity({right:f-(h+1)*g},{duration:300,queue:!1,easing:"easeOutQuad"}),i.velocity({left:h*g},{duration:300,queue:!1,easing:"easeOutQuad",delay:90})):(i.velocity({left:h*g},{duration:300,queue:!1,easing:"easeOutQuad"}),i.velocity({right:f-(h+1)*g},{duration:300,queue:!1,easing:"easeOutQuad",delay:90})),j.preventDefault();});});},select_tab:function select_tab(a){this.find('a[href="#'+a+'"]').trigger("click");}};a.fn.tabs=function(c){return b[c]?b[c].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=(typeof c==="undefined"?"undefined":_typeof(c))&&c?void a.error("Method "+c+" does not exist on jQuery.tooltip"):b.init.apply(this,arguments);},a(document).ready(function(){a("ul.tabs").tabs();});}(jQuery),function(a){a.fn.tooltip=function(c){var d=5,e={delay:350};return "remove"===c?(this.each(function(){a("#"+a(this).attr("data-tooltip-id")).remove(),a(this).off("mouseenter.tooltip mouseleave.tooltip");}),!1):(c=a.extend(e,c),this.each(function(){var e=Materialize.guid(),f=a(this);f.attr("data-tooltip-id",e);var g=a("<span></span>").text(f.attr("data-tooltip")),h=a("<div></div>");h.addClass("material-tooltip").append(g).appendTo(a("body")).attr("id",e);var i=a("<div></div>").addClass("backdrop");i.appendTo(h),i.css({top:0,left:0}),f.off("mouseenter.tooltip mouseleave.tooltip");var j,k=!1;f.on({"mouseenter.tooltip":function mouseenterTooltip(a){var e=f.attr("data-delay");e=void 0===e||""===e?c.delay:e,j=setTimeout(function(){k=!0,h.velocity("stop"),i.velocity("stop"),h.css({display:"block",left:"0px",top:"0px"}),h.children("span").text(f.attr("data-tooltip"));var a,c,e,g=f.outerWidth(),j=f.outerHeight(),l=f.attr("data-position"),m=h.outerHeight(),n=h.outerWidth(),o="0px",p="0px",q=8;"top"===l?(a=f.offset().top-m-d,c=f.offset().left+g/2-n/2,e=b(c,a,n,m),o="-10px",i.css({borderRadius:"14px 14px 0 0",transformOrigin:"50% 90%",marginTop:m,marginLeft:n/2-i.width()/2})):"left"===l?(a=f.offset().top+j/2-m/2,c=f.offset().left-n-d,e=b(c,a,n,m),p="-10px",i.css({width:"14px",height:"14px",borderRadius:"14px 0 0 14px",transformOrigin:"95% 50%",marginTop:m/2,marginLeft:n})):"right"===l?(a=f.offset().top+j/2-m/2,c=f.offset().left+g+d,e=b(c,a,n,m),p="+10px",i.css({width:"14px",height:"14px",borderRadius:"0 14px 14px 0",transformOrigin:"5% 50%",marginTop:m/2,marginLeft:"0px"})):(a=f.offset().top+f.outerHeight()+d,c=f.offset().left+g/2-n/2,e=b(c,a,n,m),o="+10px",i.css({marginLeft:n/2-i.width()/2})),h.css({top:e.y,left:e.x}),q=n/8,8>q&&(q=8),("right"===l||"left"===l)&&(q=n/10,6>q&&(q=6)),h.velocity({marginTop:o,marginLeft:p},{duration:350,queue:!1}).velocity({opacity:1},{duration:300,delay:50,queue:!1}),i.css({display:"block"}).velocity({opacity:1},{duration:55,delay:0,queue:!1}).velocity({scale:q},{duration:300,delay:0,queue:!1,easing:"easeInOutQuad"});},e);},"mouseleave.tooltip":function mouseleaveTooltip(){k=!1,clearTimeout(j),setTimeout(function(){1!=k&&(h.velocity({opacity:0,marginTop:0,marginLeft:0},{duration:225,queue:!1}),i.velocity({opacity:0,scale:1},{duration:225,queue:!1,complete:function complete(){i.css("display","none"),h.css("display","none"),k=!1;}}));},225);}});}));};var b=function b(_b,c,d,e){var f=_b,g=c;return 0>f?f=4:f+d>window.innerWidth&&(f-=f+d-window.innerWidth),0>g?g=4:g+e>window.innerHeight+a(window).scrollTop&&(g-=g+e-window.innerHeight),{x:f,y:g};};a(document).ready(function(){a(".tooltipped").tooltip();});}(jQuery),function(a){"use strict";function b(a){return null!==a&&a===a.window;}function c(a){return b(a)?a:9===a.nodeType&&a.defaultView;}function d(a){var b,d,e={top:0,left:0},f=a&&a.ownerDocument;return b=f.documentElement,"undefined"!=typeof a.getBoundingClientRect&&(e=a.getBoundingClientRect()),d=c(f),{top:e.top+d.pageYOffset-b.clientTop,left:e.left+d.pageXOffset-b.clientLeft};}function e(a){var b="";for(var c in a){a.hasOwnProperty(c)&&(b+=c+":"+a[c]+";");}return b;}function f(a){if(k.allowEvent(a)===!1)return null;for(var b=null,c=a.target||a.srcElement;null!==c.parentElement;){if(!(c instanceof SVGElement||-1===c.className.indexOf("waves-effect"))){b=c;break;}if(c.classList.contains("waves-effect")){b=c;break;}c=c.parentElement;}return b;}function g(b){var c=f(b);null!==c&&(j.show(b,c),"ontouchstart" in a&&(c.addEventListener("touchend",j.hide,!1),c.addEventListener("touchcancel",j.hide,!1)),c.addEventListener("mouseup",j.hide,!1),c.addEventListener("mouseleave",j.hide,!1));}var h=h||{},i=document.querySelectorAll.bind(document),j={duration:750,show:function show(a,b){if(2===a.button)return !1;var c=b||this,f=document.createElement("div");f.className="waves-ripple",c.appendChild(f);var g=d(c),h=a.pageY-g.top,i=a.pageX-g.left,k="scale("+c.clientWidth/100*10+")";"touches" in a&&(h=a.touches[0].pageY-g.top,i=a.touches[0].pageX-g.left),f.setAttribute("data-hold",Date.now()),f.setAttribute("data-scale",k),f.setAttribute("data-x",i),f.setAttribute("data-y",h);var l={top:h+"px",left:i+"px"};f.className=f.className+" waves-notransition",f.setAttribute("style",e(l)),f.className=f.className.replace("waves-notransition",""),l["-webkit-transform"]=k,l["-moz-transform"]=k,l["-ms-transform"]=k,l["-o-transform"]=k,l.transform=k,l.opacity="1",l["-webkit-transition-duration"]=j.duration+"ms",l["-moz-transition-duration"]=j.duration+"ms",l["-o-transition-duration"]=j.duration+"ms",l["transition-duration"]=j.duration+"ms",l["-webkit-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",l["-moz-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",l["-o-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",l["transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",f.setAttribute("style",e(l));},hide:function hide(a){k.touchup(a);var b=this,c=(1.4*b.clientWidth,null),d=b.getElementsByClassName("waves-ripple");if(!(d.length>0))return !1;c=d[d.length-1];var f=c.getAttribute("data-x"),g=c.getAttribute("data-y"),h=c.getAttribute("data-scale"),i=Date.now()-Number(c.getAttribute("data-hold")),l=350-i;0>l&&(l=0),setTimeout(function(){var a={top:g+"px",left:f+"px",opacity:"0","-webkit-transition-duration":j.duration+"ms","-moz-transition-duration":j.duration+"ms","-o-transition-duration":j.duration+"ms","transition-duration":j.duration+"ms","-webkit-transform":h,"-moz-transform":h,"-ms-transform":h,"-o-transform":h,transform:h};c.setAttribute("style",e(a)),setTimeout(function(){try{b.removeChild(c);}catch(a){return !1;}},j.duration);},l);},wrapInput:function wrapInput(a){for(var b=0;b<a.length;b++){var c=a[b];if("input"===c.tagName.toLowerCase()){var d=c.parentNode;if("i"===d.tagName.toLowerCase()&&-1!==d.className.indexOf("waves-effect"))continue;var e=document.createElement("i");e.className=c.className+" waves-input-wrapper";var f=c.getAttribute("style");f||(f=""),e.setAttribute("style",f),c.className="waves-button-input",c.removeAttribute("style"),d.replaceChild(e,c),e.appendChild(c);}}}},k={touches:0,allowEvent:function allowEvent(a){var b=!0;return "touchstart"===a.type?k.touches+=1:"touchend"===a.type||"touchcancel"===a.type?setTimeout(function(){k.touches>0&&(k.touches-=1);},500):"mousedown"===a.type&&k.touches>0&&(b=!1),b;},touchup:function touchup(a){k.allowEvent(a);}};h.displayEffect=function(b){b=b||{},"duration" in b&&(j.duration=b.duration),j.wrapInput(i(".waves-effect")),"ontouchstart" in a&&document.body.addEventListener("touchstart",g,!1),document.body.addEventListener("mousedown",g,!1);},h.attach=function(b){"input"===b.tagName.toLowerCase()&&(j.wrapInput([b]),b=b.parentElement),"ontouchstart" in a&&b.addEventListener("touchstart",g,!1),b.addEventListener("mousedown",g,!1);},a.Waves=h,document.addEventListener("DOMContentLoaded",function(){h.displayEffect();},!1);}(window),Materialize.toast=function(a,b,c,d){function e(a){var b=document.createElement("div");if(b.classList.add("toast"),c)for(var e=c.split(" "),f=0,g=e.length;g>f;f++){b.classList.add(e[f]);}("object"==(typeof HTMLElement==="undefined"?"undefined":_typeof(HTMLElement))?a instanceof HTMLElement:a&&"object"==(typeof a==="undefined"?"undefined":_typeof(a))&&null!==a&&1===a.nodeType&&"string"==typeof a.nodeName)?b.appendChild(a):a instanceof jQuery?b.appendChild(a[0]):b.innerHTML=a;var h=new Hammer(b,{prevent_default:!1});return h.on("pan",function(a){var c=a.deltaX,d=80;b.classList.contains("panning")||b.classList.add("panning");var e=1-Math.abs(c/d);0>e&&(e=0),Vel(b,{left:c,opacity:e},{duration:50,queue:!1,easing:"easeOutQuad"});}),h.on("panend",function(a){var c=a.deltaX,e=80;Math.abs(c)>e?Vel(b,{marginTop:"-40px"},{duration:375,easing:"easeOutExpo",queue:!1,complete:function complete(){"function"==typeof d&&d(),b.parentNode.removeChild(b);}}):(b.classList.remove("panning"),Vel(b,{left:0,opacity:1},{duration:300,easing:"easeOutExpo",queue:!1}));}),b;}c=c||"";var f=document.getElementById("toast-container");null===f&&(f=document.createElement("div"),f.id="toast-container",document.body.appendChild(f));var g=e(a);a&&f.appendChild(g),g.style.top="35px",g.style.opacity=0,Vel(g,{top:"0px",opacity:1},{duration:300,easing:"easeOutCubic",queue:!1});var h=b,i=setInterval(function(){null===g.parentNode&&window.clearInterval(i),g.classList.contains("panning")||(h-=20),0>=h&&(Vel(g,{opacity:0,marginTop:"-40px"},{duration:375,easing:"easeOutExpo",queue:!1,complete:function complete(){"function"==typeof d&&d(),this[0].parentNode.removeChild(this[0]);}}),window.clearInterval(i));},20);},function(a){var b={init:function init(b){var c={menuWidth:240,edge:"left",closeOnClick:!1};b=a.extend(c,b),a(this).each(function(){function c(c){g=!1,h=!1,a("body").css({overflow:"",width:""}),a("#sidenav-overlay").velocity({opacity:0},{duration:200,queue:!1,easing:"easeOutQuad",complete:function complete(){a(this).remove();}}),"left"===b.edge?(f.css({width:"",right:"",left:"0"}),e.velocity({translateX:"-100%"},{duration:200,queue:!1,easing:"easeOutCubic",complete:function complete(){c===!0&&(e.removeAttr("style"),e.css("width",b.menuWidth));}})):(f.css({width:"",right:"0",left:""}),e.velocity({translateX:"100%"},{duration:200,queue:!1,easing:"easeOutCubic",complete:function complete(){c===!0&&(e.removeAttr("style"),e.css("width",b.menuWidth));}}));}var d=a(this),e=a("#"+d.attr("data-activates"));240!=b.menuWidth&&e.css("width",b.menuWidth);var f=a('<div class="drag-target"></div>');a("body").append(f),"left"==b.edge?(e.css("transform","translateX(-100%)"),f.css({left:0})):(e.addClass("right-aligned").css("transform","translateX(100%)"),f.css({right:0})),e.hasClass("fixed")&&window.innerWidth>992&&e.css("transform","translateX(0)"),e.hasClass("fixed")&&a(window).resize(function(){window.innerWidth>992?0!=a("#sidenav-overlay").length&&h?c(!0):e.css("transform","translateX(0%)"):h===!1&&("left"===b.edge?e.css("transform","translateX(-100%)"):e.css("transform","translateX(100%)"));}),b.closeOnClick===!0&&e.on("click.itemclick","a:not(.collapsible-header)",function(){c();});var g=!1,h=!1;f.on("click",function(){c();}),f.hammer({prevent_default:!1}).bind("pan",function(d){if("touch"==d.gesture.pointerType){var f=(d.gesture.direction,d.gesture.center.x),g=(d.gesture.center.y,d.gesture.velocityX,a("body")),i=g.innerWidth();if(g.css("overflow","hidden"),g.width(i),0===a("#sidenav-overlay").length){var j=a('<div id="sidenav-overlay"></div>');j.css("opacity",0).click(function(){c();}),a("body").append(j);}if("left"===b.edge&&(f>b.menuWidth?f=b.menuWidth:0>f&&(f=0)),"left"===b.edge)f<b.menuWidth/2?h=!1:f>=b.menuWidth/2&&(h=!0),e.css("transform","translateX("+(f-b.menuWidth)+"px)");else {f<window.innerWidth-b.menuWidth/2?h=!0:f>=window.innerWidth-b.menuWidth/2&&(h=!1);var k=f-b.menuWidth/2;0>k&&(k=0),e.css("transform","translateX("+k+"px)");}var l;"left"===b.edge?(l=f/b.menuWidth,a("#sidenav-overlay").velocity({opacity:l},{duration:10,queue:!1,easing:"easeOutQuad"})):(l=Math.abs((f-window.innerWidth)/b.menuWidth),a("#sidenav-overlay").velocity({opacity:l},{duration:10,queue:!1,easing:"easeOutQuad"}));}}).bind("panend",function(c){if("touch"==c.gesture.pointerType){var d=c.gesture.velocityX,i=c.gesture.center.x,j=i-b.menuWidth,k=i-b.menuWidth/2;j>0&&(j=0),0>k&&(k=0),g=!1,"left"===b.edge?h&&.3>=d||-.5>d?(0!=j&&e.velocity({translateX:[0,j]},{duration:300,queue:!1,easing:"easeOutQuad"}),a("#sidenav-overlay").velocity({opacity:1},{duration:50,queue:!1,easing:"easeOutQuad"}),f.css({width:"50%",right:0,left:""})):(!h||d>.3)&&(a("body").css({overflow:"",width:""}),e.velocity({translateX:[-1*b.menuWidth-10,j]},{duration:200,queue:!1,easing:"easeOutQuad"}),a("#sidenav-overlay").velocity({opacity:0},{duration:200,queue:!1,easing:"easeOutQuad",complete:function complete(){a(this).remove();}}),f.css({width:"10px",right:"",left:0})):h&&d>=-.3||d>.5?(e.velocity({translateX:[0,k]},{duration:300,queue:!1,easing:"easeOutQuad"}),a("#sidenav-overlay").velocity({opacity:1},{duration:50,queue:!1,easing:"easeOutQuad"}),f.css({width:"50%",right:"",left:0})):(!h||-.3>d)&&(a("body").css({overflow:"",width:""}),e.velocity({translateX:[b.menuWidth+10,k]},{duration:200,queue:!1,easing:"easeOutQuad"}),a("#sidenav-overlay").velocity({opacity:0},{duration:200,queue:!1,easing:"easeOutQuad",complete:function complete(){a(this).remove();}}),f.css({width:"10px",right:0,left:""}));}}),d.click(function(){if(h===!0)h=!1,g=!1,c();else {var d=a("body"),i=d.innerWidth();d.css("overflow","hidden"),d.width(i),a("body").append(f),"left"===b.edge?(f.css({width:"50%",right:0,left:""}),e.velocity({translateX:[0,-1*b.menuWidth]},{duration:300,queue:!1,easing:"easeOutQuad"})):(f.css({width:"50%",right:"",left:0}),e.velocity({translateX:[0,b.menuWidth]},{duration:300,queue:!1,easing:"easeOutQuad"}));var j=a('<div id="sidenav-overlay"></div>');j.css("opacity",0).click(function(){h=!1,g=!1,c(),j.velocity({opacity:0},{duration:300,queue:!1,easing:"easeOutQuad",complete:function complete(){a(this).remove();}});}),a("body").append(j),j.velocity({opacity:1},{duration:300,queue:!1,easing:"easeOutQuad",complete:function complete(){h=!0,g=!1;}});}return !1;});});},show:function show(){this.trigger("click");},hide:function hide(){a("#sidenav-overlay").trigger("click");}};a.fn.sideNav=function(c){return b[c]?b[c].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=(typeof c==="undefined"?"undefined":_typeof(c))&&c?void a.error("Method "+c+" does not exist on jQuery.sideNav"):b.init.apply(this,arguments);};}(jQuery),function(a){function b(b,c,d,e){var f=a();return a.each(g,function(a,g){if(g.height()>0){var h=g.offset().top,i=g.offset().left,j=i+g.width(),k=h+g.height(),l=!(i>c||e>j||h>d||b>k);l&&f.push(g);}}),f;}function c(){++j;var c=f.scrollTop(),d=f.scrollLeft(),e=d+f.width(),g=c+f.height(),i=b(c+k.top+200,e+k.right,g+k.bottom,d+k.left);a.each(i,function(a,b){var c=b.data("scrollSpy:ticks");"number"!=typeof c&&b.triggerHandler("scrollSpy:enter"),b.data("scrollSpy:ticks",j);}),a.each(h,function(a,b){var c=b.data("scrollSpy:ticks");"number"==typeof c&&c!==j&&(b.triggerHandler("scrollSpy:exit"),b.data("scrollSpy:ticks",null));}),h=i;}function d(){f.trigger("scrollSpy:winSize");}function e(a,b,c){var d,e,f,g=null,h=0;c||(c={});var i=function i(){h=c.leading===!1?0:l(),g=null,f=a.apply(d,e),d=e=null;};return function(){var j=l();h||c.leading!==!1||(h=j);var k=b-(j-h);return d=this,e=arguments,0>=k?(clearTimeout(g),g=null,h=j,f=a.apply(d,e),d=e=null):g||c.trailing===!1||(g=setTimeout(i,k)),f;};}var f=a(window),g=[],h=[],i=!1,j=0,k={top:0,right:0,bottom:0,left:0},l=Date.now||function(){return new Date().getTime();};a.scrollSpy=function(b,d){var h=[];b=a(b),b.each(function(b,c){g.push(a(c)),a(c).data("scrollSpy:id",b),a('a[href="#'+a(c).attr("id")+'"]').click(function(b){b.preventDefault();var c=a(this.hash).offset().top+1;a("html, body").animate({scrollTop:c-200},{duration:400,queue:!1,easing:"easeOutCubic"});});}),d=d||{throttle:100},k.top=d.offsetTop||0,k.right=d.offsetRight||0,k.bottom=d.offsetBottom||0,k.left=d.offsetLeft||0;var j=e(c,d.throttle||100),l=function l(){a(document).ready(j);};return i||(f.on("scroll",l),f.on("resize",l),i=!0),setTimeout(l,0),b.on("scrollSpy:enter",function(){h=a.grep(h,function(a){return 0!=a.height();});var b=a(this);h[0]?(a('a[href="#'+h[0].attr("id")+'"]').removeClass("active"),b.data("scrollSpy:id")<h[0].data("scrollSpy:id")?h.unshift(a(this)):h.push(a(this))):h.push(a(this)),a('a[href="#'+h[0].attr("id")+'"]').addClass("active");}),b.on("scrollSpy:exit",function(){if(h=a.grep(h,function(a){return 0!=a.height();}),h[0]){a('a[href="#'+h[0].attr("id")+'"]').removeClass("active");var b=a(this);h=a.grep(h,function(a){return a.attr("id")!=b.attr("id");}),h[0]&&a('a[href="#'+h[0].attr("id")+'"]').addClass("active");}}),b;},a.winSizeSpy=function(b){return a.winSizeSpy=function(){return f;},b=b||{throttle:100},f.on("resize",e(d,b.throttle||100));},a.fn.scrollSpy=function(b){return a.scrollSpy(a(this),b);};}(jQuery),function(a){a(document).ready(function(){function b(b){var c=b.css("font-family"),d=b.css("font-size");d&&e.css("font-size",d),c&&e.css("font-family",c),"off"===b.attr("wrap")&&e.css("overflow-wrap","normal").css("white-space","pre"),e.text(b.val()+"\n");var f=e.html().replace(/\n/g,"<br>");e.html(f),b.is(":visible")?e.css("width",b.width()):e.css("width",a(window).width()/2),b.css("height",e.height());}Materialize.updateTextFields=function(){var b="input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";a(b).each(function(b,c){a(c).val().length>0||c.autofocus||void 0!==a(this).attr("placeholder")||a(c)[0].validity.badInput===!0?a(this).siblings("label, i").addClass("active"):a(this).siblings("label, i").removeClass("active");});};var c="input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";a(document).on("change",c,function(){(0!==a(this).val().length||void 0!==a(this).attr("placeholder"))&&a(this).siblings("label").addClass("active"),validate_field(a(this));}),a(document).ready(function(){Materialize.updateTextFields();}),a(document).on("reset",function(b){var d=a(b.target);d.is("form")&&(d.find(c).removeClass("valid").removeClass("invalid"),d.find(c).each(function(){""===a(this).attr("value")&&a(this).siblings("label, i").removeClass("active");}),d.find("select.initialized").each(function(){var a=d.find("option[selected]").text();d.siblings("input.select-dropdown").val(a);}));}),a(document).on("focus",c,function(){a(this).siblings("label, i").addClass("active");}),a(document).on("blur",c,function(){var b=a(this);0===b.val().length&&b[0].validity.badInput!==!0&&void 0===b.attr("placeholder")&&b.siblings("label, i").removeClass("active"),0===b.val().length&&b[0].validity.badInput!==!0&&void 0!==b.attr("placeholder")&&b.siblings("i").removeClass("active"),validate_field(b);}),window.validate_field=function(a){var b=void 0!==a.attr("length"),c=parseInt(a.attr("length")),d=a.val().length;0===a.val().length&&a[0].validity.badInput===!1?a.hasClass("validate")&&(a.removeClass("valid"),a.removeClass("invalid")):a.hasClass("validate")&&(a.is(":valid")&&b&&c>=d||a.is(":valid")&&!b?(a.removeClass("invalid"),a.addClass("valid")):(a.removeClass("valid"),a.addClass("invalid")));};var d="input[type=radio], input[type=checkbox]";a(document).on("keyup.radio",d,function(b){if(9===b.which){a(this).addClass("tabbed");var c=a(this);return void c.one("blur",function(b){a(this).removeClass("tabbed");});}});var e=a(".hiddendiv").first();e.length||(e=a('<div class="hiddendiv common"></div>'),a("body").append(e));var f=".materialize-textarea";a(f).each(function(){var c=a(this);c.val().length&&b(c);}),a("body").on("keyup keydown autoresize",f,function(){b(a(this));}),a(document).on("change",'.file-field input[type="file"]',function(){for(var b=a(this).closest(".file-field"),c=b.find("input.file-path"),d=a(this)[0].files,e=[],f=0;f<d.length;f++){e.push(d[f].name);}c.val(e.join(", ")),c.trigger("change");});var g,h="input[type=range]",i=!1;a(h).each(function(){var b=a('<span class="thumb"><span class="value"></span></span>');a(this).after(b);});var j=".range-field";a(document).on("change",h,function(b){var c=a(this).siblings(".thumb");c.find(".value").html(a(this).val());}),a(document).on("input mousedown touchstart",h,function(b){var c=a(this).siblings(".thumb"),d=a(this).outerWidth();c.length<=0&&(c=a('<span class="thumb"><span class="value"></span></span>'),a(this).after(c)),c.find(".value").html(a(this).val()),i=!0,a(this).addClass("active"),c.hasClass("active")||c.velocity({height:"30px",width:"30px",top:"-20px",marginLeft:"-15px"},{duration:300,easing:"easeOutExpo"}),"input"!==b.type&&(g=void 0===b.pageX||null===b.pageX?b.originalEvent.touches[0].pageX-a(this).offset().left:b.pageX-a(this).offset().left,0>g?g=0:g>d&&(g=d),c.addClass("active").css("left",g)),c.find(".value").html(a(this).val());}),a(document).on("mouseup touchend",j,function(){i=!1,a(this).removeClass("active");}),a(document).on("mousemove touchmove",j,function(b){var c,d=a(this).children(".thumb");if(i){d.hasClass("active")||d.velocity({height:"30px",width:"30px",top:"-20px",marginLeft:"-15px"},{duration:300,easing:"easeOutExpo"}),c=void 0===b.pageX||null===b.pageX?b.originalEvent.touches[0].pageX-a(this).offset().left:b.pageX-a(this).offset().left;var e=a(this).outerWidth();0>c?c=0:c>e&&(c=e),d.addClass("active").css("left",c),d.find(".value").html(d.siblings(h).val());}}),a(document).on("mouseout touchleave",j,function(){if(!i){var b=a(this).children(".thumb");b.hasClass("active")&&b.velocity({height:"0",width:"0",top:"10px",marginLeft:"-6px"},{duration:100}),b.removeClass("active");}});}),a.fn.material_select=function(b){function c(a,b,c){var e=a.indexOf(b),f=-1===e;return f?a.push(b):a.splice(e,1),c.siblings("ul.dropdown-content").find("li").eq(b).toggleClass("active"),c.find("option").eq(b).prop("selected",f),d(a,c),f;}function d(a,b){for(var c="",d=0,e=a.length;e>d;d++){var f=b.find("option").eq(a[d]).text();c+=0===d?f:", "+f;}""===c&&(c=b.find("option:disabled").eq(0).text()),b.siblings("input.select-dropdown").val(c);}a(this).each(function(){var d=a(this);if(!d.hasClass("browser-default")){var e=d.attr("multiple")?!0:!1,f=d.data("select-id");if(f&&(d.parent().find("span.caret").remove(),d.parent().find("input").remove(),d.unwrap(),a("ul#select-options-"+f).remove()),"destroy"===b)return void d.data("select-id",null).removeClass("initialized");var g=Materialize.guid();d.data("select-id",g);var h=a('<div class="select-wrapper"></div>');h.addClass(d.attr("class"));var i=a('<ul id="select-options-'+g+'" class="dropdown-content select-dropdown '+(e?"multiple-select-dropdown":"")+'"></ul>'),j=d.children("option, optgroup"),k=[],l=!1,m=d.find("option:selected").html()||d.find("option:first").html()||"",n=function n(b,c,d){var e=c.is(":disabled")?"disabled ":"",f="optgroup-option"===d?"optgroup-option ":"",g=c.data("icon"),h=c.attr("class");if(g){var j="";return h&&(j=' class="'+h+'"'),"multiple"===d?i.append(a('<li class="'+e+'"><img src="'+g+'"'+j+'><span><input type="checkbox"'+e+"/><label></label>"+c.html()+"</span></li>")):i.append(a('<li class="'+e+f+'"><img src="'+g+'"'+j+"><span>"+c.html()+"</span></li>")),!0;}"multiple"===d?i.append(a('<li class="'+e+'"><span><input type="checkbox"'+e+"/><label></label>"+c.html()+"</span></li>")):i.append(a('<li class="'+e+f+'"><span>'+c.html()+"</span></li>"));};j.length&&j.each(function(){if(a(this).is("option"))e?n(d,a(this),"multiple"):n(d,a(this));else if(a(this).is("optgroup")){var b=a(this).children("option");i.append(a('<li class="optgroup"><span>'+a(this).attr("label")+"</span></li>")),b.each(function(){n(d,a(this),"optgroup-option");});}}),i.find("li:not(.optgroup)").each(function(f){a(this).click(function(g){if(!a(this).hasClass("disabled")&&!a(this).hasClass("optgroup")){var h=!0;e?(a('input[type="checkbox"]',this).prop("checked",function(a,b){return !b;}),h=c(k,a(this).index(),d),q.trigger("focus")):(i.find("li").removeClass("active"),a(this).toggleClass("active"),q.val(a(this).text())),r(i,a(this)),d.find("option").eq(f).prop("selected",h),d.trigger("change"),"undefined"!=typeof b&&b();}g.stopPropagation();});}),d.wrap(h);var o=a('<span class="caret">&#9660;</span>');d.is(":disabled")&&o.addClass("disabled");var p=m.replace(/"/g,"&quot;"),q=a('<input type="text" class="select-dropdown" readonly="true" '+(d.is(":disabled")?"disabled":"")+' data-activates="select-options-'+g+'" value="'+p+'"/>');d.before(q),q.before(o),q.after(i),d.is(":disabled")||q.dropdown({hover:!1,closeOnClick:!1}),d.attr("tabindex")&&a(q[0]).attr("tabindex",d.attr("tabindex")),d.addClass("initialized"),q.on({focus:function focus(){if(a("ul.select-dropdown").not(i[0]).is(":visible")&&a("input.select-dropdown").trigger("close"),!i.is(":visible")){a(this).trigger("open",["focus"]);var b=a(this).val(),c=i.find("li").filter(function(){return a(this).text().toLowerCase()===b.toLowerCase();})[0];r(i,c);}},click:function click(a){a.stopPropagation();}}),q.on("blur",function(){e||a(this).trigger("close"),i.find("li.selected").removeClass("selected");}),i.hover(function(){l=!0;},function(){l=!1;}),a(window).on({click:function click(){e&&(l||q.trigger("close"));}}),e&&d.find("option:selected:not(:disabled)").each(function(){var b=a(this).index();c(k,b,d),i.find("li").eq(b).find(":checkbox").prop("checked",!0);});var r=function r(b,c){if(c){b.find("li.selected").removeClass("selected");var d=a(c);d.addClass("selected"),i.scrollTo(d);}},s=[],t=function t(b){if(9==b.which)return void q.trigger("close");if(40==b.which&&!i.is(":visible"))return void q.trigger("open");if(13!=b.which||i.is(":visible")){b.preventDefault();var c=String.fromCharCode(b.which).toLowerCase(),d=[9,13,27,38,40];if(c&&-1===d.indexOf(b.which)){s.push(c);var f=s.join(""),g=i.find("li").filter(function(){return 0===a(this).text().toLowerCase().indexOf(f);})[0];g&&r(i,g);}if(13==b.which){var h=i.find("li.selected:not(.disabled)")[0];h&&(a(h).trigger("click"),e||q.trigger("close"));}40==b.which&&(g=i.find("li.selected").length?i.find("li.selected").next("li:not(.disabled)")[0]:i.find("li:not(.disabled)")[0],r(i,g)),27==b.which&&q.trigger("close"),38==b.which&&(g=i.find("li.selected").prev("li:not(.disabled)")[0],g&&r(i,g)),setTimeout(function(){s=[];},1e3);}};q.on("keydown",t);}});};}(jQuery),function(a){var b={init:function init(b){var c={indicators:!0,height:400,transition:500,interval:6e3};return b=a.extend(c,b),this.each(function(){function c(a,b){a.hasClass("center-align")?a.velocity({opacity:0,translateY:-100},{duration:b,queue:!1}):a.hasClass("right-align")?a.velocity({opacity:0,translateX:100},{duration:b,queue:!1}):a.hasClass("left-align")&&a.velocity({opacity:0,translateX:-100},{duration:b,queue:!1});}function d(a){a>=j.length?a=0:0>a&&(a=j.length-1),k=i.find(".active").index(),k!=a&&(e=j.eq(k),$caption=e.find(".caption"),e.removeClass("active"),e.velocity({opacity:0},{duration:b.transition,queue:!1,easing:"easeOutQuad",complete:function complete(){j.not(".active").velocity({opacity:0,translateX:0,translateY:0},{duration:0,queue:!1});}}),c($caption,b.transition),b.indicators&&f.eq(k).removeClass("active"),j.eq(a).velocity({opacity:1},{duration:b.transition,queue:!1,easing:"easeOutQuad"}),j.eq(a).find(".caption").velocity({opacity:1,translateX:0,translateY:0},{duration:b.transition,delay:b.transition,queue:!1,easing:"easeOutQuad"}),j.eq(a).addClass("active"),b.indicators&&f.eq(a).addClass("active"));}var e,f,g,h=a(this),i=h.find("ul.slides").first(),j=i.find("li"),k=i.find(".active").index();-1!=k&&(e=j.eq(k)),h.hasClass("fullscreen")||(b.indicators?h.height(b.height+40):h.height(b.height),i.height(b.height)),j.find(".caption").each(function(){c(a(this),0);}),j.find("img").each(function(){var b="data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";a(this).attr("src")!==b&&(a(this).css("background-image","url("+a(this).attr("src")+")"),a(this).attr("src",b));}),b.indicators&&(f=a('<ul class="indicators"></ul>'),j.each(function(c){var e=a('<li class="indicator-item"></li>');e.click(function(){var c=i.parent(),e=c.find(a(this)).index();d(e),clearInterval(g),g=setInterval(function(){k=i.find(".active").index(),j.length==k+1?k=0:k+=1,d(k);},b.transition+b.interval);}),f.append(e);}),h.append(f),f=h.find("ul.indicators").find("li.indicator-item")),e?e.show():(j.first().addClass("active").velocity({opacity:1},{duration:b.transition,queue:!1,easing:"easeOutQuad"}),k=0,e=j.eq(k),b.indicators&&f.eq(k).addClass("active")),e.find("img").each(function(){e.find(".caption").velocity({opacity:1,translateX:0,translateY:0},{duration:b.transition,queue:!1,easing:"easeOutQuad"});}),g=setInterval(function(){k=i.find(".active").index(),d(k+1);},b.transition+b.interval);var l=!1,m=!1,n=!1;h.hammer({prevent_default:!1}).bind("pan",function(a){if("touch"===a.gesture.pointerType){clearInterval(g);var b=a.gesture.direction,c=a.gesture.deltaX,d=a.gesture.velocityX;$curr_slide=i.find(".active"),$curr_slide.velocity({translateX:c},{duration:50,queue:!1,easing:"easeOutQuad"}),4===b&&(c>h.innerWidth()/2||-.65>d)?n=!0:2===b&&(c<-1*h.innerWidth()/2||d>.65)&&(m=!0);var e;m&&(e=$curr_slide.next(),0===e.length&&(e=j.first()),e.velocity({opacity:1},{duration:300,queue:!1,easing:"easeOutQuad"})),n&&(e=$curr_slide.prev(),0===e.length&&(e=j.last()),e.velocity({opacity:1},{duration:300,queue:!1,easing:"easeOutQuad"}));}}).bind("panend",function(a){"touch"===a.gesture.pointerType&&($curr_slide=i.find(".active"),l=!1,curr_index=i.find(".active").index(),!n&&!m||j.length<=1?$curr_slide.velocity({translateX:0},{duration:300,queue:!1,easing:"easeOutQuad"}):m?(d(curr_index+1),$curr_slide.velocity({translateX:-1*h.innerWidth()},{duration:300,queue:!1,easing:"easeOutQuad",complete:function complete(){$curr_slide.velocity({opacity:0,translateX:0},{duration:0,queue:!1});}})):n&&(d(curr_index-1),$curr_slide.velocity({translateX:h.innerWidth()},{duration:300,queue:!1,easing:"easeOutQuad",complete:function complete(){$curr_slide.velocity({opacity:0,translateX:0},{duration:0,queue:!1});}})),m=!1,n=!1,clearInterval(g),g=setInterval(function(){k=i.find(".active").index(),j.length==k+1?k=0:k+=1,d(k);},b.transition+b.interval));}),h.on("sliderPause",function(){clearInterval(g);}),h.on("sliderStart",function(){clearInterval(g),g=setInterval(function(){k=i.find(".active").index(),j.length==k+1?k=0:k+=1,d(k);},b.transition+b.interval);}),h.on("sliderNext",function(){k=i.find(".active").index(),d(k+1);}),h.on("sliderPrev",function(){k=i.find(".active").index(),d(k-1);});});},pause:function pause(){a(this).trigger("sliderPause");},start:function start(){a(this).trigger("sliderStart");},next:function next(){a(this).trigger("sliderNext");},prev:function prev(){a(this).trigger("sliderPrev");}};a.fn.slider=function(c){return b[c]?b[c].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=(typeof c==="undefined"?"undefined":_typeof(c))&&c?void a.error("Method "+c+" does not exist on jQuery.tooltip"):b.init.apply(this,arguments);};}(jQuery),function(a){a(document).ready(function(){a(document).on("click.card",".card",function(b){a(this).find("> .card-reveal").length&&(a(b.target).is(a(".card-reveal .card-title"))||a(b.target).is(a(".card-reveal .card-title i"))?a(this).find(".card-reveal").velocity({translateY:0},{duration:225,queue:!1,easing:"easeInOutQuad",complete:function complete(){a(this).css({display:"none"});}}):(a(b.target).is(a(".card .activator"))||a(b.target).is(a(".card .activator i")))&&(a(b.target).closest(".card").css("overflow","hidden"),a(this).find(".card-reveal").css({display:"block"}).velocity("stop",!1).velocity({translateY:"-100%"},{duration:300,queue:!1,easing:"easeInOutQuad"}))),a(".card-reveal").closest(".card").css("overflow","hidden");});});}(jQuery),function(a){a(document).ready(function(){a(document).on("click.chip",".chip .material-icons",function(b){a(this).parent().remove();});});}(jQuery),function(a){a.fn.pushpin=function(b){var c={top:0,bottom:1/0,offset:0};return b=a.extend(c,b),$index=0,this.each(function(){function c(a){a.removeClass("pin-top"),a.removeClass("pinned"),a.removeClass("pin-bottom");}function d(d,e){d.each(function(){b.top<=e&&b.bottom>=e&&!a(this).hasClass("pinned")&&(c(a(this)),a(this).css("top",b.offset),a(this).addClass("pinned")),e<b.top&&!a(this).hasClass("pin-top")&&(c(a(this)),a(this).css("top",0),a(this).addClass("pin-top")),e>b.bottom&&!a(this).hasClass("pin-bottom")&&(c(a(this)),a(this).addClass("pin-bottom"),a(this).css("top",b.bottom-g));});}var e=Materialize.guid(),f=a(this),g=a(this).offset().top;d(f,a(window).scrollTop()),a(window).on("scroll."+e,function(){var c=a(window).scrollTop()+b.offset;d(f,c);});});};}(jQuery),function(a){a(document).ready(function(){a.fn.reverse=[].reverse,a(document).on("mouseenter.fixedActionBtn",".fixed-action-btn:not(.click-to-toggle)",function(c){var d=a(this);b(d);}),a(document).on("mouseleave.fixedActionBtn",".fixed-action-btn:not(.click-to-toggle)",function(b){var d=a(this);c(d);}),a(document).on("click.fixedActionBtn",".fixed-action-btn.click-to-toggle > a",function(d){var e=a(this),f=e.parent();f.hasClass("active")?c(f):b(f);});}),a.fn.extend({openFAB:function openFAB(){b(a(this));},closeFAB:function closeFAB(){c(a(this));}});var b=function b(_b2){if($this=_b2,$this.hasClass("active")===!1){var c,d,e=$this.hasClass("horizontal");e===!0?d=40:c=40,$this.addClass("active"),$this.find("ul .btn-floating").velocity({scaleY:".4",scaleX:".4",translateY:c+"px",translateX:d+"px"},{duration:0});var f=0;$this.find("ul .btn-floating").reverse().each(function(){a(this).velocity({opacity:"1",scaleX:"1",scaleY:"1",translateY:"0",translateX:"0"},{duration:80,delay:f}),f+=40;});}},c=function c(a){$this=a;var b,c,d=$this.hasClass("horizontal");d===!0?c=40:b=40,$this.removeClass("active");$this.find("ul .btn-floating").velocity("stop",!0),$this.find("ul .btn-floating").velocity({opacity:"0",scaleX:".4",scaleY:".4",translateY:b+"px",translateX:c+"px"},{duration:80});};}(jQuery),function(a){Materialize.fadeInImage=function(b){var c=a(b);c.css({opacity:0}),a(c).velocity({opacity:1},{duration:650,queue:!1,easing:"easeOutSine"}),a(c).velocity({opacity:1},{duration:1300,queue:!1,easing:"swing",step:function step(b,c){c.start=100;var d=b/100,e=150-(100-b)/1.75;100>e&&(e=100),b>=0&&a(this).css({"-webkit-filter":"grayscale("+d+")brightness("+e+"%)",filter:"grayscale("+d+")brightness("+e+"%)"});}});},Materialize.showStaggeredList=function(b){var c=0;a(b).find("li").velocity({translateX:"-100px"},{duration:0}),a(b).find("li").each(function(){a(this).velocity({opacity:"1",translateX:"0"},{duration:800,delay:c,easing:[60,10]}),c+=120;});},a(document).ready(function(){var b=!1,c=!1;a(".dismissable").each(function(){a(this).hammer({prevent_default:!1}).bind("pan",function(d){if("touch"===d.gesture.pointerType){var e=a(this),f=d.gesture.direction,g=d.gesture.deltaX,h=d.gesture.velocityX;e.velocity({translateX:g},{duration:50,queue:!1,easing:"easeOutQuad"}),4===f&&(g>e.innerWidth()/2||-.75>h)&&(b=!0),2===f&&(g<-1*e.innerWidth()/2||h>.75)&&(c=!0);}}).bind("panend",function(d){if(Math.abs(d.gesture.deltaX)<a(this).innerWidth()/2&&(c=!1,b=!1),"touch"===d.gesture.pointerType){var e=a(this);if(b||c){var f;f=b?e.innerWidth():-1*e.innerWidth(),e.velocity({translateX:f},{duration:100,queue:!1,easing:"easeOutQuad",complete:function complete(){e.css("border","none"),e.velocity({height:0,padding:0},{duration:200,queue:!1,easing:"easeOutQuad",complete:function complete(){e.remove();}});}});}else e.velocity({translateX:0},{duration:100,queue:!1,easing:"easeOutQuad"});b=!1,c=!1;}});});});}(jQuery),function(a){Materialize.scrollFire=function(a){var b=!1;window.addEventListener("scroll",function(){b=!0;}),setInterval(function(){if(b){b=!1;for(var c=window.pageYOffset+window.innerHeight,d=0;d<a.length;d++){var e=a[d],f=e.selector,g=e.offset,h=e.callback,i=document.querySelector(f);if(null!==i){var j=i.getBoundingClientRect().top+window.pageYOffset;if(c>j+g&&e.done!==!0){if("function"==typeof h)h.call(this);else if("string"==typeof h){var k=new Function(h);k();}e.done=!0;}}}}},100);};}(jQuery),function(a){"function"==typeof define&&define.amd?define("picker",["jquery"],a):"object"==(typeof exports==="undefined"?"undefined":_typeof(exports))?module.exports=a(require("jquery")):this.Picker=a(jQuery);}(function(a){function b(f,g,i,l){function m(){return b._.node("div",b._.node("div",b._.node("div",b._.node("div",y.component.nodes(t.open),v.box),v.wrap),v.frame),v.holder);}function n(){w.data(g,y).addClass(v.input).attr("tabindex",-1).val(w.data("value")?y.get("select",u.format):f.value),u.editable||w.on("focus."+t.id+" click."+t.id,function(a){a.preventDefault(),y.$root.eq(0).focus();}).on("keydown."+t.id,q),e(f,{haspopup:!0,expanded:!1,readonly:!1,owns:f.id+"_root"});}function o(){y.$root.on({keydown:q,focusin:function focusin(a){y.$root.removeClass(v.focused),a.stopPropagation();},"mousedown click":function mousedownClick(b){var c=b.target;c!=y.$root.children()[0]&&(b.stopPropagation(),"mousedown"!=b.type||a(c).is("input, select, textarea, button, option")||(b.preventDefault(),y.$root.eq(0).focus()));}}).on({focus:function focus(){w.addClass(v.target);},blur:function blur(){w.removeClass(v.target);}}).on("focus.toOpen",r).on("click","[data-pick], [data-nav], [data-clear], [data-close]",function(){var b=a(this),c=b.data(),d=b.hasClass(v.navDisabled)||b.hasClass(v.disabled),e=h();e=e&&(e.type||e.href),(d||e&&!a.contains(y.$root[0],e))&&y.$root.eq(0).focus(),!d&&c.nav?y.set("highlight",y.component.item.highlight,{nav:c.nav}):!d&&"pick" in c?y.set("select",c.pick):c.clear?y.clear().close(!0):c.close&&y.close(!0);}),e(y.$root[0],"hidden",!0);}function p(){var b;u.hiddenName===!0?(b=f.name,f.name=""):(b=["string"==typeof u.hiddenPrefix?u.hiddenPrefix:"","string"==typeof u.hiddenSuffix?u.hiddenSuffix:"_submit"],b=b[0]+f.name+b[1]),y._hidden=a('<input type=hidden name="'+b+'"'+(w.data("value")||f.value?' value="'+y.get("select",u.formatSubmit)+'"':"")+">")[0],w.on("change."+t.id,function(){y._hidden.value=f.value?y.get("select",u.formatSubmit):"";}),u.container?a(u.container).append(y._hidden):w.after(y._hidden);}function q(a){var b=a.keyCode,c=/^(8|46)$/.test(b);return 27==b?(y.close(),!1):void ((32==b||c||!t.open&&y.component.key[b])&&(a.preventDefault(),a.stopPropagation(),c?y.clear().close():y.open()));}function r(a){a.stopPropagation(),"focus"==a.type&&y.$root.addClass(v.focused),y.open();}if(!f)return b;var s=!1,t={id:f.id||"P"+Math.abs(~ ~(Math.random()*new Date()))},u=i?a.extend(!0,{},i.defaults,l):l||{},v=a.extend({},b.klasses(),u.klass),w=a(f),x=function x(){return this.start();},y=x.prototype={constructor:x,$node:w,start:function start(){return t&&t.start?y:(t.methods={},t.start=!0,t.open=!1,t.type=f.type,f.autofocus=f==h(),f.readOnly=!u.editable,f.id=f.id||t.id,"text"!=f.type&&(f.type="text"),y.component=new i(y,u),y.$root=a(b._.node("div",m(),v.picker,'id="'+f.id+'_root" tabindex="0"')),o(),u.formatSubmit&&p(),n(),u.container?a(u.container).append(y.$root):w.after(y.$root),y.on({start:y.component.onStart,render:y.component.onRender,stop:y.component.onStop,open:y.component.onOpen,close:y.component.onClose,set:y.component.onSet}).on({start:u.onStart,render:u.onRender,stop:u.onStop,open:u.onOpen,close:u.onClose,set:u.onSet}),s=c(y.$root.children()[0]),f.autofocus&&y.open(),y.trigger("start").trigger("render"));},render:function render(a){return a?y.$root.html(m()):y.$root.find("."+v.box).html(y.component.nodes(t.open)),y.trigger("render");},stop:function stop(){return t.start?(y.close(),y._hidden&&y._hidden.parentNode.removeChild(y._hidden),y.$root.remove(),w.removeClass(v.input).removeData(g),setTimeout(function(){w.off("."+t.id);},0),f.type=t.type,f.readOnly=!1,y.trigger("stop"),t.methods={},t.start=!1,y):y;},open:function open(c){return t.open?y:(w.addClass(v.active),e(f,"expanded",!0),setTimeout(function(){y.$root.addClass(v.opened),e(y.$root[0],"hidden",!1);},0),c!==!1&&(t.open=!0,s&&k.css("overflow","hidden").css("padding-right","+="+d()),y.$root.eq(0).focus(),j.on("click."+t.id+" focusin."+t.id,function(a){var b=a.target;b!=f&&b!=document&&3!=a.which&&y.close(b===y.$root.children()[0]);}).on("keydown."+t.id,function(c){var d=c.keyCode,e=y.component.key[d],f=c.target;27==d?y.close(!0):f!=y.$root[0]||!e&&13!=d?a.contains(y.$root[0],f)&&13==d&&(c.preventDefault(),f.click()):(c.preventDefault(),e?b._.trigger(y.component.key.go,y,[b._.trigger(e)]):y.$root.find("."+v.highlighted).hasClass(v.disabled)||y.set("select",y.component.item.highlight).close());})),y.trigger("open"));},close:function close(a){return a&&(y.$root.off("focus.toOpen").eq(0).focus(),setTimeout(function(){y.$root.on("focus.toOpen",r);},0)),w.removeClass(v.active),e(f,"expanded",!1),setTimeout(function(){y.$root.removeClass(v.opened+" "+v.focused),e(y.$root[0],"hidden",!0);},0),t.open?(t.open=!1,s&&k.css("overflow","").css("padding-right","-="+d()),j.off("."+t.id),y.trigger("close")):y;},clear:function clear(a){return y.set("clear",null,a);},set:function set(b,c,d){var e,f,g=a.isPlainObject(b),h=g?b:{};if(d=g&&a.isPlainObject(c)?c:d||{},b){g||(h[b]=c);for(e in h){f=h[e],e in y.component.item&&(void 0===f&&(f=null),y.component.set(e,f,d)),("select"==e||"clear"==e)&&w.val("clear"==e?"":y.get(e,u.format)).trigger("change");}y.render();}return d.muted?y:y.trigger("set",h);},get:function get(a,c){if(a=a||"value",null!=t[a])return t[a];if("valueSubmit"==a){if(y._hidden)return y._hidden.value;a="value";}if("value"==a)return f.value;if(a in y.component.item){if("string"==typeof c){var d=y.component.get(a);return d?b._.trigger(y.component.formats.toString,y.component,[c,d]):"";}return y.component.get(a);}},on:function on(b,c,d){var e,f,g=a.isPlainObject(b),h=g?b:{};if(b){g||(h[b]=c);for(e in h){f=h[e],d&&(e="_"+e),t.methods[e]=t.methods[e]||[],t.methods[e].push(f);}}return y;},off:function off(){var a,b,c=arguments;for(a=0,namesCount=c.length;a<namesCount;a+=1){b=c[a],b in t.methods&&delete t.methods[b];}return y;},trigger:function trigger(a,c){var d=function d(a){var d=t.methods[a];d&&d.map(function(a){b._.trigger(a,y,[c]);});};return d("_"+a),d(a),y;}};return new x();}function c(a){var b,c="position";return a.currentStyle?b=a.currentStyle[c]:window.getComputedStyle&&(b=getComputedStyle(a)[c]),"fixed"==b;}function d(){if(k.height()<=i.height())return 0;var b=a('<div style="visibility:hidden;width:100px" />').appendTo("body"),c=b[0].offsetWidth;b.css("overflow","scroll");var d=a('<div style="width:100%" />').appendTo(b),e=d[0].offsetWidth;return b.remove(),c-e;}function e(b,c,d){if(a.isPlainObject(c))for(var e in c){f(b,e,c[e]);}else f(b,c,d);}function f(a,b,c){a.setAttribute(("role"==b?"":"aria-")+b,c);}function g(b,c){a.isPlainObject(b)||(b={attribute:c}),c="";for(var d in b){var e=("role"==d?"":"aria-")+d,f=b[d];c+=null==f?"":e+'="'+b[d]+'"';}return c;}function h(){try{return document.activeElement;}catch(a){}}var i=a(window),j=a(document),k=a(document.documentElement);return b.klasses=function(a){return a=a||"picker",{picker:a,opened:a+"--opened",focused:a+"--focused",input:a+"__input",active:a+"__input--active",target:a+"__input--target",holder:a+"__holder",frame:a+"__frame",wrap:a+"__wrap",box:a+"__box"};},b._={group:function group(a){for(var c,d="",e=b._.trigger(a.min,a);e<=b._.trigger(a.max,a,[e]);e+=a.i){c=b._.trigger(a.item,a,[e]),d+=b._.node(a.node,c[0],c[1],c[2]);}return d;},node:function node(b,c,d,e){return c?(c=a.isArray(c)?c.join(""):c,d=d?' class="'+d+'"':"",e=e?" "+e:"","<"+b+d+e+">"+c+"</"+b+">"):"";},lead:function lead(a){return (10>a?"0":"")+a;},trigger:function trigger(a,b,c){return "function"==typeof a?a.apply(b,c||[]):a;},digits:function digits(a){return (/\d/.test(a[1])?2:1);},isDate:function isDate(a){return {}.toString.call(a).indexOf("Date")>-1&&this.isInteger(a.getDate());},isInteger:function isInteger(a){return {}.toString.call(a).indexOf("Number")>-1&&a%1===0;},ariaAttr:g},b.extend=function(c,d){a.fn[c]=function(e,f){var g=this.data(c);return "picker"==e?g:g&&"string"==typeof e?b._.trigger(g[e],g,[f]):this.each(function(){var f=a(this);f.data(c)||new b(this,c,d,e);});},a.fn[c].defaults=d.defaults;},b;}),function(a){"function"==typeof define&&define.amd?define(["picker","jquery"],a):"object"==(typeof exports==="undefined"?"undefined":_typeof(exports))?module.exports=a(require("./picker.js"),require("jquery")):a(Picker,jQuery);}(function(a,b){function c(a,b){var c=this,d=a.$node[0],e=d.value,f=a.$node.data("value"),g=f||e,h=f?b.formatSubmit:b.format,i=function i(){return d.currentStyle?"rtl"==d.currentStyle.direction:"rtl"==getComputedStyle(a.$root[0]).direction;};c.settings=b,c.$node=a.$node,c.queue={min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"parse navigate create validate",view:"parse create validate viewset",disable:"deactivate",enable:"activate"},c.item={},c.item.clear=null,c.item.disable=(b.disable||[]).slice(0),c.item.enable=-function(a){return a[0]===!0?a.shift():-1;}(c.item.disable),c.set("min",b.min).set("max",b.max).set("now"),g?c.set("select",g,{format:h}):c.set("select",null).set("highlight",c.item.now),c.key={40:7,38:-7,39:function _(){return i()?-1:1;},37:function _(){return i()?1:-1;},go:function go(a){var b=c.item.highlight,d=new Date(b.year,b.month,b.date+a);c.set("highlight",d,{interval:a}),this.render();}},a.on("render",function(){a.$root.find("."+b.klass.selectMonth).on("change",function(){var c=this.value;c&&(a.set("highlight",[a.get("view").year,c,a.get("highlight").date]),a.$root.find("."+b.klass.selectMonth).trigger("focus"));}),a.$root.find("."+b.klass.selectYear).on("change",function(){var c=this.value;c&&(a.set("highlight",[c,a.get("view").month,a.get("highlight").date]),a.$root.find("."+b.klass.selectYear).trigger("focus"));});},1).on("open",function(){var d="";c.disabled(c.get("now"))&&(d=":not(."+b.klass.buttonToday+")"),a.$root.find("button"+d+", select").attr("disabled",!1);},1).on("close",function(){a.$root.find("button, select").attr("disabled",!0);},1);}var d=7,e=6,f=a._;c.prototype.set=function(a,b,c){var d=this,e=d.item;return null===b?("clear"==a&&(a="select"),e[a]=b,d):(e["enable"==a?"disable":"flip"==a?"enable":a]=d.queue[a].split(" ").map(function(e){return b=d[e](a,b,c);}).pop(),"select"==a?d.set("highlight",e.select,c):"highlight"==a?d.set("view",e.highlight,c):a.match(/^(flip|min|max|disable|enable)$/)&&(e.select&&d.disabled(e.select)&&d.set("select",e.select,c),e.highlight&&d.disabled(e.highlight)&&d.set("highlight",e.highlight,c)),d);},c.prototype.get=function(a){return this.item[a];},c.prototype.create=function(a,c,d){var e,g=this;return c=void 0===c?a:c,c==-(1/0)||c==1/0?e=c:b.isPlainObject(c)&&f.isInteger(c.pick)?c=c.obj:b.isArray(c)?(c=new Date(c[0],c[1],c[2]),c=f.isDate(c)?c:g.create().obj):c=f.isInteger(c)||f.isDate(c)?g.normalize(new Date(c),d):g.now(a,c,d),{year:e||c.getFullYear(),month:e||c.getMonth(),date:e||c.getDate(),day:e||c.getDay(),obj:e||c,pick:e||c.getTime()};},c.prototype.createRange=function(a,c){var d=this,e=function e(a){return a===!0||b.isArray(a)||f.isDate(a)?d.create(a):a;};return f.isInteger(a)||(a=e(a)),f.isInteger(c)||(c=e(c)),f.isInteger(a)&&b.isPlainObject(c)?a=[c.year,c.month,c.date+a]:f.isInteger(c)&&b.isPlainObject(a)&&(c=[a.year,a.month,a.date+c]),{from:e(a),to:e(c)};},c.prototype.withinRange=function(a,b){return a=this.createRange(a.from,a.to),b.pick>=a.from.pick&&b.pick<=a.to.pick;},c.prototype.overlapRanges=function(a,b){var c=this;return a=c.createRange(a.from,a.to),b=c.createRange(b.from,b.to),c.withinRange(a,b.from)||c.withinRange(a,b.to)||c.withinRange(b,a.from)||c.withinRange(b,a.to);},c.prototype.now=function(a,b,c){return b=new Date(),c&&c.rel&&b.setDate(b.getDate()+c.rel),this.normalize(b,c);},c.prototype.navigate=function(a,c,d){var e,f,g,h,i=b.isArray(c),j=b.isPlainObject(c),k=this.item.view;if(i||j){for(j?(f=c.year,g=c.month,h=c.date):(f=+c[0],g=+c[1],h=+c[2]),d&&d.nav&&k&&k.month!==g&&(f=k.year,g=k.month),e=new Date(f,g+(d&&d.nav?d.nav:0),1),f=e.getFullYear(),g=e.getMonth();new Date(f,g,h).getMonth()!==g;){h-=1;}c=[f,g,h];}return c;},c.prototype.normalize=function(a){return a.setHours(0,0,0,0),a;},c.prototype.measure=function(a,b){var c=this;return b?"string"==typeof b?b=c.parse(a,b):f.isInteger(b)&&(b=c.now(a,b,{rel:b})):b="min"==a?-(1/0):1/0,b;},c.prototype.viewset=function(a,b){return this.create([b.year,b.month,1]);},c.prototype.validate=function(a,c,d){var e,g,h,i,j=this,k=c,l=d&&d.interval?d.interval:1,m=-1===j.item.enable,n=j.item.min,o=j.item.max,p=m&&j.item.disable.filter(function(a){if(b.isArray(a)){var d=j.create(a).pick;d<c.pick?e=!0:d>c.pick&&(g=!0);}return f.isInteger(a);}).length;if((!d||!d.nav)&&(!m&&j.disabled(c)||m&&j.disabled(c)&&(p||e||g)||!m&&(c.pick<=n.pick||c.pick>=o.pick)))for(m&&!p&&(!g&&l>0||!e&&0>l)&&(l*=-1);j.disabled(c)&&(Math.abs(l)>1&&(c.month<k.month||c.month>k.month)&&(c=k,l=l>0?1:-1),c.pick<=n.pick?(h=!0,l=1,c=j.create([n.year,n.month,n.date+(c.pick===n.pick?0:-1)])):c.pick>=o.pick&&(i=!0,l=-1,c=j.create([o.year,o.month,o.date+(c.pick===o.pick?0:1)])),!h||!i);){c=j.create([c.year,c.month,c.date+l]);}return c;},c.prototype.disabled=function(a){var c=this,d=c.item.disable.filter(function(d){return f.isInteger(d)?a.day===(c.settings.firstDay?d:d-1)%7:b.isArray(d)||f.isDate(d)?a.pick===c.create(d).pick:b.isPlainObject(d)?c.withinRange(d,a):void 0;});return d=d.length&&!d.filter(function(a){return b.isArray(a)&&"inverted"==a[3]||b.isPlainObject(a)&&a.inverted;}).length,-1===c.item.enable?!d:d||a.pick<c.item.min.pick||a.pick>c.item.max.pick;},c.prototype.parse=function(a,b,c){var d=this,e={};return b&&"string"==typeof b?(c&&c.format||(c=c||{},c.format=d.settings.format),d.formats.toArray(c.format).map(function(a){var c=d.formats[a],g=c?f.trigger(c,d,[b,e]):a.replace(/^!/,"").length;c&&(e[a]=b.substr(0,g)),b=b.substr(g);}),[e.yyyy||e.yy,+(e.mm||e.m)-1,e.dd||e.d]):b;},c.prototype.formats=function(){function a(a,b,c){var d=a.match(/\w+/)[0];return c.mm||c.m||(c.m=b.indexOf(d)+1),d.length;}function b(a){return a.match(/\w+/)[0].length;}return {d:function d(a,b){return a?f.digits(a):b.date;},dd:function dd(a,b){return a?2:f.lead(b.date);},ddd:function ddd(a,c){return a?b(a):this.settings.weekdaysShort[c.day];},dddd:function dddd(a,c){return a?b(a):this.settings.weekdaysFull[c.day];},m:function m(a,b){return a?f.digits(a):b.month+1;},mm:function mm(a,b){return a?2:f.lead(b.month+1);},mmm:function mmm(b,c){var d=this.settings.monthsShort;return b?a(b,d,c):d[c.month];},mmmm:function mmmm(b,c){var d=this.settings.monthsFull;return b?a(b,d,c):d[c.month];},yy:function yy(a,b){return a?2:(""+b.year).slice(2);},yyyy:function yyyy(a,b){return a?4:b.year;},toArray:function toArray(a){return a.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g);},toString:function toString(a,b){var c=this;return c.formats.toArray(a).map(function(a){return f.trigger(c.formats[a],c,[0,b])||a.replace(/^!/,"");}).join("");}};}(),c.prototype.isDateExact=function(a,c){var d=this;return f.isInteger(a)&&f.isInteger(c)||"boolean"==typeof a&&"boolean"==typeof c?a===c:(f.isDate(a)||b.isArray(a))&&(f.isDate(c)||b.isArray(c))?d.create(a).pick===d.create(c).pick:b.isPlainObject(a)&&b.isPlainObject(c)?d.isDateExact(a.from,c.from)&&d.isDateExact(a.to,c.to):!1;},c.prototype.isDateOverlap=function(a,c){var d=this,e=d.settings.firstDay?1:0;return f.isInteger(a)&&(f.isDate(c)||b.isArray(c))?(a=a%7+e,a===d.create(c).day+1):f.isInteger(c)&&(f.isDate(a)||b.isArray(a))?(c=c%7+e,c===d.create(a).day+1):b.isPlainObject(a)&&b.isPlainObject(c)?d.overlapRanges(a,c):!1;},c.prototype.flipEnable=function(a){var b=this.item;b.enable=a||(-1==b.enable?1:-1);},c.prototype.deactivate=function(a,c){var d=this,e=d.item.disable.slice(0);return "flip"==c?d.flipEnable():c===!1?(d.flipEnable(1),e=[]):c===!0?(d.flipEnable(-1),e=[]):c.map(function(a){for(var c,g=0;g<e.length;g+=1){if(d.isDateExact(a,e[g])){c=!0;break;}}c||(f.isInteger(a)||f.isDate(a)||b.isArray(a)||b.isPlainObject(a)&&a.from&&a.to)&&e.push(a);}),e;},c.prototype.activate=function(a,c){var d=this,e=d.item.disable,g=e.length;return "flip"==c?d.flipEnable():c===!0?(d.flipEnable(1),e=[]):c===!1?(d.flipEnable(-1),e=[]):c.map(function(a){var c,h,i,j;for(i=0;g>i;i+=1){if(h=e[i],d.isDateExact(h,a)){c=e[i]=null,j=!0;break;}if(d.isDateOverlap(h,a)){b.isPlainObject(a)?(a.inverted=!0,c=a):b.isArray(a)?(c=a,c[3]||c.push("inverted")):f.isDate(a)&&(c=[a.getFullYear(),a.getMonth(),a.getDate(),"inverted"]);break;}}if(c)for(i=0;g>i;i+=1){if(d.isDateExact(e[i],a)){e[i]=null;break;}}if(j)for(i=0;g>i;i+=1){if(d.isDateOverlap(e[i],a)){e[i]=null;break;}}c&&e.push(c);}),e.filter(function(a){return null!=a;});},c.prototype.nodes=function(a){var b=this,c=b.settings,g=b.item,h=g.now,i=g.select,j=g.highlight,k=g.view,l=g.disable,m=g.min,n=g.max,o=function(a,b){return c.firstDay&&(a.push(a.shift()),b.push(b.shift())),f.node("thead",f.node("tr",f.group({min:0,max:d-1,i:1,node:"th",item:function item(d){return [a[d],c.klass.weekdays,'scope=col title="'+b[d]+'"'];}})));}((c.showWeekdaysFull?c.weekdaysFull:c.weekdaysLetter).slice(0),c.weekdaysFull.slice(0)),p=function p(a){return f.node("div"," ",c.klass["nav"+(a?"Next":"Prev")]+(a&&k.year>=n.year&&k.month>=n.month||!a&&k.year<=m.year&&k.month<=m.month?" "+c.klass.navDisabled:""),"data-nav="+(a||-1)+" "+f.ariaAttr({role:"button",controls:b.$node[0].id+"_table"})+' title="'+(a?c.labelMonthNext:c.labelMonthPrev)+'"');},q=function q(d){var e=c.showMonthsShort?c.monthsShort:c.monthsFull;return "short_months"==d&&(e=c.monthsShort),c.selectMonths&&void 0==d?f.node("select",f.group({min:0,max:11,i:1,node:"option",item:function item(a){return [e[a],0,"value="+a+(k.month==a?" selected":"")+(k.year==m.year&&a<m.month||k.year==n.year&&a>n.month?" disabled":"")];}}),c.klass.selectMonth+" browser-default",(a?"":"disabled")+" "+f.ariaAttr({controls:b.$node[0].id+"_table"})+' title="'+c.labelMonthSelect+'"'):"short_months"==d?null!=i?f.node("div",e[i.month]):f.node("div",e[k.month]):f.node("div",e[k.month],c.klass.month);},r=function r(d){var e=k.year,g=c.selectYears===!0?5:~ ~(c.selectYears/2);if(g){var h=m.year,i=n.year,j=e-g,l=e+g;if(h>j&&(l+=h-j,j=h),l>i){var o=j-h,p=l-i;j-=o>p?p:o,l=i;}if(c.selectYears&&void 0==d)return f.node("select",f.group({min:j,max:l,i:1,node:"option",item:function item(a){return [a,0,"value="+a+(e==a?" selected":"")];}}),c.klass.selectYear+" browser-default",(a?"":"disabled")+" "+f.ariaAttr({controls:b.$node[0].id+"_table"})+' title="'+c.labelYearSelect+'"');}return "raw"==d?f.node("div",e):f.node("div",e,c.klass.year);};return createDayLabel=function createDayLabel(){return null!=i?f.node("div",i.date):f.node("div",h.date);},createWeekdayLabel=function createWeekdayLabel(){var a;a=null!=i?i.day:h.day;var b=c.weekdaysFull[a];return b;},f.node("div",f.node("div",createWeekdayLabel(),"picker__weekday-display")+f.node("div",q("short_months"),c.klass.month_display)+f.node("div",createDayLabel(),c.klass.day_display)+f.node("div",r("raw"),c.klass.year_display),c.klass.date_display)+f.node("div",f.node("div",(c.selectYears?q()+r():q()+r())+p()+p(1),c.klass.header)+f.node("table",o+f.node("tbody",f.group({min:0,max:e-1,i:1,node:"tr",item:function item(a){var e=c.firstDay&&0===b.create([k.year,k.month,1]).day?-7:0;return [f.group({min:d*a-k.day+e+1,max:function max(){return this.min+d-1;},i:1,node:"td",item:function item(a){a=b.create([k.year,k.month,a+(c.firstDay?1:0)]);var d=i&&i.pick==a.pick,e=j&&j.pick==a.pick,g=l&&b.disabled(a)||a.pick<m.pick||a.pick>n.pick,o=f.trigger(b.formats.toString,b,[c.format,a]);return [f.node("div",a.date,function(b){return b.push(k.month==a.month?c.klass.infocus:c.klass.outfocus),h.pick==a.pick&&b.push(c.klass.now),d&&b.push(c.klass.selected),e&&b.push(c.klass.highlighted),g&&b.push(c.klass.disabled),b.join(" ");}([c.klass.day]),"data-pick="+a.pick+" "+f.ariaAttr({role:"gridcell",label:o,selected:d&&b.$node.val()===o?!0:null,activedescendant:e?!0:null,disabled:g?!0:null})),"",f.ariaAttr({role:"presentation"})];}})];}})),c.klass.table,'id="'+b.$node[0].id+'_table" '+f.ariaAttr({role:"grid",controls:b.$node[0].id,readonly:!0})),c.klass.calendar_container)+f.node("div",f.node("button",c.today,"btn-flat picker__today","type=button data-pick="+h.pick+(a&&!b.disabled(h)?"":" disabled")+" "+f.ariaAttr({controls:b.$node[0].id}))+f.node("button",c.clear,"btn-flat picker__clear","type=button data-clear=1"+(a?"":" disabled")+" "+f.ariaAttr({controls:b.$node[0].id}))+f.node("button",c.close,"btn-flat picker__close","type=button data-close=true "+(a?"":" disabled")+" "+f.ariaAttr({controls:b.$node[0].id})),c.klass.footer);},c.defaults=function(a){return {labelMonthNext:"Next month",labelMonthPrev:"Previous month",labelMonthSelect:"Select a month",labelYearSelect:"Select a year",monthsFull:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdaysFull:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],weekdaysLetter:["S","M","T","W","T","F","S"],today:"Today",clear:"Clear",close:"Close",format:"d mmmm, yyyy",klass:{table:a+"table",header:a+"header",date_display:a+"date-display",day_display:a+"day-display",month_display:a+"month-display",year_display:a+"year-display",calendar_container:a+"calendar-container",navPrev:a+"nav--prev",navNext:a+"nav--next",navDisabled:a+"nav--disabled",month:a+"month",year:a+"year",selectMonth:a+"select--month",selectYear:a+"select--year",weekdays:a+"weekday",day:a+"day",disabled:a+"day--disabled",selected:a+"day--selected",highlighted:a+"day--highlighted",now:a+"day--today",infocus:a+"day--infocus",outfocus:a+"day--outfocus",footer:a+"footer",buttonClear:a+"button--clear",buttonToday:a+"button--today",buttonClose:a+"button--close"}};}(a.klasses().picker+"__"),a.extend("pickadate",c);}),function(a){function b(){var b=+a(this).attr("length"),c=+a(this).val().length,d=b>=c;a(this).parent().find('span[class="character-counter"]').html(c+"/"+b),e(d,a(this));}function c(b){var c=b.parent().find('span[class="character-counter"]');c.length||(c=a("<span/>").addClass("character-counter").css("float","right").css("font-size","12px").css("height",1),b.parent().append(c));}function d(){a(this).parent().find('span[class="character-counter"]').html("");}function e(a,b){var c=b.hasClass("invalid");a&&c?b.removeClass("invalid"):a||c||(b.removeClass("valid"),b.addClass("invalid"));}a.fn.characterCounter=function(){return this.each(function(){var e=a(this),f=e.parent().find('span[class="character-counter"]');if(!f.length){var g=void 0!==e.attr("length");g&&(e.on("input",b),e.on("focus",b),e.on("blur",d),c(e));}});},a(document).ready(function(){a("input, textarea").characterCounter();});}(jQuery),function(a){var b={init:function init(b){var c={time_constant:200,dist:-100,shift:0,padding:0,full_width:!1};return b=a.extend(c,b),this.each(function(){function c(){"undefined"!=typeof window.ontouchstart&&(F[0].addEventListener("touchstart",k),F[0].addEventListener("touchmove",l),F[0].addEventListener("touchend",m)),F[0].addEventListener("mousedown",k),F[0].addEventListener("mousemove",l),F[0].addEventListener("mouseup",m),F[0].addEventListener("click",j);}function d(a){return a.targetTouches&&a.targetTouches.length>=1?a.targetTouches[0].clientX:a.clientX;}function e(a){return a.targetTouches&&a.targetTouches.length>=1?a.targetTouches[0].clientY:a.clientY;}function f(a){return a>=s?a%s:0>a?f(s+a%s):a;}function g(a){var c,d,e,g,h,i,j;for(o="number"==typeof a?a:o,p=Math.floor((o+r/2)/r),e=o-p*r,g=0>e?1:-1,h=-g*e*2/r,b.full_width?j="translateX(0)":(j="translateX("+(F[0].clientWidth-item_width)/2+"px) ",j+="translateY("+(F[0].clientHeight-item_width)/2+"px)"),i=n[f(p)],i.style[z]=j+" translateX("+-e/2+"px) translateX("+g*b.shift*h*c+"px) translateZ("+b.dist*h+"px)",i.style.zIndex=0,b.full_width?tweenedOpacity=1:tweenedOpacity=1-.2*h,i.style.opacity=tweenedOpacity,d=s>>1,c=1;d>=c;++c){b.full_width?(zTranslation=b.dist,tweenedOpacity=c===d&&0>e?1-h:1):(zTranslation=b.dist*(2*c+h*g),tweenedOpacity=1-.2*(2*c+h*g)),i=n[f(p+c)],i.style[z]=j+" translateX("+(b.shift+(r*c-e)/2)+"px) translateZ("+zTranslation+"px)",i.style.zIndex=-c,i.style.opacity=tweenedOpacity,b.full_width?(zTranslation=b.dist,tweenedOpacity=c===d&&e>0?1-h:1):(zTranslation=b.dist*(2*c-h*g),tweenedOpacity=1-.2*(2*c-h*g)),i=n[f(p-c)],i.style[z]=j+" translateX("+(-b.shift+(-r*c-e)/2)+"px) translateZ("+zTranslation+"px)",i.style.zIndex=-c,i.style.opacity=tweenedOpacity;}i=n[f(p)],i.style[z]=j+" translateX("+-e/2+"px) translateX("+g*b.shift*h+"px) translateZ("+b.dist*h+"px)",i.style.zIndex=0,b.full_width?tweenedOpacity=1:tweenedOpacity=1-.2*h,i.style.opacity=tweenedOpacity;}function h(){var a,b,c,d;a=Date.now(),b=a-B,B=a,c=o-A,A=o,d=1e3*c/(1+b),x=.8*d+.2*x;}function i(){var a,c;v&&(a=Date.now()-B,c=v*Math.exp(-a/b.time_constant),c>2||-2>c?(g(w-c),requestAnimationFrame(i)):g(w));}function j(c){if(D)return c.preventDefault(),c.stopPropagation(),!1;if(!b.full_width){var d=a(c.target).closest(".carousel-item").index(),e=p%s-d;0>e?Math.abs(e+s)<Math.abs(e)&&(e+=s):e>0&&Math.abs(e-s)<e&&(e-=s),0>e?a(this).trigger("carouselNext",[Math.abs(e)]):e>0&&a(this).trigger("carouselPrev",[e]);}}function k(a){q=!0,D=!1,E=!1,t=d(a),u=e(a),x=v=0,A=o,B=Date.now(),clearInterval(C),C=setInterval(h,100);}function l(a){var b,c,f;if(q)if(b=d(a),y=e(a),c=t-b,f=Math.abs(u-y),30>f&&!E)(c>2||-2>c)&&(D=!0,t=b,g(o+c));else {if(D)return a.preventDefault(),a.stopPropagation(),!1;E=!0;}return D?(a.preventDefault(),a.stopPropagation(),!1):void 0;}function m(a){return q=!1,clearInterval(C),w=o,(x>10||-10>x)&&(v=.9*x,w=o+v),w=Math.round(w/r)*r,v=w-o,B=Date.now(),requestAnimationFrame(i),a.preventDefault(),a.stopPropagation(),!1;}var n,o,p,q,r,s,t,u,v,w,x,z,A,B,C,D,E,F=a(this);return F.hasClass("initialized")?!0:(b.full_width&&(b.dist=0,imageHeight=F.find(".carousel-item img").first().load(function(){F.css("height",a(this).height());})),F.addClass("initialized"),q=!1,o=w=0,n=[],item_width=F.find(".carousel-item").first().innerWidth(),r=2*item_width+b.padding,F.find(".carousel-item").each(function(){n.push(a(this)[0]);}),s=n.length,z="transform",["webkit","Moz","O","ms"].every(function(a){var b=a+"Transform";return "undefined"!=typeof document.body.style[b]?(z=b,!1):!0;}),window.onresize=g,c(),g(o),a(this).on("carouselNext",function(a,b){void 0===b&&(b=1),w=o+r*b,o!==w&&(v=w-o,B=Date.now(),requestAnimationFrame(i));}),void a(this).on("carouselPrev",function(a,b){void 0===b&&(b=1),w=o-r*b,o!==w&&(v=w-o,B=Date.now(),requestAnimationFrame(i));}));});},next:function next(b){a(this).trigger("carouselNext",[b]);},prev:function prev(b){a(this).trigger("carouselPrev",[b]);}};a.fn.carousel=function(c){return b[c]?b[c].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=(typeof c==="undefined"?"undefined":_typeof(c))&&c?void a.error("Method "+c+" does not exist on jQuery.carousel"):b.init.apply(this,arguments);};}(jQuery);
require.register("web/static/js/active_admin", function(exports, require, module) {
"use strict";

//= require active_admin/base
//= require jquery
//= require jquery-ui
//= require jquery-migrate-1.1.1

// TODO: move this to a file provided by ace_contacts plugin
function serializeCategories() {
  var categoryIds = $.makeArray($("table.index_table .category").map(function () {
    return $(this).data('id');
  }));
  return { ids: categoryIds };
};

$(document).ready(function () {
  // Activating Best In Place
  jQuery(".best_in_place").best_in_place();
  //$('table.index_table tbody').sortable();
  $('#backup-now').click(function () {
    $('#title_bar').after("<div class='flashes'><div class='flash flash_info'>Creating backup. This may take a while ...</div></div>");
    return true;
  });
  $('.restore-link').click(function (e) {
    if (e.isPropagationStopped()) {
      $('#title_bar').after("<div class='flashes'><div class='flash flash_info'>Restoring backup. This may take a while ...</div></div>");
    }
    return true;
  });
  $('body.admin_categories table.index_table tbody').sortable({
    update: function update() {
      $.ajax({
        url: '/admin/categories/sort',
        type: 'post',
        data: serializeCategories(),
        complete: function complete() {
          $('.paginated_collection').effect('highlight');
        }
      });
    }
  });
});
});

require.register("web/static/js/active_admin_lib", function(exports, require, module) {
'use strict';

// File: application.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  $(document).ready(function () {
    var batch_actions_selector;
    $(document).on('focus', '.datepicker:not(.hasDatepicker)', function () {
      var defaults, options;
      defaults = {
        dateFormat: 'yy-mm-dd'
      };
      options = $(this).data('datepicker-options');
      return $(this).datepicker($.extend(defaults, options));
    });
    $('.clear_filters_btn').click(function () {
      var params, regex;
      params = window.location.search.split('&');
      regex = /^(q\[|q%5B|q%5b|page|commit)/;
      return window.location.search = "";
    });
    $('.filter_form').submit(function () {
      return $(this).find(':input').filter(function () {
        return this.value === '';
      }).prop('disabled', true);
    });
    $('.filter_form_field.select_and_search select').change(function () {
      return $(this).siblings('input').prop({
        name: "q[" + this.value + "]"
      });
    });
    if ((batch_actions_selector = $('.table_tools .batch_actions_selector')).length) {
      return batch_actions_selector.next().css({
        width: "calc(100% - 10px - " + batch_actions_selector.outerWidth() + "px)",
        'float': 'right'
      });
    }
  });
}).call(undefined);

// File: base.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  window.ActiveAdmin = {};
}).call(undefined);

// File: batch_actions.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  $(document).on('ready page:load', function () {
    $('#batch_actions_selector li a').click(function (e) {
      var message, r;
      e.stopPropagation();
      e.preventDefault();
      console.log('clicked it');
      if (message = $(this).data('confirm')) {
        r = window.confirm(message);
        if (r === true) {
          return $(this).trigger('confirm:complete', $(this).data('inputs'));
        }
      } else {
        return $(this).trigger('confirm:complete');
      }
    });
    $('#batch_actions_selector li a').on('confirm:complete', function (e, inputs) {
      var val;
      if (val = JSON.stringify(inputs)) {
        $('#batch_action_inputs').val(val);
      } else {
        $('#batch_action_inputs').attr('disabled', 'disabled');
      }
      $('#batch_action').val($(this).data('action'));
      return $('#collection_selection').submit();
    });
    if ($("#batch_actions_selector").length && $(":checkbox.toggle_all").length) {
      if ($(".paginated_collection").find("table.index_table").length) {
        $(".paginated_collection table").tableCheckboxToggler();
      } else {
        $(".paginated_collection").checkboxToggler();
      }
      return $(".paginated_collection").find(":checkbox").bind("change", function () {
        if ($(".paginated_collection").find(":checkbox").filter(":checked").length > 0) {
          return $("#batch_actions_selector").aaDropdownMenu("enable");
        } else {
          return $("#batch_actions_selector").aaDropdownMenu("disable");
        }
      });
    }
  });
}).call(undefined);

// File: checkbox-toggler.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  ActiveAdmin.CheckboxToggler = function () {
    function CheckboxToggler(options, container) {
      var defaults;
      this.options = options;
      this.container = container;
      defaults = {};
      this.options = $.extend(defaults, this.options);
      this._init();
      this._bind();
    }

    CheckboxToggler.prototype._init = function () {
      if (!this.container) {
        throw new Error('Container element not found');
      } else {
        this.$container = $(this.container);
      }
      if (!this.$container.find('.toggle_all').length) {
        throw new Error('"toggle all" checkbox not found');
      } else {
        this.toggle_all_checkbox = this.$container.find('.toggle_all');
      }
      return this.checkboxes = this.$container.find(':checkbox').not(this.toggle_all_checkbox);
    };

    CheckboxToggler.prototype._bind = function () {
      this.checkboxes.change(function (_this) {
        return function (e) {
          return _this._didChangeCheckbox(e.target);
        };
      }(this));
      return this.toggle_all_checkbox.change(function (_this) {
        return function () {
          return _this._didChangeToggleAllCheckbox();
        };
      }(this));
    };

    CheckboxToggler.prototype._didChangeCheckbox = function (checkbox) {
      switch (this.checkboxes.filter(':checked').length) {
        case this.checkboxes.length - 1:
          return this.toggle_all_checkbox.prop({
            checked: null
          });
        case this.checkboxes.length:
          return this.toggle_all_checkbox.prop({
            checked: true
          });
      }
    };

    CheckboxToggler.prototype._didChangeToggleAllCheckbox = function () {
      var setting;
      setting = this.toggle_all_checkbox.prop('checked') ? true : null;
      return this.checkboxes.each(function (_this) {
        return function (index, el) {
          $(el).prop({
            checked: setting
          });
          return _this._didChangeCheckbox(el);
        };
      }(this));
    };

    return CheckboxToggler;
  }();

  $.widget.bridge('checkboxToggler', ActiveAdmin.CheckboxToggler);
}).call(undefined);

// File: dropdown-menu.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  ActiveAdmin.DropdownMenu = function () {
    function DropdownMenu(options, element) {
      var defaults;
      this.options = options;
      this.element = element;
      this.$element = $(this.element);
      defaults = {
        fadeInDuration: 20,
        fadeOutDuration: 100,
        onClickActionItemCallback: null
      };
      this.options = $.extend(defaults, this.options);
      this.isOpen = false;
      this.$menuButton = this.$element.find('.dropdown_menu_button');
      this.$menuList = this.$element.find('.dropdown_menu_list_wrapper');
      this._buildMenuList();
      this._bind();
    }

    DropdownMenu.prototype.open = function () {
      this.isOpen = true;
      this.$menuList.fadeIn(this.options.fadeInDuration);
      this._position();
      return this;
    };

    DropdownMenu.prototype.close = function () {
      this.isOpen = false;
      this.$menuList.fadeOut(this.options.fadeOutDuration);
      return this;
    };

    DropdownMenu.prototype.destroy = function () {
      this.$element.unbind();
      this.$element = null;
      return this;
    };

    DropdownMenu.prototype.isDisabled = function () {
      return this.$menuButton.hasClass('disabled');
    };

    DropdownMenu.prototype.disable = function () {
      return this.$menuButton.addClass('disabled');
    };

    DropdownMenu.prototype.enable = function () {
      return this.$menuButton.removeClass('disabled');
    };

    DropdownMenu.prototype.option = function (key, value) {
      if ($.isPlainObject(key)) {
        return this.options = $.extend(true, this.options, key);
      } else if (key != null) {
        return this.options[key];
      } else {
        return this.options[key] = value;
      }
    };

    DropdownMenu.prototype._buildMenuList = function () {
      this.$nipple = $('<div class="dropdown_menu_nipple"></div>');
      this.$menuList.prepend(this.$nipple);
      return this.$menuList.hide();
    };

    DropdownMenu.prototype._bind = function () {
      $('body').click(function (_this) {
        return function () {
          if (_this.isOpen) {
            return _this.close();
          }
        };
      }(this));
      return this.$menuButton.click(function (_this) {
        return function () {
          if (!_this.isDisabled()) {
            if (_this.isOpen) {
              _this.close();
            } else {
              _this.open();
            }
          }
          return false;
        };
      }(this));
    };

    DropdownMenu.prototype._position = function () {
      var button_center, button_left, button_right, centered_menu_left, centered_menu_right, menu_center, nipple_center, window_right;
      this.$menuList.css('top', this.$menuButton.position().top + this.$menuButton.outerHeight() + 10);
      button_left = this.$menuButton.position().left;
      button_center = this.$menuButton.outerWidth() / 2;
      button_right = button_left + button_center * 2;
      menu_center = this.$menuList.outerWidth() / 2;
      nipple_center = this.$nipple.outerWidth() / 2;
      window_right = $(window).width();
      centered_menu_left = button_left + button_center - menu_center;
      centered_menu_right = button_left + button_center + menu_center;
      if (centered_menu_left < 0) {
        this.$menuList.css('left', button_left);
        return this.$nipple.css('left', button_center - nipple_center);
      } else if (centered_menu_right > window_right) {
        this.$menuList.css('right', window_right - button_right);
        return this.$nipple.css('right', button_center - nipple_center);
      } else {
        this.$menuList.css('left', centered_menu_left);
        return this.$nipple.css('left', menu_center - nipple_center);
      }
    };

    return DropdownMenu;
  }();

  $.widget.bridge('aaDropdownMenu', ActiveAdmin.DropdownMenu);

  $(document).on('ready page:load', function () {
    return $('.dropdown_menu').aaDropdownMenu();
  });
}).call(undefined);

// File: flash.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  var Flash;

  ActiveAdmin.flash = Flash = function () {
    Flash.error = function (message, close_after) {
      return new this(message, "error", close_after);
    };

    Flash.notice = function (message, close_after) {
      return new this(message, "notice", close_after);
    };

    Flash.prototype.reference = function () {
      return this.reference;
    };

    function Flash(message1, type1, close_after) {
      this.message = message1;
      this.type = type1 != null ? type1 : "notice";
      this.reference = jQuery("<div>").addClass("flash flash_" + type).text(message);
      jQuery(".flashes").append(this.reference);
      if (close_after != null) {
        this.close_after(close_after);
      }
    }

    Flash.prototype.close_after = function (close_after) {
      return setTimeout(function (_this) {
        return function () {
          return _this.close();
        };
      }(this), close_after * 1000);
    };

    Flash.prototype.close = function () {
      return this.reference.remove();
    };

    return Flash;
  }();
}).call(undefined);

// File: has_many.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  var init_sortable, recompute_positions;

  $(function () {
    $(document).on('click', 'a.button.has_many_remove', function (e) {
      var parent, to_remove;
      e.preventDefault();
      parent = $(this).closest('.has_many_container');
      to_remove = $(this).closest('fieldset');
      recompute_positions(parent);
      parent.trigger('has_many_remove:before', [to_remove, parent]);
      to_remove.remove();
      return parent.trigger('has_many_remove:after', [to_remove, parent]);
    });
    $(document).on('click', 'a.button.has_many_add', function (e) {
      var before_add, fieldset, html, index, parent, regex;
      e.preventDefault();
      parent = $(this).closest('.has_many_container');
      parent.trigger(before_add = $.Event('has_many_add:before'), [parent]);
      if (!before_add.isDefaultPrevented()) {
        index = parent.data('has_many_index') || parent.children('fieldset').length - 1;
        parent.data({
          has_many_index: ++index
        });
        regex = new RegExp($(this).data('placeholder'), 'g');
        html = $(this).data('html').replace(regex, index);
        fieldset = $(html).insertBefore(this);
        recompute_positions(parent);
        return parent.trigger('has_many_add:after', [fieldset, parent]);
      }
    });
    $(document).on('change', '.has_many_container[data-sortable] :input[name$="[_destroy]"]', function () {
      return recompute_positions($(this).closest('.has_many'));
    });
    init_sortable();
    return $(document).on('has_many_add:after', '.has_many_container', init_sortable);
  });

  init_sortable = function init_sortable() {
    var elems;
    elems = $('.has_many_container[data-sortable]:not(.ui-sortable)');
    elems.sortable({
      items: '> fieldset',
      handle: '> ol > .handle',
      stop: recompute_positions
    });
    return elems.each(recompute_positions);
  };

  recompute_positions = function recompute_positions(parent) {
    var input_name, position;
    parent = parent instanceof jQuery ? parent : $(this);
    input_name = parent.data('sortable');
    position = parseInt(parent.data('sortable-start') || 0, 10);
    return parent.children('fieldset').each(function () {
      var destroy_input, sortable_input;
      destroy_input = $(this).find("> ol > .input > :input[name$='[_destroy]']");
      sortable_input = $(this).find("> ol > .input > :input[name$='[" + input_name + "]']");
      if (sortable_input.length) {
        return sortable_input.val(destroy_input.is(':checked') ? '' : position++);
      }
    });
  };
}).call(undefined);

// File: modal_dialog.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  ActiveAdmin.modal_dialog = function (message, inputs, callback) {
    var elem, html, klass, name, opts, ref, ref1, type, v, wrapper;
    html = "<form id=\"dialog_confirm\" title=\"" + message + "\"><ul>";
    for (name in inputs) {
      type = inputs[name];
      if (/^(datepicker|checkbox|text)$/.test(type)) {
        wrapper = 'input';
      } else if (type === 'textarea') {
        wrapper = 'textarea';
      } else if ($.isArray(type)) {
        ref = ['select', 'option', type, ''], wrapper = ref[0], elem = ref[1], opts = ref[2], type = ref[3];
      } else {
        throw new Error("Unsupported input type: {" + name + ": " + type + "}");
      }
      klass = type === 'datepicker' ? type : '';
      html += "<li>\n<label>" + (name.charAt(0).toUpperCase() + name.slice(1)) + "</label>\n<" + wrapper + " name=\"" + name + "\" class=\"" + klass + "\" type=\"" + type + "\">" + (opts ? function () {
        var i, len, results;
        results = [];
        for (i = 0, len = opts.length; i < len; i++) {
          v = opts[i];
          if ($.isArray(v)) {
            results.push("<" + elem + " value=" + v[1] + ">" + v[0] + "</" + elem + ">");
          } else {
            results.push("<" + elem + ">" + v + "</" + elem + ">");
          }
        }
        return results;
      }().join('') : '') + ("</" + wrapper + ">") + "</li>";
      ref1 = [], wrapper = ref1[0], elem = ref1[1], opts = ref1[2], type = ref1[3], klass = ref1[4];
    }
    html += "</ul></form>";
    return $(html).appendTo('body').dialog({
      modal: true,
      dialogClass: 'active_admin_dialog',
      buttons: {
        OK: function OK() {
          callback($(this).serializeObject());
          return $(this).dialog('close');
        },
        Cancel: function Cancel() {
          return $(this).dialog('close').remove();
        }
      }
    });
  };
}).call(undefined);

// File: per_page.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  ActiveAdmin.PerPage = function () {
    function PerPage(options, element) {
      this.options = options;
      this.element = element;
      this.$element = $(this.element);
      this._init();
      this._bind();
    }

    PerPage.prototype._init = function () {
      return this.$params = this._queryParams();
    };

    PerPage.prototype._bind = function () {
      return this.$element.change(function (_this) {
        return function () {
          _this.$params['per_page'] = _this.$element.val();
          delete _this.$params['page'];
          return location.search = $.param(_this.$params);
        };
      }(this));
    };

    PerPage.prototype._queryParams = function () {
      var m, params, query, re;
      query = window.location.search.substring(1);
      params = {};
      re = /([^&=]+)=([^&]*)/g;
      while (m = re.exec(query)) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
      }
      return params;
    };

    return PerPage;
  }();

  $.widget.bridge('perPage', ActiveAdmin.PerPage);

  $(function () {
    return $('.pagination_per_page select').perPage();
  });
}).call(undefined);

// File: popover.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  ActiveAdmin.Popover = function () {
    function Popover(options1, element) {
      var defaults;
      this.options = options1;
      this.element = element;
      this.$element = $(this.element);
      defaults = {
        fadeInDuration: 20,
        fadeOutDuration: 100,
        autoOpen: true,
        pageWrapperElement: "#wrapper",
        onClickActionItemCallback: null
      };
      this.options = $.extend(defaults, options);
      this.isOpen = false;
      if (!(this.$popover = $(this.$element.attr('href'))).length) {
        this.$popover = this.$element.next('.popover');
      }
      this._buildPopover();
      this._bind();
    }

    Popover.prototype.open = function () {
      this.isOpen = true;
      this.$popover.fadeIn(this.options.fadeInDuration);
      this._positionPopover();
      this._positionNipple();
      return this;
    };

    Popover.prototype.close = function () {
      this.isOpen = false;
      this.$popover.fadeOut(this.options.fadeOutDuration);
      return this;
    };

    Popover.prototype.destroy = function () {
      this.$element.removeData('popover');
      this.$element.unbind();
      this.$element = null;
      return this;
    };

    Popover.prototype._buildPopover = function () {
      this.$nipple = $('<div class="popover_nipple"></div>');
      this.$popover.prepend(this.$nipple);
      this.$popover.hide();
      return this.$popover.addClass('popover');
    };

    Popover.prototype._bind = function () {
      $(this.options.pageWrapperElement).click(function (_this) {
        return function () {
          if (_this.isOpen) {
            return _this.close();
          }
        };
      }(this));
      if (this.options.autoOpen) {
        return this.$element.click(function (_this) {
          return function (e) {
            e.stopPropagation();
            if (_this.isOpen) {
              return _this.close();
            } else {
              return _this.open();
            }
          };
        }(this));
      }
    };

    Popover.prototype._positionPopover = function () {
      var button_center, popover_center;
      button_center = this.$element.offset().left + this.$element.outerWidth() / 2;
      popover_center = this.$popover.outerWidth() / 2;
      return this.$popover.css('left', button_center - popover_center);
    };

    Popover.prototype._positionNipple = function () {
      this.$popover.css('top', this.$element.offset().top + this.$element.outerHeight() + 10);
      return this.$nipple.css('left', this.$popover.outerWidth() / 2 - this.$nipple.outerWidth() / 2);
    };

    return Popover;
  }();

  $.widget.bridge('popover', ActiveAdmin.Popover);
}).call(undefined);

// File: table-checkbox-toggler.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  var extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  ActiveAdmin.TableCheckboxToggler = function (superClass) {
    extend(TableCheckboxToggler, superClass);

    function TableCheckboxToggler() {
      return TableCheckboxToggler.__super__.constructor.apply(this, arguments);
    }

    TableCheckboxToggler.prototype._init = function () {
      return TableCheckboxToggler.__super__._init.apply(this, arguments);
    };

    TableCheckboxToggler.prototype._bind = function () {
      TableCheckboxToggler.__super__._bind.apply(this, arguments);
      return this.$container.find('tbody td').click(function (_this) {
        return function (e) {
          if (e.target.type !== 'checkbox') {
            return _this._didClickCell(e.target);
          }
        };
      }(this));
    };

    TableCheckboxToggler.prototype._didChangeCheckbox = function (checkbox) {
      var $row;
      TableCheckboxToggler.__super__._didChangeCheckbox.apply(this, arguments);
      $row = $(checkbox).parents('tr');
      if (checkbox.checked) {
        return $row.addClass('selected');
      } else {
        return $row.removeClass('selected');
      }
    };

    TableCheckboxToggler.prototype._didClickCell = function (cell) {
      return $(cell).parent('tr').find(':checkbox').click();
    };

    return TableCheckboxToggler;
  }(ActiveAdmin.CheckboxToggler);

  $.widget.bridge('tableCheckboxToggler', ActiveAdmin.TableCheckboxToggler);
}).call(undefined);
});

require.register("web/static/js/admin_lte2", function(exports, require, module) {
'use strict';var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};(function(){'use strict';var globals=typeof window==='undefined'?global:window;if(typeof globals.require==='function')return;var modules={};var cache={};var aliases={};var has={}.hasOwnProperty;var endsWith=function endsWith(str,suffix){return str.indexOf(suffix,str.length-suffix.length)!==-1;};var _cmp='components/';var unalias=function unalias(alias,loaderPath){var start=0;if(loaderPath){if(loaderPath.indexOf(_cmp)===0){start=_cmp.length;}if(loaderPath.indexOf('/',start)>0){loaderPath=loaderPath.substring(start,loaderPath.indexOf('/',start));}}var result=aliases[alias+'/index.js']||aliases[loaderPath+'/deps/'+alias+'/index.js'];if(result){return _cmp+result.substring(0,result.length-'.js'.length);}return alias;};var _reg=/^\.\.?(\/|$)/;var expand=function expand(root,name){var results=[],part;var parts=(_reg.test(name)?root+'/'+name:name).split('/');for(var i=0,length=parts.length;i<length;i++){part=parts[i];if(part==='..'){results.pop();}else if(part!=='.'&&part!==''){results.push(part);}}return results.join('/');};var dirname=function dirname(path){return path.split('/').slice(0,-1).join('/');};var localRequire=function localRequire(path){return function expanded(name){var absolute=expand(dirname(path),name);return globals.require(absolute,path);};};var initModule=function initModule(name,definition){var module={id:name,exports:{}};cache[name]=module;definition(module.exports,localRequire(name),module);return module.exports;};var require=function require(name,loaderPath){var path=expand(name,'.');if(loaderPath==null)loaderPath='/';path=unalias(name,loaderPath);if(has.call(cache,path))return cache[path].exports;if(has.call(modules,path))return initModule(path,modules[path]);var dirIndex=expand(path,'./index');if(has.call(cache,dirIndex))return cache[dirIndex].exports;if(has.call(modules,dirIndex))return initModule(dirIndex,modules[dirIndex]);throw new Error('Cannot find module "'+name+'" from '+'"'+loaderPath+'"');};require.alias=function(from,to){aliases[to]=from;};require.register=require.define=function(bundle,fn){if((typeof bundle==='undefined'?'undefined':_typeof(bundle))==='object'){for(var key in bundle){if(has.call(bundle,key)){modules[key]=bundle[key];}}}else {modules[bundle]=fn;}};require.list=function(){var result=[];for(var item in modules){if(has.call(modules,item)){result.push(item);}}return result;};require.brunch=true;require._cache=cache;globals.require=require;})(); /*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher");}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b){if(void 0!==a.style[c])return {end:b[c]};}return !1;}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0;});var e=function e(){c||a(d).trigger(a.support.transition.end);};return setTimeout(e,b),this;},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function handle(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0;}});});}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c);});}var c='[data-dismiss="alert"]',d=function d(b){a(b).on("click",c,this.close);};d.VERSION="3.3.4",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove();}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c());};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this;},a(document).on("click.bs.alert.data-api",c,d.prototype.close);}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==(typeof b==='undefined'?'undefined':_typeof(b))&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b);});}var c=function c(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1;};c.VERSION="3.3.4",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c));},this),0);},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change");}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));a&&this.$element.toggleClass("active");};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this;},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault();}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type));});}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==(typeof b==='undefined'?'undefined':_typeof(b))&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle();});}var c=function c(b,_c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=_c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart" in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this));};c.VERSION="3.3.4",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return;}a.preventDefault();}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this;},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active);},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f);},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a);}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a));},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this;},c.prototype.next=function(){return this.sliding?void 0:this.slide("next");},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev");},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active");}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m);},0);}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this;}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this;};var e=function e(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault();}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data());});});}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d);}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==(typeof b==='undefined'?'undefined':_typeof(b))&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]();});}var d=function d(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle();};d.VERSION="3.3.4",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height";},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function h(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse");};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i]);}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function e(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this);}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]();},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e);},this)).end();},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c);};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this;},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h);});}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=c(d),f={relatedTarget:this};e.hasClass("open")&&(e.trigger(b=a.Event("hide.bs.dropdown",f)),b.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f)));}));}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent();}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c);});}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function g(b){a(b).on("click.bs.dropdown",this.toggle);};g.VERSION="3.3.4",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart" in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h);}return !1;}},g.prototype.keydown=function(b){if(/(38|40|27|32)/.test(b.which)&&!/input|textarea/i.test(b.target.tagName)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g&&27!=b.which||g&&27==b.which)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(b.target);38==b.which&&j>0&&j--,40==b.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus");}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this;},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation();}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',g.prototype.keydown);}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==(typeof b==='undefined'?'undefined':_typeof(b))&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d);});}var c=function c(b,_c2){this.options=_c2,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal");},this));};c.VERSION="3.3.4",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a);},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0);});}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in").attr("aria-hidden",!1),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f);}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f);}));},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal());},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus");},this));},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide();},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal");},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal");},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal");});},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null;},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a('<div class="modal-backdrop '+e+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void (this.ignoreBackdropClick=!1):void (a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()));},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b();}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function g(){d.removeBackdrop(),b&&b();};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g();}else b&&b();},c.prototype.handleUpdate=function(){this.adjustDialog();},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""});},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""});},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left);}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar();},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth);},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad);},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b;};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this;},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus");});}),b.call(f,g,this);});}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==(typeof b==='undefined'?'undefined':_typeof(b))&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]());});}var c=function c(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.init("tooltip",a,b);};c.VERSION="3.3.4",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport),this.$element[0] instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this));}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle();},c.prototype.getDefaults=function(){return c.DEFAULTS;},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b;},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d);}),b;},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c&&c.$tip&&c.$tip.is(":visible")?void (c.hoverState="in"):(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void (c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show();},c.options.delay.show)):c.show());},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void (c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide();},c.options.delay.hide)):c.hide();},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.options.container?a(this.options.container):this.$element.parent(),p=this.getPosition(o);h="bottom"==h&&k.bottom+m>p.bottom?"top":"top"==h&&k.top-m<p.top?"bottom":"right"==h&&k.right+l>p.width?"left":"left"==h&&k.left-l<p.left?"right":h,f.removeClass(n).addClass(h);}var q=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(q,h);var r=function r(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e);};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",r).emulateTransitionEnd(c.TRANSITION_DURATION):r();}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function using(a){d.css({top:Math.round(a.top),left:Math.round(a.left)});}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l);},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","");},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right");},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b();}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this);},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","");},c.prototype.hasContent=function(){return this.getTitle();},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f);},c.prototype.getCalculatedOffset=function(a,b,c,d){return "bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width};},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i);}else {var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k);}return e;},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title);},c.prototype.getUID=function(a){do {a+=~ ~(1e6*Math.random());}while(document.getElementById(a));return a;},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template);},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow");},c.prototype.enable=function(){this.enabled=!0;},c.prototype.disable=function(){this.enabled=!1;},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled;},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c);},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type);});};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this;};}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==(typeof b==='undefined'?'undefined':_typeof(b))&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]());});}var c=function c(a,b){this.init("popover",a,b);};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.4",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS;},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide();},c.prototype.hasContent=function(){return this.getTitle()||this.getContent();},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content);},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow");};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this;};}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process();}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==(typeof c==='undefined'?'undefined':_typeof(c))&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]();});}b.VERSION="3.3.4",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight);},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null;}).sort(function(a,b){return a[0]-b[0];}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1]);});},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;){g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a]);}},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy");},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active");};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this;},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data());});});}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]();});}var c=function c(b){this.element=a(b);};c.VERSION="3.3.4",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]});});}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e();}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in");};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this;};var e=function e(c){c.preventDefault(),b.call(a(this),"show");};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e);}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==(typeof b==='undefined'?'undefined':_typeof(b))&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]();});}var c=function c(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition();};c.VERSION="3.3.4",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1;},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a;},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1);},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=a(document.body).height();"object"!=(typeof d==='undefined'?'undefined':_typeof(d))&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix");}"bottom"==h&&this.$element.offset({top:g-b-f});}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this;},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d);});});}(jQuery); /**
* @version: 1.3.21
* @author: Dan Grossman http://www.dangrossman.info/
* @copyright: Copyright (c) 2012-2015 Dan Grossman. All rights reserved.
* @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
* @website: https://www.improvely.com/
*/(function(root,factory){if(typeof define==='function'&&define.amd){define(['moment','jquery','exports'],function(momentjs,$,exports){root.daterangepicker=factory(root,exports,momentjs,$);});}else if(typeof exports!=='undefined'){var momentjs=require('moment');var jQuery;try{jQuery=require('jquery');}catch(err){jQuery=window.jQuery;if(!jQuery)throw new Error('jQuery dependency not found');}factory(root,exports,momentjs,jQuery); // Finally, as a browser global.
}else {root.daterangepicker=factory(root,{},root.moment,root.jQuery||root.Zepto||root.ender||root.$);}})(undefined,function(root,daterangepicker,moment,$){var DateRangePicker=function DateRangePicker(element,options,cb){ // by default, the daterangepicker element is placed at the bottom of HTML body
this.parentEl='body'; //element that triggered the date range picker
this.element=$(element); //tracks visible state
this.isShowing=false; //create the picker HTML object
var DRPTemplate='<div class="daterangepicker dropdown-menu">'+'<div class="calendar first left"></div>'+'<div class="calendar second right"></div>'+'<div class="ranges">'+'<div class="range_inputs">'+'<div class="daterangepicker_start_input">'+'<label for="daterangepicker_start"></label>'+'<input class="input-mini" type="text" name="daterangepicker_start" value="" />'+'</div>'+'<div class="daterangepicker_end_input">'+'<label for="daterangepicker_end"></label>'+'<input class="input-mini" type="text" name="daterangepicker_end" value="" />'+'</div>'+'<button class="applyBtn" disabled="disabled"></button>&nbsp;'+'<button class="cancelBtn"></button>'+'</div>'+'</div>'+'</div>'; //custom options
if((typeof options==='undefined'?'undefined':_typeof(options))!=='object'||options===null)options={};this.parentEl=(typeof options==='undefined'?'undefined':_typeof(options))==='object'&&options.parentEl&&$(options.parentEl).length?$(options.parentEl):$(this.parentEl);this.container=$(DRPTemplate).appendTo(this.parentEl);this.setOptions(options,cb); //event listeners
this.container.find('.calendar').on('click.daterangepicker','.prev',$.proxy(this.clickPrev,this)).on('click.daterangepicker','.next',$.proxy(this.clickNext,this)).on('click.daterangepicker','td.available',$.proxy(this.clickDate,this)).on('mouseenter.daterangepicker','td.available',$.proxy(this.hoverDate,this)).on('mouseleave.daterangepicker','td.available',$.proxy(this.updateFormInputs,this)).on('change.daterangepicker','select.yearselect',$.proxy(this.updateMonthYear,this)).on('change.daterangepicker','select.monthselect',$.proxy(this.updateMonthYear,this)).on('change.daterangepicker','select.hourselect,select.minuteselect,select.secondselect,select.ampmselect',$.proxy(this.updateTime,this));this.container.find('.ranges').on('click.daterangepicker','button.applyBtn',$.proxy(this.clickApply,this)).on('click.daterangepicker','button.cancelBtn',$.proxy(this.clickCancel,this)).on('click.daterangepicker','.daterangepicker_start_input,.daterangepicker_end_input',$.proxy(this.showCalendars,this)).on('change.daterangepicker','.daterangepicker_start_input,.daterangepicker_end_input',$.proxy(this.inputsChanged,this)).on('keydown.daterangepicker','.daterangepicker_start_input,.daterangepicker_end_input',$.proxy(this.inputsKeydown,this)).on('click.daterangepicker','li',$.proxy(this.clickRange,this)).on('mouseenter.daterangepicker','li',$.proxy(this.enterRange,this)).on('mouseleave.daterangepicker','li',$.proxy(this.updateFormInputs,this));if(this.element.is('input')){this.element.on({'click.daterangepicker':$.proxy(this.show,this),'focus.daterangepicker':$.proxy(this.show,this),'keyup.daterangepicker':$.proxy(this.updateFromControl,this),'keydown.daterangepicker':$.proxy(this.keydown,this)});}else {this.element.on('click.daterangepicker',$.proxy(this.toggle,this));}};DateRangePicker.prototype={constructor:DateRangePicker,setOptions:function setOptions(options,callback){this.startDate=moment().startOf('day');this.endDate=moment().endOf('day');this.timeZone=moment().utcOffset();this.minDate=false;this.maxDate=false;this.dateLimit=false;this.showDropdowns=false;this.showWeekNumbers=false;this.timePicker=false;this.timePickerSeconds=false;this.timePickerIncrement=30;this.timePicker12Hour=true;this.singleDatePicker=false;this.ranges={};this.opens='right';if(this.element.hasClass('pull-right'))this.opens='left';this.drops='down';if(this.element.hasClass('dropup'))this.drops='up';this.buttonClasses=['btn','btn-small btn-sm'];this.applyClass='btn-success';this.cancelClass='btn-default';this.format='MM/DD/YYYY';this.separator=' - ';this.locale={applyLabel:'Apply',cancelLabel:'Cancel',fromLabel:'From',toLabel:'To',weekLabel:'W',customRangeLabel:'Custom Range',daysOfWeek:moment.weekdaysMin(),monthNames:moment.monthsShort(),firstDay:moment.localeData()._week.dow};this.cb=function(){};if(typeof options.format==='string')this.format=options.format;if(typeof options.separator==='string')this.separator=options.separator;if(typeof options.startDate==='string')this.startDate=moment(options.startDate,this.format);if(typeof options.endDate==='string')this.endDate=moment(options.endDate,this.format);if(typeof options.minDate==='string')this.minDate=moment(options.minDate,this.format);if(typeof options.maxDate==='string')this.maxDate=moment(options.maxDate,this.format);if(_typeof(options.startDate)==='object')this.startDate=moment(options.startDate);if(_typeof(options.endDate)==='object')this.endDate=moment(options.endDate);if(_typeof(options.minDate)==='object')this.minDate=moment(options.minDate);if(_typeof(options.maxDate)==='object')this.maxDate=moment(options.maxDate);if(typeof options.applyClass==='string')this.applyClass=options.applyClass;if(typeof options.cancelClass==='string')this.cancelClass=options.cancelClass;if(_typeof(options.dateLimit)==='object')this.dateLimit=options.dateLimit;if(_typeof(options.locale)==='object'){if(_typeof(options.locale.daysOfWeek)==='object'){ // Create a copy of daysOfWeek to avoid modification of original
// options object for reusability in multiple daterangepicker instances
this.locale.daysOfWeek=options.locale.daysOfWeek.slice();}if(_typeof(options.locale.monthNames)==='object'){this.locale.monthNames=options.locale.monthNames.slice();}if(typeof options.locale.firstDay==='number'){this.locale.firstDay=options.locale.firstDay;}if(typeof options.locale.applyLabel==='string'){this.locale.applyLabel=options.locale.applyLabel;}if(typeof options.locale.cancelLabel==='string'){this.locale.cancelLabel=options.locale.cancelLabel;}if(typeof options.locale.fromLabel==='string'){this.locale.fromLabel=options.locale.fromLabel;}if(typeof options.locale.toLabel==='string'){this.locale.toLabel=options.locale.toLabel;}if(typeof options.locale.weekLabel==='string'){this.locale.weekLabel=options.locale.weekLabel;}if(typeof options.locale.customRangeLabel==='string'){this.locale.customRangeLabel=options.locale.customRangeLabel;}}if(typeof options.opens==='string')this.opens=options.opens;if(typeof options.drops==='string')this.drops=options.drops;if(typeof options.showWeekNumbers==='boolean'){this.showWeekNumbers=options.showWeekNumbers;}if(typeof options.buttonClasses==='string'){this.buttonClasses=[options.buttonClasses];}if(_typeof(options.buttonClasses)==='object'){this.buttonClasses=options.buttonClasses;}if(typeof options.showDropdowns==='boolean'){this.showDropdowns=options.showDropdowns;}if(typeof options.singleDatePicker==='boolean'){this.singleDatePicker=options.singleDatePicker;if(this.singleDatePicker){this.endDate=this.startDate.clone();}}if(typeof options.timePicker==='boolean'){this.timePicker=options.timePicker;}if(typeof options.timePickerSeconds==='boolean'){this.timePickerSeconds=options.timePickerSeconds;}if(typeof options.timePickerIncrement==='number'){this.timePickerIncrement=options.timePickerIncrement;}if(typeof options.timePicker12Hour==='boolean'){this.timePicker12Hour=options.timePicker12Hour;} // update day names order to firstDay
if(this.locale.firstDay!=0){var iterator=this.locale.firstDay;while(iterator>0){this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());iterator--;}}var start,end,range; //if no start/end dates set, check if an input element contains initial values
if(typeof options.startDate==='undefined'&&typeof options.endDate==='undefined'){if($(this.element).is('input[type=text]')){var val=$(this.element).val(),split=val.split(this.separator);start=end=null;if(split.length==2){start=moment(split[0],this.format);end=moment(split[1],this.format);}else if(this.singleDatePicker&&val!==""){start=moment(val,this.format);end=moment(val,this.format);}if(start!==null&&end!==null){this.startDate=start;this.endDate=end;}}} // bind the time zone used to build the calendar to either the timeZone passed in through the options or the zone of the startDate (which will be the local time zone by default)
if(typeof options.timeZone==='string'||typeof options.timeZone==='number'){if(typeof options.timeZone==='string'&&typeof moment.tz!=='undefined'){this.timeZone=moment.tz.zone(options.timeZone).parse(new Date())*-1; // Offset is positive if the timezone is behind UTC and negative if it is ahead.
}else {this.timeZone=options.timeZone;}this.startDate.utcOffset(this.timeZone);this.endDate.utcOffset(this.timeZone);}else {this.timeZone=moment(this.startDate).utcOffset();}if(_typeof(options.ranges)==='object'){for(range in options.ranges){if(typeof options.ranges[range][0]==='string')start=moment(options.ranges[range][0],this.format);else start=moment(options.ranges[range][0]);if(typeof options.ranges[range][1]==='string')end=moment(options.ranges[range][1],this.format);else end=moment(options.ranges[range][1]); // If we have a min/max date set, bound this range
// to it, but only if it would otherwise fall
// outside of the min/max.
if(this.minDate&&start.isBefore(this.minDate))start=moment(this.minDate);if(this.maxDate&&end.isAfter(this.maxDate))end=moment(this.maxDate); // If the end of the range is before the minimum (if min is set) OR
// the start of the range is after the max (also if set) don't display this
// range option.
if(this.minDate&&end.isBefore(this.minDate)||this.maxDate&&start.isAfter(this.maxDate)){continue;}this.ranges[range]=[start,end];}var list='<ul>';for(range in this.ranges){list+='<li>'+range+'</li>';}list+='<li>'+this.locale.customRangeLabel+'</li>';list+='</ul>';this.container.find('.ranges ul').remove();this.container.find('.ranges').prepend(list);}if(typeof callback==='function'){this.cb=callback;}if(!this.timePicker){this.startDate=this.startDate.startOf('day');this.endDate=this.endDate.endOf('day');}if(this.singleDatePicker){this.opens='right';this.container.addClass('single');this.container.find('.calendar.right').show();this.container.find('.calendar.left').hide();if(!this.timePicker){this.container.find('.ranges').hide();}else {this.container.find('.ranges .daterangepicker_start_input, .ranges .daterangepicker_end_input').hide();}if(!this.container.find('.calendar.right').hasClass('single'))this.container.find('.calendar.right').addClass('single');}else {this.container.removeClass('single');this.container.find('.calendar.right').removeClass('single');this.container.find('.ranges').show();}this.oldStartDate=this.startDate.clone();this.oldEndDate=this.endDate.clone();this.oldChosenLabel=this.chosenLabel;this.leftCalendar={month:moment([this.startDate.year(),this.startDate.month(),1,this.startDate.hour(),this.startDate.minute(),this.startDate.second()]),calendar:[]};this.rightCalendar={month:moment([this.endDate.year(),this.endDate.month(),1,this.endDate.hour(),this.endDate.minute(),this.endDate.second()]),calendar:[]};if(this.opens=='right'||this.opens=='center'){ //swap calendar positions
var first=this.container.find('.calendar.first');var second=this.container.find('.calendar.second');if(second.hasClass('single')){second.removeClass('single');first.addClass('single');}first.removeClass('left').addClass('right');second.removeClass('right').addClass('left');if(this.singleDatePicker){first.show();second.hide();}}if(typeof options.ranges==='undefined'&&!this.singleDatePicker){this.container.addClass('show-calendar');}this.container.removeClass('opensleft opensright').addClass('opens'+this.opens);this.updateView();this.updateCalendars(); //apply CSS classes and labels to buttons
var c=this.container;$.each(this.buttonClasses,function(idx,val){c.find('button').addClass(val);});this.container.find('.daterangepicker_start_input label').html(this.locale.fromLabel);this.container.find('.daterangepicker_end_input label').html(this.locale.toLabel);if(this.applyClass.length)this.container.find('.applyBtn').addClass(this.applyClass);if(this.cancelClass.length)this.container.find('.cancelBtn').addClass(this.cancelClass);this.container.find('.applyBtn').html(this.locale.applyLabel);this.container.find('.cancelBtn').html(this.locale.cancelLabel);},setStartDate:function setStartDate(startDate){if(typeof startDate==='string')this.startDate=moment(startDate,this.format).utcOffset(this.timeZone);if((typeof startDate==='undefined'?'undefined':_typeof(startDate))==='object')this.startDate=moment(startDate);if(!this.timePicker)this.startDate=this.startDate.startOf('day');this.oldStartDate=this.startDate.clone();this.updateView();this.updateCalendars();this.updateInputText();},setEndDate:function setEndDate(endDate){if(typeof endDate==='string')this.endDate=moment(endDate,this.format).utcOffset(this.timeZone);if((typeof endDate==='undefined'?'undefined':_typeof(endDate))==='object')this.endDate=moment(endDate);if(!this.timePicker)this.endDate=this.endDate.endOf('day');this.oldEndDate=this.endDate.clone();this.updateView();this.updateCalendars();this.updateInputText();},updateView:function updateView(){this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()).hour(this.startDate.hour()).minute(this.startDate.minute());this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()).hour(this.endDate.hour()).minute(this.endDate.minute());this.updateFormInputs();},updateFormInputs:function updateFormInputs(){this.container.find('input[name=daterangepicker_start]').val(this.startDate.format(this.format));this.container.find('input[name=daterangepicker_end]').val(this.endDate.format(this.format));if(this.startDate.isSame(this.endDate)||this.startDate.isBefore(this.endDate)){this.container.find('button.applyBtn').removeAttr('disabled');}else {this.container.find('button.applyBtn').attr('disabled','disabled');}},updateFromControl:function updateFromControl(){if(!this.element.is('input'))return;if(!this.element.val().length)return;var dateString=this.element.val().split(this.separator),start=null,end=null;if(dateString.length===2){start=moment(dateString[0],this.format).utcOffset(this.timeZone);end=moment(dateString[1],this.format).utcOffset(this.timeZone);}if(this.singleDatePicker||start===null||end===null){start=moment(this.element.val(),this.format).utcOffset(this.timeZone);end=start;}if(end.isBefore(start))return;this.oldStartDate=this.startDate.clone();this.oldEndDate=this.endDate.clone();this.startDate=start;this.endDate=end;if(!this.startDate.isSame(this.oldStartDate)||!this.endDate.isSame(this.oldEndDate))this.notify();this.updateCalendars();},keydown:function keydown(e){ //hide on tab or enter
if(e.keyCode===9||e.keyCode===13){this.hide();}},notify:function notify(){this.updateView();this.cb(this.startDate,this.endDate,this.chosenLabel);},move:function move(){var parentOffset={top:0,left:0},containerTop;var parentRightEdge=$(window).width();if(!this.parentEl.is('body')){parentOffset={top:this.parentEl.offset().top-this.parentEl.scrollTop(),left:this.parentEl.offset().left-this.parentEl.scrollLeft()};parentRightEdge=this.parentEl[0].clientWidth+this.parentEl.offset().left;}if(this.drops=='up')containerTop=this.element.offset().top-this.container.outerHeight()-parentOffset.top;else containerTop=this.element.offset().top+this.element.outerHeight()-parentOffset.top;this.container[this.drops=='up'?'addClass':'removeClass']('dropup');if(this.opens=='left'){this.container.css({top:containerTop,right:parentRightEdge-this.element.offset().left-this.element.outerWidth(),left:'auto'});if(this.container.offset().left<0){this.container.css({right:'auto',left:9});}}else if(this.opens=='center'){this.container.css({top:containerTop,left:this.element.offset().left-parentOffset.left+this.element.outerWidth()/2-this.container.outerWidth()/2,right:'auto'});if(this.container.offset().left<0){this.container.css({right:'auto',left:9});}}else {this.container.css({top:containerTop,left:this.element.offset().left-parentOffset.left,right:'auto'});if(this.container.offset().left+this.container.outerWidth()>$(window).width()){this.container.css({left:'auto',right:0});}}},toggle:function toggle(e){if(this.element.hasClass('active')){this.hide();}else {this.show();}},show:function show(e){if(this.isShowing)return;this.element.addClass('active');this.container.show();this.move(); // Create a click proxy that is private to this instance of datepicker, for unbinding
this._outsideClickProxy=$.proxy(function(e){this.outsideClick(e);},this); // Bind global datepicker mousedown for hiding and
$(document).on('mousedown.daterangepicker',this._outsideClickProxy) // also support mobile devices
.on('touchend.daterangepicker',this._outsideClickProxy) // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
.on('click.daterangepicker','[data-toggle=dropdown]',this._outsideClickProxy) // and also close when focus changes to outside the picker (eg. tabbing between controls)
.on('focusin.daterangepicker',this._outsideClickProxy);this.isShowing=true;this.element.trigger('show.daterangepicker',this);},outsideClick:function outsideClick(e){var target=$(e.target); // if the page is clicked anywhere except within the daterangerpicker/button
// itself then call this.hide()
if( // ie modal dialog fix
e.type=="focusin"||target.closest(this.element).length||target.closest(this.container).length||target.closest('.calendar-date').length)return;this.hide();},hide:function hide(e){if(!this.isShowing)return;$(document).off('.daterangepicker');this.element.removeClass('active');this.container.hide();if(!this.startDate.isSame(this.oldStartDate)||!this.endDate.isSame(this.oldEndDate))this.notify();this.oldStartDate=this.startDate.clone();this.oldEndDate=this.endDate.clone();this.isShowing=false;this.element.trigger('hide.daterangepicker',this);},enterRange:function enterRange(e){ // mouse pointer has entered a range label
var label=e.target.innerHTML;if(label==this.locale.customRangeLabel){this.updateView();}else {var dates=this.ranges[label];this.container.find('input[name=daterangepicker_start]').val(dates[0].format(this.format));this.container.find('input[name=daterangepicker_end]').val(dates[1].format(this.format));}},showCalendars:function showCalendars(){this.container.addClass('show-calendar');this.move();this.element.trigger('showCalendar.daterangepicker',this);},hideCalendars:function hideCalendars(){this.container.removeClass('show-calendar');this.element.trigger('hideCalendar.daterangepicker',this);}, // when a date is typed into the start to end date textboxes
inputsChanged:function inputsChanged(e){var el=$(e.target);var date=moment(el.val(),this.format);if(!date.isValid())return;var startDate,endDate;if(el.attr('name')==='daterangepicker_start'){startDate=false!==this.minDate&&date.isBefore(this.minDate)?this.minDate:date;endDate=this.endDate;}else {startDate=this.startDate;endDate=false!==this.maxDate&&date.isAfter(this.maxDate)?this.maxDate:date;}this.setCustomDates(startDate,endDate);},inputsKeydown:function inputsKeydown(e){if(e.keyCode===13){this.inputsChanged(e);this.notify();}},updateInputText:function updateInputText(){if(this.element.is('input')&&!this.singleDatePicker){this.element.val(this.startDate.format(this.format)+this.separator+this.endDate.format(this.format));this.element.trigger('change');}else if(this.element.is('input')){this.element.val(this.endDate.format(this.format));this.element.trigger('change');}},clickRange:function clickRange(e){var label=e.target.innerHTML;this.chosenLabel=label;if(label==this.locale.customRangeLabel){this.showCalendars();}else {var dates=this.ranges[label];this.startDate=dates[0];this.endDate=dates[1];if(!this.timePicker){this.startDate.startOf('day');this.endDate.endOf('day');}this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()).hour(this.startDate.hour()).minute(this.startDate.minute());this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()).hour(this.endDate.hour()).minute(this.endDate.minute());this.updateCalendars();this.updateInputText();this.hideCalendars();this.hide();this.element.trigger('apply.daterangepicker',this);}},clickPrev:function clickPrev(e){var cal=$(e.target).parents('.calendar');if(cal.hasClass('left')){this.leftCalendar.month.subtract(1,'month');}else {this.rightCalendar.month.subtract(1,'month');}this.updateCalendars();},clickNext:function clickNext(e){var cal=$(e.target).parents('.calendar');if(cal.hasClass('left')){this.leftCalendar.month.add(1,'month');}else {this.rightCalendar.month.add(1,'month');}this.updateCalendars();},hoverDate:function hoverDate(e){var title=$(e.target).attr('data-title');var row=title.substr(1,1);var col=title.substr(3,1);var cal=$(e.target).parents('.calendar');if(cal.hasClass('left')){this.container.find('input[name=daterangepicker_start]').val(this.leftCalendar.calendar[row][col].format(this.format));}else {this.container.find('input[name=daterangepicker_end]').val(this.rightCalendar.calendar[row][col].format(this.format));}},setCustomDates:function setCustomDates(startDate,endDate){this.chosenLabel=this.locale.customRangeLabel;if(startDate.isAfter(endDate)){var difference=this.endDate.diff(this.startDate);endDate=moment(startDate).add(difference,'ms');if(this.maxDate&&endDate.isAfter(this.maxDate)){endDate=this.maxDate.clone();}}this.startDate=startDate;this.endDate=endDate;this.updateView();this.updateCalendars();},clickDate:function clickDate(e){var title=$(e.target).attr('data-title');var row=title.substr(1,1);var col=title.substr(3,1);var cal=$(e.target).parents('.calendar');var startDate,endDate;if(cal.hasClass('left')){startDate=this.leftCalendar.calendar[row][col];endDate=this.endDate;if(_typeof(this.dateLimit)==='object'){var maxDate=moment(startDate).add(this.dateLimit).startOf('day');if(endDate.isAfter(maxDate)){endDate=maxDate;}}}else {startDate=this.startDate;endDate=this.rightCalendar.calendar[row][col];if(_typeof(this.dateLimit)==='object'){var minDate=moment(endDate).subtract(this.dateLimit).startOf('day');if(startDate.isBefore(minDate)){startDate=minDate;}}}if(this.singleDatePicker&&cal.hasClass('left')){endDate=startDate.clone();}else if(this.singleDatePicker&&cal.hasClass('right')){startDate=endDate.clone();}cal.find('td').removeClass('active');$(e.target).addClass('active');this.setCustomDates(startDate,endDate);if(!this.timePicker)endDate.endOf('day');if(this.singleDatePicker&&!this.timePicker)this.clickApply();},clickApply:function clickApply(e){this.updateInputText();this.hide();this.element.trigger('apply.daterangepicker',this);},clickCancel:function clickCancel(e){this.startDate=this.oldStartDate;this.endDate=this.oldEndDate;this.chosenLabel=this.oldChosenLabel;this.updateView();this.updateCalendars();this.hide();this.element.trigger('cancel.daterangepicker',this);},updateMonthYear:function updateMonthYear(e){var isLeft=$(e.target).closest('.calendar').hasClass('left'),leftOrRight=isLeft?'left':'right',cal=this.container.find('.calendar.'+leftOrRight); // Month must be Number for new moment versions
var month=parseInt(cal.find('.monthselect').val(),10);var year=cal.find('.yearselect').val();if(!isLeft&&!this.singleDatePicker){if(year<this.startDate.year()||year==this.startDate.year()&&month<this.startDate.month()){month=this.startDate.month();year=this.startDate.year();}}if(this.minDate){if(year<this.minDate.year()||year==this.minDate.year()&&month<this.minDate.month()){month=this.minDate.month();year=this.minDate.year();}}if(this.maxDate){if(year>this.maxDate.year()||year==this.maxDate.year()&&month>this.maxDate.month()){month=this.maxDate.month();year=this.maxDate.year();}}this[leftOrRight+'Calendar'].month.month(month).year(year);this.updateCalendars();},updateTime:function updateTime(e){var cal=$(e.target).closest('.calendar'),isLeft=cal.hasClass('left');var hour=parseInt(cal.find('.hourselect').val(),10);var minute=parseInt(cal.find('.minuteselect').val(),10);var second=0;if(this.timePickerSeconds){second=parseInt(cal.find('.secondselect').val(),10);}if(this.timePicker12Hour){var ampm=cal.find('.ampmselect').val();if(ampm==='PM'&&hour<12)hour+=12;if(ampm==='AM'&&hour===12)hour=0;}if(isLeft){var start=this.startDate.clone();start.hour(hour);start.minute(minute);start.second(second);this.startDate=start;this.leftCalendar.month.hour(hour).minute(minute).second(second);if(this.singleDatePicker)this.endDate=start.clone();}else {var end=this.endDate.clone();end.hour(hour);end.minute(minute);end.second(second);this.endDate=end;if(this.singleDatePicker)this.startDate=end.clone();this.rightCalendar.month.hour(hour).minute(minute).second(second);}this.updateView();this.updateCalendars();},updateCalendars:function updateCalendars(){this.leftCalendar.calendar=this.buildCalendar(this.leftCalendar.month.month(),this.leftCalendar.month.year(),this.leftCalendar.month.hour(),this.leftCalendar.month.minute(),this.leftCalendar.month.second(),'left');this.rightCalendar.calendar=this.buildCalendar(this.rightCalendar.month.month(),this.rightCalendar.month.year(),this.rightCalendar.month.hour(),this.rightCalendar.month.minute(),this.rightCalendar.month.second(),'right');this.container.find('.calendar.left').empty().html(this.renderCalendar(this.leftCalendar.calendar,this.startDate,this.minDate,this.maxDate,'left'));this.container.find('.calendar.right').empty().html(this.renderCalendar(this.rightCalendar.calendar,this.endDate,this.singleDatePicker?this.minDate:this.startDate,this.maxDate,'right'));this.container.find('.ranges li').removeClass('active');var customRange=true;var i=0;for(var range in this.ranges){if(this.timePicker){if(this.startDate.isSame(this.ranges[range][0])&&this.endDate.isSame(this.ranges[range][1])){customRange=false;this.chosenLabel=this.container.find('.ranges li:eq('+i+')').addClass('active').html();}}else { //ignore times when comparing dates if time picker is not enabled
if(this.startDate.format('YYYY-MM-DD')==this.ranges[range][0].format('YYYY-MM-DD')&&this.endDate.format('YYYY-MM-DD')==this.ranges[range][1].format('YYYY-MM-DD')){customRange=false;this.chosenLabel=this.container.find('.ranges li:eq('+i+')').addClass('active').html();}}i++;}if(customRange){this.chosenLabel=this.container.find('.ranges li:last').addClass('active').html();this.showCalendars();}},buildCalendar:function buildCalendar(month,year,hour,minute,second,side){var daysInMonth=moment([year,month]).daysInMonth();var firstDay=moment([year,month,1]);var lastDay=moment([year,month,daysInMonth]);var lastMonth=moment(firstDay).subtract(1,'month').month();var lastYear=moment(firstDay).subtract(1,'month').year();var daysInLastMonth=moment([lastYear,lastMonth]).daysInMonth();var dayOfWeek=firstDay.day();var i; //initialize a 6 rows x 7 columns array for the calendar
var calendar=[];calendar.firstDay=firstDay;calendar.lastDay=lastDay;for(i=0;i<6;i++){calendar[i]=[];} //populate the calendar with date objects
var startDay=daysInLastMonth-dayOfWeek+this.locale.firstDay+1;if(startDay>daysInLastMonth)startDay-=7;if(dayOfWeek==this.locale.firstDay)startDay=daysInLastMonth-6;var curDate=moment([lastYear,lastMonth,startDay,12,minute,second]).utcOffset(this.timeZone);var col,row;for(i=0,col=0,row=0;i<42;i++,col++,curDate=moment(curDate).add(24,'hour')){if(i>0&&col%7===0){col=0;row++;}calendar[row][col]=curDate.clone().hour(hour);curDate.hour(12);if(this.minDate&&calendar[row][col].format('YYYY-MM-DD')==this.minDate.format('YYYY-MM-DD')&&calendar[row][col].isBefore(this.minDate)&&side=='left'){calendar[row][col]=this.minDate.clone();}if(this.maxDate&&calendar[row][col].format('YYYY-MM-DD')==this.maxDate.format('YYYY-MM-DD')&&calendar[row][col].isAfter(this.maxDate)&&side=='right'){calendar[row][col]=this.maxDate.clone();}}return calendar;},renderDropdowns:function renderDropdowns(selected,minDate,maxDate){var currentMonth=selected.month();var currentYear=selected.year();var maxYear=maxDate&&maxDate.year()||currentYear+5;var minYear=minDate&&minDate.year()||currentYear-50;var monthHtml='<select class="monthselect">';var inMinYear=currentYear==minYear;var inMaxYear=currentYear==maxYear;for(var m=0;m<12;m++){if((!inMinYear||m>=minDate.month())&&(!inMaxYear||m<=maxDate.month())){monthHtml+="<option value='"+m+"'"+(m===currentMonth?" selected='selected'":"")+">"+this.locale.monthNames[m]+"</option>";}}monthHtml+="</select>";var yearHtml='<select class="yearselect">';for(var y=minYear;y<=maxYear;y++){yearHtml+='<option value="'+y+'"'+(y===currentYear?' selected="selected"':'')+'>'+y+'</option>';}yearHtml+='</select>';return monthHtml+yearHtml;},renderCalendar:function renderCalendar(calendar,selected,minDate,maxDate,side){var html='<div class="calendar-date">';html+='<table class="table-condensed">';html+='<thead>';html+='<tr>'; // add empty cell for week number
if(this.showWeekNumbers)html+='<th></th>';if(!minDate||minDate.isBefore(calendar.firstDay)){html+='<th class="prev available"><i class="fa fa-arrow-left icon icon-arrow-left glyphicon glyphicon-arrow-left"></i></th>';}else {html+='<th></th>';}var dateHtml=this.locale.monthNames[calendar[1][1].month()]+calendar[1][1].format(" YYYY");if(this.showDropdowns){dateHtml=this.renderDropdowns(calendar[1][1],minDate,maxDate);}html+='<th colspan="5" class="month">'+dateHtml+'</th>';if(!maxDate||maxDate.isAfter(calendar.lastDay)){html+='<th class="next available"><i class="fa fa-arrow-right icon icon-arrow-right glyphicon glyphicon-arrow-right"></i></th>';}else {html+='<th></th>';}html+='</tr>';html+='<tr>'; // add week number label
if(this.showWeekNumbers)html+='<th class="week">'+this.locale.weekLabel+'</th>';$.each(this.locale.daysOfWeek,function(index,dayOfWeek){html+='<th>'+dayOfWeek+'</th>';});html+='</tr>';html+='</thead>';html+='<tbody>';for(var row=0;row<6;row++){html+='<tr>'; // add week number
if(this.showWeekNumbers)html+='<td class="week">'+calendar[row][0].week()+'</td>';for(var col=0;col<7;col++){var cname='available ';cname+=calendar[row][col].month()==calendar[1][1].month()?'':'off';if(minDate&&calendar[row][col].isBefore(minDate,'day')||maxDate&&calendar[row][col].isAfter(maxDate,'day')){cname=' off disabled ';}else if(calendar[row][col].format('YYYY-MM-DD')==selected.format('YYYY-MM-DD')){cname+=' active ';if(calendar[row][col].format('YYYY-MM-DD')==this.startDate.format('YYYY-MM-DD')){cname+=' start-date ';}if(calendar[row][col].format('YYYY-MM-DD')==this.endDate.format('YYYY-MM-DD')){cname+=' end-date ';}}else if(calendar[row][col]>=this.startDate&&calendar[row][col]<=this.endDate){cname+=' in-range ';if(calendar[row][col].isSame(this.startDate)){cname+=' start-date ';}if(calendar[row][col].isSame(this.endDate)){cname+=' end-date ';}}var title='r'+row+'c'+col;html+='<td class="'+cname.replace(/\s+/g,' ').replace(/^\s?(.*?)\s?$/,'$1')+'" data-title="'+title+'">'+calendar[row][col].date()+'</td>';}html+='</tr>';}html+='</tbody>';html+='</table>';html+='</div>';var i;if(this.timePicker){html+='<div class="calendar-time">';html+='<select class="hourselect">'; // Disallow selections before the minDate or after the maxDate
var min_hour=0;var max_hour=23;if(minDate&&(side=='left'||this.singleDatePicker)&&selected.format('YYYY-MM-DD')==minDate.format('YYYY-MM-DD')){min_hour=minDate.hour();if(selected.hour()<min_hour)selected.hour(min_hour);if(this.timePicker12Hour&&min_hour>=12&&selected.hour()>=12)min_hour-=12;if(this.timePicker12Hour&&min_hour==12)min_hour=1;}if(maxDate&&(side=='right'||this.singleDatePicker)&&selected.format('YYYY-MM-DD')==maxDate.format('YYYY-MM-DD')){max_hour=maxDate.hour();if(selected.hour()>max_hour)selected.hour(max_hour);if(this.timePicker12Hour&&max_hour>=12&&selected.hour()>=12)max_hour-=12;}var start=0;var end=23;var selected_hour=selected.hour();if(this.timePicker12Hour){start=1;end=12;if(selected_hour>=12)selected_hour-=12;if(selected_hour===0)selected_hour=12;}for(i=start;i<=end;i++){if(i==selected_hour){html+='<option value="'+i+'" selected="selected">'+i+'</option>';}else if(i<min_hour||i>max_hour){html+='<option value="'+i+'" disabled="disabled" class="disabled">'+i+'</option>';}else {html+='<option value="'+i+'">'+i+'</option>';}}html+='</select> : ';html+='<select class="minuteselect">'; // Disallow selections before the minDate or after the maxDate
var min_minute=0;var max_minute=59;if(minDate&&(side=='left'||this.singleDatePicker)&&selected.format('YYYY-MM-DD h A')==minDate.format('YYYY-MM-DD h A')){min_minute=minDate.minute();if(selected.minute()<min_minute)selected.minute(min_minute);}if(maxDate&&(side=='right'||this.singleDatePicker)&&selected.format('YYYY-MM-DD h A')==maxDate.format('YYYY-MM-DD h A')){max_minute=maxDate.minute();if(selected.minute()>max_minute)selected.minute(max_minute);}for(i=0;i<60;i+=this.timePickerIncrement){var num=i;if(num<10)num='0'+num;if(i==selected.minute()){html+='<option value="'+i+'" selected="selected">'+num+'</option>';}else if(i<min_minute||i>max_minute){html+='<option value="'+i+'" disabled="disabled" class="disabled">'+num+'</option>';}else {html+='<option value="'+i+'">'+num+'</option>';}}html+='</select> ';if(this.timePickerSeconds){html+=': <select class="secondselect">';for(i=0;i<60;i+=this.timePickerIncrement){var num=i;if(num<10)num='0'+num;if(i==selected.second()){html+='<option value="'+i+'" selected="selected">'+num+'</option>';}else {html+='<option value="'+i+'">'+num+'</option>';}}html+='</select>';}if(this.timePicker12Hour){html+='<select class="ampmselect">'; // Disallow selection before the minDate or after the maxDate
var am_html='';var pm_html='';if(minDate&&(side=='left'||this.singleDatePicker)&&selected.format('YYYY-MM-DD')==minDate.format('YYYY-MM-DD')&&minDate.hour()>=12){am_html=' disabled="disabled" class="disabled"';}if(maxDate&&(side=='right'||this.singleDatePicker)&&selected.format('YYYY-MM-DD')==maxDate.format('YYYY-MM-DD')&&maxDate.hour()<12){pm_html=' disabled="disabled" class="disabled"';}if(selected.hour()>=12){html+='<option value="AM"'+am_html+'>AM</option><option value="PM" selected="selected"'+pm_html+'>PM</option>';}else {html+='<option value="AM" selected="selected"'+am_html+'>AM</option><option value="PM"'+pm_html+'>PM</option>';}html+='</select>';}html+='</div>';}return html;},remove:function remove(){this.container.remove();this.element.off('.daterangepicker');this.element.removeData('daterangepicker');}};$.fn.daterangepicker=function(options,cb){this.each(function(){var el=$(this);if(el.data('daterangepicker'))el.data('daterangepicker').remove();el.data('daterangepicker',new DateRangePicker(el,options,cb));});return this;};}); /* =========================================================
 * bootstrap-datepicker.js
 * Repo: https://github.com/eternicode/bootstrap-datepicker/
 * Demo: http://eternicode.github.io/bootstrap-datepicker/
 * Docs: http://bootstrap-datepicker.readthedocs.org/
 * Forked from http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Started by Stefan Petre; improvements by Andrew Rowls + contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */(function($,undefined){var $window=$(window);function UTCDate(){return new Date(Date.UTC.apply(Date,arguments));}function UTCToday(){var today=new Date();return UTCDate(today.getFullYear(),today.getMonth(),today.getDate());}function alias(method){return function(){return this[method].apply(this,arguments);};}var DateArray=function(){var extras={get:function get(i){return this.slice(i)[0];},contains:function contains(d){ // Array.indexOf is not cross-browser;
// $.inArray doesn't work with Dates
var val=d&&d.valueOf();for(var i=0,l=this.length;i<l;i++){if(this[i].valueOf()===val)return i;}return -1;},remove:function remove(i){this.splice(i,1);},replace:function replace(new_array){if(!new_array)return;if(!$.isArray(new_array))new_array=[new_array];this.clear();this.push.apply(this,new_array);},clear:function clear(){this.splice(0);},copy:function copy(){var a=new DateArray();a.replace(this);return a;}};return function(){var a=[];a.push.apply(a,arguments);$.extend(a,extras);return a;};}(); // Picker object
var Datepicker=function Datepicker(element,options){this.dates=new DateArray();this.viewDate=UTCToday();this.focusDate=null;this._process_options(options);this.element=$(element);this.isInline=false;this.isInput=this.element.is('input');this.component=this.element.is('.date')?this.element.find('.add-on, .input-group-addon, .btn'):false;this.hasInput=this.component&&this.element.find('input').length;if(this.component&&this.component.length===0)this.component=false;this.picker=$(DPGlobal.template);this._buildEvents();this._attachEvents();if(this.isInline){this.picker.addClass('datepicker-inline').appendTo(this.element);}else {this.picker.addClass('datepicker-dropdown dropdown-menu');}if(this.o.rtl){this.picker.addClass('datepicker-rtl');}this.viewMode=this.o.startView;if(this.o.calendarWeeks)this.picker.find('tfoot th.today').attr('colspan',function(i,val){return parseInt(val)+1;});this._allow_update=false;this.setStartDate(this._o.startDate);this.setEndDate(this._o.endDate);this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);this.fillDow();this.fillMonths();this._allow_update=true;this.update();this.showMode();if(this.isInline){this.show();}};Datepicker.prototype={constructor:Datepicker,_process_options:function _process_options(opts){ // Store raw options for reference
this._o=$.extend({},this._o,opts); // Processed options
var o=this.o=$.extend({},this._o); // Check if "de-DE" style date is available, if not language should
// fallback to 2 letter code eg "de"
var lang=o.language;if(!dates[lang]){lang=lang.split('-')[0];if(!dates[lang])lang=defaults.language;}o.language=lang;switch(o.startView){case 2:case 'decade':o.startView=2;break;case 1:case 'year':o.startView=1;break;default:o.startView=0;}switch(o.minViewMode){case 1:case 'months':o.minViewMode=1;break;case 2:case 'years':o.minViewMode=2;break;default:o.minViewMode=0;}o.startView=Math.max(o.startView,o.minViewMode); // true, false, or Number > 0
if(o.multidate!==true){o.multidate=Number(o.multidate)||false;if(o.multidate!==false)o.multidate=Math.max(0,o.multidate);else o.multidate=1;}o.multidateSeparator=String(o.multidateSeparator);o.weekStart%=7;o.weekEnd=(o.weekStart+6)%7;var format=DPGlobal.parseFormat(o.format);if(o.startDate!==-Infinity){if(!!o.startDate){if(o.startDate instanceof Date)o.startDate=this._local_to_utc(this._zero_time(o.startDate));else o.startDate=DPGlobal.parseDate(o.startDate,format,o.language);}else {o.startDate=-Infinity;}}if(o.endDate!==Infinity){if(!!o.endDate){if(o.endDate instanceof Date)o.endDate=this._local_to_utc(this._zero_time(o.endDate));else o.endDate=DPGlobal.parseDate(o.endDate,format,o.language);}else {o.endDate=Infinity;}}o.daysOfWeekDisabled=o.daysOfWeekDisabled||[];if(!$.isArray(o.daysOfWeekDisabled))o.daysOfWeekDisabled=o.daysOfWeekDisabled.split(/[,\s]*/);o.daysOfWeekDisabled=$.map(o.daysOfWeekDisabled,function(d){return parseInt(d,10);});var plc=String(o.orientation).toLowerCase().split(/\s+/g),_plc=o.orientation.toLowerCase();plc=$.grep(plc,function(word){return (/^auto|left|right|top|bottom$/.test(word));});o.orientation={x:'auto',y:'auto'};if(!_plc||_plc==='auto'); // no action
else if(plc.length===1){switch(plc[0]){case 'top':case 'bottom':o.orientation.y=plc[0];break;case 'left':case 'right':o.orientation.x=plc[0];break;}}else {_plc=$.grep(plc,function(word){return (/^left|right$/.test(word));});o.orientation.x=_plc[0]||'auto';_plc=$.grep(plc,function(word){return (/^top|bottom$/.test(word));});o.orientation.y=_plc[0]||'auto';}},_events:[],_secondaryEvents:[],_applyEvents:function _applyEvents(evs){for(var i=0,el,ch,ev;i<evs.length;i++){el=evs[i][0];if(evs[i].length===2){ch=undefined;ev=evs[i][1];}else if(evs[i].length===3){ch=evs[i][1];ev=evs[i][2];}el.on(ev,ch);}},_unapplyEvents:function _unapplyEvents(evs){for(var i=0,el,ev,ch;i<evs.length;i++){el=evs[i][0];if(evs[i].length===2){ch=undefined;ev=evs[i][1];}else if(evs[i].length===3){ch=evs[i][1];ev=evs[i][2];}el.off(ev,ch);}},_buildEvents:function _buildEvents(){if(this.isInput){ // single input
this._events=[[this.element,{focus:$.proxy(this.show,this),keyup:$.proxy(function(e){if($.inArray(e.keyCode,[27,37,39,38,40,32,13,9])===-1)this.update();},this),keydown:$.proxy(this.keydown,this)}]];}else if(this.component&&this.hasInput){ // component: input + button
this._events=[ // For components that are not readonly, allow keyboard nav
[this.element.find('input'),{focus:$.proxy(this.show,this),keyup:$.proxy(function(e){if($.inArray(e.keyCode,[27,37,39,38,40,32,13,9])===-1)this.update();},this),keydown:$.proxy(this.keydown,this)}],[this.component,{click:$.proxy(this.show,this)}]];}else if(this.element.is('div')){ // inline datepicker
this.isInline=true;}else {this._events=[[this.element,{click:$.proxy(this.show,this)}]];}this._events.push( // Component: listen for blur on element descendants
[this.element,'*',{blur:$.proxy(function(e){this._focused_from=e.target;},this)}], // Input: listen for blur on element
[this.element,{blur:$.proxy(function(e){this._focused_from=e.target;},this)}]);this._secondaryEvents=[[this.picker,{click:$.proxy(this.click,this)}],[$(window),{resize:$.proxy(this.place,this)}],[$(document),{'mousedown touchstart':$.proxy(function(e){ // Clicked outside the datepicker, hide it
if(!(this.element.is(e.target)||this.element.find(e.target).length||this.picker.is(e.target)||this.picker.find(e.target).length)){this.hide();}},this)}]];},_attachEvents:function _attachEvents(){this._detachEvents();this._applyEvents(this._events);},_detachEvents:function _detachEvents(){this._unapplyEvents(this._events);},_attachSecondaryEvents:function _attachSecondaryEvents(){this._detachSecondaryEvents();this._applyEvents(this._secondaryEvents);},_detachSecondaryEvents:function _detachSecondaryEvents(){this._unapplyEvents(this._secondaryEvents);},_trigger:function _trigger(event,altdate){var date=altdate||this.dates.get(-1),local_date=this._utc_to_local(date);this.element.trigger({type:event,date:local_date,dates:$.map(this.dates,this._utc_to_local),format:$.proxy(function(ix,format){if(arguments.length===0){ix=this.dates.length-1;format=this.o.format;}else if(typeof ix==='string'){format=ix;ix=this.dates.length-1;}format=format||this.o.format;var date=this.dates.get(ix);return DPGlobal.formatDate(date,format,this.o.language);},this)});},show:function show(){if(!this.isInline)this.picker.appendTo('body');this.picker.show();this.place();this._attachSecondaryEvents();this._trigger('show');},hide:function hide(){if(this.isInline)return;if(!this.picker.is(':visible'))return;this.focusDate=null;this.picker.hide().detach();this._detachSecondaryEvents();this.viewMode=this.o.startView;this.showMode();if(this.o.forceParse&&(this.isInput&&this.element.val()||this.hasInput&&this.element.find('input').val()))this.setValue();this._trigger('hide');},remove:function remove(){this.hide();this._detachEvents();this._detachSecondaryEvents();this.picker.remove();delete this.element.data().datepicker;if(!this.isInput){delete this.element.data().date;}},_utc_to_local:function _utc_to_local(utc){return utc&&new Date(utc.getTime()+utc.getTimezoneOffset()*60000);},_local_to_utc:function _local_to_utc(local){return local&&new Date(local.getTime()-local.getTimezoneOffset()*60000);},_zero_time:function _zero_time(local){return local&&new Date(local.getFullYear(),local.getMonth(),local.getDate());},_zero_utc_time:function _zero_utc_time(utc){return utc&&new Date(Date.UTC(utc.getUTCFullYear(),utc.getUTCMonth(),utc.getUTCDate()));},getDates:function getDates(){return $.map(this.dates,this._utc_to_local);},getUTCDates:function getUTCDates(){return $.map(this.dates,function(d){return new Date(d);});},getDate:function getDate(){return this._utc_to_local(this.getUTCDate());},getUTCDate:function getUTCDate(){return new Date(this.dates.get(-1));},setDates:function setDates(){var args=$.isArray(arguments[0])?arguments[0]:arguments;this.update.apply(this,args);this._trigger('changeDate');this.setValue();},setUTCDates:function setUTCDates(){var args=$.isArray(arguments[0])?arguments[0]:arguments;this.update.apply(this,$.map(args,this._utc_to_local));this._trigger('changeDate');this.setValue();},setDate:alias('setDates'),setUTCDate:alias('setUTCDates'),setValue:function setValue(){var formatted=this.getFormattedDate();if(!this.isInput){if(this.component){this.element.find('input').val(formatted).change();}}else {this.element.val(formatted).change();}},getFormattedDate:function getFormattedDate(format){if(format===undefined)format=this.o.format;var lang=this.o.language;return $.map(this.dates,function(d){return DPGlobal.formatDate(d,format,lang);}).join(this.o.multidateSeparator);},setStartDate:function setStartDate(startDate){this._process_options({startDate:startDate});this.update();this.updateNavArrows();},setEndDate:function setEndDate(endDate){this._process_options({endDate:endDate});this.update();this.updateNavArrows();},setDaysOfWeekDisabled:function setDaysOfWeekDisabled(daysOfWeekDisabled){this._process_options({daysOfWeekDisabled:daysOfWeekDisabled});this.update();this.updateNavArrows();},place:function place(){if(this.isInline)return;var calendarWidth=this.picker.outerWidth(),calendarHeight=this.picker.outerHeight(),visualPadding=10,windowWidth=$window.width(),windowHeight=$window.height(),scrollTop=$window.scrollTop();var zIndex=parseInt(this.element.parents().filter(function(){return $(this).css('z-index')!=='auto';}).first().css('z-index'))+10;var offset=this.component?this.component.parent().offset():this.element.offset();var height=this.component?this.component.outerHeight(true):this.element.outerHeight(false);var width=this.component?this.component.outerWidth(true):this.element.outerWidth(false);var left=offset.left,top=offset.top;this.picker.removeClass('datepicker-orient-top datepicker-orient-bottom '+'datepicker-orient-right datepicker-orient-left');if(this.o.orientation.x!=='auto'){this.picker.addClass('datepicker-orient-'+this.o.orientation.x);if(this.o.orientation.x==='right')left-=calendarWidth-width;} // auto x orientation is best-placement: if it crosses a window
// edge, fudge it sideways
else { // Default to left
this.picker.addClass('datepicker-orient-left');if(offset.left<0)left-=offset.left-visualPadding;else if(offset.left+calendarWidth>windowWidth)left=windowWidth-calendarWidth-visualPadding;} // auto y orientation is best-situation: top or bottom, no fudging,
// decision based on which shows more of the calendar
var yorient=this.o.orientation.y,top_overflow,bottom_overflow;if(yorient==='auto'){top_overflow=-scrollTop+offset.top-calendarHeight;bottom_overflow=scrollTop+windowHeight-(offset.top+height+calendarHeight);if(Math.max(top_overflow,bottom_overflow)===bottom_overflow)yorient='top';else yorient='bottom';}this.picker.addClass('datepicker-orient-'+yorient);if(yorient==='top')top+=height;else top-=calendarHeight+parseInt(this.picker.css('padding-top'));this.picker.css({top:top,left:left,zIndex:zIndex});},_allow_update:true,update:function update(){if(!this._allow_update)return;var oldDates=this.dates.copy(),dates=[],fromArgs=false;if(arguments.length){$.each(arguments,$.proxy(function(i,date){if(date instanceof Date)date=this._local_to_utc(date);dates.push(date);},this));fromArgs=true;}else {dates=this.isInput?this.element.val():this.element.data('date')||this.element.find('input').val();if(dates&&this.o.multidate)dates=dates.split(this.o.multidateSeparator);else dates=[dates];delete this.element.data().date;}dates=$.map(dates,$.proxy(function(date){return DPGlobal.parseDate(date,this.o.format,this.o.language);},this));dates=$.grep(dates,$.proxy(function(date){return date<this.o.startDate||date>this.o.endDate||!date;},this),true);this.dates.replace(dates);if(this.dates.length)this.viewDate=new Date(this.dates.get(-1));else if(this.viewDate<this.o.startDate)this.viewDate=new Date(this.o.startDate);else if(this.viewDate>this.o.endDate)this.viewDate=new Date(this.o.endDate);if(fromArgs){ // setting date by clicking
this.setValue();}else if(dates.length){ // setting date by typing
if(String(oldDates)!==String(this.dates))this._trigger('changeDate');}if(!this.dates.length&&oldDates.length)this._trigger('clearDate');this.fill();},fillDow:function fillDow(){var dowCnt=this.o.weekStart,html='<tr>';if(this.o.calendarWeeks){var cell='<th class="cw">&nbsp;</th>';html+=cell;this.picker.find('.datepicker-days thead tr:first-child').prepend(cell);}while(dowCnt<this.o.weekStart+7){html+='<th class="dow">'+dates[this.o.language].daysMin[dowCnt++%7]+'</th>';}html+='</tr>';this.picker.find('.datepicker-days thead').append(html);},fillMonths:function fillMonths(){var html='',i=0;while(i<12){html+='<span class="month">'+dates[this.o.language].monthsShort[i++]+'</span>';}this.picker.find('.datepicker-months td').html(html);},setRange:function setRange(range){if(!range||!range.length)delete this.range;else this.range=$.map(range,function(d){return d.valueOf();});this.fill();},getClassNames:function getClassNames(date){var cls=[],year=this.viewDate.getUTCFullYear(),month=this.viewDate.getUTCMonth(),today=new Date();if(date.getUTCFullYear()<year||date.getUTCFullYear()===year&&date.getUTCMonth()<month){cls.push('old');}else if(date.getUTCFullYear()>year||date.getUTCFullYear()===year&&date.getUTCMonth()>month){cls.push('new');}if(this.focusDate&&date.valueOf()===this.focusDate.valueOf())cls.push('focused'); // Compare internal UTC date with local today, not UTC today
if(this.o.todayHighlight&&date.getUTCFullYear()===today.getFullYear()&&date.getUTCMonth()===today.getMonth()&&date.getUTCDate()===today.getDate()){cls.push('today');}if(this.dates.contains(date)!==-1)cls.push('active');if(date.valueOf()<this.o.startDate||date.valueOf()>this.o.endDate||$.inArray(date.getUTCDay(),this.o.daysOfWeekDisabled)!==-1){cls.push('disabled');}if(this.range){if(date>this.range[0]&&date<this.range[this.range.length-1]){cls.push('range');}if($.inArray(date.valueOf(),this.range)!==-1){cls.push('selected');}}return cls;},fill:function fill(){var d=new Date(this.viewDate),year=d.getUTCFullYear(),month=d.getUTCMonth(),startYear=this.o.startDate!==-Infinity?this.o.startDate.getUTCFullYear():-Infinity,startMonth=this.o.startDate!==-Infinity?this.o.startDate.getUTCMonth():-Infinity,endYear=this.o.endDate!==Infinity?this.o.endDate.getUTCFullYear():Infinity,endMonth=this.o.endDate!==Infinity?this.o.endDate.getUTCMonth():Infinity,todaytxt=dates[this.o.language].today||dates['en'].today||'',cleartxt=dates[this.o.language].clear||dates['en'].clear||'',tooltip;this.picker.find('.datepicker-days thead th.datepicker-switch').text(dates[this.o.language].months[month]+' '+year);this.picker.find('tfoot th.today').text(todaytxt).toggle(this.o.todayBtn!==false);this.picker.find('tfoot th.clear').text(cleartxt).toggle(this.o.clearBtn!==false);this.updateNavArrows();this.fillMonths();var prevMonth=UTCDate(year,month-1,28),day=DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(),prevMonth.getUTCMonth());prevMonth.setUTCDate(day);prevMonth.setUTCDate(day-(prevMonth.getUTCDay()-this.o.weekStart+7)%7);var nextMonth=new Date(prevMonth);nextMonth.setUTCDate(nextMonth.getUTCDate()+42);nextMonth=nextMonth.valueOf();var html=[];var clsName;while(prevMonth.valueOf()<nextMonth){if(prevMonth.getUTCDay()===this.o.weekStart){html.push('<tr>');if(this.o.calendarWeeks){ // ISO 8601: First week contains first thursday.
// ISO also states week starts on Monday, but we can be more abstract here.
var  // Start of current week: based on weekstart/current date
ws=new Date(+prevMonth+(this.o.weekStart-prevMonth.getUTCDay()-7)%7*864e5), // Thursday of this week
th=new Date(Number(ws)+(7+4-ws.getUTCDay())%7*864e5), // First Thursday of year, year from thursday
yth=new Date(Number(yth=UTCDate(th.getUTCFullYear(),0,1))+(7+4-yth.getUTCDay())%7*864e5), // Calendar week: ms between thursdays, div ms per day, div 7 days
calWeek=(th-yth)/864e5/7+1;html.push('<td class="cw">'+calWeek+'</td>');}}clsName=this.getClassNames(prevMonth);clsName.push('day');if(this.o.beforeShowDay!==$.noop){var before=this.o.beforeShowDay(this._utc_to_local(prevMonth));if(before===undefined)before={};else if(typeof before==='boolean')before={enabled:before};else if(typeof before==='string')before={classes:before};if(before.enabled===false)clsName.push('disabled');if(before.classes)clsName=clsName.concat(before.classes.split(/\s+/));if(before.tooltip)tooltip=before.tooltip;}clsName=$.unique(clsName);html.push('<td class="'+clsName.join(' ')+'"'+(tooltip?' title="'+tooltip+'"':'')+'>'+prevMonth.getUTCDate()+'</td>');if(prevMonth.getUTCDay()===this.o.weekEnd){html.push('</tr>');}prevMonth.setUTCDate(prevMonth.getUTCDate()+1);}this.picker.find('.datepicker-days tbody').empty().append(html.join(''));var months=this.picker.find('.datepicker-months').find('th:eq(1)').text(year).end().find('span').removeClass('active');$.each(this.dates,function(i,d){if(d.getUTCFullYear()===year)months.eq(d.getUTCMonth()).addClass('active');});if(year<startYear||year>endYear){months.addClass('disabled');}if(year===startYear){months.slice(0,startMonth).addClass('disabled');}if(year===endYear){months.slice(endMonth+1).addClass('disabled');}html='';year=parseInt(year/10,10)*10;var yearCont=this.picker.find('.datepicker-years').find('th:eq(1)').text(year+'-'+(year+9)).end().find('td');year-=1;var years=$.map(this.dates,function(d){return d.getUTCFullYear();}),classes;for(var i=-1;i<11;i++){classes=['year'];if(i===-1)classes.push('old');else if(i===10)classes.push('new');if($.inArray(year,years)!==-1)classes.push('active');if(year<startYear||year>endYear)classes.push('disabled');html+='<span class="'+classes.join(' ')+'">'+year+'</span>';year+=1;}yearCont.html(html);},updateNavArrows:function updateNavArrows(){if(!this._allow_update)return;var d=new Date(this.viewDate),year=d.getUTCFullYear(),month=d.getUTCMonth();switch(this.viewMode){case 0:if(this.o.startDate!==-Infinity&&year<=this.o.startDate.getUTCFullYear()&&month<=this.o.startDate.getUTCMonth()){this.picker.find('.prev').css({visibility:'hidden'});}else {this.picker.find('.prev').css({visibility:'visible'});}if(this.o.endDate!==Infinity&&year>=this.o.endDate.getUTCFullYear()&&month>=this.o.endDate.getUTCMonth()){this.picker.find('.next').css({visibility:'hidden'});}else {this.picker.find('.next').css({visibility:'visible'});}break;case 1:case 2:if(this.o.startDate!==-Infinity&&year<=this.o.startDate.getUTCFullYear()){this.picker.find('.prev').css({visibility:'hidden'});}else {this.picker.find('.prev').css({visibility:'visible'});}if(this.o.endDate!==Infinity&&year>=this.o.endDate.getUTCFullYear()){this.picker.find('.next').css({visibility:'hidden'});}else {this.picker.find('.next').css({visibility:'visible'});}break;}},click:function click(e){e.preventDefault();var target=$(e.target).closest('span, td, th'),year,month,day;if(target.length===1){switch(target[0].nodeName.toLowerCase()){case 'th':switch(target[0].className){case 'datepicker-switch':this.showMode(1);break;case 'prev':case 'next':var dir=DPGlobal.modes[this.viewMode].navStep*(target[0].className==='prev'?-1:1);switch(this.viewMode){case 0:this.viewDate=this.moveMonth(this.viewDate,dir);this._trigger('changeMonth',this.viewDate);break;case 1:case 2:this.viewDate=this.moveYear(this.viewDate,dir);if(this.viewMode===1)this._trigger('changeYear',this.viewDate);break;}this.fill();break;case 'today':var date=new Date();date=UTCDate(date.getFullYear(),date.getMonth(),date.getDate(),0,0,0);this.showMode(-2);var which=this.o.todayBtn==='linked'?null:'view';this._setDate(date,which);break;case 'clear':var element;if(this.isInput)element=this.element;else if(this.component)element=this.element.find('input');if(element)element.val("").change();this.update();this._trigger('changeDate');if(this.o.autoclose)this.hide();break;}break;case 'span':if(!target.is('.disabled')){this.viewDate.setUTCDate(1);if(target.is('.month')){day=1;month=target.parent().find('span').index(target);year=this.viewDate.getUTCFullYear();this.viewDate.setUTCMonth(month);this._trigger('changeMonth',this.viewDate);if(this.o.minViewMode===1){this._setDate(UTCDate(year,month,day));}}else {day=1;month=0;year=parseInt(target.text(),10)||0;this.viewDate.setUTCFullYear(year);this._trigger('changeYear',this.viewDate);if(this.o.minViewMode===2){this._setDate(UTCDate(year,month,day));}}this.showMode(-1);this.fill();}break;case 'td':if(target.is('.day')&&!target.is('.disabled')){day=parseInt(target.text(),10)||1;year=this.viewDate.getUTCFullYear();month=this.viewDate.getUTCMonth();if(target.is('.old')){if(month===0){month=11;year-=1;}else {month-=1;}}else if(target.is('.new')){if(month===11){month=0;year+=1;}else {month+=1;}}this._setDate(UTCDate(year,month,day));}break;}}if(this.picker.is(':visible')&&this._focused_from){$(this._focused_from).focus();}delete this._focused_from;},_toggle_multidate:function _toggle_multidate(date){var ix=this.dates.contains(date);if(!date){this.dates.clear();}else if(ix!==-1){this.dates.remove(ix);}else {this.dates.push(date);}if(typeof this.o.multidate==='number')while(this.dates.length>this.o.multidate){this.dates.remove(0);}},_setDate:function _setDate(date,which){if(!which||which==='date')this._toggle_multidate(date&&new Date(date));if(!which||which==='view')this.viewDate=date&&new Date(date);this.fill();this.setValue();this._trigger('changeDate');var element;if(this.isInput){element=this.element;}else if(this.component){element=this.element.find('input');}if(element){element.change();}if(this.o.autoclose&&(!which||which==='date')){this.hide();}},moveMonth:function moveMonth(date,dir){if(!date)return undefined;if(!dir)return date;var new_date=new Date(date.valueOf()),day=new_date.getUTCDate(),month=new_date.getUTCMonth(),mag=Math.abs(dir),new_month,test;dir=dir>0?1:-1;if(mag===1){test=dir===-1 // If going back one month, make sure month is not current month
// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
?function(){return new_date.getUTCMonth()===month;} // If going forward one month, make sure month is as expected
// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
:function(){return new_date.getUTCMonth()!==new_month;};new_month=month+dir;new_date.setUTCMonth(new_month); // Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
if(new_month<0||new_month>11)new_month=(new_month+12)%12;}else { // For magnitudes >1, move one month at a time...
for(var i=0;i<mag;i++){ // ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
new_date=this.moveMonth(new_date,dir);} // ...then reset the day, keeping it in the new month
new_month=new_date.getUTCMonth();new_date.setUTCDate(day);test=function test(){return new_month!==new_date.getUTCMonth();};} // Common date-resetting loop -- if date is beyond end of month, make it
// end of month
while(test()){new_date.setUTCDate(--day);new_date.setUTCMonth(new_month);}return new_date;},moveYear:function moveYear(date,dir){return this.moveMonth(date,dir*12);},dateWithinRange:function dateWithinRange(date){return date>=this.o.startDate&&date<=this.o.endDate;},keydown:function keydown(e){if(this.picker.is(':not(:visible)')){if(e.keyCode===27) // allow escape to hide and re-show picker
this.show();return;}var dateChanged=false,dir,newDate,newViewDate,focusDate=this.focusDate||this.viewDate;switch(e.keyCode){case 27: // escape
if(this.focusDate){this.focusDate=null;this.viewDate=this.dates.get(-1)||this.viewDate;this.fill();}else this.hide();e.preventDefault();break;case 37: // left
case 39: // right
if(!this.o.keyboardNavigation)break;dir=e.keyCode===37?-1:1;if(e.ctrlKey){newDate=this.moveYear(this.dates.get(-1)||UTCToday(),dir);newViewDate=this.moveYear(focusDate,dir);this._trigger('changeYear',this.viewDate);}else if(e.shiftKey){newDate=this.moveMonth(this.dates.get(-1)||UTCToday(),dir);newViewDate=this.moveMonth(focusDate,dir);this._trigger('changeMonth',this.viewDate);}else {newDate=new Date(this.dates.get(-1)||UTCToday());newDate.setUTCDate(newDate.getUTCDate()+dir);newViewDate=new Date(focusDate);newViewDate.setUTCDate(focusDate.getUTCDate()+dir);}if(this.dateWithinRange(newDate)){this.focusDate=this.viewDate=newViewDate;this.setValue();this.fill();e.preventDefault();}break;case 38: // up
case 40: // down
if(!this.o.keyboardNavigation)break;dir=e.keyCode===38?-1:1;if(e.ctrlKey){newDate=this.moveYear(this.dates.get(-1)||UTCToday(),dir);newViewDate=this.moveYear(focusDate,dir);this._trigger('changeYear',this.viewDate);}else if(e.shiftKey){newDate=this.moveMonth(this.dates.get(-1)||UTCToday(),dir);newViewDate=this.moveMonth(focusDate,dir);this._trigger('changeMonth',this.viewDate);}else {newDate=new Date(this.dates.get(-1)||UTCToday());newDate.setUTCDate(newDate.getUTCDate()+dir*7);newViewDate=new Date(focusDate);newViewDate.setUTCDate(focusDate.getUTCDate()+dir*7);}if(this.dateWithinRange(newDate)){this.focusDate=this.viewDate=newViewDate;this.setValue();this.fill();e.preventDefault();}break;case 32: // spacebar
// Spacebar is used in manually typing dates in some formats.
// As such, its behavior should not be hijacked.
break;case 13: // enter
focusDate=this.focusDate||this.dates.get(-1)||this.viewDate;this._toggle_multidate(focusDate);dateChanged=true;this.focusDate=null;this.viewDate=this.dates.get(-1)||this.viewDate;this.setValue();this.fill();if(this.picker.is(':visible')){e.preventDefault();if(this.o.autoclose)this.hide();}break;case 9: // tab
this.focusDate=null;this.viewDate=this.dates.get(-1)||this.viewDate;this.fill();this.hide();break;}if(dateChanged){if(this.dates.length)this._trigger('changeDate');else this._trigger('clearDate');var element;if(this.isInput){element=this.element;}else if(this.component){element=this.element.find('input');}if(element){element.change();}}},showMode:function showMode(dir){if(dir){this.viewMode=Math.max(this.o.minViewMode,Math.min(2,this.viewMode+dir));}this.picker.find('>div').hide().filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName).css('display','block');this.updateNavArrows();}};var DateRangePicker=function DateRangePicker(element,options){this.element=$(element);this.inputs=$.map(options.inputs,function(i){return i.jquery?i[0]:i;});delete options.inputs;$(this.inputs).datepicker(options).bind('changeDate',$.proxy(this.dateUpdated,this));this.pickers=$.map(this.inputs,function(i){return $(i).data('datepicker');});this.updateDates();};DateRangePicker.prototype={updateDates:function updateDates(){this.dates=$.map(this.pickers,function(i){return i.getUTCDate();});this.updateRanges();},updateRanges:function updateRanges(){var range=$.map(this.dates,function(d){return d.valueOf();});$.each(this.pickers,function(i,p){p.setRange(range);});},dateUpdated:function dateUpdated(e){ // `this.updating` is a workaround for preventing infinite recursion
// between `changeDate` triggering and `setUTCDate` calling.  Until
// there is a better mechanism.
if(this.updating)return;this.updating=true;var dp=$(e.target).data('datepicker'),new_date=dp.getUTCDate(),i=$.inArray(e.target,this.inputs),l=this.inputs.length;if(i===-1)return;$.each(this.pickers,function(i,p){if(!p.getUTCDate())p.setUTCDate(new_date);});if(new_date<this.dates[i]){ // Date being moved earlier/left
while(i>=0&&new_date<this.dates[i]){this.pickers[i--].setUTCDate(new_date);}}else if(new_date>this.dates[i]){ // Date being moved later/right
while(i<l&&new_date>this.dates[i]){this.pickers[i++].setUTCDate(new_date);}}this.updateDates();delete this.updating;},remove:function remove(){$.map(this.pickers,function(p){p.remove();});delete this.element.data().datepicker;}};function opts_from_el(el,prefix){ // Derive options from element data-attrs
var data=$(el).data(),out={},inkey,replace=new RegExp('^'+prefix.toLowerCase()+'([A-Z])');prefix=new RegExp('^'+prefix.toLowerCase());function re_lower(_,a){return a.toLowerCase();}for(var key in data){if(prefix.test(key)){inkey=key.replace(replace,re_lower);out[inkey]=data[key];}}return out;}function opts_from_locale(lang){ // Derive options from locale plugins
var out={}; // Check if "de-DE" style date is available, if not language should
// fallback to 2 letter code eg "de"
if(!dates[lang]){lang=lang.split('-')[0];if(!dates[lang])return;}var d=dates[lang];$.each(locale_opts,function(i,k){if(k in d)out[k]=d[k];});return out;}var old=$.fn.datepicker;$.fn.datepicker=function(option){var args=Array.apply(null,arguments);args.shift();var internal_return;this.each(function(){var $this=$(this),data=$this.data('datepicker'),options=(typeof option==='undefined'?'undefined':_typeof(option))==='object'&&option;if(!data){var elopts=opts_from_el(this,'date'), // Preliminary otions
xopts=$.extend({},defaults,elopts,options),locopts=opts_from_locale(xopts.language), // Options priority: js args, data-attrs, locales, defaults
opts=$.extend({},defaults,locopts,elopts,options);if($this.is('.input-daterange')||opts.inputs){var ropts={inputs:opts.inputs||$this.find('input').toArray()};$this.data('datepicker',data=new DateRangePicker(this,$.extend(opts,ropts)));}else {$this.data('datepicker',data=new Datepicker(this,opts));}}if(typeof option==='string'&&typeof data[option]==='function'){internal_return=data[option].apply(data,args);if(internal_return!==undefined)return false;}});if(internal_return!==undefined)return internal_return;else return this;};var defaults=$.fn.datepicker.defaults={autoclose:false,beforeShowDay:$.noop,calendarWeeks:false,clearBtn:false,daysOfWeekDisabled:[],endDate:Infinity,forceParse:true,format:'mm/dd/yyyy',keyboardNavigation:true,language:'en',minViewMode:0,multidate:false,multidateSeparator:',',orientation:"auto",rtl:false,startDate:-Infinity,startView:0,todayBtn:false,todayHighlight:false,weekStart:0};var locale_opts=$.fn.datepicker.locale_opts=['format','rtl','weekStart'];$.fn.datepicker.Constructor=Datepicker;var dates=$.fn.datepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",clear:"Clear"}};var DPGlobal={modes:[{clsName:'days',navFnc:'Month',navStep:1},{clsName:'months',navFnc:'FullYear',navStep:1},{clsName:'years',navFnc:'FullYear',navStep:10}],isLeapYear:function isLeapYear(year){return year%4===0&&year%100!==0||year%400===0;},getDaysInMonth:function getDaysInMonth(year,month){return [31,DPGlobal.isLeapYear(year)?29:28,31,30,31,30,31,31,30,31,30,31][month];},validParts:/dd?|DD?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,parseFormat:function parseFormat(format){ // IE treats \0 as a string end in inputs (truncating the value),
// so it's a bad format delimiter, anyway
var separators=format.replace(this.validParts,'\0').split('\0'),parts=format.match(this.validParts);if(!separators||!separators.length||!parts||parts.length===0){throw new Error("Invalid date format.");}return {separators:separators,parts:parts};},parseDate:function parseDate(date,format,language){if(!date)return undefined;if(date instanceof Date)return date;if(typeof format==='string')format=DPGlobal.parseFormat(format);var part_re=/([\-+]\d+)([dmwy])/,parts=date.match(/([\-+]\d+)([dmwy])/g),part,dir,i;if(/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)){date=new Date();for(i=0;i<parts.length;i++){part=part_re.exec(parts[i]);dir=parseInt(part[1]);switch(part[2]){case 'd':date.setUTCDate(date.getUTCDate()+dir);break;case 'm':date=Datepicker.prototype.moveMonth.call(Datepicker.prototype,date,dir);break;case 'w':date.setUTCDate(date.getUTCDate()+dir*7);break;case 'y':date=Datepicker.prototype.moveYear.call(Datepicker.prototype,date,dir);break;}}return UTCDate(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate(),0,0,0);}parts=date&&date.match(this.nonpunctuation)||[];date=new Date();var parsed={},setters_order=['yyyy','yy','M','MM','m','mm','d','dd'],setters_map={yyyy:function yyyy(d,v){return d.setUTCFullYear(v);},yy:function yy(d,v){return d.setUTCFullYear(2000+v);},m:function m(d,v){if(isNaN(d))return d;v-=1;while(v<0){v+=12;}v%=12;d.setUTCMonth(v);while(d.getUTCMonth()!==v){d.setUTCDate(d.getUTCDate()-1);}return d;},d:function d(_d,v){return _d.setUTCDate(v);}},val,filtered;setters_map['M']=setters_map['MM']=setters_map['mm']=setters_map['m'];setters_map['dd']=setters_map['d'];date=UTCDate(date.getFullYear(),date.getMonth(),date.getDate(),0,0,0);var fparts=format.parts.slice(); // Remove noop parts
if(parts.length!==fparts.length){fparts=$(fparts).filter(function(i,p){return $.inArray(p,setters_order)!==-1;}).toArray();} // Process remainder
function match_part(){var m=this.slice(0,parts[i].length),p=parts[i].slice(0,m.length);return m===p;}if(parts.length===fparts.length){var cnt;for(i=0,cnt=fparts.length;i<cnt;i++){val=parseInt(parts[i],10);part=fparts[i];if(isNaN(val)){switch(part){case 'MM':filtered=$(dates[language].months).filter(match_part);val=$.inArray(filtered[0],dates[language].months)+1;break;case 'M':filtered=$(dates[language].monthsShort).filter(match_part);val=$.inArray(filtered[0],dates[language].monthsShort)+1;break;}}parsed[part]=val;}var _date,s;for(i=0;i<setters_order.length;i++){s=setters_order[i];if(s in parsed&&!isNaN(parsed[s])){_date=new Date(date);setters_map[s](_date,parsed[s]);if(!isNaN(_date))date=_date;}}}return date;},formatDate:function formatDate(date,format,language){if(!date)return '';if(typeof format==='string')format=DPGlobal.parseFormat(format);var val={d:date.getUTCDate(),D:dates[language].daysShort[date.getUTCDay()],DD:dates[language].days[date.getUTCDay()],m:date.getUTCMonth()+1,M:dates[language].monthsShort[date.getUTCMonth()],MM:dates[language].months[date.getUTCMonth()],yy:date.getUTCFullYear().toString().substring(2),yyyy:date.getUTCFullYear()};val.dd=(val.d<10?'0':'')+val.d;val.mm=(val.m<10?'0':'')+val.m;date=[];var seps=$.extend([],format.separators);for(var i=0,cnt=format.parts.length;i<=cnt;i++){if(seps.length)date.push(seps.shift());date.push(val[format.parts[i]]);}return date.join('');},headTemplate:'<thead>'+'<tr>'+'<th class="prev">&laquo;</th>'+'<th colspan="5" class="datepicker-switch"></th>'+'<th class="next">&raquo;</th>'+'</tr>'+'</thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',footTemplate:'<tfoot>'+'<tr>'+'<th colspan="7" class="today"></th>'+'</tr>'+'<tr>'+'<th colspan="7" class="clear"></th>'+'</tr>'+'</tfoot>'};DPGlobal.template='<div class="datepicker">'+'<div class="datepicker-days">'+'<table class="table table-condensed">'+DPGlobal.headTemplate+'<tbody></tbody>'+DPGlobal.footTemplate+'</table>'+'</div>'+'<div class="datepicker-months">'+'<table class="table table-condensed">'+DPGlobal.headTemplate+DPGlobal.contTemplate+DPGlobal.footTemplate+'</table>'+'</div>'+'<div class="datepicker-years">'+'<table class="table table-condensed">'+DPGlobal.headTemplate+DPGlobal.contTemplate+DPGlobal.footTemplate+'</table>'+'</div>'+'</div>';$.fn.datepicker.DPGlobal=DPGlobal; /* DATEPICKER NO CONFLICT
	* =================== */$.fn.datepicker.noConflict=function(){$.fn.datepicker=old;return this;}; /* DATEPICKER DATA-API
	* ================== */$(document).on('focus.datepicker.data-api click.datepicker.data-api','[data-provide="datepicker"]',function(e){var $this=$(this);if($this.data('datepicker'))return;e.preventDefault(); // component click requires us to explicitly show it
$this.datepicker('show');});$(function(){$('[data-provide="datepicker-inline"]').datepicker();});})(window.jQuery);(function($){$.fn.extend({slimScroll:function slimScroll(options){var defaults={width:"auto",height:"250px",size:"7px",color:"#000",position:"right",distance:"1px",start:"top",opacity:.4,alwaysVisible:false,disableFadeOut:false,railVisible:false,railColor:"#333",railOpacity:.2,railDraggable:true,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:false,wheelStep:20,touchScrollStep:200,borderRadius:"7px",railBorderRadius:"7px"};var o=$.extend(defaults,options);this.each(function(){var isOverPanel,isOverBar,isDragg,queueHide,touchDif,barHeight,percentScroll,lastScroll,divS="<div></div>",minBarHeight=30,releaseScroll=false;var me=$(this);if(me.parent().hasClass(o.wrapperClass)){var offset=me.scrollTop();bar=me.parent().find("."+o.barClass);rail=me.parent().find("."+o.railClass);getBarHeight();if($.isPlainObject(options)){if("height" in options&&options.height=="auto"){me.parent().css("height","auto");me.css("height","auto");var height=me.parent().parent().height();me.parent().css("height",height);me.css("height",height);}if("scrollTo" in options){offset=parseInt(o.scrollTo);}else if("scrollBy" in options){offset+=parseInt(o.scrollBy);}else if("destroy" in options){bar.remove();rail.remove();me.unwrap();return;}scrollContent(offset,false,true);}return;}else if($.isPlainObject(options)){if("destroy" in options){return;}}o.height=o.height=="auto"?me.parent().height():o.height;var wrapper=$(divS).addClass(o.wrapperClass).css({position:"relative",overflow:"hidden",width:o.width,height:o.height});me.css({overflow:"hidden",width:o.width,height:o.height,"-ms-touch-action":"none"});var rail=$(divS).addClass(o.railClass).css({width:o.size,height:"100%",position:"absolute",top:0,display:o.alwaysVisible&&o.railVisible?"block":"none","border-radius":o.railBorderRadius,background:o.railColor,opacity:o.railOpacity,zIndex:90});var bar=$(divS).addClass(o.barClass).css({background:o.color,width:o.size,position:"absolute",top:0,opacity:o.opacity,display:o.alwaysVisible?"block":"none","border-radius":o.borderRadius,BorderRadius:o.borderRadius,MozBorderRadius:o.borderRadius,WebkitBorderRadius:o.borderRadius,zIndex:99});var posCss=o.position=="right"?{right:o.distance}:{left:o.distance};rail.css(posCss);bar.css(posCss);me.wrap(wrapper);me.parent().append(bar);me.parent().append(rail);if(o.railDraggable){bar.bind("mousedown",function(e){var $doc=$(document);isDragg=true;t=parseFloat(bar.css("top"));pageY=e.pageY;$doc.bind("mousemove.slimscroll",function(e){currTop=t+e.pageY-pageY;bar.css("top",currTop);scrollContent(0,bar.position().top,false);});$doc.bind("mouseup.slimscroll",function(e){isDragg=false;hideBar();$doc.unbind(".slimscroll");});return false;}).bind("selectstart.slimscroll",function(e){e.stopPropagation();e.preventDefault();return false;});}rail.hover(function(){showBar();},function(){hideBar();});bar.hover(function(){isOverBar=true;},function(){isOverBar=false;});me.hover(function(){isOverPanel=true;showBar();hideBar();},function(){isOverPanel=false;hideBar();});if(window.navigator.msPointerEnabled){me.bind("MSPointerDown",function(e,b){if(e.originalEvent.targetTouches.length){touchDif=e.originalEvent.targetTouches[0].pageY;}});me.bind("MSPointerMove",function(e){e.originalEvent.preventDefault();if(e.originalEvent.targetTouches.length){var diff=(touchDif-e.originalEvent.targetTouches[0].pageY)/o.touchScrollStep;scrollContent(diff,true);touchDif=e.originalEvent.targetTouches[0].pageY;}});}else {me.bind("touchstart",function(e,b){if(e.originalEvent.touches.length){touchDif=e.originalEvent.touches[0].pageY;}});me.bind("touchmove",function(e){if(!releaseScroll){e.originalEvent.preventDefault();}if(e.originalEvent.touches.length){var diff=(touchDif-e.originalEvent.touches[0].pageY)/o.touchScrollStep;scrollContent(diff,true);touchDif=e.originalEvent.touches[0].pageY;}});}getBarHeight();if(o.start==="bottom"){bar.css({top:me.outerHeight()-bar.outerHeight()});scrollContent(0,true);}else if(o.start!=="top"){scrollContent($(o.start).position().top,null,true);if(!o.alwaysVisible){bar.hide();}}attachWheel();function _onWheel(e){if(!isOverPanel){return;}var e=e||window.event;var delta=0;if(e.wheelDelta){delta=-e.wheelDelta/120;}if(e.detail){delta=e.detail/3;}var target=e.target||e.srcTarget||e.srcElement;if($(target).closest("."+o.wrapperClass).is(me.parent())){scrollContent(delta,true);}if(e.preventDefault&&!releaseScroll){e.preventDefault();}if(!releaseScroll){e.returnValue=false;}}function scrollContent(y,isWheel,isJump){releaseScroll=false;var delta=y;var maxTop=me.outerHeight()-bar.outerHeight();if(isWheel){delta=parseInt(bar.css("top"))+y*parseInt(o.wheelStep)/100*bar.outerHeight();delta=Math.min(Math.max(delta,0),maxTop);delta=y>0?Math.ceil(delta):Math.floor(delta);bar.css({top:delta+"px"});}percentScroll=parseInt(bar.css("top"))/(me.outerHeight()-bar.outerHeight());delta=percentScroll*(me[0].scrollHeight-me.outerHeight());if(isJump){delta=y;var offsetTop=delta/me[0].scrollHeight*me.outerHeight();offsetTop=Math.min(Math.max(offsetTop,0),maxTop);bar.css({top:offsetTop+"px"});}me.scrollTop(delta);me.trigger("slimscrolling",~ ~delta);showBar();hideBar();}function attachWheel(){if(window.addEventListener){this.addEventListener("DOMMouseScroll",_onWheel,false);this.addEventListener("mousewheel",_onWheel,false);}else {document.attachEvent("onmousewheel",_onWheel);}}function getBarHeight(){barHeight=Math.max(me.outerHeight()/me[0].scrollHeight*me.outerHeight(),minBarHeight);bar.css({height:barHeight+"px"});var display=barHeight==me.outerHeight()?"none":"block";bar.css({display:display});}function showBar(){getBarHeight();clearTimeout(queueHide);if(percentScroll==~ ~percentScroll){releaseScroll=o.allowPageScroll;if(lastScroll!=percentScroll){var msg=~ ~percentScroll==0?"top":"bottom";me.trigger("slimscroll",msg);}}else {releaseScroll=false;}lastScroll=percentScroll;if(barHeight>=me.outerHeight()){releaseScroll=true;return;}bar.stop(true,true).fadeIn("fast");if(o.railVisible){rail.stop(true,true).fadeIn("fast");}}function hideBar(){if(!o.alwaysVisible){queueHide=setTimeout(function(){if(!(o.disableFadeOut&&isOverPanel)&&!isOverBar&&!isDragg){bar.fadeOut("slow");rail.fadeOut("slow");}},1e3);}}});return this;}});$.fn.extend({slimscroll:$.fn.slimScroll});})(jQuery);!function e(t,n,r){function i(s,a){if(!n[s]){if(!t[s]){var c="function"==typeof require&&require;if(!a&&c)return c(s,!0);if(o)return o(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l;}var u=n[s]={exports:{}};t[s][0].call(u.exports,function(e){var n=t[s][1][e];return i(n?n:e);},u,u.exports,e,t,n,r);}return n[s].exports;}for(var o="function"==typeof require&&require,s=0;s<r.length;s++){i(r[s]);}return i;}({1:[function(e,t){!function(){"use strict";function e(t,n){function i(e,t){return function(){return e.apply(t,arguments);};}var o;if(n=n||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=n.touchBoundary||10,this.layer=t,this.tapDelay=n.tapDelay||200,this.tapTimeout=n.tapTimeout||700,!e.notNeeded(t)){for(var s=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],a=this,c=0,l=s.length;l>c;c++){a[s[c]]=i(a[s[c]],a);}r&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,n,r){var i=Node.prototype.removeEventListener;"click"===e?i.call(t,e,n.hijacked||n,r):i.call(t,e,n,r);},t.addEventListener=function(e,n,r){var i=Node.prototype.addEventListener;"click"===e?i.call(t,e,n.hijacked||(n.hijacked=function(e){e.propagationStopped||n(e);}),r):i.call(t,e,n,r);}),"function"==typeof t.onclick&&(o=t.onclick,t.addEventListener("click",function(e){o(e);},!1),t.onclick=null);}}var n=navigator.userAgent.indexOf("Windows Phone")>=0,r=navigator.userAgent.indexOf("Android")>0&&!n,i=/iP(ad|hone|od)/.test(navigator.userAgent)&&!n,o=i&&/OS 4_\d(_\d)?/.test(navigator.userAgent),s=i&&/OS [6-7]_\d/.test(navigator.userAgent),a=navigator.userAgent.indexOf("BB10")>0;e.prototype.needsClick=function(e){switch(e.nodeName.toLowerCase()){case "button":case "select":case "textarea":if(e.disabled)return !0;break;case "input":if(i&&"file"===e.type||e.disabled)return !0;break;case "label":case "iframe":case "video":return !0;}return (/\bneedsclick\b/.test(e.className));},e.prototype.needsFocus=function(e){switch(e.nodeName.toLowerCase()){case "textarea":return !0;case "select":return !r;case "input":switch(e.type){case "button":case "checkbox":case "file":case "image":case "radio":case "submit":return !1;}return !e.disabled&&!e.readOnly;default:return (/\bneedsfocus\b/.test(e.className));}},e.prototype.sendClick=function(e,t){var n,r;document.activeElement&&document.activeElement!==e&&document.activeElement.blur(),r=t.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(e),!0,!0,window,1,r.screenX,r.screenY,r.clientX,r.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,e.dispatchEvent(n);},e.prototype.determineEventType=function(e){return r&&"select"===e.tagName.toLowerCase()?"mousedown":"click";},e.prototype.focus=function(e){var t;i&&e.setSelectionRange&&0!==e.type.indexOf("date")&&"time"!==e.type&&"month"!==e.type?(t=e.value.length,e.setSelectionRange(t,t)):e.focus();},e.prototype.updateScrollParent=function(e){var t,n;if(t=e.fastClickScrollParent,!t||!t.contains(e)){n=e;do {if(n.scrollHeight>n.offsetHeight){t=n,e.fastClickScrollParent=n;break;}n=n.parentElement;}while(n);}t&&(t.fastClickLastScrollTop=t.scrollTop);},e.prototype.getTargetElementFromEventTarget=function(e){return e.nodeType===Node.TEXT_NODE?e.parentNode:e;},e.prototype.onTouchStart=function(e){var t,n,r;if(e.targetTouches.length>1)return !0;if(t=this.getTargetElementFromEventTarget(e.target),n=e.targetTouches[0],i){if(r=window.getSelection(),r.rangeCount&&!r.isCollapsed)return !0;if(!o){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return e.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(t);}}return this.trackingClick=!0,this.trackingClickStart=e.timeStamp,this.targetElement=t,this.touchStartX=n.pageX,this.touchStartY=n.pageY,e.timeStamp-this.lastClickTime<this.tapDelay&&e.preventDefault(),!0;},e.prototype.touchHasMoved=function(e){var t=e.changedTouches[0],n=this.touchBoundary;return Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n?!0:!1;},e.prototype.onTouchMove=function(e){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e))&&(this.trackingClick=!1,this.targetElement=null),!0):!0;},e.prototype.findControl=function(e){return void 0!==e.control?e.control:e.htmlFor?document.getElementById(e.htmlFor):e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea");},e.prototype.onTouchEnd=function(e){var t,n,a,c,l,u=this.targetElement;if(!this.trackingClick)return !0;if(e.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(e.timeStamp-this.trackingClickStart>this.tapTimeout)return !0;if(this.cancelNextClick=!1,this.lastClickTime=e.timeStamp,n=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,s&&(l=e.changedTouches[0],u=document.elementFromPoint(l.pageX-window.pageXOffset,l.pageY-window.pageYOffset)||u,u.fastClickScrollParent=this.targetElement.fastClickScrollParent),a=u.tagName.toLowerCase(),"label"===a){if(t=this.findControl(u)){if(this.focus(u),r)return !1;u=t;}}else if(this.needsFocus(u))return e.timeStamp-n>100||i&&window.top!==window&&"input"===a?(this.targetElement=null,!1):(this.focus(u),this.sendClick(u,e),i&&"select"===a||(this.targetElement=null,e.preventDefault()),!1);return i&&!o&&(c=u.fastClickScrollParent,c&&c.fastClickLastScrollTop!==c.scrollTop)?!0:(this.needsClick(u)||(e.preventDefault(),this.sendClick(u,e)),!1);},e.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null;},e.prototype.onMouse=function(e){return this.targetElement?e.forwardedTouchEvent?!0:e.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(e.stopImmediatePropagation?e.stopImmediatePropagation():e.propagationStopped=!0,e.stopPropagation(),e.preventDefault(),!1):!0:!0;},e.prototype.onClick=function(e){var t;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===e.target.type&&0===e.detail?!0:(t=this.onMouse(e),t||(this.targetElement=null),t);},e.prototype.destroy=function(){var e=this.layer;r&&(e.removeEventListener("mouseover",this.onMouse,!0),e.removeEventListener("mousedown",this.onMouse,!0),e.removeEventListener("mouseup",this.onMouse,!0)),e.removeEventListener("click",this.onClick,!0),e.removeEventListener("touchstart",this.onTouchStart,!1),e.removeEventListener("touchmove",this.onTouchMove,!1),e.removeEventListener("touchend",this.onTouchEnd,!1),e.removeEventListener("touchcancel",this.onTouchCancel,!1);},e.notNeeded=function(e){var t,n,i,o;if("undefined"==typeof window.ontouchstart)return !0;if(n=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!r)return !0;if(t=document.querySelector("meta[name=viewport]")){if(-1!==t.content.indexOf("user-scalable=no"))return !0;if(n>31&&document.documentElement.scrollWidth<=window.outerWidth)return !0;}}if(a&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3&&(t=document.querySelector("meta[name=viewport]")))){if(-1!==t.content.indexOf("user-scalable=no"))return !0;if(document.documentElement.scrollWidth<=window.outerWidth)return !0;}return "none"===e.style.msTouchAction||"manipulation"===e.style.touchAction?!0:(o=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],o>=27&&(t=document.querySelector("meta[name=viewport]"),t&&(-1!==t.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===e.style.touchAction||"manipulation"===e.style.touchAction?!0:!1);},e.attach=function(t,n){return new e(t,n);},"function"==typeof define&&"object"==_typeof(define.amd)&&define.amd?define(function(){return e;}):"undefined"!=typeof t&&t.exports?(t.exports=e.attach,t.exports.FastClick=e):window.FastClick=e;}();},{}],2:[function(e){window.Origami={fastclick:e("./bower_components/fastclick/lib/fastclick.js")};},{"./bower_components/fastclick/lib/fastclick.js":1}]},{},[2]);;(function(){function trigger(){document.dispatchEvent(new CustomEvent('o.load'));};document.addEventListener('load',trigger);if(document.readyState==='ready')trigger();})();(function(){function trigger(){document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));};document.addEventListener('DOMContentLoaded',trigger);if(document.readyState==='interactive')trigger();})();$(function(){console.log('loading ex_admin');$('.datepicker').datepicker({format:"yyyy-mm-dd",autoclose:true});}); /*! AdminLTE app.js
 * ================
 * Main JS application file for AdminLTE v2. This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive AdminLTE plugins.
 *
 * @Author  Almsaeed Studio
 * @Support <http://www.almsaeedstudio.com>
 * @Email   <support@almsaeedstudio.com>
 * @version 2.3.0
 * @license MIT <http://opensource.org/licenses/MIT>
 */ //Make sure jQuery has been loaded before app.js
if(typeof jQuery==="undefined"){throw new Error("AdminLTE requires jQuery");} /* AdminLTE
 *
 * @type Object
 * @description $.AdminLTE is the main object for the template's app.
 *              It's used for implementing functions and options related
 *              to the template. Keeping everything wrapped in an object
 *              prevents conflict with other plugins and is a better
 *              way to organize our code.
 */$.AdminLTE={}; /* --------------------
 * - AdminLTE Options -
 * --------------------
 * Modify these options to suit your implementation
 */$.AdminLTE.options={ //Add slimscroll to navbar menus
//This requires you to load the slimscroll plugin
//in every page before app.js
navbarMenuSlimscroll:true,navbarMenuSlimscrollWidth:"3px", //The width of the scroll bar
navbarMenuHeight:"200px", //The height of the inner menu
//General animation speed for JS animated elements such as box collapse/expand and
//sidebar treeview slide up/down. This options accepts an integer as milliseconds,
//'fast', 'normal', or 'slow'
animationSpeed:500, //Sidebar push menu toggle button selector
sidebarToggleSelector:"[data-toggle='offcanvas']", //Activate sidebar push menu
sidebarPushMenu:true, //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
sidebarSlimScroll:true, //Enable sidebar expand on hover effect for sidebar mini
//This option is forced to true if both the fixed layout and sidebar mini
//are used together
sidebarExpandOnHover:false, //BoxRefresh Plugin
enableBoxRefresh:true, //Bootstrap.js tooltip
enableBSToppltip:true,BSTooltipSelector:"[data-toggle='tooltip']", //Enable Fast Click. Fastclick.js creates a more
//native touch experience with touch devices. If you
//choose to enable the plugin, make sure you load the script
//before AdminLTE's app.js
enableFastclick:true, //Control Sidebar Options
enableControlSidebar:true,controlSidebarOptions:{ //Which button should trigger the open/close event
toggleBtnSelector:"[data-toggle='control-sidebar']", //The sidebar selector
selector:".control-sidebar", //Enable slide over content
slide:false}, //Box Widget Plugin. Enable this plugin
//to allow boxes to be collapsed and/or removed
enableBoxWidget:true, //Box Widget plugin options
boxWidgetOptions:{boxWidgetIcons:{ //Collapse icon
collapse:'fa-minus', //Open icon
open:'fa-plus', //Remove icon
remove:'fa-times'},boxWidgetSelectors:{ //Remove button selector
remove:'[data-widget="remove"]', //Collapse button selector
collapse:'[data-widget="collapse"]'}}, //Direct Chat plugin options
directChat:{ //Enable direct chat by default
enable:true, //The button to open and close the chat contacts pane
contactToggleSelector:'[data-widget="chat-pane-toggle"]'}, //Define the set of colors to use globally around the website
colors:{lightBlue:"#3c8dbc",red:"#f56954",green:"#00a65a",aqua:"#00c0ef",yellow:"#f39c12",blue:"#0073b7",navy:"#001F3F",teal:"#39CCCC",olive:"#3D9970",lime:"#01FF70",orange:"#FF851B",fuchsia:"#F012BE",purple:"#8E24AA",maroon:"#D81B60",black:"#222222",gray:"#d2d6de"}, //The standard screen sizes that bootstrap uses.
//If you change these in the variables.less file, change
//them here too.
screenSizes:{xs:480,sm:768,md:992,lg:1200}}; /* ------------------
 * - Implementation -
 * ------------------
 * The next block of code implements AdminLTE's
 * functions and plugins as specified by the
 * options above.
 */$(function(){"use strict"; //Fix for IE page transitions
$("body").removeClass("hold-transition"); //Extend options if external options exist
if(typeof AdminLTEOptions!=="undefined"){$.extend(true,$.AdminLTE.options,AdminLTEOptions);} //Easy access to options
var o=$.AdminLTE.options; //Set up the object
_init(); //Activate the layout maker
$.AdminLTE.layout.activate(); //Enable sidebar tree view controls
$.AdminLTE.tree('.sidebar'); //Enable control sidebar
if(o.enableControlSidebar){$.AdminLTE.controlSidebar.activate();} //Add slimscroll to navbar dropdown
if(o.navbarMenuSlimscroll&&typeof $.fn.slimscroll!='undefined'){$(".navbar .menu").slimscroll({height:o.navbarMenuHeight,alwaysVisible:false,size:o.navbarMenuSlimscrollWidth}).css("width","100%");} //Activate sidebar push menu
if(o.sidebarPushMenu){$.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);} //Activate Bootstrap tooltip
if(o.enableBSToppltip){$('body').tooltip({selector:o.BSTooltipSelector});} //Activate box widget
if(o.enableBoxWidget){$.AdminLTE.boxWidget.activate();} //Activate fast click
if(o.enableFastclick&&typeof FastClick!='undefined'){FastClick.attach(document.body);} //Activate direct chat widget
if(o.directChat.enable){$(document).on('click',o.directChat.contactToggleSelector,function(){var box=$(this).parents('.direct-chat').first();box.toggleClass('direct-chat-contacts-open');});} /*
   * INITIALIZE BUTTON TOGGLE
   * ------------------------
   */$('.btn-group[data-toggle="btn-toggle"]').each(function(){var group=$(this);$(this).find(".btn").on('click',function(e){group.find(".btn.active").removeClass("active");$(this).addClass("active");e.preventDefault();});});}); /* ----------------------------------
 * - Initialize the AdminLTE Object -
 * ----------------------------------
 * All AdminLTE functions are implemented below.
 */function _init(){'use strict'; /* Layout
   * ======
   * Fixes the layout height in case min-height fails.
   *
   * @type Object
   * @usage $.AdminLTE.layout.activate()
   *        $.AdminLTE.layout.fix()
   *        $.AdminLTE.layout.fixSidebar()
   */$.AdminLTE.layout={activate:function activate(){var _this=this;_this.fix();_this.fixSidebar();$(window,".wrapper").resize(function(){_this.fix();_this.fixSidebar();});},fix:function fix(){ //Get window height and the wrapper height
var neg=$('.main-header').outerHeight()+$('.main-footer').outerHeight();var window_height=$(window).height();var sidebar_height=$(".sidebar").height(); //Set the min-height of the content and sidebar based on the
//the height of the document.
if($("body").hasClass("fixed")){$(".content-wrapper, .right-side").css('min-height',window_height-$('.main-footer').outerHeight());}else {var postSetWidth;if(window_height>=sidebar_height){$(".content-wrapper, .right-side").css('min-height',window_height-neg);postSetWidth=window_height-neg;}else {$(".content-wrapper, .right-side").css('min-height',sidebar_height);postSetWidth=sidebar_height;} //Fix for the control sidebar height
var controlSidebar=$($.AdminLTE.options.controlSidebarOptions.selector);if(typeof controlSidebar!=="undefined"){if(controlSidebar.height()>postSetWidth)$(".content-wrapper, .right-side").css('min-height',controlSidebar.height());}}},fixSidebar:function fixSidebar(){ //Make sure the body tag has the .fixed class
if(!$("body").hasClass("fixed")){if(typeof $.fn.slimScroll!='undefined'){$(".sidebar").slimScroll({destroy:true}).height("auto");}return;}else if(typeof $.fn.slimScroll=='undefined'&&window.console){window.console.error("Error: the fixed layout requires the slimscroll plugin!");} //Enable slimscroll for fixed layout
if($.AdminLTE.options.sidebarSlimScroll){if(typeof $.fn.slimScroll!='undefined'){ //Destroy if it exists
$(".sidebar").slimScroll({destroy:true}).height("auto"); //Add slimscroll
$(".sidebar").slimscroll({height:$(window).height()-$(".main-header").height()+"px",color:"rgba(0,0,0,0.2)",size:"3px"});}}}}; /* PushMenu()
   * ==========
   * Adds the push menu functionality to the sidebar.
   *
   * @type Function
   * @usage: $.AdminLTE.pushMenu("[data-toggle='offcanvas']")
   */$.AdminLTE.pushMenu={activate:function activate(toggleBtn){ //Get the screen sizes
var screenSizes=$.AdminLTE.options.screenSizes; //Enable sidebar toggle
$(toggleBtn).on('click',function(e){e.preventDefault(); //Enable sidebar push menu
if($(window).width()>screenSizes.sm-1){if($("body").hasClass('sidebar-collapse')){$("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');}else {$("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');}} //Handle sidebar push menu for small screens
else {if($("body").hasClass('sidebar-open')){$("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');}else {$("body").addClass('sidebar-open').trigger('expanded.pushMenu');}}});$(".content-wrapper").click(function(){ //Enable hide menu when clicking on the content-wrapper on small screens
if($(window).width()<=screenSizes.sm-1&&$("body").hasClass("sidebar-open")){$("body").removeClass('sidebar-open');}}); //Enable expand on hover for sidebar mini
if($.AdminLTE.options.sidebarExpandOnHover||$('body').hasClass('fixed')&&$('body').hasClass('sidebar-mini')){this.expandOnHover();}},expandOnHover:function expandOnHover(){var _this=this;var screenWidth=$.AdminLTE.options.screenSizes.sm-1; //Expand sidebar on hover
$('.main-sidebar').hover(function(){if($('body').hasClass('sidebar-mini')&&$("body").hasClass('sidebar-collapse')&&$(window).width()>screenWidth){_this.expand();}},function(){if($('body').hasClass('sidebar-mini')&&$('body').hasClass('sidebar-expanded-on-hover')&&$(window).width()>screenWidth){_this.collapse();}});},expand:function expand(){$("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');},collapse:function collapse(){if($('body').hasClass('sidebar-expanded-on-hover')){$('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');}}}; /* Tree()
   * ======
   * Converts the sidebar into a multilevel
   * tree view menu.
   *
   * @type Function
   * @Usage: $.AdminLTE.tree('.sidebar')
   */$.AdminLTE.tree=function(menu){var _this=this;var animationSpeed=$.AdminLTE.options.animationSpeed;$(document).on('click',menu+' li a',function(e){ //Get the clicked link and the next element
var $this=$(this);var checkElement=$this.next(); //Check if the next element is a menu and is visible
if(checkElement.is('.treeview-menu')&&checkElement.is(':visible')){ //Close the menu
checkElement.slideUp(animationSpeed,function(){checkElement.removeClass('menu-open'); //Fix the layout in case the sidebar stretches over the height of the window
//_this.layout.fix();
});checkElement.parent("li").removeClass("active");} //If the menu is not visible
else if(checkElement.is('.treeview-menu')&&!checkElement.is(':visible')){ //Get the parent menu
var parent=$this.parents('ul').first(); //Close all open menus within the parent
var ul=parent.find('ul:visible').slideUp(animationSpeed); //Remove the menu-open class from the parent
ul.removeClass('menu-open'); //Get the parent li
var parent_li=$this.parent("li"); //Open the target menu and add the menu-open class
checkElement.slideDown(animationSpeed,function(){ //Add the class active to the parent li
checkElement.addClass('menu-open');parent.find('li.active').removeClass('active');parent_li.addClass('active'); //Fix the layout in case the sidebar stretches over the height of the window
_this.layout.fix();});} //if this isn't a link, prevent the page from being redirected
if(checkElement.is('.treeview-menu')){e.preventDefault();}});}; /* ControlSidebar
   * ==============
   * Adds functionality to the right sidebar
   *
   * @type Object
   * @usage $.AdminLTE.controlSidebar.activate(options)
   */$.AdminLTE.controlSidebar={ //instantiate the object
activate:function activate(){ //Get the object
var _this=this; //Update options
var o=$.AdminLTE.options.controlSidebarOptions; //Get the sidebar
var sidebar=$(o.selector); //The toggle button
var btn=$(o.toggleBtnSelector); //Listen to the click event
btn.on('click',function(e){e.preventDefault(); //If the sidebar is not open
if(!sidebar.hasClass('control-sidebar-open')&&!$('body').hasClass('control-sidebar-open')){ //Open the sidebar
_this.open(sidebar,o.slide);}else {_this.close(sidebar,o.slide);}}); //If the body has a boxed layout, fix the sidebar bg position
var bg=$(".control-sidebar-bg");_this._fix(bg); //If the body has a fixed layout, make the control sidebar fixed
if($('body').hasClass('fixed')){_this._fixForFixed(sidebar);}else { //If the content height is less than the sidebar's height, force max height
if($('.content-wrapper, .right-side').height()<sidebar.height()){_this._fixForContent(sidebar);}}}, //Open the control sidebar
open:function open(sidebar,slide){ //Slide over content
if(slide){sidebar.addClass('control-sidebar-open');}else { //Push the content by adding the open class to the body instead
//of the sidebar itself
$('body').addClass('control-sidebar-open');}}, //Close the control sidebar
close:function close(sidebar,slide){if(slide){sidebar.removeClass('control-sidebar-open');}else {$('body').removeClass('control-sidebar-open');}},_fix:function _fix(sidebar){var _this=this;if($("body").hasClass('layout-boxed')){sidebar.css('position','absolute');sidebar.height($(".wrapper").height());$(window).resize(function(){_this._fix(sidebar);});}else {sidebar.css({'position':'fixed','height':'auto'});}},_fixForFixed:function _fixForFixed(sidebar){sidebar.css({'position':'fixed','max-height':'100%','overflow':'auto','padding-bottom':'50px'});},_fixForContent:function _fixForContent(sidebar){$(".content-wrapper, .right-side").css('min-height',sidebar.height());}}; /* BoxWidget
   * =========
   * BoxWidget is a plugin to handle collapsing and
   * removing boxes from the screen.
   *
   * @type Object
   * @usage $.AdminLTE.boxWidget.activate()
   *        Set all your options in the main $.AdminLTE.options object
   */$.AdminLTE.boxWidget={selectors:$.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,icons:$.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,animationSpeed:$.AdminLTE.options.animationSpeed,activate:function activate(_box){var _this=this;if(!_box){_box=document; // activate all boxes per default
} //Listen for collapse event triggers
$(_box).on('click',_this.selectors.collapse,function(e){e.preventDefault();_this.collapse($(this));}); //Listen for remove event triggers
$(_box).on('click',_this.selectors.remove,function(e){e.preventDefault();_this.remove($(this));});},collapse:function collapse(element){var _this=this; //Find the box parent
var box=element.parents(".box").first(); //Find the body and the footer
var box_content=box.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");if(!box.hasClass("collapsed-box")){ //Convert minus into plus
element.children(":first").removeClass(_this.icons.collapse).addClass(_this.icons.open); //Hide the content
box_content.slideUp(_this.animationSpeed,function(){box.addClass("collapsed-box");});}else { //Convert plus into minus
element.children(":first").removeClass(_this.icons.open).addClass(_this.icons.collapse); //Show the content
box_content.slideDown(_this.animationSpeed,function(){box.removeClass("collapsed-box");});}},remove:function remove(element){ //Find the box parent
var box=element.parents(".box").first();box.slideUp(this.animationSpeed);}};} /* ------------------
 * - Custom Plugins -
 * ------------------
 * All custom plugins are defined below.
 */ /*
 * BOX REFRESH BUTTON
 * ------------------
 * This is a custom plugin to use with the component BOX. It allows you to add
 * a refresh button to the box. It converts the box's state to a loading state.
 *
 * @type plugin
 * @usage $("#box-widget").boxRefresh( options );
 */(function($){"use strict";$.fn.boxRefresh=function(options){ // Render options
var settings=$.extend({ //Refresh button selector
trigger:".refresh-btn", //File source to be loaded (e.g: ajax/src.php)
source:"", //Callbacks
onLoadStart:function onLoadStart(box){return box;}, //Right after the button has been clicked
onLoadDone:function onLoadDone(box){return box;} //When the source has been loaded
},options); //The overlay
var overlay=$('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');return this.each(function(){ //if a source is specified
if(settings.source===""){if(window.console){window.console.log("Please specify a source first - boxRefresh()");}return;} //the box
var box=$(this); //the button
var rBtn=box.find(settings.trigger).first(); //On trigger click
rBtn.on('click',function(e){e.preventDefault(); //Add loading overlay
start(box); //Perform ajax call
box.find(".box-body").load(settings.source,function(){done(box);});});});function start(box){ //Add overlay and loading img
box.append(overlay);settings.onLoadStart.call(box);}function done(box){ //Remove overlay and loading img
box.find(overlay).remove();settings.onLoadDone.call(box);}};})(jQuery); /*
 * EXPLICIT BOX ACTIVATION
 * -----------------------
 * This is a custom plugin to use with the component BOX. It allows you to activate
 * a box inserted in the DOM after the app.js was loaded.
 *
 * @type plugin
 * @usage $("#box-widget").activateBox();
 */(function($){'use strict';$.fn.activateBox=function(){$.AdminLTE.boxWidget.activate(this);};})(jQuery); /*
 * TODO LIST CUSTOM PLUGIN
 * -----------------------
 * This plugin depends on iCheck plugin for checkbox and radio inputs
 *
 * @type plugin
 * @usage $("#todo-widget").todolist( options );
 */(function($){'use strict';$.fn.todolist=function(options){ // Render options
var settings=$.extend({ //When the user checks the input
onCheck:function onCheck(ele){return ele;}, //When the user unchecks the input
onUncheck:function onUncheck(ele){return ele;}},options);return this.each(function(){if(typeof $.fn.iCheck!='undefined'){$('input',this).on('ifChecked',function(){var ele=$(this).parents("li").first();ele.toggleClass("done");settings.onCheck.call(ele);});$('input',this).on('ifUnchecked',function(){var ele=$(this).parents("li").first();ele.toggleClass("done");settings.onUncheck.call(ele);});}else {$('input',this).on('change',function(){var ele=$(this).parents("li").first();ele.toggleClass("done");if($('input',ele).is(":checked")){settings.onCheck.call(ele);}else {settings.onUncheck.call(ele);}});}});};})(jQuery); //# sourceMappingURL=admin_lte2.js.map
});

;require.register("web/static/js/app", function(exports, require, module) {
"use strict";

// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

(function (document, window, $) {
  $(document).ready(function () {
    $(".button-collapse").sideNav();
  });
})(document, window, $);
});

require.register("web/static/js/ex_admin_common", function(exports, require, module) {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function () {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var endsWith = function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var _cmp = 'components/';
  var unalias = function unalias(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf(_cmp) === 0) {
        start = _cmp.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return _cmp + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var _reg = /^\.\.?(\/|$)/;
  var expand = function expand(root, name) {
    var results = [],
        part;
    var parts = (_reg.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function dirname(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function localRequire(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function initModule(name, definition) {
    var module = { id: name, exports: {} };
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function require(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from ' + '"' + loaderPath + '"');
  };

  require.alias = function (from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function (bundle, fn) {
    if ((typeof bundle === 'undefined' ? 'undefined' : _typeof(bundle)) === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function () {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  require._cache = cache;
  globals.require = require;
})();
//= require active_admin/base
//= require jquery
//= require jquery-ui
//= require jquery-migrate-1.1.1

// TODO: move this to a file provided by ace_contacts plugin
function serializeCategories() {
  var categoryIds = $.makeArray($("table.index_table .category").map(function () {
    return $(this).data('id');
  }));
  return { ids: categoryIds };
};

$(document).ready(function () {
  // Activating Best In Place
  jQuery(".best_in_place").best_in_place();
  //$('table.index_table tbody').sortable();
  $('#backup-now').click(function () {
    $('#title_bar').after("<div class='flashes'><div class='flash flash_info'>Creating backup. This may take a while ...</div></div>");
    return true;
  });
  $('.restore-link').click(function (e) {
    if (e.isPropagationStopped()) {
      $('#title_bar').after("<div class='flashes'><div class='flash flash_info'>Restoring backup. This may take a while ...</div></div>");
    }
    return true;
  });
  $('body.admin_categories table.index_table tbody').sortable({
    update: function update() {
      $.ajax({
        url: '/admin/categories/sort',
        type: 'post',
        data: serializeCategories(),
        complete: function complete() {
          $('.paginated_collection').effect('highlight');
        }
      });
    }
  });
});

// File: application.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  $(document).ready(function () {
    var batch_actions_selector;
    $(document).on('focus', '.datepicker:not(.hasDatepicker)', function () {
      var defaults, options;
      defaults = {
        dateFormat: 'yy-mm-dd'
      };
      options = $(this).data('datepicker-options');
      return $(this).datepicker($.extend(defaults, options));
    });
    $('.clear_filters_btn').click(function () {
      var params, regex;
      params = window.location.search.split('&');
      regex = /^(q\[|q%5B|q%5b|page|commit)/;
      return window.location.search = "";
    });
    $('.filter_form').submit(function () {
      return $(this).find(':input').filter(function () {
        return this.value === '';
      }).prop('disabled', true);
    });
    $('.filter_form_field.select_and_search select').change(function () {
      return $(this).siblings('input').prop({
        name: "q[" + this.value + "]"
      });
    });
    if ((batch_actions_selector = $('.table_tools .batch_actions_selector')).length) {
      return batch_actions_selector.next().css({
        width: "calc(100% - 10px - " + batch_actions_selector.outerWidth() + "px)",
        'float': 'right'
      });
    }
  });
}).call(undefined);

// File: base.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  window.ActiveAdmin = {};
}).call(undefined);

// File: batch_actions.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  $(document).on('ready page:load', function () {
    $('#batch_actions_selector li a').click(function (e) {
      var message, r;
      e.stopPropagation();
      e.preventDefault();
      console.log('clicked it');
      if (message = $(this).data('confirm')) {
        r = window.confirm(message);
        if (r === true) {
          return $(this).trigger('confirm:complete', $(this).data('inputs'));
        }
      } else {
        return $(this).trigger('confirm:complete');
      }
    });
    $('#batch_actions_selector li a').on('confirm:complete', function (e, inputs) {
      var val;
      if (val = JSON.stringify(inputs)) {
        $('#batch_action_inputs').val(val);
      } else {
        $('#batch_action_inputs').attr('disabled', 'disabled');
      }
      $('#batch_action').val($(this).data('action'));
      return $('#collection_selection').submit();
    });
    if ($("#batch_actions_selector").length && $(":checkbox.toggle_all").length) {
      if ($(".paginated_collection").find("table.index_table").length) {
        $(".paginated_collection table").tableCheckboxToggler();
      } else {
        $(".paginated_collection").checkboxToggler();
      }
      return $(".paginated_collection").find(":checkbox").bind("change", function () {
        if ($(".paginated_collection").find(":checkbox").filter(":checked").length > 0) {
          return $("#batch_actions_selector").aaDropdownMenu("enable");
        } else {
          return $("#batch_actions_selector").aaDropdownMenu("disable");
        }
      });
    }
  });
}).call(undefined);

// File: checkbox-toggler.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  ActiveAdmin.CheckboxToggler = function () {
    function CheckboxToggler(options, container) {
      var defaults;
      this.options = options;
      this.container = container;
      defaults = {};
      this.options = $.extend(defaults, this.options);
      this._init();
      this._bind();
    }

    CheckboxToggler.prototype._init = function () {
      if (!this.container) {
        throw new Error('Container element not found');
      } else {
        this.$container = $(this.container);
      }
      if (!this.$container.find('.toggle_all').length) {
        throw new Error('"toggle all" checkbox not found');
      } else {
        this.toggle_all_checkbox = this.$container.find('.toggle_all');
      }
      return this.checkboxes = this.$container.find(':checkbox').not(this.toggle_all_checkbox);
    };

    CheckboxToggler.prototype._bind = function () {
      this.checkboxes.change(function (_this) {
        return function (e) {
          return _this._didChangeCheckbox(e.target);
        };
      }(this));
      return this.toggle_all_checkbox.change(function (_this) {
        return function () {
          return _this._didChangeToggleAllCheckbox();
        };
      }(this));
    };

    CheckboxToggler.prototype._didChangeCheckbox = function (checkbox) {
      switch (this.checkboxes.filter(':checked').length) {
        case this.checkboxes.length - 1:
          return this.toggle_all_checkbox.prop({
            checked: null
          });
        case this.checkboxes.length:
          return this.toggle_all_checkbox.prop({
            checked: true
          });
      }
    };

    CheckboxToggler.prototype._didChangeToggleAllCheckbox = function () {
      var setting;
      setting = this.toggle_all_checkbox.prop('checked') ? true : null;
      return this.checkboxes.each(function (_this) {
        return function (index, el) {
          $(el).prop({
            checked: setting
          });
          return _this._didChangeCheckbox(el);
        };
      }(this));
    };

    return CheckboxToggler;
  }();

  $.widget.bridge('checkboxToggler', ActiveAdmin.CheckboxToggler);
}).call(undefined);

// File: dropdown-menu.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  ActiveAdmin.DropdownMenu = function () {
    function DropdownMenu(options, element) {
      var defaults;
      this.options = options;
      this.element = element;
      this.$element = $(this.element);
      defaults = {
        fadeInDuration: 20,
        fadeOutDuration: 100,
        onClickActionItemCallback: null
      };
      this.options = $.extend(defaults, this.options);
      this.isOpen = false;
      this.$menuButton = this.$element.find('.dropdown_menu_button');
      this.$menuList = this.$element.find('.dropdown_menu_list_wrapper');
      this._buildMenuList();
      this._bind();
    }

    DropdownMenu.prototype.open = function () {
      this.isOpen = true;
      this.$menuList.fadeIn(this.options.fadeInDuration);
      this._position();
      return this;
    };

    DropdownMenu.prototype.close = function () {
      this.isOpen = false;
      this.$menuList.fadeOut(this.options.fadeOutDuration);
      return this;
    };

    DropdownMenu.prototype.destroy = function () {
      this.$element.unbind();
      this.$element = null;
      return this;
    };

    DropdownMenu.prototype.isDisabled = function () {
      return this.$menuButton.hasClass('disabled');
    };

    DropdownMenu.prototype.disable = function () {
      return this.$menuButton.addClass('disabled');
    };

    DropdownMenu.prototype.enable = function () {
      return this.$menuButton.removeClass('disabled');
    };

    DropdownMenu.prototype.option = function (key, value) {
      if ($.isPlainObject(key)) {
        return this.options = $.extend(true, this.options, key);
      } else if (key != null) {
        return this.options[key];
      } else {
        return this.options[key] = value;
      }
    };

    DropdownMenu.prototype._buildMenuList = function () {
      this.$nipple = $('<div class="dropdown_menu_nipple"></div>');
      this.$menuList.prepend(this.$nipple);
      return this.$menuList.hide();
    };

    DropdownMenu.prototype._bind = function () {
      $('body').click(function (_this) {
        return function () {
          if (_this.isOpen) {
            return _this.close();
          }
        };
      }(this));
      return this.$menuButton.click(function (_this) {
        return function () {
          if (!_this.isDisabled()) {
            if (_this.isOpen) {
              _this.close();
            } else {
              _this.open();
            }
          }
          return false;
        };
      }(this));
    };

    DropdownMenu.prototype._position = function () {
      var button_center, button_left, button_right, centered_menu_left, centered_menu_right, menu_center, nipple_center, window_right;
      this.$menuList.css('top', this.$menuButton.position().top + this.$menuButton.outerHeight() + 10);
      button_left = this.$menuButton.position().left;
      button_center = this.$menuButton.outerWidth() / 2;
      button_right = button_left + button_center * 2;
      menu_center = this.$menuList.outerWidth() / 2;
      nipple_center = this.$nipple.outerWidth() / 2;
      window_right = $(window).width();
      centered_menu_left = button_left + button_center - menu_center;
      centered_menu_right = button_left + button_center + menu_center;
      if (centered_menu_left < 0) {
        this.$menuList.css('left', button_left);
        return this.$nipple.css('left', button_center - nipple_center);
      } else if (centered_menu_right > window_right) {
        this.$menuList.css('right', window_right - button_right);
        return this.$nipple.css('right', button_center - nipple_center);
      } else {
        this.$menuList.css('left', centered_menu_left);
        return this.$nipple.css('left', menu_center - nipple_center);
      }
    };

    return DropdownMenu;
  }();

  $.widget.bridge('aaDropdownMenu', ActiveAdmin.DropdownMenu);

  $(document).on('ready page:load', function () {
    return $('.dropdown_menu').aaDropdownMenu();
  });
}).call(undefined);

// File: flash.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  var Flash;

  ActiveAdmin.flash = Flash = function () {
    Flash.error = function (message, close_after) {
      return new this(message, "error", close_after);
    };

    Flash.notice = function (message, close_after) {
      return new this(message, "notice", close_after);
    };

    Flash.prototype.reference = function () {
      return this.reference;
    };

    function Flash(message1, type1, close_after) {
      this.message = message1;
      this.type = type1 != null ? type1 : "notice";
      this.reference = jQuery("<div>").addClass("flash flash_" + type).text(message);
      jQuery(".flashes").append(this.reference);
      if (close_after != null) {
        this.close_after(close_after);
      }
    }

    Flash.prototype.close_after = function (close_after) {
      return setTimeout(function (_this) {
        return function () {
          return _this.close();
        };
      }(this), close_after * 1000);
    };

    Flash.prototype.close = function () {
      return this.reference.remove();
    };

    return Flash;
  }();
}).call(undefined);

// File: has_many.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  var init_sortable, recompute_positions;

  $(function () {
    $(document).on('click', 'a.button.has_many_remove', function (e) {
      var parent, to_remove;
      e.preventDefault();
      parent = $(this).closest('.has_many_container');
      to_remove = $(this).closest('fieldset');
      recompute_positions(parent);
      parent.trigger('has_many_remove:before', [to_remove, parent]);
      to_remove.remove();
      return parent.trigger('has_many_remove:after', [to_remove, parent]);
    });
    $(document).on('click', 'a.button.has_many_add', function (e) {
      var before_add, fieldset, html, index, parent, regex;
      e.preventDefault();
      parent = $(this).closest('.has_many_container');
      parent.trigger(before_add = $.Event('has_many_add:before'), [parent]);
      if (!before_add.isDefaultPrevented()) {
        index = parent.data('has_many_index') || parent.children('fieldset').length - 1;
        parent.data({
          has_many_index: ++index
        });
        regex = new RegExp($(this).data('placeholder'), 'g');
        html = $(this).data('html').replace(regex, index);
        fieldset = $(html).insertBefore(this);
        recompute_positions(parent);
        return parent.trigger('has_many_add:after', [fieldset, parent]);
      }
    });
    $(document).on('change', '.has_many_container[data-sortable] :input[name$="[_destroy]"]', function () {
      return recompute_positions($(this).closest('.has_many'));
    });
    init_sortable();
    return $(document).on('has_many_add:after', '.has_many_container', init_sortable);
  });

  init_sortable = function init_sortable() {
    var elems;
    elems = $('.has_many_container[data-sortable]:not(.ui-sortable)');
    elems.sortable({
      items: '> fieldset',
      handle: '> ol > .handle',
      stop: recompute_positions
    });
    return elems.each(recompute_positions);
  };

  recompute_positions = function recompute_positions(parent) {
    var input_name, position;
    parent = parent instanceof jQuery ? parent : $(this);
    input_name = parent.data('sortable');
    position = parseInt(parent.data('sortable-start') || 0, 10);
    return parent.children('fieldset').each(function () {
      var destroy_input, sortable_input;
      destroy_input = $(this).find("> ol > .input > :input[name$='[_destroy]']");
      sortable_input = $(this).find("> ol > .input > :input[name$='[" + input_name + "]']");
      if (sortable_input.length) {
        return sortable_input.val(destroy_input.is(':checked') ? '' : position++);
      }
    });
  };
}).call(undefined);

// File: modal_dialog.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  ActiveAdmin.modal_dialog = function (message, inputs, callback) {
    var elem, html, klass, name, opts, ref, ref1, type, v, wrapper;
    html = "<form id=\"dialog_confirm\" title=\"" + message + "\"><ul>";
    for (name in inputs) {
      type = inputs[name];
      if (/^(datepicker|checkbox|text)$/.test(type)) {
        wrapper = 'input';
      } else if (type === 'textarea') {
        wrapper = 'textarea';
      } else if ($.isArray(type)) {
        ref = ['select', 'option', type, ''], wrapper = ref[0], elem = ref[1], opts = ref[2], type = ref[3];
      } else {
        throw new Error("Unsupported input type: {" + name + ": " + type + "}");
      }
      klass = type === 'datepicker' ? type : '';
      html += "<li>\n<label>" + (name.charAt(0).toUpperCase() + name.slice(1)) + "</label>\n<" + wrapper + " name=\"" + name + "\" class=\"" + klass + "\" type=\"" + type + "\">" + (opts ? function () {
        var i, len, results;
        results = [];
        for (i = 0, len = opts.length; i < len; i++) {
          v = opts[i];
          if ($.isArray(v)) {
            results.push("<" + elem + " value=" + v[1] + ">" + v[0] + "</" + elem + ">");
          } else {
            results.push("<" + elem + ">" + v + "</" + elem + ">");
          }
        }
        return results;
      }().join('') : '') + ("</" + wrapper + ">") + "</li>";
      ref1 = [], wrapper = ref1[0], elem = ref1[1], opts = ref1[2], type = ref1[3], klass = ref1[4];
    }
    html += "</ul></form>";
    return $(html).appendTo('body').dialog({
      modal: true,
      dialogClass: 'active_admin_dialog',
      buttons: {
        OK: function OK() {
          callback($(this).serializeObject());
          return $(this).dialog('close');
        },
        Cancel: function Cancel() {
          return $(this).dialog('close').remove();
        }
      }
    });
  };
}).call(undefined);

// File: per_page.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  ActiveAdmin.PerPage = function () {
    function PerPage(options, element) {
      this.options = options;
      this.element = element;
      this.$element = $(this.element);
      this._init();
      this._bind();
    }

    PerPage.prototype._init = function () {
      return this.$params = this._queryParams();
    };

    PerPage.prototype._bind = function () {
      return this.$element.change(function (_this) {
        return function () {
          _this.$params['per_page'] = _this.$element.val();
          delete _this.$params['page'];
          return location.search = $.param(_this.$params);
        };
      }(this));
    };

    PerPage.prototype._queryParams = function () {
      var m, params, query, re;
      query = window.location.search.substring(1);
      params = {};
      re = /([^&=]+)=([^&]*)/g;
      while (m = re.exec(query)) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
      }
      return params;
    };

    return PerPage;
  }();

  $.widget.bridge('perPage', ActiveAdmin.PerPage);

  $(function () {
    return $('.pagination_per_page select').perPage();
  });
}).call(undefined);

// File: popover.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  ActiveAdmin.Popover = function () {
    function Popover(options1, element) {
      var defaults;
      this.options = options1;
      this.element = element;
      this.$element = $(this.element);
      defaults = {
        fadeInDuration: 20,
        fadeOutDuration: 100,
        autoOpen: true,
        pageWrapperElement: "#wrapper",
        onClickActionItemCallback: null
      };
      this.options = $.extend(defaults, options);
      this.isOpen = false;
      if (!(this.$popover = $(this.$element.attr('href'))).length) {
        this.$popover = this.$element.next('.popover');
      }
      this._buildPopover();
      this._bind();
    }

    Popover.prototype.open = function () {
      this.isOpen = true;
      this.$popover.fadeIn(this.options.fadeInDuration);
      this._positionPopover();
      this._positionNipple();
      return this;
    };

    Popover.prototype.close = function () {
      this.isOpen = false;
      this.$popover.fadeOut(this.options.fadeOutDuration);
      return this;
    };

    Popover.prototype.destroy = function () {
      this.$element.removeData('popover');
      this.$element.unbind();
      this.$element = null;
      return this;
    };

    Popover.prototype._buildPopover = function () {
      this.$nipple = $('<div class="popover_nipple"></div>');
      this.$popover.prepend(this.$nipple);
      this.$popover.hide();
      return this.$popover.addClass('popover');
    };

    Popover.prototype._bind = function () {
      $(this.options.pageWrapperElement).click(function (_this) {
        return function () {
          if (_this.isOpen) {
            return _this.close();
          }
        };
      }(this));
      if (this.options.autoOpen) {
        return this.$element.click(function (_this) {
          return function (e) {
            e.stopPropagation();
            if (_this.isOpen) {
              return _this.close();
            } else {
              return _this.open();
            }
          };
        }(this));
      }
    };

    Popover.prototype._positionPopover = function () {
      var button_center, popover_center;
      button_center = this.$element.offset().left + this.$element.outerWidth() / 2;
      popover_center = this.$popover.outerWidth() / 2;
      return this.$popover.css('left', button_center - popover_center);
    };

    Popover.prototype._positionNipple = function () {
      this.$popover.css('top', this.$element.offset().top + this.$element.outerHeight() + 10);
      return this.$nipple.css('left', this.$popover.outerWidth() / 2 - this.$nipple.outerWidth() / 2);
    };

    return Popover;
  }();

  $.widget.bridge('popover', ActiveAdmin.Popover);
}).call(undefined);

// File: table-checkbox-toggler.js.js
// Generated by CoffeeScript 1.10.0
(function () {
  var extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  ActiveAdmin.TableCheckboxToggler = function (superClass) {
    extend(TableCheckboxToggler, superClass);

    function TableCheckboxToggler() {
      return TableCheckboxToggler.__super__.constructor.apply(this, arguments);
    }

    TableCheckboxToggler.prototype._init = function () {
      return TableCheckboxToggler.__super__._init.apply(this, arguments);
    };

    TableCheckboxToggler.prototype._bind = function () {
      TableCheckboxToggler.__super__._bind.apply(this, arguments);
      return this.$container.find('tbody td').click(function (_this) {
        return function (e) {
          if (e.target.type !== 'checkbox') {
            return _this._didClickCell(e.target);
          }
        };
      }(this));
    };

    TableCheckboxToggler.prototype._didChangeCheckbox = function (checkbox) {
      var $row;
      TableCheckboxToggler.__super__._didChangeCheckbox.apply(this, arguments);
      $row = $(checkbox).parents('tr');
      if (checkbox.checked) {
        return $row.addClass('selected');
      } else {
        return $row.removeClass('selected');
      }
    };

    TableCheckboxToggler.prototype._didClickCell = function (cell) {
      return $(cell).parent('tr').find(':checkbox').click();
    };

    return TableCheckboxToggler;
  }(ActiveAdmin.CheckboxToggler);

  $.widget.bridge('tableCheckboxToggler', ActiveAdmin.TableCheckboxToggler);
}).call(undefined);

// File: sortable_associations.js
$(document).ready(function () {
  // Fix sortable helper
  var fixHelper = function fixHelper(e, ui) {
    ui.children().each(function () {
      $(this).width($(this).width());
    });
    return ui;
  };

  $('table.sortable').ready(function () {
    var td_count = $(this).find('tbody tr:first-child td').length;
    $('table.sortable tbody').sortable({
      handle: '.handle',
      helper: fixHelper,
      placeholder: 'ui-sortable-placeholder',
      update: function update(event, ui) {
        //$("#progress").show();
        var positions = [];
        $.each($('table.sortable tbody tr'), function (position, obj) {
          var reg = /(\w+_?)+_(\d+)/;
          var parts = reg.exec($(obj).prop('id'));
          if (parts) {
            positions = positions.concat({ 'id': parts[2], 'position': position });
          }
        });
        $.ajax({
          url: $(ui.item).closest("table.sortable").data("sortable-link"),
          type: 'POST',
          beforeSend: function beforeSend(xhr) {
            var csrf_token = $('meta[name=csrf-token]').attr('content');
            xhr.setRequestHeader('x-csrf-token', csrf_token);
          },
          dataType: 'script',
          data: { positions: positions },
          success: function success(data) {
            //$("#progress").hide();
          }
        });
      },
      start: function start(event, ui) {
        // Set correct height for placehoder (from dragged tr)
        ui.placeholder.height(ui.item.height());
        // Fix placeholder content to make it correct width
        ui.placeholder.html("<td colspan='" + td_count + "'></td>");
      },
      stop: function stop(event, ui) {
        // Fix odd/even classes after reorder
        $("table.sortable tr:even").removeClass("odd even").addClass("even");
        $("table.sortable tr:odd").removeClass("odd even").addClass("odd");
      }

    });
  });
});

/*
        BestInPlace (for jQuery)
        version: 0.1.0 (01/01/2011)
        @requires jQuery >= v1.4
        @requires jQuery.purr to display pop-up windows

        By Bernat Farrero based on the work of Jan Varwig.
        Examples at http://bernatfarrero.com

        Licensed under the MIT:
          http://www.opensource.org/licenses/mit-license.php

        Usage:

        Attention.
        The format of the JSON object given to the select inputs is the following:
        [["key", "value"],["key", "value"]]
        The format of the JSON object given to the checkbox inputs is the following:
        ["falseValue", "trueValue"]
*/

function BestInPlaceEditor(e) {
  this.element = e;
  this.initOptions();
  this.bindForm();
  this.initNil();
  jQuery(this.activator).bind('click', { editor: this }, this.clickHandler);
}

BestInPlaceEditor.prototype = {
  // Public Interface Functions //////////////////////////////////////////////

  activate: function activate() {
    var to_display = "";
    if (this.isNil) {
      to_display = "";
    } else if (this.original_content) {
      to_display = this.original_content;
    } else {
      if (this.sanitize) {
        to_display = this.element.text();
      } else {
        to_display = this.element.html();
      }
    }

    var elem = this.isNil ? "-" : this.sanitize ? this.element.text() : this.element.html();
    this.oldValue = elem;
    this.display_value = to_display;
    jQuery(this.activator).unbind("click", this.clickHandler);
    this.activateForm();
    this.element.trigger(jQuery.Event("best_in_place:activate"));
  },

  abort: function abort() {
    if (this.isNil) this.element.text(this.nil);else this.element.text(this.oldValue);
    jQuery(this.activator).bind('click', { editor: this }, this.clickHandler);
    this.element.trigger(jQuery.Event("best_in_place:abort"));
    this.element.trigger(jQuery.Event("best_in_place:deactivate"));
  },

  abortIfConfirm: function abortIfConfirm() {
    if (!this.useConfirm) {
      this.abort();
      return;
    }

    if (confirm("Are you sure you want to discard your changes?")) {
      this.abort();
    }
  },

  update: function update() {
    var editor = this;
    if (this.formType in { "input": 1, "textarea": 1 } && this.getValue() == this.oldValue) {
      // Avoid request if no change is made
      this.abort();
      return true;
    }
    this.isNil = false;
    editor.ajax({
      "type": "post",
      "dataType": "text",
      "data": editor.requestData(),
      "success": function success(data) {
        editor.loadSuccessCallback(data);
      },
      "error": function error(request, _error) {
        editor.loadErrorCallback(request, _error);
      }
    });
    if (this.formType == "select") {
      var value = this.getValue();
      this.previousCollectionValue = value;

      jQuery.each(this.values, function (i, v) {
        if (value == v[0]) {
          editor.element.html(v[1]);
        }
      });
    } else if (this.formType == "checkbox") {
      editor.element.html(this.getValue() ? this.values[1] : this.values[0]);
    } else {
      editor.element.text(this.getValue() !== "" ? this.getValue() : this.nil);
    }
    editor.element.trigger(jQuery.Event("best_in_place:update"));
  },

  activateForm: function activateForm() {
    alert("The form was not properly initialized. activateForm is unbound");
  },

  // Helper Functions ////////////////////////////////////////////////////////

  initOptions: function initOptions() {
    // Try parent supplied info
    var self = this;
    self.element.parents().each(function () {
      $parent = jQuery(this);
      self.url = self.url || $parent.attr("data-url");
      self.collection = self.collection || $parent.attr("data-collection");
      self.formType = self.formType || $parent.attr("data-type");
      self.objectName = self.objectName || $parent.attr("data-object");
      self.attributeName = self.attributeName || $parent.attr("data-attribute");
      self.activator = self.activator || $parent.attr("data-activator");
      self.okButton = self.okButton || $parent.attr("data-ok-button");
      self.cancelButton = self.cancelButton || $parent.attr("data-cancel-button");
      self.nil = self.nil || $parent.attr("data-nil");
      self.inner_class = self.inner_class || $parent.attr("data-inner-class");
      self.html_attrs = self.html_attrs || $parent.attr("data-html-attrs");
      self.original_content = self.original_content || $parent.attr("data-original-content");
      self.collectionValue = self.collectionValue || $parent.attr("data-value");
    });

    // Try Rails-id based if parents did not explicitly supply something
    self.element.parents().each(function () {
      var res = this.id.match(/^(\w+)_(\d+)$/i);
      if (res) {
        self.objectName = self.objectName || res[1];
      }
    });

    // Load own attributes (overrides all others)
    self.url = self.element.attr("data-url") || self.url || document.location.pathname;
    self.collection = self.element.attr("data-collection") || self.collection;
    self.formType = self.element.attr("data-type") || self.formtype || "input";
    self.objectName = self.element.attr("data-object") || self.objectName;
    self.attributeName = self.element.attr("data-attribute") || self.attributeName;
    self.activator = self.element.attr("data-activator") || self.element;
    self.okButton = self.element.attr("data-ok-button") || self.okButton;
    self.cancelButton = self.element.attr("data-cancel-button") || self.cancelButton;
    self.nil = self.element.attr("data-nil") || self.nil || "-";
    self.inner_class = self.element.attr("data-inner-class") || self.inner_class || null;
    self.html_attrs = self.element.attr("data-html-attrs") || self.html_attrs;
    self.original_content = self.element.attr("data-original-content") || self.original_content;
    self.collectionValue = self.element.attr("data-value") || self.collectionValue;

    if (!self.element.attr("data-sanitize")) {
      self.sanitize = true;
    } else {
      self.sanitize = self.element.attr("data-sanitize") == "true";
    }

    if (!self.element.attr("data-use-confirm")) {
      self.useConfirm = true;
    } else {
      self.useConfirm = self.element.attr("data-use-confirm") != "false";
    }

    if ((self.formType == "select" || self.formType == "checkbox") && self.collection !== null) {
      self.values = jQuery.parseJSON(self.collection);
    }
  },

  bindForm: function bindForm() {
    this.activateForm = BestInPlaceEditor.forms[this.formType].activateForm;
    this.getValue = BestInPlaceEditor.forms[this.formType].getValue;
  },

  initNil: function initNil() {
    if (this.element.text() === "") {
      this.isNil = true;
      this.element.text(this.nil);
    }
  },

  getValue: function getValue() {
    alert("The form was not properly initialized. getValue is unbound");
  },

  // Trim and Strips HTML from text
  sanitizeValue: function sanitizeValue(s) {
    return jQuery.trim(s);
  },

  /* Generate the data sent in the POST request */
  requestData: function requestData() {
    // To prevent xss attacks, a csrf token must be defined as a meta attribute
    csrf_token = jQuery('meta[name=csrf-token]').attr('content');
    csrf_param = jQuery('meta[name=csrf-param]').attr('content');

    var data = "_method=put";
    data += "&" + this.objectName + '[' + this.attributeName + ']=' + encodeURIComponent(this.getValue());

    if (csrf_param !== undefined && csrf_token !== undefined) {
      data += "&" + csrf_param + "=" + encodeURIComponent(csrf_token);
    }
    return data;
  },

  ajax: function ajax(options) {
    options.url = this.url;
    options.beforeSend = function (xhr) {
      xhr.setRequestHeader("Accept", "application/json");
    };
    return jQuery.ajax(options);
  },

  // Handlers ////////////////////////////////////////////////////////////////

  loadSuccessCallback: function loadSuccessCallback(data) {
    try {
      var response = jQuery.parseJSON(jQuery.trim(data));
      if (response !== null && response.hasOwnProperty("display_as")) {
        this.element.attr("data-original-content", this.element.text());
        this.original_content = this.element.text();
        this.element.text(response["display_as"]);
      }
      this.element.trigger(jQuery.Event("ajax:success"), data);

      // Binding back after being clicked
      jQuery(this.activator).bind('click', { editor: this }, this.clickHandler);
      this.element.trigger(jQuery.Event("best_in_place:deactivate"));

      if (this.collectionValue !== null) {
        this.collectionValue = this.previousCollectionValue;
        this.previousCollectionValue = null;
      }
    } catch (err) {}
  },

  loadErrorCallback: function loadErrorCallback(request, error) {
    this.element.text(this.oldValue);

    this.element.trigger(jQuery.Event("best_in_place:error"), [request, error]);
    this.element.trigger(jQuery.Event("ajax:error"));

    // Binding back after being clicked
    jQuery(this.activator).bind('click', { editor: this }, this.clickHandler);
    this.element.trigger(jQuery.Event("best_in_place:deactivate"));
  },

  clickHandler: function clickHandler(event) {
    event.preventDefault();
    event.data.editor.activate();
  },

  setHtmlAttributes: function setHtmlAttributes() {
    var formField = this.element.find(this.formType);

    try {
      var attrs = jQuery.parseJSON(this.html_attrs);
      for (var key in attrs) {
        formField.attr(key, attrs[key]);
      }
    } catch (err) {}
  }
};

// Button cases:
// If no buttons, then blur saves, ESC cancels
// If just Cancel button, then blur saves, ESC or clicking Cancel cancels (careful of blur event!)
// If just OK button, then clicking OK saves (careful of blur event!), ESC or blur cancels
// If both buttons, then clicking OK saves, ESC or clicking Cancel or blur cancels
BestInPlaceEditor.forms = {
  "input": {
    activateForm: function activateForm() {
      var output = jQuery(document.createElement('form')).addClass('form_in_place').attr('action', 'javascript:void(0);').attr('style', 'display:inline');
      var input_elt = jQuery(document.createElement('input')).attr('type', 'text').attr('name', this.attributeName).val(this.display_value);
      if (this.inner_class !== null) {
        input_elt.addClass(this.inner_class);
      }
      output.append(input_elt);
      if (this.okButton) {
        output.append(jQuery(document.createElement('input')).attr('type', 'submit').attr('value', this.okButton));
      }
      if (this.cancelButton) {
        output.append(jQuery(document.createElement('input')).attr('type', 'button').attr('value', this.cancelButton));
      }

      this.element.html(output);
      this.setHtmlAttributes();
      this.element.find("input[type='text']")[0].select();
      this.element.find("form").bind('submit', { editor: this }, BestInPlaceEditor.forms.input.submitHandler);
      if (this.cancelButton) {
        this.element.find("input[type='button']").bind('click', { editor: this }, BestInPlaceEditor.forms.input.cancelButtonHandler);
      }
      this.element.find("input[type='text']").bind('blur', { editor: this }, BestInPlaceEditor.forms.input.inputBlurHandler);
      this.element.find("input[type='text']").bind('keyup', { editor: this }, BestInPlaceEditor.forms.input.keyupHandler);
      this.blurTimer = null;
      this.userClicked = false;
    },

    getValue: function getValue() {
      return this.sanitizeValue(this.element.find("input").val());
    },

    // When buttons are present, use a timer on the blur event to give precedence to clicks
    inputBlurHandler: function inputBlurHandler(event) {
      if (event.data.editor.okButton) {
        event.data.editor.blurTimer = setTimeout(function () {
          if (!event.data.editor.userClicked) {
            event.data.editor.abort();
          }
        }, 500);
      } else {
        if (event.data.editor.cancelButton) {
          event.data.editor.blurTimer = setTimeout(function () {
            if (!event.data.editor.userClicked) {
              event.data.editor.update();
            }
          }, 500);
        } else {
          event.data.editor.update();
        }
      }
    },

    submitHandler: function submitHandler(event) {
      event.data.editor.userClicked = true;
      clearTimeout(event.data.editor.blurTimer);
      event.data.editor.update();
    },

    cancelButtonHandler: function cancelButtonHandler(event) {
      event.data.editor.userClicked = true;
      clearTimeout(event.data.editor.blurTimer);
      event.data.editor.abort();
      event.stopPropagation(); // Without this, click isn't handled
    },

    keyupHandler: function keyupHandler(event) {
      if (event.keyCode == 27) {
        event.data.editor.abort();
      }
    }
  },

  "date": {
    activateForm: function activateForm() {
      var that = this,
          output = jQuery(document.createElement('form')).addClass('form_in_place').attr('action', 'javascript:void(0);').attr('style', 'display:inline'),
          input_elt = jQuery(document.createElement('input')).attr('type', 'text').attr('name', this.attributeName).attr('value', this.sanitizeValue(this.display_value));
      if (this.inner_class !== null) {
        input_elt.addClass(this.inner_class);
      }
      output.append(input_elt);

      this.element.html(output);
      this.setHtmlAttributes();
      this.element.find('input')[0].select();
      this.element.find("form").bind('submit', { editor: this }, BestInPlaceEditor.forms.input.submitHandler);
      this.element.find("input").bind('keyup', { editor: this }, BestInPlaceEditor.forms.input.keyupHandler);

      this.element.find('input').datepicker({
        onClose: function onClose() {
          that.update();
        }
      }).datepicker('show');
    },

    getValue: function getValue() {
      return this.sanitizeValue(this.element.find("input").val());
    },

    submitHandler: function submitHandler(event) {
      event.data.editor.update();
    },

    keyupHandler: function keyupHandler(event) {
      if (event.keyCode == 27) {
        event.data.editor.abort();
      }
    }
  },

  "select": {
    activateForm: function activateForm() {
      var output = jQuery(document.createElement('form')).attr('action', 'javascript:void(0)').attr('style', 'display:inline');
      selected = '', oldValue = this.oldValue, select_elt = jQuery(document.createElement('select')), currentCollectionValue = this.collectionValue;

      jQuery.each(this.values, function (index, value) {
        var option_elt = jQuery(document.createElement('option'))
        // .attr('value', value[0])
        .val(value[0]).html(value[1]);
        if (value[0] == currentCollectionValue) {
          option_elt.attr('selected', 'selected');
        }
        select_elt.append(option_elt);
      });
      output.append(select_elt);

      this.element.html(output);
      this.setHtmlAttributes();
      this.element.find("select").bind('change', { editor: this }, BestInPlaceEditor.forms.select.blurHandler);
      this.element.find("select").bind('blur', { editor: this }, BestInPlaceEditor.forms.select.blurHandler);
      this.element.find("select").bind('keyup', { editor: this }, BestInPlaceEditor.forms.select.keyupHandler);
      this.element.find("select")[0].focus();
    },

    getValue: function getValue() {
      return this.sanitizeValue(this.element.find("select").val());
      // return this.element.find("select").val();
    },

    blurHandler: function blurHandler(event) {
      event.data.editor.update();
    },

    keyupHandler: function keyupHandler(event) {
      if (event.keyCode == 27) event.data.editor.abort();
    }
  },

  "checkbox": {
    activateForm: function activateForm() {
      var newValue = Boolean(this.oldValue.toLowerCase() != this.values[1].toLowerCase());
      var output = newValue ? this.values[1] : this.values[0];
      this.element.html(output);
      this.setHtmlAttributes();
      this.update();
    },

    getValue: function getValue() {
      return Boolean(this.element.html().toLowerCase() == this.values[1].toLowerCase());
    }
  },

  "textarea": {
    activateForm: function activateForm() {
      // grab width and height of text
      width = this.element.css('width');
      height = this.element.css('height');

      // construct form
      var output = jQuery(document.createElement('form')).attr('action', 'javascript:void(0)').attr('style', 'display:inline').append(jQuery(document.createElement('textarea')).val(this.sanitizeValue(this.display_value)));
      if (this.okButton) {
        output.append(jQuery(document.createElement('input')).attr('type', 'submit').attr('value', this.okButton));
      }
      if (this.cancelButton) {
        output.append(jQuery(document.createElement('input')).attr('type', 'button').attr('value', this.cancelButton));
      }

      this.element.html(output);
      this.setHtmlAttributes();

      // set width and height of textarea
      jQuery(this.element.find("textarea")[0]).css({ 'min-width': width, 'min-height': height });
      jQuery(this.element.find("textarea")[0]).elastic();

      this.element.find("textarea")[0].focus();
      this.element.find("form").bind('submit', { editor: this }, BestInPlaceEditor.forms.textarea.submitHandler);
      if (this.cancelButton) {
        this.element.find("input[type='button']").bind('click', { editor: this }, BestInPlaceEditor.forms.textarea.cancelButtonHandler);
      }
      this.element.find("textarea").bind('blur', { editor: this }, BestInPlaceEditor.forms.textarea.blurHandler);
      this.element.find("textarea").bind('keyup', { editor: this }, BestInPlaceEditor.forms.textarea.keyupHandler);
      this.blurTimer = null;
      this.userClicked = false;
    },

    getValue: function getValue() {
      return this.sanitizeValue(this.element.find("textarea").val());
    },

    // When buttons are present, use a timer on the blur event to give precedence to clicks
    blurHandler: function blurHandler(event) {
      if (event.data.editor.okButton) {
        event.data.editor.blurTimer = setTimeout(function () {
          if (!event.data.editor.userClicked) {
            event.data.editor.abortIfConfirm();
          }
        }, 500);
      } else {
        if (event.data.editor.cancelButton) {
          event.data.editor.blurTimer = setTimeout(function () {
            if (!event.data.editor.userClicked) {
              event.data.editor.update();
            }
          }, 500);
        } else {
          event.data.editor.update();
        }
      }
    },

    submitHandler: function submitHandler(event) {
      event.data.editor.userClicked = true;
      clearTimeout(event.data.editor.blurTimer);
      event.data.editor.update();
    },

    cancelButtonHandler: function cancelButtonHandler(event) {
      event.data.editor.userClicked = true;
      clearTimeout(event.data.editor.blurTimer);
      event.data.editor.abortIfConfirm();
      event.stopPropagation(); // Without this, click isn't handled
    },

    keyupHandler: function keyupHandler(event) {
      if (event.keyCode == 27) {
        event.data.editor.abortIfConfirm();
      }
    }
  }
};

jQuery.fn.best_in_place = function () {

  function setBestInPlace(element) {
    if (!element.data('bestInPlaceEditor')) {
      element.data('bestInPlaceEditor', new BestInPlaceEditor(element));
      return true;
    }
  }

  jQuery(this.context).delegate(this.selector, 'click', function () {
    var el = jQuery(this);
    if (setBestInPlace(el)) el.click();
  });

  this.each(function () {
    setBestInPlace(jQuery(this));
  });

  return this;
};

/**
* @name             Elastic
* @descripton           Elastic is Jquery plugin that grow and shrink your textareas automaticliy
* @version            1.6.5
* @requires           Jquery 1.2.6+
*
* @author             Jan Jarfalk
* @author-email         jan.jarfalk@unwrongest.com
* @author-website         http://www.unwrongest.com
*
* @licens             MIT License - http://www.opensource.org/licenses/mit-license.php
*/

(function (jQuery) {
  jQuery.fn.extend({
    elastic: function elastic() {
      //  We will create a div clone of the textarea
      //  by copying these attributes from the textarea to the div.
      var mimics = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'fontSize', 'lineHeight', 'fontFamily', 'width', 'fontWeight'];

      return this.each(function () {

        // Elastic only works on textareas
        if (this.type != 'textarea') {
          return false;
        }

        var $textarea = jQuery(this),
            $twin = jQuery('<div />').css({ 'position': 'absolute', 'display': 'none', 'word-wrap': 'break-word' }),
            lineHeight = parseInt($textarea.css('line-height'), 10) || parseInt($textarea.css('font-size'), '10'),
            minheight = parseInt($textarea.css('height'), 10) || lineHeight * 3,
            maxheight = parseInt($textarea.css('max-height'), 10) || Number.MAX_VALUE,
            goalheight = 0,
            i = 0;

        // Opera returns max-height of -1 if not set
        if (maxheight < 0) {
          maxheight = Number.MAX_VALUE;
        }

        // Append the twin to the DOM
        // We are going to meassure the height of this, not the textarea.
        $twin.appendTo($textarea.parent());

        // Copy the essential styles (mimics) from the textarea to the twin
        i = mimics.length;
        while (i--) {
          $twin.css(mimics[i].toString(), $textarea.css(mimics[i].toString()));
        }

        // Sets a given height and overflow state on the textarea
        function setHeightAndOverflow(height, overflow) {
          curratedHeight = Math.floor(parseInt(height, 10));
          if ($textarea.height() != curratedHeight) {
            $textarea.css({ 'height': curratedHeight + 'px', 'overflow': overflow });
          }
        }

        // This function will update the height of the textarea if necessary
        function update() {

          // Get curated content from the textarea.
          var textareaContent = $textarea.val().replace(/&/g, '&amp;').replace(/  /g, '&nbsp;').replace(/<|>/g, '&gt;').replace(/\n/g, '<br />');

          // Compare curated content with curated twin.
          var twinContent = $twin.html().replace(/<br>/ig, '<br />');

          if (textareaContent + '&nbsp;' != twinContent) {

            // Add an extra white space so new rows are added when you are at the end of a row.
            $twin.html(textareaContent + '&nbsp;');

            // Change textarea height if twin plus the height of one line differs more than 3 pixel from textarea height
            if (Math.abs($twin.height() + lineHeight - $textarea.height()) > 3) {

              var goalheight = $twin.height() + lineHeight;
              if (goalheight >= maxheight) {
                setHeightAndOverflow(maxheight, 'auto');
              } else if (goalheight <= minheight) {
                setHeightAndOverflow(minheight, 'hidden');
              } else {
                setHeightAndOverflow(goalheight, 'hidden');
              }
            }
          }
        }

        // Hide scrollbars
        $textarea.css({ 'overflow': 'hidden' });

        // Update textarea size on keyup, change, cut and paste
        $textarea.bind('keyup change cut paste', function () {
          update();
        });

        // Compact textarea on blur
        // Lets animate this....
        $textarea.bind('blur', function () {
          if ($twin.height() < maxheight) {
            if ($twin.height() > minheight) {
              $textarea.height($twin.height());
            } else {
              $textarea.height(minheight);
            }
          }
        });

        // And this line is to catch the browser paste event
        $textarea.live('input paste', function (e) {
          setTimeout(update, 250);
        });

        // Run update once when elastic is initialized
        update();
      });
    }
  });
})(jQuery);

//= require jquery.purr

jQuery(document).on('best_in_place:error', function (event, request, error) {
  // Display all error messages from server side validation
  jQuery.each(jQuery.parseJSON(request.responseText), function (index, value) {
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == "object") {
      value = index + " " + value.toString();
    }
    var container = jQuery("<span class='flash-error'></span>").html(value);
    container.purr();
  });
});

(function ($, undefined) {

  /**
   * Unobtrusive scripting adapter for jQuery
   * https://github.com/rails/jquery-ujs
   *
   * Requires jQuery 1.8.0 or later.
   *
   * Released under the MIT license
   *
   */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ($.rails !== undefined) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function csrfToken() {
      return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function csrfParam() {
      return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function CSRFProtection(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function refreshCSRFTokens() {
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function fire(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function (_confirm) {
      function confirm(_x) {
        return _confirm.apply(this, arguments);
      }

      confirm.toString = function () {
        return _confirm.toString();
      };

      return confirm;
    }(function (message) {
      return confirm(message);
    }),

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function ajax(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function href(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function isRemote(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function handleRemote(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || $.ajaxSettings && $.ajaxSettings.dataType;

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function beforeSend(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function success(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function complete(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function error(xhr, status, _error2) {
            element.trigger('ajax:error', [xhr, status, _error2]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) {
          options.url = url;
        }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function isCrossDomain(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host || originAnchor.protocol + '//' + originAnchor.host === urlAnchor.protocol + '//' + urlAnchor.host);
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function handleMethod(link) {
      var href = rails.href(link),
          method = link.data('method'),
          target = link.attr('target'),
          csrfToken = rails.csrfToken(),
          csrfParam = rails.csrfParam(),
          form = $('<form method="post" action="' + href + '"></form>'),
          metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) {
        form.attr('target', target);
      }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function formElements(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function disableFormElements(form) {
      rails.formElements(form, rails.disableSelector).each(function () {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function disableFormElement(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function enableFormElements(form) {
      rails.formElements(form, rails.enableSelector).each(function () {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function enableFormElement(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

    /* For 'data-confirm' attribute:
       - Fires `confirm` event
       - Shows the confirmation dialog
       - Fires the `confirm:complete` event
       Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
       Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
       Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
       return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
    */
    allowAction: function allowAction(element) {
      var message = element.data('confirm'),
          answer = false,
          callback;
      if (!message) {
        return true;
      }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function blankInputs(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
          input,
          valueToCheck,
          radiosForNameWithNoneSelected,
          radioName,
          selector = specifiedSelector || 'input,textarea',
          requiredInputs = form.find(selector),
          checkedRadioButtonNames = {};

      requiredInputs.each(function () {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find('input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function nonBlankInputs(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function stopEverything(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function disableElement(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function (e) {
        // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function enableElement(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function (options, originalOptions, xhr) {
      if (!options.crossDomain) {
        rails.CSRFProtection(xhr);
      }
    });

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function () {
      rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function () {
      rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function (e) {
      var link = $(this),
          method = link.data('method'),
          data = link.data('params'),
          metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) {
          return true;
        }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail(function () {
            rails.enableElement(link);
          });
        }
        return false;
      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function (e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail(function () {
          rails.enableFormElement(button);
        });
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function (e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function (e) {
      var form = $(this),
          remote = rails.isRemote(form),
          blankRequiredInputs,
          nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function () {
            rails.disableFormElements(form);
          }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) {
            setTimeout(function () {
              rails.enableFormElements(form);
            }, 13);
          }

          return aborted;
        }

        rails.handleRemote(form);
        return false;
      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function () {
          rails.disableFormElements(form);
        }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function (event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
          data = name ? { name: name, value: button.val() } : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function (event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function (event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function () {
      rails.refreshCSRFTokens();
    });
  }
})(jQuery);

//# sourceMappingURL=ex_admin_common.js.map
});

;require('web/static/js/app');
//# sourceMappingURL=app.js.map
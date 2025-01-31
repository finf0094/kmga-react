import e from"./html-5a0zIFJL.js";import"./javascript-oDPzr4fP.js";import"./css-OOrPhI1W.js";const n=Object.freeze(JSON.parse(`{"displayName":"Closure Templates","fileTypes":["soy"],"injections":{"meta.tag":{"patterns":[{"include":"#body"}]}},"name":"soy","patterns":[{"include":"#alias"},{"include":"#delpackage"},{"include":"#namespace"},{"include":"#template"},{"include":"#comment"}],"repository":{"alias":{"captures":{"1":{"name":"storage.type.soy"},"2":{"name":"entity.name.type.soy"},"3":{"name":"storage.type.soy"},"4":{"name":"entity.name.type.soy"}},"match":"{(alias)\\\\s+([\\\\w\\\\.]+)(?:\\\\s+(as)\\\\s+(\\\\w+))?}"},"attribute":{"captures":{"1":{"name":"storage.other.attribute.soy"},"2":{"name":"string.double.quoted.soy"}},"match":"(\\\\w+)=(\\"(?:\\\\\\\\?.)*?\\")"},"body":{"patterns":[{"include":"#comment"},{"include":"#let"},{"include":"#call"},{"include":"#css"},{"include":"#xid"},{"include":"#condition"},{"include":"#condition-control"},{"include":"#for"},{"include":"#literal"},{"include":"#msg"},{"include":"#special-character"},{"include":"#print"},{"include":"text.html.basic"}]},"boolean":{"match":"true|false","name":"language.constant.boolean.soy"},"call":{"patterns":[{"begin":"{((?:del)?call)\\\\s+([\\\\w\\\\.]+)(?=[^/]*?})","beginCaptures":{"1":{"name":"storage.type.function.soy"},"2":{"name":"entity.name.function.soy"}},"end":"{/(\\\\1)}","endCaptures":{"1":{"name":"storage.type.function.soy"}},"patterns":[{"include":"#comment"},{"include":"#variant"},{"include":"#attribute"},{"include":"#param"}]},{"begin":"{((?:del)?call)(\\\\s+[\\\\w\\\\.]+)","beginCaptures":{"1":{"name":"storage.type.function.soy"},"2":{"name":"entity.name.function.soy"}},"end":"/}","patterns":[{"include":"#variant"},{"include":"#attribute"}]}]},"comment":{"patterns":[{"begin":"/\\\\*","end":"\\\\*/","name":"comment.block.documentation.soy","patterns":[{"captures":{"1":{"name":"keyword.parameter.soy"},"2":{"name":"variable.parameter.soy"}},"match":"(@param\\\\??)\\\\s+(\\\\S+)"}]},{"match":"^\\\\s*(\\\\/\\\\/.*)$","name":"comment.line.double-slash.soy"}]},"condition":{"begin":"{/?(if|elseif|switch|case)\\\\s*","beginCaptures":{"1":{"name":"keyword.control.soy"}},"end":"}","patterns":[{"include":"#attribute"},{"include":"#expression"}]},"condition-control":{"captures":{"1":{"name":"keyword.control.soy"}},"match":"{(else|ifempty|default)}"},"css":{"begin":"{(css)\\\\s+","beginCaptures":{"1":{"name":"keyword.other.soy"}},"end":"}","patterns":[{"include":"#expression"}]},"delpackage":{"captures":{"1":{"name":"storage.type.soy"},"2":{"name":"entity.name.type.soy"}},"match":"{(delpackage)\\\\s+([\\\\w\\\\.]+)}"},"expression":{"patterns":[{"include":"#boolean"},{"include":"#number"},{"include":"#function"},{"include":"#null"},{"include":"#string"},{"include":"#variable-ref"},{"include":"#operator"}]},"for":{"begin":"{/?(foreach|for)(?=\\\\s|})","beginCaptures":{"1":{"name":"keyword.control.soy"}},"end":"}","patterns":[{"match":"in","name":"keyword.control.soy"},{"include":"#expression"},{"include":"#body"}]},"function":{"begin":"(\\\\w+)\\\\(","beginCaptures":{"1":{"name":"support.function.soy"}},"end":"\\\\)","patterns":[{"include":"#expression"}]},"let":{"patterns":[{"begin":"{(let)\\\\s+(\\\\$\\\\w+\\\\s*:)","beginCaptures":{"1":{"name":"storage.type.soy"},"2":{"name":"variable.soy"}},"end":"/}","patterns":[{"include":"#comment"},{"include":"#expression"}]},{"begin":"{(let)\\\\s+(\\\\$\\\\w+)","beginCaptures":{"1":{"name":"storage.type.soy"},"2":{"name":"variable.soy"}},"end":"{/(\\\\1)}","endCaptures":{"1":{"name":"storage.type.soy"}},"patterns":[{"include":"#attribute"},{"include":"#body"}]}]},"literal":{"begin":"{(literal)}","beginCaptures":{"1":{"name":"keyword.other.soy"}},"end":"{/(\\\\1)}","endCaptures":{"1":{"name":"keyword.other.soy"}},"name":"meta.literal"},"msg":{"captures":{"1":{"name":"keyword.other.soy"}},"end":"}","match":"{/?(msg|fallbackmsg)","patterns":[{"include":"#attribute"}]},"namespace":{"captures":{"1":{"name":"storage.type.soy"},"2":{"name":"entity.name.type.soy"}},"match":"{(namespace)\\\\s+([\\\\w\\\\.]+)}"},"null":{"match":"null","name":"language.constant.null.soy"},"number":{"match":"-?\\\\.?\\\\d+|\\\\d[\\\\.\\\\d]*","name":"language.constant.numeric"},"operator":{"match":"-|not|\\\\*|\\\\/|%|\\\\+|<=|>=|<|>|==|!=|and|or|\\\\?:|\\\\?|:","name":"keyword.operator.soy"},"param":{"patterns":[{"begin":"{(param)\\\\s+(\\\\w+\\\\s*\\\\:)","beginCaptures":{"1":{"name":"storage.type.soy"},"2":{"name":"variable.parameter.soy"}},"end":"/}","patterns":[{"include":"#expression"}]},{"begin":"{(param)\\\\s+(\\\\w+)","beginCaptures":{"1":{"name":"storage.type.soy"},"2":{"name":"variable.parameter.soy"}},"end":"{/(\\\\1)}","endCaptures":{"1":{"name":"storage.type.soy"}},"patterns":[{"include":"#attribute"},{"include":"#body"}]}]},"print":{"begin":"{(print)?\\\\s*","beginCaptures":{"1":{"name":"keyword.other.soy"}},"end":"}","patterns":[{"captures":{"1":{"name":"support.function.soy"}},"match":"\\\\|\\\\s*(changeNewlineToBr|truncate|bidiSpanWrap|bidiUnicodeWrap)"},{"include":"#expression"}]},"special-character":{"captures":{"1":{"name":"language.support.constant"}},"match":"{(sp|nil|\\\\\\\\r|\\\\\\\\n|\\\\\\\\t|lb|rb)}"},"string":{"begin":"'","end":"'","name":"string.quoted.single.soy","patterns":[{"match":"\\\\\\\\(?:[\\\\\\\\'\\"nrtbf]|u[0-9a-fA-F]{4})","name":"constant.character.escape.soy"}]},"template":{"begin":"{(template|deltemplate)\\\\s([\\\\w\\\\.]+)","beginCaptures":{"1":{"name":"storage.type.soy"},"2":{"name":"entity.name.function.soy"}},"end":"{(/\\\\1)}","endCaptures":{"1":{"name":"storage.type.soy"}},"patterns":[{"begin":"{(@param)(\\\\??)\\\\s+(\\\\S+\\\\s*:)","beginCaptures":{"1":{"name":"keyword.parameter.soy"},"2":{"name":"storage.modifier.keyword.operator.soy"},"3":{"name":"variable.parameter.soy"}},"end":"}","name":"meta.parameter.soy","patterns":[{"include":"#type"}]},{"include":"#variant"},{"include":"#body"},{"include":"#attribute"}]},"type":{"patterns":[{"match":"any|null|\\\\?|string|bool|int|float|number|html|uri|js|css|attributes","name":"support.type.soy"},{"begin":"(list|map)(<)","beginCaptures":{"1":{"name":"support.type.soy"},"2":{"name":"support.type.punctuation.soy"}},"end":"(>)","endCaptures":{"1":{"name":"support.type.modifier.soy"}},"patterns":[{"include":"#type"}]}]},"variable-ref":{"match":"\\\\$[\\\\a-zA-Z_][\\\\w\\\\.]*","name":"variable.other.soy"},"variant":{"begin":"(variant)=(\\")","beginCaptures":{"1":{"name":"storage.other.attribute.soy"},"2":{"name":"string.double.quoted.soy"}},"contentName":"string.double.quoted.soy","end":"(\\")","endCaptures":{"1":{"name":"string.double.quoted.soy"}},"patterns":[{"include":"#expression"}]},"xid":{"begin":"{(xid)\\\\s+","beginCaptures":{"1":{"name":"keyword.other.soy"}},"end":"}","patterns":[{"include":"#expression"}]}},"scopeName":"text.html.soy","embeddedLangs":["html"],"aliases":["closure-templates"]}`)),r=[...e,n];export{r as default};

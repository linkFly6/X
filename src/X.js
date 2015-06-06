/*!
* Copyright 2015 linkFLy - http://www.cnblogs.com/silin6/
* Released under the MIT license
* http://opensource.org/licenses/mit-license.php
* Help document��https://github.com/linkFly6/linkfly.so/tree/master/LinkFLy/Code/X
* Date: 2014-8-24 20:17:18
*/
(function (window, undefined) {
    'use strcit';
    var push = Array.prototype.push,
    splice = Array.prototype.splice,
    slice = Array.prototype.slice,
    toString = Object.prototype.toString,
    each = Array.prototype.forEach,
    filter = Array.prototype.filter,
    map = Array.prototype.map,
    class2type = {},
    XType = function (obj) {
        return obj == null ? toString(obj) : class2type[toString.call(obj)] || "object";
    },
    isFunction = function (fn) {
        return XType(fn) === 'function';
    },
    isArrayLike = function (obj) {
        if (obj == null) return false;
        var length = obj.length, type = XType(obj);
        if (obj == obj.window)
            return true;
        if (obj.nodeType === 1 && length)
            return true;
        // invalid 'in' operand obj��in ���������ַ�����Ч
        return type === 'array' || type !== 'function' && type !== 'string' && (length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj);
    },
    matchRouting = function (name) {
        var res = [];
        if (name) {
            var matchResult = name.match(regRoutingExpression);
            if (matchResult && matchResult[1]) {// //dispolay/item[position()='abc'] [ƥ���ı�,position,=,'abc']
                res[1] = function (elems) {
                    return specialExec[matchResult[1]] && specialExec[matchResult[1]].call(elems, elems, matchResult);
                };
            }
            res[0] = name.replace(regRouting, '');
        }
        return res;
    },
    regRouting = /\[([^\]]*)\]/g,//ƥ��xpath������ѡ��//display/test[position()=1]
    regRoutingExpression = /\[(.+)(?:\(\))([=<>])([^\]]+)]/,//ƥ�䲢�ֽ�����ѡ����ʽ
    specialFind = function (context, xpath) {
        var selectors = xpath.replace('//', function () {
            while (context.parentNode)//��ȡ�ĵ����ڵ�
                context = context.parentNode;
            return '';
        }).split('/'),
           tmp,
           len = selectors.length,
           tagName = selectors[len - 1],//���һ����ǩ��Ϊ���Ӽ�
           specialFn,
           filters,//���(����)��
           results;//���˼�
        //���matchRouting���й��� TODO
        if (tagName) {
            tmp = matchRouting(tagName);
            filters = context.getElementsByTagName(tmp[0]);
            if (tmp[1])
                filters = tmp[1](filters);
            results = filters && slice.call(filters);
        }
        if (!filters) return [];
        selectors.pop();
        //��ʼ����
        while (tagName = selectors.pop()) {
            //�������Ӽ�
            tmp = matchRouting(tagName);
            specialFn = tmp[1];
            tagName = tmp[0];
            if (tagName)
                filters = map.call(filters, function (elem, i) {
                    if (!results[i]) return null;
                    tmp = results[i].parentNode;
                    if (tmp.tagName == tagName) {//���нڵ�
                        results[i] = tmp;//�������Ӧ���µ����¸��ڵ�
                        return elem;
                    } else {
                        return filters[i] = null;//����ɾ���������Ӧ��������
                    }
                });
            if (specialFn)
                filters = specialFn(filters);
        }
        return filter.call(filters, function (elem) {
            return elem != null;
        });
    },
    specialExec = {
        'position': function (elems, routingExpressionArray) {
            //TODO ��������������˽����
            if (!elems) return [];
            var symbol = routingExpressionArray[2].replace(/'/g, ''),
                max = +routingExpressionArray[3],
                //���symbol������ȷjs�߼��������ᱨ��
                fn = new Function("index", "max", "return index" + (symbol === '=' ? '==' : symbol) + "max");
            return filter.call(elems, function (elem, index) {
                return fn(index, max);
            });
        }
    },
    domParser = new DOMParser(),
    xPathEvaluator = function () {
        try {
            return new XPathEvaluator();
        } catch (e) {
            return false;
        }
    }(),
    isNode = function (node) {
        /// <summary>
        /// &#10; 1.1 - isNode(node)�����һ�������Ƿ���Element��Element
        /// </summary>
        /// <param name="node" type="Object">
        /// Ҫ���Ķ���
        /// </param>
        /// <returns type="boolean" />
        var nodeType = node && node.nodeType;
        return nodeType && nodeType === 1 || nodeType === 9;
    },
    find = function (xPath, context) {
        /// <summary>
        /// X.find(xPath,context) - ���������ģ�context������XMLԪ��
        /// </summary>
        /// <param name="xPath" type="String">
        /// *xPath
        /// </param>
        /// <param name="context" type="Element">
        /// *XML����������
        /// </param>
        /// <returns type="Array" />
        //webkit || IE>8 if you want to support IE<=8 : selectNodes
        //		alert('XPathEvaluator'+window.XPathEvaluator+',DOMParser:'+window.DOMParser+',XPathResult'+XPathResult);
        var nodeList = [], isStr = XType(xPath) === 'string', node;
        if (!isStr) return nodeList;
        if (isArrayLike(context)) {
            each.call(context, function (elem) {
                nodeList = nodeList.concat(find(xPath, elem));
            });
            return nodeList;
        }
        if (!isNode(context)) return nodeList;
        if (xPathEvaluator)//w3c
            try {
                result = xPathEvaluator.evaluate(xPath, context, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
                while (node = result.iterateNext())
                    nodeList.push(node);
            } catch (e) { }
        else {
            //��֧��XPathEvaluator()�����дʷ�����[Ŀǰ��֧��position()]
            nodeList = specialFind(context, xPath);
        }
        //else //else
        //    alert('selectSingleNode()��' + context.selectSingleNode + ',selectNodes()��' + context.selectNodes);
        return nodeList;
    },
    addElem = function (target, item) {
        /// <summary>
        /// &#10; 1.1 - addElem(target, item)��׷��һ��Ԫ�أ�item����Ŀ�꣨target����
        /// </summary>
        /// <param name="target" type="X">
        /// X����
        /// </param>
        /// <param name="item" type="Elements">
        /// ������Element��NodeList��ArrayLike
        /// </param>
        /// <returns type="Array" />
        if (isArrayLike(item))
            each.call(item, function (elem) {
                addElem(target, elem);
            });
        else if (isNode(item))
            push.call(target, item);
    };
    'Boolean Number String Function Array Date RegExp Object'.split(' ').forEach(function (name) {
        class2type['[object ' + name + ']'] = name.toLowerCase();
    });
    var X = function (xml, xPath) {
        /// <summary>
        /// 1: ��������XML��X����,document����xml���������������ĵģ��������Ҫ����
        /// &#10; 1.1 - X(xml)������xml�ַ�������
        /// &#10; 1.2 - X(document[,xPath])������document�������ɣ������Ը���ָ����xPath����
        /// &#10; 1.3 - X(Element[,xPath])������Element�������Ը���ָ����xPath����
        /// &#10; 1.4 - X(NodeList)������NodeList����
        /// </summary>
        /// <param name="xml" type="String">
        /// *xml�ı���document����
        /// </param>
        /// <param name="filter" type="boolean">
        /// ���ˣ�Ĭ��(false)�������ˣ�true�����html��&gt;&lt;��ǩ��Ҳ���Դ���һ��������Ϊ���˺������������ձ��뷵��һ�����õ�Document��xml�ַ�����ǩ
        /// </param>
        /// <returns type="X" />
        if (!(this instanceof X))
            return new X(xml, xPath);
        if (!xml) return;
        var context = [];
        //[object String]
        if (XType(xml) === 'string') {
            try {
                context.push(domParser.parseFromString(xml, 'text/xml'));
            } catch (e) {
                //console.log(e);
            }
        } else if (isNode(xml))//Element or Document
            context.push(xml);
        else if (isArrayLike(xml))//X Object or ArrayLike
            context = xml;
        if (XType(xPath) === 'string')
            addElem(this, find(xPath, context));
        else if (xml instanceof X)
            return xml;
        else
            addElem(this, context);
    };
    X.prototype = {
        version: 'linkFly.X.1.2',
        constructor: X,
        length: 0,
        find: function (xPath, context) {
            /// <summary>
            /// 1: ����xpath���ǩ����
            /// &#10; 1.1 - find(xPath[,context])������xpath����
            /// </summary>
            /// <param name="xPath" type="String">
            /// xpath
            /// </param>
            /// <param name="context" type="Document">
            /// ����������
            /// </param>
            /// <returns type="X" />
            return X(context || this, xPath);
        },
        text: function (value) {
            /// <summary>
            /// 1: ��ȡ������Element�е��ı�
            /// &#10; 1.1 - text()����ȡ
            /// &#10; 1.2 - text(value)������
            /// </summary>
            /// <param name="value" type="String">
            /// ��ȡ�����õ�ֵ
            /// </param>
            /// <returns type="X" />
            if (!arguments.length && value == undefined) {
                var first = this[0];
                return (first && first.firstChild && first.firstChild.nodeValue) || '';
            }
            if (this.length)
                each.call(this, function (item) {
                    item.firstChild.nodeValue = value;
                });
            return this;
        },
        attr: function (attr, value) {
            /// <summary>
            /// 1: ��ȡ������Element������
            /// &#10; 1.1 - attr(attr)����ȡ
            /// &#10; 1.2 - attr(attr,value)������
            /// </summary>
            /// <param name="value" type="String">
            /// ��ȡ�����õ�����
            /// </param>
            /// <returns type="X" />
            if (arguments.length === 2) {
                value = value == undefined ? '' : value;
                if (this.length)
                    each.call(this, function (item) {
                        item.setAttribute(attr, value);
                    });
                return this;
            }
            var first = this[0];
            return first && first.getAttribute && first.getAttribute(attr) || '';
        },
        each: function (fn) {
            /// <summary>
            /// 1: ѭ��X�����е�ÿ�������XML DOM��
            /// &#10; 1.1 - each(fn)����ȡ
            /// </summary>
            /// <param name="fn" type="Function">
            /// ÿ��ѭ��Ҫִ�еĺ������ú���thisָ��ǰѭ����XMLԪ�أ�Element������һ�������Ǹ�Ԫ�ص�X�����װ���ڶ���������������������XML�ĵ���������
            /// </param>
            /// <returns type="X" />
            if (!isFunction(fn)) return;
            for (var i = 0, len = this.length; i < len; i++)
                if (fn.call(this[i], this[i], i) === false) return false;
            return this;
        }
    };
    [
    ['eq', function (args) {
        /// <summary>
        /// 1: ��ȡָ�������е�X����
        /// &#10; 1.1 - eq(index)������xpath����
        /// </summary>
        /// <param name="index" type="Int">
        /// ����
        /// </param>
        /// <returns type="X" />
        return X(this[args[0]]);
    }],
    ['slice', function (args) {
        /// <summary>
        /// 1: ��ȡX������ָ����ʼ����������������X���󣬷��ص���һ��ȫ�µ�X����
        /// &#10; 1.1 - slice(start[,end])������xpath����
        /// </summary>
        /// <param name="index" type="Int">
        /// ��ʼ����
        /// </param>
        /// <param name="end" type="Int">
        /// ����������Ĭ��ȫ����ȡ
        /// </param>
        /// <returns type="X" />
        return X(slice.call(this, args[0] || 0, args[1] || this.length - 1));
    }],
    ['splice', function (args) {
        /// <summary>
        /// 1: �ο�����splice���� - ��/��X���������/ɾ����Ŀ��Ȼ�󷵻ر�ɾ������Ŀ
        /// &#10; 1.1 - splice(index,howmany,item1)����/��X���������/ɾ����Ŀ��Ȼ�󷵻ر�ɾ������Ŀ
        /// </summary>
        /// <param name="index" type="Int">
        /// �涨���/ɾ����λ��
        /// </param>
        /// <param name="howmany" type="Int">
        /// Ҫɾ��������
        /// </param>
        /// <param name="item1" type="Int">
        /// ��X׷�ӵ�����
        /// </param>
        /// <returns type="X" />
        var items = [args[0] || 0, args[1] || 0].concat(slice.call(args, 2));
        return X(splice.apply(this, items));
    }]
    ].forEach(function (array) {
        X.prototype[array[0]] = function () {
            if (!this.length) return null;
            return array[1].call(this, arguments);
        };
    });
    X.isXML = function (doc) {
        /// <summary>
        /// X.isXML(doc) - ���һ��Document�����Ƿ���XML Document
        /// </summary>
        /// <param name="doc" type="Document">
        /// Ҫ����XML Document
        /// </param>
        /// <returns type="Array" />
        return doc && doc.createElement && doc.createElement('P').nodeName !== doc.createElement('p').nodeName;
    };
    X.find = find;
    window.so = { X: X };
})(window);


#X.jsʹ���ĵ�

>��Ϊ������xml�򽻵����ƶ����õ�Zepto��Zeptoû��֧��xml�����Ǿ����Լ���дһ���򵥵Ĳ���xml����⡣��ʱû�п��ǹ�pc�ˣ�����Ϊרע�ƶ��ˣ�����Ҫ���ǹ��ᡣ
X.js��1.2�汾�б���д���滻����ȫ�µĹ���ģ�͡�

__[�鿴������X.js][X.js]__



__[linkFly�Ĳ���][blog]__


[X.js]:https://github.com/linkFly6/X/blob/master/src/X.js
[blog]:http://www.cnblogs.com/silin6/


##API
>  

###X(xml[,xPath])
>�����������X������4�����أ������Թ�����Document��Element��NodeList�ϣ������������£�

>__X(xml)������xml�ַ�������__

>__X(document[,xPath])������document�������ɣ������Ը���ָ����xPath����__

>__X(Element[,xPath])������document�������Ը���ָ����xPath����__

>__X(NodeList)������NodeList����__


����Ĵ�����ʾ����Щ���أ�

```javascript
        X('<?xml version="1.0" encoding="GBK" ?><linkfly></linkfly>');
        X(document,'hello/world');
        X(document.getElementsByTagName('linkFly')[0],'hello');
        X(document.getElementsByTagName('linkFly'));
```     


>  

###X.isXML(doc)
>������document�Ƿ���xml DOM������һ����̬������

```javascript
        X.isXML(document); //false
```

>  

###X.prototype.find(xPath[,context])
>��X�����¸���xPath����ڵ����ƣ����ҽڵ㣬context�����������������ģ������Ƿ���X�����ʵ�����������£�

>__find(xPath[,context])������xpath����__

>__<s>find(tag[,context])�����ڽڵ����Ʋ��ң�����֧�ָ��ӵĽڵ����</s>(����֧��)__


����Ĵ�����ʾ������

```javascript
        X(document).find('/DOCUMENT/linkFly');
        X(document).find('linkFly',document.getElementsByTagName('demo')[0]);
```

###X.prototype.text([value])
>��ѭjQuery�����`set all/get one`��������`��ȡ/����`��ǰ�ڵ��ֵ��

>__text()����ȡ(��һ��)�ڵ��ֵ__

>__text(value)������(����)�ڵ��ֵ__

����Ĵ�����ʾ���������úͻ�ȡ��

```javascript
        X(document).find('linkFly').text('hello').text();//output hello
```


###X.prototype.attr(name,[value])
>��X.prototype.text��˵����ƣ���ͬ������`��ȡ/����`��ǰ�ڵ������ֵ��

>__attr(name)����ȡ(��һ��)�ڵ��Ӧ������ֵ__

>__attr(name,value)������(����)�ڵ��Ӧ������ֵ__

��Ϊ�ź���������֧����������ֵ�Ļ�ȡ�����ã�����Ĵ�����ʾ���������úͻ�ȡ��

```javascript
        X(document).find('linkFly').attr('name','linkFly').attr('name');//output linkFly
```

###X.prototype.eq(index)
>��ȡxObject������ָ��������`X����`��

��jQueryһ������ΪX����Ҳ��һ��������������������ܱ�ʾ�Ŷ���ڵ㣬�������Ҫ��������Ϊ1�Ľڵ㣬��������£�����������Ϊ1��X����ʵ����


        X(document).find('linkFly').eq(1); //return xObject

###X.prototype.slice(start[,end])
>�����и�xObject�����еĽڵ㼯��

����ΪX��һ�������������Ҳ��Ҫ�ṩ������и`Array.prototype.slice`��һ���ܾ���ķ�������ͬ���ṩ�����API��������ο�`Array.prototype.slice`����ͬ������Ӱ��ԭX���󣬶��Ƿ��ر��и����µ�X����


        X(document).find('linkFly').slice(0); //return xObject
        X(document).find('linkFly').slice(1,2); //return xObject
        


###X.prototype.splice(index,howmany,element1,.....,elementX)
>��ɾ��`X����`,�����`Array.prototype.splice`�����Ĳ�����Ӱ�쵱ǰX���󣬲����ر�������ɾ�������X����
�����ر�ɾ����X�����ʵ����
```javascript
        X(document).find('linkFly').splice(1); 
        X(document).find('linkFly').splice(1,2); 
        X(document).find('linkFly').splice(1,2,X(document).find('demo')); 
        X(document).find('linkFly').splice(1,2,X(document).find('demo')[0],X(document).find('demo')[1]); 
```


###one more thing
>X������һЩ�����`����`���ܻ�Ϊ����ĳЩ�ɻ�

>__X.prototype[index]����ȡX����ʵ���У�ָ�������Ľڵ㣨Element������__

>__X.prototype.length����ȡX����ʵ���ĳ���__

###˼��

>2014-10-29 00:34:24
�����˽�`XPathEvaluator.evaluate()`֮���ֵڶ�������__����������ʹ��document��Ҳ����ʹ��element__�����ǲ���������ѯ�����ġ�
>ͬʱ������`XPathEvaluator.evaluate()`��`document.evaluate()`����ȷʹ�÷�������ȥ����ЩAPI��һЩ����ļ��⣬���Ѿ�����
X.js�������ں��Լ�Ԥ�ڵĹ���һ���ˡ�
>  

><s>��Ϊ�������HTML DOMֱ�ӹ�����BOM��window���£���XML���ɵ�Document��δ���ܼ��֣���ΪXML��ѯ�ĵײ�API`XPathEvaluator.evaluate`�ڶ����������ǲ�ѯ�������ģ�Ҳ����XML DOM�����������Ĭ�ϵ�document��HTML DOM��</s>

><s>��Ҳ�ͳ�����һ�����⣺__��ѯ�������Ļ����__��</s>

><s>��API `X.prototype.slice()��X.prototype.each()`�ж�����¶ԭ����XML Element�����X�Ĺ��캯��ֱ�ӽ���һ���޷��ҵ������ĵ�XML Element������ô�����X�����ϵ���find()����`�ײ��ǵ���XPathEvaluator.evaluate()`�ͻᶪʧ�����ģ�Ҳ���������ȷ�ı��ʽ��ѯ���������������˭Ҳ���뿴����</s>

><s>�������¶�����X����Ĺ����������Ҫ��Χ��XML DOMչ����������Ҫ��֤����Ͽ���������`X.prototype.each()`��Ϊÿ��ѭ������µ�X���������XML DOM��������ȥ����Ȼ��Ҳ�ǲ����ѵ�������</s>

><s>X����������Ȼ֧������Ĺ��캯����������������ȷ�Ĳ�ѯ�������</s>
```javascript
    var elem = document.getElementsByTagName('a'),
        linkFly = X(elem);
```

><s>���ԣ���ʹ����ĳЩ��¶��XML Element��API֮������X.prototype.slice()��X.prototype.splice()��X.prototype.each()��������ʹ��X.find(xPath, context)�����ң�����ʹ��X����Ĺ��캯��X(document[,NodeList])���ؽ�X������ҡ�</s>

##������־
>####Oct 29,2014
* �Ƴ����� `X.prototype.document`��`X.prototype.documentElement`���ҵ����������������������ѯ������
* ��дX���󣬵�����X����ṹ��������Ż��ڲ��߼�������������ʣ��ڴ���Ӻ�������������ϵ
* ǿ��`X.find(xPath,context)`��ѯ����


>####Oct 24, 2014
* <s>���ǵ��ƶ�������ƿ���͸��ӻ��������������Ƴ�xmlDocument���������һ��Document�����Ļ���</s>
* <s>ǿ����̬������X.find(xPath,context)</s>
* <s>���������ĶϿ������⣬���쳣����ķ�ʽ���ݣ�</s>
    * <s>��ΪXML�Ĳ����޷�����ָ���ģ��ڵ㣩��Χ�ڲ��ң������ᳫ��X�������Ͻ��в��������Ƽ�ֱ�ӻ�ȡXML Element����</s>
	* <s>`X.prototype.each()`����ί�е�������������һ��������XML Element����ΪX���󣬶�this��Ȼָ��ǰѭ����XML Element</s>


>####Oct 23, 2014
* ����һЩbug
* ����˾�̬������`X.find(xPath,context)` - ��̬����
* <s>�������⣺XML DOM�Ĳ�����HTML DOM�Ļ���������ͬ�����Բ�����Element�����Ļ����Ͽ��Ǹ����⣬�����Ҫ����������⣬����Ҫ��API���Ͽ���</s>
	* <s>���ҷ���X(document[,xPath])��XObject.find(xPath)�����������Ļ���������API����X����ԭ����</s>
	* <s>����Ԫ�ط���xObject.text([value])��xObject.attr(name,[value])�ȷ��������������ģ����Կ��Ե���Ϊ��̬����������API���ֲ���̫��</s>
	* <s>�����ǣ��ṩ��һ�ײ���Ͽ������ĵ�API</s>


>####Oct 12, 2014
* ����˾�̬������X.isXML()�ж�XML DOM��
* �����ʵ��������`X.prototype.each()`ѭ��ÿ��
* ���˵���ĵ�
* �Ż��ڲ��߼���
    * ����Ϊÿһ��Element������һ����Ӧ��X�����ʵ���������ڵ���X.prototype.eq()��ʱ��Ϊ��õ�Element��װX����
    * ����ʹ�������[����]���ʵ�Element


&nbsp;
>####Aug 24, 2014
* ����X.js


##����


__[�鿴������X.js][X.js]__

__[linkFly�Ĳ���][blog]__

##δ���뷨
* ��attr��text��������̬����
* __֧��JSONP__
* __���ؿ����Ƿ�֧��ajax__
* <s>�ڲ��ṹ��Ҫ��д������instenceOf�������Ż��ڴ�����</s>[�����]
* ֧��AMD
* �ڲ������ж����ӵļ��һ��
* ��һ�����IE<=8�İ汾

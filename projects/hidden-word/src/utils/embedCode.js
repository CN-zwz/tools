export function generateEmbedCode(customMessage = 'Hidden Word 已加密此内容') {
    // 压缩后的基本代码
    const code = `(function(){const a=0xfe00,b=0xfe0f,c=0xe0100,d=0xe01ef;function e(n){return n>=0&&n<16?String.fromCodePoint(a+n):n>=16&&n<256?String.fromCodePoint(c+n-16):null}function f(n){return n>=a&&n<=b?n-a:n>=c&&n<=d?n-c+16:null}function g(t,h){const i=new TextEncoder().encode(t);if(!h||h.length===0)h="A";const j=Array.from(h);let k="";if(i.length<=j.length){const l=[];for(let m=0;m<j.length;m++)l.push(m);for(let m=l.length-1;m>0;m--){const n=Math.floor(Math.random()*(m+1));[l[m],l[n]]=[l[n],l[m]]}const o=l.slice(0,i.length);o.sort((a,b)=>a-b);let p=0;for(let m=0;m<j.length;m++){k+=j[m];if(o.includes(m)&&p<i.length){const q=e(i[p]);if(q)k+=q;p++}}}else{let p=0;for(let m=0;m<j.length;m++){k+=j[m];if(p<i.length){const q=e(i[p]);if(q)k+=q;p++}}while(p<i.length){const q=e(i[p]);if(q)k+=q;p++}}return k}`;

    // 压缩后的自动加密网站内容功能
    const autoEncryptFunction = `function r(){const s="${customMessage}";const t=[];function u(v){if(v.nodeType===3){if(v.nodeValue.trim()!=='')t.push(v)}else if(v.nodeType===1){if(v.tagName!=='SCRIPT'&&v.tagName!=='STYLE'){for(let w=0;w<v.childNodes.length;w++)u(v.childNodes[w])}}}u(document.body);t.forEach(v=>{const x=v.nodeValue;if(x.trim().length>0)v.nodeValue=g(s,x)})}document.readyState==='loading'?document.addEventListener('DOMContentLoaded',r):r();`;

    return code + autoEncryptFunction + '})();';
}

export function generateHtmlSnippet(customMessage = 'Hidden Word 已加密此内容') {
    const jsCode = generateEmbedCode(customMessage);
    return `<script>\n${jsCode}\n</script>`;
}
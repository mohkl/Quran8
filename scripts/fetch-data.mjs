// يحمّل نص القرآن (عثماني) + التفسير الميسر داخل data/quran.json ليعمل التطبيق بدون إنترنت
import {mkdirSync,writeFileSync} from 'node:fs';
const g=async e=>(await (await fetch('https://api.alquran.cloud/v1/quran/'+e)).json()).data.surahs;
const [a,b]=await Promise.all([g('quran-uthmani'),g('ar.muyassar')]);
const norm=(n,j,t)=>j==0&&n!=1&&n!=9?t.split(' ').slice(4).join(' '):t;
const Q=a.map((s,i)=>({n:s.number,name:s.name,a:s.ayahs.map((y,j)=>[norm(s.number,j,y.text),b[i].ayahs[j].text])}));
mkdirSync('data',{recursive:true});writeFileSync('data/quran.json',JSON.stringify(Q));
console.log('done',Q.length,'surahs');

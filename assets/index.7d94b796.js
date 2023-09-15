(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))n(c);new MutationObserver(c=>{for(const i of c)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(c){const i={};return c.integrity&&(i.integrity=c.integrity),c.referrerpolicy&&(i.referrerPolicy=c.referrerpolicy),c.crossorigin==="use-credentials"?i.credentials="include":c.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(c){if(c.ep)return;c.ep=!0;const i=t(c);fetch(c.href,i)}})();const C="5dc14e5e3ff341bf990182019232706",w=async e=>(await fetch(e)).json(),k=async e=>{const o="http://api.weatherapi.com/v1/search.json?lang=pt&";try{if(!e)throw new Error("Nenhum parametro de pesquisa informado");const t=await w(`${o}key=${C}&q=${e}`);if(t.length===0)throw new Error("Nenhuma cidade encontrada");return t}catch(t){alert(t.message)}},B=async e=>{const t=await w(`http://api.weatherapi.com/v1/current.json?lang=pt&key=${C}&q=${e}`);return{temp:t.current.temp_c,condition:t.current.condition.text,icon:t.current.condition.icon}},x=async e=>(await w(`http://api.weatherapi.com/v1/forecast.json?lang=pt&key=${C}&q=${e}&days=${7}`)).forecast.forecastday;function a(e,o,t=""){const n=document.createElement(e);return n.classList.add(...o.split(" ")),n.textContent=t,n}function I(e){const{date:o,maxTemp:t,minTemp:n,condition:c,icon:i}=e,r=new Date(o);r.setDate(r.getDate()+1);const d=r.toLocaleDateString("pt-BR",{weekday:"short"}),s=a("div","forecast"),u=a("p","forecast-weekday",d),f=a("span","forecast-temp max","max"),y=a("span","forecast-temp max",`${t}\xBA`),E=a("span","forecast-temp min","min"),p=a("span","forecast-temp min",`${n}\xBA`),l=a("div","forecast-temp-container");l.appendChild(f),l.appendChild(E),l.appendChild(y),l.appendChild(p);const h=a("p","forecast-condition",c),m=a("img","forecast-icon");m.src=i.replace("64x64","128x128");const g=a("div","forecast-middle-container");return g.appendChild(l),g.appendChild(m),s.appendChild(u),s.appendChild(g),s.appendChild(h),s}function L(e){const o=document.getElementById(e);for(;o.firstChild;)o.removeChild(o.firstChild)}function $(e){const o=document.getElementById("forecast-container"),t=document.getElementById("weekdays");L("weekdays"),e.forEach(n=>{const c=I(n);t.appendChild(c)}),o.classList.remove("hidden")}const D=async e=>{const t=(await x(e.target.id)).map(n=>({date:n.date,maxTemp:n.day.maxtemp_c,minTemp:n.day.mintemp_c,condition:n.day.condition.text,icon:n.day.condition.icon}));$(t)};function S(e){const{name:o,country:t,temp:n,condition:c,icon:i,url:r}=e,d=a("li","city"),s=a("div","city-heading"),u=a("h2","city-name",o),f=a("p","city-country",t);s.appendChild(u),s.appendChild(f);const y=a("p","city-temp",`${n}\xBA`),E=a("p","city-condition",c),p=a("div","city-temp-container");p.appendChild(E),p.appendChild(y);const l=a("img","condition-icon");l.src=i.replace("64x64","128x128");const h=a("div","city-info-container");h.appendChild(p),h.appendChild(l);const m=document.createElement("button");return m.innerText="Ver previs\xE3o",m.classList.add("ver-previsao"),m.id=r,m.addEventListener("click",D),d.appendChild(s),d.appendChild(h),d.appendChild(m),d}const A=e=>{const o=document.querySelector("#cities");return e.map(t=>S(t)).reduce((t,n)=>(t.appendChild(n),t),o)};async function T(e){e.preventDefault(),L("cities");const t=document.getElementById("search-input").value;try{const n=await k(t),c=await Promise.all(n.map(async({name:i,country:r,url:d})=>{const s=await B(d);return{name:i,country:r,...s,url:d}}));A(c)}catch(n){console.log(n.message)}}const v=e=>{document.body.className=e},N=e=>{e.target.checked?v("dark"):v("ligth")};document.getElementById("search-form").addEventListener("submit",T);document.getElementById("close-forecast").addEventListener("click",()=>{document.getElementById("forecast-container").classList.add("hidden")});document.getElementById("toggle-dark").addEventListener("change",N);

(this["webpackJsonpreact-cryptotracker"]=this["webpackJsonpreact-cryptotracker"]||[]).push([[0],{111:function(e,a,c){},113:function(e,a,c){},141:function(e,a,c){},142:function(e,a,c){},143:function(e,a,c){},144:function(e,a,c){},145:function(e,a,c){"use strict";c.r(a);var i=c(1),t=c.n(i),s=c(35),r=c.n(s),n=c(3),o=c(10),l=c.n(o),m=(c(62),c(36)),d=c(13),j=c.n(d),h=c(18),u=c(147),p=c(37),b=(c(111),c(0)),x=function(e){var a=e.priceData,c=e.timeData,t=e.name,s=(e.pricePerc24h,e.priceCondition,e.percSwitch),r=Object(i.useRef)();return Object(i.useEffect)((function(){if(r&&r.current){var e=document.getElementById("myChart").getContext("2d"),i=e.createLinearGradient(0,0,0,300);i.addColorStop(0,"rgba(129, 201, 149, 0.35)"),i.addColorStop(1,"rgba(100, 100, 0, 0)");var n=e.createLinearGradient(0,0,0,300);n.addColorStop(0,"rgba(242, 139, 130, 0.35)"),n.addColorStop(1,"rgba(100, 100, 0, 0)");var o=new p.Chart(e,{type:"line",data:{labels:c,datasets:[{label:"".concat(t," price"),lineTension:0,fill:!0,data:a,parsing:{yAxisKey:"y",xAxisKey:"t"},backgroundColor:s<0?n:i,borderColor:s<0?"rgb(242, 139, 130)":"rgb(129, 201, 149)",borderWidth:1,pointRadius:0}]},options:{lineHeightAnnotation:{always:!0,hover:!1,lineWeight:1.5},animation:{duration:2e3},maintainAspectRatio:!1,responsive:!0,legend:{display:!1},tooltips:{mode:"index",intersect:!1,displayColors:!1,backgroundColor:"rgb(39, 40, 43)",borderWidth:1,borderColor:"rgb(154, 160, 166)",callbacks:{title:function(e,a){return e[0].xLabel},label:function(e,a){var c=e.yLabel,i="Price: $"+(c<10&&c>=.01||c>-10&&c<=-.01?c.toLocaleString(void 0,{minimumFractionDigits:4,maximumFractionDigits:4}):c<.01&&c>=.001||c>-.01&&c<=-.001?c.toLocaleString(void 0,{minimumFractionDigits:6,maximumFractionDigits:6}):c<.001&&c>=1e-4||c>-.001&&c<=-1e-4?c.toLocaleString(void 0,{minimumFractionDigits:7,maximumFractionDigits:7}):c<1e-4&&c>-1e-4?c.toLocaleString(void 0,{minimumFractionDigits:8,maximumFractionDigits:8}):c.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}));return i}}},scales:{xAxes:[{distribution:"linear",gridLines:{display:!1},ticks:{maxTicksLimit:5,maxRotation:0,minRotation:0,beginAtZero:!1}}],yAxes:[{gridLines:{color:"rgba(53, 56, 59, 0.8)",drawBorder:!1}}]},customLine:{color:"rgb(154, 160, 166)"}},plugins:[{beforeEvent:function(e,a){"mousemove"===a.type&&a.x>=a.chart.chartArea.left&&a.x<=a.chart.chartArea.right&&(e.options.customLine.x=a.x)},afterDraw:function(e,a){var c=e.chart.ctx,i=e.chartArea,t=e.options.customLine.x;isNaN(t)||(c.save(),c.beginPath(),c.setLineDash([3,3]),c.strokeStyle=e.options.customLine.color,c.moveTo(e.options.customLine.x,i.bottom),c.lineTo(e.options.customLine.x,i.top),c.stroke(),c.restore())}}]});return function(){o.destroy()}}})),Object(b.jsx)("div",{className:"chart-style",children:Object(b.jsx)("canvas",{ref:r,id:"myChart"})})},O=(c(113),c(5));var v,g=c(38),N=function(e){var a=Object(i.useState)([]),c=Object(n.a)(a,2),t=c[0],s=c[1],r=Object(i.useState)([]),o=Object(n.a)(r,2),d=o[0],p=o[1],N=Object(i.useState)(1),_=Object(n.a)(N,2),k=_[0],f=_[1],w=Object(i.useState)([]),D=Object(n.a)(w,2),y=D[0],F=D[1],S=Object(i.useState)(""),L=Object(n.a)(S,2),C=L[0],P=L[1],A=Object(i.useState)(""),E=Object(n.a)(A,2),T=E[0],$=E[1],I=Object(i.useState)(!0),M=Object(n.a)(I,2),R=M[0],B=M[1],W=Object(i.useState)(!1),U=Object(n.a)(W,2),V=U[0],G=U[1],H=Object(i.useState)("day"),J=Object(n.a)(H,2),K=J[0],q=J[1];Object(i.useLayoutEffect)((function(){var e=window.getComputedStyle(document.body).overflow;return document.body.style.overflow="hidden",function(){return document.body.style.overflow=e}}),[]);Object(i.useEffect)(Object(h.a)(j.a.mark((function a(){return j.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return G(!0),a.next=3,l.a.get("https://api.coingecko.com/api/v3/coins/".concat(e.coinId,"/market_chart?vs_currency=usd&days=").concat(k)).then((function(e){s(e.data.prices.map((function(e){return[e[1]]}))),p(e.data.prices.map((function(e){return k>1?[new Date(e[0]).toString().substring(4,10)]:[new Date(e[0]).toString().substring(16,21)]}))),setTimeout((function(){G(!1)}),1500)})).catch((function(e){return console.log(e)}));case 3:case"end":return a.stop()}}),a)}))),[k]);var z=Object(u.a)();Object(i.useEffect)(Object(h.a)(j.a.mark((function a(){return j.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,l.a.get("https://api.coingecko.com/api/v3/coins/".concat(e.coinId)).then((function(e){z&&(F(e.data),P(e.data.market_data.price_change_24h),$(e.data.market_data.price_change_percentage_24h),console.log(e.data)),setTimeout((function(){B(!1)}),1500)}));case 2:case"end":return a.stop()}}),a)}))),[e.coinId]);var Y=function(){return null==C?y.market_data.current_price.usd:C<10&&C>=.01||C>-10&&C<=-.01?C.toLocaleString(void 0,{minimumFractionDigits:4,maximumFractionDigits:4}):C<.01&&C>=.001||C>-.01&&C<=-.001?C.toLocaleString(void 0,{minimumFractionDigits:6,maximumFractionDigits:6}):C<.001&&C>=1e-4||C>-.001&&C<=-1e-4?C.toLocaleString(void 0,{minimumFractionDigits:7,maximumFractionDigits:7}):C<1e-4&&C>-1e-4?C.toLocaleString(void 0,{minimumFractionDigits:8,maximumFractionDigits:8}):C.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})};Object(O.css)(v||(v=Object(m.a)(["\n    padding-top: 10rem;\n  "])));return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("div",{className:"modal-background",children:Object(b.jsx)("div",{className:"modal-wrapper",children:R?Object(b.jsx)("div",{className:"temp-loader",children:Object(b.jsx)(g.PuffLoader,{color:"#8189A7",size:50})}):Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)("div",{className:"modal-name-chart-wrapper",children:[Object(b.jsxs)("div",{className:"modal-header-details",children:[Object(b.jsxs)("div",{className:"modal-img-container",children:[Object(b.jsxs)("div",{className:"modal-image-name-wrapper",children:[Object(b.jsx)("p",{className:"modal-coin-name",children:y.name}),Object(b.jsx)("img",{className:"modal-image",src:y.image.thumb,alt:"crypto-image"})]}),Object(b.jsxs)("span",{className:"modal-coin-symbol",children:[Object(b.jsxs)("span",{className:"modal-rank-mobile-wrapper",children:["Rank:"," ",Object(b.jsxs)("span",{className:"modal-rank-mobile",children:[" ","#",y.market_data.market_cap_rank]})," ","/"," "]}),Object(b.jsxs)("span",{className:"modal-abbr-mobile-wrapper",children:[Object(b.jsx)("span",{children:"Abbr:"})," ",Object(b.jsx)("span",{className:"modal-abbr-mobile",children:y.symbol.toUpperCase()})]})]})]}),Object(b.jsx)("div",{className:"modal-price-container",children:Object(b.jsx)("div",{className:"modal-price-wrapper",children:Object(b.jsxs)("h1",{className:"modal-price",children:["$",y.market_data.market_cap.usd/y.market_data.circulating_supply<1&&y.market_data.market_cap.usd/y.market_data.circulating_supply>=.01?(y.market_data.market_cap.usd/y.market_data.circulating_supply).toLocaleString(void 0,{minimumFractionDigits:4,maximumFractionDigits:4}):y.market_data.market_cap.usd/y.market_data.circulating_supply<.01&&y.market_data.market_cap.usd/y.market_data.circulating_supply>=.001?(y.market_data.market_cap.usd/y.market_data.circulating_supply).toLocaleString(void 0,{minimumFractionDigits:6,maximumFractionDigits:6}):y.market_data.market_cap.usd/y.market_data.circulating_supply<.001&&y.market_data.market_cap.usd/y.market_data.circulating_supply>=1e-4?(y.market_data.market_cap.usd/y.market_data.circulating_supply).toLocaleString(void 0,{minimumFractionDigits:7,maximumFractionDigits:7}):y.market_data.market_cap.usd/y.market_data.circulating_supply<1e-4?(y.market_data.market_cap.usd/y.market_data.circulating_supply).toLocaleString(void 0,{minimumFractionDigits:8,maximumFractionDigits:8}):(y.market_data.market_cap.usd/y.market_data.circulating_supply).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})]})})}),Object(b.jsx)("div",{className:"modal-pricechange-container",children:Object(b.jsx)("div",{className:"modal-pricechange-wrapper",children:Object(b.jsxs)("div",{className:"modal-pricechange",children:[Object(b.jsxs)("p",{className:T>0?"modal-price-change green-modal":"modal-price-change red-modal",children:[T>0?Object(b.jsxs)("span",{className:"price-positive",children:["+",Y()]}):Y()," ","(",null==T||void 0==T?Object(b.jsx)("div",{className:"modal-error-screen",children:Object(b.jsxs)("div",{className:"modal-error-container",children:[Object(b.jsx)("img",{src:"./doge_error.png",alt:"error img"}),Object(b.jsx)("p",{children:"Oh heck! The API is messing up, please close the window and try again."})]})}):T>0?T.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}):T.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}).substr(1,4),"%)"," ",T>0?Object(b.jsx)("i",{class:"fas fa-arrow-up",id:"arrow-up"}):Object(b.jsx)("i",{class:"fas fa-arrow-down",id:"arrow-down"})," ",1==k?"past 24h":7==k?"past week":14==k?"past two weeks":30==k?"past month":200==k?"past 200d":"past year"]}),Object(b.jsxs)("div",{className:T>0?"chartButtons-green":"chartButtons-red",children:[Object(b.jsx)("button",{className:"day"==K?T>0?"active-button-green":"active-button-red":"inactive-button",onClick:function(){var e=y.market_data.price_change_percentage_24h;f(1),q("day"),$(e),P(y.market_data.current_price.usd*e/(e+100))},children:"1D"}),Object(b.jsx)("button",{className:"week"==K?T>0?"active-button-green":"active-button-red":"inactive-button",onClick:function(){var e=y.market_data.price_change_percentage_7d;f(7),q("week"),$(e),P(y.market_data.current_price.usd*e/(e+100))},children:"7D"}),Object(b.jsx)("button",{className:"month"==K?T>0?"active-button-green":"active-button-red":"inactive-button",onClick:function(){var e=y.market_data.price_change_percentage_30d;f(30),q("month"),$(e),P(y.market_data.current_price.usd*e/(e+100))},children:"30D"}),0==y.market_data.price_change_percentage_1y?Object(b.jsx)("button",{className:"200days"==K?T>0?"active-button-green":"active-button-red":"inactive-button",onClick:function(){var e=y.market_data.price_change_percentage_200d;f(200),q("200days"),$(e),P(y.market_data.current_price.usd*e/(e+100))},children:"200D"}):Object(b.jsx)("button",{className:"year"==K?T>0?"active-button-green":"active-button-red":"inactive-button",onClick:function(){var e=y.market_data.price_change_percentage_1y;f(365),q("year"),$(e),P(y.market_data.current_price.usd*e/(e+100))},children:"1Y"})]})]})})})]}),V?Object(b.jsx)("div",{className:"loader-container",children:Object(b.jsx)("div",{className:"shimmer-wrapper",children:Object(b.jsx)("div",{className:"shimmer"})})}):Object(b.jsx)("div",{className:"chart-wrapper",children:Object(b.jsx)(x,{className:"chart",priceData:t.flat(),timeData:d,name:y.name,pricePerc24h:y.market_data.price_change_percentage_24h,priceCondition:Y(),percSwitch:T})})]}),Object(b.jsxs)("div",{className:"modal-coin-info-wrapper",children:[Object(b.jsx)("button",{onClick:function(){e.setModal(!1)},children:Object(b.jsx)("i",{id:"close-btn",class:"fas fa-times"})}),Object(b.jsxs)("div",{className:"modal-coin-info-container",children:[Object(b.jsx)("div",{className:"modal-coin-detail-container",children:Object(b.jsxs)("div",{className:"modal-coin-detail-wrapper",children:[Object(b.jsx)("span",{children:"24h Low / 24h High"}),"$",null==y.market_data.low_24h.usd?"unavailable":y.market_data.low_24h.usd<1&&y.market_data.low_24h.usd>=.01||y.market_data.low_24h.usd>-1&&y.market_data.low_24h.usd<=-.01?y.market_data.low_24h.usd.toLocaleString(void 0,{minimumFractionDigits:4,maximumFractionDigits:4}):y.market_data.low_24h.usd<.01&&y.market_data.low_24h.usd>=.001||y.market_data.low_24h.usd>-.01&&y.market_data.low_24h.usd<=-.001?y.market_data.low_24h.usd.toLocaleString(void 0,{minimumFractionDigits:6,maximumFractionDigits:6}):y.market_data.low_24h.usd<.001&&y.market_data.low_24h.usd>=1e-4||y.market_data.low_24h.usd>-.001&&y.market_data.low_24h.usd<=-1e-4?y.market_data.low_24h.usd.toLocaleString(void 0,{minimumFractionDigits:7,maximumFractionDigits:7}):y.market_data.low_24h.usd<1e-4&&y.market_data.low_24h.usd>-1e-4?y.market_data.low_24h.usd.toLocaleString(void 0,{minimumFractionDigits:8,maximumFractionDigits:8}):y.market_data.low_24h.usd.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})," / $",null==y.market_data.high_24h.usd?"unavailable":y.market_data.high_24h.usd<1&&y.market_data.high_24h.usd>=.01||y.market_data.high_24h.usd>-1&&y.market_data.high_24h.usd<=-.01?y.market_data.high_24h.usd.toLocaleString(void 0,{minimumFractionDigits:4,maximumFractionDigits:4}):y.market_data.high_24h.usd<.01&&y.market_data.high_24h.usd>=.001||y.market_data.high_24h.usd>-.01&&y.market_data.high_24h.usd<=-.001?y.market_data.high_24h.usd.toLocaleString(void 0,{minimumFractionDigits:6,maximumFractionDigits:6}):y.market_data.high_24h.usd<.001&&y.market_data.high_24h.usd>=1e-4||y.market_data.high_24h.usd>-.001&&y.market_data.high_24h.usd<=-1e-4?y.market_data.high_24h.usd.toLocaleString(void 0,{minimumFractionDigits:7,maximumFractionDigits:7}):y.market_data.high_24h.usd<1e-4&&y.market_data.high_24h.usd>-1e-4?y.market_data.high_24h.usd.toLocaleString(void 0,{minimumFractionDigits:8,maximumFractionDigits:8}):y.market_data.high_24h.usd.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})]})}),Object(b.jsx)("div",{className:"modal-coin-detail-container",children:Object(b.jsxs)("div",{className:"modal-coin-detail-wrapper",children:[Object(b.jsx)("span",{children:"Market Cap"}),"$",y.market_data.market_cap.usd.toLocaleString()]})}),Object(b.jsx)("div",{className:"modal-coin-detail-container",children:Object(b.jsxs)("div",{className:"modal-coin-detail-wrapper",children:[Object(b.jsx)("span",{children:"Volume"}),"$",y.market_data.total_volume.usd.toLocaleString()]})}),Object(b.jsx)("div",{className:"modal-coin-detail-container",children:Object(b.jsxs)("div",{className:"modal-coin-detail-wrapper",children:[Object(b.jsx)("span",{children:"Circulating supply"}),y.market_data.circulating_supply.toLocaleString()," ",y.symbol.toUpperCase()]})}),Object(b.jsx)("div",{className:"modal-coin-detail-container",children:Object(b.jsxs)("div",{className:"modal-coin-detail-wrapper",children:[Object(b.jsx)("span",{children:"Market Rank"}),"#",y.market_data.market_cap_rank]})})]})]})]})})})})};function _(e){var a=Object(i.useRef)();return Object(i.useEffect)((function(){var c=function(c){a.current&&!a.current.contains(c.target)&&e()};return document.addEventListener("mousedown",c),function(){document.removeEventListener("mousedown",c)}})),a}var k=function(e){var a,c,t,s=Object(i.useState)(!1),r=Object(n.a)(s,2),o=r[0],l=r[1],m=_((function(){l(!1)})),d=e.marketcap/e.supply<1&&e.marketcap/e.supply>=.01?(e.marketcap/e.supply).toLocaleString(void 0,{minimumFractionDigits:4,maximumFractionDigits:4}):e.marketcap/e.supply<.01&&e.marketcap/e.supply>=.001?(e.marketcap/e.supply).toLocaleString(void 0,{minimumFractionDigits:6,maximumFractionDigits:6}):e.marketcap/e.supply<.001&&e.marketcap/e.supply>=1e-4?(e.marketcap/e.supply).toLocaleString(void 0,{minimumFractionDigits:7,maximumFractionDigits:7}):e.marketcap/e.supply<1e-4?(e.marketcap/e.supply).toLocaleString(void 0,{minimumFractionDigits:8,maximumFractionDigits:8}):(e.marketcap/e.supply).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}),j=e.price*e.pricePerc24h/(e.pricePerc24h+100),h=(c=1,t="unavailable",null==(a=j)?t:a<c&&a>=.01||a>-c&&a<=-.01?a.toLocaleString(void 0,{minimumFractionDigits:4,maximumFractionDigits:4}):a<.01&&a>=.001||a>-.01&&a<=-.001?a.toLocaleString(void 0,{minimumFractionDigits:6,maximumFractionDigits:6}):a<.001&&a>=1e-4||a>-.001&&a<=-1e-4?a.toLocaleString(void 0,{minimumFractionDigits:7,maximumFractionDigits:7}):a<1e-4&&a>-1e-4?a.toLocaleString(void 0,{minimumFractionDigits:8,maximumFractionDigits:8}):a.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}));return Object(b.jsxs)("div",{className:"coin-container",children:[Object(b.jsxs)("div",{className:"coin-row",onClick:function(){l((function(e){return!e}))},children:[Object(b.jsxs)("div",{className:"coin",children:[Object(b.jsx)("p",{className:"coin-rank",children:e.rank}),Object(b.jsx)("img",{src:e.image,alt:"crypto"}),Object(b.jsxs)("div",{className:"name-symbol-wrap",children:[Object(b.jsx)("h1",{children:e.name}),Object(b.jsx)("p",{className:"coin-symbol",children:e.symbol})]})]}),Object(b.jsxs)("div",{className:"coin-data",children:[Object(b.jsxs)("p",{className:"coin-price",children:["$",d]}),Object(b.jsx)("p",{className:"coin-pricechange",children:"-"==h.charAt(0)?Object(b.jsxs)("span",{className:"red",children:["-$",h.substring(1)]}):Object(b.jsxs)("span",{className:"green",children:["+$",h]})}),e.pricePerc24h<0?Object(b.jsx)("p",{className:"coin-percent",children:Object(b.jsxs)("span",{className:"coin-percent-container red-cont",children:[null===e.pricePerc24h?"unavailable":Object(b.jsxs)("span",{className:"red-cont",children:[Object(b.jsx)("i",{class:"fas fa-arrow-down",id:"coin-arrow-down"})," ",e.pricePerc24h.toFixed(2).substring(1)]}),"%"]})}):Object(b.jsx)("p",{className:"coin-percent",children:Object(b.jsxs)("span",{className:"coin-percent-container green-cont",children:[null===e.pricePerc24h?"unavailable":Object(b.jsxs)("span",{className:"green-cont",children:[Object(b.jsx)("i",{class:"fas fa-arrow-up",id:"coin-arrow-up"})," ",e.pricePerc24h.toFixed(2)]}),"%"]})}),Object(b.jsxs)("p",{className:"coin-marketcap",children:["$",e.marketcap.toLocaleString()]}),Object(b.jsxs)("p",{className:"coin-volume",children:["$",e.volume.toLocaleString()]})]})]}),o?Object(b.jsx)("div",{className:"modal--container",children:Object(b.jsx)("div",{className:"modal--wrapper",ref:m,children:Object(b.jsx)(N,{coinId:e.coinId,modal:o,setModal:l})})}):null]})},f=(c(141),c(142),function(){return Object(b.jsxs)("div",{className:"skeleton",children:[Object(b.jsxs)("div",{className:"coin-loader",children:[Object(b.jsx)("div",{className:"role-cont rankload",children:Object(b.jsx)("div",{className:"coin-loader-container rank-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont nameload",children:Object(b.jsx)("div",{className:"coin-loader-container name-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont priceload",children:Object(b.jsx)("div",{className:"coin-loader-container price-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont changeload",children:Object(b.jsx)("div",{className:"coin-loader-container change-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont percload",children:Object(b.jsx)("div",{className:"coin-loader-container perc-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont mcapload",children:Object(b.jsx)("div",{className:"coin-loader-container mcap-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont volload",children:Object(b.jsx)("div",{className:"coin-loader-container vol-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})})]}),Object(b.jsxs)("div",{className:"coin-loader",children:[Object(b.jsx)("div",{className:"role-cont rankload",children:Object(b.jsx)("div",{className:"coin-loader-container rank-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont nameload",children:Object(b.jsx)("div",{className:"coin-loader-container name2-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont priceload",children:Object(b.jsx)("div",{className:"coin-loader-container price2-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont changeload",children:Object(b.jsx)("div",{className:"coin-loader-container change2-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont percload",children:Object(b.jsx)("div",{className:"coin-loader-container perc-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont mcapload",children:Object(b.jsx)("div",{className:"coin-loader-container mcap2-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont volload",children:Object(b.jsx)("div",{className:"coin-loader-container vol2-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})})]}),Object(b.jsxs)("div",{className:"coin-loader",children:[Object(b.jsx)("div",{className:"role-cont rankload",children:Object(b.jsx)("div",{className:"coin-loader-container rank-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont nameload",children:Object(b.jsx)("div",{className:"coin-loader-container name3-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont priceload",children:Object(b.jsx)("div",{className:"coin-loader-container price3-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont changeload",children:Object(b.jsx)("div",{className:"coin-loader-container change3-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont percload",children:Object(b.jsx)("div",{className:"coin-loader-container perc-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont mcapload",children:Object(b.jsx)("div",{className:"coin-loader-container mcap3-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont volload",children:Object(b.jsx)("div",{className:"coin-loader-container vol3-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})})]}),Object(b.jsxs)("div",{className:"coin-loader",children:[Object(b.jsx)("div",{className:"role-cont rankload",children:Object(b.jsx)("div",{className:"coin-loader-container rank-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont nameload",children:Object(b.jsx)("div",{className:"coin-loader-container name4-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont priceload",children:Object(b.jsx)("div",{className:"coin-loader-container price4-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont changeload",children:Object(b.jsx)("div",{className:"coin-loader-container change4-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont percload",children:Object(b.jsx)("div",{className:"coin-loader-container perc-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont mcapload",children:Object(b.jsx)("div",{className:"coin-loader-container mcap4-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})}),Object(b.jsx)("div",{className:"role-cont volload",children:Object(b.jsx)("div",{className:"coin-loader-container vol4-load",children:Object(b.jsx)("div",{className:"coin-shimmer-wrapper",children:Object(b.jsx)("div",{className:"coin-shimmer"})})})})]})]})}),w=(c(143),c(144),function(e){var a=Object(i.useState)(!1),c=Object(n.a)(a,2),t=c[0],s=c[1],r=_((function(){s(!1)}));return Object(b.jsxs)("div",{children:[Object(b.jsxs)("div",{className:"result-wrapper",onClick:function(){s((function(e){return!e}))},children:[Object(b.jsxs)("div",{className:"result-item",children:[Object(b.jsx)("img",{src:e.coin.thumb,alt:"",className:"result-thumb"}),Object(b.jsx)("span",{className:"result-name",children:e.coin.name}),Object(b.jsx)("span",{className:"result-symbol",children:e.coin.symbol})]}),Object(b.jsxs)("div",{className:"result-rank",children:["#",e.coin.market_cap_rank]})]}),t?Object(b.jsx)("div",{className:"modal--container",children:Object(b.jsx)("div",{className:"modal--wrapper",ref:r,children:Object(b.jsx)(N,{coinId:e.coinId,modal:t,setModal:s})})}):null]})}),D=function(){var e=Object(i.useState)(""),a=Object(n.a)(e,2),c=a[0],t=a[1],s=Object(i.useState)(""),r=Object(n.a)(s,2),o=r[0],m=r[1],d=Object(i.useState)([]),j=Object(n.a)(d,2),h=j[0],u=j[1],p=Object(i.useState)(!1),x=Object(n.a)(p,2),O=x[0],v=x[1];Object(i.useEffect)((function(){l.a.get("https://api.coingecko.com/api/v3/search?query=".concat(c)).then((function(e){u(e.data.coins.slice(0,5))}))}),[o]),Object(i.useEffect)((function(){var e=setTimeout((function(){m(c)}),750);return function(){return clearTimeout(e)}}),[c]);var g=function(e){t(e.target.value)};console.log(h);var N=_((function(){v(!1)})),k=function(){v(!1)};return Object(b.jsxs)("div",{className:"search-container",children:[Object(b.jsxs)("div",{className:"search-icon-wrapper",children:[Object(b.jsx)("img",{src:"./doge_logo.png",className:"nav-mobile-logo",alt:"error img"}),Object(b.jsx)("span",{className:"search-icon",children:Object(b.jsx)("i",{class:"fas fa-search",onClick:function(){return v(!0)}})})]}),Object(b.jsxs)("div",{className:"search-wrapper",children:[Object(b.jsx)("input",{type:"text",placeholder:"Search",className:"coin-input",id:"inputName",autocomplete:"off",onChange:g,onClick:function(){return v(!0)}}),O?Object(b.jsxs)("div",{className:"results-box-container",ref:N,children:[Object(b.jsxs)("div",{className:"results-box",children:[Object(b.jsxs)("div",{className:"result-field-wrapper",children:[Object(b.jsxs)("div",{className:"search-cancel-wrapper",children:[Object(b.jsx)("input",{type:"text",placeholder:"Search",className:"coin-input-mobile",id:"inputName",autocomplete:"off",onChange:g,onClick:function(){return v(!0)}}),Object(b.jsx)("button",{className:"search-cancel-btn",onClick:k,children:"Cancel"})]}),Object(b.jsx)("div",{className:"result-field"})]}),Object(b.jsx)("div",{className:"results-test",children:h.map((function(e){return Object(b.jsx)(w,{coinId:e.id,coin:e},e.id)}))})]}),Object(b.jsx)("button",{className:"search-close-btn",onClick:k,children:Object(b.jsx)("i",{id:"close-btn",class:"fas fa-times"})})]}):null]})]})};var y=function(){var e=Object(i.useState)(!1),a=Object(n.a)(e,2),c=a[0],t=a[1],s=Object(i.useState)(!1),r=Object(n.a)(s,2),o=r[0],m=r[1],d=Object(i.useState)([]),j=Object(n.a)(d,2),h=j[0],u=j[1],p=Object(i.useState)([]),x=Object(n.a)(p,2),O=x[0],v=x[1],g=Object(i.useState)([]),N=Object(n.a)(g,2),_=N[0],w=N[1],y=Object(i.useState)([]),F=Object(n.a)(y,2),S=F[0],L=F[1],C=Object(i.useState)([]),P=Object(n.a)(C,2),A=P[0],E=P[1],T=Object(i.useState)(1),$=Object(n.a)(T,2),I=$[0],M=$[1];Object(i.useEffect)((function(){t(!0),l.a.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=".concat(I,"&sparkline=false")).then((function(e){u(e.data),setTimeout((function(){t(!1)}),1e3)})).catch((function(e){return console.log(e)}))}),[I]),Object(i.useEffect)((function(){m(!0),l.a.get("https://api.coingecko.com/api/v3/global").then((function(e){v(e.data.data),w(e.data.data.total_market_cap.usd),L(e.data.data.total_volume.usd),E(e.data.data.market_cap_percentage),setTimeout((function(){m(!1)}),1e3)})).catch((function(e){return console.log(e)}))}),[]);var R=Object.keys(A).map((function(e){return{id:String(e),value:A[e]}})).slice(0,3);return Object(b.jsx)("div",{className:"app",children:Object(b.jsxs)("div",{className:"app-container",children:[Object(b.jsx)("div",{className:"app-navbar",children:Object(b.jsxs)("div",{className:"app-navbar-container",children:[Object(b.jsx)(D,{}),o?Object(b.jsxs)("div",{className:"global-loader",children:[Object(b.jsx)("div",{className:"global-loader-container1",children:Object(b.jsx)("div",{className:"global-shimmer-wrapper",children:Object(b.jsx)("div",{className:"global-shimmer"})})}),Object(b.jsx)("div",{className:"global-loader-container2",children:Object(b.jsx)("div",{className:"global-shimmer-wrapper",children:Object(b.jsx)("div",{className:"global-shimmer"})})})]}):Object(b.jsxs)("div",{className:"global-data-container",children:[Object(b.jsxs)("div",{className:"active-cryptos",children:[Object(b.jsxs)("p",{children:["Cryptos: ",Object(b.jsx)("span",{children:O.active_cryptocurrencies})]}),Object(b.jsxs)("p",{children:["Market Cap:"," ",Object(b.jsxs)("span",{children:["$",_.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:0})]})]}),Object(b.jsxs)("p",{children:["24h Vol:"," ",Object(b.jsxs)("span",{children:["$",S.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:0})]})]})]}),Object(b.jsx)("div",{className:"dominance-container",children:Object(b.jsxs)("div",{className:"dominance-wrapper",children:["Dominance:"," ",R.map((function(e){return Object(b.jsxs)("span",{children:[e.id.toUpperCase(),": ",e.value.toFixed(1),"%"]},e.id)}))]})})]})]})}),Object(b.jsxs)("div",{className:"coin-app",children:[Object(b.jsx)("div",{className:"coin-data-label-cointainer",children:Object(b.jsxs)("div",{className:"coin-data-label-wrapper",children:[Object(b.jsx)("p",{className:"coin-rank-label",children:"#"}),Object(b.jsx)("p",{className:"coin-name-label",children:"Name"}),Object(b.jsxs)("div",{className:"data-label-container",children:[Object(b.jsx)("p",{className:"coin-price-label",children:"Price"}),Object(b.jsx)("p",{className:"coin-pricechange-label",children:"Change (24h)"}),Object(b.jsx)("p",{className:"twoFour-hours-price-change-label",children:"24h %"}),Object(b.jsx)("p",{className:"market-cap-label",children:"Market Cap"}),Object(b.jsx)("p",{className:"volume-label",children:"Volume (24h)"})]})]})}),c?[1,2,3].map((function(e){return Object(b.jsx)(f,{},e)})):Object(b.jsxs)("div",{className:"mapped-coins",children:[h.map((function(e){return Object(b.jsx)(k,{coinId:e.id,rank:e.market_cap_rank,name:e.name,image:e.image,symbol:e.symbol,marketcap:e.market_cap,price:e.current_price,pricePerc24h:e.price_change_percentage_24h,price24h:e.price_change_24h,volume:e.total_volume,supply:e.circulating_supply,high24h:e.high_24h,low24h:e.low_24h},e.id)})),Object(b.jsx)("div",{className:"pageButtonsContainer",children:Object(b.jsxs)("div",{className:"pageButtonsWrapper",children:[Object(b.jsx)("button",{onClick:function(){M(I-1),window.scrollTo({top:0})},children:Object(b.jsx)("i",{class:"fas fa-angle-left"})}),Object(b.jsxs)("p",{className:"pageNumber",children:["Page ",I]}),Object(b.jsx)("button",{onClick:function(){M(I+1),window.scrollTo({top:0})},children:Object(b.jsx)("i",{class:"fas fa-angle-right"})})]})})]})]})]})})};r.a.render(Object(b.jsx)(t.a.StrictMode,{children:Object(b.jsx)(y,{})}),document.getElementById("root"))},62:function(e,a,c){}},[[145,1,2]]]);
//# sourceMappingURL=main.d96e4235.chunk.js.map
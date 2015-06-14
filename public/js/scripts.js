var ScrollContainerType=ScrollContainerType||{};ScrollContainerType.SCROLL="scroll",ScrollContainerType.SLIDER="slider",define("ScrollContainer",["Gesture","messageBus"],function(a,b){var c=function(c,d,e,f,g){function h(){y.interactive=!0,y.mousedown=y.touchstart=j,y.mouseup=y.touchend=k,b.addEventListener("renderer:mouseleave",i)}function i(a){k()}function j(a){v=a,T=!0,x=r.update(e),TweenLite.killTweensOf(this),y.dispatchEvent({type:"down"})}function k(){if(T=!1,y.dispatchEvent({type:"up"}),setTimeout(function(){E||b.emit("ScrollContainer:StopMoving")},100),F==ScrollContainerType.SLIDER){var a=v.getLocalPosition(z),c=x.x-a.x,d=c>0?1:-1;u.x>10||Math.abs(c)>w.width*R&&0>d?this._prev(!0):u.x<-10||Math.abs(c)>w.width*R&&d>0?this._next(!0):this._goto(P,Q,!0)}}var l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A=.4,B=.95,C=.7,D=.25,E=!1,F=c,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=.5,R=1.5,S={},T=!1;PIXI.DisplayObjectContainer.call(this),PIXI.EventTarget.call(this),z=d,o=e,w=f||new PIXI.Rectangle,y=this,l=g,m=e?e.width:0,n=e?e.height:0,G=0,q=new PIXI.Graphics,q.beginFill(16711680,0),q.drawRect(0,0,1,1),q.endFill(),y.addChild(q),F==ScrollContainerType.SLIDER&&(this._slides=function(a){N=a},this._next=function(a){O<N.length-2?O++:O=N.length-1,this._goto(O,Q,a)},this._prev=function(a){O>0?O--:O=0,this._goto(O,Q,a)},this._goto=function(a,b,c){(P!==a||c)&&(p=-N[a].x+(w.width>>1),P=O=a,TweenLite.to(this,b||Q,{x:p,onCompleteParams:[P],onComplete:function(a){t&&t(a)}}),s&&s(P))},this._viewPort=function(a){w=a,this._goto(P,.25,!0)}),this._viewRect=function(a){q.scale.x=m=a.width,q.scale.y=n=a.height,F==ScrollContainerType.SLIDER&&this._goto(P,.25,!0)},this._update=function(a){return p=r.update(a),L+=(p.y-this._lastMouseDownPoint.y)*A,M+=(p.x-this._lastMouseDownPoint.x)*A,this._lastMouseDownPoint=p,L*=C,M*=C,F===ScrollContainerType.SLIDER&&(u=MathUtils.getMovement(S,v.getLocalPosition(z))),p},this._back=function(){H=this.position.y,I=this.position.x,J=0,K=0,o&&(H>G||n<=w.height?J=-H*D:H+n<w.height&&(J=(w.height-n-H)*D),I>G||m<=w.width?K=-I*D:I+m<w.width&&(K=(w.width-m-I)*D)),Math.abs(L)<=.2&&(L=0),Math.abs(M)<=.2&&(M=0),L*=B,M*=B,"y"!=l&&(this.position.y+=Math.round(L+J)),"x"!=l&&(this.position.x+=Math.round(M+K)),0===Math.abs(M)&&0===Math.abs(L)||E!==!1||(b.emit("ScrollContainer:StartMoving"),E=!0),Math.abs(M)<=0&&Math.abs(L)<=0&&E===!0&&(b.emit("ScrollContainer:StopMoving"),E=!1)},this._onChange=function(a){s=a},this._onAfterChange=function(a){t=a},this.isDown=function(){return T},this.type=function(){return F},this._currentID=function(){return P},this._transitionTime=function(a){Q=a},this._touchable=function(a){y.interactive=a,r.drag(z,this)},this._margeToSlide=function(a){R=a},this.progress=function(){var a=-(this.position.y/(n-w.height));a=0>=a?0:a>=1?1:a,this.progressCallBack&&this.progressCallBack(a)},r=new a(l),r.drag(z,this),this.position.x=0,this.position.y=0,h()};return c.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),c.prototype.onChange=function(a){this._onChange(a)},c.prototype.onAfterChange=function(a){this._onAfterChange(a)},c.prototype.next=function(){this._next()},c.prototype.prev=function(){this._prev()},c.prototype.goTo=function(a){this._goto(a)},c.prototype.setSlides=function(a){this._slides(a)},c.prototype.viewRect=function(a){this._viewRect(a)},c.prototype.viewPort=function(a){this._viewPort(a)},c.prototype.setTransitionTime=function(a){this._transitionTime(a)},c.prototype.touchable=function(a){this._touchable(a)},c.prototype.setMargeToSlide=function(a){this._margeToSlide(a)},c.prototype.upDate=function(a){return this._update(a)},c.prototype.back=function(){this._back()},c.prototype.scroll=function(a){this.isDown()?this.upDate(a):this.type()==ScrollContainerType.SCROLL&&this.back(),this.progressCallBack&&(_oldY!==this.position.y&&this.progress(),_oldY=this.position.y)},c.prototype.progress=function(){this.progress()},c.prototype.onProgress=function(a){this.progressCallBack=a},c.prototype.dispose=function(){this._dispose()},c}),define("btnSocial",function(){var a=function(a,b,c,d,e){PIXI.DisplayObjectContainer.call(this);var f,g;this.isHide=!1,f=new PIXI.Graphics,f.beginFill(16711680,0),f.drawRect(0,0,d||30,e||30),f.endFill(),f.interactive=!0,f.buttonMode=!0,f.tap=f.click=c,g=new PIXI.Text(a,{font:"60px fontello",fill:b||"#FFFFFF"}),g.x=f.width/2-g.width/2,g.y=f.height/2-g.width/2,g.pivot.x=g.pivot.y=-g.width/2,g.scale.x=g.scale.y=.5,this._btn=f,this._text=g,this.addChild(f),this.addChild(g)};return a.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),a.constructor=a.prototype.constructor,a.prototype.enable=function(a,b){var a,b;a=a||.25,b=b||0,this._btn.interactive=this._btn.buttonMode=!0,TweenLite.to(this,a,{alpha:1,delay:b})},a.prototype.hideElement=function(){this.visible=!1,this.isHide=!0},a.prototype.showElement=function(){this.visible=!0,this.isHide=!1},a.prototype.disable=function(a,b){var a,b;a=a||.25,b=b||0,this._btn.interactive=this._btn.buttonMode=!1,TweenLite.to(this,a,{alpha:.1,delay:b})},a}),define("cacheControl",function(){_cached={};var a=function(){};return a.prototype.checkFromCache=function(a){return a in _cached},a.prototype.getFromCache=function(a){return _cached[a]},a.prototype.cache=function(a,b){_cached[a]=b},a}),define("colorMapping",function(){_mapping={0:16711680,200:65280,400:255,600:16711935,800:65535,999:16776960,1000:16711680,1200:65280,1400:255,1600:16711935,1800:65535,1999:16776960,2000:16711680,2200:65280,2400:255,2600:16711935,2800:65535,2999:16776960,3000:10066329,3200:10066329,3400:10066329,3600:10066329,3800:10066329,3999:10066329};var a=function(){};return a.prototype.getColorByBoxNumber=function(a){var b=5592405;for(var c in _mapping)a>1*c&&(b=_mapping[c]);return b},new a}),define("fontIcons",function(){var a=function(a,b){var c=document.createElement("div");c.style.fontFamily=a,c.innerHTML=b,document.body.appendChild(c),setTimeout(function(){document.body.removeChild(c)},100)},b={};return b.load=function(){a(b.FONT_NAME,b.FACEBOOK)},b.FONT_NAME="fontello",b.FACEBOOK=Tools.hexDecode("e802"),b.FACEBOOK_1=Tools.hexDecode("e809"),b.FACEBOOK_SQUARED=Tools.hexDecode("e800"),b.FACEBOOK_CIRCLED=Tools.hexDecode("e801"),b.TWITTER=Tools.hexDecode("e803"),b.TWITTER_1=Tools.hexDecode("e806"),b.TWITTER_2=Tools.hexDecode("e807"),b.TWITTER_SQUARED=Tools.hexDecode("e804"),b.TWITTER_CIRCLED=Tools.hexDecode("e805"),b.TWITTER_RECT=Tools.hexDecode("e808"),b.HOME=Tools.hexDecode("e80a"),b.MAIL=Tools.hexDecode("e80c"),b.MAIL_ALT=Tools.hexDecode("e80b"),b.MAIL_1=Tools.hexDecode("e80d"),b.MAIL_2=Tools.hexDecode("e80e"),b.RIGHT_OPEN_BIG=Tools.hexDecode("e80f"),b.LEFT_OPEN_BIG=Tools.hexDecode("e810"),b.UP_OPEN_BIG=Tools.hexDecode("e811"),b.DOWN_OPEN_BIG=Tools.hexDecode("e812"),b.RIGHT_OPEN=Tools.hexDecode("e815"),b.LEFT_OPEN=Tools.hexDecode("e814"),b.UP_OPEN=Tools.hexDecode("e816"),b.DOWN_OPEN=Tools.hexDecode("e813"),b.RIGHT=Tools.hexDecode("e819"),b.LEFT=Tools.hexDecode("e818"),b.UP=Tools.hexDecode("e81a"),b.DOWN=Tools.hexDecode("e817"),b.RIGHT_CIRCLE=Tools.hexDecode("e81d"),b.LEFT_CIRCLE=Tools.hexDecode("e81c"),b.UP_CIRCLE=Tools.hexDecode("e81e"),b.DOWN_CIRCLE=Tools.hexDecode("e81b"),b.RIGHT_CIRCLE_1=Tools.hexDecode("e821"),b.LEFT_CIRCLE_1=Tools.hexDecode("e820"),b.UP_CIRCLE_1=Tools.hexDecode("e822"),b.DOWN_CIRCLE_1=Tools.hexDecode("e81f"),b.SEARCH=Tools.hexDecode("e823"),b.SEARCH_1=Tools.hexDecode("e824"),b.SEARCH_2=Tools.hexDecode("e825"),b.SEARCH_3=Tools.hexDecode("e827"),b.SEARCH_4=Tools.hexDecode("e828"),b.SEARCH_OUTLINE=Tools.hexDecode("e826"),b.FOOD=Tools.hexDecode("e829"),b.OK_SQUARED=Tools.hexDecode("e82a"),b.CANCEL_SQUARED=Tools.hexDecode("e82b"),b.load(),b}),define("Gesture",[],function(){function a(a,b){return{x:b.x-a.x>=0?b.x-a.x:b.x-a.x,y:b.y-a.y>=0?b.y-a.y:b.y-a.y}}var b=function(a){var b=this;b._constraintAxe=a,b._isDown=!1,b._target=null,b._domElement=null,b._inc={x:0,y:0},b._pos={x:0,y:0},_move={x:0,y:0},_mouse={x:0,y:0},b.onMove=function(a){_mouse=a.getLocalPosition(this),b._pos=_mouse},b.onDown=function(a){_mouse=a.getLocalPosition(this),b.initPosItem(),b._isDown=!0},b.onUp=function(a){_mouse=a.getLocalPosition(this),b._isDown=!1,this._target&&(b._target.oldx=b._target.position.x,b._target.oldy=b._target.position.y)},b.initPosItem=function(){this._target&&(b._pos=_mouse,b._target.oldPos.x=b._target.position.x,b._target.oldPos.y=b._target.position.y,b._target.startPoint.x=b._pos.x,b._target.startPoint.y=b._pos.y,b._target._lastMouseDownPoint=b._pos)}};return b.prototype.drag=function(a,b,c){a.mousedown=a.touchstart=this.onDown,a.mouseup=a.touchend=this.onUp,a.mousemove=a.touchmove=this.onMove,this._target=b,this._moveCallBack=c,this._target&&(this._target.oldPos={x:this._target.position.x,y:this._target.position.y},this._target.startPoint={x:0,y:0},this.initPosItem(),this._isDown=!0)},b.prototype.update=function(b){if(this._target){if(this._isDown){this._inc.x=this._pos.x,this._inc.y=this._pos.y,_move=a(this._target.startPoint,this._inc);var c=Math.round(_move.x+this._target.oldPos.x);"x"!=this._constraintAxe&&(b?0>=c?this._target.position.y=0:c>=b.width-this._target.width?this._target.position.x=b.width-this._target.width:this._target.position.x=c:this._target.position.x=c,this._moveCallBack&&this._moveCallBack(),this._oldx=this._target.position.x);var d=Math.round(_move.y+this._target.oldPos.y);"y"!=this._constraintAxe&&(b?0>=d?this._target.position.y=0:d>=b.height-this._target.height?this._target.position.y=b.height-this._target.height:this._target.position.y=d:this._target.position.y=d,this._moveCallBack&&this._moveCallBack(),this._oldy=this._target.position.y)}return this._pos}},b}),define("messageBus",function(){var a={};return PIXI.EventTarget.call(a),a}),define("searchBar",["messageBus"],function(){var a=function(){var a=this;this.$field=$("#search-field"),this.$form=$("#form-search"),this.$form.on("submit",function(b){var c=a.$field.val();b.preventDefault(),a._submitCallback&&a._submitCallback(b,c)})};return a.prototype.onSubmit=function(a){this._submitCallback=a},a}),define("components/services",["cacheControl"],function(a){var b=new a,c=function(){this.getFacesByRange=function(a,c){var d="/api/faces_by_range/"+a.toString();b.checkFromCache(d)?c(b.getFromCache(d)):$.getJSON(d).done(function(a){c(a),b.cache(d,a)}).fail(function(a,b,c){var d=b+", "+c;console.log("Request Failed: "+d)})},this.getFaces=function(a,c,d){var e="/api/faces_by_number/"+a;b.checkFromCache(e)?c(b.getFromCache(e),d,a):$.getJSON(e,{id:d}).done(function(f){c(f,d,a),b.cache(e,f)}).fail(function(a,b,c){var d=b+", "+c;console.log("Request Failed: "+d)})},this.searchFaces=function(a,c){var d="/api/faces/search/"+a;b.checkFromCache(d)?c(a,b.getFromCache(d)):$.getJSON(d).done(function(e){c(e,a),b.cache(d,e)}).fail(function(a,b,c){var d=b+", "+c;console.log("Request Failed: "+d)})}};return c}),define("bloc",["blocIthem"],function(a){var b=function(b,c){function d(){for(var d=0,i=0,j=0;h>j;j++){for(var m=0;g>m;m++)f=new a(b,c),f.x=d,f.y=i,e.addChild(f),l[k]=f,k++,d+=b;d=0,i+=c}}PIXI.DisplayObjectContainer.call(this),PIXI.EventTarget.call(this);var e,f,g=10,h=1,i=g*b,j=h*c,k=0,l=[];e=this,e._width=i,e._height=j,d(),this.setValue=function(a){for(var b=0;b<a.length;b++)if(a[b].number>=0){var c=a[b].number,d=main.martixRange[c].picture||"/img/noimage.jpg";l[b]&&(l[b].setSocials("undefined"==typeof main.martixRange[c].claim),l[b].setClaim(main.martixRange[c].claim===!1),l[b].update(c),l[b].updateImage(d))}},this.process=function(){},this.resize=function(a,b){}};return b.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),b.prototype.process=function(){this.process()},b.prototype.resize=function(a,b){this.resize(a,b)},b}),define("blocIthem",["fontIcons","btnSocial","messageBus","colorMapping"],function(a,b,c,d){var e=function(e,f){function g(){v=new PIXI.Graphics,j(0),n=new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture)),n.x=Math.round((e-w)/2),n.y=Math.round((f-x)/2),o=new PIXI.Text("#",{font:"25px Proxima",fill:"#ffffff"}),q=new b(a.FACEBOOK_SQUARED,"#3a5795",i),q.x=e/2-35,q.y=(f+30)/2-15,r=new b(a.TWITTER_SQUARED,"#55acee",h),r.x=e/2+5,r.y=(f+30)/2-15,s=new b(a.OK_SQUARED,"#00EE00",k),s.x=e/2-35,s.y=(f+30)/2-15,t=new b(a.CANCEL_SQUARED,"#EE0000",l),t.x=e/2+5,t.y=(f+30)/2-15,c.addEventListener("ScrollContainer:StartMoving",function(){r.disable(.25,0),q.disable(.25,0),s.disable(.25,0),t.disable(.25,0)}),c.addEventListener("ScrollContainer:StopMoving",function(){var a=Math.random()/3;r.enable(.25,a),q.enable(.25,a),s.enable(.25,a),t.enable(.25,a)}),m.addChild(v),m.addChild(n),m.addChild(o),m.addChild(q),m.addChild(r),m.addChild(s),m.addChild(t)}function h(a){console.log(">>/auth/twitter/register/"+u),parent.location="/auth/twitter/register/"+u}function i(a){console.log(">>/auth/facebook/register/"+u),parent.location="/auth/facebook/register/"+u}function j(a){var b=d.getColorByBoxNumber(a);v.clear(),v.beginFill(b,1),v.drawRect(0,0,e,f),v.endFill()}function k(a){alert("claim")}function l(a){alert("decline")}var m,n,o,p,q,r,s,t,u,v,w=e-4,x=f-4;PIXI.DisplayObjectContainer.call(this),m=this,g(),this.process=function(){},this.resize=function(a,b){},this.hideSocials=function(){q.hideElement(),r.hideElement()},this.showSocials=function(){q.showElement(),r.showElement()},this.hideClaims=function(){s.hideElement(),t.hideElement()},this.showClaims=function(){s.showElement(),t.showElement()},this.setSocials=function(a){this[a?"showSocials":"hideSocials"]()},this.setClaim=function(a){this[a?"showClaims":"hideClaims"]()},this.update=function(a){u=p=a,j(a),o.setText(1*p+1),n.texture.destroy(),n.texture=new PIXI.Texture(new PIXI.BaseTexture)},this.updateImage=function(a){var b=new PIXI.ImageLoader(a);b.onLoaded=function(){var b=PIXI.TextureCache[a];n.texture=b,n.width=w,n.height=x},b.load()}};return e.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),e.prototype.process=function(){this.process()},e.prototype.resize=function(a,b){this.resize(a,b)},e});var main=main||{};define("main",["map","messageBus","components/services","searchBar"],function(a,b,c,d){var e=function(e){function f(){r=new PIXI.Stage(0),s={view:H,transparent:!1,resolution:window.devicePixelRatio||1},t=PIXI.autoDetectRecommendedRenderer(0,0,s),H||document.body.appendChild(t.view),g(),t.view.addEventListener("mouseleave",function(a){b.emit("renderer:mouseleave")})}function g(){h(),Tools.loadFont(["Proxima"],l)}function h(){p=new PIXI.DisplayObjectContainer,r.addChild(p)}function i(){console.log("INIT PAGES"),main.stage=r,main.view=t.view,main.resolution=window.devicePixelRatio||1,main.textResolution=2,main.fonts={Proxima:"Proxima"},main.martixRange=[],u=new a,p.addChild(u)}function j(){console.log("INIT EVENTS"),window.addEventListener("resize",main.onResize),main.onResize(null)}function k(){$(".modal").modal("show")}function l(){var a=$(".loading-container").get(0);TweenLite.to(a,.25,{opacity:0,onComplete:function(){TweenLite.set(a,{display:"none"})}});var c=new d;c.onSubmit(function(a,c){1*c>=0?b.emit("map:gotoFaceNumber",{number:1*c,directly:!1}):J.searchFaces(c,function(a,b){console.log("SEARCH RESULTS",a)})}),console.log("<< start >>"),console.log("DATA:",I),i(),j(),requestAnimFrame(n),I.editedFace&&k(),m(),B&&o()}function m(){}function n(){requestAnimFrame(n),t.render(r),u&&u.process&&u.process(),B&&q.update()}function o(){q=new Stats,q.domElement.style.position="absolute",q.domElement.style.top="0px",q.domElement.style.left="0px",document.body.appendChild(q.domElement)}console.log("<< Kamal::main >>");var p,q,r,s,t,u,v,w,x,y,z,A,B=!0,C=!1,D=1280,E=800,F=2048,G=1536,H=e[0],I=e[1],J=new c;main.onResize=function(){x=window.innerHeight,y=window.innerWidth,C&&"desktop"==Tools.getDevice()&&(y>=D&&(y=D),x>=E&&(x=E),z=window.innerWidth-y>>1,A=window.innerHeight-x>>1),v=y/F,w=x/G,u&&u.resize&&u.resize(y,x,v,w,z,A),t.resize(y,x),t.view.style.width=y+"px",t.view.style.height=x+"px",window.scrollTo(0,0)},f()};return e}),define("map",["ScrollContainer","bloc","components/services","messageBus"],function(a,b,c,d){var e=function(){function e(){var c,e;for(c=0;K>c;c++)for(e=0;L>e;e++){for(var h=[],j=0;M>j;j++)h.push({number:O,picture:"img/"+parseInt(MathUtils.randomMinMax(0,15))+".jpg"}),main.martixRange[O]={number:O,picture:"/img/noimage.jpg"},O++;N[e+","+c]=h}t=new a(ScrollContainerType.SCROLL,main.stage),t.addEventListener("down",f),t.addEventListener("up",g),r.addChild(t);var l=0,o=0,p=[];for(c=0;E>c;c++){for(e=0;D>e;e++)s=new b(x,y),w[F]=s,s.idX=s.initidX=e,s.idY=s.initidY=c,s.lock0=s.lock1=!0,p.push({blocId:F,range:m(e,c)}),s.x=l,s.y=o,t.addChild(s),l+=s._width,l>=G&&(G=l),F++;l=0,o+=w[F-1]._height,o>H&&(H=o)}I=s._width,J=s._height,i(),n(p),d.on("map:gotoFaceNumber",k)}function f(a){i(),clearTimeout(P),P=setTimeout(function(){d.emit("ScrollContainer:StartMoving")},250)}function g(){clearTimeout(P)}function h(){for(var a,b,c=[],d=0;d<w.length;d++)a=t.y+w[d].y,a>v?(w[d].y-=H,w[d].idY>=E?w[d].idY-=E:w[d].idY=K+w[d].initidY-E,c.push({blocId:d,range:m(w[d].idX,w[d].idY)})):-J>a&&t.y+(w[d].y+H)<=v&&(w[d].y+=H,w[d].idY<=K-1-E?w[d].idY+=E:w[d].idY=w[d].initidY,c.push({blocId:d,range:m(w[d].idX,w[d].idY)})),b=t.x+w[d].x,b>u?(w[d].x-=G,w[d].idX>=D?w[d].idX-=D:w[d].idX=L+w[d].initidX-D,c.push({blocId:d,range:m(w[d].idX,w[d].idY)})):-I>b&&t.x+(w[d].x+G)<=u&&(w[d].x+=G,w[d].idX<=L-1-D?w[d].idX+=D:w[d].idX=w[d].initidX,c.push({blocId:d,range:m(w[d].idX,w[d].idY)}));p(),n(c)}function i(){for(var a=0;a<w.length;a++)w[a].oldPos={x:w[a].position.x,y:w[a].position.y}}function j(a,b,c){var d,e,f=Math.round(-window.innerWidth/2)+Math.round(x/2),g=Math.round(-window.innerHeight/2)+Math.round(y/2);a=a*-x-f,b=b*-y-g,c===!0?e=0:(d=MathUtils.distance(t.position,{x:a,y:b}),e=Math.max(z,Math.min(A,d/1e3))),TweenLite.to(t,e,{x:Math.floor(a),y:Math.floor(b),ease:Cubic.easeOut})}function k(a){var b=!1,c=a;"object"==typeof a&&(c=a.data.number,b=a.data.directly);var d,e;c=Math.max(B,Math.min(C,c)),c-=1,d=Math.round(c%1e3),e=Math.floor(c/1e3),j(d,e,l(c)?!1:b)}function l(a){var b=!1;return _.each(w,function(c){var d=m(c.idX,c.idY);_.each(d,function(c){c.number===a&&(b=!0)})}),b}function m(a,b){return N[a+","+b]}function n(a){var b,c,d,e,f,g,h=[];if(a.length){for(b=0,c=a.length;c>b;b++)for(g=a[b].blocId,f=a[b].range,d=0,e=f.length;e>d;d++)h.push(f[d].number);h.length&&Q.getFacesByRange(h,o)}}function o(a){q(a),p()}function p(){_.each(w,function(a){a.setValue(m(a.idX,a.idY))})}function q(a){for(var b=0;b<a.length;b++)a[b].number&&(main.martixRange[a[b].number]=a[b])}var r,s,t,u,v,w=[],x=154,y=154,z=1,A=13,B=1,C=1e6,D=("desktop"==Tools.getDevice(),2),E="desktop"==Tools.getDevice()?6:3,F=0,G=0,H=0,I=0,J=0,K=1e3,L=100,M=10,N=[],O=0,P=null,Q=new c;PIXI.DisplayObjectContainer.call(this),r=this,e(),this.process=function(){t&&(t.scroll(),h())},this.resize=function(a,b){u=a,v=b}};return e.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),e.prototype.process=function(){this.process()},e.prototype.resize=function(a,b){this.resize(a,b)},e});
//# sourceMappingURL=scripts.js.map
var ScrollContainerType=ScrollContainerType||{};ScrollContainerType.SCROLL="scroll",ScrollContainerType.SLIDER="slider",define("ScrollContainer",["Gesture","messageBus"],function(a,b){var c=function(c,d,e,f,g){function h(){y.interactive=!0,y.mousedown=y.touchstart=j,y.mouseup=y.touchend=k,b.addEventListener("renderer:mouseleave",i)}function i(a){k()}function j(a){v=a,T=!0,x=r.update(e),TweenLite.killTweensOf(this),y.dispatchEvent({type:"down"})}function k(){if(T=!1,y.dispatchEvent({type:"up"}),setTimeout(function(){E||b.emit("ScrollContainer:StopMoving")},100),F==ScrollContainerType.SLIDER){var a=v.getLocalPosition(z),c=x.x-a.x,d=c>0?1:-1;u.x>10||Math.abs(c)>w.width*R&&0>d?this._prev(!0):u.x<-10||Math.abs(c)>w.width*R&&d>0?this._next(!0):this._goto(P,Q,!0)}}var l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A=.4,B=.95,C=.7,D=.25,E=!1,F=c,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=.5,R=1.5,S={},T=!1;PIXI.DisplayObjectContainer.call(this),PIXI.EventTarget.call(this),z=d,o=e,w=f||new PIXI.Rectangle,y=this,l=g,m=e?e.width:0,n=e?e.height:0,G=0,q=new PIXI.Graphics,q.beginFill(16711680,0),q.drawRect(0,0,1,1),q.endFill(),y.addChild(q),F==ScrollContainerType.SLIDER&&(this._slides=function(a){N=a},this._next=function(a){O<N.length-2?O++:O=N.length-1,this._goto(O,Q,a)},this._prev=function(a){O>0?O--:O=0,this._goto(O,Q,a)},this._goto=function(a,b,c){(P!==a||c)&&(p=-N[a].x+(w.width>>1),P=O=a,TweenLite.to(this,b||Q,{x:p,onCompleteParams:[P],onComplete:function(a){t&&t(a)}}),s&&s(P))},this._viewPort=function(a){w=a,this._goto(P,.25,!0)}),this._viewRect=function(a){q.scale.x=m=a.width,q.scale.y=n=a.height,F==ScrollContainerType.SLIDER&&this._goto(P,.25,!0)},this._update=function(a){return p=r.update(a),L+=(p.y-this._lastMouseDownPoint.y)*A,M+=(p.x-this._lastMouseDownPoint.x)*A,this._lastMouseDownPoint=p,L*=C,M*=C,F===ScrollContainerType.SLIDER&&(u=MathUtils.getMovement(S,v.getLocalPosition(z))),p},this._back=function(){H=this.position.y,I=this.position.x,J=0,K=0,o&&(H>G||n<=w.height?J=-H*D:H+n<w.height&&(J=(w.height-n-H)*D),I>G||m<=w.width?K=-I*D:I+m<w.width&&(K=(w.width-m-I)*D)),Math.abs(L)<=.2&&(L=0),Math.abs(M)<=.2&&(M=0),L*=B,M*=B,"y"!=l&&(this.position.y+=Math.round(L+J)),"x"!=l&&(this.position.x+=Math.round(M+K)),0===Math.abs(M)&&0===Math.abs(L)||E!==!1||(b.emit("ScrollContainer:StartMoving"),E=!0),Math.abs(M)<=0&&Math.abs(L)<=0&&E===!0&&(b.emit("ScrollContainer:StopMoving"),E=!1)},this._onChange=function(a){s=a},this._onAfterChange=function(a){t=a},this.isDown=function(){return T},this.type=function(){return F},this._currentID=function(){return P},this._transitionTime=function(a){Q=a},this._touchable=function(a){y.interactive=a,r.drag(z,this)},this._margeToSlide=function(a){R=a},this.progress=function(){var a=-(this.position.y/(n-w.height));a=0>=a?0:a>=1?1:a,this.progressCallBack&&this.progressCallBack(a)},r=new a(l),r.drag(z,this),this.position.x=0,this.position.y=0,h()};return c.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),c.prototype.onChange=function(a){this._onChange(a)},c.prototype.onAfterChange=function(a){this._onAfterChange(a)},c.prototype.next=function(){this._next()},c.prototype.prev=function(){this._prev()},c.prototype.goTo=function(a){this._goto(a)},c.prototype.setSlides=function(a){this._slides(a)},c.prototype.viewRect=function(a){this._viewRect(a)},c.prototype.viewPort=function(a){this._viewPort(a)},c.prototype.setTransitionTime=function(a){this._transitionTime(a)},c.prototype.touchable=function(a){this._touchable(a)},c.prototype.setMargeToSlide=function(a){this._margeToSlide(a)},c.prototype.upDate=function(a){return this._update(a)},c.prototype.back=function(){this._back()},c.prototype.scroll=function(a){this.isDown()?this.upDate(a):this.type()==ScrollContainerType.SCROLL&&this.back(),this.progressCallBack&&(_oldY!==this.position.y&&this.progress(),_oldY=this.position.y)},c.prototype.progress=function(){this.progress()},c.prototype.onProgress=function(a){this.progressCallBack=a},c.prototype.dispose=function(){this._dispose()},c}),define("btnSocial",function(){var a=function(a,b,c,d,e){PIXI.DisplayObjectContainer.call(this);var f,g;this.isHide=!1,f=new PIXI.Graphics,f.beginFill(16711680,0),f.drawRect(0,0,d||30,e||30),f.endFill(),f.interactive=!0,f.buttonMode=!0,f.tap=f.click=c,g=new PIXI.Text(a,{font:"60px fontello",fill:b||"#FFFFFF"}),g.x=f.width/2-g.width/2,g.y=f.height/2-g.width/2,g.pivot.x=g.pivot.y=-g.width/2,g.scale.x=g.scale.y=.5,this._btn=f,this._text=g,this.addChild(f),this.addChild(g)};return a.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),a.constructor=a.prototype.constructor,a.prototype.enable=function(a,b){var a,b;a=a||.25,b=b||0,this._btn.interactive=this._btn.buttonMode=!0,TweenLite.to(this,a,{alpha:1,delay:b})},a.prototype.hideElement=function(){this.visible=!1,this.isHide=!0},a.prototype.showElement=function(){this.visible=!0,this.isHide=!1},a.prototype.disable=function(a,b){var a,b;a=a||.25,b=b||0,this._btn.interactive=this._btn.buttonMode=!1,TweenLite.to(this,a,{alpha:.1,delay:b})},a}),define("colorMapping",function(){_mapping={0:16711680,50000:65280,100000:255};var a=function(){};return a.prototype.getColorByBoxNumber=function(a){var b=5592405;for(var c in _mapping)a>1*c&&(b=_mapping[c]);return b},new a}),define("fontIcons",function(){var a=function(a,b){var c=document.createElement("div");c.style.fontFamily=a,c.innerHTML=b,document.body.appendChild(c),setTimeout(function(){document.body.removeChild(c)},100)},b={};return b.load=function(){a(b.FONT_NAME,b.FACEBOOK)},b.FONT_NAME="fontello",b.FACEBOOK=Tools.hexDecode("e802"),b.FACEBOOK_1=Tools.hexDecode("e809"),b.FACEBOOK_SQUARED=Tools.hexDecode("e800"),b.FACEBOOK_CIRCLED=Tools.hexDecode("e801"),b.TWITTER=Tools.hexDecode("e803"),b.TWITTER_1=Tools.hexDecode("e806"),b.TWITTER_2=Tools.hexDecode("e807"),b.TWITTER_SQUARED=Tools.hexDecode("e804"),b.TWITTER_CIRCLED=Tools.hexDecode("e805"),b.TWITTER_RECT=Tools.hexDecode("e808"),b.HOME=Tools.hexDecode("e80a"),b.MAIL=Tools.hexDecode("e80c"),b.MAIL_ALT=Tools.hexDecode("e80b"),b.MAIL_1=Tools.hexDecode("e80d"),b.MAIL_2=Tools.hexDecode("e80e"),b.RIGHT_OPEN_BIG=Tools.hexDecode("e80f"),b.LEFT_OPEN_BIG=Tools.hexDecode("e810"),b.UP_OPEN_BIG=Tools.hexDecode("e811"),b.DOWN_OPEN_BIG=Tools.hexDecode("e812"),b.RIGHT_OPEN=Tools.hexDecode("e815"),b.LEFT_OPEN=Tools.hexDecode("e814"),b.UP_OPEN=Tools.hexDecode("e816"),b.DOWN_OPEN=Tools.hexDecode("e813"),b.RIGHT=Tools.hexDecode("e819"),b.LEFT=Tools.hexDecode("e818"),b.UP=Tools.hexDecode("e81a"),b.DOWN=Tools.hexDecode("e817"),b.RIGHT_CIRCLE=Tools.hexDecode("e81d"),b.LEFT_CIRCLE=Tools.hexDecode("e81c"),b.UP_CIRCLE=Tools.hexDecode("e81e"),b.DOWN_CIRCLE=Tools.hexDecode("e81b"),b.RIGHT_CIRCLE_1=Tools.hexDecode("e821"),b.LEFT_CIRCLE_1=Tools.hexDecode("e820"),b.UP_CIRCLE_1=Tools.hexDecode("e822"),b.DOWN_CIRCLE_1=Tools.hexDecode("e81f"),b.SEARCH=Tools.hexDecode("e823"),b.SEARCH_1=Tools.hexDecode("e824"),b.SEARCH_2=Tools.hexDecode("e825"),b.SEARCH_3=Tools.hexDecode("e827"),b.SEARCH_4=Tools.hexDecode("e828"),b.SEARCH_OUTLINE=Tools.hexDecode("e826"),b.load(),b}),define("Gesture",[],function(){function a(a,b){return{x:b.x-a.x>=0?b.x-a.x:b.x-a.x,y:b.y-a.y>=0?b.y-a.y:b.y-a.y}}var b=function(a){var b=this;b._constraintAxe=a,b._isDown=!1,b._target=null,b._domElement=null,b._inc={x:0,y:0},b._pos={x:0,y:0},_move={x:0,y:0},_mouse={x:0,y:0},b.onMove=function(a){_mouse=a.getLocalPosition(this),b._pos=_mouse},b.onDown=function(a){_mouse=a.getLocalPosition(this),b.initPosItem(),b._isDown=!0},b.onUp=function(a){_mouse=a.getLocalPosition(this),b._isDown=!1,this._target&&(b._target.oldx=b._target.position.x,b._target.oldy=b._target.position.y)},b.initPosItem=function(){this._target&&(b._pos=_mouse,b._target.oldPos.x=b._target.position.x,b._target.oldPos.y=b._target.position.y,b._target.startPoint.x=b._pos.x,b._target.startPoint.y=b._pos.y,b._target._lastMouseDownPoint=b._pos)}};return b.prototype.drag=function(a,b,c){a.mousedown=a.touchstart=this.onDown,a.mouseup=a.touchend=this.onUp,a.mousemove=a.touchmove=this.onMove,this._target=b,this._moveCallBack=c,this._target&&(this._target.oldPos={x:this._target.position.x,y:this._target.position.y},this._target.startPoint={x:0,y:0},this.initPosItem(),this._isDown=!0)},b.prototype.update=function(b){if(this._target){if(this._isDown){this._inc.x=this._pos.x,this._inc.y=this._pos.y,_move=a(this._target.startPoint,this._inc);var c=Math.round(_move.x+this._target.oldPos.x);"x"!=this._constraintAxe&&(b?0>=c?this._target.position.y=0:c>=b.width-this._target.width?this._target.position.x=b.width-this._target.width:this._target.position.x=c:this._target.position.x=c,this._moveCallBack&&this._moveCallBack(),this._oldx=this._target.position.x);var d=Math.round(_move.y+this._target.oldPos.y);"y"!=this._constraintAxe&&(b?0>=d?this._target.position.y=0:d>=b.height-this._target.height?this._target.position.y=b.height-this._target.height:this._target.position.y=d:this._target.position.y=d,this._moveCallBack&&this._moveCallBack(),this._oldy=this._target.position.y)}return this._pos}},b}),define("messageBus",function(){var a={};return PIXI.EventTarget.call(a),a}),define("searchBar",["messageBus"],function(){var a=function(){};return a}),define("components/services",[],function(){var a=function(){this.getFaces=function(a,b,c){$.getJSON("/api/faces_by_number/"+a,{id:c}).done(function(d){b(d,c,a)}).fail(function(a,b,c){var d=b+", "+c;console.log("Request Failed: "+d)})},this.searchFaces=function(a,b){$.getJSON("/api/faces/search/"+a).done(function(c){b(c,a)}).fail(function(a,b,c){var d=b+", "+c;console.log("Request Failed: "+d)})}};return a}),define("bloc",["blocIthem"],function(a){var b=function(){function b(){for(var b=0,i=0,j=0;h>j;j++){for(var m=0;g>m;m++)d=new a(e,f),d.x=b,d.y=i,c.addChild(d),l[k]=d,k++,b+=e;b=0,i+=f}}PIXI.DisplayObjectContainer.call(this),PIXI.EventTarget.call(this);var c,d,e=154,f=154,g=4,h=3,i=g*e,j=h*f,k=0,l=[];c=this,c._width=i,c._height=j,b(),this.setValue=function(a){for(var b=0;b<a.length;b++)if(a[b].number){var c=a[b].number,d=main.martixRange[c].picture;l[b]&&(l[b].setSocials(main.martixRange[c]._id?!1:!0),l[b].setClaim(main.martixRange[c].claim===!1),l[b].update(c),l[b].updateImage(d))}},this.process=function(){},this.resize=function(a,b){}};return b.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),b.prototype.process=function(){this.process()},b.prototype.resize=function(a,b){this.resize(a,b)},b}),define("blocIthem",["fontIcons","btnSocial","messageBus","colorMapping"],function(a,b,c,d){var e=function(e,f){function g(){v=new PIXI.Graphics,j(0),n=new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture)),n.x=Math.round((e-w)/2),n.y=Math.round((f-x)/2),o=new PIXI.Text("#",{font:"25px Proxima",fill:"#ffffff"}),q=new b(a.FACEBOOK_SQUARED,"#3a5795",i),q.x=e/2-35,q.y=(f+30)/2-15,r=new b(a.TWITTER_SQUARED,"#55acee",h),r.x=e/2+5,r.y=(f+30)/2-15,s=new b(a.FACEBOOK_SQUARED,"#00FF00",k),s.x=e/2-35,s.y=(f+30)/2-15,t=new b(a.TWITTER_SQUARED,"#FF0000",l),t.x=e/2+5,t.y=(f+30)/2-15,c.addEventListener("ScrollContainer:StartMoving",function(){r.disable(.25,0),q.disable(.25,0),s.disable(.25,0),t.disable(.25,0)}),c.addEventListener("ScrollContainer:StopMoving",function(){var a=Math.random()/3;r.enable(.25,a),q.enable(.25,a),s.enable(.25,a),t.enable(.25,a)}),m.addChild(v),m.addChild(n),m.addChild(o),m.addChild(q),m.addChild(r),m.addChild(s),m.addChild(t)}function h(a){console.log(">>/auth/twitter/register/"+u),parent.location="/auth/twitter/register/"+u}function i(a){console.log(">>/auth/facebook/register/"+u),parent.location="/auth/facebook/register/"+u}function j(a){var b=d.getColorByBoxNumber(a);console.log(b),v.beginFill(b,1),v.drawRect(0,0,e,f),v.endFill()}function k(a){alert("claim")}function l(a){alert("decline")}var m,n,o,p,q,r,s,t,u,v,w=e-4,x=f-4;PIXI.DisplayObjectContainer.call(this),m=this,g(),this.process=function(){},this.resize=function(a,b){},this.hideSocials=function(){q.hideElement(),r.hideElement()},this.showSocials=function(){q.showElement(),r.showElement()},this.hideClaims=function(){s.hideElement(),t.hideElement()},this.showClaims=function(){s.showElement(),t.showElement()},this.setSocials=function(a){this[a?"showSocials":"hideSocials"]()},this.setClaim=function(a){this[a?"showClaims":"hideClaims"]()},this.update=function(a){u=p=a,j(a),o.setText(p),n.texture.destroy(),n.texture=new PIXI.Texture(new PIXI.BaseTexture)},this.updateImage=function(a){var b=new PIXI.ImageLoader(a);b.onLoaded=function(){var b=PIXI.TextureCache[a];n.texture=b,n.width=w,n.height=x},b.load()}};return e.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),e.prototype.process=function(){this.process()},e.prototype.resize=function(a,b){this.resize(a,b)},e});var main=main||{};define("main",["map","messageBus","components/services"],function(a,b,c){var d=function(d){function e(){q=new PIXI.Stage(0),r={view:G,transparent:!1,resolution:window.devicePixelRatio||1},s=PIXI.autoDetectRecommendedRenderer(0,0,r),G||document.body.appendChild(s.view),f(),s.view.addEventListener("mouseleave",function(a){b.emit("renderer:mouseleave")})}function f(){g(),Tools.loadFont(["Proxima"],k)}function g(){o=new PIXI.DisplayObjectContainer,q.addChild(o)}function h(){console.log("INIT PAGES"),main.stage=q,main.view=s.view,main.resolution=window.devicePixelRatio||1,main.textResolution=2,main.fonts={Proxima:"Proxima"},main.martixRange=[],t=new a,o.addChild(t)}function i(){console.log("INIT EVENTS"),window.addEventListener("resize",main.onResize),main.onResize(null)}function j(){$(".modal").modal("show")}function k(){console.log("<< start >>"),console.log("DATA:",H),h(),i(),requestAnimFrame(m),j(),l(),A&&n()}function l(){$("#form-search").on("submit",function(a){var b=$(this);a.preventDefault(),console.log("SERIALIZE",b.serializeArray()),I.searchFaces($("#search-field").val(),function(a,b){console.log("SEARCH RESULTS",a)})})}function m(){requestAnimFrame(m),s.render(q),t&&t.process&&t.process(),A&&p.update()}function n(){p=new Stats,p.domElement.style.position="absolute",p.domElement.style.top="0px",p.domElement.style.left="0px",document.body.appendChild(p.domElement)}console.log("<< Kamal::main >>");var o,p,q,r,s,t,u,v,w,x,y,z,A=!0,B=!1,C=1280,D=800,E=2048,F=1536,G=d[0],H=d[1],I=new c;main.onResize=function(){w=window.innerHeight,x=window.innerWidth,B&&"desktop"==Tools.getDevice()&&(x>=C&&(x=C),w>=D&&(w=D),y=window.innerWidth-x>>1,z=window.innerHeight-w>>1),u=x/E,v=w/F,t&&t.resize&&t.resize(x,w,u,v,y,z),s.resize(x,w),s.view.style.width=x+"px",s.view.style.height=w+"px",window.scrollTo(0,0)},e()};return d}),define("map",["ScrollContainer","bloc","components/services","messageBus"],function(a,b,c,d){var e=function(){function e(){var c,d;for(c=0;y>c;c++)for(d=0;z>d;d++){for(var e=[],h=0;A>h;h++)e.push({number:C,picture:"img/"+(0===C?"logo.jpg":parseInt(MathUtils.randomMinMax(0,15))+".jpg")}),main.martixRange[C]={number:C,picture:"img/noimage.jpg"},C++;B[d+","+c]=e}n=new a(ScrollContainerType.SCROLL,main.stage),n.addEventListener("down",f),n.addEventListener("up",g),l.addChild(n);var k=0,o=0;for(c=0;s>c;c++){for(d=0;r>d;d++)m=new b,q[t]=m,m.idX=m.initidX=d,m.idY=m.initidY=c,m.lock0=m.lock1=!0,j(t,d,c),m.x=k,m.y=o,n.addChild(m),k+=m._width,k>=u&&(u=k),t++;k=0,o+=q[t-1]._height,o>v&&(v=o)}w=m._width,x=m._height,i()}function f(a){i(),clearTimeout(D),D=setTimeout(function(){d.emit("ScrollContainer:StartMoving")},250)}function g(){clearTimeout(D)}function h(){for(var a,b,c=0;c<q.length;c++)a=n.y+q[c].y,a>p?(q[c].y-=v,q[c].idY>=s?q[c].idY-=s:q[c].idY=y+q[c].initidY-s,j(c,q[c].idX,q[c].idY)):-x>a&&n.y+(q[c].y+v)<=p&&(q[c].y+=v,q[c].idY<=y-1-s?q[c].idY+=s:q[c].idY=q[c].initidY,j(c,q[c].idX,q[c].idY)),b=n.x+q[c].x,b>o?(q[c].x-=u,q[c].idX>=r?q[c].idX-=r:q[c].idX=z+q[c].initidX-r,j(c,q[c].idX,q[c].idY)):-w>b&&n.x+(q[c].x+u)<=o&&(q[c].x+=u,q[c].idX<=z-1-r?q[c].idX+=r:q[c].idX=q[c].initidX,j(c,q[c].idX,q[c].idY))}function i(){for(var a=0;a<q.length;a++)q[a].oldPos={x:q[a].position.x,y:q[a].position.y}}function j(a,b,c){var d=B[b+","+c],e=d[0].number;console.log("NUMBER TO CALL",e),q[a].setValue(B[b+","+c]),E.getFaces(e,k,a)}function k(a,b){console.log("DATA",a);for(var c=0;c<a.length;c++)a[c].number&&(main.martixRange[a[c].number]=a[c]);q[b].setValue(a)}var l,m,n,o,p,q=[],r="desktop"==Tools.getDevice()?3:2,s="desktop"==Tools.getDevice()?3:2,t=0,u=0,v=0,w=0,x=0,y=333,z=250,A=12,B=[],C=0,D=null,E=new c;PIXI.DisplayObjectContainer.call(this),l=this,e(),this.process=function(){n&&(n.scroll(),h())},this.resize=function(a,b){o=a,p=b}};return e.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),e.prototype.process=function(){this.process()},e.prototype.resize=function(a,b){this.resize(a,b)},e});
//# sourceMappingURL=scripts.js.map
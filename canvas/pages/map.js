define('map', ["ScrollContainer", "bloc", "components/services", 'messageBus'], function(ScrollContainer, Bloc, Services, messageBus) {

	var _map = function() {

		var _scope;
		var _blocs = [];
		var _bloc;
		var _scrollObject;
		var _w;
		var _h;
        var ITEM_WIDTH = 154;
        var ITEM_HEIGHT = 154;
        var MIN_SPEED = 1;
        var MAX_SPEED = 13;
        var MIN_FACES = 1;
        var MAX_FACES = 1000000;
		// nb col to display
		// Must be modified with screen size
		var _c = (Tools.getDevice() == "desktop") ? 2 : 2;
		// nb line to display
		// Must be modified with screen size
		var _l = (Tools.getDevice() == "desktop") ? 6 : 3;
		var _id = 0;
		var _maxWidth = 0;
		var _maxHeight = 0;
		var _lastItemX = 0;
		var _lastItemY = 0;
		var _rangeLinge = 1000;
		var _rangeColonne = 100;
		var _rangePage = 10;
		var _ranges = [];
		var _idRangeX = 0;
		var _idRangeY = 0;
		var _ID = 0;
		var ID = 0;
		var _hideTimer = null;
		var _services = new Services();

		PIXI.DisplayObjectContainer.call(this);
		_scope = this;
		build();

		function build() {

			var i;
			var j;

			for (i = 0; i < _rangeLinge; i++) {
				for (j = 0; j < _rangeColonne; j++) {
					var _tmp = [];
					for (var k = 0; k < _rangePage; k++) {
						//_tmp.push({number : _ID, picture : "img/" + ((_ID === 0) ? "logo.jpg" : parseInt(MathUtils.randomMinMax(0, 15)) + ".jpg")});
						_tmp.push({number : _ID, picture : "img/" + parseInt(MathUtils.randomMinMax(0, 15)) + ".jpg"});
						main.martixRange[_ID] = {number : _ID, picture : "/img/noimage.jpg"};
						_ID++;
					}
					// _ranges => "getFaces(x,y) => [12]"
					_ranges[j + "," + i] = _tmp;
				}
			}
			//console.log('_ID', _ID);
			//console.log('_ranges', _ranges['0,0']);
			//console.log('main.martixRange', main.martixRange);

			_scrollObject = new ScrollContainer(ScrollContainerType.SCROLL, main.stage);
			_scrollObject.addEventListener("down", onScrollMouseDown);
			_scrollObject.addEventListener("up", onScrollMouseUp);
			_scope.addChild(_scrollObject);

			var _posx = 0;
			var _posy = 0;
			var rangesPos = [];

			for (i = 0; i < _l; i++) {
				for (j = 0; j < _c; j++) {
					_bloc = new Bloc(ITEM_WIDTH, ITEM_HEIGHT);
					_blocs[_id] = _bloc;
					_bloc.idX = _bloc.initidX = j;
					_bloc.idY = _bloc.initidY = i;
					_bloc.lock0 = _bloc.lock1 = true;

					rangesPos.push({blocId: _id, range: getRange(j,i)});
					//(getFaces(_id, j, i));

					_bloc.x = _posx;
					_bloc.y = _posy;
					_scrollObject.addChild(_bloc);
					_posx += _bloc._width;

					if (_posx >= _maxWidth) {
						_maxWidth = _posx;
					}
					_id++;
				}
				_posx = 0;
				_posy += _blocs[_id - 1]._height;
				if (_posy > _maxHeight) {
					_maxHeight = _posy;
				}
			}

			_lastItemX = _bloc._width;
			_lastItemY = _bloc._height;

			initPosItems();

			getFacesByRanges(rangesPos);
            messageBus.on('map:gotoFaceNumber', gotoFaceNumber);
		}

		function onScrollMouseDown(event) {
			initPosItems();

			clearTimeout(_hideTimer);
			_hideTimer = setTimeout(function(){
				messageBus.emit('ScrollContainer:StartMoving');
			}, 250);
		}

		function onScrollMouseUp() {
			clearTimeout(_hideTimer);
		}

		function replaceItem() {

			var _tempY, _tempX;
			var rangesPos = [];

			// Y
			for (var i = 0; i < _blocs.length; i++) {

				_tempY = _scrollObject.y + _blocs[i].y;
				if (_tempY > _h) {
					_blocs[i].y -= _maxHeight;
					if (_blocs[i].idY >= _l) {
						_blocs[i].idY -= _l;
					} else {
						_blocs[i].idY = _rangeLinge + _blocs[i].initidY - _l;
					}

					rangesPos.push({blocId: i, range: getRange(_blocs[i].idX, _blocs[i].idY)});
					//(getFaces(i, _blocs[i].idX, _blocs[i].idY));

				} else if (_tempY < -_lastItemY) {
					if (_scrollObject.y + (_blocs[i].y + _maxHeight) <= _h) {
						_blocs[i].y += _maxHeight;
						if (_blocs[i].idY <= _rangeLinge - 1 - _l) {
							_blocs[i].idY += _l;
						} else {
							_blocs[i].idY = _blocs[i].initidY;
						}

						rangesPos.push({blocId: i, range: getRange(_blocs[i].idX, _blocs[i].idY)});
						//(getFaces(i, _blocs[i].idX, _blocs[i].idY));

					}
				}

				// X
				_tempX = _scrollObject.x + _blocs[i].x;
				if (_tempX > _w) {
					_blocs[i].x -= _maxWidth;
					if (_blocs[i].idX >= _c) {
						_blocs[i].idX -= _c;
					} else {
						_blocs[i].idX = _rangeColonne + _blocs[i].initidX - _c;
					}

					rangesPos.push({blocId: i, range: getRange(_blocs[i].idX, _blocs[i].idY)});
					//(getFaces(i, _blocs[i].idX, _blocs[i].idY));

				} else if (_tempX < -_lastItemX) {
					if (_scrollObject.x + (_blocs[i].x + _maxWidth) <= _w) {
						_blocs[i].x += _maxWidth;
						if (_blocs[i].idX <= _rangeColonne - 1 - _c) {
							_blocs[i].idX += _c;
						} else {
							_blocs[i].idX = _blocs[i].initidX;
						}

						rangesPos.push({blocId: i, range: getRange(_blocs[i].idX, _blocs[i].idY)});
						//(getFaces(i, _blocs[i].idX, _blocs[i].idY));

					}
				}

			}


            updateGrid();
			getFacesByRanges(rangesPos);
		}

		function initPosItems() {

			for (var i = 0; i < _blocs.length; i++) {
				_blocs[i].oldPos = {x : _blocs[i].position.x, y : _blocs[i].position.y};
			}
		}

        function setGridPosition(x, y, directly){

            // @TODO: determiner le chemin le plus court vers une case

            var distance, speed;

            var windowDecalX = Math.round(-window.innerWidth/2)+Math.round(ITEM_WIDTH/2);
            var windowDecalY = Math.round(-window.innerHeight/2)+Math.round(ITEM_HEIGHT/2);

            x = (x*-ITEM_WIDTH)-windowDecalX;
            y = (y*-ITEM_HEIGHT)-windowDecalY;

            if(directly === true ){
                speed = 0;
            }else{
                distance = MathUtils.distance(_scrollObject.position , {x:x,y:y});

                speed = Math.max(MIN_SPEED, Math.min(MAX_SPEED, distance/(1000/1)));
            }

            TweenLite.to(_scrollObject, speed, {x:Math.floor(x),y:Math.floor(y), ease: Cubic.easeOut});
        }

        function gotoFaceNumber(arg){
            var directly = false;
            var number = arg;

            if(typeof arg === "object"){
                number = arg.data.number;
                directly = arg.data.directly;
            }

            var x, y;

            number = Math.max(MIN_FACES, Math.min(MAX_FACES, number));

            number-=1;

            x = Math.round(number%1000);

            y = Math.floor(number/1000);

            setGridPosition(x,y, numberIsVisible(number) ? false : directly);

        }

        function numberIsVisible(number){
            var isOnGrid = false;

            _.each(_blocs, function(bloc){
                var faces = getRange(bloc.idX, bloc.idY);
                _.each(faces, function(face){
                    if( face.number === number ){
                        isOnGrid = true;
                    }
                });
            });

            return isOnGrid;
        }

		function getRange(x, y){
			return _ranges[x + "," + y];
		}

		function getFacesByRanges(ranges){
			var rangeIndex, rangeLength, faceIndex, faceLength;
			var range = [], faces, id;

            if( !ranges.length){
                return;
            }

			for(rangeIndex = 0, rangeLength = ranges.length; rangeIndex<rangeLength; rangeIndex++){
                id = ranges[rangeIndex].blocId;
                faces = ranges[rangeIndex].range;
                for(faceIndex = 0, faceLength = faces.length; faceIndex<faceLength; faceIndex++){
                    range.push(faces[faceIndex].number);
                }
			}

            if( range.length ){
                _services.getFacesByRange(range, onGetFacesByRange);
            }

		}

        function onGetFacesByRange(data){
            updateMatrix(data);
            updateGrid();
        }

        function updateGrid(){
            _.each(_blocs, function(blocId){
                blocId.setValue(getRange(blocId.idX, blocId.idY));
            });
        }

        function updateMatrix(data){
            for (var i = 0; i < data.length; i++) {
                if (data[i].number) {
                    main.martixRange[data[i].number] = data[i];
                }
            }
        }


		function getFaces(id, x, y) {

            var ranges = _ranges[x + "," + y];
            var number = ranges[0].number;

			_blocs[id].setValue(ranges);
			_services.getFaces(number, onGetFacesByRange, id);
		}

		function onGetFaces(data, id) {
            updateMatrix(data);
            updateGrid();
		}

		this.process = function() {
			if (_scrollObject) {
				_scrollObject.scroll();
				replaceItem();
			}
		};

		this.resize = function(w, h) {

			_w = w;
			_h = h;

		};

	};

	_map.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

	_map.prototype.process = function() {
		this.process();
	};

	_map.prototype.resize = function(w, h) {
		this.resize(w, h);
	};

	return _map;
});

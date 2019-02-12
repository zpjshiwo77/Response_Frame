/**********************
*******2019.2.12*******
*******   page  *******
**********************/

var imath = new importMath();

function importMath() {
	var _self = this;

	/**
	 * 获得范围内随机整数
	 * @param {*} min			最小值
	 * @param {*} max 			最大值
	 */
	_self.randomRange = function(min, max) {
		var randomNumber;
		randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		return randomNumber;
	} //end func 

	/**
	 * 获得随机颜色
	 */
	_self.randomColor = function() {
		var str = "0123456789abcdef";
		var s = "#";
		for(j = 0; j < 6; j++) s += str.charAt(Math.random() * str.length);
		return s;
	} //end func

	/**
	 * 随机打乱一个数组
	 * @param {*} ary 			数组
	 */
	_self.randomSort = function(ary) {
		if(ary && ary.length > 1) ary.sort(function() {
			return 0.5 - Math.random();
		});
	} //end func 

	/**
	 * 随机正负
	 */
	_self.randomPlus = function() {
		return Math.random() < 0.5 ? -1 : 1;
	} //end func 

	/**
	 * 角度转弧度
	 * @param {*} degree 			角度
	 */
	_self.toRadian = function(degree) {
		return degree * Math.PI / 180;
	} //end func 

	/**
	 * 弧度转角度
	 * @param {*} radian 			弧度
	 */
	_self.toDegree = function(radian) {
		return radian / Math.PI * 180;
	} //end func 

	/**
	 * 获得2点之间的距离
	 * @param {*} source 			初始点
	 * @param {*} target 			结束点
	 */
	_self.getDis = function(source, target) {
		var lineX = target[0] - source[0];
		var lineY = target[1] - source[1];
		return Math.sqrt(Math.pow(Math.abs(lineX), 2) + Math.pow(Math.abs(lineY), 2));
	} //end func 

	/**
	 * 获得2点连成的线段与水平线的夹角
	 * @param {*} source 			初始点
	 * @param {*} target 			结束点
	 */
	_self.getDeg = function(source, target) {
		var deg;
		if(source[0] == target[0] && source[1] == target[1]) {
			deg = 0;
		} else {
			var disX = target[0] - source[0];
			var disY = target[1] - source[1];
			deg = Math.atan(disY / disX) * 180 / Math.PI;
			if(disX < 0) {
				deg = 180 + deg;
			} 
			else if(disY < 0) {
				deg = 360 + deg;
			}
		} //end else
		return deg;
	} //end func

	/**
	 * 测试2个jquery对象是否重合
	 * @param {*} source 			原始dom
	 * @param {*} target 			目标dom
	 * @param {*} scaleX 			x缩放
	 * @param {*} scaleY 			y缩放
	 */
	_self.hitTest = function(source, target, scaleX, scaleY) {
		scaleX = scaleX != null ? scaleX : 1;
		scaleY = scaleY != null ? scaleY : 1;
		if(source && target) {
			var pos1 = [source.offset().left + source.outerWidth() * scaleX * 0.5, source.offset().top + source.outerHeight() * scaleY * 0.5];
			var pos2 = [target.offset().left + target.outerWidth() * scaleX * 0.5, target.offset().top + target.outerHeight() * scaleY * 0.5];
			var disX = Math.abs(pos2[0] - pos1[0]);
			var disY = Math.abs(pos2[1] - pos1[1]);
			var disXMin = (source.outerWidth() + target.outerWidth()) * scaleX * 0.5;
			var disYMin = (source.outerHeight() + target.outerHeight()) * scaleY * 0.5;
			if(disX <= disXMin && disY <= disYMin) return true;
			else return false;
		} //end if
		else return false;
	} //end func

	/**
	 * 测试一个点和一个DOM对象是否重合
	 * @param {*} source 			原始点
	 * @param {*} target 			目标dom
	 * @param {*} scaleX 			x缩放
	 * @param {*} scaleY 			y缩放
	 */
	_self.hitPoint = function(source, target, scaleX, scaleY) {
		scaleX = scaleX != null ? scaleX : 1;
		scaleY = scaleY != null ? scaleY : 1;
		if(source && target) {
			var area = [target.offset().left, target.offset().left + target.outerWidth() * scaleX, target.offset().top, target.offset().top + target.outerHeight() * scaleY];
			if(source[0] >= area[0] && source[0] <= area[1] && source[1] >= area[2] && source[1] <= area[3]) return true;
			else return false;
		} //end if
		else return false;
	} //end func

	/**
	 * 深度复制
	 * @param {*} source 			需要复制的对象
	 */
	_self.deepClone = function(source) {
		function getClone(_source) {
			var clone = math.dataType(_source) == "array" ? [] : {};
			for(var i in _source) {
				if(math.dataType(_source[i]) != 'object' && math.dataType(_source[i]) != 'array') clone[i] = _source[i];
				else clone[i] = getClone(_source[i]);
			} //end for
			return clone;
		} //edn func
		return getClone(source);
	} //end func

	/**
	 * 判断是数组还是对象
	 * @param {*} o 				对象
	 */
	_self.dataType = function(o) {
		if(typeof(o) === 'object') return Array == o.constructor ? 'array' : 'object';
		else return null;
	} //end func

	/**
	 * 获得Object的长度
	 * @param {*} obj 				对象
	 */
	_self.objectLength = function(obj) {
		return Object.keys(obj).length;
	} //end func

	/**
	 * 合并2个object，重复索引的值由后者替换前者
	 * @param {*} obj1 				对象1
	 * @param {*} obj2 				对象2
	 */
	_self.extend = function(obj1, obj2) {
		if(obj1 && typeof(obj1) === 'object' && Object.keys(obj1).length > 0) {
			if(obj2 && typeof(obj2) === 'object' && Object.keys(obj2).length > 0) {
				for(var key in obj1) {
					if(obj2.hasOwnProperty(key)) continue; //有相同的属性则略过 
					obj2[key] = obj1[key];
				} //edn for
				return obj2;
			} //edn if
			else return obj1;
		} //end if
		else return obj2;
	} //edn func

	/**
	 * 将数字格式化为 1,000
	 * @param {*} value 				数字
	 */
	_self.formatNumber = function(value) {
		value = value.toString();
		if(value.length <= 3) return value;
		else return this.formatNumber(value.substr(0, value.length - 3)) + ',' + value.substr(value.length - 3);
	} //end func

	/**
	 * 截取小数点后几位，非四舍五入
	 * @param {*} value 				数字
	 * @param {*} pt 					小数点后面的位数
	 */
	_self.float = function(value, pt) {
		pt = pt || 2;
		value = value.toString();
		if(value.indexOf('.') == -1) return value;
		else {
			var str1 = value.split('.');
			var str2 = str1[0] + '.' + str1[1].substr(0, pt);
			return Number(str2);
		} //end else
	} //edn func

	/**
	 * 将颜色值转换成rgb值
	 * @param {*} color 				色值
	 */
	_self.colorToRgb = function(color) {
		if(color.match(/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i)) {
			var value = color.slice(color.indexOf('#') + 1),
				isShortNotation = (value.length === 3),
				r = isShortNotation ? (value.charAt(0) + value.charAt(0)) : value.substring(0, 2),
				g = isShortNotation ? (value.charAt(1) + value.charAt(1)) : value.substring(2, 4),
				b = isShortNotation ? (value.charAt(2) + value.charAt(2)) : value.substring(4, 6);
			return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
		} //end if
		else return [0, 0, 0];
	} //end func
	
	/**
	 * 去除空格
	 */
	_self.trim=function(str,middle){
		middle=middle||false;
        var str=str.replace(/<\/?[^>]*>/gim,"");//去掉所有的html标记
        var result=str.replace(/(^\s+)|(\s+$)/g,"");//去掉前后空格
        if(middle )return  result.replace(/\s/g,"");//去除文章中间空格
        else return result;
	}//edn fun

} //end import

/**
 * 扩展字符串的replaceAll的方法
 */
String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}
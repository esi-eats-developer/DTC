

function checkTargetTime() {
	// 2020년 7월 1일 0시. 2번째 파라미터 6 가 맞음 0부터 시작이여.
	var target = new Date(2020, 6, 1, 0, 0, 0, 0, 0);
	var current = new Date();
	var diff = current.getTime()-target.getTime();
	return diff;
}

/**
 * hex to rgba 
 */
function hexToRGBA(h, opacity) {
	let r = 0, g = 0, b = 0;
	r = "0x" + h[1] + h[2];
	g = "0x" + h[3] + h[4];
	b = "0x" + h[5] + h[6];
	return "rgba("+ +r + "," + +g + "," + +b + ", "+ opacity +")";
}

/**
 * 모바일 여부
 */
function checkMobile() {
	return window.innerWidth < 1024;
}


/**
 * 배송 조회
 */
function deliveryTrackingCJ(num) {
	window.open("http://nexs.cjgls.com/web/info.jsp?slipno="+num, "deliveryTracking", "width=660,height=400");
	return false;
}

/**
 * PG 결제창
 */
function openPopupPg(pgUrl) {
	window.open(pgUrl, 'popupPg', 'top=20, left=300, width=750px, height=950px, resizble=no, scrollbars=yes, toolbar=no, titlebar=no, status=no, menubar=no, location=no'); 
}


/**
 * gnb 
 */
function gnbOnScroll() {
	var coloredLogo = '';
	coloredLogo += '<a href="/" class="only-pc"><img src="/images/logo-colored.png" srcset="/images/logo-colored.png 1x, /images/logo-colored@2x.png 2x, /images/logo-colored@3x.png 3x" alt="pilly 로고"></a>';
	coloredLogo += '<a href="/" class="only-mobile"><img src="/images/logo-colored-mobile.png" srcset="/images/logo-colored-mobile.png 1x, /images/logo-colored-mobile@2x.png 2x, /images/logo-colored-mobile@3x.png 3x" alt="pilly 로고"></a>';
	$("#gnbcolor").addClass("hasColor");
	$("#gnbcolor .site-logo").html(coloredLogo);
}


/**
 * GA event tag
 */
function etag(category, action, label, value) {
	gtag('event', action, {
		  'event_category': category,
		  'event_label': label,
		  'value': value
		});
}


/**
 * login
 */
function goLogin() {
	var rtnUrl = "";
	if( location.pathname.indexOf("/auth")<0 ) {
		rtnUrl = encodeURIComponent(location.pathname + location.search);
	}
	location.href = "/auth/login?rtnUrl="+rtnUrl;
}

function goLogout() {
	localStorage.removeItem("pCode");
	location.href = "/auth/logout";
}


/**
* survey
*/
function goSurvey() {
	var rtnUrl = '';
	var pathname = location.pathname;
	var query = location.search;
	
	if( pathname!=null && pathname.length>1 ) {
		rtnUrl += location.pathname; 
	}
	if( query!=null ) {
		rtnUrl += location.search; 
	}	
	
	if( rtnUrl!=null && rtnUrl!='') {
		rtnUrl = encodeURIComponent(location.pathname + location.search);
		location.href = "/survey?rtnUrl="+rtnUrl; 
	}
	else {
		location.href = "/survey";
	}
}
function closeSurvey(rtnUrl) {
	if( rtnUrl==null || rtnUrl=='' ) {
		rtnUrl = "/";
	} else if( rtnUrl.indexOf("complete")>0 || rtnUrl.indexOf("survey")>0 ) {
		rtnUrl = "/";
	}	
	location.href = rtnUrl;
}


/**
* toast
*/
var toast = {
	options: {
		"positionClass": "toast-bottom-left"
	},
	success: function(msg) {
		toastr.success(msg, '', this.options);
	},
	successAndReload: function(msg) {
		toastr.success(msg, '', this.options);
		setTimeout(function() {
			location.reload();
		}, 1000);
	},
	info: function(msg) {
		toastr.info(msg, '', this.options);
	},
	warning: function(msg) {
		toastr.warning(msg, '', this.options);
	},
	error: function(msg) {
		toastr.error(msg, '', this.options);
	}
};


/**
 * AES
 */
function encrypt(text) {
	return CryptoJS.AES.encrypt(text, "crypto@pilly2").toString();
}


/**
* status
*/
function getPaymentStatus(paymentState, cancelState, deliveryState, expirationTsp) {
	var status = '';
	
	if( cancelState=='PROGRESS' || cancelState=='COMPLETE' ) {
		if( cancelState=='COMPLETE' ) {
			if( paymentState=='EXPIRED' ) {
				status = '<span class="payment-state">입금만료</span>';
			} else {
				status = '<span class="payment-state">결제취소</span>';
			}
		} else {
			status = '<span class="payment-state colored">취소 처리 중</span>';
		}
	} else {
		if( paymentState=='COMPLETE' ) {
			status += '<span class="payment-state done">결제완료';
			if( deliveryState=='COMPLETE' ) {
				status += ' <em class="gray">(배송완료)</em>'
			} else if( deliveryState=='PROGRESS' ) {
				status += ' <em class="colored">(배송중)</em>'
			} else {
				status += ' <em class="colored">(배송대기)</em>'
			}
			status += '</span>';
		}
		else {
			var curr = new Date();
			var exp = new Date(expirationTsp);
			var diff = curr - exp;
			if( diff>0 ) {
				status += '<span class="payment-state done">입금만료</span>';
			} else {
				status += '<span class="payment-state wait">입금대기</span>';
			}
		}
	}
	
	return status;
}


/**
* product
*/
function genProductCard(data, imageVersion) {
	var _summary = '';
	if( data.summary!=null ) {
		data.summary.split("-").forEach(function(item) {
			if( item!='' ) {
				_summary += '<li>'+item+'</li>';
			}
		});
	}
	
	var _tag = '';
	data.tags.forEach(function(item) {
		_tag += '<li><span class="icon icon-'+item.code+'"></span><span class="only-sr">'+item.name+'</span></li>';
	});
	
	var _days = '30일분';
	if( data.onetimeState=='1' ) {
		_days = '1회구매';
	}
	
	var _button = '';
	if( data.soldoutState=='1' ) {
		_button += '						<button class="btn dim btn-big btn-radius" onclick="return false;">';
		_button += '							<span class="hide-added">일시품절</span>';
		_button += '						</button>';
	} else {
		_button += '						<button class="btn btn-big btn-radius btn-shadow btn-put-bucket" data="'+data.code+'" data-title="'+data.title+'">';
		_button += '							<em class="none"><span class="icon icon-plus"></span>장바구니 담기</em>';
		_button += '							<em class="added">장바구니 추가됨</em>';
		_button += '						</button>';
	}
	
	var _listPrice = '';
	if( data.listPrice!=null && data.listPrice>0 ) {
		_listPrice = $.number(data.listPrice)+'원';
	}
	
	var _badge = '';
	if( data.eventState!=null ) {
		_badge = '<img class="badge" src="/images/event/badge/'+data.code+'.png" alt="'+data.title+' 출시이벤트" />';
	}
	
	var html = '';
	html += '	<li> ';
	html += '		<a href="/product/'+data.nick+'" class="link-info" data="'+data.code+'" data-nick="'+data.nick+'"> ';
	html += '			<div style="background-image: url('+data.imageUrl+'?v='+imageVersion+'); background-color: '+data.color+';"> ';
	html += '				<div class="header"> ';
	html += '					<h2><em>'+data.slogan+'</em> '+data.title+'</h2> ';
	html += '					<ul> ';
	html += '						'+_tag;
	html += '					</ul> ';
	html += '				</div> ';
	html += '				<div class="content"> ';
	html += '					<ul> ';
	html += '						'+_summary;
	html += '					</ul> ';
	html += '					<div> ';
	html += '						<span>'+_days+'</span> ';
	html += '						<strike>'+_listPrice+'</strike> ';
	html += '						<p>'+$.number(data.price)+'원</p> ';
	html += '					</div> ';
	html += '				</div> ';
	html += '				<div class="footer"> ';
	html += '					<p><em>더보기</em></p> ';
	html += '					<div class="btn-wrap"> ';
	html += '						'+_button;
	html += '					</div> ';
	html += '				</div> ';
	html += '				'+_badge;
	html += '			</div> ';
	html += '		</a> ';
	html += '	</li> ';
	return html;
}


/**
* cart
*/
function genCartCard(data, type) {
	if( type!=null ) {
		if( type==0 && data.onetimeState!=null ) {
			return false;
		}
		if( type==1 && data.onetimeState==null ) {
			return false;
		}
	}
	
	
	var checked = '';
	var dimClass = '';
	if( data.checkState==1 ) {
		checked = 'checked';
	} else {
		dimClass = 'no-selected';
	}
	
	var _volume = '정기구독';
	if( data.onetimeState!=null ) {
		_volume = '1회구매';
	}
	
	var recommendation = '';
	if( data.surveyId!=null ) {
		recommendation = '<span class="pilly-recommendation"></span>';
	}
	
	var soldout = false;
	if( data.soldoutState=='1' ) {
		soldout = true;
		checked = '';
		dimClass = 'no-selected';
	}
	
	var _listPrice = '';
	if( data.listPrice!=null ) {
		_listPrice = $.number(data.listPrice*data.count)+'원';
	}
	
	
	var html = '';
	html += '<li class="'+dimClass+'" data="'+data.code+'" data-price="'+data.price+'" data-limitation="'+data.limitation+'" data-nick="'+data.nick+'" data-soldout="'+soldout+'" data-onetime="'+data.onetimeState+'" data-type="'+data.type+'">';
	html += '	<div class="table">';
	html += '		<div class="cell">';
	html += '			<label class="label-checkbox dark">';
	html += '				<input type="checkbox" class="input-checkbox chk-dim" data-onetime="'+data.onetimeState+'" '+checked+' '+(soldout?'disabled':'')+' /><span></span>';
	html += '			</label>';
	html += '		</div>';
	html += '		<div class="cell">';
	html += '			<div class="img" style="background-image: url('+data.imageUrl+'); background-color: '+data.color+';">'+recommendation+'</div>';
	html += '		</div>';
	html += '		<div class="cell">';
	html += '			<div class="row1">';

	if( data.nick!=null && data.nick!='' ) {
		html += '				<p><a href="/product/'+data.nick+'">'+data.title+'</a></p>';
	}
	else {
		html += '				<p>'+data.title+'</p>';
	}

	html += '			</div>';
	html += '			<div class="row2 counter">';
	html += '				<button class="btn-minus"><span class="icon icon-cart-minus"></span></button>';
	html += '				<em class="count">'+data.count+'</em>';
	html += '				<button class="btn-plus"><span class="icon icon-cart-plus"></span></button>';
	html += '			</div>';
	html += '		</div>';
	html += '		<div class="cell">';
	html += '			<div class="row1">';
	html += '				<span>'+_listPrice+'</span>';
	html += '			</div>';
	html += '			<div class="row2">';
	html += '				<p class="price">'+$.number(data.price*data.count)+'원</p>';
	html += '			</div>';
	html += '		</div>';
	html += '	</div>';
	if( soldout ) {
		html += '		<div class="notice soldout"><h5>[일시 품절 안내] '+data.title+'</h5><p class="bucket-list-onetime">이용 고객의 증가로 '+data.title+' 제품 공급이 지연되고 있어요. <br/>기존 정기구독자 우선으로 제공 중이며, 재입고 시 가입하신 연락처로 알림을 드릴게요. 조금만 기다려주세요.</p></div>';
	}
	else {
		html += '		<div class="notice warning"><p class="colored">※ 보건복지부의 영양성분 섭취기준을 초과할 수 있으니 주의하세요</p></div>';
	}

	if( data.type=="EVENT" ) {
		html += '		<div class="eventcard" data-code="'+data.code+'">';
		html += '			<div class="header">';
		html += '				<em>포스트카드 메세지</em>';
		html += '				<button type="button" class="btn btn-radius btn-gray btn-tight btn-xsmall btn-eventcard-regist">입력</button>';
		html += '				<button type="button" class="btn btn-radius btn-gray btn-tight btn-xsmall btn-eventcard-modify">수정</button>';
		html += '			</div>';
		html += '			<div class="cardcontent">';
		html += '				<p class="warning">※ 메시지를 입력하지 않을 경우, 내용이 없는 일반 포스트카드가 배송됩니다.</p>';
		html += '				<div class="form">';
		html += '					<button class="btn btn-transparent btn-narrow btn-tight close-eventcard-layer"></button>';
		html += '					<form name="frm_'+data.code+'">';
		html += '						<input type="hidden" name="eventcard_code" value="'+data.code+'" />';
		html += '						<div class="form-data"><label for="eventcard_rname">받는 사람 (10자 이내)</label><input type="text" name="eventcard_rname" class="input-text input-full" maxlength="10" placeholder="받는 분 이름을 입력해주세요." /></div>';
		html += '						<div class="form-data"><label for="eventcard_sname">보내는 사람 (10자 이내)</label><input type="text" name="eventcard_sname" class="input-text input-full " maxlength="10" placeholder="보내는 분 이름을 입력해주세요." /></div>';
		html += '						<div class="form-data"><label for="eventcard_content">메시지 (140자 이내)</label><textarea name="eventcard_content" class="textarea" maxlength="140" placeholder="메세지를 입력해주세요."></textarea></div>';
		html += '						<div class="form-desc">[ <em class="eventcard_length">0</em> / 140자 ]</div>';
		html += '						<button type="button" class="btn btn-radius btn-dark btn-full btn-eventcard-save">메세지 저장</button>';
		html += '					</form>';
		html += '				</div>';
		html += '				<div class="view">';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
	}
	
	
	html += '</li>';
	
	return html;
}

function genEventCartCard(data) {
	var checked = '';
	var dimClass = '';
	if( data.checkState==1 ) {
		checked = 'checked';
	} else {
		dimClass = 'no-selected';
	}
	
	var recommendation = '';
	if( data.surveyId!=null ) {
		recommendation = '<span class="pilly-recommendation"></span>';
	}
	
	var warning = false;
	if( data.count>data.limitation ) {
		warning = true;
	}
	
	var _volume = '정기구독';
	var _chkboxOnetime = '';
	if( data.onetimeState!=null ) {
		_volume = '1회구매';
		_chkboxOnetime = 'data-onetime="1"';
	}
	
	var html = '';
	html += '	<li class="'+dimClass+'" data="'+data.code+'" data-limitation="'+data.limitation+'" data-nick="'+data.nick+'">';
	html += '		<div class="bucket-list-row">';
	html += '			<div class="cell">';
	html += '				<label class="label-checkbox dark">';
	html += '					<input type="checkbox" class="input-checkbox chk-dim" '+checked+' '+_chkboxOnetime+' onclick="return false;" />';
	html += '					<span></span>';
	html += '				</label>';
	html += '			</div>';
	html += '			<div class="cell">';
	html += '				<div class="bucket-product-img" style="background-image: url('+data.imageUrl+'); background-color: '+data.color+';">';
	html += '					'+recommendation;
	html += '				</div>';
	html += '			</div>';
	html += '			<div class="cell info-cell">';
	html += '				<div class="info-cell-top clearfix">';
	html += '					<p><a href="/product/'+data.nick+'">'+data.title+'</a></p>';
	html += '					<span>'+_volume+'</span>';
	html += '				</div>';
	html += '				<div class="info-cell-bottom clearfix">';
	html += '					<div class="item-counter">';
	html += '						<button class="btn-minus"><span class="icon icon-cart-minus"></span></button>';
	html += '						<em class="count '+(warning?'colored':'')+'">'+data.count+'</em>';
	html += '						<button class="btn-plus"><span class="icon icon-cart-plus"></span></button>';
	html += '					</div>';
	html += '					<em></span> '+$.number(data.price*data.count)+'원</em>';
	html += '				</div>';
	html += '			</div>';
	html += '		</div>';
	
	
	html += '	</li>';
	return html;
}


/**
 * 문진결과
 */
function genSurveyCard(data) {
	var products = '';
	$.each(data.products, function(idx, item) {
		if( products=='' ) {
			products = item.title;
		}
	});
	if( products=='' ) {
		products = '추천성분이 없습니다.';
	} else {
		if( data.products.length>=2 ) { 
			products += ' 외 '+(data.products.length-1)+'건'
		}
	}
	
	var html = '';
	html += '<li>';
	html += '	<a href="/survey/'+data.uuid+'" class="has-next-icon">';
	html += '		<span>'+moment(data.completeTsp).format("Y.MM.DD")+'</span>';
	html += '		<strong>'+products+'</strong>';
	html += '	</a>';
	html += '</li>';
	return html;
}


/**
 * 포인트
 */
function genPointCard(data) {
	var type = '';
	if( data.type=='ACC' ) {
		type += '적립';
		if( data.confirmTsp==null ) {
			type += '예정';
		}
	}
	else if( data.type=='USE' ) {
		type += '사용';
	}
	else if( data.type=='ACC_CANCEL' ) {
		type += '적립취소';
	}
	else if( data.type=='USE_CANCEL' ) {
		type += '사용취소';
	}
	
	var _price = '';
	if( data.value>0 ) {
		_price = '<span class="plus">'+$.number(data.value)+' P</span>';
	} else {
		_price = '<span class="minus">'+$.number(data.value)+' P</span>';
	}
	
	var href = '<a href="#" onclick="return false;" role="button" class="clearfix link-info">';
	
	var html = '';
	html += '<li>';
	html += '	'+href;
	html += '		<div class="header">';
	html += '			<div class="date">';
	html += '				<em class="date">'+moment(data.regTsp).format("Y.MM.DD")+'</em>';
	html += '			</div>';
	html += '			<div class="state">';
	html += '				'+type;
	html += '			</div>';
	html += '		</div>';
	html += '		<div class="content">';
	html += '			<div class="title">';
	html += '				<span>'+data.title+'</span>';
	html += '			</div>';
	html += '			<div class="price">';
	html += '				'+_price+'';
	html += '			</div>';
	html += '		</div>';
	html += '	</a>';
	html += '</li>';
	return html;
}


/**
 * 기프티콘
 */
function genGiftCard(data) {
	var href = '<a href="/my/gift/'+data.code+'" role="button" class="clearfix link-info">';
	var _slogan = '';
	if( data.slogan!=null ) {
		_slogan = '<em class="light">'+data.slogan+'</em><br/>';
	}
	
	var html = '';
	html += '<li>';
	html += '	'+href;
	html += '		<div class="img">';
	html += '			<img src="'+data.imgUrl+'" alt="'+data.title+'" width="110" height="110" />';
	html += '		</div>';
	html += '		<div class="content">';
	html += '			<p class="affiliate">';
	html += '				'+data.affiliate+'';
	html += '			</p>';
	html += '			<div class="title">';
	html += '				<span>'+_slogan+data.title+'</span>';
	html += '			</div>';
	html += '			<p class="price">';
	if( data.listPrice!=null && data.listPrice>0 ) {
		var rate = Math.round((data.listPrice-data.pillyPrice)/data.listPrice*100);
		html += '				<em class="rate">'+rate+'%</em> ';
	}

	html += '				'+$.number(data.pillyPrice)+' P';
	html += '			</p>';
	html += '		</div>';
	html += '	</a>';
	html += '</li>';
	return html;
}


/**
 * 보관함
 */
function getCouponStatus(useState, useText) {
	var _useState = '';
	var _useText = '';
	
	if( useState=='CANCEL' ) {
		_useState = 'cancel';
		_useText = '교환<br/>취소';
	}
	else if( useState=='EXPIRED' ) {
		_useState = 'expired';
		_useText = '기간<br/>만료';
	}
	else if( useState=='USE' ) {
		_useState = 'use';
		_useText = '사용<br/>완료';
	}
	
	return [_useState, _useText];	
}
function genCouponCard(data) {
	var useState = getCouponStatus(data.useState, data.useText);
	var _useState = useState[0];
	var _useText = useState[1];
	_useText = '<div class="'+_useState+'">'+_useText+'</div>';
	
	var href = '<a href="/my/coupon/'+data.uuid+'" role="button" class="clearfix link-info">';
	
	var _slogan = '';
	if( data.gift.slogan!=null ) {
		_slogan = '<em class="light">'+data.gift.slogan+'</em><br/>';
	}
	
	var html = '';
	html += '<li>';
	html += '	'+href;
	html += '		<div class="img '+_useState+'">';
	html += '			<img src="'+data.gift.imgUrl+'" alt="'+data.gift.title+'" />';
	html += '			'+_useText;
	html += '		</div>';
	html += '		<div class="content">';
	html += '			<p class="affiliate">';
	html += '				'+data.gift.affiliate+'';
	html += '			</p>';
	html += '			<div class="title">';
	html += '				<span>'+_slogan+data.gift.title+'</span>';
	html += '			</div>';
	html += '			<p class="date">';
	html += '				사용기한: '+moment(data.endTsp).format("Y.MM.DD")+' 까지';
	html += '			</p>';
	html += '		</div>';
	html += '	</a>';
	html += '</li>';
	return html;
}


/**
 * 정기구독
 */
function genPurchaseCard(data, isLink) {
	var rate = 0;
	var discount = '';
	if( data.promotions!=null ) {
		data.promotions.forEach(function(item) {
			discount += '<span>#' + item.title+'</span>';
			if(item.discountRate!=null) {
				rate += item.discountRate*100;
			}
		});
		
		rate = Math.round(rate);
	}
	
	var href = '<a href="/my/subscription/'+data.purchaseCode+'" class="has-next-icon clearfix">';
	if( isLink==false ) { 
		href = '<a href="#" onclick="return false;" role="button" class="clearfix">';
	}
	
	var status = '';
	if( data.unsubscriptionTsp==null ) {
		status = '<em class="type ongoing">진행중</em>';
	} else {
		status = '<em class="type">종료</em>';
	}
	
	var html = '';
	html += '<li>';
	html += '	'+href;
	html += '		<div class="header">';
	html += '			<div class="date">';
	html += '				<em class="date">'+moment(data.regTsp).format("Y.MM.DD")+'</em>';
	html += '				<em class="code">'+data.purchaseCode+'</em>';
	html += '			</div>';
	html += '			<div class="state">';
	html += '				<s>'+$.number(data.productPrice + data.deliveryOrgPrice)+'원</s>';
	html += '			</div>';
	html += '		</div>';
	html += '		<div class="content">';
	html += '			<div class="title">';
	html += '				'+status;
	html += '				<span>'+data.title+'</span>';
	html += '			</div>';
	html += '			<div class="price">';
	html += '				'+$.number(data.totalPrice)+'원';
	html += '			</div>';
	html += '		</div>';
	html += '		<div class="footer">';
	html += '			<div>';
	html += '				<em class="rate"><span>'+rate+'</span>% 할인</em>';
	html += '				<em class="promotion">'+discount+'</em>';
	html += '			</div>';
	html += '		</div>';
	html += '	</a>';
	html += '</li>';
	return html;
}

/**
 * 결제관리
 */
function genPaymentCard(data, isLink) {
	var type = '';
	if( data.subscriptionState==1 ) {
		type += '<span class="colored bold">정기구독</span>';
	}
	else {
		type += '<span class="bold">1회구매</span>';
	}
	
	var status = getPaymentStatus(data.paymentState, data.cancelState, data.deliveryState, data.expirationTsp);
	
	var href = '<a href="/my/payment/'+data.paymentCode+'" class="has-next-icon clearfix">';
	if( isLink==false ) { 
		href = '<a href="#" onclick="return false;" role="button" class="clearfix link-info" data="'+data.paymentCode+'">';
	}
	
	var html = '';
	html += '<li>';
	html += '	'+href;
	html += '		<div class="header">';
	html += '			<div class="date">';
	html += '				<em class="date">'+moment(data.regTsp).format("Y.MM.DD")+'</em>';
	html += '				<em class="code">'+data.paymentCode+'</em>';
	html += '			</div>';
	html += '			<div class="state">';
	html += '				'+status;
	html += '			</div>';
	html += '		</div>';
	html += '		<div class="content">';
	html += '			<div class="title">';
	html += '				<em class="type">'+type+'</em>';
	html += '				<span>'+data.title+'</span>';
	html += '			</div>';
	html += '			<div class="price">';
	html += '				'+$.number(data.totalPrice+data.pointPrice)+'원';
	html += '			</div>';
	html += '		</div>';
	html += '	</a>';
	html += '</li>';
	return html;
}

/**
 * 배송관리
 */
function deliveryStatusProgress() {
	toast.warning("아직 송장번호가 없습니다.");
	return false;
}
function genDeliveryCard(data, isLink) {
	
	var _deliveryNum = "";
	var _href = '<a href="#" onclick="deliveryStatusProgress(); return false;">';
	if( data.deliveryNum!=null ) {
		_deliveryNum = data.deliveryCompany + ' ' + data.deliveryNum;
		_href = '<a href="http://nexs.cjgls.com/web/info.jsp?slipno='+data.deliveryNum+'" onclick="return false;" class="has-next-icon info-delivery clearfix" data-clipboard-text="'+data.deliveryNum+'">';
	} else {
		_deliveryNum = 'CJ대한통운 처리중';
	}
	
	var _deliveryState = '';
	if( data.deliveryState=='COMPLETE' ) {
		_deliveryState += '배송완료';
	}
	else if( data.deliveryState=='PROGRESS' ) {
		_deliveryState += '배송중';
	}
	else {
		_deliveryState += '준비중';
		_deliveryNum = '출고예정';
	}
	
	var _deliveryStartTsp = data.deliveryStartTsp;
	if( _deliveryStartTsp==null ) {
		_deliveryStartTsp = data.paymentTsp;
	} 
	                 
	var html = '';
	html += '<li>';
	html += '	'+_href;
	html += '		<div class="header">';
	html += '			<div class="date">';
	html += '				<em class="date">'+moment(_deliveryStartTsp).format("Y.MM.DD")+'</em>';
	html += '				<em class="code">'+data.paymentTitle+'</em>';
	html += '			</div>';
	html += '		</div>';
	html += '		<div class="content">';
	html += '			<div class="title">';
	html += '				<span>'+_deliveryNum+'</span>';
	html += '			</div>';
	html += '			<div class="price">';
	html += '				'+_deliveryState;
	html += '			</div>';
	html += '		</div>';
	html += '	</a>';
	html += '</li>';
	return html;
}


/**
 * 후기
 */
function reviewImageLoad(t, b) {
	if( b ) {
		var src = $(t).attr("src");
		$(t).closest(".review-image").css("background-image", "url("+src+")");
		$(t).closest(".review-image").css("opacity", "1.0");
	} else {
		var origin = $(t).attr("origin");
		$(t).closest(".review-image").css("background-image", "url("+origin+")");
		$(t).closest(".review-image").css("opacity", "1.0");
	}
}
function genReviewCard(data, productCode) {
	var _imageUrl = '';
	var imageUrl = 'https://img.pilly.kr/product/v20200519/'+data.productItems[0].iconText+'/bot.jpg';
	var rand = 0;
	if( data.imageUrl!=null ) {
		imageUrl = data.imageUrl;
	} else if( productCode!=null ) {
		rand = Math.floor(Math.random() * data.productItems.length);
		imageUrl = 'https://img.pilly.kr/product/v20200519/'+data.productItems[rand].iconText+'/bot.jpg';
	}
	_imageUrl = '<div class="review-image" style="background-image: url(https://img.pilly.kr/product/v20200519/'+data.productItems[rand].iconText+'/bot.jpg); opacity: 0.5;">';
	_imageUrl += '<img class="hidden-image" src="'+imageUrl+'?d=800x800" origin="'+imageUrl+'" alt="" onLoad="reviewImageLoad(this, true);" onError="reviewImageLoad(this, false);" />';
	if( data.badge!=null ) {
		_imageUrl += '<span class="badge-'+data.badge+'"></span>';
	}
	_imageUrl += '</div>';
	
	var _name = data.name.substring(0,1)+"**";
	var _more = '더보기';
	
	var html = '';
	html += '<li class="has-image" data-id="'+data.uuid+'">';
	html += '    <div class="review-header">';
	html += '        <em>';
	html += '        	<a href="/review/'+data.uuid+'?productCode='+(productCode!=null?productCode:'')+'">';
	html += '        		'+_name;
	html += '        		<span class="normal">('+data.products+')</span>';
	if( data.days < 7 ) {
		html += '      	 <span class="icon icon-review-new"></span>';
	}
	html += '        	</a>';
	html += '        </em>';
	html += '        <span>'+moment(data.regTsp).format("Y.MM.DD")+' / <em>'+data.subtitle+'</em></span>';
	html += '        ';
	html += '    </div>';
	html += '    '+_imageUrl;
	html += '    <div class="open-contents">';
	html += '    	<p>';
	html += '    		'+data.content;
	html += '   	 	<!-- // -->';
	html += '   	 </p>';
	html += '    </div>';
	html += '    <div class="open-more link-info" data-id="'+data.uuid+'">';
	html += '    	<em>'+_more+'</em>';
	html += '    </div>';
	html += '</li>';
	return html;
}

/**
 * 스토리
 */
function genStoryCard(data) {
	var _href = '/story/'+data.uri;
	if( data.url!=null && data.url!='' ) {
		_href = data.url;
	}
	
	var html = '';
	html += '<li>';
	html += '	<a href="'+_href+'">';
	html += '		<img src="'+data.thumbnailUrl+'?d=497x331" alt="'+data.title+'" />';
	html += '		<em>'+data.category+'</em>';
	html += '		<h3>'+data.title+'</h3>';
	html += '		<p>'+data.summary;
	html += '			<span>더보기</span>';
	html += '		</p>';
	html += '	</a>';
	html += '</li>';
	return html;
}



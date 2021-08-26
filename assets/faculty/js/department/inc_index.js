setData(firstData['alumni'], 'alumni')
setData(firstData['student'], 'student')
var owlCarousel_option = { autoPlay : 3000, loop:true, margin:7, pagination:false, navigation: true, navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'], itemsTablet : [768,4], itemsMobile : [767,1] };
var $owlProfessor = $('#owl-carousel-professor').owlCarousel(owlCarousel_option);
var $owlProfessorSpecial = $('#owl-carousel-professor_special').owlCarousel(owlCarousel_option);
$owlProfessor.trigger('refresh.owl.carousel');
$owlProfessorSpecial.trigger('refresh.owl.carousel');

function setData(data, type){
	let html = '';
	for(let i = 0; i < data.length; i++){
		let curr = data[i]
		html += `<li class="li-content"> <div class="box-content"> <div class="box-detail-${type}" id="box-detail-${curr.vs_code}"> <div class="row"> <div class="col-sm-3"> <div class="profile box-image-profile m-t-xs" id="profile-${curr.vs_code}"> <img src="./uploads/voice_students/${curr.vs_profile}" alt="" width="100%" /> </div> <div class="visible-xs m-t-sm"></div> </div> <div class="col-sm-9"> <ul class="list-unstyled m-t-n-xs m-l-n-sm m-b-n-xs"> <li> <h4 style="line-height: 1.6em;" class="m-b-xxs"> <a href="https://www.facebook.com/${curr.vs_fblink}" target="_blank" style="color: white;"> <i class="fa fa-facebook-official"></i> </a> ${curr.vs_fbname} </h4> </li> <li> <small>${curr.faculty_name_th}</small> </li> ${curr.dept_name_th ? `<li class="m-t-n-xs"><small>${curr.dept_name_th}</small></li>` : ''} </ul> </div> </div> </div> <div class="box-detail-contect">${curr.vs_description_th}</div> </div> </li>`
	}

	$('#waterfall').append(html)
	$('#waterfall').NewWaterfall();
}
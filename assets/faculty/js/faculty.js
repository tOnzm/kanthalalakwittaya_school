$(document).ready(function() {
  	$(".header-faculty-cover").backstretch(background_header);
	$(".footer-faculty").backstretch(background_footer);

	if (window.location.hash == '#contact') {
        let footerDiv = document.getElementById("footerFaculty");
        setTimeout(function() {
            footerDiv.scrollIntoView({
            	block: 'start', inline: 'start'	
            });
            //your code to be executed after 1 second
        }, 1000);
    }
});

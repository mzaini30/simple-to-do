if (localStorage.getItem('level') === null){
	level = 0
} else {
	level = parseInt(localStorage.getItem('level'))
}

$('.navbar-nav a').click(function(){
	$('.navbar-toggle').click()
})

// inisialisasi bulan ini

tanggalan = new Date()
bulan = tanggalan.getMonth()
bulan++
bulan2 = bulan++

list_bulan = ['Januari', 'Februari', 'Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

hari_ini = tanggalan.getDate() + ' ' + list_bulan[tanggalan.getMonth()]
$('.navbar-brand').html(hari_ini)

urut = function(){
	var $myColorList = $('.list-canvas tbody');

	// Elements one layer deep get .children(), any deeper go with .find()
	var $colors = $myColorList.children('tr');

	/**
	 * Bind $colors to the sort method so we don't have to travel up
	 * all these properties more than once.
	 */
	var sortList = Array.prototype.sort.bind($colors);

	sortList(function ( a, b ) {

	    // Cache inner content from the first element (a) and the next sibling (b)
	    var aText = a.innerHTML;
	    var bText = b.innerHTML;
	 
	    // Returning -1 will place element `a` before element `b`
	    if ( aText < bText ) {
	        return -1;
	    }

	    // Returning 1 will do the opposite
	    if ( aText > bText ) {
	        return 1;
	    }

	    // Returning 0 leaves them as-is
	    return 0;
	});

	// Put it right back where we got it
	$myColorList.append($colors);
}

update_persen = function(){
	urut()
	sudah_selesai = $('.cek-oke').length
	sudah_selesai_aktif = $('.cek-oke.aktif').length
	semua = $('.cek.aktif').length
	if (semua > 0){
		persen_selesai = Math.round(sudah_selesai_aktif / semua * 100)	
	} else {
		persen_selesai = 0
	}
	// if (sudah_selesai > level){
	// 	level++
	// }
	level = sudah_selesai
	localStorage.setItem('level', level)
	// console.log(level)
	// console.log(sudah_selesai)
	level_bagi_sepuluh = Math.floor(level / 10)
	// console.log(level_bagi_sepuluh)
	$('.progress-level').attr('aria-valuenow', level_bagi_sepuluh).css('width', level_bagi_sepuluh + '%')
	$('.progress-complete').attr('aria-valuenow', persen_selesai).css('width', persen_selesai + '%')
	$('.alert-success').html(persen_selesai + '% Complete / Level ' + level_bagi_sepuluh)
	$('.aktif').parent().parent().first().find('td').css('border-top', 'none')
}

$('.list-canvas').html(localStorage.getItem('simple to do'))
update_persen()

$('.top').click(function(){
	atas()
})

$('.tambah-baru').submit(function(){
	event.preventDefault()
	item = $('.input-data').val()
	if (item){
		$('.list-canvas').append('<tr><td class="cek-container"><div class="btn btn-default cek aktif">&check;</div></td><td><div class="isi">' + item + '</div></td><td class="hapus-container"><div class="btn btn-danger hapus">&times;</div></td></tr>')
		
		// simpan dan update persen
		localStorage.setItem('simple to do', $('.list-canvas').html())
		update_persen()
		
		$('.input-data').val('')
		$('html, body').animate({
			scrollTop: $('.bawah').offset().top
		}, 800)
	}
})

$(document).on('click', '.cek', function(){
	$(this).toggleClass('btn-default').toggleClass('btn-success').toggleClass('cek-oke')
	$(this).parent().parent().find('.isi').toggleClass('selesai')
	localStorage.setItem('simple to do', $('.list-canvas').html())
	update_persen()
})

$(document).on('click', '.hapus', function(){
	// $(this).parent().parent().remove()
	$(this).parent().parent().find('.cek').removeClass('aktif')
	$(this).parent().parent().hide()
	localStorage.setItem('simple to do', $('.list-canvas').html())
	update_persen()
})
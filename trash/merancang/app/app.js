update_persen = function(){
	sudah_selesai = $('.cek-oke').length
	semua = $('.cek').length
	if (semua > 0){
		persen_selesai = Math.round(sudah_selesai / semua * 100)	
	} else {
		persen_selesai = 0
	}
	$('.progress-bar').attr('aria-valuenow', persen_selesai).css('width', persen_selesai + '%')
	$('.alert-success').html(persen_selesai + '% Complete')
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
		$('.list-canvas').append('<tr><td class="cek-container"><div class="btn btn-default cek">&check;</div></td><td><div class="isi">' + item + '</div></td><td class="hapus-container"><div class="btn btn-danger hapus">&times;</div></td></tr>')
		localStorage.setItem('simple to do', $('.list-canvas').html())
		update_persen()
		$('.input-data').val('')
	}
})

$(document).on('click', '.cek', function(){
	$(this).toggleClass('btn-default').toggleClass('btn-success').toggleClass('cek-oke')
	$(this).parent().parent().find('.isi').toggleClass('selesai')
	localStorage.setItem('simple to do', $('.list-canvas').html())
	update_persen()
})

$(document).on('click', '.hapus', function(){
	$(this).parent().parent().remove()
	localStorage.setItem('simple to do', $('.list-canvas').html())
	update_persen()
})
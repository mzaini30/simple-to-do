if (localStorage.getItem('level') === null){
	level = 0
} else {
	level = parseInt(localStorage.getItem('level'))
}

// inisialisasi bulan ini

tanggalan = new Date()
bulan = tanggalan.getMonth()
bulan++
bulan2 = bulan++

list_bulan = ['Januari', 'Februari', 'Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

hari_ini = tanggalan.getDate() + ' ' + list_bulan[tanggalan.getMonth()]
$('.navbar-brand').html(hari_ini)

update_persen = function(){
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
	// $(this).parent().parent().remove()
	$(this).parent().parent().find('.cek').removeClass('aktif')
	$(this).parent().parent().hide()
	localStorage.setItem('simple to do', $('.list-canvas').html())
	update_persen()
})
const Complate = (data) => {
	for(let x in data){
		document.querySelector(".title-header").innerText = data[x].topic
		document.querySelector(".desc").innerHTML = data[x].complate
	}
	pre_style()

}
$('.title.input').toggle()


// editor
const edit = ()=> {
	var toolbarOptions = [
	  ['bold', 'italic', 'underline', 'strike','image'],        // toggled buttons
	  ['blockquote', 'code-block'],

	  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
	  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
	  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
	  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
	  [{ 'direction': 'rtl' }],                         // text direction

	  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
	  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

	  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
	  [{ 'font': [] }],
	  [{ 'align': [] }],

	  ['clean'],                                        // remove formatting button

	  // custom color button
	  [{
	    'color': ['#FF0000', '#00FF00', '#0000FF', '#FFFFFF', '#000000', '#FFA500', '#FFFF00', '#800080'],
	    'background': ['#FF0000', '#00FF00', '#0000FF', '#FFFFFF', '#000000', '#FFA500', '#FFFF00', '#800080']
	  }]
	];

	var quill = new Quill('#editor-container', {
	  modules: {
	    toolbar: toolbarOptions
	  },
	  theme: 'snow'
	});

}
const pre_style =()=> {
	$('pre').addClass('p-1 bg-light text-dark rounded shadow-sm')
}
$(document).ready(()=> {
	// topics list
	$.ajax({
		url:location.origin+`/topic/${location.pathname}`,
		type:'GET',
		success:(res)=> {
			Complate(res.res)
			// console.log(res.res)
		},
		error:(error)=> {
			console.log(error)
		}
	})
	// update
	const update = (data, title) => {
	    $.ajax({
	        type: 'post',
	        url: location.origin + '/update/' + location.pathname,
	        data: { data: data, title:title },
			beforeSend: function(xhr) {
			xhr.setRequestHeader("X-CSRF-Token", $('#csrf_token').attr('value'));
			},
	        success: (res) => {
	            if(res==200){
	            	$('.success').text('Successful update')
	            	pre_style()
	            }else{
	            	$('.error').text('some error update')
	            }
	        },
	        error: (error) => {
	            $('.error').text('some error update')
	        }
	    });
	};


	$('.edit').click((e)=> {
		if(e.target.dataset.check=='true'){
			let data = $('.desc')
			$('.temp').append(`<div id="editor-container"><div class="ql-editor">${data.html()}</div></div>`)
			data.html(" ")
			let title = $('.title-header')
			$('.title.input').toggle()
			$('.title.input').val(title.text())
			title.toggle()
			edit()
			e.target.dataset.check='false'
		}else{
			let data = $('.ql-editor').html();
			let title = $('.title.input').val()
			$('.title.input').toggle()
			$('.title-header').text(title)
			$('.title-header').toggle()
			$('.desc').html(data)
			$('.temp').html(" ")
			e.target.dataset.check='true'
			update(data, title)
		}
	})
})
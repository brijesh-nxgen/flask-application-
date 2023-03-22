const Topic = (lists) => {
	let items_lists = document.querySelector(".items-lists");
	for (let x in  lists){
		let post = lists[x]
		let list = document.createElement("li");
		list.innerHTML =`<a href="/q/${post.url}" class="text-white text-capitalize px-2 navbar-brand" title="">${post.topic.slice(0,Math.floor(window.innerWidth/11))}...</a>`;
		list.setAttribute('class',`bg-dark broder-dark my-2 p-2 rounded d-flex justify-content-between`);
		items_lists.appendChild(list)
	}
}

$(document).ready(()=> {
	// topics list
	$.ajax({
		url:location.origin+"/topics",
		type:'GET',
		success:(res)=> {
				Topic(res.res)
		},
		error:(error)=> {
			console.log(error)
		}
	})
})


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


document.querySelector("#form").addEventListener("submit",(e)=> {
	let data = document.querySelector("#editor-container .ql-editor").innerHTML;
	document.querySelector("#complate_topics").value=data;
	if(!confirm("Do you want to Add.")){
		e.preventDefault()
	}
	
})

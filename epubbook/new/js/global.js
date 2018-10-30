

    var rendition = book.renderTo("viewer", {
      width: "100%",
      height: 600,
      ignoreClass: 'annotator-hl',
      manager: "continuous"
    });

     var displayed = rendition.display(0);
	
	var  Locations = book.locations;
	
	var  Contents = book.contents;
	 var notes = document.getElementById('notes');
	 
	 
	 
	 	
    book.ready.then(() => {
		 document.getElementById("loader").style.display = "none";
		  var next = document.getElementById("next");
	
		  next.addEventListener("click", function(e){
			book.package.metadata.direction === "rtl" ? rendition.prev() : rendition.next();
			e.preventDefault();
		  }, false);
	
		  var prev = document.getElementById("prev");
		  prev.addEventListener("click", function(e){
			book.package.metadata.direction === "rtl" ? rendition.next() : rendition.prev();
			e.preventDefault();
		  }, false);
	
		  var keyListener = function(e){
	
			// Left Key
			if ((e.keyCode || e.which) == 37) {
			  book.package.metadata.direction === "rtl" ? rendition.next() : rendition.prev();
			}
	
			// Right Key
			if ((e.keyCode || e.which) == 39) {
			  book.package.metadata.direction === "rtl" ? rendition.prev() : rendition.next();
			}
	
		  };
	
		  rendition.on("keyup", keyListener);
		  document.addEventListener("keyup", keyListener, false);
		  
		  //目录
		  book.loaded.navigation.then(function(navigation) {
				TocController(navigation);
		 });

    });
	

  //目录相关===========================================================================================
  function generateTocItems(toc, level) {
		var container = document.createElement("ul");

		if(!level) level = 1;

		toc.forEach(function(chapter) {
			var listitem = document.createElement("li"),
					link = document.createElement("a");
					toggle = document.createElement("a");

			var subitems;

			listitem.id = "toc-"+chapter.id;
			listitem.classList.add('list_item');

			link.textContent = chapter.label;
			link.href = chapter.href;

			link.classList.add('toc_link');

			listitem.appendChild(link);

			if(chapter.subitems && chapter.subitems.length > 0) {
				level++;
				subitems = generateTocItems(chapter.subitems, level);
				toggle.classList.add('toc_toggle');

				listitem.insertBefore(toggle, link);
				listitem.appendChild(subitems);
			}


			container.appendChild(listitem);

		});

		return container;
	};

 function chapterChange(e) {
		var id = e.id,
				$item = $list.find("#toc-"+id),
				$current = $list.find(".currentChapter"),
				$open = $list.find('.openChapter');

		if($item.length){

			if($item != $current && $item.has(currentChapter).length > 0) {
				$current.removeClass("currentChapter");
			}

			$item.addClass("currentChapter");

			// $open.removeClass("openChapter");
			$item.parents('li').addClass("openChapter");
		}
	};
			
 function TocController(toc) {
	 

	var $list = $("#tocView"),
	docfrag = document.createDocumentFragment();

	var currentChapter = false;
 
	rendition.on('renderered', chapterChange);

	var tocitems = generateTocItems(toc);

	docfrag.appendChild(tocitems);

	$list.append(docfrag);
	$list.find(".toc_link").on("click", function(event){
			var url = this.getAttribute('href');

			event.preventDefault();

			//-- Provide the Book with the url to show
			//   The Url must be found in the books manifest
			rendition.display(url);

			$list.find(".currentChapter")
					.addClass("openChapter")
					.removeClass("currentChapter");

			$(this).parent('li').addClass("currentChapter");

	});

	$list.find(".toc_toggle").on("click", function(event){
			var $el = $(this).parent('li'),
					open = $el.hasClass("openChapter");

			event.preventDefault();
			if(open){
				$el.removeClass("openChapter");
			} else {
				$el.addClass("openChapter");
			}
	});

	 
};
  //目录相关结束===========================================================================================
  
//=========================================================各个按钮窗口的控制
		var $store = $("#store"),
			$fullscreen = $("#fullscreen"),
			$fullscreenicon = $("#fullscreenicon"),
			$cancelfullscreenicon = $("#cancelfullscreenicon"),
			$slider = $("#slider"),
			$main = $("#main"),
			$sidebar = $("#sidebar"),
			//$settings = $("#setting"),
			$bookmark = $("#bookmark");
		 	$panels = $("#panels");
			sidebarOpen = false;  ;
	
	//标签 笔记目录窗口切换==================================
	function changePanelTo(viewName,viewdiv) {
		
		$panels.find('.active').removeClass("active");
		$panels.find("#show-" + viewName ).addClass("active");
		
		$(".view").hide();
		$("#"+viewdiv+"").show();
		 
	 
	};
	
	
	$panels.find(".show_view").on("click", function() {
		var view = $(this).data("view");
		var viewdiv = $(this).data("viewme");
		//alert(view);
		changePanelTo(view,viewdiv);
		
	});
	

		
	 function sidebarOpenshow() {
		sidebarOpen = true;
		$main.addClass("closed");
		$sidebar.addClass("open");
	}

	 function sidebarOpenhide() {
		sidebarOpen = false;
		$main.removeClass("closed");
		$sidebar.removeClass("open");
		
		//隐藏笔记相关
		$('#static-note-form').hide();
		//切换到 目录 标签页
		changePanelTo('Toc','tocView');
	}		
			
	//菜单控制 向右滑动		
	$slider.on("click", function () {
		if(sidebarOpen) {
			 sidebarOpenhide();
			$slider.addClass("icon-menu");
			$slider.removeClass("icon-right");
		} else {
			 sidebarOpenshow();
			$slider.addClass("icon-right");
			$slider.removeClass("icon-menu");
		}
	});
//=================================全屏控制===============================
	if(typeof screenfull !== 'undefined') {
		$fullscreen.on("click", function() {
			screenfull.toggle($('#container')[0]);
		});
		if(screenfull.raw) {
			document.addEventListener(screenfull.raw.fullscreenchange, function() {
					fullscreen = screenfull.isFullscreen;
					if(fullscreen) {
						$fullscreen
							.addClass("icon-resize-small")
							.removeClass("icon-resize-full");
					} else {
						$fullscreen
							.addClass("icon-resize-full")
							.removeClass("icon-resize-small");
					}
			});
		}
	}

/*	$settings.on("click", function() {
		reader.SettingsController.show();
	});*/
//==========标签==================================================================

//总的标签  包括数据库中的  和 当前加入的
if(!all_bookmarks) {
	 all_bookmarks = [];
}
//当前的cfi位置 
var currentLocationCfi ;	
var $bookmarks = $("#bookmarksView");
 
  
function cfitotext(cfi) {
  
	var textContent = '';
	var spineItem = book.spine.get(cfi);
	//alert(Locations.percentageFromCfi(cfi));
	var tocItem;
	if (spineItem.index in book.navigation.toc) {
		tocItem = book.navigation.toc[spineItem.index];
		
		textContent = tocItem.label;
	} else {
		textContent = cfi;
	}
	
	return textContent;
};
	
	
	//生成标签==================================
	function GotoBookmarkItem(cfi) {
		
		rendition.display(cfi);
		
	}
	
 function createBookmarkItem(cfi,biaoqian_id) {
	  
		
		var listitem = document.createElement("li"),
				link = document.createElement("a");
				removelink = document.createElement("a");

		listitem.id = "bookmark-"+biaoqian_id;
		listitem.classList.add('list_item');
	
		link.textContent =	cfitotext(cfi);
		link.href = cfi;

		link.classList.add('bookmark_link');

		link.addEventListener("click", function(event){
				var cfi = this.getAttribute('href');
				rendition.display(cfi);
				event.preventDefault();
		}, false);
		
	  	
		removelink.textContent="移除";
		removelink.href = "javascript:;";
		//removelink.cfi = cfi;
		removelink.classList.add('bookmark_link_delete');
		 
		removelink.onclick = function() { removeBookmark("'"+cfi+"'",biaoqian_id); }
		/*removelink.addEventListener("click", function(event){
				var cfi = this.getAttribute('cfi');
				removeBookmark("'"+cfi+"'",biaoqian_id);
				//event.preventDefault();
		}, false);*/
		
		//var removelink='<a href="javascript:;" class="bookmark_link_delete" onClick="removeBookmark("'+cfi+'",'+biaoqian_id+')" >移除</a>';
		
		//alert(removelink);
		listitem.appendChild(link);
		listitem.appendChild(removelink);
	 
		
		return listitem;
	};
	
  

//添加标签==================================

//当前标签是否是已经加入的标签
 function isBookmarked(cfi) {
	var bookmarks = all_bookmarks;

	return bookmarks.indexOf(cfi);
};

//添加标签

function addBookmark_mysql(cfi){
	 
	var title = cfitotext(cfi);
	 var status=0;
	  var bol=0;
	  var msg='';
		$.ajax({
			type: "get",
			async:false,
			url: "/index.php?m=content&c=epub&a=join_maked&cfi="+cfi+"&media_id="+global_media_id+"&page="+0+"&title="+title+"&r="+Math.random(),
			
			//url: "index.php?m=content&c=epub&a=join_maked",
       		// data: "cfi="+cfi+"&media_id="+global_media_id+"&page="+0+"&title="+title,
			dataType: "json",
			success: function(savedata){
				if(savedata['status']==1){
					bol=savedata['id']; 
				}
				status=savedata['status'];
				msg=savedata['msg'];
			}
		});
		if(status>0){
			return bol;
		}else{
			alert(msg);	
			return false;
		}
		
}

function addBookmark(cfi) {
	/*var present = isBookmarked(cfi);
	if(present > -1 ) return;

	all_bookmarks.push(cfi);*/
  
    $list = $bookmarks.find("#bookmarks");

	var docfrag = document.createDocumentFragment();
	
	var biaoqian_id = addBookmark_mysql(cfi);
	if(biaoqian_id){
		//alert(biaoqian_id);
		var bookmark = createBookmarkItem(cfi,biaoqian_id);
		docfrag.appendChild(bookmark);
		$list.append(docfrag);
		all_bookmarks.push(cfi);//加入临时数据  
	}else{
		return false;
		alert('添加失败');	
	}
	
};


//移除标签

function removeBookmark_mysql(biaoqian_id){
	 
  
	  var bol=0;
		$.ajax({
			type: "post",
			async:false,
			url: "/index.php?m=content&c=epub&a=remove_maked&biaoqian_id="+biaoqian_id+"&r="+Math.random(),
			dataType: "json",
			success: function(savedata){
				 
				bol=savedata['status'];
			}
		});
		return bol;
}

function removeBookmark(cfi,biaoqian_id) {
	//alert(biaoqian_id);
	//var bookmark = isBookmarked(cfi);
	//if( bookmark === -1 ) return;
	
	if(removeBookmark_mysql(biaoqian_id)){
		all_bookmarks.splice(bookmark, 1);
		var $item = $("#bookmark-"+biaoqian_id);
		$item.remove();
	}else{
		alert('添加失败');	
	}
	
};

$bookmark.on("click", function() {
	
	
	var currentLocation = rendition.currentLocation();
					// Get the Percentage (or location) from that CFI
	var cfi = currentLocation.start.cfi;	
	
	//var currentPage = Locations.locationFromCfi(cfi);		
	 
	//var bookmarked = isBookmarked(cfi);
//alert(111);
	addBookmark(cfi);
		$bookmark
			.addClass("icon-bookmark")
			.removeClass("icon-bookmark-empty");
			return true;
	/*if(bookmarked === -1) { //-- Add bookmark
		addBookmark(cfi);
		$bookmark
			.addClass("icon-bookmark")
			.removeClass("icon-bookmark-empty");
	} else { //-- Remove Bookmark
		removeBookmark(cfi);
		$bookmark
			.removeClass("icon-bookmark")
			.addClass("icon-bookmark-empty");
	}*/
	 

});

//每次加载页面时候  标签的样式变化 是不是标签
rendition.on('relocated', function(location){
	var cfi = location.start.cfi;
	var cfiFragment = "#" + cfi;
	//-- Check if bookmarked
	var bookmarked = isBookmarked(cfi);
	if(bookmarked === -1) { //-- Not bookmarked
		$bookmark
			.removeClass("icon-bookmark")
			.addClass("icon-bookmark-empty");
	} else { //-- Bookmarked
		$bookmark
			.addClass("icon-bookmark")
			.removeClass("icon-bookmark-empty");
	}

	currentLocationCfi = cfi;
notediv.style.display = "none";
	 
});/**/



//笔记==================================================================================================

$addnotes = $('.addnotes');

$addnotes.on("click", function() {
		 
//alert(111);

		if(!sidebarOpen) {
			sidebarOpenshow();
			$slider.addClass("icon-right");
			$slider.removeClass("icon-menu");
		}
		 $('#static-note-form').show();
		changePanelTo('Notes','notesView');
		notediv.style.display = "none";
		
});

//环境变量 总的 标记文字
 var global_text='';
 
function addnote(cfiRange, contents){
	
	  book.getRange(cfiRange).then(function (range) {
       
        var li = document.createElement('li');
        var a = document.createElement('a');
        var remove = document.createElement('a');
       
		//alert( range.toString());
		
        if (range) {
		
			 //获取书中选中位置的位置  进行自定义的高亮=======	
			  var aaa= contents.window.getSelection();
			  var rangeaaa = aaa.getRangeAt(0);
			 // console.log(rangeaaa);
			/*  highlightRange(rangeaaa, 'highlight');*/
			 //拼接笔记===================================	
			  text = range.toString();
			  
			 /* a.textContent = text;
			  a.href = "#" + cfiRange;
			  a.onclick = function () {
				rendition.display(cfiRange);
			  };
	
			  remove.textContent = "移除";
			  remove.href = "#" + cfiRange;
			  remove.onclick = function () {
				rendition.annotations.remove(cfiRange);
				return false;
			  };
	
			  li.appendChild(a);
			  li.appendChild(remove);
			  notes.appendChild(li);*/
			  
			  $('#note-cfi').val(cfiRange);
			  $('#note-content').val(text);
			  $('#static-note-content').html(text);
			  
        }

      });
}


rendition.on("selected", function(cfiRange, contents) {
  //  
	   
	 //  alert(contents.window.event.clientX);
//addnote(cfiRange, contents);


 addnote(cfiRange, contents);

});

rendition.on("mouseup", function(cfiRange, contents) {
 
  
	 var txt = contents.window.getSelection();
	   
 	 e =   contents.window.event;
	
	 left = e.screenX; 
	 topss =  e.screenY -100  ;
	  console.log(txt.toString());
	// var aaa= contents.window.getSelection();
	/* console.log(e);
	
	  console.log("left"+left);
	  console.log(topss);*/
	if (txt.toString()!='') {
		if(txt!=global_text){
			notediv.style.display = "inline";
			notediv.style.left = left + "px";
			notediv.style.top = topss + "px";
			global_text = txt.toString();
			//txt.empty();
		}
		
	} else {
		notediv.style.display = "none";
	}
	
 
});
    
function highlight(cfiRange){
	
			 rendition.annotations.highlight(cfiRange, {}, (e) => {
		   // console.log("highlight clicked", e.target);
			
			//alert(11);
			 
		  });	
}	

var notediv = document.getElementById("notediv"); 
/*
浏览器 鼠标停止跟随显示div
var eleContainer =  document;

eleContainer.onmouseup = function(e) {
   //alert(11);
	e = e || window.event;
	var txt = 'aaa', sh = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	var left = (e.clientX - 40 < 0) ? e.clientX + 20 : e.clientX - 40, top = (e.clientY - 40 < 0) ? e.clientY + sh + 20 : e.clientY + sh - 40;
	if (txt) {
		notediv.style.display = "inline";
		notediv.style.left = left + "px";
		notediv.style.top = top + "px";
	} else {
		notediv.style.display = "none";
	}
};*/

 
	
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

    })
	

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
	var all_bookmarks = [];
}
//当前的cfi位置 
var currentLocationCfi ;	
var $bookmarks = $("#bookmarksView");
 
	
	//生成标签==================================
 function createBookmarkItem(cfi,biaoqian_id) {
	  
		
		var listitem = document.createElement("li"),
				link = document.createElement("a");
				removelink = document.createElement("a");

		listitem.id = "bookmark-"+counter;
		listitem.classList.add('list_item');
		
		
		
		var spineItem = book.spine.get(cfi);
		//alert(Locations.percentageFromCfi(cfi));
		var tocItem;
		if (spineItem.index in book.navigation.toc) {
			tocItem = book.navigation.toc[spineItem.index];
			
			link.textContent = tocItem.label;
		} else {
			link.textContent = cfi;
		}

		link.href = cfi;

		link.classList.add('bookmark_link');

		link.addEventListener("click", function(event){
				var cfi = this.getAttribute('href');
				rendition.display(cfi);
				event.preventDefault();
		}, false);
		
	  
		removelink='<a href="javascript:;" class="bookmark_link_delete" onClick="removeBookmark('+cfi+','+biaoqian_id+')" >移除</a>';
		
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
	 
	  var bol=0;
		$.ajax({
			type: "post",
			async:false,
			url: "reg.php?type=email_yz&cfi="+cfi+"&r="+Math.random(),
			dataType: "json",
			success: function(savedata){
				if(savedata['info']==1){
					bol=savedata['id']; 
				}
			}
		});
		return bol;
}
function addBookmark(cfi) {
	var present = isBookmarked(cfi);
	if(present > -1 ) return;

	all_bookmarks.push(cfi);

    $list = $bookmarks.find("#bookmarks");

	var docfrag = document.createDocumentFragment();
	
	
	var bookmark = createBookmarkItem(cfi,biaoqian_id);
 	docfrag.appendChild(bookmark);
	$list.append(docfrag);
};


//移除标签
function removeBookmark(cfi,biaoqian_id) {
	var bookmark = isBookmarked(cfi);
	if( bookmark === -1 ) return;

	all_bookmarks.splice(bookmark, 1);

	var $item = $("#bookmark-"+biaoqian_id);
	$item.remove();
};

$bookmark.on("click", function() {
	
	
	var currentLocation = rendition.currentLocation();
					// Get the Percentage (or location) from that CFI
	var cfi = currentLocation.start.cfi;	
	
	//var currentPage = Locations.locationFromCfi(cfi);		
	 
	var bookmarked = isBookmarked(cfi);

	if(bookmarked === -1) { //-- Add bookmark
		addBookmark(cfi);
		$bookmark
			.addClass("icon-bookmark")
			.removeClass("icon-bookmark-empty");
	} else { //-- Remove Bookmark
		removeBookmark(cfi);
		$bookmark
			.removeClass("icon-bookmark")
			.addClass("icon-bookmark-empty");
	}
	/**/

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

	 
});/**/

 
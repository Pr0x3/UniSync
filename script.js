window.onload=function(){
	var socket = io();
	console.log(socket.id);
	socket.on('connect', function(){
	  console.log(socket.id);
	});


	/*document.getElementsByTagName('form')[0].onsubmit=function(){
		var link=document.getElementsByTagName('input')[0].value ;
		link=link.replace('/watch?v=','/embed/');
		link=link+"?autoplay=1";
		socket.emit('dataemit',{'link': link , 'time':Date.now()});
		document.getElementById("mainvid").src=link;
		return false;
	};

	socket.on('playnow',function(data){
		//var t=(Date.now()-data.time)/1000;
		//t=parseInt(t)+1;
		t=data.curtime;
		console.log(t);
		var link=data.link+"&start="+t;
		console.log(link);
		document.getElementById("mainvid").src=link;
	});
	document.getElementsByClassName('sync-btn')[0].onclick=function(){
		socket.emit('sync');
	}*/
	document.getElementsByClassName('join')[0].onclick=function(){
		var jr=document.getElementsByClassName('join-room')[0];
		jr.style.zIndex="5";
		jr.style.display="flex";
	};

	document.getElementsByClassName("close")[0].onclick=function(){
		this.parentNode.style.display="none";
	};

	document.getElementsByClassName('privateroom')[0].onclick=function(){
		socket.emit('room-search');
	}
	socket.on('roomdata',function(data){
		document.getElementById('private-room').style.display="flex";
		console.log(data);
		for(var i=0;i<data.length;i++){
			$("#private-room").append("<h3 id='"+data[i].rid+"'>"+data[i].rname+"</h3>");
		}
	});

	$('#private-room').on('click','h3',function(){
		console.log(this.id);
		socket.emit('room-select',this.id);
	});

};
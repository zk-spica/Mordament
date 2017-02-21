
var d=[];
var X=[];
var Y=[];
var c=[];
var e=[];
for (i=0; i<=99; ++i) c[i]=[];
var xf=[-1,-1,-1,0,0,1,1,1];
var yf=[-1,0,1,-1,1,-1,0,1];
var slc=[];
for (i=0; i<=8; ++i) slc[i]=[];
var nx=[];
for (i=0; i<=2000000; ++i) nx[i]=[];
var ed=[];
var noch=[];
for (i=0; i<8; ++i) noch[i]=[];
var std=[];
var hav=[];
var you=[];
var sid=[];
var o=[];
for (i=0; i<=100; ++i) o[i]=[];
var lj=[];
for (i=0; i<=2000; ++i)
{
	lj[i]=[];
	for (j=0; j<=30; ++j) lj[i][j]=[];
}
var tt=[];
nd=0;
drag=0;
tag=0;
nstd=0;
playcnt=1;
prot=0;
score=0;
ne=0;
bj=0;
jieshu=0;
S="";

function rand()
{
	return Math.floor(Math.random()*10000);
}

function pushin(k,tgt)
{
	c[++r][0]=X[k]; c[r][1]=Y[k];
	slc[X[k]][Y[k]]=tag;
	crtwd+=$(tgt).text();
	$("[name='currentwd']").text(crtwd);
	e[++ne]=tgt;
	$(tgt).css("background-color","white");
	$(tgt).css("color","rgb(84,198,0)");
}

function popout(k,tgt)
{
	crtwd=crtwd.substring(0,r-1);
	$("[name='currentwd']").text(crtwd);
	$(e[ne]).css("background-color","rgba(251,125,135,0.75)");
	$(e[ne]).css("color","white");
	slc[c[r][0]][c[r][1]]=tag-1;
	--ne; --r;
}

function adja(x1,y1,x2,y2)
{
	var i;
	for (i=0; i<8; ++i)
	if (x1+xf[i]==x2 && y1+yf[i]==y2) return 1;
	return 0;
}

function mousedn(event)
{
	if (event.which!=1) return;
	if (jieshu) return;
	if (drag) return;
	if (!($(event.target).hasClass("lattice"))) return;
	if (prot)
	{
		clearTimeout(ttt);
		resetcol();
	}
	drag=1;
	var k=$(event.target).data("bh");
	crtwd="";
	ne=0; r=0;
	++tag;
	pushin(k,event.target);
}

function resetcol()
{
	var i;
	for (i=1; i<=ne; ++i)
	{
		$(e[i]).css("background-color","rgba(251,125,135,0.75)");
		$(e[i]).css("color","white");
	}
	$("[name='currentwd']").text("");
	prot=0;
}

function changecol(col)
{
	prot=1;
	var i;
	for (i=1; i<=ne; ++i)
	{
		$(e[i]).css("background-color",col);
		$(e[i]).css("color","white");
	}
	ttt=setTimeout("resetcol()",380);
}

function mouseup(event)
{
	if (event.which!=1) return;
	if (!drag) return;
	if (prot) return;
	drag=0;
	if (crtwd.length<3)
	{
		resetcol();
		return;
	}
	var i,k=1,t,col="",xx;
	for (i=0; i<crtwd.length; ++i)
	{
		k=nx[k][crtwd.charCodeAt(i)-65];
		if (k==undefined) break;
	}
	if (k==undefined) col="rgb(205,5,5)"; else
	if (ed[k]!=1) col="rgb(205,5,5)"; else
	if (hav[k]==playcnt) col="rgb(255,210,2)";
	if (col!="") changecol(col); else
	{
		hav[k]=playcnt;
		sco=0;
		for (i=0; i<crtwd.length; ++i)
		{
			t=crtwd.charCodeAt(i)-65;
			if (t>0) xx=freq[t]-freq[t-1]; else xx=freq[0];
			sco+=1+4*(12.25-xx)/12.16;
		}
		sco=Math.round(sco*Math.pow(crtwd.length,0.7)/1.732);
		if (++totwd==32)
		{
			brd=$("<div name='rightzone2'></div>");
			$("body").append(brd);
		}
		if (totwd==60) $(brd).css("overflow-y","scroll");
		score+=sco;
		if (sco<10) sco="&nbsp;&nbsp;"+sco;
		$(brd).html($(brd).html()+sco+" "+crtwd.toLowerCase()+"<br>");
		$("[name='totsco']").text("Total:"+score);
		col="rgb(71,167,1)";
		changecol(col);
	}
}

ln=1;
for (i=0; i<ndic; ++i)
{
	k=1;
	for (j=0; j<dic[i].length; ++j)
	{
		t=dic[i].charCodeAt(j)-97;
		if (nx[k][t]==undefined) nx[k][t]=++ln;
		k=nx[k][t];
	}
	ed[k]=1;
}

for (i=1; i<=4; ++i)
for (j=1; j<=4; ++j)
{
	d[++nd]=$("<div></div>");
	$(d[nd]).addClass("lattice");
	$(d[nd]).data("bh",(i*4-4+j));
	$("[name='matrix']").append(d[nd]);
	X[nd]=i,Y[nd]=j;
	$(d[nd]).css("top",((i-1)*152+11+108));
	$(d[nd]).css("left",((j-1)*152+11+61));
	
	$(d[nd]).hover(function()
	{
		if (prot) return;
		if (!drag) return;
		var k=$(this).data("bh");
		$("#yyy").text(k);
		if (!adja(c[r][0],c[r][1],X[k],Y[k])) return;
		if (X[k]==c[r-1][0] && Y[k]==c[r-1][1])
		{
			popout(k,this);
			return;
		}
		if (slc[X[k]][Y[k]]==tag) return;
		pushin(k,this);
	},function(){});
}

function proc(x,y,k,s)
{
	if (k==undefined) return;
	o[++no][0]=x; o[no][1]=y;
	slc[x][y]=tag;
	s+=$(d[x*4-4+y]).text();
	var i,t;
	if (ed[k]==1 && s.length>=3 && hav[k]!=bj)
	{
		std[++nstd]=s.toLowerCase();
		for (i=1; i<=no; ++i) lj[nstd][i][0]=o[i][0],lj[nstd][i][1]=o[i][1];
		hav[k]=bj;
	}
	for (i=0; i<8; ++i)
	if (slc[x+xf[i]][y+yf[i]]!=tag) proc(x+xf[i],y+yf[i],nx[k][noch[x+xf[i]][y+yf[i]]],s);
	slc[x][y]=tag-1;
	--no;
}

while (1)
{
	while (1)
	{
		for (i=1; i<=4; ++i)
		for (j=1; j<=4; ++j) noch[i][j]=-1;
		t=5+rand()%2;
		for (i=1; i<=t; ++i)
		{
			x=rand()%4+1,y=rand()%4+1;
			while (noch[x][y]!=-1) x=rand()%4+1,y=rand()%4+1;
			k=Math.random()*354;
			if (k<=82) noch[x][y]=0; else
			if (k<=209) noch[x][y]=4; else
			if (k<=279) noch[x][y]=8; else noch[x][y]=14;
		}
		g1=0;
		for (i=1; i<=2; ++i)
		for (j=1; j<=2; ++j) g1+=(noch[i][j]!=-1);
		g2=0;
		for (i=1; i<=2; ++i)
		for (j=3; j<=4; ++j) g2+=(noch[i][j]!=-1);
		g3=0;
		for (i=3; i<=4; ++i)
		for (j=1; j<=2; ++j) g3+=(noch[i][j]!=-1);
		g4=0;
		for (i=1; i<=2; ++i)
		for (j=3; j<=4; ++j) g4+=(noch[i][j]!=-1);
		if ((noch[2][3]!=-1)+(noch[2][2]!=-1)+(noch[3][3]!=-1)+(noch[3][2]!=-1)<2) continue;
		if (Math.abs(g1+g2-g3-g4)<=1 && Math.abs(g1+g3-g2-g4)<=1) break;
	}
	var freq=[8.19,1.47,3.83,3.91,12.25,2.26,1.71,4.57,7.10,0.14,0.41,3.77,3.34,7.06,7.26,2.89,0.09,6.85,6.36,9.41,2.58,1.09,1.59,0.21,1.58,0.09];
	for (i=1; i<=25; ++i) freq[i]+=freq[i-1];
	for (i=1; i<=4; ++i)
	for (j=1; j<=4; ++j)
	if (noch[i][j]==-1)
	{
		while (1)
		{
			xx=Math.random()*100;
			for (t=0; t<=25; ++t)
			if (xx<=freq[t])
			{
				noch[i][j]=t;
				break;
			}
			if (t!=0 && t!=4 && t!=8 && t!=14) break;
		}
	}
	for (i=1; i<=4; ++i)
	for (j=1; j<=4; ++j) $(d[i*4-4+j]).text(String.fromCharCode(65+noch[i][j]));
	++bj;
	nstd=0;
	no=0;
	for (i=1; i<=4; ++i)
	for (j=1; j<=4; ++j)
	{
		++tag;
		proc(i,j,nx[1][noch[i][j]],"");
	}
	if (nstd>180) break;
}
t=0;
for (i=1; i<=ln; ++i) hav[i]=0,sid[i]=i;

$("[name='leftzone']").append('<div name="timer"></div>');
$("[name='leftzone']").append('<div name="rotate" onclick="rotate()">Rotate</div>');
$("[name='rightzone']").append('<div name="totsco">Total:0</div>');

brd=$("[name='rightzone']");
totwd=0;

function rotate()
{
	if (prot) return;
	if (jieshu) return;
	prot=1;
	var i,j,d1=[],n1=[],l1=[],k,t;
	for (i=1; i<=4; ++i) n1[i]=[];
	for (i=1; i<=4; ++i)
	for (j=1; j<=4; ++j) n1[i][j]=noch[i][j];
	for (i=1; i<=4; ++i)
	for (j=1; j<=4; ++j)
	{
		k=$(d[i*4-4+j]).data("bh");
		noch[i][j]=n1[4-j+1][i];
		$(d[i*4-4+j]).css("top",((Y[k]-1)*152+11+108));
		$(d[i*4-4+j]).css("left",((4-X[k])*152+11+61));
		t=X[k];
		X[k]=Y[k];
		Y[k]=5-t;
	}
	console.log(d[1]);
	setTimeout("prot=0",700);
}

function countdown()
{
	if (--ss==-1)
	{
		ss=59;
		if (--mm==-1)
		{
			clc=window.clearInterval(clc);
			resetcol();
			prot=1; drag=0; jieshu=1;
			$("body").append("<div name='tmup'>TIME'S UP</div>");
			setTimeout("ending()",1500);
			return;
		}
	}
	var str="";
	if (ss<10) str="0";
	$("[name='timer']").text(mm+":"+str+ss);
}
mm=2;
ss=1;
countdown();
var clc=self.setInterval("countdown()",1000);

function ending()
{
	var stdsc=[];
	for (i=1; i<=nstd; ++i)
	{
		stdsc[i]=0;
		for (j=0; j<std[i].length; ++j)
		{
			t=std[i].charCodeAt(j)-97;
			if (t>0) xx=freq[t]-freq[t-1]; else xx=freq[0];
			stdsc[i]+=1+4*(12.25-xx)/12.16;
		}
		stdsc[i]=Math.round(stdsc[i]*Math.pow(std[i].length,0.7)/1.732);
	}
	for (i=1; i<nstd; ++i)
	for (j=i+1; j<=nstd; ++j)
	if (stdsc[i]<stdsc[j] || (stdsc[i]==stdsc[j] && std[i]>std[j]))
	{
		t=std[i],std[i]=std[j],std[j]=t;
		t=stdsc[i],stdsc[i]=stdsc[j],stdsc[j]=t;
		t=sid[i],sid[i]=sid[j],sid[j]=t;
	}
	zongf=0;
	for (i=1; i<=nstd; ++i) zongf+=stdsc[i];
	
	$("[name='tmup']").remove();
	$("body").append("\
		<div name='showall'>\
			<h2>Words found:</h2>\
			<h3>"+totwd+" / "+nstd+"</h3>\
			<h2>Score:</h2>\
			<h3>"+score+" / "+zongf+"</h3>\
			<h2>Missed words:</h2>\
			<div id='msd' style='overflow-y:scroll'></div>\
		</div>\
	");	
	
	for (i=1; i<=nstd; ++i)
	{
		k=1;
		sco=0;
		for (j=0; j<std[i].length; ++j)
		{
			t=std[i].charCodeAt(j)-97;
			if (t>0) xx=freq[t]-freq[t-1]; else xx=freq[0];
			sco+=1+4*(12.25-xx)/12.16;
			k=nx[k][t];
		}
		if (hav[k]==playcnt) continue;
		sco=Math.round(sco*Math.pow(std[i].length,0.7)/1.732);
		if (sco<10) sco="&nbsp;&nbsp;"+sco;
		$("#msd").html($("#msd").html()+sco+" <span class='wd'>"+std[i]+"</span><br>");	
	}
	$(".wd").click(function()
	{
		var i,j,k,t;
		for (i=1; i<=S.length; ++i) clearTimeout(tt[i]);
		resetcol();
		S=$(this).text();
		for (k=1; k<=nstd; ++k)
		if (std[k]==S) break;
		ne=0;
		for (i=1; i<=S.length; ++i)
		{
			t=lj[sid[k]][i][0]*4-4+lj[sid[k]][i][1];
			tt[i]=setTimeout("lightup($(d["+t+"]))",(200*(i-1)+100));
		}
	});

	$("[name='leftzone']").append('<div name="restart" onclick="window.location.reload()">Restart</div>');
}

function lightup(tgt)
{
	e[++ne]=tgt;
	$(tgt).css("background-color","white");
	$(tgt).css("color","rgb(84,198,0)");
}

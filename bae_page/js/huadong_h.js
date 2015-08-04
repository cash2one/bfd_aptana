//<!CDATA[
function g(o){return document.getElementById(o);}
function HoverLi(n){
//�����N����ǩ,�ͽ�i<=N;
for(var i=1;i<=2;i++)
{
  g('tb_'+i).className='off';
  g('tbc_0'+i).className='undis';}
  g('tbc_0'+n).className='dis';g('tb_'+n).className='on';
}
//���Ҫ���ɵ������ת���뽫<li>�е�onmouseover �ĳ� onclick;
//]]>

function ga(o){return document.getElementById(o);}
function HoverLia(n){
//�����N����ǩ,�ͽ�i<=N;
for(var i=1;i<=2;i++)
{
  g('tb_'+i).className='off';
  g('tbc_0'+i).className='undis';}
  g('tbc_0'+n).className='dis';ga('tb_'+n).className='on';
}


function gb(o){return document.getElementById(o);}
function HoverLib(n){
//�����N����ǩ,�ͽ�i<=N;
for(var i=1;i<=5;i++)
{
  g('tb_'+i).className='off';
  g('tbc_0'+i).className='undis';}
  g('tbc_0'+n).className='dis';gb('tb_'+n).className='on';
}
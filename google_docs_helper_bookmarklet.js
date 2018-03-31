
function linkster(text,data) { return '<a href=\"'+data+'\">'+text+'</a><br>\n'; };
function jster(url) {
    var out = 'javascript:(function(){';
    out += 'var href = window.location.href;';
    out += 'var d = new Date();';
    out += 'var curr_date = d.getDate();';
    out += 'var curr_day = d.getDay(); curr_day++;';
    out += 'if (curr_day.toString().length==1) { curr_day = \'0\'+curr_day.toString() ; };';
    out += 'var curr_month = d.getMonth(); curr_month++;';
    out += 'if (curr_month.toString().length==1) { curr_month = \'0\'+curr_month.toString() ; };';
    out += 'var curr_year = d.getFullYear();';
    out += 'var dstr = curr_year+ \'-\' + curr_month + \'-\' + curr_date ;';
    out += 'var url=\''+url+'\'+dstr;';
    out += 'var o=window.open(\'\',\'_blank\'); ';
    out += 'o.location.href = url;';
    out += '})();';
    out += '';
    return out;
};
(function(){ 
    var href = window.location.href;
    var str='<html><body><h2>URL: '+href +'</h2>\n'; 
    var d = new Date();
    var curr_date = d.getDate();
    var curr_day = d.getDay(); curr_day++;
    if (curr_day.toString().length==1) { curr_day = '0'+curr_day.toString() ; };
    var curr_month = d.getMonth(); curr_month++;
    if (curr_month.toString().length==1) { curr_month = '0'+curr_month.toString() ; };
    var curr_year = d.getFullYear();
    var dstr = curr_year+ '-' + curr_month + '-' + curr_date ;
    var TemplateID ='1FZIjlJP4C18hKlR0WtIVr8bFzKcj3rlEUIwQUDdANWs';
    if (href.match('drive.google.com/drive/folders')) {
	var re = 'drive.google.com/drive/folders/([^\/]+)';
	var found = href.match(re);
	var FOLDER_ID = found[1];
	str += '<p>Google drive folder: '+FOLDER_ID +'</p>\n';
	str += '<p>Source: '+linkster(href,'Google drive folder') + '</p>\n';
	str += '<p>Please note: Adding titles to Google sheets via links does not work (last tested March 2018). It is included here in case it starts working in the future.</p>\n';
	var doctemplate = '';
	str += '<h3>Draggable links - javascript (adds dynamic date at time of click; title: X_date)</h3>\n';
	str += linkster('+doc',jster('https://docs.google.com/document/create?hl=en&folder='+FOLDER_ID+'&title=Notes '));
	str += linkster('+sheet',jster('https://docs.google.com/spreadsheets/create?hl=en&folder='+FOLDER_ID+'&title=Sheet '));
	str += linkster('+pres',jster('https://docs.google.com/presentation/create?hl=en&folder='+FOLDER_ID+'&title=Slides  '));
	str += linkster('+draw',jster('https://docs.google.com/drawings/create?hl=en&folder='+FOLDER_ID+'&title=Drawing  '));
	str += linkster('+docT',jster('https://docs.google.com/document/d/'+TemplateID+'/copy?id='+TemplateID+
						'&copyCollaborators=false&copyComments=false&usp=docs_web'
						+ '&copyDestination=' +FOLDER_ID+'&title=Notes '));
	str += '<h3>Draggable links - plain html</h3>\n';
	str += '<h4>Draggable links (plain html, tite: New_X)</h4>\n';
	str += linkster('+doc','https://docs.google.com/document/create?hl=en&folder='+FOLDER_ID+'&title=New_Notes');
	str += linkster('+sheet','https://docs.google.com/spreadsheets/create?hl=en&folder='+FOLDER_ID+'&title=New_Sheet');
	str += linkster('+pres','https://docs.google.com/presentation/create?hl=en&folder='+FOLDER_ID+'&title=New_Slides ');
	str += linkster('+draw','https://docs.google.com/drawings/create?hl=en&folder='+FOLDER_ID+'&title=New_Drawing ');
	str += linkster('+docT','https://docs.google.com/document/d/'+TemplateID
			+'/copy?id='+TemplateID+'&copyCollaborators=false&copyComments=false&usp=docs_web'
			+ '&copyDestination=' +FOLDER_ID+'&title=Notes '+dstr);
	str += 'Template: '+linkster('(here)','https://docs.google.com/document/d/'+TemplateID+'/edit')+'<br>\n';
	str += '<h4>For use now, with current date, unchanging; title: X_'+dstr+':</h4>\n';
	str += linkster('+doc','https://docs.google.com/document/create?hl=en&folder='+FOLDER_ID+'&title=Notes '+dstr);
	str += linkster('+sheet','https://docs.google.com/spreadsheets/create?hl=en&folder='+FOLDER_ID+'&title=Sheet '+dstr);
	str += linkster('+pres','https://docs.google.com/presentation/create?hl=en&folder='+FOLDER_ID+'&title=Slides '+dstr);
	str += linkster('+draw','https://docs.google.com/drawings/create?hl=en&folder='+FOLDER_ID+'&title=Drawing '+dstr);
	str += linkster('+docT','https://docs.google.com/document/d/'+TemplateID+'/copy?id='+TemplateID+'&copyCollaborators=false&copyComments=false'
			+ '&copyDestination=' +FOLDER_ID+'&title=Notes '+dstr);
	str += 'Template: '+linkster('(here)','https://docs.google.com/document/d/'+TemplateID+'/edit')+'<br>\n';
	str += '<h4>Folder download (doesnt work in March 2018, apparently worked in 2014)</h4>\n';
	str += linkster('Download folder','https://drive.google.com/uc?export=download&id='+FOLDER_ID+'');
    } else if (href.match('docs.google.com')) {
	str += '<p>Google docs/sheets/slides</p>\n';
	str += '<p>Source: '+linkster(href,'Google doc/sheet/slide') + '</p>\n';
	str += '<p>Export:</p>\n';
	var re = '/d/([^\/]+)';
	var found = href.match(re);
	var FILE_ID = found[1];
	var formats = [];
	var type = '';
	if (href.match('/document|spreadsheets/')) {
	    var gid = '';
	    var gidx = '';
	    if (href.match('/document/')) {
		formats = ['doc','odt','rtf','pdf','txt','html','epub'];
		type = 'document';
	    } else if (href.match('/spreadsheets/')) {
		type = 'spreadsheets';
		formats = ['xlsx','ods','pdf','csv','tsv'];
		var re = /gid=(\d+)/i;
		var found = href.match(re);
		if (found) {
		    formats = ['xlsx','ods','pdf','csv','tsv'];
		    gid = '(sheet: '+found[1]+') ';
		    gidx = '&'+found[0];
		} else {
		}
		for (var i = 0; i < formats.length; i++) {
		    str += linkster('Export Google '+type+' '+gid+'as '+formats[i],'https://docs.google.com/'+type+'/d/'+FILE_ID+'/export?format='+formats[i]+gidx);
		}
		formats = ['xlsx','ods','pdf'];
		gid = '(all sheets) ';
		gidx = '';
	    }
	    for (var i = 0; i < formats.length; i++) {
		str += linkster('Export Google '+type+' '+gid+'as '+formats[i],'https://docs.google.com/'+type+'/d/'+FILE_ID+'/export?format='+formats[i]+gidx);
	    }
	} else if (href.match('/presentation/')) {
	    type = 'presentation';
	    formats = ['pptx','odp','pdf','txt'];
	    for (var i = 0; i < formats.length; i++) {
		str += linkster('Export Google '+type+' as '+formats[i],'https://docs.google.com/'+type+'/d/'+FILE_ID+'/export/'+formats[i]);
	    }
	    str += 'Additional formats jpg, png, svg require google apps script. https://stackoverflow.com/questions/31662455/how-to-download-google-slides-as-images';
	}
	if (type === '') {
	    str += 'Sorry, this bookmarklet will only work on Google Drive/Docs/Sheet/Presentations pages.';
	};
    } else {	    
	str += 'Sorry, this bookmarklet will only work on Google Drive/Docs/Sheet/Presentations pages.';
    };
    var o=window.open('','_blank'); 
    var newdoc=o.document; 
    newdoc.write(str); 
    newdoc.close();
})();

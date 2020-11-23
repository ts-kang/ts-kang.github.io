const url_ereter_analytics = 'http://ereter.net/iidxplayerdata/{}/analytics/perlevel/';
const url_ereter_level = 'http://ereter.net/iidxplayerdata/{}/level/12/';

const lamps = ['no-play', 'failed', 'assist', 'easy', 'clear', 'hard', 'ex-hard', 'fullcombo'];

$(document).ready(async () => {
    $('#player').val(location.search.substring(1));
    $('#player_form').on('submit', () => {
	location.search = '?' + $('#player').val().replace(/[\D]/g, '');

	return false;
    });

    var diff_table = {};

    let player = $('#player').val();

    if (!player)
	return;

    let content = $('#content');

    content.html('<h3 id="loading" class="loading">Loading... (1/2)</h3><h3 id="progress" class="loading progress">Loading... (1/2)</h3>');

    let progress = $('#progress');
    let loading_width = $('#loading').width();
    let set_progress = (e) => {
	console.log('asdf');
	if (e.lengthComputable)
	    progress.css('width', `${e.loaded / e.total * loading_width}px`);
	progress.css('width', '0');
    };

    var diff_table = [];
    var index_table = {}; // song_id: [level_index, song_index]
    var user_info = '';

    await access_page(url_ereter_analytics.replace('{}', player), (data) => {
	let html = $($.parseHTML(data));
	user_info = html.find('.content > h3').html();
	let table_analytics = html.find('[data-sort=table-perlevel]');
	parse_table(table_analytics, diff_table, index_table);
	content.html(content.html().replaceAll('(1/2)', '(2/2)'));
    }, set_progress);
    console.debug(diff_table);

    if (!diff_table)
	return;

    await access_page(url_ereter_level.replace('{}', player), (data) => {
	let table_level = $($.parseHTML(data)).find('[data-sort=table]');
	
	table_level.find('tbody').get().map((tbody) => {
	    var level;
	    var songs = [];
	    $(tbody).find('tr').get().map((row) => {
		let fields = $(row).find('td').get();
		let id = $(fields[1]).find('a').attr('href').replace(/^\/iidxranking\/([\d]+)\/[\d]+\/$/, '$1');
		let indices = index_table[id];
		let song = diff_table[indices[0]].songs[indices[1]];
		song.rank = $(fields[4]).children().length > 0
		    ? $(fields[4]).find('span span span')[0].innerText
		    : '';
		song.lamp = $(fields[5]).text().toLowerCase();
		if (song.lamp.trim() === '')
		    song.lamp = 'no-play';
	    });
	});
    }, set_progress);

    diff_table.forEach((level_table) => {
	level_table.lamp = 
	    level_table.songs.reduce((total, current) =>
				     lamps.indexOf(current.lamp) < lamps.indexOf(total.lamp) ? current : total
				     , {lamp: lamps[lamps.length - 1]}).lamp;
    });
    sort_table(diff_table);
    content.html(`<h3 style="margin-top: 0">${user_info}</h3>`);
    content.append(create_table_element(diff_table));

    $('#screenshot').on('click', () => {
	html2canvas($('#content')[0]).then((canvas) => {
		let a = document.createElement('a');
		a.download = `user_${player}_${new Date().toISOString().replace(/^([\d-]+)[\w][\d:.]+[\w]$/, '$1')}.png`;
		a.href = canvas.toDataURL('image/png');
		a.click();
		a.innerText = 'Download screenshot';
		$(a).insertAfter('#screenshot');
	});
    });
});

async function access_page(url, success, progress) {
    return new Promise((resolve, reject) => {
	$.ajax({
	    xhr: () => {
		var xhr = new window.XMLHttpRequest();
		if (!progress)
		    xhr.addEventListener('progress', progress, false);
		return xhr;
	    },
	    type: 'GET',
	    url: 'https://cors-header-proxy.nnyan.workers.dev/?' + url,
	    async: true,
	    success: success,
	    error: (xhr) => {
		alert(xhr.status + ' - ' + xhr.statusText);
	    }
	})
	    .always(() => resolve())
	    .progress((e) => {
		console.log(e);
	    });
    });
}

function get_progress(e) {
	// TODO
}

function create_table_element(diff_table) {
    var elements = [];
    diff_table.forEach((level_table) => {
	elements.push($(
	    `<div class="container">
			<div class="level">
				☆${level_table.level}
				<span class="lamp ${level_table.lamp}"></span>
			</div>
			<div class="songs">` +
		level_table.songs
		.map((song) => `<div class="song ${song.difficulty.toLowerCase()}">
					${song.title}
					<span class="lamp ${song.lamp}"></span>
					</div>`)
		.reduce((total, current) => total + current) +
		`</div></div>`
	));
    });

    return elements;
}

function parse_table(table_element, diff_table, index_table) {
    table_element.find('tbody:not(.tablesorter-no-sort)').get().map((tbody) => {
	var level;
	var songs = [];
	$(tbody).find('tr').get().map((row) => {
	    let fields = $(row).find('td').get();
	    if (!level)
		level = $(fields[0]).text().substring(1);
	    let title = $(fields[1]).text();
	    let id = $(fields[1]).find('a').attr('href').replace(/^\/iidxranking\/([\d]+)\/[\d]+\/$/, '$1');
	    index_table[id] = [diff_table.length, songs.length];

	    songs.push({
		id: id,
		title: title.replace(/ \([A-Z]+\)$/, ''),
		difficulty: title.replace(/^.* \(([A-Z]+)\)$/, '$1'),
		color: $(fields[3]).find('span').css('color'),
		/*
		  lamp: $(fields[6]).find('span').length == 0
		  ? 'no-play'
		  : $(fields[6]).find('span').hasClass('icon-check')
		  ? 'ex-hard'
		  : $(fields[4]).find('span').hasClass('icon-check')
		  ? 'hard'
		  : $(fields[2]).find('span').hasClass('icon-check')
		  ? 'easy'
		  : 'failed'
		*/
	    });
	});
	if (!level)
	    return;
	diff_table.push({
	    level: level,
	    songs: songs
	});
    });
}

function sort_table(diff_table) {
    diff_table.reverse();
    diff_table.forEach((level_table) => {
	level_table.songs.sort((a, b) => lamps.indexOf(b.lamp) - lamps.indexOf(a.lamp));
    });
    // TODO
}

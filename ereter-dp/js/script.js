const url_ereter_analytics = 'http://ereter.net/iidxplayerdata/{}/analytics/perlevel/';
const url_ereter_level = 'http://ereter.net/iidxplayerdata/{}/level/12/';

const lamps = ['no-play', 'failed', 'assist', 'easy', 'clear', 'hard', 'ex-hard', 'fullcombo'];

$(document).ready(() => {
	$('#player').val(location.search.substring(1));
	$('#submit').on('click', () => {
		location.search = '?' + $('#player').val()
			.replace(/[\D]/g, '');
	});

	var diff_table = {};

	let player = $('#player').val();

	if (!player)
		return;

	var diff_table;
	var index_table = {}; // song_id: [level_index, song_index]

	access_page(url_ereter_analytics.replace('{}', player), (data) => {
		let table_analytics = $($.parseHTML(data)).find('[data-sort=table-perlevel]');
		diff_table = parse_table(table_analytics, index_table);
	});

	if (!diff_table)
		return;

	access_page(url_ereter_level.replace('{}', player), (data) => {
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
	});

	diff_table.forEach((level_table) => {
		level_table.lamp = 
			level_table.songs.reduce((total, current) =>
				lamps.indexOf(current.lamp) < lamps.indexOf(total.lamp) ? current : total
				, {lamp: 'fullcombo'}).lamp;
	});
	sort_table(diff_table);
	$('#content').append(create_table_element(diff_table));
});

function access_page(url, success) {
	$.ajax({
		type: 'GET',
		url: url,
		async: false,
		success: success,
		error: (xhr) => {
			alert(xhr.status + ' - ' + xhr.statusText);
		}
	});
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

function parse_table(table_element, index_table) {
	var diff_table = [];

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

	console.log(diff_table);
	return diff_table;
}

function sort_table(diff_table) {
	diff_table.reverse();
	diff_table.forEach((level_table) => {
		level_table.songs.sort((a, b) => lamps.indexOf(b.lamp) - lamps.indexOf(a.lamp));
	});
	// TODO
}

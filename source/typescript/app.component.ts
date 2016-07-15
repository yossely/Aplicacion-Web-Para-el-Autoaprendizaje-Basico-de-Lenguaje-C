import { Component } from 'angular2/core';

@Component({
  selector: 'my-app',
  templateUrl: 'assets/partials/nivel.html'
})

export class AppComponent { 
	units = units_content;
}

var units_content = [
	{
		'title' : 'Unidad I. Donec fringilla arcu tortor, at.',
		'lesson': [
			{
				'number': 1,
				'content': 'Lorem ipsum dolor sit amet'
			},
			{
				'number': 2,
				'content': 'Donec semper nisl risus, ac. '
			},
			{
				'number': 3,
				'content': 'Sed tellus sem, vulputate ac. '
			},
		]
	},
	{
		'title' : 'Unidad II. Donec fringilla arcu tortor, at.',
		'lesson': [
			{
				'number': 1,
				'content': 'Lorem ipsum dolor sit amet'
			},
			{
				'number': 2,
				'content': 'Donec semper nisl risus, ac. '
			},
			{
				'number': 3,
				'content': 'Sed tellus sem, vulputate ac. '
			},
		]
	}
];
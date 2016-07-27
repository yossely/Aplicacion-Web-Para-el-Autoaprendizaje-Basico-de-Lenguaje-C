import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
	styleUrls: ['dist/assets/css/niveles.css'],
    templateUrl: 'dist/assets/partials/nivel.html',
    directives: [ROUTER_DIRECTIVES]
})

export class UnitsComponent {
	units = units_content;
}

var units_content = [
	{
		'title' : 'Unidad I. Donec fringilla arcu tortor, at.',
		'number': 1,
		'lesson': [
			{
				'number': 1,
				'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque nobis dolorem consequatur rerum consectetur ullam blanditiis eos distinctio!',
				'url': '/main'
			},
			{
				'number': 2,
				'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat optio unde accusamus quibusdam, est laudantium!',
				'url': '/main'
			},
			{
				'number': 3,
				'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum in magni accusamus nesciunt ipsa saepe ipsum temporibus veritatis doloremque animi.',
				'url': '/main'
			},
		]
	},
	{
		'title' : 'Unidad II. Donec fringilla arcu tortor, at.',
		'number': 2,
		'lesson': [
			{
				'number': 1,
				'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse tempora saepe assumenda quaerat neque tempore aspernatur vero ipsam nisi fugit!',
				'url': '/main'
			},
			{
				'number': 2,
				'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus error numquam nesciunt, quam illo veniam dolores ea libero!',
				'url': '/main'
			},
			{
				'number': 3,
				'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque ullam dicta, dolorem atque, aut earum minima quas!',
				'url': '/main'
			},
		]
	},
	{
		'title' : 'Unidad III. Donec fringilla arcu tortor, at.',
		'number': 3,
		'lesson': [
			{
				'number': 1,
				'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse tempora saepe assumenda quaerat neque tempore aspernatur vero ipsam nisi fugit!',
				'url': '/main'
			},
			{
				'number': 2,
				'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus error numquam nesciunt, quam illo veniam dolores ea libero!',
				'url': '/main'
			},
			{
				'number': 3,
				'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque ullam dicta, dolorem atque, aut earum minima quas!',
				'url': '/main'
			},
		]
	},
	{
		'title' : 'Unidad VI. Donec fringilla arcu tortor, at.',
		'number': 4,
		'lesson': [
			{
				'number': 1,
				'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse tempora saepe assumenda quaerat neque tempore aspernatur vero ipsam nisi fugit!',
				'url': '/main'
			},
			{
				'number': 2,
				'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus error numquam nesciunt, quam illo veniam dolores ea libero!',
				'url': '/main'
			},
			{
				'number': 3,
				'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque ullam dicta, dolorem atque, aut earum minima quas!',
				'url': '/main'
			},
		]
	},
	{
		'title' : 'Unidad V. Donec fringilla arcu tortor, at.',
		'number': 5,
		'lesson': [
			{
				'number': 1,
				'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse tempora saepe assumenda quaerat neque tempore aspernatur vero ipsam nisi fugit!',
				'url': '/main'
			},
			{
				'number': 2,
				'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus error numquam nesciunt, quam illo veniam dolores ea libero!',
				'url': '/main'
			},
			{
				'number': 3,
				'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque ullam dicta, dolorem atque, aut earum minima quas!',
				'url': '/main'
			},
		]
	},
	{
		'title' : 'Unidad VI. Donec fringilla arcu tortor, at.',
		'number': 6,
		'lesson': [
			{
				'number': 1,
				'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse tempora saepe assumenda quaerat neque tempore aspernatur vero ipsam nisi fugit!',
				'url': '/main'
			},
			{
				'number': 2,
				'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus error numquam nesciunt, quam illo veniam dolores ea libero!',
				'url': '/main'
			},
			{
				'number': 3,
				'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque ullam dicta, dolorem atque, aut earum minima quas!',
				'url': '/main'
			},
		]
	}
];
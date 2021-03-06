describe('Test helpers', function() {
	describe('Normalizers', function() {
		describe('normalizeKeyAliases', function() {
			it('Should convert some hotkeys to normal', function() {
				const hotkeys = {
					'cmd+ alt+s': 'alt+meta+s',
					'cmd++': '++meta',
					'ctrl+ alt+s': 'alt+control+s',
					' command+s': 'meta+s',
					'alt+s+ctrl': 'alt+control+s',
					'shift+ctrl+cmd+D': 'control+d+meta+shift',
					'meta+windows+win+ctrl+cmd': 'control+meta',
					'cmd+ alt+ shift ': 'alt+meta+shift',
					'return + esc ': 'enter+escape'
				};

				Object.keys(hotkeys).forEach(function(key) {
					expect(hotkeys[key]).equals(
						Jodit.modules.Helpers.normalizeKeyAliases(key)
					);
				});
			});
		});

		describe('normalizePath', function() {
			it('Should normalize slashes and join some parts', function() {
				const variants = {
					'/data/test/': ['/data/test/'],
					'data/test/': ['data/test/'],
					'data/test': ['data', 'test', ''],
					'test/test/': ['test//test//'],
					'https://xdsoft.net/jodit/connector/index.html': [
						'https://xdsoft.net',
						'jodit/connector/',
						'/index.html'
					],
					'https://xdsoft.net/jodit/connector/index2.html': [
						'https://xdsoft.net\\jodit/connector/',
						'/index2.html'
					]
				};

				Object.keys(variants).forEach(function(key) {
					expect(key).equals(
						Jodit.modules.Helpers.normalizePath.apply(
							null,
							variants[key]
						)
					);
				});
			});
		});
	});

	describe('Checkers', function() {
		describe('isVoid', function() {
			it('Should check value is undefned or null', function() {
				const values = [
					[1, false],
					[undefined, true],
					[null, true],
					['0', false],
					[false, false]
				];

				for (let i = 0, value = values[i]; i < values.length; i += 1) {
					expect(value[1]).equals(
						Jodit.modules.Helpers.isVoid(value[0])
					);
				}
			});
		});

		describe('isInt', function() {
			it('Should check value is int or not', function() {
				const values = [
					'cmd+ alt+s',
					false,
					'+1',
					true,
					'-1',
					true,
					'-1dddd',
					false,
					'10',
					true,
					'10.1',
					false,
					'10e10',
					true,
					'10e10',
					true,
					10,
					true,
					11.33,
					false
				];

				for (let i = 0; i < values.length; i += 2) {
					expect(values[i + 1]).equals(
						Jodit.modules.Helpers.isInt(values[i])
					);
				}
			});
		});

		describe('isNumeric', function() {
			it('Should check value is int or not', function() {
				const values = [
					'cmd+ alt+s',
					false,
					'+1',
					true,
					'-1',
					true,
					'-1000.333',
					true,
					'-1dddd',
					false,
					's1999999',
					false,
					' -1 ',
					false,
					'10',
					true,
					'10.1',
					true,
					'12312310.1243234',
					true,
					'10e10',
					true,
					'10e10',
					true,
					10,
					true,
					11.33,
					true
				];

				for (let i = 0; i < values.length; i += 2) {
					expect(values[i + 1]).equals(
						Jodit.modules.Helpers.isNumeric(values[i])
					);
				}
			});
		});

		describe('isNumber', function() {
			it('Should check value is a number', function() {
				const values = [
					'cmd+ alt+s',
					false,
					false,
					false,
					10,
					true,
					11.33,
					true
				];

				for (let i = 0; i < values.length; i += 2) {
					expect(values[i + 1]).equals(
						Jodit.modules.Helpers.isNumber(values[i])
					);
				}
			});
		});
	});

	describe('String', function() {
		describe('18n', function() {
			const i18n = Jodit.modules.Helpers.i18n;

			describe('Put defined sentence', function() {
				it('Should replace it on defined language', function() {
					const values = [
						'Type something',
						'???????????????? ??????-????????',
						'ru',

						'rename',
						'??????????????????????????',
						'ru',

						'Rename',
						'??????????????????????????',
						'ru',

						'About Jodit',
						'?????? ??????????',
						'ar',
						'about Jodit',
						'?????? ??????????',
						'ar',
						'British people',
						'British people',
						'ar'
					];

					for (let i = 0; i < values.length; i += 3) {
						expect(values[i + 1]).equals(
							i18n(
								values[i],
								[],
								{
									language: values[i + 2]
								},
								true
							)
						);
					}
				});

				describe('Put some information inside sentence', function() {
					it('Should put this information inside new sentence', function() {
						const values = [
							'Chars: %d',
							'????????????????: 1',
							'ru',
							[1],
							'Select %s',
							'????????????????: Test',
							'ru',
							['Test'],
							'select %s',
							'????????????????: Test',
							'ru',
							['Test'],
							'Bla %d Bla %s',
							'Bla 1 Bla boo',
							'ru',
							[1, 'boo'],
							'Bla %d Bla %s',
							'Bla 1 Bla boo',
							'ru1',
							[1, 'boo']
						];

						for (let i = 0; i < values.length; i += 4) {
							expect(values[i + 1]).equals(
								i18n(
									values[i],
									values[i + 3],
									{
										language: values[i + 2]
									},
									true
								)
							);
						}
					});
				});
			});

			describe('Debug mode', function() {
				it('Should show debug brackets for undefined keys', function() {
					const values = [
						'Type something',
						'???????????????? ??????-????????',
						'ru',
						'About Jodit',
						'?????? ??????????',
						'ar',
						'About Jodit',
						'About Jodit',
						'ar1',
						'British people',
						'{British people}',
						'ar'
					];

					for (let i = 0; i < values.length; i += 3) {
						expect(values[i + 1]).equals(
							i18n(
								values[i],
								[],
								{
									language: values[i + 2],
									debugLanguage: true
								},
								true
							)
						);
					}
				});
			});

			describe('Define i18n property inside input options', function() {
				it('Should use it', function() {
					const values = [
						'Type something',
						'????????????',
						'ru',
						'About Jodit',
						'??????????',
						'ar',
						'British people',
						'Bond',
						'ar'
					];

					const opt = {
						ru: {
							'Type something': '????????????'
						},
						ar: {
							'About Jodit': '??????????',
							'British people': 'Bond'
						}
					};

					for (let i = 0; i < values.length; i += 3) {
						expect(values[i + 1]).equals(
							i18n(
								values[i],
								[],
								{
									language: values[i + 2],
									i18n: opt,
									debugLanguage: true
								},
								true
							)
						);
					}
				});
			});
		});
	});

	describe('HTML', function() {
		describe('stripTags', function() {
			describe('Put HTML text', function() {
				it('Should return only text', function() {
					const values = [
						['<p>Type something<p>', 'Type something'],
						[
							'<p>Type <strong>something</strong><p>',
							'Type something'
						],
						[
							'<p>Type <strong>some<br>thing</strong><p>',
							'Type some thing'
						],
						[
							'<p>Type <strong>something</strong></p><p>Type <strong>something</strong></p>',
							'Type something Type something'
						]
					];

					for (let i = 0; i < values.length; i += 1) {
						expect(values[i][1]).equals(
							Jodit.modules.Helpers.stripTags(values[i][0]).replace(/\n/g, '')
						);
					}
				});
			});
		});
	});

	describe('Object', function () {
		describe('get', function() {
			it('Should get value from keyChain else return null', function() {
				const obj = {
					a1: 2,
					a: {
						b1: [
							{
								key: 5
							}
						],
						b: {
							c: {
								d: {
									e: 1
								},
								e: false
							}
						}
					}
				};

				const values = [
					['', null],
					[undefined, null],
					[null, null],
					['a1', 2],
					['a', obj.a],
					['a2', null],
					['a.b.c.d.e', 1],
					['a.b.c.e', false],
					['a.b.r.d.e', null],
					['a.b1.0.key', 5],
					['a.b1.0.key1', null],
				];

				for (let i = 0, value = values[i]; i < values.length; i += 1) {
					expect(value[1]).equals(
						Jodit.modules.Helpers.get(value[0])
					);
				}
			});
		});
	});

	describe('Utils', function () {
		describe('getClassName', function () {
			const getClassName = Jodit.modules.Helpers.getClassName;

			it('Should return normal(not uglifyed) name for instance of class', function () {
				expect(getClassName(Jodit.modules.Popup.prototype)).equals('Popup');
				expect(getClassName(Jodit.modules.UIButton.prototype)).equals('UIButton');
				expect(getClassName(Jodit.modules.ToolbarButton.prototype)).equals('ToolbarButton');
				expect(getClassName(Jodit.modules.Component.prototype)).equals('Component');
			});
		});
	});
});

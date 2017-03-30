const assert = require('assert');

describe('thresholds', function()
{
	const Threshold = require( '../index.js' );

	it(`throws errors for unknown events`, function()
	{
		const thisThreshold = Threshold( '>', 100, 5 );

		assert.throws( function() { thisThreshold.on( 'someEvent', console.log ); }, Error );
	});

	describe('greater than', function()
	{
		it(`doesn't call breach or clear when updates hasn't been met`, function()
		{
			const thisThreshold = Threshold( '>', 100, 5 );

			thisThreshold.on( 'breach', function()
			{
				throw new Error( 'Breach function called' );
			});

			thisThreshold.on( 'clear', function()
			{
				throw new Error( 'Clear function called' );
			});

			for (var i = 0; i < 4; i++) 
				thisThreshold.update(150);
			
		});

		it(`calls breach when updates have been met`, function()
		{
			var breached = false;

			const thisThreshold = Threshold( '>', 100, 5 );

			thisThreshold.on( 'breach', function()
			{
				breached = true;
			});

			thisThreshold.on( 'clear', function()
			{
				throw new Error( 'Clear function called' );
			});

			for (var i = 0; i < 5; i++) 
				thisThreshold.update(150);

			if( !breached )
				throw new Error( 'Breach function not called' );
		});

		it(`calls clear when updates have been met`, function()
		{
			var breached = false;
			var cleared = false;

			const thisThreshold = Threshold( '>', 100, 5 );

			thisThreshold.on( 'breach', function()
			{
				breached = true;
			});

			thisThreshold.on( 'clear', function()
			{
				cleared = true;
			});

			for (var i = 0; i < 5; i++) 
				thisThreshold.update(150);

			thisThreshold.update(50);

			if( !breached )
				throw new Error( 'Breach function not called' );

			if( !cleared )
				throw new Error( 'Breach function not called' );
		});
	});
});

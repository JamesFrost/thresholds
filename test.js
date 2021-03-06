const assert = require( 'assert' );

describe('thresholds', function()
{
	const Threshold = require( './index.js' );

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

			thisThreshold.on( 'breach', function( val )
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

			for (var i = 0; i < 4; i++) 
				thisThreshold.update(150);
				
			if( breached )
				throw new Error( 'Breach function called too early' );

			thisThreshold.update(150);

			for (var i = 0; i < 4; i++) 
				thisThreshold.update(50);

			if( cleared )
				throw new Error( 'Clear function called too early' );
			
			thisThreshold.update(50);

			if( !breached )
				throw new Error( 'Breach function not called' );

			if( !cleared )
				throw new Error( 'Clear function not called' );
		});

		it(`doesn't call clear when updates have not been met`, function()
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

			for (var i = 0; i < 4; i++) 
				thisThreshold.update(50);

			if( !breached )
				throw new Error( 'Breach function not called' );
		});

		it(`doesn't call clear when a breach hasn't occured first`, function()
		{
			var breached = false;
			var cleared = false;

			const thisThreshold = Threshold( '>', 100, 5 );

			thisThreshold.on( 'clear', function()
			{
				cleared = true;
			});

			thisThreshold.on( 'breach', function()
			{
				breached = true;
			});

			for (var i = 0; i < 6; i++) 
				thisThreshold.update(50);

			if( cleared )
				throw new Error( 'Clear function called' );

			for (var i = 0; i < 6; i++) 
				thisThreshold.update(150);

			if( !breached )
				throw new Error( 'Breach function not called' );

			for (var i = 0; i < 6; i++) 
				thisThreshold.update(50);

			if( !cleared )
				throw new Error( 'Clear function not called' );
		});

		it(`calls breach when updates have been met only once`, function()
		{
			var breached = 0;

			const thisThreshold = Threshold( '>', 100, 5 );

			thisThreshold.on( 'breach', function( val )
			{
				breached++;
			});

			thisThreshold.on( 'clear', function()
			{
				throw new Error( 'Clear function called' );
			});

			for (var i = 0; i < 50; i++) 
				thisThreshold.update(150);

			if( breached != 1 )
				throw new Error( `Breach function called ${breached} times` );
		});
	});

	describe('less than', function()
	{
		it(`doesn't call breach or clear when updates hasn't been met`, function()
		{
			const thisThreshold = Threshold( '<', 100, 5 );

			thisThreshold.on( 'breach', function()
			{
				throw new Error( 'Breach function called' );
			});

			thisThreshold.on( 'clear', function()
			{
				throw new Error( 'Clear function called' );
			});

			for (var i = 0; i < 4; i++) 
				thisThreshold.update(50);
			
		});

		it(`calls breach when updates have been met`, function()
		{
			var breached = false;

			const thisThreshold = Threshold( '<', 100, 5 );

			thisThreshold.on( 'breach', function()
			{
				breached = true;
			});

			thisThreshold.on( 'clear', function()
			{
				throw new Error( 'Clear function called' );
			});

			for (var i = 0; i < 5; i++) 
				thisThreshold.update(50);

			if( !breached )
				throw new Error( 'Breach function not called' );
		});

		it(`calls clear when updates have been met`, function()
		{
			var breached = false;
			var cleared = false;

			const thisThreshold = Threshold( '<', 100, 5 );

			thisThreshold.on( 'breach', function()
			{
				breached = true;
			});

			thisThreshold.on( 'clear', function()
			{
				cleared = true;
			});

			for (var i = 0; i < 4; i++) 
				thisThreshold.update(50);
				
			if( breached )
				throw new Error( 'Breach function called too early' );

			thisThreshold.update(50);

			for (var i = 0; i < 4; i++) 
				thisThreshold.update(150);

			if( cleared )
				throw new Error( 'Clear function called too early' );
			
			thisThreshold.update(150);

			if( !breached )
				throw new Error( 'Breach function not called' );

			if( !cleared )
				throw new Error( 'Clear function not called' );
		});

		it(`doesn't call clear when updates have not been met`, function()
		{
			var breached = false;

			const thisThreshold = Threshold( '<', 100, 5 );

			thisThreshold.on( 'breach', function()
			{
				breached = true;
			});

			thisThreshold.on( 'clear', function()
			{
				throw new Error( 'Clear function called' );
			});

			for (var i = 0; i < 5; i++) 
				thisThreshold.update(50);

			for (var i = 0; i < 4; i++) 
				thisThreshold.update(150);

			if( !breached )
				throw new Error( 'Breach function not called' );
				
		});


		it(`doesn't call clear when a breach hasn't occured first`, function()
		{
			var breached = false;
			var cleared = false;

			const thisThreshold = Threshold( '<', 100, 5 );

			thisThreshold.on( 'clear', function()
			{
				cleared = true;
			});

			thisThreshold.on( 'breach', function()
			{
				breached = true;
			});

			for (var i = 0; i < 6; i++) 
				thisThreshold.update(150);

			if( cleared )
				throw new Error( 'Clear function called' );

			for (var i = 0; i < 6; i++) 
				thisThreshold.update(50);

			if( !breached )
				throw new Error( 'Breach function not called' );

			for (var i = 0; i < 6; i++) 
				thisThreshold.update(150);

			if( !cleared )
				throw new Error( 'Clear function not called' );
		});

		it(`calls breach when updates have been met only once`, function()
		{
			var breached = 0;

			const thisThreshold = Threshold( '<', 100, 5 );

			thisThreshold.on( 'breach', function( val )
			{
				breached++;
			});

			thisThreshold.on( 'clear', function()
			{
				throw new Error( 'Clear function called' );
			});

			for (var i = 0; i < 50; i++) 
				thisThreshold.update(50);

			if( breached != 1 )
				throw new Error( `Breach function called ${breached} times` );
		});
	});

	it(`passes metic value to breach event listeners`, function()
	{
		var breached = false;

		const thisThreshold = Threshold( '>', 100, 5 );

		thisThreshold.on( 'breach', function( val )
		{
			breached = val;
		});

		thisThreshold.on( 'clear', function()
		{
			throw new Error( 'Clear function called' );
		});

		for (var i = 0; i < 5; i++) 
			thisThreshold.update(150);

		if( !breached || breached !== 150 )
			throw new Error( 'Breach function not called' );
	});
});

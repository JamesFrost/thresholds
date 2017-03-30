const _operatorFunctions =
{
	'>' : function( a, b ) { return a > b; },
	'<' : function( a, b ) { return a < b; }
};

module.exports = function( comparisonOperator, boundary, updates )
{
	const comparisonFunction = _operatorFunctions[ comparisonOperator ];

	var subsequentBreaches = 0;

	var breachFunction;
	var clearFunction;

	return {
		update : function( value )
		{
			if( comparisonFunction( value, boundary ) )
			{
				++subsequentBreaches;

				if( subsequentBreaches >= updates && breachFunction )
					breachFunction();
			}
			else if( subsequentBreaches !== 0 )
			{
				if( clearFunction )
					clearFunction();

				subsequentBreaches = 0;
			}
		},
		on : function( event, fun )
		{
			if( event === 'breach' )
				return breachFunction = fun;
			if( event === 'clear' )
				return clearFunction = fun;

			throw new Error( 'Unknown event: ' + event );
		}
	};
};

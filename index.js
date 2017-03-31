const EventEmitter = require( 'events' );
const util = require( 'util' );

const _operatorFunctions =
{
	'>' : function( a, b ) { return a > b; },
	'<' : function( a, b ) { return a < b; }
};

module.exports = function( comparisonOperator, boundary, updates )
{
	return new Threshold( comparisonOperator, boundary, updates );
};

const Threshold = function( comparisonOperator, boundary, updates )
{
	EventEmitter.call( this );

	this._comparisonFunction = _operatorFunctions[ comparisonOperator ];
	this._boundary = boundary;
	this._updates = updates;
	this._subsequentBreaches = 0;
	this._subsequentClears = 0;

	this._breachEmitted = false;

	this.on('breach', function()
	{
		this._breachEmitted = true;

	}.bind( this ));

	this.on('clear', function()
	{
		this._breachEmitted = false;

	}.bind( this ));
};

Threshold.prototype.update = function( value )
{
	if( this._comparisonFunction( value, this._boundary ) )
	{
		++this._subsequentBreaches;
		this._subsequentClears = 0;

		if( this._subsequentBreaches >= this._updates )
			this.emit( 'breach', value );
	}
	else 
	{
		++this._subsequentClears;
		this._subsequentBreaches = 0;

		if( this._subsequentClears >= this._updates && this._breachEmitted )
			this.emit( 'clear' );
	}
};

util.inherits( Threshold, EventEmitter );

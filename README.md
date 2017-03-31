# thresholds <img src="https://travis-ci.org/JamesFrost/thresholds.svg?branch=master"/>

Trigger events when a threshold has been breached for a period of time.

Useful for alerts, scaling etc based on the values of metrics.

```
npm install --save thresholds
```
## Usage
```js
const Threshold = require( 'thresholds' );

const cpuUsage = Threshold( '>', 75, 2 );

cpuUsage.on( 'breach', function()
{
  // send alert!
});

cpuUsage.on( 'clear', function()
{
  // send all clear!
});

cpuUsage.update( 50 ); 

cpuUsage.update( 99 ); 
cpuUsage.update( 95 ); 
// breach event emitted

```
## API
#### ```operator```
String. Either ```<``` or ```>```.
#### ```threshold```
Used with the operator passed to decide if the threshold has been breached.
#### ```updates```
Number of subsequent updates needed before a breach/clear event is fired.

## License
MIT

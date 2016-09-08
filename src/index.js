'use strict';

/**
 * module dependencies
 */
var fs = require( 'fs' );
var Bluebird = require( 'bluebird' );

/**
 * wraps node’s `fs.writeFile()`, in a bluebird ( v 3.4.6 ) promise that resolves with `true` if successful or rejects with
 * the `Error` returned by `fs.writeFile()`; both results need to be handled by the code calling this module
 *
 * note: `fs.writeFile()` throws a `TypeError` if the params passed to it are not valid, and returns an `Error` to the
 * callback if it cannot create the file
 *
 * @param {String|Buffer|Number} file filename or file descriptor
 * @param {String|Buffer} data
 * @param {Object|String} [options]
 * @param {String|null} [options.encoding = 'utf-8']
 * @param {Number} [options.mode = 0o666]
 * @param {String} [options.flag = 'w']
 *
 * @returns {bluebird}
 */
module.exports = function writeFile( file, data, options ) {
  return new Bluebird(
    /**
     * @param {Function} resolve
     * @param {Function} reject
     */
    function ( resolve, reject ) {
      fs.writeFile(
        file,
        data,
        options,
        /**
         * @param {Error} [err]
         */
        function callback( err ) {
          if ( err ) {
            reject( err );
            return;
          }

          resolve( true );
        }
      );
    }
  );
};

export default function normalizePath( path?: string ) {
	if ( ! path ) return '';
	return path.replace( /^\/+|\/+$/g, '' ); // Trim leading and trailing slashes
}

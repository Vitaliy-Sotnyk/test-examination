export default function errorMessageGenerator(errorObject: string, errorStatus?: string | number) {
    throw new Error(`Error with: ${errorObject} ${errorStatus ? 'status: ' + errorStatus : ''}`);
}
import fetch from 'node-fetch';
import exifParser from 'exif-parser';


export async function getCaptureDate(url) {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    const parser = exifParser.create(buffer);
    const result = parser.parse();

    const dateTimeOriginal = result.tags.DateTimeOriginal;

    if (dateTimeOriginal) {
        // console.log('Date the image was clicked:', dateTimeOriginal);
        return dateTimeOriginal;
        // const date = new Date(dateTimeOriginal * 1000); // Convert seconds to milliseconds
        // console.log(date.toISOString()); // Outputs in ISO format
    } else {
        // console.log('No capture date available in metadata.');
        return null;
    }
}
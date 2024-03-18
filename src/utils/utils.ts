export async function readStreamToString(stream: ReadableStream): Promise<string> {
    const reader = stream.getReader();
    let result = '';
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += new TextDecoder().decode(value);
    }
    return result;
}

export async function customReadStreamToString(streamOrString: any) {
    if (typeof streamOrString === 'string') {
        // If it's already a string, return it directly
        return streamOrString;
    } else if (typeof streamOrString === 'object' || typeof streamOrString.pipe === 'function') {
        // If it's a readable stream, convert it to a string
        let chunks = [];
        for await (const chunk of streamOrString) {
            chunks.push(chunk);
        }
        return Buffer.concat(chunks).toString('utf8');
    } else {
        throw new Error('Invalid input: expected a readable stream or string.');
    }
}
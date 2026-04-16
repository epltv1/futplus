const embeds = require('../embeds.json');

export default function handler(req, res) {
    const { id } = req.query;
    const targetUrl = embeds[id];

    if (!targetUrl) {
        return res.status(404).send("<h1>Stream Not Found</h1><p>The ID provided does not exist.</p>");
    }

    res.setHeader('Content-Type', 'text/html');
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Futbol-X | Live Stream</title>
            <style>
                body, html { margin: 0; padding: 0; height: 100%; width: 100%; background: #000; overflow: hidden; display: flex; justify-content: center; align-items: center; }
                iframe { width: 100%; height: 100%; border: none; position: absolute; top: 0; left: 0; }
            </style>
        </head>
        <body>
            <iframe src="${targetUrl}" allowfullscreen allow="autoplay; encrypted-media"></iframe>
        </body>
        </html>
    `);
}

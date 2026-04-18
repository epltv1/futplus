const embeds = require('../embeds.json');

export default function handler(req, res) {
    // 1. Improved ID detection (handles both /jsb18h and /?id=jsb18h)
    const id = req.query.id;
    const entry = embeds[id];

    if (!entry) {
        return res.status(404).send("<h1>Stream Not Found</h1>");
    }

    // 2. SECURITY FEATURE: Domain Locking
    const referer = req.headers.referer || "";
    const allowedDomains = [
        'futbol-x.xyz',
        'www.futbol-x.xyz',
        'futbol-x.top',
        'futplus.vercel.app' // Allow your own vercel domain for testing
    ];

    const isAllowed = allowedDomains.some(domain => referer.includes(domain));

    // If you want to strictly block anyone viewing it outside your site:
    if (!isAllowed && referer !== "") { 
        return res.status(403).send("<h1>Access Denied</h1><p>This stream is only available on futbol-x.xyz</p>");
    }

    res.setHeader('Content-Type', 'text/html');
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${entry.title}</title>
            <style>
                body, html { margin: 0; padding: 0; height: 100%; width: 100%; background: #000; overflow: hidden; }
                iframe { width: 100%; height: 100%; border: none; position: absolute; top: 0; left: 0; }
            </style>
        </head>
        <body>
            <iframe src="${entry.url}" allowfullscreen allow="autoplay; encrypted-media"></iframe>
        </body>
        </html>
    `);
}

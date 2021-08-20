const main_token = "API_TOKEN";
const cache = {};

addEventListener("fetch", (event) => {
    event.respondWith(
        handleRequest(event.request).catch(
            (err) => new Response(err.stack, { status: 500 })
        )
    );
});

async function handleRequest(request) {
    let token = request.headers.get('x-access-token');
    if (!token || token !== main_token)
        return new Response(JSON.stringify({ ok: false, message: "missing x-access-token" }), {
            headers: { "Content-Type": "application/json" },
        });

    let header = request.headers.get('x-url');
    if (!header)
        return new Response(JSON.stringify({ ok: false, message: "missing x-url" }), {
            headers: { "Content-Type": "application/json" },
        });

    if (cache[header]) return new Response(JSON.stringify({ ok: true, message: cache[header], live: false }), {
        headers: { "Content-Type": "application/json" },
    });

    let r = await fetch(header).catch(() =>
        new Response(JSON.stringify({ ok: false, message: "internal error" }), {
            headers: { "Content-Type": "application/json" },
        })
    );

    if (!cache[header]) cache[header] = r.url;
    return new Response(JSON.stringify({ ok: true, message: r.url, live: true }), {
        headers: { "Content-Type": "application/json" },
    });
}
